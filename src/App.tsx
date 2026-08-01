import { useEffect, useRef, useState } from "react";
import {
  BookOpen,
  Check,
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
  Volume2
} from "lucide-react";
import { getCharacter, tutorCharacters } from "./data/characters";
import { countryPacks, getCountryPack } from "./data/countryPacks";
import { getLesson } from "./data/lessons";
import { findAudioSlot } from "./data/audioCatalog";
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
  mergeGuestIntoAccount,
  updateOnboarding,
  upsertLessonProgress,
  upsertReviewItems
} from "./services/storage";
import { describeSupabaseStatus } from "./services/supabaseClient";
import { markSyncAttempt } from "./services/sync";
import { speakKorean } from "./utils/speech";
import type {
  CharacterId,
  CountryPackId,
  DailyGoalMinutes,
  KoreanLevel,
  LearningGoal,
  LessonProgress,
  LessonStep,
  OnboardingProfile,
  UserState
} from "./types";

type Tab = "home" | "lesson" | "review" | "settings";
type RecorderState = "idle" | "requesting" | "recording" | "denied" | "unsupported" | "ready";

const levelLabels: Record<KoreanLevel, string> = {
  "first-time": "처음 배워요",
  beginner: "기초 표현은 알아요",
  returning: "다시 시작해요",
  daily: "일상 표현을 늘리고 싶어요"
};

const goalLabels: Record<LearningGoal, string> = {
  travel: "여행",
  daily: "일상회화",
  study: "유학",
  work: "취업",
  life: "한국 생활",
  "k-content": "K-콘텐츠"
};

