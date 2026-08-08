import { FOUNDATION_COURSE_ID, courseRegistry } from "../data/courses/courseRegistry";
import { cultureLessons } from "../data/courses/cultureLessons";
import { kFoodLessons } from "../data/courses/kFoodLessons";
import { travelLessons } from "../data/courses/travelLessons";
import { lessons as foundationLessons } from "../data/lessons";
import type { CourseCompletion, CourseEnrollment, CourseId, CourseStatus, Lesson, ReviewItem, UserState } from "../types";

export const LEGACY_INFERRED_AT = "1970-01-01T00:00:00.000Z";

const now = () => new Date().toISOString();

const compareIso = (left?: string, right?: string) => {
  const leftTime = left ? new Date(left).getTime() : 0;
  const rightTime = right ? new Date(right).getTime() : 0;
  return leftTime - rightTime;
};

export const getLessonCourseId = (lessonId: string): CourseId => {
  if (/^day-\d+$/.test(lessonId)) return FOUNDATION_COURSE_ID;
  if (lessonId.startsWith("travel-")) return "travel";
  if (lessonId.startsWith("k-food-")) return "k-food";
  if (lessonId.startsWith("k-culture-")) return "k-culture";
  if (lessonId.startsWith("eps-")) return "eps-topik";
  return FOUNDATION_COURSE_ID;
};

export const normalizeUserCourses = (state: UserState): UserState => {
  const activeCourseId = state.activeCourseId ?? FOUNDATION_COURSE_ID;
  const activeCourseChangedAt = state.activeCourseChangedAt ?? LEGACY_INFERRED_AT;
  const foundationEntry = courseRegistry.foundation;
  const existingFoundation = state.courseEnrollments?.foundation;

  const lessonProgress = Object.fromEntries(
    Object.entries(state.lessonProgress ?? {}).map(([lessonId, progress]) => [
      lessonId,
      {
        ...progress,
        courseId: progress.courseId ?? getLessonCourseId(progress.lessonId ?? lessonId)
      }
    ])
  );

  const reviewItems = (state.reviewItems ?? []).map((item) => ({
    ...item,
    courseId: item.courseId ?? getLessonCourseId(item.lessonId)
  }));

  const savedPhrases = (state.savedPhrases ?? []).map((item) => ({
    ...item,
    courseId: item.courseId ?? getLessonCourseId(item.lessonId)
  }));

  const savedPhraseTombstones = (state.savedPhraseTombstones ?? []).map((item) => ({
    ...item,
    courseId: item.courseId ?? getLessonCourseId(item.lessonId)
  }));

  const hasFoundationProgress =
    Object.values(lessonProgress).some((progress) => progress.courseId === "foundation") ||
    reviewItems.some((item) => item.courseId === "foundation") ||
    savedPhrases.some((item) => item.courseId === "foundation") ||
    savedPhraseTombstones.some((item) => item.courseId === "foundation");

  return {
    ...state,
    activeCourseId,
    activeCourseChangedAt,
    lessonProgress,
    reviewItems,
    savedPhrases,
    savedPhraseTombstones,
    courseEnrollments: {
      ...(state.courseEnrollments ?? {}),
      foundation:
        existingFoundation ??
        (hasFoundationProgress
          ? {
              courseId: "foundation",
              routeVersion: foundationEntry.routeVersion,
              startedAt: LEGACY_INFERRED_AT,
              lastOpenedAt: LEGACY_INFERRED_AT,
              completions: [],
              fieldUpdatedAt: {
                startedAt: LEGACY_INFERRED_AT,
                lastOpenedAt: LEGACY_INFERRED_AT,
                completions: LEGACY_INFERRED_AT
              }
            }
          : undefined)
    },
    epsAssessmentAttempts: state.epsAssessmentAttempts ?? {},
    epsAssessmentResults: state.epsAssessmentResults ?? {}
  };
};

export const getDerivedCourseStatus = (state: UserState, courseId: CourseId): CourseStatus => {
  const normalized = normalizeUserCourses(state);
  const enrollment = normalized.courseEnrollments?.[courseId];
  if (!enrollment?.startedAt) return "not-started";
  const currentRouteVersion = courseRegistry[courseId].routeVersion;
  const completed = enrollment.completions.some((completion) => completion.routeVersion === currentRouteVersion);
  return completed ? "completed" : "in-progress";
};

export const getReviewItemsForCourse = (
  state: UserState,
  courseId: CourseId = state.activeCourseId ?? FOUNDATION_COURSE_ID
): ReviewItem[] => normalizeUserCourses(state).reviewItems.filter((item) => item.courseId === courseId);

const courseLessons: Record<CourseId, Lesson[]> = {
  foundation: foundationLessons,
  travel: travelLessons,
  "k-food": kFoodLessons,
  "k-culture": cultureLessons,
  "eps-topik": []
};

export const getCourseLessonIds = (courseId: CourseId) => courseLessons[courseId].map((lesson) => lesson.id);

export const getCourseLesson = (courseId: CourseId, lessonId: string) =>
  courseLessons[courseId].find((lesson) => lesson.id === lessonId);

export const getNextCourseLesson = (
  state: UserState,
  courseId: CourseId = state.activeCourseId ?? FOUNDATION_COURSE_ID
) => {
  const lessonsForCourse = courseLessons[courseId];
  const next = lessonsForCourse.find((lesson) => state.lessonProgress[lesson.id]?.status !== "completed");
  return next ?? lessonsForCourse[lessonsForCourse.length - 1] ?? foundationLessons[0];
};

