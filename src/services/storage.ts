import type {
  LessonProgress,
  OnboardingProfile,
  ReviewItem,
  SavedPhrase,
  SavedPhraseTombstone,
  SyncChange,
  CourseId,
  CultureRouteSelection,
  KFoodMissionResult,
  TravelMissionResult,
  UserState
} from "../types";
import { courseRegistry, FOUNDATION_COURSE_ID } from "../data/courses/courseRegistry";
import { isCultureRouteLocked, updateCultureRouteSelection } from "../engine/culturePathEngine";
import { mergeEpsAssessmentAttempts } from "../engine/epsAssessmentEngine";
import {
  LEGACY_INFERRED_AT,
  getCourseLessonIds,
  getCourseRouteLessonIds,
  mergeActiveCoursePreference,
  mergeCourseEnrollments,
  normalizeUserCourses
} from "../engine/courseEngine";

const STATE_KEY = "korean-first-talk:user-state:v1";
const CLOUD_PREFIX = "korean-first-talk:cloud-profile:";

const now = () => new Date().toISOString();

const createId = (prefix: string) => `${prefix}-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;

const normalizeEmail = (email: string) => email.trim().toLowerCase();

const compareIso = (left?: string, right?: string) => {
  const leftTime = left ? new Date(left).getTime() : 0;
  const rightTime = right ? new Date(right).getTime() : 0;
  return leftTime - rightTime;
};

const normalizeReviewItem = (item: ReviewItem): ReviewItem => ({
  ...item,
  successCount: item.successCount ?? (item.lastResult === "success" ? 1 : 0),
  hardCount: item.hardCount ?? (item.lastResult === "hard" ? 1 : 0),
  lastReviewedAt: item.lastReviewedAt,
  updatedAt: item.updatedAt ?? item.lastReviewedAt ?? item.dueAt
});

const normalizeSavedPhrase = (phrase: SavedPhrase): SavedPhrase => ({
  ...phrase,
  updatedAt: phrase.updatedAt ?? phrase.lastPlayedAt ?? phrase.savedAt
});

const normalizeSavedPhraseTombstone = (phrase: SavedPhraseTombstone): SavedPhraseTombstone => ({
  ...normalizeSavedPhrase(phrase),
  deletedAt: phrase.deletedAt,
  updatedAt: phrase.updatedAt ?? phrase.deletedAt
});

const mergeSyncChanges = (base: SyncChange[] = [], incoming: SyncChange[] = []) => {
  const merged = new Map<string, SyncChange>();
  for (const change of [...base, ...incoming]) {
    const key = `${change.entity}:${change.entityId}`;
    const current = merged.get(key);
    if (!current || compareIso(current.changedAt, change.changedAt) <= 0) {
      merged.set(key, change);
    }
  }
  return Array.from(merged.values()).sort((left, right) => compareIso(left.changedAt, right.changedAt));
};

const withPendingChanges = (state: UserState, changes: SyncChange[]) => ({
  ...state,
  sync: {
    ...state.sync,
    pending: state.sync.mode === "supabase-ready" ? true : state.sync.pending,
    messageKey: state.sync.mode === "supabase-ready" ? "sync.pendingRetry" : state.sync.messageKey,
    message:
      state.sync.mode === "supabase-ready"
        ? "Changes are saved on this device and ready to retry syncing."
        : state.sync.message,
    pendingChanges: mergeSyncChanges(state.sync.pendingChanges, changes)
  }
});

const mergeReviewItem = (current: ReviewItem, incoming: ReviewItem): ReviewItem => {
  const normalizedCurrent = normalizeReviewItem(current);
  const normalizedIncoming = normalizeReviewItem(incoming);
  const incomingWins = compareIso(normalizedCurrent.updatedAt, normalizedIncoming.updatedAt) <= 0;
  const latest = incomingWins ? normalizedIncoming : normalizedCurrent;
  const fallback = incomingWins ? normalizedCurrent : normalizedIncoming;
  const currentReviewedAt = normalizedCurrent.lastReviewedAt ?? normalizedCurrent.updatedAt;
  const incomingReviewedAt = normalizedIncoming.lastReviewedAt ?? normalizedIncoming.updatedAt;
  const incomingScheduleWins = compareIso(currentReviewedAt, incomingReviewedAt) <= 0;
  const scheduleSource = incomingScheduleWins ? normalizedIncoming : normalizedCurrent;

  return {
    ...fallback,
    ...latest,
    priority: Math.max(normalizedCurrent.priority, normalizedIncoming.priority),
    dueAt: scheduleSource.dueAt,
    lastResult: scheduleSource.lastResult,
    lastReviewedAt: scheduleSource.lastReviewedAt,
    successCount: Math.max(normalizedCurrent.successCount ?? 0, normalizedIncoming.successCount ?? 0),
    hardCount: Math.max(normalizedCurrent.hardCount ?? 0, normalizedIncoming.hardCount ?? 0),
    updatedAt: latest.updatedAt
  };
};

const mergeSavedPhraseRecord = (current: SavedPhrase, incoming: SavedPhrase): SavedPhrase =>
  compareIso(current.updatedAt, incoming.updatedAt) > 0 ? current : incoming;

const resolveSavedPhraseState = (
  phrases: SavedPhrase[],
  tombstones: SavedPhraseTombstone[]
): Pick<UserState, "savedPhrases" | "savedPhraseTombstones"> => {
  const active = new Map<string, SavedPhrase>();
  const deleted = new Map<string, SavedPhraseTombstone>();

  for (const phrase of phrases.map(normalizeSavedPhrase)) {
    const current = active.get(phrase.id);
    active.set(phrase.id, current ? mergeSavedPhraseRecord(current, phrase) : phrase);
  }

  for (const tombstone of tombstones.map(normalizeSavedPhraseTombstone)) {
    const current = deleted.get(tombstone.id);
    if (!current || compareIso(current.updatedAt, tombstone.updatedAt) <= 0) {
      deleted.set(tombstone.id, tombstone);
    }
  }

  for (const [id, phrase] of active.entries()) {
    const tombstone = deleted.get(id);
    if (!tombstone) continue;
    if (compareIso(phrase.updatedAt, tombstone.updatedAt) <= 0) {
      active.delete(id);
    } else {
      deleted.delete(id);
    }
  }

  return {
    savedPhrases: Array.from(active.values()),
    savedPhraseTombstones: Array.from(deleted.values())
  };
};

const mergeMissionResults = <T extends { completedAt: string }>(account: Record<string, T> = {}, guest: Record<string, T> = {}) => {
  const merged = { ...account };
  for (const [lessonId, result] of Object.entries(guest)) {
    const current = merged[lessonId];
    if (!current || compareIso(current.completedAt, result.completedAt) <= 0) {
      merged[lessonId] = result;
    }
  }
  return merged;
};

export const createInitialState = (): UserState => ({
  anonymousId: createId("guest"),
  activeCourseId: FOUNDATION_COURSE_ID,
  activeCourseChangedAt: LEGACY_INFERRED_AT,
  courseEnrollments: {},
  epsAssessmentAttempts: {},
  epsAssessmentResults: {},
  travelMissionResults: {},
  kFoodMissionResults: {},
  lessonProgress: {},
  reviewItems: [],
  savedPhrases: [],
  savedPhraseTombstones: [],
  analyticsEvents: [],
  sync: {
    mode: hasSupabaseEnvironment() ? "supabase-ready" : "local-only",
    pending: false,
    messageKey: hasSupabaseEnvironment() ? "sync.readyToConnect" : "sync.localOnly",
    message: hasSupabaseEnvironment()
      ? "Supabase environment variables are present. Cloud sync can be connected."
      : "Saved safely on this device. Sync will be available once a Supabase project is configured." // A3: localize via sync.localOnly
  },
  updatedAt: now()
});

export const hasSupabaseEnvironment = () =>
  Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

export const loadState = (): UserState => {
  const raw = localStorage.getItem(STATE_KEY);
  if (!raw) return createInitialState();

  try {
    const parsed = { ...createInitialState(), ...JSON.parse(raw) } as UserState;
    const resolvedSavedPhrases = resolveSavedPhraseState(
      parsed.savedPhrases ?? [],
      parsed.savedPhraseTombstones ?? []
    );
    return normalizeUserCourses({
      ...parsed,
      reviewItems: (parsed.reviewItems ?? []).map(normalizeReviewItem),
      savedPhrases: resolvedSavedPhrases.savedPhrases,
      savedPhraseTombstones: resolvedSavedPhrases.savedPhraseTombstones,
      sync: {
        ...parsed.sync,
        pendingChanges: parsed.sync.pendingChanges ?? []
      }
    });
  } catch {
    return createInitialState();
  }
};

export const saveState = (state: UserState): UserState => {
  const next = { ...state, updatedAt: now() };
  localStorage.setItem(STATE_KEY, JSON.stringify(next));
  return next;
};

export const clearLocalState = () => {
  localStorage.removeItem(STATE_KEY);
};

export const updateOnboarding = (state: UserState, onboarding: OnboardingProfile): UserState =>
  saveState({
    ...state,
    onboarding: {
      ...onboarding,
      completedAt: onboarding.completedAt ?? now()
    }
  });

export const updateActiveCourse = (state: UserState, courseId: UserState["activeCourseId"]): UserState => {
  const changedAt = now();
  return saveState(
    withPendingChanges(
      {
        ...normalizeUserCourses(state),
        activeCourseId: courseId,
        activeCourseChangedAt: changedAt
      },
      [
        {
          entity: "profile-course-preference",
          entityId: "active-course",
          operation: "upsert",
          changedAt
        }
      ]
    )
  );
};

export const completeCourseRoute = (state: UserState, courseId: CourseId, completedAt = now()): UserState => {
  const normalized = normalizeUserCourses(state);
  const entry = courseRegistry[courseId];
  const current = normalized.courseEnrollments[courseId];
  const completion = {
    courseId,
    routeVersion: entry.routeVersion,
    completedAt,
    completedLessonIds: getCourseRouteLessonIds(normalized, courseId)
  };
  const completions = [
    ...(current?.completions ?? []).filter((item) => item.routeVersion !== entry.routeVersion),
    completion
  ];

  return saveState(
    withPendingChanges(
      {
        ...normalized,
        courseEnrollments: {
          ...normalized.courseEnrollments,
          [courseId]: {
            courseId,
            routeVersion: entry.routeVersion,
            startedAt: current?.startedAt ?? completedAt,
            lastOpenedAt: completedAt,
            routeLockedAt: current?.routeLockedAt,
            routeSlots: current?.routeSlots,
            completions,
            fieldUpdatedAt: {
              ...current?.fieldUpdatedAt,
              completions: completedAt,
              lastOpenedAt: completedAt
            }
          }
        }
      },
      [{ entity: "course-enrollment", entityId: courseId, operation: "upsert", changedAt: completedAt }]
    )
  );
};

export const saveCultureRouteSelection = (
  state: UserState,
  selection: CultureRouteSelection,
  changedAt = now()
): UserState => {
  const normalized = normalizeUserCourses(state);
  const current = normalized.courseEnrollments["k-culture"];
  const updatedEnrollment = updateCultureRouteSelection(current, normalized.lessonProgress, selection, changedAt);
  const unchanged = current === updatedEnrollment;

  return saveState(
    unchanged
      ? normalized
      : withPendingChanges(
          {
            ...normalized,
            courseEnrollments: {
              ...normalized.courseEnrollments,
              "k-culture": updatedEnrollment
            }
          },
          [{ entity: "course-enrollment", entityId: "k-culture", operation: "upsert", changedAt }]
        )
  );
};

export const saveTravelMissionResult = (state: UserState, result: TravelMissionResult): UserState =>
  saveState(
    withPendingChanges(
      {
        ...state,
        travelMissionResults: {
          ...(state.travelMissionResults ?? {}),
          [result.lessonId]: result
        }
      },
      [
        {
          entity: "course-mission-result",
          entityId: `travel:${result.lessonId}`,
          operation: "upsert",
          changedAt: result.completedAt
        }
      ]
    )
  );

export const saveKFoodMissionResult = (state: UserState, result: KFoodMissionResult): UserState =>
  saveState(
    withPendingChanges(
      {
        ...state,
        kFoodMissionResults: {
          ...(state.kFoodMissionResults ?? {}),
          [result.lessonId]: result
        }
      },
      [
        {
          entity: "course-mission-result",
          entityId: `k-food:${result.lessonId}`,
          operation: "upsert",
          changedAt: result.completedAt
        }
      ]
    )
  );

export const upsertLessonProgress = (
  state: UserState,
  lessonId: string,
  progress: LessonProgress
): UserState => {
  const changedAt = progress.startedAt ?? now();
  const normalized = normalizeUserCourses(state);
  const currentEnrollment = normalized.courseEnrollments["k-culture"];
  const cultureRouteShouldLock =
    progress.courseId === "k-culture" &&
    !isCultureRouteLocked(currentEnrollment, normalized.lessonProgress) &&
    (currentEnrollment?.routeSlots ?? []).some(
      (slot) => slot.lessonId === lessonId && (slot.kind === "primary" || slot.kind === "sampler")
    );
  const nextState = {
    ...normalized,
    lessonProgress: {
      ...normalized.lessonProgress,
      [lessonId]: progress
    },
    courseEnrollments: {
      ...normalized.courseEnrollments,
      "k-culture":
        cultureRouteShouldLock && currentEnrollment
          ? {
              ...currentEnrollment,
              routeLockedAt: changedAt,
              fieldUpdatedAt: {
                ...currentEnrollment.fieldUpdatedAt,
                routeLockedAt: changedAt
              }
            }
          : currentEnrollment
    }
  };

  return saveState(
    cultureRouteShouldLock
      ? withPendingChanges(nextState, [
          { entity: "course-enrollment", entityId: "k-culture", operation: "upsert", changedAt }
        ])
      : nextState
  );
};

export const upsertReviewItems = (state: UserState, items: ReviewItem[]): UserState => {
  const existing = new Map(state.reviewItems.map((item) => [item.id, normalizeReviewItem(item)]));
  const changes: SyncChange[] = [];
  for (const item of items.map(normalizeReviewItem)) {
    const current = existing.get(item.id);
    const merged = current ? mergeReviewItem(current, item) : item;
    existing.set(item.id, merged);
    changes.push({
      entity: "review-item",
      entityId: item.id,
      operation: "upsert",
      changedAt: merged.updatedAt ?? now()
    });
  }
  return saveState(
    withPendingChanges(
      {
        ...state,
        reviewItems: Array.from(existing.values())
      },
      changes
    )
  );
};

export const completeReviewItem = (state: UserState, reviewItemId: string, result: "success" | "hard"): UserState =>
  {
    const changedAt = now();
    const reviewItems = state.reviewItems.map((item) => {
      if (item.id !== reviewItemId) return normalizeReviewItem(item);
      const normalized = normalizeReviewItem(item);
      return {
        ...normalized,
        lastResult: result,
        dueAt: new Date(Date.now() + (result === "success" ? 72 : 12) * 60 * 60 * 1000).toISOString(),
        successCount: (normalized.successCount ?? 0) + (result === "success" ? 1 : 0),
        hardCount: (normalized.hardCount ?? 0) + (result === "hard" ? 1 : 0),
        lastReviewedAt: changedAt,
        updatedAt: changedAt
      };
    });

    return saveState(
      withPendingChanges(
        {
          ...state,
          reviewItems
        },
        [
          {
            entity: "review-item",
            entityId: reviewItemId,
            operation: "upsert",
            changedAt
          }
        ]
      )
    );
  };

export const upsertSavedPhrase = (state: UserState, phrase: SavedPhrase): UserState => {
  const normalized = normalizeSavedPhrase(phrase);
  const existing = new Map((state.savedPhrases ?? []).map((item) => [item.id, normalizeSavedPhrase(item)]));
  const current = existing.get(normalized.id);
  existing.set(normalized.id, current ? mergeSavedPhraseRecord(current, normalized) : normalized);
  const tombstones = new Map((state.savedPhraseTombstones ?? []).map((item) => [item.id, normalizeSavedPhraseTombstone(item)]));
  const tombstone = tombstones.get(normalized.id);
  if (tombstone && compareIso(tombstone.updatedAt, normalized.updatedAt) <= 0) {
    tombstones.delete(normalized.id);
  }

  return saveState(
    withPendingChanges(
      {
        ...state,
        savedPhrases: Array.from(existing.values()),
        savedPhraseTombstones: Array.from(tombstones.values())
      },
      [
        {
          entity: "saved-phrase",
          entityId: normalized.id,
          operation: "upsert",
          changedAt: normalized.updatedAt ?? now()
        }
      ]
    )
  );
};

export const markSavedPhrasePlayed = (state: UserState, phraseId: string): UserState =>
  saveState({
    ...state,
    savedPhrases: (state.savedPhrases ?? []).map((item) =>
      item.id === phraseId ? { ...item, lastPlayedAt: now(), updatedAt: now() } : item
    )
  });

export const removeSavedPhrase = (state: UserState, phraseId: string): UserState => {
  const changedAt = now();
  const existing = (state.savedPhrases ?? []).find((item) => item.id === phraseId);
  const savedPhrases = (state.savedPhrases ?? []).filter((item) => item.id !== phraseId);
  const tombstones = new Map((state.savedPhraseTombstones ?? []).map((item) => [item.id, normalizeSavedPhraseTombstone(item)]));

  if (existing) {
    tombstones.set(
      phraseId,
      normalizeSavedPhraseTombstone({
        ...normalizeSavedPhrase(existing),
        deletedAt: changedAt,
        updatedAt: changedAt
      })
    );
  }

  return saveState(
    withPendingChanges(
      {
        ...state,
        savedPhrases,
        savedPhraseTombstones: Array.from(tombstones.values())
      },
      existing
        ? [
            {
              entity: "saved-phrase",
              entityId: phraseId,
              operation: "delete",
              changedAt
            }
          ]
        : []
    )
  );
};

export const upsertEpsAssessmentAttempt = (
  state: UserState,
  attempt: UserState["epsAssessmentAttempts"][string]
): UserState => {
  const current = state.epsAssessmentAttempts?.[attempt.attemptId];
  const merged = current
    ? mergeEpsAssessmentAttempts({ [attempt.attemptId]: current }, { [attempt.attemptId]: attempt })[attempt.attemptId]
    : attempt;

  return saveState(
    withPendingChanges(
      {
        ...state,
        epsAssessmentAttempts: {
          ...(state.epsAssessmentAttempts ?? {}),
          [attempt.attemptId]: merged
        }
      },
      [
        {
          entity: "eps-assessment-attempt",
          entityId: attempt.attemptId,
          operation: "upsert",
          changedAt: attempt.lastSavedAt
        }
      ]
    )
  );
};

export const mergeGuestIntoAccount = (state: UserState, email: string): UserState => {
  const normalizedEmail = normalizeEmail(email);
  const cloudKey = `${CLOUD_PREFIX}${normalizedEmail}`;
  const cloudState = loadCloudState(cloudKey);
  const merged = mergeUserStates(cloudState ?? createInitialState(), state, normalizedEmail);
  localStorage.setItem(cloudKey, JSON.stringify(merged));
  return saveState({
    ...merged,
    accountEmail: normalizedEmail,
    anonymousId: state.anonymousId,
    sync: {
      ...merged.sync,
      pending: hasSupabaseEnvironment(),
      messageKey: hasSupabaseEnvironment() ? "sync.accountMergedCloudReady" : "sync.accountMergedLocal",
      message: hasSupabaseEnvironment()
        ? "Account and local progress merged. Cloud save can be run after Supabase is connected." // A3: localize
        : "Account and local progress merged into this browser's account storage." // A3: localize
    }
  });
};

export const logoutLocalAccount = (state: UserState): UserState =>
  saveState({
    ...state,
    accountEmail: undefined,
    sync: {
      ...state.sync,
      messageKey: "sync.loggedOutLocal",
      message: "Logged out. Guest progress continues to be stored on this device." // A3: localize
    }
  });

const loadCloudState = (key: string): UserState | undefined => {
  const raw = localStorage.getItem(key);
  if (!raw) return undefined;
  try {
    return JSON.parse(raw) as UserState;
  } catch {
    return undefined;
  }
};

export const mergeUserStates = (account: UserState, guest: UserState, email?: string): UserState => {
  const normalizedAccount = normalizeUserCourses(account);
  const normalizedGuest = normalizeUserCourses(guest);
  const activeCourse = mergeActiveCoursePreference(normalizedAccount, normalizedGuest);
  const courseEnrollments = mergeCourseEnrollments(normalizedAccount, normalizedGuest);
  const lessonProgress = { ...normalizedAccount.lessonProgress };

  for (const [lessonId, guestProgress] of Object.entries(normalizedGuest.lessonProgress)) {
    const accountProgress = lessonProgress[lessonId];
    if (!accountProgress) {
      lessonProgress[lessonId] = guestProgress;
      continue;
    }

    const completedStepIds = Array.from(
      new Set([...accountProgress.completedStepIds, ...guestProgress.completedStepIds])
    );
    lessonProgress[lessonId] = {
      ...accountProgress,
      ...guestProgress,
      status:
        accountProgress.status === "completed" || guestProgress.status === "completed" ? "completed" : "in-progress",
      currentStepId:
        guestProgress.completedStepIds.length >= accountProgress.completedStepIds.length
          ? guestProgress.currentStepId
          : accountProgress.currentStepId,
      completedStepIds,
      metrics: {
        ...accountProgress.metrics,
        ...guestProgress.metrics
      },
      completedAt: accountProgress.completedAt ?? guestProgress.completedAt
    };
  }

  const reviewItems = new Map(normalizedAccount.reviewItems.map((item) => [item.id, normalizeReviewItem(item)]));
  for (const item of normalizedGuest.reviewItems.map(normalizeReviewItem)) {
    const current = reviewItems.get(item.id);
    if (!current) {
      reviewItems.set(item.id, item);
      continue;
    }

    reviewItems.set(item.id, mergeReviewItem(current, item));
  }

  const resolvedSavedPhrases = resolveSavedPhraseState(
    [...(normalizedAccount.savedPhrases ?? []), ...(normalizedGuest.savedPhrases ?? [])],
    [...(normalizedAccount.savedPhraseTombstones ?? []), ...(normalizedGuest.savedPhraseTombstones ?? [])]
  );

  return {
    ...normalizedAccount,
    anonymousId: normalizedGuest.anonymousId,
    accountEmail: email ?? normalizedGuest.accountEmail ?? normalizedAccount.accountEmail,
    onboarding: normalizedGuest.onboarding ?? normalizedAccount.onboarding,
    activeCourseId: activeCourse.activeCourseId,
    activeCourseChangedAt: activeCourse.activeCourseChangedAt,
    courseEnrollments,
    lessonProgress,
    reviewItems: Array.from(reviewItems.values()),
    savedPhrases: resolvedSavedPhrases.savedPhrases,
    savedPhraseTombstones: resolvedSavedPhrases.savedPhraseTombstones,
    epsAssessmentAttempts: mergeEpsAssessmentAttempts(
      normalizedAccount.epsAssessmentAttempts,
      normalizedGuest.epsAssessmentAttempts
    ),
    epsAssessmentResults: {
      ...normalizedAccount.epsAssessmentResults,
      ...normalizedGuest.epsAssessmentResults
    },
    travelMissionResults: mergeMissionResults(
      normalizedAccount.travelMissionResults,
      normalizedGuest.travelMissionResults
    ),
    kFoodMissionResults: mergeMissionResults(
      normalizedAccount.kFoodMissionResults,
      normalizedGuest.kFoodMissionResults
    ),
    analyticsEvents: [...normalizedAccount.analyticsEvents, ...normalizedGuest.analyticsEvents],
    sync: {
      ...normalizedAccount.sync,
      ...normalizedGuest.sync,
      pending: normalizedAccount.sync.pending || normalizedGuest.sync.pending,
      pendingChanges: mergeSyncChanges(normalizedAccount.sync.pendingChanges, normalizedGuest.sync.pendingChanges)
    },
    updatedAt: now()
  };
};
