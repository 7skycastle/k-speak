import { fireEvent, render, screen } from "@testing-library/react";
import { useState } from "react";
import { describe, expect, it } from "vitest";
import { ContinuationPathPanel, RecorderControls, ReviewScreen } from "./App";
import { getContinuationTrack } from "./data/continuationProgram";
import { lessons } from "./data/lessons";
import type { UserState } from "./types";

const createState = (reviewItems: UserState["reviewItems"]): UserState => ({
  anonymousId: "guest-test",
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
