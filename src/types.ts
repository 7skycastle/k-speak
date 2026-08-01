export type CountryPackId = "us-en" | "jp-ja" | "cn-zh" | "vn-vi" | "mx-es";
export type CharacterId = "haneul" | "jun" | "mina" | "taeho";
export type KoreanLevel = "first-time" | "beginner" | "returning" | "daily";
export type LearningGoal = "travel" | "daily" | "study" | "work" | "life" | "k-content";
export type DailyGoalMinutes = 3 | 5 | 10 | 15;
export type LessonStatus = "not-started" | "in-progress" | "completed";

export interface CountryPack {
  id: CountryPackId;
  label: string;
  nativeLabel: string;
  interfaceLanguage: string;
  onboardingNote: string;
  cultureNote: string;
  roleplaySituation: string;
  feedback: string[];
  reminders: string[];
  comebackMessage: string;
  preferredGoals: LearningGoal[];
  defaultDailyGoal: DailyGoalMinutes;
  notificationWindow: string;
  dateTimeFormat: string;
  currency: string;
  disabledFeatures: string[];
  privacyNote: string;
  translations: {
    start: string;
    continue: string;
    review: string;
    settings: string;
    lesson: string;
  };
}

export interface TutorCharacter {
  id: CharacterId;
  name: string;
  intro: string;
  tone: string;
  learnerFeeling: string;
  recommendedFor: string;
  voiceId: string;
  hasRecordedVoice: boolean;
  usesTtsFallback: boolean;
  countryGreetings: Record<CountryPackId, string>;
}

export interface AudioSlot {
  id: string;
  characterId: CharacterId;
  lessonId: string;
  sentenceId: string;
  naturalUrl?: string;
  slowUrl?: string;
  chunkUrls?: string[];
  version: string;
  rights: string;
  replacementNote: string;
  usesTtsFallback: boolean;
}

export interface OnboardingProfile {
  countryPackId: CountryPackId;
  nativeLanguage: string;
  koreanLevel: KoreanLevel;
  learningGoal: LearningGoal;
  dailyGoalMinutes: DailyGoalMinutes;
  characterId: CharacterId;
  reminderTime: string;
  completedAt?: string;
}

export type LessonStepKind =
  | "situation"
  | "character"
  | "phrase"
  | "meaning"
  | "listen"
  | "repeat"
  | "record"
  | "compare"
  | "quiz"
  | "roleplay"
  | "summary";

export interface LessonStep {
  id: string;
  kind: LessonStepKind;
  title: string;
  body: string;
  korean?: string;
  romanization?: string;
  choices?: string[];
  answer?: string;
  hint?: string;
  reviewWeight?: number;
}

export interface Lesson {
  id: string;
  day: number;
  title: string;
  situation: string;
  phraseId: string;
  korean: string;
  romanization: string;
  meaningByCountry: Record<CountryPackId, string>;
  steps: LessonStep[];
}

export interface StepMetrics {
  stepId: string;
  answeredCorrectly?: boolean;
  responseMs?: number;
  usedHint?: boolean;
  naturalPlayCount: number;
  slowPlayCount: number;
  recordingRetries: number;
  markedDifficult?: boolean;
  completedAt?: string;
}

export interface ReviewItem {
  id: string;
  lessonId: string;
  phraseId: string;
  korean: string;
  meaning: string;
  reason: string;
  priority: number;
  dueAt: string;
  lastResult?: "success" | "hard";
}

export interface LessonProgress {
  lessonId: string;
  status: LessonStatus;
  currentStepId: string;
  completedStepIds: string[];
  startedAt?: string;
  completedAt?: string;
  metrics: Record<string, StepMetrics>;
}

export interface UserState {
  anonymousId: string;
  accountEmail?: string;
  onboarding?: OnboardingProfile;
  lessonProgress: Record<string, LessonProgress>;
  reviewItems: ReviewItem[];
  analyticsEvents: AnalyticsEvent[];
  sync: SyncState;
  updatedAt: string;
}

export interface AnalyticsEvent {
  id: string;
  name: string;
  userId: string;
  accountEmail?: string;
  countryPackId?: CountryPackId;
  interfaceLanguage?: string;
  koreanLevel?: KoreanLevel;
  learningGoal?: LearningGoal;
  characterId?: CharacterId;
  lessonId?: string;
  stepId?: string;
  durationMs?: number;
  success?: boolean;
  aborted?: boolean;
  errorCode?: string;
  occurredAt: string;
}

export interface SyncState {
  mode: "local-only" | "supabase-ready";
  cloudUserId?: string;
  lastSyncedAt?: string;
  pending: boolean;
  message: string;
}
