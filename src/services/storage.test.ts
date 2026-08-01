import { beforeEach, describe, expect, it } from "vitest";
import type { LessonProgress, ReviewItem, UserState } from "../types";
import { createInitialState, mergeGuestIntoAccount } from "./storage";

const progress = (
  status: LessonProgress["status"],
  completedStepIds: string[],
  currentStepId: string
): LessonProgress => ({
  lessonId: "day-1",
  status,
  currentStepId,
  completedStepIds,
  metrics: {}
});

const reviewItem = (id: string, priority: number): ReviewItem => ({
  id,
  lessonId: "day-1",
  phraseId: "hello-nice-meet-you",
  korean: "안녕하세요. 만나서 반가워요.",
  meaning: "Hello. Nice to meet you.",
  reason: "테스트 복습",
  priority,
  dueAt: "2020-01-01T00:00:00.000Z"
});

describe("storage account merge", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("normalizes email before saving account state", () => {
    const guest = createInitialState();

    const merged = mergeGuestIntoAccount(guest, " Learner@Example.COM ");

    expect(merged.accountEmail).toBe("learner@example.com");
    expect(localStorage.getItem("korean-first-talk:cloud-profile:learner@example.com")).toBeTruthy();
  });

  it("preserves completed account progress while merging guest review items", () => {
    const account: UserState = {
      ...createInitialState(),
      accountEmail: "learner@example.com",
      lessonProgress: {
        "day-1": progress("completed", ["situation", "phrase", "summary"], "summary")
      },
      reviewItems: [reviewItem("day-1:hello-nice-meet-you", 70)]
    };
    localStorage.setItem("korean-first-talk:cloud-profile:learner@example.com", JSON.stringify(account));

    const guest: UserState = {
      ...createInitialState(),
      lessonProgress: {
        "day-1": progress("in-progress", ["situation", "phrase"], "meaning")
      },
      reviewItems: [reviewItem("day-1:hello-nice-meet-you", 20), reviewItem("day-1:second", 35)]
    };

    const merged = mergeGuestIntoAccount(guest, "learner@example.com");

    expect(merged.lessonProgress["day-1"].status).toBe("completed");
    expect(merged.lessonProgress["day-1"].completedStepIds).toEqual(["situation", "phrase", "summary"]);
    expect(merged.reviewItems).toHaveLength(2);
    expect(merged.reviewItems.find((item) => item.id === "day-1:hello-nice-meet-you")?.priority).toBe(70);
  });
});
