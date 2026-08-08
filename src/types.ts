export type CountryPackId =
  | "us-en"
  | "jp-ja"
  | "cn-zh"
  | "vn-vi"
  | "mx-es"
  | "id-id"
  | "kh-km"
  | "mm-my"
  | "th-th"
  | "my-ms";
export type CharacterId = "haneul" | "jun" | "mina" | "taeho";
export type KoreanLevel = "first-time" | "beginner" | "returning" | "daily";
export type LearningGoal = "travel" | "daily" | "study" | "work" | "life" | "k-content";
export type CourseId = "foundation" | "travel" | "k-food" | "k-culture" | "eps-topik";
export type CourseExposure = "visible" | "preparing" | "hidden";
export type CourseStatus = "not-started" | "in-progress" | "completed";
export type CulturePackId = "k-pop" | "k-drama" | "k-beauty" | "k-webtoon";
export interface CultureRouteSelection {
  primaryPackId: CulturePackId;
  samplerPackId: CulturePackId;
}
export type CourseRouteSlotKind =
  | "lesson"
  | "common"
  | "primary"
  | "sampler"
  | "synthesis"
  | "capstone"
  | "assessment";
export type DailyGoalMinutes = 3 | 5 | 10 | 15;
export type LessonStatus = "not-started" | "in-progress" | "completed";

export interface CourseRouteSlot {
  slot: number;
  kind: CourseRouteSlotKind;
  lessonId: string;
  packId?: string;
}

export interface CourseCompletion {
  courseId: CourseId;
  routeVersion: string;
  completedAt: string;
  completedLessonIds: string[];
  summary?: string;
}

export interface CourseEnrollment {
  courseId: CourseId;
  routeVersion: string;
  startedAt?: string;
  lastOpenedAt?: string;
  routeLockedAt?: string;
  routeSlots?: CourseRouteSlot[];
  completions: CourseCompletion[];
  fieldUpdatedAt?: Partial<Record<"startedAt" | "lastOpenedAt" | "routeLockedAt" | "routeSlots" | "completions", string>>;
}

export type EpsAssessmentKind = "placement" | "stage-check" | "reading-practice" | "listening-practice" | "mock";
export type EpsAssessmentStatus = "in-progress" | "completed" | "expired" | "abandoned";

export interface EpsAttemptAnswer {
  questionId: string;
  answerId?: string;
  answeredAt: string;
}

export interface EpsAssessmentAttempt {
  attemptId: string;
  kind: EpsAssessmentKind;
  assessmentVersion: string;
  questionOrder: string[];
  answers: Record<string, EpsAttemptAnswer>;
  currentIndex: number;
  status: EpsAssessmentStatus;
  startedAt: string;
  expiresAt?: string;
  lastSavedAt: string;
  unavailableQuestionIds: string[];
}

export interface EpsAssessmentResult {
  attemptId: string;
  kind: EpsAssessmentKind;
  assessmentVersion: string;
  completedAt: string;
  correctCount: number;
  totalCount: number;
  stageRecommendations: string[];
}

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

export type SpeakerRole = "learner" | "partner" | "staff" | "driver" | "friend" | "tutor";

export interface LessonDialogueLine extends LocalizedPhrase {
  speaker: string;
  speakerRole: SpeakerRole;
}

export interface LessonStructure {
  pattern: string;
  explanationByCountry: Record<CountryPackId, string>;
}

export interface LessonSwapSlot extends LocalizedPhrase {
  label?: string;
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
  reasonByCountry: Record<CountryPackId, string>;
}

export type BridgeSkillId =
  | "polite-ending"
  | "sign"
  | "location-direction"
  | "price-quantity"
  | "time"
  | "time-date"
  | "request"
  | "prohibition"
  | "condition"
  | "comparison"
  | "schedule-table"
  | "label-instruction"
  | "number-listening"
  | "next-response"
  | "situation-match"
  | "quantity"
  | "polite-request"
  | "practical-reading"
  | "question"
  | "warning"
  | "ingredient"
  | "order"
  | "items"
  | "service-request"
  | "option"
  | "preference"
  | "instruction"
  | "sequence"
  | "payment"
  | "problem-report";

export type TravelMissionCheckId = "first-sentence" | "short-response" | "rescue-expression";

export interface TravelMissionCheck {
  id: TravelMissionCheckId;
  promptByCountry: Record<CountryPackId, string>;
  successLabelByCountry: Record<CountryPackId, string>;
  practiceMoreLabelByCountry: Record<CountryPackId, string>;
}

export type TravelMissionCheckResult = "success" | "practice-more";

export interface TravelMissionResult {
  lessonId: string;
  completedAt: string;
  checks: Record<TravelMissionCheckId, TravelMissionCheckResult>;
}

export type KFoodMissionCheckId = "choose-food" | "short-order" | "resolve-problem";

export interface KFoodMissionCheck {
  id: KFoodMissionCheckId;
}

export type KFoodMissionCheckResult = "success" | "practice-more";

export interface KFoodMissionResult {
  lessonId: "k-food-day-14";
  completedAt: string;
  checks: Record<KFoodMissionCheckId, KFoodMissionCheckResult>;
}

export interface Lesson {
  id: string;
  courseId?: CourseId;
  day: number;
  title: Record<CountryPackId, string>;
  situation: Record<CountryPackId, string>;
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
  bridgeSkillIds?: BridgeSkillId[];
  travelMissionChecks?: TravelMissionCheck[];
  kFoodMissionChecks?: KFoodMissionCheck[];
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
  courseId?: CourseId;
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
  successCount?: number;
  hardCount?: number;
  lastReviewedAt?: string;
  updatedAt?: string;
}

export interface SavedPhrase {
  id: string;
  courseId?: CourseId;
  lessonId: string;
  phraseId: string;
  korean: string;
  romanization?: string;
  meaning: string;
  tags: string[];
  source: "core" | "response" | "rescue" | "swap" | "review" | "continuation";
  savedAt: string;
  lastPlayedAt?: string;
  updatedAt?: string;
}

export interface SavedPhraseTombstone extends SavedPhrase {
  deletedAt: string;
  updatedAt: string;
}

export interface LessonProgress {
  lessonId: string;
  courseId?: CourseId;
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
  activeCourseId: CourseId;
  activeCourseChangedAt: string;
  courseEnrollments: Partial<Record<CourseId, CourseEnrollment>>;
  epsAssessmentAttempts: Record<string, EpsAssessmentAttempt>;
  epsAssessmentResults: Record<string, EpsAssessmentResult>;
  travelMissionResults?: Record<string, TravelMissionResult>;
  kFoodMissionResults?: Record<string, KFoodMissionResult>;
  lessonProgress: Record<string, LessonProgress>;
  reviewItems: ReviewItem[];
  savedPhrases: SavedPhrase[];
  savedPhraseTombstones: SavedPhraseTombstone[];
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
  messageKey?: string;
  pendingChanges?: SyncChange[];
}

export interface SyncChange {
  entity:
    | "review-item"
    | "saved-phrase"
    | "profile-course-preference"
    | "course-enrollment"
    | "course-mission-result"
    | "eps-assessment-attempt"
    | "eps-assessment-result";
  entityId: string;
  operation: "upsert" | "delete";
  changedAt: string;
}
