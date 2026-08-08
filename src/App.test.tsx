import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import {
  buildKFoodMissionResult,
  buildTravelMissionResult,
  ContinuationPathPanel,
  HomeScreen,
  RecorderControls,
  ReviewScreen
} from "./App";
import { getContinuationTrack } from "./data/continuationProgram";
import { lessons } from "./data/lessons";
import type { UserState } from "./types";

const createState = (reviewItems: UserState["reviewItems"]): UserState => ({
  anonymousId: "guest-test",
  activeCourseId: "foundation",
  activeCourseChangedAt: "1970-01-01T00:00:00.000Z",
  courseEnrollments: {},
  epsAssessmentAttempts: {},
  epsAssessmentResults: {},
  onboarding: {
    countryPackId: "us-en",
    nativeLanguage: "English",
    koreanLevel: "first-time",
    learningGoal: "travel",
    dailyGoalMinutes: 5,
    characterId: "haneul",
    reminderTime: "19:00",
    completedAt: "2026-08-04T00:00:00.000Z"
  },
  lessonProgress: {},
  reviewItems,
  savedPhrases: [],
  savedPhraseTombstones: [],
  analyticsEvents: [],
  sync: {
    mode: "local-only",
    pending: false,
    message: "Saved safely on this device.",
    pendingChanges: []
  },
  updatedAt: "2026-08-04T00:00:00.000Z"
});

const ReviewHarness = ({ initialState }: { initialState: UserState }) => {
  const [state, setState] = useState(initialState);
  return <ReviewScreen state={state} onPersist={setState} onStartLesson={() => undefined} onReturnHome={() => undefined} />;
};

