import { describe, expect, it } from "vitest";
import type { CourseEnrollment, UserState } from "../types";
import { createCultureRoute, isCultureRouteLocked, updateCultureRouteSelection } from "./culturePathEngine";

const POP_PRIMARY_DRAMA_SAMPLER_V1 = [
  "k-culture-common-1",
  "k-culture-k-pop-1",
  "k-culture-common-2",
  "k-culture-k-pop-2",
  "k-culture-k-drama-1",
  "k-culture-k-pop-3",
  "k-culture-common-3",
  "k-culture-k-pop-4",
  "k-culture-k-drama-2",
  "k-culture-common-4",
  "k-culture-k-pop-5",
  "k-culture-k-pop-6",
  "k-culture-synthesis-1",
  "k-culture-synthesis-2"
];

describe("culturePathEngine", () => {
  it("builds a stable 14-slot K-Pop primary and K-Drama sampler route", () => {
    const route = createCultureRoute({ primaryPackId: "k-pop", samplerPackId: "k-drama" });

    expect(route).toHaveLength(14);
    expect(route.filter((slot) => slot.kind === "common")).toHaveLength(4);
    expect(route.filter((slot) => slot.kind === "primary")).toHaveLength(6);
    expect(route.filter((slot) => slot.kind === "sampler")).toHaveLength(2);
    expect(route.filter((slot) => slot.kind === "synthesis")).toHaveLength(2);
    expect(route.map((slot) => slot.slot)).toEqual(Array.from({ length: 14 }, (_, index) => index + 1));
    expect(route.map((slot) => slot.lessonId)).toEqual(POP_PRIMARY_DRAMA_SAMPLER_V1);
    expect(createCultureRoute({ primaryPackId: "k-pop", samplerPackId: "k-drama" })).toEqual(route);
  });

  it("never rewrites the published Pop/Drama v1 route", () => {
    expect(createCultureRoute({ primaryPackId: "k-pop", samplerPackId: "k-drama" }).map((slot) => slot.lessonId)).toEqual(
      POP_PRIMARY_DRAMA_SAMPLER_V1
    );
  });

  it("rejects identical primary and sampler packs", () => {
    expect(() => createCultureRoute({ primaryPackId: "k-pop", samplerPackId: "k-pop" })).toThrow(
      "Primary and sampler culture packs must differ"
    );
  });

  it("locks the route after the first pack-specific lesson starts", () => {
    const routeSlots = createCultureRoute({ primaryPackId: "k-pop", samplerPackId: "k-drama" });
    const progress: UserState["lessonProgress"] = {
      "k-culture-k-pop-1": {
        lessonId: "k-culture-k-pop-1",
        courseId: "k-culture",
        status: "in-progress",
        currentStepId: "situation",
        completedStepIds: [],
        metrics: {}
      }
    };

    expect(isCultureRouteLocked({ courseId: "k-culture", routeVersion: "k-culture-v1", routeSlots, completions: [] }, progress)).toBe(
      true
    );
  });

  it("updates route slots before lock and retains completions", () => {
    const enrollment: CourseEnrollment = {
      courseId: "k-culture",
      routeVersion: "k-culture-v1",
      completions: [
        {
          courseId: "k-culture",
          routeVersion: "k-culture-v0",
          completedAt: "2026-08-01T00:00:00.000Z",
          completedLessonIds: ["old"]
        }
      ]
    };
    const updated = updateCultureRouteSelection(
      enrollment,
      {},
      { primaryPackId: "k-drama", samplerPackId: "k-pop" },
      "2026-08-08T10:00:00.000Z"
    );

    expect(updated.routeSlots?.[1]).toMatchObject({
      kind: "primary",
      lessonId: "k-culture-k-drama-1",
      packId: "k-drama"
    });
    expect(updated.completions).toEqual(enrollment.completions);
    expect(updated.fieldUpdatedAt?.routeSlots).toBe("2026-08-08T10:00:00.000Z");
  });

  it("returns unchanged enrollment when the culture route is locked", () => {
    const enrollment: CourseEnrollment = {
      courseId: "k-culture",
      routeVersion: "k-culture-v1",
      routeLockedAt: "2026-08-08T10:00:00.000Z",
      routeSlots: createCultureRoute({ primaryPackId: "k-pop", samplerPackId: "k-drama" }),
      completions: []
    };

    expect(
      updateCultureRouteSelection(
        enrollment,
        {},
        { primaryPackId: "k-drama", samplerPackId: "k-pop" },
        "2026-08-08T11:00:00.000Z"
      )
    ).toBe(enrollment);
  });
});
