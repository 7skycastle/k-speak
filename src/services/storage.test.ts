import { beforeEach, describe, expect, it } from "vitest";
import type { LessonProgress, ReviewItem, SavedPhrase, UserState } from "../types";
import { createCultureRoute } from "../engine/culturePathEngine";
import {
  completeReviewItem,
  completeCourseRoute,
  createInitialState,
  loadState,
  mergeGuestIntoAccount,
  mergeUserStates,
  removeSavedPhrase,
  saveKFoodMissionResult,
  saveTravelMissionResult,
  upsertEpsAssessmentAttempt,
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

  it("migrates a legacy saved state to foundation course metadata on load", () => {
    localStorage.setItem(
      "korean-first-talk:user-state:v1",
      JSON.stringify({
        anonymousId: "guest-legacy",
        lessonProgress: {
          "day-1": progress("completed", ["summary"], "summary")
        },
        reviewItems: [reviewItem()],
        savedPhrases: [savedPhrase()],
        savedPhraseTombstones: [],
        analyticsEvents: [],
        sync: {
          mode: "local-only",
          pending: false,
          message: "legacy"
        },
        updatedAt: "2026-08-01T00:00:00.000Z"
      })
    );

    const state = loadState();

    expect(state.activeCourseId).toBe("foundation");
    expect(state.lessonProgress["day-1"].courseId).toBe("foundation");
    expect(state.reviewItems[0].courseId).toBe("foundation");
    expect(state.savedPhrases[0].courseId).toBe("foundation");
  });

  it("keeps the latest active course preference by timestamp", () => {
    const account = buildState({
      activeCourseId: "travel",
      activeCourseChangedAt: "2026-08-04T00:00:00.000Z"
    });
    const guest = buildState({
      activeCourseId: "foundation",
      activeCourseChangedAt: "2026-08-05T00:00:00.000Z"
    });

    const merged = mergeUserStates(account, guest, "learner@example.com");

    expect(merged.activeCourseId).toBe("foundation");
    expect(merged.activeCourseChangedAt).toBe("2026-08-05T00:00:00.000Z");
  });

  it("preserves each course progress after switching and merging", () => {
    const account = buildState({
      activeCourseId: "travel",
      lessonProgress: {
        "travel-day-1": {
          lessonId: "travel-day-1",
          courseId: "travel",
          status: "completed",
          currentStepId: "summary",
          completedStepIds: ["summary"],
          metrics: {}
        }
      }
    });
    const guest = buildState({
      activeCourseId: "k-food",
      lessonProgress: {
        "k-food-day-1": {
          lessonId: "k-food-day-1",
          courseId: "k-food",
          status: "completed",
          currentStepId: "summary",
          completedStepIds: ["summary"],
          metrics: {}
        }
      }
    });

    const merged = mergeUserStates(account, guest, "learner@example.com");

    expect(merged.lessonProgress["travel-day-1"]?.status).toBe("completed");
    expect(merged.lessonProgress["travel-day-1"]?.courseId).toBe("travel");
    expect(merged.lessonProgress["k-food-day-1"]?.status).toBe("completed");
    expect(merged.lessonProgress["k-food-day-1"]?.courseId).toBe("k-food");
  });

  it("unions completion history by course and route version", () => {
    const account = buildState({
      courseEnrollments: {
        foundation: {
          courseId: "foundation",
          routeVersion: "foundation-v1",
          startedAt: "2026-08-01T00:00:00.000Z",
          completions: [
            {
              courseId: "foundation",
              routeVersion: "foundation-v1",
              completedAt: "2026-08-14T00:00:00.000Z",
              completedLessonIds: ["day-1"]
            }
          ]
        }
      }
    });
    const guest = buildState({
      courseEnrollments: {
        foundation: {
          courseId: "foundation",
          routeVersion: "foundation-v2",
          startedAt: "2026-08-02T00:00:00.000Z",
          completions: [
            {
              courseId: "foundation",
              routeVersion: "foundation-v2",
              completedAt: "2026-08-20T00:00:00.000Z",
              completedLessonIds: ["day-1", "day-2"]
            }
          ]
        }
      }
    });

    const merged = mergeUserStates(account, guest, "learner@example.com");

    expect(merged.courseEnrollments.foundation?.completions.map((item) => item.routeVersion).sort()).toEqual([
      "foundation-v1",
      "foundation-v2"
    ]);
  });

  it("keeps a locked K-Culture route over a newer unlocked selection during account merge", () => {
    const lockedRoute = createCultureRoute({ primaryPackId: "k-pop", samplerPackId: "k-drama" });
    const alternateRoute = createCultureRoute({ primaryPackId: "k-drama", samplerPackId: "k-pop" });
    const account = buildState({
      courseEnrollments: {
        "k-culture": {
          courseId: "k-culture",
          routeVersion: "k-culture-v1",
          startedAt: "2026-08-08T09:00:00.000Z",
          lastOpenedAt: "2026-08-08T09:10:00.000Z",
          routeLockedAt: "2026-08-08T09:30:00.000Z",
          routeSlots: lockedRoute,
          completions: [],
          fieldUpdatedAt: {
            routeLockedAt: "2026-08-08T09:30:00.000Z",
            routeSlots: "2026-08-08T09:00:00.000Z"
          }
        }
      }
    });
    const guest = buildState({
      courseEnrollments: {
        "k-culture": {
          courseId: "k-culture",
          routeVersion: "k-culture-v1",
          startedAt: "2026-08-08T10:00:00.000Z",
          lastOpenedAt: "2026-08-08T10:10:00.000Z",
          routeSlots: alternateRoute,
          completions: [],
          fieldUpdatedAt: {
            routeSlots: "2026-08-08T10:00:00.000Z"
          }
        }
      }
    });

    const merged = mergeUserStates(account, guest, "learner@example.com");

    expect(merged.courseEnrollments["k-culture"]?.routeLockedAt).toBe("2026-08-08T09:30:00.000Z");
    expect(merged.courseEnrollments["k-culture"]?.routeSlots).toEqual(lockedRoute);
  });

  it("stores EPS assessment attempts in the persistent outbox", () => {
    const next = upsertEpsAssessmentAttempt(buildState(), {
      attemptId: "attempt-1",
      kind: "placement",
      assessmentVersion: "eps-v1",
      questionOrder: ["q1"],
      answers: {},
      currentIndex: 0,
      status: "in-progress",
      startedAt: "2026-08-01T00:00:00.000Z",
      lastSavedAt: "2026-08-01T00:01:00.000Z",
      unavailableQuestionIds: []
    });

    expect(next.epsAssessmentAttempts["attempt-1"].status).toBe("in-progress");
    expect(next.sync.pendingChanges).toEqual([
      expect.objectContaining({
        entity: "eps-assessment-attempt",
        entityId: "attempt-1",
        operation: "upsert"
      })
    ]);
  });

  it("stores Travel route completion separately from Day 14 behavior checks", () => {
    const completed = completeCourseRoute(
      buildState({
        activeCourseId: "travel",
        lessonProgress: Object.fromEntries(
          Array.from({ length: 14 }, (_, index) => {
            const lessonId = `travel-day-${index + 1}`;
            return [
              lessonId,
              {
                lessonId,
                courseId: "travel",
                status: "completed" as const,
                currentStepId: "summary",
                completedStepIds: ["summary"],
                metrics: {}
              }
            ];
          })
        )
      }),
      "travel",
      "2026-08-14T00:00:00.000Z"
    );

    const withMission = saveTravelMissionResult(completed, {
      lessonId: "travel-day-14",
      completedAt: "2026-08-14T00:01:00.000Z",
      checks: {
        "first-sentence": "success",
        "short-response": "practice-more",
        "rescue-expression": "success"
      }
    });

    expect(withMission.courseEnrollments.travel?.completions[0].routeVersion).toBe("travel-v1");
    expect(withMission.travelMissionResults?.["travel-day-14"].checks["short-response"]).toBe("practice-more");
    expect(JSON.stringify(withMission.travelMissionResults)).not.toMatch(/%|accuracy|percent/i);
    expect(withMission.sync.pendingChanges).toEqual(
      expect.arrayContaining([expect.objectContaining({ entity: "course-enrollment", entityId: "travel" })])
    );
  });

  it("stores K-Food mission feedback without a score", () => {
    const result = saveKFoodMissionResult(buildState(), {
      lessonId: "k-food-day-14",
      completedAt: "2026-08-08T12:00:00.000Z",
      checks: {
        "choose-food": "success",
        "short-order": "practice-more",
        "resolve-problem": "success"
      }
    });

    expect(result.kFoodMissionResults?.["k-food-day-14"]?.checks["short-order"]).toBe("practice-more");
    expect(JSON.stringify(result.kFoodMissionResults)).not.toMatch(/%|accuracy|score/i);
    expect(result.sync.pendingChanges).toEqual([
      expect.objectContaining({
        entity: "course-mission-result",
        entityId: "k-food:k-food-day-14",
        operation: "upsert"
      })
    ]);
  });

  it("keeps the latest K-Food mission result during account merge", () => {
    const account = buildState({
      kFoodMissionResults: {
        "k-food-day-14": {
          lessonId: "k-food-day-14",
          completedAt: "2026-08-08T10:00:00.000Z",
          checks: {
            "choose-food": "practice-more",
            "short-order": "practice-more",
            "resolve-problem": "practice-more"
          }
        }
      }
    });
    const guest = buildState({
      kFoodMissionResults: {
        "k-food-day-14": {
          lessonId: "k-food-day-14",
          completedAt: "2026-08-08T11:00:00.000Z",
          checks: {
            "choose-food": "success",
            "short-order": "practice-more",
            "resolve-problem": "success"
          }
        }
      }
    });

    const merged = mergeUserStates(account, guest, "learner@example.com");

    expect(merged.kFoodMissionResults?.["k-food-day-14"]?.completedAt).toBe("2026-08-08T11:00:00.000Z");
    expect(merged.kFoodMissionResults?.["k-food-day-14"]?.checks["choose-food"]).toBe("success");
  });
});
