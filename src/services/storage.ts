import type { LessonProgress, OnboardingProfile, ReviewItem, UserState } from "../types";

const STATE_KEY = "korean-first-talk:user-state:v1";
const CLOUD_PREFIX = "korean-first-talk:cloud-profile:";

const now = () => new Date().toISOString();

const createId = (prefix: string) => `${prefix}-${crypto.randomUUID?.() ?? Math.random().toString(36).slice(2)}`;

const normalizeEmail = (email: string) => email.trim().toLowerCase();

export const createInitialState = (): UserState => ({
  anonymousId: createId("guest"),
  lessonProgress: {},
  reviewItems: [],
  analyticsEvents: [],
  sync: {
    mode: hasSupabaseEnvironment() ? "supabase-ready" : "local-only",
    pending: false,
    message: hasSupabaseEnvironment()
      ? "Supabase environment variables are present. Cloud sync can be connected."
      : "로컬에 안전하게 저장 중입니다. 새 Supabase 프로젝트 정보가 준비되면 동기화할 수 있습니다."
  },
  updatedAt: now()
});

export const hasSupabaseEnvironment = () =>
  Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

export const loadState = (): UserState => {
  const raw = localStorage.getItem(STATE_KEY);
  if (!raw) return createInitialState();

  try {
    return { ...createInitialState(), ...JSON.parse(raw) } as UserState;
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
  const existing = new Map(state.reviewItems.map((item) => [item.id, item]));
  for (const item of items) {
    const current = existing.get(item.id);
    existing.set(item.id, current && current.priority > item.priority ? current : item);
  }
  return saveState({ ...state, reviewItems: Array.from(existing.values()) });
};

export const completeReviewItem = (state: UserState, reviewItemId: string, result: "success" | "hard"): UserState =>
  saveState({
    ...state,
    reviewItems: state.reviewItems.map((item) =>
      item.id === reviewItemId
        ? {
            ...item,
            lastResult: result,
            dueAt: new Date(Date.now() + (result === "success" ? 72 : 12) * 60 * 60 * 1000).toISOString()
          }
        : item
    )
  });

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
      message: hasSupabaseEnvironment()
        ? "계정 진도와 로컬 진도를 병합했습니다. Supabase 연결 후 클라우드 저장을 실행할 수 있습니다."
        : "계정 진도와 로컬 진도를 이 브라우저의 계정 저장소에 병합했습니다."
    }
  });
};

export const logoutLocalAccount = (state: UserState): UserState =>
  saveState({
    ...state,
    accountEmail: undefined,
    sync: {
      ...state.sync,
      message: "로그아웃했습니다. 비회원 진도는 이 기기에 계속 보관됩니다."
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

  const reviewItems = new Map(account.reviewItems.map((item) => [item.id, item]));
  for (const item of guest.reviewItems) {
    if (!reviewItems.has(item.id)) reviewItems.set(item.id, item);
  }

  return {
    ...account,
    anonymousId: guest.anonymousId,
    accountEmail: email ?? guest.accountEmail ?? account.accountEmail,
    onboarding: guest.onboarding ?? account.onboarding,
    lessonProgress,
    reviewItems: Array.from(reviewItems.values()),
    analyticsEvents: [...account.analyticsEvents, ...guest.analyticsEvents],
    updatedAt: now()
  };
};
