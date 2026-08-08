import { describe, expect, it } from "vitest";
import type { EpsAssessmentAttempt } from "../types";
import { mergeEpsAssessmentAttempt } from "./epsAssessmentEngine";

const attempt = (patch: Partial<EpsAssessmentAttempt> = {}): EpsAssessmentAttempt => ({
  attemptId: "attempt-1",
  kind: "placement",
  assessmentVersion: "eps-v1",
  questionOrder: ["q1", "q2"],
  answers: {},
  currentIndex: 0,
  status: "in-progress",
  startedAt: "2026-08-01T00:00:00.000Z",
  expiresAt: "2026-08-01T00:50:00.000Z",
  lastSavedAt: "2026-08-01T00:00:00.000Z",
  unavailableQuestionIds: [],
  ...patch
});

describe("EPS assessment attempt merge", () => {
  it("keeps the latest answer per question by answeredAt", () => {
    const merged = mergeEpsAssessmentAttempt(
      attempt({
        answers: {
          q1: { questionId: "q1", answerId: "a", answeredAt: "2026-08-01T00:05:00.000Z" }
        }
      }),
      attempt({
        answers: {
          q1: { questionId: "q1", answerId: "b", answeredAt: "2026-08-01T00:06:00.000Z" },
          q2: { questionId: "q2", answerId: "c", answeredAt: "2026-08-01T00:07:00.000Z" }
        },
        currentIndex: 1,
        lastSavedAt: "2026-08-01T00:07:00.000Z"
      })
    );

    expect(merged.answers.q1.answerId).toBe("b");
    expect(merged.answers.q2.answerId).toBe("c");
    expect(merged.currentIndex).toBe(1);
  });

  it("preserves terminal status from the latest saved attempt", () => {
    const merged = mergeEpsAssessmentAttempt(
      attempt({ status: "completed", lastSavedAt: "2026-08-01T00:40:00.000Z" }),
      attempt({ status: "in-progress", lastSavedAt: "2026-08-01T00:30:00.000Z" })
    );

    expect(merged.status).toBe("completed");
  });

  it("unions unavailable audio question ids", () => {
    const merged = mergeEpsAssessmentAttempt(
      attempt({ unavailableQuestionIds: ["q1"] }),
      attempt({ unavailableQuestionIds: ["q2"] })
    );

    expect(merged.unavailableQuestionIds.sort()).toEqual(["q1", "q2"]);
  });
});
