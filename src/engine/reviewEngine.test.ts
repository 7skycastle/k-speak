import { describe, expect, it } from "vitest";
import { completeStep, createLessonProgress } from "./lessonEngine";
import { buildReviewItems, getDueReviewItems } from "./reviewEngine";
import { getLesson } from "../data/lessons";

describe("reviewEngine", () => {
  it("creates one deduplicated review item after Day 1 is completed", () => {
    const lesson = getLesson("day-1");
    const completed = lesson.steps.reduce(
      (progress, step) =>
        completeStep(progress, step.id, {
          answeredCorrectly: step.kind === "quiz" ? false : undefined,
          usedHint: step.kind === "quiz",
          naturalPlayCount: step.kind === "listen" ? 2 : 0,
          slowPlayCount: step.kind === "listen" ? 1 : 0,
          recordingRetries: step.kind === "record" ? 2 : 0
        }),
      createLessonProgress("day-1")
    );

    const reviews = buildReviewItems(completed, "Hello. Nice to meet you.");

    expect(reviews).toHaveLength(1);
    expect(reviews[0].id).toBe("day-1:hello-nice-meet-you");
    expect(reviews[0].priority).toBeGreaterThanOrEqual(18);
  });

  it("orders due review items by priority", () => {
    const items = getDueReviewItems([
      {
        id: "low",
        lessonId: "day-1",
        phraseId: "a",
        korean: "안녕하세요",
        meaning: "Hello",
        reason: "later",
        priority: 18,
        dueAt: "2020-01-01T00:00:00.000Z"
      },
      {
        id: "high",
        lessonId: "day-1",
        phraseId: "b",
        korean: "반가워요",
        meaning: "Nice to meet you",
        reason: "hard",
        priority: 70,
        dueAt: "2020-01-01T00:00:00.000Z"
      }
    ]);

    expect(items[0].id).toBe("high");
  });
});
