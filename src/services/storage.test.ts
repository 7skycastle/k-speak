import { beforeEach, describe, expect, it } from "vitest";
import type { LessonProgress, ReviewItem, SavedPhrase, UserState } from "../types";
import {
  completeReviewItem,
  createInitialState,
  mergeGuestIntoAccount,
  mergeUserStates,
  removeSavedPhrase,
  upsertSavedPhrase
} from "./storage";

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

const reviewItem = (overrides: Partial<ReviewItem> = {}): ReviewItem => ({
  id: "day-1:hello-nice-meet-you",
  lessonId: "day-1",
  phraseId: "hello-nice-meet-you",
  korean: "annyeonghaseyo",
  meaning: "Hello. Nice to meet you.",
  reason: "Review this phrase again.",
  priority: 20,
  dueAt: "2026-08-01T00:00:00.000Z",
  updatedAt: "2026-08-01T00:00:00.000Z",
  ...overrides
});

const savedPhrase = (overrides: Partial<SavedPhrase> = {}): SavedPhrase => ({
  id: "day-1:core",
  lessonId: "day-1",
  phraseId: "core",
  korean: "annyeonghaseyo",
  romanization: "Annyeonghaseyo",
  meaning: "Hello",
  tags: ["core"],
  source: "core",
  savedAt: "2026-08-01T00:00:00.000Z",
  updatedAt: "2026-08-01T00:00:00.000Z",
  ...overrides
});

const buildState = (overrides: Partial<UserState> = {}): UserState => ({
  ...createInitialState(),
  sync: {
    ...createInitialState().sync,
    mode: "supabase-ready",
    pending: false,
    pendingChanges: []
  },
  ...overrides
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
    const account: UserState = buildState({
      accountEmail: "learner@example.com",
      lessonProgress: {
        "day-1": progress("completed", ["situation", "phrase", "summary"], "summary")
      },
      reviewItems: [reviewItem({ priority: 70 })]
    });
    localStorage.setItem("korean-first-talk:cloud-profile:learner@example.com", JSON.stringify(account));

    const guest: UserState = buildState({
      lessonProgress: {
        "day-1": progress("in-progress", ["situation", "phrase"], "meaning")
      },
      reviewItems: [reviewItem({ priority: 20 }), reviewItem({ id: "day-1:second", priority: 35 })]
    });

    const merged = mergeGuestIntoAccount(guest, "learner@example.com");

    expect(merged.lessonProgress["day-1"].status).toBe("completed");
    expect(merged.lessonProgress["day-1"].completedStepIds).toEqual(["situation", "phrase", "summary"]);
    expect(merged.reviewItems).toHaveLength(2);
    expect(merged.reviewItems.find((item) => item.id === "day-1:hello-nice-meet-you")?.priority).toBe(70);
  });

  it("keeps the latest review schedule even when the older copy has higher priority", () => {
    const account: UserState = buildState({
      reviewItems: [
        reviewItem({
          priority: 90,
          dueAt: "2026-08-01T00:00:00.000Z",
          updatedAt: "2026-08-01T00:00:00.000Z",
          successCount: 0,
          hardCount: 1
        })
      ]
    });
    const guest: UserState = buildState({
      reviewItems: [
        reviewItem({
          priority: 30,
          dueAt: "2026-08-04T12:00:00.000Z",
          updatedAt: "2026-08-04T09:00:00.000Z",
          lastResult: "success",
          lastReviewedAt: "2026-08-04T09:00:00.000Z",
          successCount: 1,
          hardCount: 1
        })
      ]
    });

    const merged = mergeUserStates(account, guest, "learner@example.com");

    expect(merged.reviewItems).toHaveLength(1);
    expect(merged.reviewItems[0].dueAt).toBe("2026-08-04T12:00:00.000Z");
    expect(merged.reviewItems[0].lastResult).toBe("success");
    expect(merged.reviewItems[0].successCount).toBe(1);
    expect(merged.reviewItems[0].hardCount).toBe(1);
    expect(merged.reviewItems[0].priority).toBe(90);
  });

  it("merges saved phrases and keeps the latest duplicate", () => {
    const account: UserState = buildState({
      accountEmail: "learner@example.com",
      savedPhrases: [savedPhrase({ savedAt: "2026-08-01T00:00:00.000Z", meaning: "Old" })]
    });
    localStorage.setItem("korean-first-talk:cloud-profile:learner@example.com", JSON.stringify(account));

    const guest: UserState = buildState({
      savedPhrases: [
        savedPhrase({
          savedAt: "2026-08-02T00:00:00.000Z",
          updatedAt: "2026-08-02T00:00:00.000Z",
          meaning: "New"
        }),
        savedPhrase({
          id: "day-1:rescue",
          phraseId: "rescue",
          savedAt: "2026-08-02T00:00:00.000Z",
          updatedAt: "2026-08-02T00:00:00.000Z",
          meaning: "Rescue"
        })
      ]
    });

    const merged = mergeGuestIntoAccount(guest, "learner@example.com");

    expect(merged.savedPhrases).toHaveLength(2);
    expect(merged.savedPhrases.find((item) => item.id === "day-1:core")?.meaning).toBe("New");
  });

  it("keeps a newer deletion tombstone from being revived by an older cloud phrase", () => {
    const account: UserState = buildState({
      savedPhrases: [
        savedPhrase({
          savedAt: "2026-08-01T00:00:00.000Z",
          updatedAt: "2026-08-01T00:00:00.000Z",
          meaning: "Cloud phrase"
        })
      ]
    });
    const guest: UserState = buildState({
      savedPhrases: [],
      savedPhraseTombstones: [
        {
          ...savedPhrase({
            meaning: "Cloud phrase",
            updatedAt: "2026-08-04T10:00:00.000Z"
          }),
          deletedAt: "2026-08-04T10:00:00.000Z",
          updatedAt: "2026-08-04T10:00:00.000Z"
        }
      ]
    });

    const merged = mergeUserStates(account, guest, "learner@example.com");

    expect(merged.savedPhrases).toEqual([]);
    expect(merged.savedPhraseTombstones).toHaveLength(1);
    expect(merged.savedPhraseTombstones[0].deletedAt).toBe("2026-08-04T10:00:00.000Z");
  });

  it("restores a phrase when the newer copy was saved again after an older deletion", () => {
    const account: UserState = buildState({
      savedPhrases: [],
      savedPhraseTombstones: [
        {
          ...savedPhrase({
            meaning: "Old phrase",
            updatedAt: "2026-08-02T00:00:00.000Z"
          }),
          deletedAt: "2026-08-02T00:00:00.000Z",
          updatedAt: "2026-08-02T00:00:00.000Z"
        }
      ]
    });
    const guest: UserState = buildState({
      savedPhrases: [
        savedPhrase({
          meaning: "Saved again",
          savedAt: "2026-08-04T11:00:00.000Z",
          updatedAt: "2026-08-04T11:00:00.000Z"
        })
      ]
    });

    const merged = mergeUserStates(account, guest, "learner@example.com");

    expect(merged.savedPhraseTombstones).toEqual([]);
    expect(merged.savedPhrases).toHaveLength(1);
    expect(merged.savedPhrases[0].meaning).toBe("Saved again");
  });
});