const goalOptions: LearningGoal[] = ["travel", "daily", "study", "work", "life", "k-content"];
const levelOptions: KoreanLevel[] = ["first-time", "beginner", "returning", "daily"];
const minuteOptions: DailyGoalMinutes[] = [3, 5, 10, 15];

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
  const lesson = getLesson("day-1");
  const progress = state.lessonProgress[lesson.id];
  const dueReviews = getDueReviewItems(state.reviewItems);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsLoading(false), 250);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    setState((current) => trackEvent(current, { name: "app_first_open" }));
  }, []);

  const startLesson = () => {
    setState((current) => {
      const existing = current.lessonProgress[lesson.id];
      const nextProgress = existing ?? createLessonProgress(lesson.id);
      const saved = upsertLessonProgress(current, lesson.id, nextProgress);
      return trackEvent(saved, { name: existing ? "lesson_resume" : "day_1_start", lessonId: lesson.id });
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
      <Shell tab={tab} setTab={setTab}>
        <StatePanel icon={<LoaderCircle className="spin" />} title="학습 상태를 불러오는 중" body="이전 진도와 복습 항목을 확인하고 있습니다." />
      </Shell>
    );
  }

  return (
    <Shell tab={tab} setTab={setTab}>
      {error && <StatusBanner tone="error" text={error} onClose={() => setError("")} />}
      {!onboarding ? (
        <OnboardingFlow onComplete={completeOnboarding} />
      ) : (
        <>
          {tab === "home" && (
            <HomeScreen
              state={state}
              countryLabel={countryPack.label}
              characterName={character.name}
              progress={progress}
              reviewCount={dueReviews.length}
              onStartLesson={startLesson}
              onReview={() => setTab("review")}
              onLogin={() => setTab("settings")}
            />
          )}
          {tab === "lesson" && (
            <LessonScreen
              state={state}
              progress={progress}
              onPersist={updateState}
              onError={setError}
              onPause={() => setTab("home")}
              onComplete={() => setTab("home")}
            />
          )}
          {tab === "review" && (
            <ReviewScreen state={state} onPersist={updateState} onStartLesson={startLesson} />
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

const Shell = ({ children, tab, setTab }: { children: React.ReactNode; tab: Tab; setTab: (tab: Tab) => void }) => (
  <div className="app-shell">
    <main className="screen">{children}</main>
    <nav className="bottom-nav" aria-label="주요 메뉴">
      <NavButton icon={<Home />} label="홈" active={tab === "home"} onClick={() => setTab("home")} />
      <NavButton icon={<BookOpen />} label="학습" active={tab === "lesson"} onClick={() => setTab("lesson")} />
      <NavButton icon={<RefreshCcw />} label="복습" active={tab === "review"} onClick={() => setTab("review")} />
      <NavButton icon={<Settings />} label="내 정보" active={tab === "settings"} onClick={() => setTab("settings")} />
    </nav>
  </div>
);

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
      <ProgressHeader current={step + 1} total={totalSteps} title="첫 설정" />
      {step === 0 && (
        <Panel title="어떤 언어로 안내할까요?" kicker="로그인 없이 시작">
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
        <Panel title="지금 한국어 수준은 어느 쪽인가요?">
          <div className="stack">
            {levelOptions.map((level) => (
              <button
                key={level}
                className={`row-choice ${profile.koreanLevel === level ? "selected" : ""}`}
                onClick={() => updateProfile({ koreanLevel: level })}
              >
                {levelLabels[level]}
              </button>
            ))}
          </div>
        </Panel>
      )}
      {step === 2 && (
        <Panel title="가장 먼저 필요한 한국어는요?">
          <div className="option-grid">
            {goalOptions.map((goal) => (
              <button
                key={goal}
                className={`choice compact ${profile.learningGoal === goal ? "selected" : ""}`}
                onClick={() => updateProfile({ learningGoal: goal })}
              >
                <strong>{goalLabels[goal]}</strong>
              </button>
            ))}
          </div>
        </Panel>
      )}
      {step === 3 && (
        <Panel title="하루에 몇 분이면 좋을까요?">
          <div className="minute-row">
            {minuteOptions.map((minutes) => (
              <button
                key={minutes}
                className={`minute ${profile.dailyGoalMinutes === minutes ? "selected" : ""}`}
                onClick={() => updateProfile({ dailyGoalMinutes: minutes })}
              >
                {minutes}
                <span>분</span>
              </button>
            ))}
          </div>
        </Panel>
      )}
      {step === 4 && (
        <Panel title="함께 연습할 한국인 튜터를 고르세요">
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
        <Panel title="설정 확인">
          <div className="summary-list">
            <SummaryRow label="국가팩" value={`${pack.label} / ${pack.nativeLabel}`} />
            <SummaryRow label="목적" value={goalLabels[profile.learningGoal]} />
            <SummaryRow label="학습 목표" value={`${profile.dailyGoalMinutes}분`} />
            <SummaryRow label="튜터" value={`${character.name} - ${character.tone}`} />
            <label className="field">
              <span>첫 학습 알림 시간</span>
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
          이전
        </button>
        <button
          className="primary-action"
          onClick={() => (step === totalSteps - 1 ? onComplete(profile) : setStep((value) => value + 1))}
        >
          {step === totalSteps - 1 ? "Day 1 바로 시작" : "다음"}
        </button>
      </div>
    </section>
  );
};

const HomeScreen = ({
  state,
  countryLabel,
  characterName,
  progress,
  reviewCount,
  onStartLesson,
  onReview,
  onLogin
}: {
  state: UserState;
  countryLabel: string;
  characterName: string;
  progress?: LessonProgress;
  reviewCount: number;
  onStartLesson: () => void;
  onReview: () => void;
  onLogin: () => void;
}) => {
  const percent = progress ? getLessonPercent(progress) : 0;
  return (
    <section className="flow">
      <header className="home-hero">
        <span className="kicker">Korean First Talk</span>
        <h1>오늘 한 문장부터 말해요.</h1>
        <p>{state.accountEmail ? `${state.accountEmail} 계정으로 저장 중` : "로그인 전에도 진도가 이 기기에 저장됩니다."}</p>
      </header>
      <div className="home-grid">
        <Metric label="오늘 수업" value={progress?.status === "completed" ? "Day 1 완료" : "Day 1"} />
        <Metric label="복습 문장" value={`${reviewCount}개`} />
        <Metric label="튜터" value={characterName} />
        <Metric label="국가팩" value={countryLabel} />
      </div>
      <Panel title={progress?.status === "completed" ? "다음은 짧은 복습이에요" : "이어 할 수업"}>
        <div className="lesson-preview">
          <div>
            <strong>Day 1. 처음 만났을 때 인사하기</strong>
            <p className="muted">진행률 {percent}% · 목표 {state.onboarding?.dailyGoalMinutes}분</p>
          </div>
          <button className="primary-action inline" onClick={onStartLesson}>
            {progress ? "이어하기" : "시작"}
          </button>
        </div>
        <div className="progress-track" aria-label={`Day 1 진행률 ${percent}%`}>
          <span style={{ width: `${percent}%` }} />
        </div>
      </Panel>
      {reviewCount > 0 ? (
        <button className="wide-button review" onClick={onReview}>
          <RefreshCcw />
          오늘 복습할 문장 확인
        </button>
      ) : (
        <StatePanel
          icon={<Sparkles />}
          title="아직 복습할 문장이 없어요"
          body="Day 1을 마치면 어려웠던 표현을 바탕으로 짧은 복습이 만들어집니다."
        />
      )}
      {!state.accountEmail && (
        <button className="wide-button quiet" onClick={onLogin}>
          <LogIn />
          로그인하면 다른 세션에서도 진도를 복구할 수 있어요
        </button>
      )}
    </section>
  );
};

const LessonScreen = ({
  state,
  progress,
  onPersist,
  onError,
  onPause,
  onComplete
}: {
  state: UserState;
  progress?: LessonProgress;
  onPersist: (state: UserState) => void;
  onError: (message: string) => void;
  onPause: () => void;
  onComplete: () => void;
}) => {
  const lesson = getLesson("day-1");
  const activeProgress = progress ?? createLessonProgress(lesson.id);
  const step = getCurrentStep(activeProgress);
  const character = getCharacter(state.onboarding?.characterId);
  const countryPack = getCountryPack(state.onboarding?.countryPackId);
  const meaning = lesson.meaningByCountry[countryPack.id];
  const audioSlot = findAudioSlot(lesson.id, character.id);
  const [selectedChoice, setSelectedChoice] = useState("");
  const [hintVisible, setHintVisible] = useState(false);
  const [startMs, setStartMs] = useState(Date.now());
  const [recorderState, setRecorderState] = useState<RecorderState>("idle");
  const [recordedUrl, setRecordedUrl] = useState("");
  const recorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  useEffect(() => {
    if (!progress) {
      onPersist(upsertLessonProgress(state, lesson.id, activeProgress));
    }
  }, [activeProgress, lesson.id, onPersist, progress, state]);

  useEffect(() => {
    setSelectedChoice("");
    setHintVisible(false);
    setStartMs(Date.now());
  }, [step.id]);

  const saveProgress = (nextProgress: LessonProgress, eventName?: string) => {
    let nextState = upsertLessonProgress(state, lesson.id, nextProgress);
    if (eventName) nextState = trackEvent(nextState, { name: eventName, lessonId: lesson.id, stepId: step.id });
    onPersist(nextState);
  };

  const playOriginal = (rate: number) => {
    const played = speakKorean(lesson.korean, rate);
    const metricKey = rate < 1 ? "slowPlayCount" : "naturalPlayCount";
    const currentMetric = activeProgress.metrics[step.id];
    saveProgress(
      updateStepMetrics(activeProgress, step.id, {
        [metricKey]: (currentMetric?.[metricKey] ?? 0) + 1
      }),
      rate < 1 ? "slow_audio_played" : "first_audio_played"
    );
    if (!played) onError("이 브라우저에서는 기기 음성 재생을 사용할 수 없습니다.");
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
      onPersist(trackEvent(state, { name: "first_recording_attempt", lessonId: lesson.id, stepId: step.id }));
    } catch {
      setRecorderState("denied");
      onPersist(trackEvent(state, { name: "recording_permission_denied", lessonId: lesson.id, stepId: step.id }));
    }
  };

  const stopRecording = () => {
    recorderRef.current?.stop();
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
      const reviews = buildReviewItems(nextProgress, meaning);
      nextState = upsertReviewItems(nextState, reviews);
      nextState = trackEvent(nextState, { name: "day_1_completed", lessonId: lesson.id, success: true });
      onPersist(nextState);
      onComplete();
      return;
    }

    onPersist(trackEvent(nextState, { name: "lesson_step_completed", lessonId: lesson.id, stepId: step.id, success: true }));
  };

  return (
    <section className="flow">
      <ProgressHeader current={activeProgress.completedStepIds.length + 1} total={lesson.steps.length} title={lesson.title} />
      <Panel title={step.title} kicker={`튜터 ${character.name}`}>
        <LessonStepBody
          step={step}
          meaning={meaning}
          countryCulture={countryPack.cultureNote}
          roleplaySituation={countryPack.roleplaySituation}
          characterLine={character.countryGreetings[countryPack.id]}
          audioIsTts={audioSlot?.usesTtsFallback ?? true}
          selectedChoice={selectedChoice}
          setSelectedChoice={setSelectedChoice}
        />
        {(step.kind === "listen" || step.kind === "repeat" || step.kind === "compare") && (
          <div className="audio-controls">
            <button className="icon-button" onClick={() => playOriginal(1)}>
              <Volume2 />
              자연 속도
            </button>
            <button className="icon-button" onClick={() => playOriginal(0.72)}>
              <Volume2 />
              느린 속도
            </button>
          </div>
        )}
        {(step.kind === "record" || step.kind === "compare") && (
          <RecorderControls
            recorderState={recorderState}
            recordedUrl={recordedUrl}
            onStart={startRecording}
            onStop={stopRecording}
            onRetry={retryRecording}
          />
        )}
        {step.kind === "quiz" && step.hint && (
          <div className="hint-area">
            {hintVisible ? <p>{step.hint}</p> : <button onClick={() => setHintVisible(true)}>힌트 보기</button>}
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
          나중에 이어하기
        </button>
        <button className="primary-action" onClick={advance}>
          {step.kind === "summary" ? "완료하고 복습 예약" : step.kind === "quiz" && !selectedChoice ? "몰라도 계속" : "계속"}
        </button>
      </div>
    </section>
  );
};

const LessonStepBody = ({
  step,
  meaning,
  countryCulture,
  roleplaySituation,
  characterLine,
  audioIsTts,
  selectedChoice,
  setSelectedChoice
}: {
  step: LessonStep;
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
    {step.kind === "meaning" && <p className="culture-note">{countryCulture}</p>}
    {step.kind === "roleplay" && <p className="culture-note">{roleplaySituation}</p>}
    {step.korean && (
      <div className="korean-phrase">
        <strong>{step.korean}</strong>
        {step.romanization && <span>{step.romanization}</span>}
        {step.kind !== "phrase" && <small>{meaning}</small>}
      </div>
    )}
    {(step.kind === "listen" || step.kind === "compare") && (
      <div className="waveform" aria-label="재생 진행 상태">
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
    {audioIsTts && <p className="source-note">현재는 실제 녹음 슬롯이 비어 있어 기기 음성 샘플로 재생합니다.</p>}
  </div>
);

const RecorderControls = ({
  recorderState,
  recordedUrl,
  onStart,
  onStop,
  onRetry
}: {
  recorderState: RecorderState;
  recordedUrl: string;
  onStart: () => void;
  onStop: () => void;
  onRetry: () => void;
}) => (
  <div className="recorder-box">
    {recorderState === "recording" ? (
      <button className="danger-action" onClick={onStop}>
        <Pause />
        녹음 멈추기
      </button>
    ) : (
      <button className="icon-button" onClick={onStart}>
        <Mic />
        내 목소리 녹음
      </button>
    )}
    {recordedUrl && (
      <div className="audio-controls">
        <audio controls src={recordedUrl} />
        <button className="icon-button" onClick={onRetry}>
          <RotateCcw />
          다시 녹음
        </button>
      </div>
    )}
    {recorderState === "denied" && (
      <StatePanel
        icon={<Mic />}
        title="마이크 권한이 거절됐어요"
        body="브라우저 주소창의 권한 설정에서 마이크를 허용하거나, 이번 녹음 단계는 건너뛰어도 됩니다."
      />
    )}
    {recorderState === "unsupported" && (
      <StatePanel
        icon={<Mic />}
        title="녹음을 사용할 수 없는 환경"
        body="현재 브라우저는 녹음을 지원하지 않습니다. 수업은 계속 완료할 수 있어요."
      />
    )}
  </div>
);

const ReviewScreen = ({
  state,
  onPersist,
  onStartLesson
}: {
  state: UserState;
  onPersist: (state: UserState) => void;
  onStartLesson: () => void;
}) => {
  const dueReviews = getDueReviewItems(state.reviewItems);
  const [activeIndex, setActiveIndex] = useState(0);
  const active = dueReviews[activeIndex];

  if (!state.reviewItems.length) {
    return (
      <section className="flow">
        <StatePanel
          icon={<RefreshCcw />}
          title="복습 항목이 아직 없어요"
          body="첫 수업을 마치면 오답, 힌트, 반복 녹음 기록을 바탕으로 복습 문장이 만들어집니다."
        />
        <button className="primary-action" onClick={onStartLesson}>
          Day 1 학습하기
        </button>
      </section>
    );
  }

  if (!active) {
    return (
      <section className="flow">
        <StatePanel icon={<Check />} title="오늘 복습은 끝났어요" body="다음 복습 시간에 다시 짧게 확인합니다." />
        <button className="primary-action" onClick={onStartLesson}>
          신규 수업으로 이동
        </button>
      </section>
    );
  }

  return (
    <section className="flow">
      <ProgressHeader current={activeIndex + 1} total={dueReviews.length} title="3분 복습" />
      <Panel title={active.reason}>
        <div className="korean-phrase">
          <strong>{active.korean}</strong>
          <small>{active.meaning}</small>
        </div>
        <div className="audio-controls">
          <button className="icon-button" onClick={() => speakKorean(active.korean, 1)}>
            <Play />
            듣기
          </button>
          <button className="icon-button" onClick={() => speakKorean(active.korean, 0.72)}>
            <Volume2 />
            천천히
          </button>
        </div>
      </Panel>
      <div className="sticky-actions">
        <button
          className="secondary-action"
          onClick={() => {
            onPersist(completeReviewItem(state, active.id, "hard"));
            setActiveIndex((value) => value + 1);
          }}
        >
          아직 어려움
        </button>
        <button
          className="primary-action"
          onClick={() => {
            let next = completeReviewItem(state, active.id, "success");
            next = trackEvent(next, { name: "review_completed", lessonId: active.lessonId, success: true });
            onPersist(next);
            setActiveIndex((value) => value + 1);
          }}
        >
          기억났어요
        </button>
      </div>
    </section>
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
      <Panel title="내 학습 설정" kicker={describeSupabaseStatus()}>
        <div className="summary-list">
          <label className="field">
            <span>국가팩</span>
            <select value={profile.countryPackId} onChange={(event) => updateProfile({ countryPackId: event.target.value as CountryPackId })}>
              {countryPacks.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.label} / {country.nativeLabel}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>튜터</span>
            <select value={profile.characterId} onChange={(event) => updateProfile({ characterId: event.target.value as CharacterId })}>
              {tutorCharacters.map((tutor) => (
                <option key={tutor.id} value={tutor.id}>
                  {tutor.name}
                </option>
              ))}
            </select>
          </label>
          <label className="field">
            <span>하루 목표</span>
            <select
              value={profile.dailyGoalMinutes}
              onChange={(event) => updateProfile({ dailyGoalMinutes: Number(event.target.value) as DailyGoalMinutes })}
            >
              {minuteOptions.map((minutes) => (
                <option key={minutes} value={minutes}>
                  {minutes}분
                </option>
              ))}
            </select>
          </label>
        </div>
        <p className="culture-note">
          현재 {pack.label} 국가팩과 {character.name} 튜터가 홈, Day 1, 복습 안내에 반영됩니다.
        </p>
      </Panel>
      <Panel title="계정 연결">
        <label className="field">
          <span>이메일</span>
          <input value={email} onChange={(event) => setEmail(event.target.value)} placeholder="you@example.com" />
        </label>
        <div className="button-row">
          <button
            className="primary-action inline"
            onClick={() => {
              const normalizedEmail = email.trim().toLowerCase();
              if (!normalizedEmail.includes("@")) {
                onError("이메일 주소를 확인해 주세요.");
                return;
              }
              const merged = mergeGuestIntoAccount(state, normalizedEmail);
              onPersist(trackEvent(merged, { name: "signup_or_login", success: true }));
            }}
          >
            <LogIn />
            로그인·병합
          </button>
          <button className="secondary-action inline" onClick={() => onPersist(logoutLocalAccount(state))}>
            <LogOut />
            로그아웃
          </button>
        </div>
      </Panel>
      <Panel title="동기화 상태">
        <p>{state.sync.message}</p>
        <button className="secondary-action inline" onClick={() => onPersist(markSyncAttempt(state))}>
          연결 상태 확인
        </button>
      </Panel>
      <Panel title="개발용 이벤트 확인">
        {state.analyticsEvents.length ? (
          <div className="event-list">
            {state.analyticsEvents.slice(-8).map((event) => (
              <span key={event.id}>
                {event.name} · {new Date(event.occurredAt).toLocaleTimeString()}
              </span>
            ))}
          </div>
        ) : (
          <p className="muted">아직 기록된 이벤트가 없습니다.</p>
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
    <div className="ring" aria-label={`진행 ${Math.min(current, total)} / ${total}`}>
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

const StatusBanner = ({ text, tone, onClose }: { text: string; tone: "error" | "info"; onClose: () => void }) => (
  <div className={`status-banner ${tone}`}>
    <span>{text}</span>
    <button onClick={onClose}>닫기</button>
  </div>
);
