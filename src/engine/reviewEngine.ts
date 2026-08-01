import { getLesson } from "../data/lessons";
import { reviewRules } from "../data/reviewRules";
import type { LessonProgress, ReviewItem } from "../types";

export const buildReviewItems = (progress: LessonProgress, meaning: string): ReviewItem[] => {
  const lesson = getLesson(progress.lessonId);
  if (progress.status !== "completed") return [];

  const priority = Object.values(progress.metrics).reduce((score, metric) => {
    const slowResponse =
      metric.responseMs && metric.responseMs > reviewRules.thresholds.slowResponseMs
        ? reviewRules.weights.slowResponse
        : 0;
    return (
      score +
      (metric.answeredCorrectly === false ? reviewRules.weights.incorrectAnswer : 0) +
      slowResponse +
      (metric.usedHint ? reviewRules.weights.hintUsed : 0) +
      metric.naturalPlayCount * reviewRules.weights.naturalReplay +
      metric.slowPlayCount * reviewRules.weights.slowReplay +
      metric.recordingRetries * reviewRules.weights.recordingRetry +
      (metric.markedDifficult ? reviewRules.weights.markedDifficult : 0)
    );
  }, 0);

  const normalizedPriority = Math.max(priority, reviewRules.thresholds.minimumPriority);
  const dueHours =
    normalizedPriority >= 55
      ? reviewRules.scheduleHours.highPriority
      : normalizedPriority >= 30
        ? reviewRules.scheduleHours.mediumPriority
        : reviewRules.scheduleHours.lowPriority;

  const reason =
    priority >= 55
      ? "오늘 여러 번 다시 확인한 표현이에요."
      : priority >= 30
        ? "처음 배운 문장을 짧게 다시 확인해요."
        : "며칠 뒤 잊기 전에 다시 볼 표현이에요.";

  return [
    {
      id: `${lesson.id}:${lesson.phraseId}`,
      lessonId: lesson.id,
      phraseId: lesson.phraseId,
      korean: lesson.korean,
      meaning,
      reason,
      priority: normalizedPriority,
      dueAt: new Date(Date.now() + dueHours * 60 * 60 * 1000).toISOString()
    }
  ];
};

export const getDueReviewItems = (items: ReviewItem[], at = new Date()) =>
  items
    .filter((item) => new Date(item.dueAt).getTime() <= at.getTime())
    .sort((a, b) => b.priority - a.priority);
