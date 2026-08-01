import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import type { AnalyticsEvent, LessonProgress, OnboardingProfile, ReviewItem, UserState } from "../types";
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
  reason: string;
  priority: number;
  due_at: string;
  last_result?: ReviewItem["lastResult"] | null;
}

export const requestEmailSignIn = async (email: string) => {
  if (!isSupabaseConfigured()) return { sent: false, message: "Supabase 환경 변수가 없어 로컬 계정 병합만 사용합니다." };

  const supabase = getSupabaseClient();
  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: import.meta.env.VITE_SUPABASE_REDIRECT_URL || window.location.origin
    }
  });

  if (error) throw error;
  return { sent: true, message: "로그인 링크를 이메일로 보냈습니다. 링크를 열면 클라우드 진도 병합이 실행됩니다." };
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
        mode: "local-only",
        pending: false,
        message: "Supabase 환경 변수가 없어 로컬 저장만 사용 중입니다."
      }
    });
  }

  const activeSession = session ?? (await getSupabaseSession());
  if (!activeSession?.user) {
    return saveState({
      ...state,
      sync: {
        mode: "supabase-ready",
        pending: false,
        message: "Supabase 연결 준비 완료. 이메일 링크 로그인 후 클라우드 동기화를 실행합니다."
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
      message: "Supabase 클라우드 진도와 로컬 진도를 병합했습니다."
    }
  });
};

const loadCloudState = async (supabase: SupabaseClient, user: User, anonymousId: string): Promise<UserState> => {
  const [profileResult, progressResult, reviewResult] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle<ProfileRow>(),
    supabase.from("lesson_progress").select("*").eq("user_id", user.id).returns<LessonProgressRow[]>(),
    supabase.from("review_items").select("*").eq("user_id", user.id).returns<ReviewItemRow[]>()
  ]);

  if (profileResult.error) throw profileResult.error;
  if (progressResult.error) throw progressResult.error;
  if (reviewResult.error) throw reviewResult.error;

  const cloud = createInitialState();
  cloud.anonymousId = anonymousId;
  cloud.accountEmail = user.email;
  cloud.onboarding = profileResult.data ? profileRowToOnboarding(profileResult.data) : undefined;
  cloud.lessonProgress = Object.fromEntries((progressResult.data ?? []).map((row) => [row.lesson_id, progressRowToState(row)]));
  cloud.reviewItems = (reviewResult.data ?? []).map(reviewRowToState);
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
  reason: row.reason,
  priority: row.priority,
  dueAt: row.due_at,
  lastResult: row.last_result ?? undefined
});

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
  reason: item.reason,
  priority: item.priority,
  due_at: item.dueAt,
  last_result: item.lastResult
});

const analyticsToRow = (userId: string, anonymousId: string, event: AnalyticsEvent) => ({
  id: event.id,
  user_id: userId,
  anonymous_id: anonymousId,
  name: event.name,
  properties: event,
  occurred_at: event.occurredAt
});
