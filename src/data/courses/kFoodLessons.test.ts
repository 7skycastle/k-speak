import { describe, expect, it } from "vitest";
import { countryPacks } from "../countryPacks";
import { courseRegistry } from "./courseRegistry";
import { getKFoodLesson, kFoodLessonIds, kFoodLessons } from "./kFoodLessons";

describe("K-Food lessons", () => {
  it("contains one complete 14-day route", () => {
    expect(kFoodLessons).toHaveLength(14);
    expect(kFoodLessonIds).toEqual(Array.from({ length: 14 }, (_, index) => `k-food-day-${index + 1}`));
    expect(courseRegistry["k-food"].coreLessonIds).toEqual(kFoodLessonIds);
  });

  it.each(kFoodLessons)("keeps $id complete and course scoped", (lesson) => {
    expect(lesson.courseId).toBe("k-food");
    expect(lesson.reviewCards).toHaveLength(3);
    expect(Object.keys(lesson.audioTargets)).toEqual(expect.arrayContaining(["core", "response", "rescue"]));
    expect(lesson.steps.map((step) => step.kind)).toEqual([
      "situation",
      "dialogue",
      "phrase",
      "listen",
      "repeat",
      "record",
      "quiz",
      "roleplay",
      "summary"
    ]);
    expect(Object.values(lesson.title).every(Boolean)).toBe(true);
    expect(Object.values(lesson.meaningByCountry).every(Boolean)).toBe(true);
    expect(lesson.bridgeSkillIds?.length).toBeGreaterThanOrEqual(1);
    expect(lesson.bridgeSkillIds?.length).toBeLessThanOrEqual(3);
  });

  it("covers every country pack for user-facing lesson text", () => {
    for (const lesson of kFoodLessons) {
      for (const pack of countryPacks) {
        expect(lesson.title[pack.id]).toBeTruthy();
        expect(lesson.situation[pack.id]).toBeTruthy();
        expect(lesson.meaningByCountry[pack.id]).toBeTruthy();
        expect(lesson.countryNotes[pack.id]).toBeTruthy();
        expect(lesson.pronunciationByCountry[pack.id]).toBeTruthy();
      }
    }
  });

  it("adds only non-scored mission checks to Day 14", () => {
    expect(getKFoodLesson("k-food-day-14")?.kFoodMissionChecks?.map((check) => check.id)).toEqual([
      "choose-food",
      "short-order",
      "resolve-problem"
    ]);
    expect(JSON.stringify(getKFoodLesson("k-food-day-14")?.kFoodMissionChecks)).not.toMatch(/%|accuracy|score/i);
  });
});
