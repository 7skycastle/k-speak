import { courseRegistry } from "../data/courses/courseRegistry";
import { getCulturePackLessonIds } from "../data/courses/cultureLessons";
import type { CourseEnrollment, CourseRouteSlot, CulturePackId, CultureRouteSelection, UserState } from "../types";

const CULTURE_ROUTE_VERSION = courseRegistry["k-culture"].routeVersion;
const CULTURE_SLOT_ORDER = [
  ["common", 1],
  ["primary", 1],
  ["common", 2],
  ["primary", 2],
  ["sampler", 1],
  ["primary", 3],
  ["common", 3],
  ["primary", 4],
  ["sampler", 2],
  ["common", 4],
  ["primary", 5],
  ["primary", 6],
  ["synthesis", 1],
  ["synthesis", 2]
] as const;

const lessonIdForSlot = (
  kind: (typeof CULTURE_SLOT_ORDER)[number][0],
  index: number,
  selection: CultureRouteSelection
) => {
  if (kind === "common") return `k-culture-common-${index}`;
  if (kind === "primary") return `k-culture-${selection.primaryPackId}-${index}`;
  if (kind === "sampler") return `k-culture-${selection.samplerPackId}-${index}`;
  return `k-culture-synthesis-${index}`;
};

const packIdForSlot = (
  kind: (typeof CULTURE_SLOT_ORDER)[number][0],
  selection: CultureRouteSelection
): CulturePackId | undefined => {
  if (kind === "primary") return selection.primaryPackId;
  if (kind === "sampler") return selection.samplerPackId;
  return undefined;
};

export const createCultureRoute = (selection: CultureRouteSelection): CourseRouteSlot[] => {
  if (selection.primaryPackId === selection.samplerPackId) {
    throw new Error("Primary and sampler culture packs must differ");
  }
  for (const packId of [selection.primaryPackId, selection.samplerPackId]) {
    if (getCulturePackLessonIds(packId).length < 6) {
      throw new Error(`Culture pack is incomplete: ${packId}`);
    }
  }

  return CULTURE_SLOT_ORDER.map(([kind, index], slotIndex) => ({
    slot: slotIndex + 1,
    kind,
    lessonId: lessonIdForSlot(kind, index, selection),
    packId: packIdForSlot(kind, selection)
  }));
};

export const isCultureRouteLocked = (
  enrollment: CourseEnrollment | undefined,
  progress: UserState["lessonProgress"]
) =>
  Boolean(enrollment?.routeLockedAt) ||
  (enrollment?.routeSlots ?? []).some(
    (slot) => (slot.kind === "primary" || slot.kind === "sampler") && Boolean(progress[slot.lessonId])
  );

export const updateCultureRouteSelection = (
  enrollment: CourseEnrollment | undefined,
  progress: UserState["lessonProgress"],
  selection: CultureRouteSelection,
  changedAt: string
): CourseEnrollment => {
  if (isCultureRouteLocked(enrollment, progress)) {
    return (
      enrollment ?? {
        courseId: "k-culture",
        routeVersion: CULTURE_ROUTE_VERSION,
        completions: []
      }
    );
  }

  return {
    courseId: "k-culture",
    routeVersion: CULTURE_ROUTE_VERSION,
    startedAt: enrollment?.startedAt,
    lastOpenedAt: enrollment?.lastOpenedAt,
    routeSlots: createCultureRoute(selection),
    completions: enrollment?.completions ?? [],
    fieldUpdatedAt: {
      ...enrollment?.fieldUpdatedAt,
      routeSlots: changedAt
    }
  };
};
