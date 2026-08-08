import { describe, expect, it } from "vitest";
import { countryPacks } from "../countryPacks";
import {
  CULTURE_ORIGINAL_CONTENT_NOTICE,
  cultureLessonIds,
  cultureLessons,
  getCultureLesson,
  getCulturePackLessonIds
} from "./cultureLessons";
import { courseRegistry } from "./courseRegistry";

const blockedKnownIpTerms = /BTS|Blackpink|Squid Game|Netflix|HYBE|SM Entertainment/i;

describe("K-Culture lessons", () => {
  it("ships 18 original lessons for the first culture gate", () => {
    expect(cultureLessons).toHaveLength(18);
    expect(getCulturePackLessonIds("k-pop")).toHaveLength(6);
    expect(getCulturePackLessonIds("k-drama")).toHaveLength(6);
    expect(courseRegistry["k-culture"].coreLessonIds).toEqual(cultureLessonIds);
  });

  it.each(cultureLessons)("keeps $id complete and namespaced", (lesson) => {
    expect(lesson.id).toMatch(/^k-culture-/);
    expect(lesson.courseId).toBe("k-culture");
    expect(lesson.reviewCards).toHaveLength(3);
    expect(Object.keys(lesson.audioTargets)).toEqual(expect.arrayContaining(["core", "response", "rescue"]));
    expect(lesson.bridgeSkillIds?.length).toBeGreaterThanOrEqual(1);
    expect(Object.values(lesson.title).every(Boolean)).toBe(true);
    expect(Object.values(lesson.meaningByCountry).every(Boolean)).toBe(true);
  });

  it("covers every country pack for user-facing lesson text", () => {
    for (const lesson of cultureLessons) {
      for (const pack of countryPacks) {
        expect(lesson.title[pack.id]).toBeTruthy();
        expect(lesson.situation[pack.id]).toBeTruthy();
        expect(lesson.meaningByCountry[pack.id]).toBeTruthy();
        expect(lesson.countryNotes[pack.id]).toBeTruthy();
        expect(lesson.pronunciationByCountry[pack.id]).toBeTruthy();
      }
    }
  });

  it("contains the original-content notice and no blocked fixture terms", () => {
    expect(CULTURE_ORIGINAL_CONTENT_NOTICE.ko).toBe("실제 작품이 아닌 K-Speak 자체 제작 학습 장면입니다.");
    expect(JSON.stringify(cultureLessons)).not.toMatch(blockedKnownIpTerms);
    expect(JSON.stringify(cultureLessons)).not.toMatch(/TODO|TBD|lorem|https?:\/\//i);
  });

  it("keeps route engine lesson ids backed by inventory", () => {
    for (const lessonId of [
      "k-culture-common-1",
      "k-culture-k-pop-1",
      "k-culture-k-drama-1",
      "k-culture-synthesis-1",
      "k-culture-synthesis-2"
    ]) {
      expect(getCultureLesson(lessonId)?.id).toBe(lessonId);
    }
  });
});
