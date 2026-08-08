import type { CourseExposure, CourseId } from "../../types";
import { cultureLessonIds } from "./cultureLessons";
import { kFoodLessonIds } from "./kFoodLessons";
import { travelLessonIds } from "./travelLessons";

export const FOUNDATION_COURSE_ID = "foundation" satisfies CourseId;

export const COURSE_IDS = ["foundation", "travel", "k-food", "k-culture", "eps-topik"] as const satisfies readonly CourseId[];

export interface CourseRegistryEntry {
  id: CourseId;
  titleKey: string;
  routeVersion: string;
  exposure: CourseExposure;
  coreLessonIds: string[];
  continuationLessonIds: string[];
}

const dayIds = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => `day-${from + index}`);

export const courseRegistry: Record<CourseId, CourseRegistryEntry> = {
  foundation: {
    id: "foundation",
    titleKey: "course.foundation.title",
    routeVersion: "foundation-v1",
    exposure: "visible",
    coreLessonIds: dayIds(1, 14),
    continuationLessonIds: dayIds(15, 30)
  },
  travel: {
    id: "travel",
    titleKey: "course.travel.title",
    routeVersion: "travel-v1",
    exposure: "preparing",
    coreLessonIds: travelLessonIds,
    continuationLessonIds: []
  },
  "k-food": {
    id: "k-food",
    titleKey: "course.kFood.title",
    routeVersion: "k-food-v1",
    exposure: "preparing",
    coreLessonIds: kFoodLessonIds,
    continuationLessonIds: []
  },
  "k-culture": {
    id: "k-culture",
    titleKey: "course.kCulture.title",
    routeVersion: "k-culture-v1",
    exposure: "preparing",
    coreLessonIds: cultureLessonIds,
    continuationLessonIds: []
  },
  "eps-topik": {
    id: "eps-topik",
    titleKey: "course.epsTopik.title",
    routeVersion: "eps-topik-v1",
    exposure: "hidden",
    coreLessonIds: [],
    continuationLessonIds: []
  }
};

export const getCourseRegistryEntry = (courseId: CourseId) => courseRegistry[courseId];
