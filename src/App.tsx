import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Bookmark,
  Check,
  Copy,
  Home,
  LoaderCircle,
  LogIn,
  LogOut,
  Mic,
  Pause,
  Play,
  RefreshCcw,
  RotateCcw,
  Settings,
  Sparkles,
  Trash2,
  Volume2
} from "lucide-react";
import { getCharacter, tutorCharacters } from "./data/characters";
import { countryPacks, getCountryPack } from "./data/countryPacks";
import { getContinuationTrack, type ContinuationModule } from "./data/continuationProgram";
import { getLesson, getNextLesson, lessons } from "./data/lessons";
import { audioCatalog, findAudioSlot } from "./data/audioCatalog";
import { buildReviewItems, getDueReviewItems } from "./engine/reviewEngine";
import {
  completeStep,
  createLessonProgress,
  getCurrentStep,
  getLessonPercent,
  updateStepMetrics
} from "./engine/lessonEngine";
import { trackEvent } from "./services/analytics";
import {
  completeReviewItem,
  loadState,
  logoutLocalAccount,
  markSavedPhrasePlayed,
  mergeGuestIntoAccount,
  removeSavedPhrase,
  updateOnboarding,
  upsertLessonProgress,
  upsertReviewItems,
  upsertSavedPhrase
} from "./services/storage";
import { markSyncAttempt } from "./services/sync";
import {
  requestEmailSignIn,
  signOutFromSupabase,
  subscribeToSupabaseAuth,
  syncWithSupabase
} from "./services/cloudSync";
import { playLessonAudio, type AudioPlaybackResult } from "./utils/audioPlayback";
import { recognizeKorean, isRecognitionSupported, type RecognitionResult } from "./utils/speechRecognition";
import { speakKorean } from "./utils/speech";
import { t, createTranslator, type UiKey } from "./i18n";
import type {
  CharacterId,
  CountryPackId,
  DailyGoalMinutes,
  KoreanLevel,
  LearningGoal,
  LessonProgress,
  LessonStep,
  OnboardingProfile,
  SavedPhrase,
  UserState
} from "./types";

type Tab = "home" | "lesson" | "review" | "settings";
type RecorderState = "idle" | "requesting" | "recording" | "denied" | "unsupported" | "ready";

const getRecognitionStatusKey = (code: string): UiKey => {
  switch (code) {
    case "unsupported":
      return "recorder.recognitionUnsupported";
    case "not-allowed":
    case "service-not-allowed":
      return "recorder.recognitionDenied";
    default:
      return "recorder.recognitionFailed";
  }
};

const levelUiKey: Record<KoreanLevel, UiKey> = {
  "first-time": "level.first-time",
  beginner: "level.beginner",
  returning: "level.returning",
  daily: "level.daily"
};

const goalUiKey: Record<LearningGoal, UiKey> = {
  travel: "goal.travel",
  daily: "goal.daily",
  study: "goal.study",
  work: "goal.work",
  life: "goal.life",
  "k-content": "goal.k-content"
};

const kindUiKey: Record<string, UiKey> = {
  listen: "kind.listen",
  speak: "kind.speak",
  roleplay: "kind.roleplay",
  core: "kind.core",
  response: "kind.response",
  rescue: "kind.rescue",
  swap: "kind.swap",
  continuation: "kind.continuation",
  review: "kind.review"
};

const goalOptions: LearningGoal[] = ["travel", "daily", "study", "work", "life", "k-content"];
const levelOptions: KoreanLevel[] = ["first-time", "beginner", "returning", "daily"];
const minuteOptions: DailyGoalMinutes[] = [3, 5, 10, 15];

const audioTargetCount = lessons.reduce((count, lesson) => count + Object.keys(lesson.audioTargets).length, 0);
const totalAudioSlots = audioTargetCount * tutorCharacters.length;
const staticAudioSlots = audioCatalog.filter((slot) => slot.naturalUrl && slot.slowUrl).length;
const fallbackAudioSlots = totalAudioSlots - staticAudioSlots;
const primaryCourseLessons = lessons.filter((lesson) => lesson.day <= 14);
const hasRemainingLessons = (state: UserState) => lessons.some((lesson) => state.lessonProgress[lesson.id]?.status !== "completed");

const isPrimaryCourseCompleted = (state: UserState) =>
  primaryCourseLessons.every((lesson) => state.lessonProgress[lesson.id]?.status === "completed");

const getCompletedPrimaryLessonCount = (state: UserState) =>
  primaryCourseLessons.filter((lesson) => state.lessonProgress[lesson.id]?.status === "completed").length;

const formatDueLabel = (iso: string, packId: CountryPackId) => {
  const deltaMs = new Date(iso).getTime() - Date.now();
  if (deltaMs <= 0) return t("time.now", packId);
  const hours = Math.ceil(deltaMs / (60 * 60 * 1000));
  if (hours < 24) return t("time.hoursLater", packId, { hours });
  return t("time.daysLater", packId, { days: Math.ceil(hours / 24) });
};

const getContinuationStartDay = (module: ContinuationModule) => module.dayRange.match(/\d+/)?.[0] ?? "15";

const defaultOnboarding: OnboardingProfile = {
  countryPackId: "us-en",
  nativeLanguage: "English",
  koreanLevel: "first-time",
  learningGoal: "travel",
  dailyGoalMinutes: 5,
  characterId: "haneul",
  reminderTime: "19:30"
};

