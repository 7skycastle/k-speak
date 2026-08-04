import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import type { AnalyticsEvent, LessonProgress, OnboardingProfile, ReviewItem, SavedPhrase, UserState } from "../types";
import { createInitialState, mergeUserStates, saveState } from "./storage";
import { getSupabaseClient, isSupabaseConfigured } from "./supabaseClient";

interface ProfileRow {
  id: string;
  country_pack_id: OnboardingProfile["countryPackId"];
  native_language: string;
  korean_level: OnboardingProfile["koreanLevel"];
  learning_goal: OnboardingProfile["learningGoal"];
  daily_goal_minutes: OnboardingProfile["dailyGoalMinutes"];
  character_id: OnboardingProfile["characterId"];
  reminder_time: string;
  completed_at?: string | null;
}

interface LessonProgressRow {
  lesson_id: string;
  status: LessonProgress["status"];
  current_step_id: string;
  completed_step_ids: string[];
  metrics: LessonProgress["metrics"];
  started_at?: string | null;
  completed_at?: string | null;
}

interface ReviewItemRow {
  id: string;
  lesson_id: string;
  phrase_id: string;
  korean: string;
  meaning: string;
  kind?: ReviewItem["kind"] | null;
  prompt?: string | null;
  reason: string;
  priority: number;
  due_at: string;
  last_result?: ReviewItem["lastResult"] | null;
  success_count?: number | null;
  hard_count?: number | null;
  last_reviewed_at?: string | null;
  updated_at?: string | null;
}

interface SavedPhraseRow {
  id: string;
  lesson_id: string;
  phrase_id: string;
  korean: string;
  romanization?: string | null;
  meaning: string;
  tags: string[];
  source: SavedPhrase["source"];
  saved_at: string;
  last_played_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;
}

type SavedPhraseRecord = SavedPhrase | UserState["savedPhraseTombstones"][number];

export const requestEmailSignIn = async (email: string) => {
  if (!isSupabaseConfigured()) {
    return {
      sent: false,
      messageKey: "sync.accountMergedLocal",
      message: "Supabase environment variables are missing, so only local account merge is available."
    };
  }

  const supabase = getSupabaseClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: import.meta.env.VITE_SUPABASE_REDIRECT_URL || window.location.origin
    }
  });

  if (error) throw error;
  return {
    sent: true,
    messageKey: "sync.authLinkSent",
    message: "We sent a login link by email. Opening it will start cloud progress merge."
  };
};

export const signOutFromSupabase = async () => {
  if (!isSupabaseConfigured()) return;
  const { error } = await getSupabaseClient().auth.signOut();
  if (error) throw error;
};

export const getSupabaseSession = async (): Promise<Session | null> => {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await getSupabaseClient().auth.getSession();
  if (error) throw error;
  return data.session;
};

export const subscribeToSupabaseAuth = (onSession: (session: Session | null) => void) => {
  if (!isSupabaseConfigured()) return () => undefined;
  const { data } = getSupabaseClient().auth.onAuthStateChange((_event, session) => onSession(session));
  return () => data.subscription.unsubscribe();
};

export const syncWithSupabase = async (state: UserState, session?: Session | null): Promise<UserState> => {
  if (!isSupabaseConfigured()) {
    return saveState({
      ...state,
      sync: {
        ...state.sync,
        mode: "local-only",
        pending: false,
        messageKey: "sync.localOnly",
        message: "Supabase environment variables are missing, so only local storage is available."
      }
    });
  }

  const activeSession = session ?? (await getSupabaseSession());
  if (!activeSession?.user) {
    return saveState({
      ...state,
      sync: {
        ...state.sync,
        mode: "supabase-ready",
        pending: false,
        messageKey: "sync.supabaseReady",
        message: "Supabase is ready. Sign in with an email link to run cloud sync."
      }
    });
  }

  const supabase = getSupabaseClient();
  const cloudState = await loadCloudState(supabase, activeSession.user, state.anonymousId);
  const merged = mergeUserStates(cloudState, state, activeSession.user.email);
  await persistCloudState(supabase, activeSession.user, merged);

  return saveState({
    ...merged,
    accountEmail: activeSession.user.email ?? merged.accountEmail,
    sync: {
      mode: "supabase-ready",
      cloudUserId: activeSession.user.id,
      lastSyncedAt: new Date().toISOString(),
      pending: false,
      messageKey: "sync.merged",
      pendingChanges: [],
      message: "Cloud and local progress were merged successfully."
    }
  });
};

