export type CountryPackId = "us-en" | "jp-ja" | "cn-zh" | "vn-vi" | "mx-es";
export type CharacterId = "haneul" | "jun" | "mina" | "taeho";
export type KoreanLevel = "first-time" | "beginner" | "returning" | "daily";
export type LearningGoal = "travel" | "daily" | "study" | "work" | "life" | "k-content";
export type DailyGoalMinutes = 3 | 5 | 10 | 15;
export type LessonStatus = "not-started" | "in-progress" | "completed";

export interface CountryLearningGuide {
  focus: string;
  pronunciation: string;
  grammarBridge: string;
  reviewHabit: string;
  offlineTip: string;
}

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
  learningGuide: CountryLearningGuide;
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
  voiceProfile: VoiceProfile;
  countryGreetings: Record<CountryPackId, string>;
}

export type AudioProvider = "browser_speech_synthesis" | "local_tts" | "manual_import" | "placeholder";
export type AudioSourceType = "free_tts" | "browser_speech_synthesis" | "manual_import" | "placeholder";
export type AudioLicenseStatus =
  | "browser_runtime"
  | "open_source_license_confirmed"
  | "manual_import_to_be_confirmed"
  | "internal_testing_only"
  | "to_be_confirmed";
export type AudioCommercialUse = "allowed" | "browser_runtime" | "unknown" | "not_allowed";

export interface VoiceProfile {
  provider: AudioProvider;
  sourceType: AudioSourceType;
  voiceId: string;
  displayName: string;
  licenseStatus: AudioLicenseStatus;
  commercialUse: AudioCommercialUse;
  rateNatural: number;
  rateSlow: number;
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
  sourceType: AudioSourceType;
  provider: AudioProvider;
  voiceId: string;
  licenseStatus: AudioLicenseStatus;
  commercialUse: AudioCommercialUse;
  generatedAt?: string;
  generatedBy: string;
  replaceBeforeProduction: boolean;
  rateNatural: number;
  rateSlow: number;
  fallback: {
    type: "browser_speech_synthesis";
    lang: "ko-KR";
    rateNatural: number;
    rateSlow: number;
  };
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
  | "dialogue"
  | "character"
  | "phrase"
  | "structure"
  | "swap"
  | "scene-words"
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
  audioTargetId?: string;
  saveTargetId?: string;
  reviewWeight?: number;
}

export interface LocalizedPhrase {
  korean: string;
  romanization?: string;
  meaningByCountry: Record<CountryPackId, string>;
}

export interface LessonDialogueLine extends LocalizedPhrase {
  speaker: string;
}

export interface LessonStructure {
  pattern: string;
  explanationByCountry: Record<CountryPackId, string>;
}

export interface LessonSwapSlot extends LocalizedPhrase {
  label: string;
}

export interface LessonRoleplay {
  prompt: LocalizedPhrase;
  expected: LocalizedPhrase;
  fallback: LocalizedPhrase;
}

export interface LessonReviewCard {
  id: string;
  kind: "listen" | "speak" | "roleplay";
  promptByCountry: Record<CountryPackId, string>;
  phrase: LocalizedPhrase;
  reason: string;
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
  dialogue: LessonDialogueLine[];
  responsePhrase: LocalizedPhrase;
  rescuePhrase: LocalizedPhrase;
  structure: LessonStructure;
  swapSlots: LessonSwapSlot[];
  sceneWords: string[];
  roleplay: LessonRoleplay;
  reviewCards: LessonReviewCard[];
  countryNotes: Record<CountryPackId, string>;
  pronunciationByCountry: Record<CountryPackId, string>;
  audioTargets: Record<string, LocalizedPhrase>;
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
  kind?: LessonReviewCard["kind"];
  prompt?: string;
  reason: string;
  priority: number;
  dueAt: string;
  lastResult?: "success" | "hard";
}

export interface SavedPhrase {
  id: string;
  lessonId: string;
  phraseId: string;
  korean: string;
  romanization?: string;
  meaning: string;
  tags: string[];
  source: "core" | "response" | "rescue" | "swap" | "review" | "continuation";
  savedAt: string;
  lastPlayedAt?: string;
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
  savedPhrases: SavedPhrase[];
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