export const App = () => {
  const [state, setState] = useState<UserState>(() => loadState());
  const [tab, setTab] = useState<Tab>("home");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const onboarding = state.onboarding;
  const countryPack = getCountryPack(onboarding?.countryPackId);
  const character = getCharacter(onboarding?.characterId);
  const currentLesson = getNextLesson(state.lessonProgress);
  const progress = state.lessonProgress[currentLesson.id];
  const dueReviews = getDueReviewItems(state.reviewItems);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 250);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.documentElement.lang = countryPack.id.split("-")[1];
  }, [countryPack.id]);

  useEffect(() => {
    setState((current) => trackEvent(current, { name: "app_first_open" }));
  }, []);

  useEffect(() => {
    let mounted = true;
    syncWithSupabase(loadState())
      .then((next) => {
        if (mounted) setState(next);
      })
      .catch((syncError) => {
        if (mounted) setError(syncError instanceof Error ? syncError.message : t("error.sync", countryPack.id));
      });

    const unsubscribe = subscribeToSupabaseAuth((session) => {
      setState((current) => {
        syncWithSupabase(current, session)
          .then((next) => setState(next))
          .catch((syncError) =>
            setError(syncError instanceof Error ? syncError.message : t("error.auth", countryPack.id))
          );
        return current;
      });
    });

    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  const startLesson = () => {
    if (!hasRemainingLessons(state)) {
      setTab("home");
      return;
    }

    setState((current) => {
      const lesson = getNextLesson(current.lessonProgress);
      const existing = current.lessonProgress[lesson.id];
      const nextProgress = existing ?? createLessonProgress(lesson.id);
      const saved = upsertLessonProgress(current, lesson.id, nextProgress);
      return trackEvent(saved, { name: existing ? "lesson_resume" : "lesson_start", lessonId: lesson.id });
    });
    setTab("lesson");
  };

  const completeOnboarding = (profile: OnboardingProfile) => {
    setState((current) => {
      const saved = updateOnboarding(current, profile);
      return trackEvent(saved, {
        name: "onboarding_completed",
        countryPackId: profile.countryPackId,
        koreanLevel: profile.koreanLevel,
        learningGoal: profile.learningGoal,
        characterId: profile.characterId
      });
    });
    setTab("lesson");
    window.setTimeout(startLesson, 0);
  };

  const updateState = (next: UserState) => setState(next);

  if (isLoading) {
    return (
      <Shell tab={tab} setTab={setTab} packId={countryPack.id}>
        <StatePanel
          icon={<LoaderCircle className="spin" />}
          title={t("state.loading.title", countryPack.id)}
          body={t("state.loading.body", countryPack.id)}
        />
      </Shell>
    );
  }

  return (
    <Shell tab={tab} setTab={setTab} packId={countryPack.id}>
      {error && <StatusBanner tone="error" text={error} onClose={() => setError("")} packId={countryPack.id} />}
      {!onboarding ? (
        <OnboardingFlow onComplete={completeOnboarding} />
      ) : (
        <>
          {tab === "home" && (
            <HomeScreen
              state={state}
              characterName={character.name}
              lesson={currentLesson}
              progress={progress}
              reviewCount={dueReviews.length}
              savedCount={state.savedPhrases?.length ?? 0}
              onStartLesson={startLesson}
              onReview={() => setTab("review")}
              onLogin={() => setTab("settings")}
              onPersist={updateState}
            />
          )}
          {tab === "lesson" && (
            <LessonScreen
              state={state}
              lessonId={currentLesson.id}
              progress={progress}
              onPersist={updateState}
              onError={setError}
              onPause={() => setTab("home")}
              onComplete={() => setTab("home")}
            />
          )}
          {tab === "review" && (
            <ReviewScreen state={state} onPersist={updateState} onStartLesson={startLesson} onReturnHome={() => setTab("home")} />
          )}
          {tab === "settings" && (
            <SettingsScreen
              state={state}
              onPersist={updateState}
              onError={setError}
              onOnboardingChange={(profile) => setState((current) => updateOnboarding(current, profile))}
            />
          )}
        </>
      )}
    </Shell>
  );
};

const Shell = ({
  children,
  tab,
  setTab,
  packId
}: {
  children: React.ReactNode;
  tab: Tab;
  setTab: (tab: Tab) => void;
  packId: CountryPackId;
}) => {
  const tr = createTranslator(packId);
  return (
    <div className="app-shell">
      <main className="screen">{children}</main>
      <nav className="bottom-nav" aria-label={tr("nav.ariaLabel")}>
        <NavButton icon={<Home />} label={tr("nav.home")} active={tab === "home"} onClick={() => setTab("home")} />
        <NavButton icon={<BookOpen />} label={tr("nav.lesson")} active={tab === "lesson"} onClick={() => setTab("lesson")} />
        <NavButton icon={<RefreshCcw />} label={tr("nav.review")} active={tab === "review"} onClick={() => setTab("review")} />
        <NavButton icon={<Settings />} label={tr("nav.settings")} active={tab === "settings"} onClick={() => setTab("settings")} />
      </nav>
    </div>
  );
};

const NavButton = ({
  icon,
  label,
  active,
  onClick
}: {
  icon: React.ReactElement;
  label: string;
  active: boolean;
  onClick: () => void;
}) => (
  <button className={`nav-button ${active ? "active" : ""}`} onClick={onClick} aria-current={active ? "page" : undefined}>
    {icon}
    <span>{label}</span>
  </button>
);

const OnboardingFlow = ({ onComplete }: { onComplete: (profile: OnboardingProfile) => void }) => {
  const [step, setStep] = useState(0);
  const [profile, setProfile] = useState<OnboardingProfile>(defaultOnboarding);
  const pack = getCountryPack(profile.countryPackId);
  const character = getCharacter(profile.characterId);
  const totalSteps = 6;
  const tr = createTranslator(pack.id);

  const updateProfile = (patch: Partial<OnboardingProfile>) => {
    const next = { ...profile, ...patch };
    if (patch.countryPackId) {
      const selectedPack = getCountryPack(patch.countryPackId);
      next.nativeLanguage = selectedPack.nativeLabel;
      next.dailyGoalMinutes = selectedPack.defaultDailyGoal;
    }
    setProfile(next);
  };

  return (
    <section className="flow">
      <ProgressHeader current={step + 1} total={totalSteps} title={tr("onboarding.title")} />
      {step === 0 && (
        <Panel title={tr("onboarding.step0.title")} kicker={tr("onboarding.step0.kicker")}>
          <p className="muted">{pack.onboardingNote}</p>
          <div className="option-grid">
            {countryPacks.map((country) => (
              <button
                key={country.id}
                className={`choice ${profile.countryPackId === country.id ? "selected" : ""}`}
                onClick={() => updateProfile({ countryPackId: country.id })}
              >
                <strong>{country.label}</strong>
                <span>{country.nativeLabel}</span>
              </button>
            ))}
          </div>
        </Panel>
      )}
      {step === 1 && (
        <Panel title={tr("onboarding.step1.title")}>
          <div className="stack">
            {levelOptions.map((level) => (
              <button
                key={level}
                className={`row-choice ${profile.koreanLevel === level ? "selected" : ""}`}
                onClick={() => updateProfile({ koreanLevel: level })}
              >
                {tr(levelUiKey[level])}
              </button>
            ))}
          </div>
        </Panel>
      )}
      {step === 2 && (
        <Panel title={tr("onboarding.step2.title")}>
          <div className="option-grid">
            {goalOptions.map((goal) => (
              <button
                key={goal}
                className={`choice compact ${profile.learningGoal === goal ? "selected" : ""}`}
                onClick={() => updateProfile({ learningGoal: goal })}
              >
                <strong>{tr(goalUiKey[goal])}</strong>
              </button>
            ))}
          </div>
        </Panel>
      )}
      {step === 3 && (
        <Panel title={tr("onboarding.step3.title")}>
          <div className="minute-row">
            {minuteOptions.map((minutes) => (
              <button
                key={minutes}
                className={`minute ${profile.dailyGoalMinutes === minutes ? "selected" : ""}`}
                onClick={() => updateProfile({ dailyGoalMinutes: minutes })}
              >
                {minutes}
                <span>{tr("onboarding.minuteUnit")}</span>
              </button>
            ))}
          </div>
        </Panel>
      )}
      {step === 4 && (
        <Panel title={tr("onboarding.step4.title")}>
          <div className="stack">
            {tutorCharacters.map((tutor) => (
              <button
                key={tutor.id}
                className={`character-row ${profile.characterId === tutor.id ? "selected" : ""}`}
                onClick={() => updateProfile({ characterId: tutor.id })}
              >
                <span className="avatar">{tutor.name.slice(0, 1)}</span>
                <span>
                  <strong>{tutor.name}</strong>
                  <small>{tutor.learnerFeeling}</small>
                </span>
              </button>
            ))}
          </div>
        </Panel>
      )}
      {step === 5 && (
        <Panel title={tr("onboarding.step5.title")}>
          <div className="summary-list">
            <SummaryRow label={tr("onboarding.field.country")} value={`${pack.label} / ${pack.nativeLabel}`} />
            <SummaryRow label={tr("onboarding.field.goal")} value={tr(goalUiKey[profile.learningGoal])} />
            <SummaryRow
              label={tr("onboarding.field.dailyGoal")}
              value={`${profile.dailyGoalMinutes} ${tr("onboarding.minuteUnit")}`}
            />
            <SummaryRow label={tr("onboarding.field.tutor")} value={`${character.name} - ${character.tone}`} />
            <label className="field">
              <span>{tr("onboarding.field.reminderTime")}</span>
              <input
                type="time"
                value={profile.reminderTime}
                onChange={(event) => updateProfile({ reminderTime: event.target.value })}
              />
            </label>
          </div>
        </Panel>
      )}
      <div className="sticky-actions">
        <button className="secondary-action" disabled={step === 0} onClick={() => setStep((value) => Math.max(0, value - 1))}>
          {tr("common.prev")}
        </button>
        <button
          className="primary-action"
          onClick={() => (step === totalSteps - 1 ? onComplete(profile) : setStep((value) => value + 1))}
        >
          {step === totalSteps - 1 ? tr("onboarding.cta") : tr("common.next")}
        </button>
      </div>
    </section>
  );
};

const HomeScreen = ({
  state,
  characterName,
  lesson,
  progress,
  reviewCount,
  savedCount,
  onStartLesson,
  onReview,
  onLogin,
  onPersist
}: {
  state: UserState;
  characterName: string;
  lesson: ReturnType<typeof getLesson>;
  progress?: LessonProgress;
  reviewCount: number;
  savedCount: number;
  onStartLesson: () => void;
  onReview: () => void;
  onLogin: () => void;
  onPersist: (state: UserState) => void;
}) => {
  const percent = progress ? getLessonPercent(progress) : 0;
  const countryPack = getCountryPack(state.onboarding?.countryPackId);
  const packId = countryPack.id;
  const tr = createTranslator(packId);
  const continuationTrack = getContinuationTrack(state.onboarding?.learningGoal);
  const completedCount = getCompletedPrimaryLessonCount(state);
  const courseCompleted = isPrimaryCourseCompleted(state);
  const continuationSavedIds = new Set((state.savedPhrases ?? []).map((phrase) => phrase.id));
  const saveContinuationPhrase = (module: ContinuationModule, phrase: string, phraseIndex: number) => {
    const startDay = getContinuationStartDay(module);
    const phraseId = `${continuationTrack.id}-${startDay}-${phraseIndex + 1}`;
    const saved = upsertSavedPhrase(state, {
      id: `day-${startDay}:${phraseId}`,
      lessonId: `day-${startDay}`,
      phraseId,
      korean: phrase,
      meaning: module.outcome,
      tags: ["continuation", continuationTrack.id, module.title],
      source: "continuation",
      savedAt: new Date().toISOString()
    });
    onPersist(trackEvent(saved, { name: "continuation_phrase_saved", lessonId: `day-${startDay}`, success: true }));
  };
  return (
    <section className="flow">
      <header className="home-hero">
        <span className="kicker">Korean First Talk</span>
        <h1>{tr("home.hero.title")}</h1>
        <p>
          {state.accountEmail
            ? tr("home.hero.loggedIn", { email: state.accountEmail })
            : tr("home.hero.anonymous")}
        </p>
      </header>
      <div className="home-grid">
        <Metric
          label={tr("home.metric.todayLesson")}
          value={progress?.status === "completed" ? tr("home.lesson.dayDone", { day: lesson.day }) : tr("home.lesson.day", { day: lesson.day })}
        />
        <Metric label={tr("home.metric.reviewCount")} value={String(reviewCount)} />
        <Metric label={tr("home.metric.savedCount")} value={String(savedCount)} />
        <Metric label={tr("home.metric.tutor")} value={characterName} />
      </div>
      <Panel title={progress?.status === "completed" ? tr("home.panel.lessonCompleted") : tr("home.panel.lessonInProgress")}>
        <div className="lesson-preview">
          <div>
            <strong>
              {tr("home.lesson.heading", { day: lesson.day, title: lesson.title[countryPack.id] })}
            </strong>
            <p className="muted">
              {tr("home.lesson.meta", { percent, dailyGoal: state.onboarding?.dailyGoalMinutes ?? 5 })}
            </p>
          </div>
          <button className="primary-action inline" onClick={onStartLesson}>
            {progress ? tr("home.lesson.resume") : tr("common.start")}
          </button>
        </div>
        <div
          className="progress-track"
          aria-label={tr("home.lesson.progressAriaLabel", { day: lesson.day, percent })}
        >
          <span style={{ width: `${percent}%` }} />
        </div>
      </Panel>
      <ContinuationPathPanel
        track={continuationTrack}
        completedCount={completedCount}
        courseCompleted={courseCompleted}
        savedIds={continuationSavedIds}
        onSavePhrase={saveContinuationPhrase}
        packId={packId}
      />
      <AudioReadinessPanel packId={packId} />
      <CountryLearningGuidePanel countryPack={countryPack} />
      {reviewCount > 0 ? (
        <button className="wide-button review" onClick={onReview}>
          <RefreshCcw />
          {tr("home.review.cta")}
        </button>
      ) : (
        <StatePanel
          icon={<Sparkles />}
          title={tr("home.review.emptyTitle")}
          body={tr("home.review.emptyBody")}
        />
      )}
      {!state.accountEmail && (
        <button className="wide-button quiet" onClick={onLogin}>
          <LogIn />
          {tr("home.login.cta")}
        </button>
      )}
    </section>
  );
};

export const ContinuationPathPanel = ({
  track,
  completedCount,
  courseCompleted,
  savedIds,
  onSavePhrase,
  packId
}: {
  track: ReturnType<typeof getContinuationTrack>;
  completedCount: number;
  courseCompleted: boolean;
  savedIds: Set<string>;
  onSavePhrase: (module: ContinuationModule, phrase: string, phraseIndex: number) => void;
  packId: CountryPackId;
}) => {
  const tr = createTranslator(packId);
  return (
    <Panel title={courseCompleted ? tr("continuation.panelCompleted") : tr("continuation.panelInProgress")}>
      <div className="path-summary">
        <span className="review-badge">{tr("continuation.progress", { count: completedCount })}</span>
        <div>
          <strong>{track.title}</strong>
          <p className="muted">{track.promise}</p>
        </div>
      </div>
      <div className="program-grid">
        {track.modules.map((module) => (
          <div className="program-card" key={module.dayRange}>
            <span>{module.dayRange}</span>
            <strong>{module.title}</strong>
            <p>{module.outcome}</p>
            <div className="continuation-phrases">
              {module.samplePhrases.map((phrase, phraseIndex) => {
                const startDay = getContinuationStartDay(module);
                const savedId = `day-${startDay}:${track.id}-${startDay}-${phraseIndex + 1}`;
                const isSaved = savedIds.has(savedId);
                return (
                  <div className="continuation-phrase" key={phrase}>
                    <span>{phrase}</span>
                    <div>
                      <button
                        className="icon-button compact"
                        onClick={() => speakKorean(phrase, 1)}
                        aria-label={tr("continuation.listenAriaLabel", { phrase })}
                      >
                        <Play />
                        {tr("continuation.listen")}
                      </button>
                      <button
                        className="icon-button compact"
                        onClick={() => speakKorean(phrase, 0.72)}
                        aria-label={tr("continuation.slowAriaLabel", { phrase })}
                      >
                        <Volume2 />
                        {tr("continuation.slow")}
                      </button>
                      <button
                        className={`icon-button compact ${isSaved ? "saved" : ""}`}
                        onClick={() => onSavePhrase(module, phrase, phraseIndex)}
                        aria-label={tr("continuation.saveAriaLabel", { phrase })}
                      >
                        <Bookmark />
                        {isSaved ? tr("continuation.saved") : tr("continuation.save")}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </Panel>
  );
};

const AudioReadinessPanel = ({ packId }: { packId: CountryPackId }) => {
  const tr = createTranslator(packId);
  const readinessKey = staticAudioSlots === totalAudioSlots ? "audio.readinessReady" : "audio.readinessPending";
  return (
    <Panel title={tr("audio.readinessTitle")}>
      <div className="readiness-grid">
        <Metric label={tr("audio.slots")} value={String(totalAudioSlots)} />
        <Metric label={tr("audio.staticFiles")} value={String(staticAudioSlots)} />
        <Metric label={tr("audio.fallback")} value={String(fallbackAudioSlots)} />
      </div>
      <p className="muted">{tr(readinessKey)}</p>
    </Panel>
  );
};

const CountryLearningGuidePanel = ({ countryPack }: { countryPack: ReturnType<typeof getCountryPack> }) => {
  const tr = createTranslator(countryPack.id);
  return (
    <Panel title={tr("guide.panelTitle", { nativeLabel: countryPack.nativeLabel })}>
      <div className="guide-list">
        <SummaryRow label={tr("guide.focus")} value={countryPack.learningGuide.focus} />
        <SummaryRow label={tr("guide.pronunciation")} value={countryPack.learningGuide.pronunciation} />
        <SummaryRow label={tr("guide.structure")} value={countryPack.learningGuide.grammarBridge} />
        <SummaryRow label={tr("guide.review")} value={countryPack.learningGuide.reviewHabit} />
        <SummaryRow label={tr("guide.offline")} value={countryPack.learningGuide.offlineTip} />
      </div>
    </Panel>
  );
};

const LessonScreen = ({
  state,
  lessonId,
  progress,
  onPersist,
  onError,
  onPause,
  onComplete
}: {
  state: UserState;
  lessonId: string;
  progress?: LessonProgress;
  onPersist: (state: UserState) => void;
  onError: (message: string) => void;
  onPause: () => void;
  onComplete: () => void;
}) => {
  const lesson = getLesson(lessonId);
  const activeProgress = progress ?? createLessonProgress(lesson.id);
  const step = getCurrentStep(activeProgress);
  const character = getCharacter(state.onboarding?.characterId);
  const countryPack = getCountryPack(state.onboarding?.countryPackId);
  const packId = countryPack.id;
  const tr = createTranslator(packId);
  const meaning = lesson.meaningByCountry[countryPack.id];
  const audioTargetId = step.audioTargetId ?? "core";
  const audioTarget = lesson.audioTargets[audioTargetId] ?? lesson.audioTargets.core;
  const audioSlot = findAudioSlot(lesson.id, character.id, audioTargetId);
  const saveTarget = step.saveTargetId ? (lesson.audioTargets[step.saveTargetId] ?? lesson.audioTargets.core) : undefined;
  const savePhraseId = step.saveTargetId ? `${lesson.id}:${step.saveTargetId}` : "";
  const isSaved = Boolean(savePhraseId && (state.savedPhrases ?? []).some((item) => item.id === savePhraseId));
  const [selectedChoice, setSelectedChoice] = useState("");
  const [hintVisible, setHintVisible] = useState(false);
  const [startMs, setStartMs] = useState(Date.now());
  const [recorderState, setRecorderState] = useState<RecorderState>("idle");
  const [recordedUrl, setRecordedUrl] = useState("");
  const [audioStatus, setAudioStatus] = useState<AudioPlaybackResult | null>(null);
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const [recognitionResult, setRecognitionResult] = useState<RecognitionResult | null>(null);
  const [recognitionStatusKey, setRecognitionStatusKey] = useState<UiKey | null>(null);
  const stopRecognitionRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    if (!progress) {
      onPersist(upsertLessonProgress(state, lesson.id, activeProgress));
    }
  }, [activeProgress, lesson.id, onPersist, progress, state]);

  useEffect(() => {
    setSelectedChoice("");
    setHintVisible(false);
    setAudioStatus(null);
    setRecognitionResult(null);
    setRecognitionStatusKey(null);
    setStartMs(Date.now());
  }, [step.id]);

  const saveProgress = (nextProgress: LessonProgress, eventName?: string) => {
    let nextState = upsertLessonProgress(state, lesson.id, nextProgress);
    if (eventName) nextState = trackEvent(nextState, { name: eventName, lessonId: lesson.id, stepId: step.id });
    onPersist(nextState);
  };

  const playOriginal = async (rate: number) => {
    const result = await playLessonAudio(audioSlot, audioTarget.korean, rate < 1 ? "slow" : "natural");
    setAudioStatus(result);
    const metricKey = rate < 1 ? "slowPlayCount" : "naturalPlayCount";
    const currentMetric = activeProgress.metrics[step.id];
    let nextState = upsertLessonProgress(
      state,
      lesson.id,
      updateStepMetrics(activeProgress, step.id, {
        [metricKey]: (currentMetric?.[metricKey] ?? 0) + 1
      })
    );
    nextState = trackEvent(nextState, {
      name: rate < 1 ? "slow_audio_played" : "first_audio_played",
      lessonId: lesson.id,
      stepId: step.id,
      success: result.ok
    });
    if (result.usedFallback) {
      nextState = trackEvent(nextState, {
        name: "audio_fallback_used",
        lessonId: lesson.id,
        stepId: step.id,
        errorCode: result.errorCode
      });
    }
    onPersist(nextState);
    if (!result.ok) onError(tr(result.messageKey));
  };

  const saveCurrentPhrase = () => {
    if (!step.saveTargetId || !saveTarget) return;
    const source: SavedPhrase["source"] = step.saveTargetId.startsWith("swap")
      ? "swap"
      : step.saveTargetId === "rescue"
        ? "rescue"
        : step.saveTargetId === "response"
          ? "response"
          : "core";
    const saved = upsertSavedPhrase(state, {
      id: savePhraseId,
      lessonId: lesson.id,
      phraseId: step.saveTargetId,
      korean: saveTarget.korean,
      romanization: saveTarget.romanization,
      meaning: saveTarget.meaningByCountry[countryPack.id],
      tags: [source, ...lesson.sceneWords.slice(0, 2)],
      source,
      savedAt: new Date().toISOString()
    });
    onPersist(trackEvent(saved, { name: "phrase_saved", lessonId: lesson.id, stepId: step.id, success: true }));
  };

  const startRecording = async () => {
    if (!navigator.mediaDevices?.getUserMedia || typeof MediaRecorder === "undefined") {
      setRecorderState("unsupported");
      onPersist(trackEvent(state, { name: "recording_unavailable", lessonId: lesson.id, stepId: step.id }));
      return;
    }

    try {
      setRecorderState("requesting");
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (event) => chunksRef.current.push(event.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setRecordedUrl(URL.createObjectURL(blob));
        setRecorderState("ready");
        stream.getTracks().forEach((track) => track.stop());
      };
      recorderRef.current = recorder;
      recorder.start();
      setRecorderState("recording");
      setRecognitionResult(null);
      setRecognitionStatusKey(null);
      if (isRecognitionSupported()) {
        stopRecognitionRef.current = recognizeKorean(
          (result) => setRecognitionResult(result),
          (code) => setRecognitionStatusKey(getRecognitionStatusKey(code)),
          () => { stopRecognitionRef.current = null; }
        );
      } else {
        setRecognitionStatusKey("recorder.recognitionUnsupported");
      }
      onPersist(trackEvent(state, { name: "first_recording_attempt", lessonId: lesson.id, stepId: step.id }));
    } catch {
      setRecorderState("denied");
      onPersist(trackEvent(state, { name: "recording_permission_denied", lessonId: lesson.id, stepId: step.id }));
    }
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
    stopRecognitionRef.current?.();
    stopRecognitionRef.current = null;
    saveProgress(updateStepMetrics(activeProgress, step.id, {}), "recording_finished");
  };

  const retryRecording = () => {
    const currentMetric = activeProgress.metrics[step.id];
    saveProgress(
      updateStepMetrics(activeProgress, step.id, {
        recordingRetries: (currentMetric?.recordingRetries ?? 0) + 1
      }),
      "rerecording_requested"
    );
    setRecordedUrl("");
    setRecorderState("idle");
    setRecognitionResult(null);
    setRecognitionStatusKey(null);
  };

  const advance = () => {
    const isQuiz = step.kind === "quiz";
    const answeredCorrectly = isQuiz ? selectedChoice === step.answer : undefined;
    const nextProgress = completeStep(activeProgress, step.id, {
      answeredCorrectly,
      usedHint: hintVisible,
      responseMs: Date.now() - startMs
    });
    let nextState = upsertLessonProgress(state, lesson.id, nextProgress);

    if (isQuiz && !answeredCorrectly) {
      nextState = trackEvent(nextState, { name: "wrong_answer_continue", lessonId: lesson.id, stepId: step.id, success: false });
    }

    if (nextProgress.status === "completed") {
      const reviews = buildReviewItems(nextProgress, meaning, countryPack.id);
      nextState = upsertReviewItems(nextState, reviews);
      nextState = trackEvent(nextState, { name: "lesson_completed", lessonId: lesson.id, success: true });
      onPersist(nextState);
      onComplete();
      return;
    }

    onPersist(trackEvent(nextState, { name: "lesson_step_completed", lessonId: lesson.id, stepId: step.id, success: true }));
  };

  return (
    <section className="flow">
      <ProgressHeader current={activeProgress.completedStepIds.length + 1} total={lesson.steps.length} title={lesson.title[countryPack.id]} />
      <Panel title={step.title} kicker={tr("lesson.tutorKicker", { name: character.name })}>
        <LessonStepBody
          step={step}
          lesson={lesson}
          countryPackId={countryPack.id}
          meaning={meaning}
          countryCulture={countryPack.cultureNote}
          roleplaySituation={countryPack.roleplaySituation}
          characterLine={character.countryGreetings[countryPack.id]}
          audioIsTts={audioSlot?.usesTtsFallback ?? true}
          selectedChoice={selectedChoice}
          setSelectedChoice={setSelectedChoice}
        />
        {saveTarget && (
          <button className={`wide-button quiet ${isSaved ? "saved" : ""}`} onClick={saveCurrentPhrase}>
            <Bookmark />
            {isSaved ? tr("lesson.phrase.saved") : tr("lesson.phrase.save")}
          </button>
        )}
        {(step.kind === "dialogue" || step.kind === "listen" || step.kind === "repeat" || step.kind === "compare" || step.kind === "roleplay") && (
          <div className="audio-controls">
            <button className="icon-button" onClick={() => playOriginal(1)}>
              <Volume2 />
              {tr("audio.naturalSpeed")}
            </button>
            <button className="icon-button" onClick={() => playOriginal(0.72)}>
              <Volume2 />
              {tr("audio.slowSpeed")}
            </button>
          </div>
        )}
        {audioStatus && <p className="audio-status">{tr(audioStatus.messageKey)}</p>}
        {(step.kind === "record" || step.kind === "compare") && (
          <RecorderControls
            recorderState={recorderState}
            recordedUrl={recordedUrl}
            onStart={startRecording}
            onStop={stopRecording}
            onRetry={retryRecording}
            packId={packId}
            recognitionResult={recognitionResult}
            recognitionStatusKey={recognitionStatusKey}
          />
        )}
        {step.kind === "quiz" && step.hint && (
          <div className="hint-area">
            {hintVisible ? <p>{step.hint}</p> : <button onClick={() => setHintVisible(true)}>{tr("lesson.hint.show")}</button>}
          </div>
        )}
      </Panel>
      <div className="sticky-actions">
        <button
          className="secondary-action"
          onClick={() =>
            {
              saveProgress(
              {
                ...activeProgress,
                currentStepId: step.id,
                status: "in-progress"
              },
              "lesson_paused"
              );
              onPause();
            }
          }
        >
          {tr("lesson.pause")}
        </button>
        <button className="primary-action" onClick={advance}>
          {step.kind === "summary"
            ? tr("lesson.complete")
            : step.kind === "quiz" && !selectedChoice
              ? tr("lesson.quiz.skip")
              : tr("lesson.continue")}
        </button>
      </div>
    </section>
  );
};

const LessonStepBody = ({
  step,
  lesson,
  countryPackId,
  meaning,
  countryCulture,
  roleplaySituation,
  characterLine,
  audioIsTts,
  selectedChoice,
  setSelectedChoice
}: {
  step: LessonStep;
  lesson: ReturnType<typeof getLesson>;
  countryPackId: CountryPackId;
  meaning: string;
  countryCulture: string;
  roleplaySituation: string;
  characterLine: string;
  audioIsTts: boolean;
  selectedChoice: string;
  setSelectedChoice: (choice: string) => void;
}) => (
  <div className="lesson-step">
    {step.kind === "character" && <p className="speech-bubble">{characterLine}</p>}
    <p>{step.body}</p>
    {step.kind === "dialogue" && (
      <div className="dialogue-box">
        {lesson.dialogue.map((line, index) => (
          <div key={`${line.speaker}-${index}`} className={line.speakerRole === "learner" ? "dialogue-line learner" : "dialogue-line"}>
            <span>{line.speaker}</span>
            <strong>{line.korean}</strong>
          </div>
        ))}
      </div>
    )}
    {step.kind === "structure" && (
      <div className="structure-box">
        <strong>{lesson.structure.pattern}</strong>
        <p>{lesson.structure.explanationByCountry[countryPackId]}</p>
        <small>{lesson.countryNotes[countryPackId]}</small>
      </div>
    )}
    {(step.kind === "phrase" || step.kind === "structure") && (
      <p className="culture-note">{lesson.pronunciationByCountry[countryPackId]}</p>
    )}
    {step.kind === "swap" && (
      <div className="stack">
        {lesson.swapSlots.map((slot) => (
          <div className="row-choice read-only" key={slot.korean}>
            <strong>{slot.korean}</strong>
            <small>{slot.meaningByCountry[countryPackId]}</small>
          </div>
        ))}
      </div>
    )}
    {(step.kind === "situation" || step.kind === "scene-words") && (
      <div className="word-chip-row">
        {lesson.sceneWords.map((word) => (
          <span key={word}>{word}</span>
        ))}
      </div>
    )}
    {step.kind === "meaning" && <p className="culture-note">{countryCulture}</p>}
    {step.kind === "roleplay" && (
      <div className="roleplay-card">
        <p className="culture-note">{roleplaySituation}</p>
        <div className="dialogue-line">
          <span>{t("roleplay.partner", countryPackId)}</span>
          <strong>{lesson.roleplay.prompt.korean}</strong>
          <small>{lesson.roleplay.prompt.meaningByCountry[countryPackId]}</small>
        </div>
        <div className="dialogue-line learner">
          <span>{t("roleplay.myAnswer", countryPackId)}</span>
          <strong>{lesson.roleplay.expected.korean}</strong>
        </div>
        <div className="dialogue-line">
          <span>{t("roleplay.rescue", countryPackId)}</span>
          <strong>{lesson.roleplay.fallback.korean}</strong>
        </div>
      </div>
    )}
    {step.korean && (
      <div className="korean-phrase">
        <strong>{step.korean}</strong>
        {step.romanization && <span>{step.romanization}</span>}
        {step.kind !== "phrase" && <small>{meaning}</small>}
      </div>
    )}
    {(step.kind === "listen" || step.kind === "compare") && (
      <div className="waveform" aria-label={t("audio.waveformAriaLabel", countryPackId)}>
        {Array.from({ length: 22 }, (_, index) => (
          <span key={index} style={{ height: `${18 + ((index * 9) % 32)}px` }} />
        ))}
      </div>
    )}
    {step.kind === "quiz" && (
      <div className="stack">
        {step.choices?.map((choice) => (
          <button
            key={choice}
            className={`row-choice ${selectedChoice === choice ? "selected" : ""}`}
            onClick={() => setSelectedChoice(choice)}
          >
            {choice}
          </button>
        ))}
      </div>
    )}
    {audioIsTts && <p className="source-note">{t("lesson.ttsNote", countryPackId)}</p>}
  </div>
);

export const RecorderControls = ({
  recorderState,
  recordedUrl,
  onStart,
  onStop,
  onRetry,
  packId,
  recognitionResult,
  recognitionStatusKey
}: {
  recorderState: RecorderState;
  recordedUrl: string;
  onStart: () => void;
  onStop: () => void;
  onRetry: () => void;
  packId: CountryPackId;
  recognitionResult?: RecognitionResult | null;
  recognitionStatusKey?: UiKey | null;
}) => {
  const tr = createTranslator(packId);
  return (
    <div className="recorder-box">
      <p className="source-note">{tr("recorder.privacy")}</p>
      {recorderState === "recording" ? (
        <button className="danger-action" onClick={onStop}>
          <Pause />
          {tr("recorder.stop")}
        </button>
      ) : (
        <button className="icon-button" onClick={onStart}>
          <Mic />
          {tr("recorder.start")}
        </button>
      )}
      {recordedUrl && (
        <div className="audio-controls">
          <audio controls src={recordedUrl} />
          <button className="icon-button" onClick={onRetry}>
            <RotateCcw />
            {tr("recorder.retry")}
          </button>
        </div>
      )}
      {recognitionResult && (
        <div className="recognition-result">
          <p className="muted">
            <strong>{tr("recorder.recognized")}</strong> {recognitionResult.text}
          </p>
          <p className="muted">{tr("recorder.practiceNote")}</p>
        </div>
      )}
      {recognitionStatusKey && <p className="audio-status">{tr(recognitionStatusKey)}</p>}
      {recorderState === "denied" && (
        <StatePanel
          icon={<Mic />}
          title={tr("recorder.denied.title")}
          body={tr("recorder.denied.body")}
        />
      )}
      {recorderState === "unsupported" && (
        <StatePanel
          icon={<Mic />}
          title={tr("recorder.unsupported.title")}
          body={tr("recorder.unsupported.body")}
        />
      )}
    </div>
  );
};

export const ReviewScreen = ({
  state,
  onPersist,
  onStartLesson,
  onReturnHome
}: {
  state: UserState;
  onPersist: (state: UserState) => void;
  onStartLesson: () => void;
  onReturnHome?: () => void;
}) => {
  const packId: CountryPackId = state.onboarding?.countryPackId ?? "us-en";
  const tr = createTranslator(packId);
  const dueReviews = getDueReviewItems(state.reviewItems);
  const canStartNextLesson = hasRemainingLessons(state);
  const [completedCount, setCompletedCount] = useState(0);
  const active = dueReviews[0];
  const sessionTotal = completedCount + dueReviews.length;

  useEffect(() => {
    if (!dueReviews.length && completedCount) {
      setCompletedCount(0);
    }
  }, [completedCount, dueReviews.length]);

  const playSavedPhrase = (phrase: SavedPhrase, rate: number) => {
    speakKorean(phrase.korean, rate);
    onPersist(markSavedPhrasePlayed(state, phrase.id));
  };
  const removePhrase = (phrase: SavedPhrase) => {
    const next = removeSavedPhrase(state, phrase.id);
    onPersist(trackEvent(next, { name: "saved_phrase_removed", lessonId: phrase.lessonId, success: true }));
  };

  if (!state.reviewItems.length) {
    return (
      <section className="flow">
        <StatePanel
          icon={<RefreshCcw />}
          title={tr("review.empty.title")}
          body={tr("review.empty.body")}
        />
        <button className="primary-action" onClick={onStartLesson}>
          {tr("review.empty.cta")}
        </button>
        <SavedPhraseBox phrases={state.savedPhrases ?? []} onPlay={playSavedPhrase} onRemove={removePhrase} packId={packId} />
      </section>
    );
  }

  if (!active) {
    return (
      <section className="flow">
        <ReviewOverview state={state} dueCount={dueReviews.length} packId={packId} />
        <StatePanel icon={<Check />} title={tr("review.done.title")} body={tr("review.done.body")} />
        <button className="primary-action" onClick={canStartNextLesson ? onStartLesson : (onReturnHome ?? onStartLesson)}>
          {canStartNextLesson ? tr("review.done.cta") : tr("common.close")}
        </button>
        <SavedPhraseBox phrases={state.savedPhrases ?? []} onPlay={playSavedPhrase} onRemove={removePhrase} packId={packId} />
      </section>
    );
  }

  return (
    <section className="flow">
      <ReviewOverview state={state} dueCount={dueReviews.length} packId={packId} />
      <ProgressHeader current={completedCount + 1} total={sessionTotal} title={tr("review.progressTitle")} />
      <Panel title={active.reason}>
        {active.kind && (
          <span className="review-badge">
            {t(kindUiKey[active.kind] ?? "kind.listen", packId)}
          </span>
        )}
        <div
          className="review-priority-meter"
          aria-label={tr("review.priorityAriaLabel", { priority: active.priority })}
        >
          <span style={{ width: `${Math.min(active.priority, 100)}%` }} />
        </div>
        <p className="source-note">
          {active.lastResult === "hard" ? tr("review.note.hard") : tr("review.note.scheduled")}
        </p>
        {active.prompt && <p className="culture-note">{active.prompt}</p>}
        {active.kind === "speak" && <p className="muted">{tr("review.instruction.speak")}</p>}
        {active.kind === "roleplay" && <p className="muted">{tr("review.instruction.roleplay")}</p>}
        <div className="korean-phrase">
          <strong>{active.korean}</strong>
          <small>{active.meaning}</small>
        </div>
        <div className="audio-controls">
          <button className="icon-button" onClick={() => speakKorean(active.korean, 1)}>
            <Play />
            {tr("review.listen")}
          </button>
          <button className="icon-button" onClick={() => speakKorean(active.korean, 0.72)}>
            <Volume2 />
            {tr("review.slow")}
          </button>
        </div>
      </Panel>
      <SavedPhraseBox phrases={state.savedPhrases ?? []} onPlay={playSavedPhrase} onRemove={removePhrase} packId={packId} />
      <div className="sticky-actions">
        <button
          className="secondary-action"
          onClick={() => {
            onPersist(completeReviewItem(state, active.id, "hard"));
            setCompletedCount((value) => value + 1);
          }}
        >
          {tr("review.action.hard")}
        </button>
        <button
          className="primary-action"
          onClick={() => {
            let next = completeReviewItem(state, active.id, "success");
            next = trackEvent(next, { name: "review_completed", lessonId: active.lessonId, success: true });
            onPersist(next);
            setCompletedCount((value) => value + 1);
          }}
        >
          {tr("review.action.success")}
        </button>
      </div>
    </section>
  );
};

const ReviewOverview = ({
  state,
  dueCount,
  packId
}: {
  state: UserState;
  dueCount: number;
  packId: CountryPackId;
}) => {
  const tr = createTranslator(packId);
  const hardCount = state.reviewItems.filter((item) => item.lastResult === "hard").length;
  const highPriorityCount = state.reviewItems.filter((item) => item.priority >= 55).length;
  const nextDue = state.reviewItems
    .filter((item) => new Date(item.dueAt).getTime() > Date.now())
    .sort((a, b) => new Date(a.dueAt).getTime() - new Date(b.dueAt).getTime())[0];

  return (
    <Panel title={tr("review.overview.title")}>
      <div className="readiness-grid">
        <Metric label={tr("review.overview.dueCount")} value={String(dueCount)} />
        <Metric label={tr("review.overview.hardCount")} value={String(hardCount)} />
        <Metric label={tr("review.overview.highPriority")} value={String(highPriorityCount)} />
      </div>
      <p className="muted">
        {nextDue
          ? tr("review.overview.nextDue", { time: formatDueLabel(nextDue.dueAt, packId) })
          : tr("review.overview.noNextDue")}
      </p>
    </Panel>
  );
};

const SavedPhraseBox = ({
  phrases,
  onPlay,
  onRemove,
  packId
}: {
  phrases: SavedPhrase[];
  onPlay: (phrase: SavedPhrase, rate: number) => void;
  onRemove: (phrase: SavedPhrase) => void;
  packId: CountryPackId;
}) => {
  const tr = createTranslator(packId);
  const [sourceFilter, setSourceFilter] = useState<SavedPhrase["source"] | "all">("all");
  const [dayFilter, setDayFilter] = useState("all");
  const [copyMessage, setCopyMessage] = useState("");
  const days = Array.from(new Set(phrases.map((phrase) => phrase.lessonId))).sort(
    (a, b) => Number(a.replace("day-", "")) - Number(b.replace("day-", ""))
  );
  const filtered = phrases
    .filter((phrase) => sourceFilter === "all" || phrase.source === sourceFilter)
    .filter((phrase) => dayFilter === "all" || phrase.lessonId === dayFilter)
    .sort((a, b) => b.savedAt.localeCompare(a.savedAt));

  const copyPhrase = async (phrase: SavedPhrase) => {
    try {
      await navigator.clipboard?.writeText(phrase.korean);
      setCopyMessage(tr("saved.copied"));
    } catch {
      setCopyMessage(tr("saved.copyFailed"));
    }
  };

  return (
    <Panel title={tr("saved.title")}>
      {phrases.length ? (
        <>
          <div className="filter-row" aria-label={tr("saved.filterAriaLabel")}>
            {(["all", "core", "rescue", "swap", "response", "continuation"] as const).map((filter) => (
              <button
                key={filter}
                className={sourceFilter === filter ? "selected" : ""}
                onClick={() => setSourceFilter(filter)}
              >
                {filter === "all" ? tr("saved.filter.all") : t(kindUiKey[filter] ?? "kind.core", packId)}
              </button>
            ))}
          </div>
          <div className="filter-row" aria-label={tr("saved.dayFilterAriaLabel")}>
            <button className={dayFilter === "all" ? "selected" : ""} onClick={() => setDayFilter("all")}>
              {tr("saved.dayFilter.all")}
            </button>
            {days.map((day) => (
              <button key={day} className={dayFilter === day ? "selected" : ""} onClick={() => setDayFilter(day)}>
                {tr("saved.dayLabel", { day: day.replace("day-", "") })}
              </button>
            ))}
          </div>
          {copyMessage && <p className="audio-status">{copyMessage}</p>}
          <div className="saved-list">
            {filtered.slice(0, 12).map((phrase) => (
              <div className="saved-row" key={phrase.id}>
                <div>
                  <span className="review-badge">{t(kindUiKey[phrase.source] ?? "kind.core", packId)}</span>
                  <strong>{phrase.korean}</strong>
                  <small>{phrase.meaning}</small>
                </div>
                <div className="audio-controls">
                  <button className="icon-button" onClick={() => onPlay(phrase, 1)}>
                    <Play />
                    {tr("saved.listen")}
                  </button>
                  <button className="icon-button" onClick={() => onPlay(phrase, 0.72)}>
                    <Volume2 />
                    {tr("saved.slow")}
                  </button>
                  <button className="icon-button" onClick={() => copyPhrase(phrase)}>
                    <Copy />
                    {tr("saved.copy")}
                  </button>
                  <button className="icon-button danger-lite" onClick={() => onRemove(phrase)}>
                    <Trash2 />
                    {tr("saved.remove")}
                  </button>
                </div>
              </div>
            ))}
          </div>
          {!filtered.length && <p className="muted">{tr("saved.emptyFilter")}</p>}
        </>
      ) : (
        <p className="muted">{tr("saved.empty")}</p>
      )}
    </Panel>
  );
};

const SettingsScreen = ({
  state,
  onPersist,
  onError,
  onOnboardingChange
}: {
  state: UserState;
  onPersist: (state: UserState) => void;
  onError: (message: string) => void;
  onOnboardingChange: (profile: OnboardingProfile) => void;
}) => {
  const [email, setEmail] = useState(state.accountEmail ?? "");
  const profile = state.onboarding ?? defaultOnboarding;
  const character = getCharacter(profile.characterId);
  const pack = getCountryPack(profile.countryPackId);
  const tr = createTranslator(pack.id);
  const syncMessage = state.sync.messageKey ? tr(state.sync.messageKey as UiKey) : state.sync.message;
  const supabaseStatus = tr(state.sync.mode === "supabase-ready" ? "settings.supabase.ready" : "settings.supabase.localOnly");

  const updateProfile = (patch: Partial<OnboardingProfile>) => {
    const next = { ...profile, ...patch };
    if (patch.countryPackId) {
      const selectedPack = getCountryPack(patch.countryPackId);
      next.nativeLanguage = selectedPack.nativeLabel;
      next.dailyGoalMinutes = selectedPack.defaultDailyGoal;
    }
    onOnboardingChange(next);
  };

  return (
    <section className="flow">
      <Panel title={tr("settings.title")} kicker={supabaseStatus}>
        <div className="summary-list">
          <label className="field">
            <span>{tr("settings.field.country")}</span>
            <select value={profile.countryPackId} onChange={(event) => updateProfile({ countryPackId: event.target.value as CountryPackId })}>
              {countryPacks.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.label} / {country.nativeLabel}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>{tr("settings.field.tutor")}</span>
            <select value={profile.characterId} onChange={(event) => updateProfile({ characterId: event.target.value as CharacterId })}>
              {tutorCharacters.map((tutor) => (
                <option key={tutor.id} value={tutor.id}>
                  {tutor.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>{tr("settings.field.dailyGoal")}</span>
            <select
              value={profile.dailyGoalMinutes}
              onChange={(event) => updateProfile({ dailyGoalMinutes: Number(event.target.value) as DailyGoalMinutes })}
            >
              {minuteOptions.map((minutes) => (
                <option key={minutes} value={minutes}>
                  {tr("settings.minuteOption", { minutes })}
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="culture-note">
          {tr("settings.note", { country: pack.label, tutor: character.name })}
        </p>
      </Panel>
      <CountryLearningGuidePanel countryPack={pack} />
      <Panel title={tr("settings.account.title")}>
        <label className="field">
          <span>{tr("settings.field.email")}</span>
          <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder={tr("settings.field.emailPlaceholder")} />
        </label>
        <div className="button-row">
          <button
            className="primary-action inline"
            onClick={async () => {
              const normalizedEmail = email.trim().toLowerCase();
              if (!normalizedEmail.includes("@")) {
                onError(tr("error.invalidEmail"));
                return;
              }
              try {
                const authResult = await requestEmailSignIn(normalizedEmail);
                const merged = mergeGuestIntoAccount(state, normalizedEmail);
                onPersist(
                  trackEvent(
                    {
                      ...merged,
                      sync: {
                        ...merged.sync,
                        mode: authResult.sent ? "supabase-ready" : merged.sync.mode,
                        pending: authResult.sent,
                        messageKey: authResult.messageKey,
                        message: authResult.message
                      }
                    },
                    { name: "signup_or_login", success: true }
                  )
                );
              } catch (loginError) {
                onError(loginError instanceof Error ? loginError.message : tr("error.loginFailed"));
              }
            }}
          >
            <LogIn />
            {tr("settings.account.login")}
          </button>
          <button
            className="secondary-action inline"
            onClick={async () => {
              try {
                await signOutFromSupabase();
                onPersist(logoutLocalAccount(state));
              } catch (logoutError) {
                onError(logoutError instanceof Error ? logoutError.message : tr("error.logoutFailed"));
              }
            }}
          >
            <LogOut />
            {tr("settings.account.logout")}
          </button>
        </div>
      </Panel>
      <Panel title={tr("settings.sync.title")}>
        <p>{syncMessage}</p>
        <button
          className="secondary-action inline"
          onClick={async () => {
            try {
              onPersist(await markSyncAttempt(state));
            } catch (syncError) {
              onError(syncError instanceof Error ? syncError.message : tr("error.syncFailed"));
            }
          }}
        >
          {tr("settings.sync.button")}
        </button>
      </Panel>
      <Panel title={tr("settings.debug.title")}>
        {state.analyticsEvents.length ? (
          <div className="event-list">
            {state.analyticsEvents.slice(-8).map((event) => (
              <span key={event.id}>
                {tr("settings.debug.eventAt", { name: event.name, time: new Date(event.occurredAt).toLocaleTimeString() })}
              </span>
            ))}
          </div>
        ) : (
          <p className="muted">{tr("settings.debug.empty")}</p>
        )}
      </Panel>
    </section>
  );
};

const ProgressHeader = ({ current, total, title }: { current: number; total: number; title: string }) => (
  <header className="progress-header">
    <div>
      <span className="kicker">
        {current} / {total}
      </span>
      <h1>{title}</h1>
    </div>
    <div className="ring" aria-label={`${Math.min(current, total)} / ${total}`}>
      {Math.round((Math.min(current, total) / total) * 100)}%
    </div>
  </header>
);

const Panel = ({ title, kicker, children }: { title: string; kicker?: string; children: React.ReactNode }) => (
  <section className="panel">
    {kicker && <span className="kicker">{kicker}</span>}
    <h2>{title}</h2>
    {children}
  </section>
);

const Metric = ({ label, value }: { label: string; value: string }) => (
  <div className="metric">
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

const SummaryRow = ({ label, value }: { label: string; value: string }) => (
  <div className="summary-row">
    <span>{label}</span>
    <strong>{value}</strong>
  </div>
);

const StatePanel = ({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) => (
  <section className="state-panel">
    <div className="state-icon">{icon}</div>
    <h2>{title}</h2>
    <p>{body}</p>
  </section>
);

const StatusBanner = ({
  text,
  tone,
  onClose,
  packId
}: {
  text: string;
  tone: "error" | "info";
  onClose: () => void;
  packId: CountryPackId;
}) => (
  <div className={`status-banner ${tone}`}>
    <span>{text}</span>
    <button onClick={onClose}>{t("common.close", packId)}</button>
  </div>
);