const loadCloudState = async (supabase: SupabaseClient, user: User, anonymousId: string): Promise<UserState> => {
  const [profileResult, progressResult, reviewResult, savedPhraseResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle<ProfileRow>(),
    supabase.from("lesson_progress").select("*").eq("user_id", user.id).returns<LessonProgressRow[]>(),
    supabase.from("review_items").select("*").eq("user_id", user.id).returns<ReviewItemRow[]>(),
    supabase.from("saved_phrases").select("*").eq("user_id", user.id).returns<SavedPhraseRow[]>()
  ]);

  if (profileResult.error) throw profileResult.error;
  if (progressResult.error) throw progressResult.error;
  if (reviewResult.error) throw reviewResult.error;
  if (savedPhraseResult.error) throw savedPhraseResult.error;

  const cloud = createInitialState();
  cloud.anonymousId = anonymousId;
  cloud.accountEmail = user.email;
  cloud.onboarding = profileResult.data ? profileRowToOnboarding(profileResult.data) : undefined;
  cloud.lessonProgress = Object.fromEntries((progressResult.data ?? []).map((row) => [row.lesson_id, progressRowToState(row)]));
  cloud.reviewItems = (reviewResult.data ?? []).map(reviewRowToState);
  const savedPhraseRows = (savedPhraseResult.data ?? []).map(savedPhraseRowToState);
  cloud.savedPhrases = savedPhraseRows.filter((row): row is SavedPhrase => !("deletedAt" in row));
  cloud.savedPhraseTombstones = savedPhraseRows.filter(
    (row): row is UserState["savedPhraseTombstones"][number] => "deletedAt" in row
  );
  return cloud;
};

const persistCloudState = async (supabase: SupabaseClient, user: User, state: UserState) => {
  if (state.onboarding) {
    const { error } = await supabase.from("profiles").upsert(profileToRow(user.id, state.onboarding), { onConflict: "id" });
    if (error) throw error;
  }

  const progressRows = Object.values(state.lessonProgress).map((progress) => progressToRow(user.id, progress));
  if (progressRows.length) {
    const { error } = await supabase.from("lesson_progress").upsert(progressRows, { onConflict: "user_id,lesson_id" });
    if (error) throw error;
  }

  if (state.reviewItems.length) {
    const { error } = await supabase.from("review_items").upsert(
      state.reviewItems.map((item) => reviewToRow(user.id, item)),
      { onConflict: "id,user_id" }
    );
    if (error) throw error;
  }

  const savedPhraseRows = [
    ...(state.savedPhrases ?? []).map((item) => savedPhraseToRow(user.id, item)),
    ...(state.savedPhraseTombstones ?? []).map((item) => savedPhraseTombstoneToRow(user.id, item))
  ];

  if (savedPhraseRows.length) {
    const { error } = await supabase.from("saved_phrases").upsert(savedPhraseRows, { onConflict: "id,user_id" });
    if (error) throw error;
  }

  const eventRows = state.analyticsEvents.map((event) => analyticsToRow(user.id, state.anonymousId, event));
  if (eventRows.length) {
    const { error } = await supabase.from("analytics_events").upsert(eventRows, { onConflict: "id" });
    if (error) throw error;
  }
};

const profileRowToOnboarding = (row: ProfileRow): OnboardingProfile => ({
  countryPackId: row.country_pack_id,
  nativeLanguage: row.native_language,
  koreanLevel: row.korean_level,
  learningGoal: row.learning_goal,
  dailyGoalMinutes: row.daily_goal_minutes,
  characterId: row.character_id,
  reminderTime: row.reminder_time,
  completedAt: row.completed_at ?? undefined
});