describe("storage sync persistence", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("tracks review completion with latest counters and a pending sync change", () => {
    const state = buildState({
      reviewItems: [
        reviewItem({
          dueAt: "2026-08-04T01:00:00.000Z",
          updatedAt: "2026-08-04T01:00:00.000Z"
        })
      ]
    });

    const next = completeReviewItem(state, "day-1:hello-nice-meet-you", "hard");

    expect(next.reviewItems[0].hardCount).toBe(1);
    expect(next.reviewItems[0].lastResult).toBe("hard");
    expect(next.sync.pending).toBe(true);
    expect(next.sync.pendingChanges).toEqual([
      expect.objectContaining({
        entity: "review-item",
        entityId: "day-1:hello-nice-meet-you",
        operation: "upsert"
      })
    ]);
  });

  it("stores a tombstone and pending delete when a saved phrase is removed", () => {
    const state = buildState({
      savedPhrases: [savedPhrase()]
    });

    const next = removeSavedPhrase(state, "day-1:core");

    expect(next.savedPhrases).toEqual([]);
    expect(next.savedPhraseTombstones).toHaveLength(1);
    expect(next.savedPhraseTombstones[0].id).toBe("day-1:core");
    expect(next.sync.pendingChanges).toEqual([
      expect.objectContaining({
        entity: "saved-phrase",
        entityId: "day-1:core",
        operation: "delete"
      })
    ]);
  });

  it("replaces a delete tombstone when the learner saves the same phrase again", () => {
    const removed = removeSavedPhrase(
      buildState({
        savedPhrases: [savedPhrase()]
      }),
      "day-1:core"
    );
    const deletedAt = removed.savedPhraseTombstones[0].updatedAt;
    const restoredAt = new Date(new Date(deletedAt).getTime() + 1_000).toISOString();

    const restored = upsertSavedPhrase(
      removed,
      savedPhrase({
        meaning: "Saved again",
        savedAt: restoredAt,
        updatedAt: restoredAt
      })
    );

    expect(restored.savedPhraseTombstones).toEqual([]);
    expect(restored.savedPhrases).toHaveLength(1);
    expect(restored.savedPhrases[0].meaning).toBe("Saved again");
    expect(restored.sync.pendingChanges).toEqual([
      expect.objectContaining({
        entity: "saved-phrase",
        entityId: "day-1:core",
        operation: "upsert"
      })
    ]);
  });

  it("persists pending sync changes across reloads for retry after app restart", () => {
    const saved = upsertSavedPhrase(buildState(), savedPhrase());

    const reloaded = JSON.parse(localStorage.getItem("korean-first-talk:user-state:v1") ?? "{}") as UserState;

    expect(reloaded.sync.pendingChanges).toEqual([
      expect.objectContaining({
        entity: "saved-phrase",
        entityId: "day-1:core",
        operation: "upsert"
      })
    ]);
  });
});