describe("ReviewScreen", () => {
  it("shows the next due review after completing the current one", () => {
    render(
      <ReviewHarness
        initialState={createState([
          {
            id: "review-1",
            lessonId: "day-1",
            phraseId: "hello",
            korean: "annyeonghaseyo",
            meaning: "Hello",
            reason: "Warm up with your first greeting again.",
            priority: 80,
            dueAt: "2026-08-03T00:00:00.000Z"
          },
          {
            id: "review-2",
            lessonId: "day-1",
            phraseId: "nice",
            korean: "bangapseumnida",
            meaning: "Nice to meet you",
            reason: "Keep the polite introduction response fresh.",
            priority: 40,
            dueAt: "2026-08-03T00:00:00.000Z"
          }
        ])}
      />
    );

    expect(screen.getByText("annyeonghaseyo")).toBeInTheDocument();
    expect(screen.getByText("1 / 2")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "I remember" }));

    expect(screen.getByText("bangapseumnida")).toBeInTheDocument();
    expect(screen.getByText("2 / 2")).toBeInTheDocument();
  });

  it("closes back home after review completion when every lesson is already finished", () => {
    render(
      <ReviewHarness
        initialState={{
          ...createState([
            {
              id: "review-final",
              lessonId: "day-30",
              phraseId: "final",
              korean: "sugohaesseoyo",
              meaning: "Great work",
              reason: "Final review.",
              priority: 20,
              dueAt: "2026-08-05T00:00:00.000Z"
            }
          ]),
          lessonProgress: Object.fromEntries(
            lessons.map((lesson) => [
              lesson.id,
              {
                lessonId: lesson.id,
                status: "completed" as const,
                currentStepId: "summary",
                completedStepIds: ["summary"],
                metrics: {}
              }
            ])
          )
        }}
      />
    );

    expect(screen.getByText("sugohaesseoyo")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "I remember" }));

    expect(screen.getByText("Today's review is complete")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Close" })).toBeInTheDocument();
  });

  it("shows Day 14 travel mission checks without percentage scoring", () => {
    render(
      <ReviewScreen
        state={{
          ...createState([]),
          activeCourseId: "travel",
          travelMissionResults: {
            "travel-day-14": {
              lessonId: "travel-day-14",
              completedAt: "2026-08-14T00:00:00.000Z",
              checks: {
                "first-sentence": "success",
                "short-response": "practice-more",
                "rescue-expression": "success"
              }
            }
          }
        }}
        onPersist={() => undefined}
        onStartLesson={() => undefined}
        onReturnHome={() => undefined}
      />
    );

    expect(screen.getByText("First sentence")).toBeInTheDocument();
    expect(screen.getAllByText("You did it").length).toBeGreaterThan(0);
    expect(screen.getByText("Practice more")).toBeInTheDocument();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it("shows Day 14 K-Food mission checks without percentage scoring", () => {
    render(
      <ReviewScreen
        state={{
          ...createState([]),
          activeCourseId: "k-food",
          kFoodMissionResults: {
            "k-food-day-14": {
              lessonId: "k-food-day-14",
              completedAt: "2026-08-14T00:00:00.000Z",
              checks: {
                "choose-food": "success",
                "short-order": "practice-more",
                "resolve-problem": "success"
              }
            }
          }
        }}
        onPersist={() => undefined}
        onStartLesson={() => undefined}
        onReturnHome={() => undefined}
      />
    );

    expect(screen.getByText("Choose food safely")).toBeInTheDocument();
    expect(screen.getByText("Complete a short order")).toBeInTheDocument();
    expect(screen.getByText("Resolve one problem")).toBeInTheDocument();
    expect(screen.getAllByText("You did it").length).toBeGreaterThan(0);
    expect(screen.getByText("Practice more")).toBeInTheDocument();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it("renders K-Food mission checks in the fixed order", () => {
    render(
      <ReviewScreen
        state={{
          ...createState([]),
          activeCourseId: "k-food",
          kFoodMissionResults: {
            "k-food-day-14": {
              lessonId: "k-food-day-14",
              completedAt: "2026-08-14T00:00:00.000Z",
              checks: {
                "resolve-problem": "success",
                "short-order": "practice-more",
                "choose-food": "success"
              }
            }
          }
        }}
        onPersist={() => undefined}
        onStartLesson={() => undefined}
        onReturnHome={() => undefined}
      />
    );

    const rows = screen.getAllByText(/Choose food safely|Complete a short order|Resolve one problem/).map((node) => node.textContent);
    expect(rows).toEqual(["Choose food safely", "Complete a short order", "Resolve one problem"]);
  });
});

describe("mission result helpers", () => {
  it("derives K-Food Day 14 results from quiz and roleplay metrics", () => {
    const result = buildKFoodMissionResult(
      {
        lessonId: "k-food-day-14",
        courseId: "k-food",
        status: "completed",
        currentStepId: "summary",
        completedStepIds: ["quiz", "roleplay", "summary"],
        metrics: {
          quiz: {
            stepId: "quiz",
            answeredCorrectly: false,
            naturalPlayCount: 0,
            slowPlayCount: 0,
            recordingRetries: 0
          },
          roleplay: {
            stepId: "roleplay",
            completedAt: "2026-08-08T12:00:00.000Z",
            usedHint: true,
            naturalPlayCount: 0,
            slowPlayCount: 0,
            recordingRetries: 0
          }
        }
      },
      "2026-08-08T12:00:00.000Z"
    );

    expect(result.checks).toEqual({
      "choose-food": "practice-more",
      "short-order": "success",
      "resolve-problem": "practice-more"
    });
  });

  it("derives Travel Day 14 results from quiz and roleplay metrics", () => {
    const result = buildTravelMissionResult(
      {
        lessonId: "travel-day-14",
        courseId: "travel",
        status: "completed",
        currentStepId: "summary",
        completedStepIds: ["quiz", "roleplay", "summary"],
        metrics: {
          quiz: {
            stepId: "quiz",
            answeredCorrectly: true,
            naturalPlayCount: 0,
            slowPlayCount: 0,
            recordingRetries: 0
          },
          roleplay: {
            stepId: "roleplay",
            completedAt: "2026-08-08T12:00:00.000Z",
            usedHint: false,
            naturalPlayCount: 0,
            slowPlayCount: 0,
            recordingRetries: 0
          }
        }
      },
      "travel-day-14",
      "2026-08-08T12:00:00.000Z"
    );

    expect(result.checks).toEqual({
      "first-sentence": "success",
      "short-response": "success",
      "rescue-expression": "success"
    });
  });
});

describe("RecorderControls", () => {
  it("shows a privacy note and rough-practice note without rendering a percentage score", () => {
    render(
      <RecorderControls
        recorderState="ready"
        recordedUrl=""
        onStart={() => undefined}
        onStop={() => undefined}
        onRetry={() => undefined}
        packId="us-en"
        recognitionResult={{ text: "annyeonghaseyo", confidence: 0.84 }}
        recognitionStatusKey={null}
      />
    );

    expect(
      screen.getByText(
        "Speech recognition starts only after you tap record. Your browser or device speech service may process audio for transcription."
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText("Use this transcript as a rough practice hint, not as an exact pronunciation score.")
    ).toBeInTheDocument();
    expect(screen.getByText("annyeonghaseyo")).toBeInTheDocument();
    expect(screen.queryByText(/%/)).not.toBeInTheDocument();
  });

  it("shows recognition fallback guidance when browser speech recognition is unavailable", () => {
    render(
      <RecorderControls
        recorderState="ready"
        recordedUrl=""
        onStart={() => undefined}
        onStop={() => undefined}
        onRetry={() => undefined}
        packId="us-en"
        recognitionResult={null}
        recognitionStatusKey="recorder.recognitionUnsupported"
      />
    );

    expect(
      screen.getByText(
        "Speech recognition is not available in this browser, so only recording playback is provided."
      )
    ).toBeInTheDocument();
  });
});

describe("ContinuationPathPanel", () => {
  it("shows the Day 15+ continuation title once the first 14 days are complete", () => {
    render(
      <ContinuationPathPanel
        track={getContinuationTrack("travel")}
        completedCount={14}
        courseCompleted
        savedIds={new Set()}
        onSavePhrase={() => undefined}
        packId="us-en"
      />
    );

    expect(screen.getByText("Day 15+ Program")).toBeInTheDocument();
  });
});

describe("HomeScreen course selector", () => {
  it("shows Travel as an available course without exposing future course lessons", () => {
    render(
      <HomeScreen
        state={createState([])}
        characterName="Haneul"
        lesson={lessons[0]}
        progress={undefined}
        reviewCount={0}
        savedCount={0}
        onStartLesson={() => undefined}
        onReview={() => undefined}
        onLogin={() => undefined}
        onPersist={() => undefined}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Change course" }));

    expect(screen.getByText("Korean Travel")).toBeInTheDocument();
    expect(screen.getByText("K-Food Korean")).toBeInTheDocument();
    expect(screen.getByText("K-Culture Korean")).toBeInTheDocument();
    expect(screen.getAllByText("Preparing").length).toBeGreaterThan(0);
    expect(screen.queryByText("EPS lesson 1")).not.toBeInTheDocument();
  });
});