export const isCourseRouteCompleted = (state: UserState, courseId: CourseId) => {
  const ids = getCourseLessonIds(courseId);
  return ids.length > 0 && ids.every((lessonId) => state.lessonProgress[lessonId]?.status === "completed");
};

export const markCourseOpened = (state: UserState, courseId: CourseId, openedAt = now()): UserState => {
  const normalized = normalizeUserCourses(state);
  const entry = courseRegistry[courseId];
  const current = normalized.courseEnrollments[courseId];

  return {
    ...normalized,
    activeCourseId: courseId,
    activeCourseChangedAt: openedAt,
    courseEnrollments: {
      ...normalized.courseEnrollments,
      [courseId]: {
        courseId,
        routeVersion: current?.routeVersion ?? entry.routeVersion,
        startedAt: current?.startedAt ?? openedAt,
        lastOpenedAt: openedAt,
        routeSlots: current?.routeSlots,
        completions: current?.completions ?? [],
        fieldUpdatedAt: {
          ...current?.fieldUpdatedAt,
          startedAt: current?.fieldUpdatedAt?.startedAt ?? openedAt,
          lastOpenedAt: openedAt
        }
      }
    }
  };
};

export const mergeActiveCoursePreference = (account: UserState, guest: UserState) => {
  const normalizedAccount = normalizeUserCourses(account);
  const normalizedGuest = normalizeUserCourses(guest);

  return compareIso(normalizedAccount.activeCourseChangedAt, normalizedGuest.activeCourseChangedAt) <= 0
    ? {
        activeCourseId: normalizedGuest.activeCourseId,
        activeCourseChangedAt: normalizedGuest.activeCourseChangedAt
      }
    : {
        activeCourseId: normalizedAccount.activeCourseId,
        activeCourseChangedAt: normalizedAccount.activeCourseChangedAt
      };
};

const completionKey = (completion: CourseCompletion) => `${completion.courseId}:${completion.routeVersion}`;

const mergeCompletions = (left: CourseCompletion[] = [], right: CourseCompletion[] = []) => {
  const completions = new Map<string, CourseCompletion>();

  for (const completion of [...left, ...right]) {
    const key = completionKey(completion);
    const current = completions.get(key);
    if (!current || compareIso(current.completedAt, completion.completedAt) <= 0) {
      completions.set(key, completion);
    }
  }

  return Array.from(completions.values()).sort((a, b) => compareIso(a.completedAt, b.completedAt));
};

const canonicalRouteSlots = (enrollment: CourseEnrollment) => JSON.stringify(enrollment.routeSlots ?? []);

const chooseRouteSource = (left: CourseEnrollment, right: CourseEnrollment): CourseEnrollment => {
  if (left.routeLockedAt && right.routeLockedAt) {
    const lockOrder = compareIso(left.routeLockedAt, right.routeLockedAt);
    if (lockOrder < 0) return left;
    if (lockOrder > 0) return right;
    return canonicalRouteSlots(left) <= canonicalRouteSlots(right) ? left : right;
  }
  if (left.routeLockedAt) return left;
  if (right.routeLockedAt) return right;

  const leftRouteSlotsChanged = left.fieldUpdatedAt?.routeSlots;
  const rightRouteSlotsChanged = right.fieldUpdatedAt?.routeSlots;
  return compareIso(leftRouteSlotsChanged, rightRouteSlotsChanged) <= 0 ? right : left;
};

const mergeEnrollment = (left?: CourseEnrollment, right?: CourseEnrollment): CourseEnrollment | undefined => {
  if (!left) return right;
  if (!right) return left;

  const leftStartedAtChanged = left.fieldUpdatedAt?.startedAt ?? left.startedAt;
  const rightStartedAtChanged = right.fieldUpdatedAt?.startedAt ?? right.startedAt;
  const leftLastOpenedAtChanged = left.fieldUpdatedAt?.lastOpenedAt ?? left.lastOpenedAt;
  const rightLastOpenedAtChanged = right.fieldUpdatedAt?.lastOpenedAt ?? right.lastOpenedAt;
  const rightOpenedWins = compareIso(leftLastOpenedAtChanged, rightLastOpenedAtChanged) <= 0;
  const routeSource = chooseRouteSource(left, right);

  return {
    ...left,
    ...right,
    routeVersion: routeSource.routeVersion ?? (rightOpenedWins ? right.routeVersion : left.routeVersion),
    startedAt: compareIso(leftStartedAtChanged, rightStartedAtChanged) <= 0 ? right.startedAt : left.startedAt,
    lastOpenedAt: rightOpenedWins ? right.lastOpenedAt : left.lastOpenedAt,
    routeLockedAt: routeSource.routeLockedAt,
    routeSlots: routeSource.routeSlots ?? (routeSource === right ? left.routeSlots : right.routeSlots),
    completions: mergeCompletions(left.completions, right.completions),
    fieldUpdatedAt: {
      ...left.fieldUpdatedAt,
      ...right.fieldUpdatedAt
    }
  };
};

export const mergeCourseEnrollments = (account: UserState, guest: UserState): UserState["courseEnrollments"] => {
  const normalizedAccount = normalizeUserCourses(account);
  const normalizedGuest = normalizeUserCourses(guest);
  const courseIds = new Set<CourseId>([
    ...(Object.keys(normalizedAccount.courseEnrollments ?? {}) as CourseId[]),
    ...(Object.keys(normalizedGuest.courseEnrollments ?? {}) as CourseId[])
  ]);

  return Object.fromEntries(
    Array.from(courseIds).map((courseId) => [
      courseId,
      mergeEnrollment(normalizedAccount.courseEnrollments[courseId], normalizedGuest.courseEnrollments[courseId])
    ])
  ) as UserState["courseEnrollments"];
};
