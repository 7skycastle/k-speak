import type {
  LessonProgress,
  OnboardingProfile,
  ReviewItem,
  SavedPhrase,
  SavedPhraseTombstone,
  SyncChange,
  UserState
} from "../types";

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

export const createInitialState = (): UserState => ({
  anonymousId: createId("guest"),
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
    return {
      ...parsed,
      reviewItems: (parsed.reviewItems ?? []).map(normalizeReviewItem),
      savedPhrases: resolvedSavedPhrases.savedPhrases,
      savedPhraseTombstones: resolvedSavedPhrases.savedPhraseTombstones,
      sync: {
        ...parsed.sync,
        pendingChanges: parsed.sync.pendingChanges ?? []
      }
    };
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

export const upsertLessonProgress = (
  state: UserState,
  lessonId: string,
  progress: LessonProgress
): UserState =>
  saveState({
    ...state,
    lessonProgress: {
      ...state.lessonProgress,
      [lessonId]: progress
    }
  });

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
  const lessonProgress = { ...account.lessonProgress };

  for (const [lessonId, guestProgress] of Object.entries(guest.lessonProgress)) {
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

  const reviewItems = new Map(account.reviewItems.map((item) => [item.id, normalizeReviewItem(item)]));
  for (const item of guest.reviewItems.map(normalizeReviewItem)) {
    const current = reviewItems.get(item.id);
    if (!current) {
      reviewItems.set(item.id, item);
      continue;
    }

    reviewItems.set(item.id, mergeReviewItem(current, item));
  }

  const resolvedSavedPhrases = resolveSavedPhraseState(
    [...(account.savedPhrases ?? []), ...(guest.savedPhrases ?? [])],
    [...(account.savedPhraseTombstones ?? []), ...(guest.savedPhraseTombstones ?? [])]
  );

  return {
    ...account,
    anonymousId: guest.anonymousId,
    accountEmail: email ?? guest.accountEmail ?? account.accountEmail,
    onboarding: guest.onboarding ?? account.onboarding,
    lessonProgress,
    reviewItems: Array.from(reviewItems.values()),
    savedPhrases: resolvedSavedPhrases.savedPhrases,
    savedPhraseTombstones: resolvedSavedPhrases.savedPhraseTombstones,
    analyticsEvents: [...account.analyticsEvents, ...guest.analyticsEvents],
    sync: {
      ...account.sync,
      ...guest.sync,
      pending: account.sync.pending || guest.sync.pending,
      pendingChanges: mergeSyncChanges(account.sync.pendingChanges, guest.sync.pendingChanges)
    },
    updatedAt: now()
  };
};