const progressRowToState = (row: LessonProgressRow): LessonProgress => ({
  lessonId: row.lesson_id,
  status: row.status,
  currentStepId: row.current_step_id,
  completedStepIds: row.completed_step_ids,
  metrics: row.metrics ?? {},
  startedAt: row.started_at ?? undefined,
  completedAt: row.completed_at ?? undefined
});

const reviewRowToState = (row: ReviewItemRow): ReviewItem => ({
  id: row.id,
  lessonId: row.lesson_id,
  phraseId: row.phrase_id,
  korean: row.korean,
  meaning: row.meaning,
  kind: row.kind ?? undefined,
  prompt: row.prompt ?? undefined,
  reason: row.reason,
  priority: row.priority,
  dueAt: row.due_at,
  lastResult: row.last_result ?? undefined,
  successCount: row.success_count ?? undefined,
  hardCount: row.hard_count ?? undefined,
  lastReviewedAt: row.last_reviewed_at ?? undefined,
  updatedAt: row.updated_at ?? undefined
});

const savedPhraseRowToState = (row: SavedPhraseRow): SavedPhraseRecord => {
  const base = {
    id: row.id,
    lessonId: row.lesson_id,
    phraseId: row.phrase_id,
    korean: row.korean,
    romanization: row.romanization ?? undefined,
    meaning: row.meaning,
    tags: row.tags ?? [],
    source: row.source,
    savedAt: row.saved_at,
    lastPlayedAt: row.last_played_at ?? undefined,
    updatedAt: row.updated_at ?? row.saved_at
  };

  if (row.deleted_at) {
    return {
      ...base,
      deletedAt: row.deleted_at
    };
  }

  return base;
};

const profileToRow = (userId: string, profile: OnboardingProfile): ProfileRow => ({
  id: userId,
  country_pack_id: profile.countryPackId,
  native_language: profile.nativeLanguage,
  korean_level: profile.koreanLevel,
  learning_goal: profile.learningGoal,
  daily_goal_minutes: profile.dailyGoalMinutes,
  character_id: profile.characterId,
  reminder_time: profile.reminderTime,
  completed_at: profile.completedAt
});

const progressToRow = (userId: string, progress: LessonProgress) => ({
  user_id: userId,
  lesson_id: progress.lessonId,
  status: progress.status,
  current_step_id: progress.currentStepId,
  completed_step_ids: progress.completedStepIds,
  metrics: progress.metrics,
  started_at: progress.startedAt,
  completed_at: progress.completedAt
});

const reviewToRow = (userId: string, item: ReviewItem) => ({
  id: item.id,
  user_id: userId,
  lesson_id: item.lessonId,
  phrase_id: item.phraseId,
  korean: item.korean,
  meaning: item.meaning,
  kind: item.kind,
  prompt: item.prompt,
  reason: item.reason,
  priority: item.priority,
  due_at: item.dueAt,
  last_result: item.lastResult,
  success_count: item.successCount,
  hard_count: item.hardCount,
  last_reviewed_at: item.lastReviewedAt,
  updated_at: item.updatedAt
});

const savedPhraseToRow = (userId: string, item: SavedPhrase) => ({
  id: item.id,
  user_id: userId,
  lesson_id: item.lessonId,
  phrase_id: item.phraseId,
  korean: item.korean,
  romanization: item.romanization,
  meaning: item.meaning,
  tags: item.tags,
  source: item.source,
  saved_at: item.savedAt,
  last_played_at: item.lastPlayedAt,
  updated_at: item.updatedAt,
  deleted_at: null
});

const savedPhraseTombstoneToRow = (userId: string, item: UserState["savedPhraseTombstones"][number]) => ({
  id: item.id,
  user_id: userId,
  lesson_id: item.lessonId,
  phrase_id: item.phraseId,
  korean: item.korean,
  romanization: item.romanization,
  meaning: item.meaning,
  tags: item.tags,
  source: item.source,
  saved_at: item.savedAt,
  last_played_at: item.lastPlayedAt,
  updated_at: item.updatedAt,
  deleted_at: item.deletedAt
});

const analyticsToRow = (userId: string, anonymousId: string, event: AnalyticsEvent) => ({
  id: event.id,
  user_id: userId,
  anonymous_id: anonymousId,
  name: event.name,
  properties: event,
  occurred_at: event.occurredAt
});
