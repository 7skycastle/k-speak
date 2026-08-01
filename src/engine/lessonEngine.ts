import { getLesson } from "../data/lessons";
import type { LessonProgress, LessonStep, StepMetrics } from "../types";

const now = () => new Date().toISOString();

export const createLessonProgress = (lessonId = "day-1"): LessonProgress => {
  const lesson = getLesson(lessonId);
  return {
    lessonId: lesson.id,
    status: "in-progress",
    currentStepId: lesson.steps[0].id,
    completedStepIds: [],
    startedAt: now(),
    metrics: {}
  };
};

export const getCurrentStep = (progress: LessonProgress): LessonStep => {
  const lesson = getLesson(progress.lessonId);
  return lesson.steps.find((step) => step.id === progress.currentStepId) ?? lesson.steps[0];
};

export const completeStep = (
  progress: LessonProgress,
  stepId: string,
  metrics: Partial<StepMetrics> = {}
): LessonProgress => {
  const lesson = getLesson(progress.lessonId);
  const stepIndex = lesson.steps.findIndex((step) => step.id === stepId);
  const nextStep = lesson.steps[stepIndex + 1];
  const completedStepIds = Array.from(new Set([...progress.completedStepIds, stepId]));
  const status = nextStep ? "in-progress" : "completed";

  return {
    ...progress,
    status,
    currentStepId: nextStep?.id ?? stepId,
    completedStepIds,
    completedAt: status === "completed" ? now() : progress.completedAt,
    metrics: {
      ...progress.metrics,
      [stepId]: {
        ...progress.metrics[stepId],
        ...metrics,
        stepId,
        naturalPlayCount: metrics.naturalPlayCount ?? progress.metrics[stepId]?.naturalPlayCount ?? 0,
        slowPlayCount: metrics.slowPlayCount ?? progress.metrics[stepId]?.slowPlayCount ?? 0,
        recordingRetries: metrics.recordingRetries ?? progress.metrics[stepId]?.recordingRetries ?? 0,
        completedAt: now()
      }
    }
  };
};

export const updateStepMetrics = (
  progress: LessonProgress,
  stepId: string,
  metrics: Partial<StepMetrics>
): LessonProgress => ({
  ...progress,
  metrics: {
    ...progress.metrics,
    [stepId]: {
      ...progress.metrics[stepId],
      ...metrics,
      stepId,
      naturalPlayCount: metrics.naturalPlayCount ?? progress.metrics[stepId]?.naturalPlayCount ?? 0,
      slowPlayCount: metrics.slowPlayCount ?? progress.metrics[stepId]?.slowPlayCount ?? 0,
      recordingRetries: metrics.recordingRetries ?? progress.metrics[stepId]?.recordingRetries ?? 0
    }
  }
});

export const getLessonPercent = (progress: LessonProgress) => {
  const lesson = getLesson(progress.lessonId);
  return Math.round((progress.completedStepIds.length / lesson.steps.length) * 100);
};
