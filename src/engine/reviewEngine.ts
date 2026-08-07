import { getLesson } from "../data/lessons";
import { reviewRules } from "../data/reviewRules";
import type { CountryPackId, LessonProgress, ReviewItem } from "../types";

const reviewReasonPrefixByPriority = (priority: number, countryPackId: CountryPackId) => {
  if (priority >= 55) {
    return {
      "us-en": "You checked this expression several times today.",
      "jp-ja": "今日はこの表現を何度か確認しました。",
      "cn-zh": "今天你已经多次确认过这个表达。",
      "vn-vi": "Hôm nay bạn đã kiểm tra lại mẫu câu này nhiều lần.",
      "mx-es": "Hoy ya revisaste esta expresión varias veces."
    }[countryPackId];
  }

  if (priority >= 30) {
    return {
      "us-en": "Let's briefly revisit this new sentence.",
      "jp-ja": "この新しい文を短くもう一度見直しましょう。",
      "cn-zh": "把这句刚学的新句子再快速看一遍吧。",
      "vn-vi": "Hãy ôn lại nhanh câu mới này một lần nữa.",
      "mx-es": "Vamos a revisar brevemente esta frase nueva."
    }[countryPackId];
  }

  return {
    "us-en": "This is worth seeing again before it fades.",
    "jp-ja": "忘れる前にもう一度見ておきたい表現です。",
    "cn-zh": "趁还没忘之前，再看一遍这句话更好。",
    "vn-vi": "Nên xem lại câu này thêm một lần trước khi quên mất.",
    "mx-es": "Conviene verla una vez más antes de que se te olvide."
  }[countryPackId];
};

export const buildReviewItems = (
  progress: LessonProgress,
  meaning: string,
  countryPackId: CountryPackId = "us-en"
): ReviewItem[] => {
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
  const reasonPrefix = reviewReasonPrefixByPriority(priority, countryPackId);

  const dueAt = new Date(Date.now() + dueHours * 60 * 60 * 1000).toISOString();
  const updatedAt = new Date().toISOString();

  return lesson.reviewCards.map((card) => ({
    id: `${lesson.id}:${card.id}`,
    lessonId: lesson.id,
    phraseId: `${lesson.phraseId}:${card.kind}`,
    korean: card.phrase.korean,
    meaning: card.phrase.meaningByCountry[countryPackId] || meaning,
    kind: card.kind,
    prompt: card.promptByCountry[countryPackId],
    reason: `${reasonPrefix} ${card.reasonByCountry[countryPackId]}`,
    priority: normalizedPriority,
    dueAt,
    updatedAt
  }));
};

export const getDueReviewItems = (items: ReviewItem[], at = new Date()) =>
  items
    .filter((item) => new Date(item.dueAt).getTime() <= at.getTime())
    .sort((a, b) => b.priority - a.priority);
