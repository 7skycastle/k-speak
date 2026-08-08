import type { EpsAssessmentAttempt, UserState } from "../types";

const compareIso = (left?: string, right?: string) => {
  const leftTime = left ? new Date(left).getTime() : 0;
  const rightTime = right ? new Date(right).getTime() : 0;
  return leftTime - rightTime;
};

export const mergeEpsAssessmentAttempt = (
  current: EpsAssessmentAttempt,
  incoming: EpsAssessmentAttempt
): EpsAssessmentAttempt => {
  const latest = compareIso(current.lastSavedAt, incoming.lastSavedAt) <= 0 ? incoming : current;
  const fallback = latest === incoming ? current : incoming;
  const answers = { ...fallback.answers };

  for (const [questionId, answer] of Object.entries(latest.answers)) {
    const existing = answers[questionId];
    if (!existing || compareIso(existing.answeredAt, answer.answeredAt) <= 0) {
      answers[questionId] = answer;
    }
  }

  return {
    ...fallback,
    ...latest,
    answers,
    questionOrder: latest.questionOrder.length ? latest.questionOrder : fallback.questionOrder,
    unavailableQuestionIds: Array.from(new Set([...fallback.unavailableQuestionIds, ...latest.unavailableQuestionIds]))
  };
};

export const mergeEpsAssessmentAttempts = (
  account: UserState["epsAssessmentAttempts"] = {},
  guest: UserState["epsAssessmentAttempts"] = {}
) => {
  const merged = { ...account };
  for (const [attemptId, attempt] of Object.entries(guest)) {
    merged[attemptId] = merged[attemptId] ? mergeEpsAssessmentAttempt(merged[attemptId], attempt) : attempt;
  }
  return merged;
};
