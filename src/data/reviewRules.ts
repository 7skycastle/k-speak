export const reviewRules = {
  weights: {
    incorrectAnswer: 28,
    slowResponse: 10,
    hintUsed: 12,
    naturalReplay: 5,
    slowReplay: 4,
    recordingRetry: 8,
    markedDifficult: 20,
    daysElapsed: 3,
    previousHardReview: 18
  },
  thresholds: {
    slowResponseMs: 9000,
    minimumPriority: 18
  },
  scheduleHours: {
    highPriority: 12,
    mediumPriority: 24,
    lowPriority: 72
  }
} as const;
