import { describe, expect, it } from "vitest";
import { countryPacks } from "../countryPacks";
import { courseRegistry } from "./courseRegistry";
import { travelLessonIds, travelLessons } from "./travelLessons";

describe("travel lessons", () => {
  it("defines exactly 14 namespaced lessons in registry order", () => {
    expect(travelLessons).toHaveLength(14);
    expect(travelLessonIds).toEqual(Array.from({ length: 14 }, (_, index) => `travel-day-${index + 1}`));
    expect(courseRegistry.travel.coreLessonIds).toEqual(travelLessonIds);
  });

  it("covers every country pack for user-facing lesson text", () => {
    for (const lesson of travelLessons) {
      for (const pack of countryPacks) {
        expect(lesson.title[pack.id]).toBeTruthy();
        expect(lesson.situation[pack.id]).toBeTruthy();
        expect(lesson.meaningByCountry[pack.id]).toBeTruthy();
        expect(lesson.countryNotes[pack.id]).toBeTruthy();
        expect(lesson.pronunciationByCountry[pack.id]).toBeTruthy();
      }
    }
  });

  it("keeps Day 14 mission checks separate from completion", () => {
    const day14 = travelLessons[13];
    expect(day14.id).toBe("travel-day-14");
    expect(day14.travelMissionChecks?.map((check) => check.id)).toEqual([
      "first-sentence",
      "short-response",
      "rescue-expression"
    ]);
    expect(day14.travelMissionChecks?.every((check) => check.successLabelByCountry["us-en"] === "You did it")).toBe(
      true
    );
    expect(JSON.stringify(day14.travelMissionChecks)).not.toMatch(/%|percent|accuracy/i);
  });

  it("has review cards and audio targets for every lesson", () => {
    for (const lesson of travelLessons) {
      expect(lesson.reviewCards).toHaveLength(3);
      expect(Object.keys(lesson.audioTargets)).toEqual(expect.arrayContaining(["core", "response", "rescue"]));
      expect(lesson.steps.some((step) => step.kind === "summary")).toBe(true);
      expect(lesson.courseId).toBe("travel");
      expect(lesson.bridgeSkillIds?.length).toBeGreaterThanOrEqual(1);
      expect(lesson.bridgeSkillIds?.length).toBeLessThanOrEqual(3);
    }
  });
});
