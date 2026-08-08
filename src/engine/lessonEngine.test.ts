import { describe, expect, it } from "vitest";
import { completeStep, createLessonProgress, getCurrentStep, getLessonPercent } from "./lessonEngine";
import { getLesson } from "../data/lessons";

describe("lessonEngine", () => {
  it("starts Day 1 at the first reusable lesson step", () => {
    const progress = createLessonProgress("day-1");

    expect(progress.status).toBe("in-progress");
    expect(getCurrentStep(progress).id).toBe(getLesson("day-1").steps[0].id);
  });

  it("completes steps without losing metrics", () => {
    const progress = createLessonProgress("day-1");
    const next = completeStep(progress, "situation", {
      naturalPlayCount: 2,
      slowPlayCount: 1,
      recordingRetries: 0
    });

    expect(next.completedStepIds).toContain("situation");
    expect(next.metrics.situation.naturalPlayCount).toBe(2);
    expect(getLessonPercent(next)).toBeGreaterThan(0);
  });

  it("creates progress for a Travel lesson", () => {
    const progress = createLessonProgress("travel-day-1");

    expect(progress.lessonId).toBe("travel-day-1");
    expect(progress.courseId).toBe("travel");
    expect(progress.currentStepId).toBe("situation");
  });

  it("creates progress for a K-Food lesson", () => {
    const progress = createLessonProgress("k-food-day-1");

    expect(progress.lessonId).toBe("k-food-day-1");
    expect(progress.courseId).toBe("k-food");
    expect(progress.currentStepId).toBe("situation");
  });
});
