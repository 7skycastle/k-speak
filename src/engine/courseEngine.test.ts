import { describe, expect, it } from "vitest";
import { COURSE_IDS, FOUNDATION_COURSE_ID, courseRegistry, getCourseRegistryEntry } from "../data/courses/courseRegistry";
import { createInitialState } from "../services/storage";
import type { UserState } from "../types";
import {
  LEGACY_INFERRED_AT,
  getDerivedCourseStatus,
  getCourseLesson,
  getCourseLessonIds,
  getLessonCourseId,
  getNextCourseLesson,
  getReviewItemsForCourse,
  isCourseRouteCompleted,
  normalizeUserCourses
} from "./courseEngine";

describe("course registry", () => {
  it("defines the foundation route without exposing future courses", () => {
    expect(FOUNDATION_COURSE_ID).toBe("foundation");
    expect(courseRegistry.foundation.routeVersion).toBe("foundation-v1");
    expect(courseRegistry.foundation.coreLessonIds).toHaveLength(14);
    expect(courseRegistry.foundation.continuationLessonIds).toHaveLength(16);
    expect(courseRegistry.travel.exposure).toBe("preparing");
    expect(COURSE_IDS).toContain("k-food");
    expect(courseRegistry["k-food"]).toMatchObject({
      id: "k-food",
      titleKey: "course.kFood.title",
      routeVersion: "k-food-v1",
      exposure: "preparing"
    });
    expect(courseRegistry["k-food"].coreLessonIds).toEqual(
      Array.from({ length: 14 }, (_, index) => `k-food-day-${index + 1}`)
    );
    expect(courseRegistry["k-culture"].exposure).toBe("hidden");
    expect(courseRegistry["eps-topik"].exposure).toBe("hidden");
  });

  it("returns foundation when asked for the foundation entry", () => {
    expect(getCourseRegistryEntry("foundation").id).toBe("foundation");
  });
});

const baseState = (patch: Partial<UserState> = {}): UserState => ({
  ...createInitialState(),
  ...patch
});

describe("course normalization", () => {
  it("maps legacy day lessons to foundation", () => {
    expect(getLessonCourseId("day-1")).toBe("foundation");
    expect(getLessonCourseId("day-30")).toBe("foundation");
  });

  it("adds foundation metadata to legacy progress, reviews, and saved phrases", () => {
    const normalized = normalizeUserCourses(
      baseState({
        activeCourseId: undefined as never,
        activeCourseChangedAt: undefined as never,
        lessonProgress: {
          "day-1": {
            lessonId: "day-1",
            status: "completed",
            currentStepId: "summary",
            completedStepIds: ["summary"],
            metrics: {},
            completedAt: "2026-08-01T00:00:00.000Z"
          }
        },
        reviewItems: [
          {
            id: "day-1:core",
            lessonId: "day-1",
            phraseId: "core",
            korean: "안녕하세요",
            meaning: "Hello",
            reason: "Review",
            priority: 10,
            dueAt: "2026-08-02T00:00:00.000Z"
          }
        ],
        savedPhrases: [
          {
            id: "day-1:core",
            lessonId: "day-1",
            phraseId: "core",
            korean: "안녕하세요",
            meaning: "Hello",
            tags: ["core"],
            source: "core",
            savedAt: "2026-08-01T00:00:00.000Z"
          }
        ]
      })
    );

    expect(normalized.activeCourseId).toBe("foundation");
    expect(normalized.activeCourseChangedAt).toBe(LEGACY_INFERRED_AT);
    expect(normalized.lessonProgress["day-1"].courseId).toBe("foundation");
    expect(normalized.reviewItems[0].courseId).toBe("foundation");
    expect(normalized.savedPhrases[0].courseId).toBe("foundation");
    expect(normalized.courseEnrollments.foundation?.routeVersion).toBe("foundation-v1");
  });

  it("derives completion from current route version", () => {
    const state = normalizeUserCourses(
      baseState({
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
                completedLessonIds: Array.from({ length: 14 }, (_, index) => `day-${index + 1}`)
              }
            ]
          }
        }
      })
    );

    expect(getDerivedCourseStatus(state, "foundation")).toBe("completed");
  });

  it("filters reviews by active course while preserving untagged legacy reviews as foundation", () => {
    const state = normalizeUserCourses(
      baseState({
        activeCourseId: "foundation",
        reviewItems: [
          {
            id: "day-1:core",
            lessonId: "day-1",
            phraseId: "core",
            korean: "안녕하세요",
            meaning: "Hello",
            reason: "Review",
            priority: 10,
            dueAt: "2026-08-02T00:00:00.000Z"
          },
          {
            id: "travel-1:core",
            lessonId: "travel-1",
            phraseId: "core",
            korean: "도와주세요",
            meaning: "Help me",
            reason: "Review",
            priority: 10,
            dueAt: "2026-08-02T00:00:00.000Z",
            courseId: "travel"
          }
        ]
      })
    );

    expect(getReviewItemsForCourse(state).map((item) => item.id)).toEqual(["day-1:core"]);
  });
});

describe("course lesson lookup", () => {
  it("returns Travel lessons separately from Foundation lessons", () => {
    expect(getCourseLessonIds("foundation")[0]).toBe("day-1");
    expect(getCourseLessonIds("travel")).toHaveLength(14);
    expect(getCourseLesson("travel", "travel-day-1")?.courseId).toBe("travel");
    expect(getCourseLesson("foundation", "travel-day-1")).toBeUndefined();
  });

  it("returns K-Food lessons separately from Travel and Foundation lessons", () => {
    expect(getLessonCourseId("k-food-day-1")).toBe("k-food");
    expect(getCourseLessonIds("k-food")).toHaveLength(14);
    expect(getCourseLesson("k-food", "k-food-day-1")?.courseId).toBe("k-food");
    expect(getCourseLesson("travel", "k-food-day-1")).toBeUndefined();
    expect(getCourseLesson("foundation", "k-food-day-1")).toBeUndefined();
  });

  it("finds the next active Travel lesson from course progress", () => {
    const state = normalizeUserCourses(
      baseState({
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
      })
    );

    expect(getNextCourseLesson(state).id).toBe("travel-day-2");
  });

  it("marks Travel route complete only when all 14 lessons are completed", () => {
    const state = normalizeUserCourses(
      baseState({
        lessonProgress: Object.fromEntries(
          getCourseLessonIds("travel").map((lessonId) => [
            lessonId,
            {
              lessonId,
              courseId: "travel",
              status: "completed" as const,
              currentStepId: "summary",
              completedStepIds: ["summary"],
              metrics: {}
            }
          ])
        )
      })
    );

    expect(isCourseRouteCompleted(state, "travel")).toBe(true);
  });
});
