import { describe, expect, it } from "vitest";
import { completeStep, createLessonProgress } from "./lessonEngine";
import { buildReviewItems, getDueReviewItems } from "./reviewEngine";
import { getLesson } from "../data/lessons";
import { getCultureLesson } from "../data/courses/cultureLessons";
import { getKFoodLesson } from "../data/courses/kFoodLessons";

describe("reviewEngine", () => {
  it("creates three program review cards after Day 1 is completed", () => {
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

    expect(reviews).toHaveLength(3);
    expect(reviews.map((review) => review.kind)).toEqual(["listen", "speak", "roleplay"]);
    expect(reviews[0].id).toBe("day-1:listen");
    expect(reviews.every((review) => review.priority >= 18)).toBe(true);
    expect(reviews.every((review) => review.prompt)).toBe(true);
  });

  it("localizes review prompts and meanings for the active country pack", () => {
    const lesson = getLesson("day-1");
    const completed = lesson.steps.reduce(
      (progress, step) => completeStep(progress, step.id),
      createLessonProgress("day-1")
    );

    const reviews = buildReviewItems(completed, "こんにちは。お会いできてうれしいです。", "jp-ja");

    expect(reviews[0].meaning).toBe("こんにちは。お会いできてうれしいです。");
    expect(reviews[0].prompt).toContain("聞いて");
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

  it("localizes review reasons for the active country pack", () => {
    const lesson = getLesson("day-1");
    const completed = lesson.steps.reduce(
      (progress, step) => completeStep(progress, step.id),
      createLessonProgress("day-1")
    );

    const reviews = buildReviewItems(completed, "Hello. Nice to meet you.", "mx-es");

    expect(reviews[0].reason).toContain("antes de que se te olvide");
    expect(reviews[0].reason).toContain("frase clave");
    expect(reviews[0].reason).not.toContain("복습");
  });

  it("assigns foundation course id to review cards built from existing lessons", () => {
    const items = buildReviewItems(
      {
        lessonId: "day-1",
        status: "completed",
        currentStepId: "summary",
        completedStepIds: ["summary"],
        metrics: {}
      },
      "Hello",
      "us-en"
    );

    expect(items.length).toBeGreaterThan(0);
    expect(items.every((item) => item.courseId === "foundation")).toBe(true);
  });

  it("creates K-Food review cards without falling back to Foundation lessons", () => {
    const lesson = getKFoodLesson("k-food-day-1");
    if (!lesson) throw new Error("Missing K-Food Day 1 lesson");
    const completed = lesson.steps.reduce(
      (progress, step) => completeStep(progress, step.id),
      createLessonProgress("k-food-day-1")
    );

    const reviews = buildReviewItems(completed, "One of this, please.", "us-en");

    expect(reviews).toHaveLength(3);
    expect(reviews[0].id).toBe("k-food-day-1:listen");
    expect(reviews.every((item) => item.courseId === "k-food")).toBe(true);
    expect(reviews[0].meaning).toBe("One of this, please.");
  });

  it("creates K-Culture review cards for expanded culture pack lessons", () => {
    const lesson = getCultureLesson("k-culture-k-beauty-1");
    if (!lesson) throw new Error("Missing K-Beauty culture lesson");
    const completed = lesson.steps.reduce(
      (progress, step) => completeStep(progress, step.id),
      createLessonProgress("k-culture-k-beauty-1")
    );

    const reviews = buildReviewItems(completed, "What colors does this product come in?", "us-en");

    expect(reviews).toHaveLength(3);
    expect(reviews[0].id).toBe("k-culture-k-beauty-1:listen");
    expect(reviews.every((item) => item.courseId === "k-culture")).toBe(true);
  });
});
