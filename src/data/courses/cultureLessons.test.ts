import { describe, expect, it } from "vitest";
import { countryPacks } from "../countryPacks";
import {
  CULTURE_ORIGINAL_CONTENT_NOTICE,
  cultureLessonIds,
  cultureLessons,
  getCultureLesson,
  getCulturePackLessons,
  getCulturePackLessonIds
} from "./cultureLessons";
import { courseRegistry } from "./courseRegistry";

const blockedKnownIpTerms =
  /BTS|Blackpink|Squid Game|Netflix|HYBE|SM Entertainment|Solo Leveling|True Beauty|Tower of God|Naver Webtoon|Kakao Webtoon/i;

describe("K-Culture lessons", () => {
  it("ships 30 original lessons for the expanded culture gate", () => {
    expect(cultureLessons).toHaveLength(30);
    expect(getCulturePackLessonIds("k-pop")).toHaveLength(6);
    expect(getCulturePackLessonIds("k-drama")).toHaveLength(6);
    expect(getCulturePackLessonIds("k-beauty")).toHaveLength(6);
    expect(getCulturePackLessonIds("k-webtoon")).toHaveLength(6);
    expect(courseRegistry["k-culture"].coreLessonIds).toEqual(cultureLessonIds);
  });

  it("provides six complete K-Beauty lessons", () => {
    expect(getCulturePackLessonIds("k-beauty")).toEqual(
      Array.from({ length: 6 }, (_, index) => `k-culture-k-beauty-${index + 1}`)
    );
    const serialized = JSON.stringify(getCulturePackLessons("k-beauty"));
    expect(serialized).not.toMatch(/cure|treats acne|guaranteed|dermatologist approved|Laneige|Innisfree|Olive Young/i);
    expect(serialized).toContain("Individual experiences differ");
  });

  it("provides six complete K-Webtoon lessons with only K-Speak scenes", () => {
    expect(getCulturePackLessonIds("k-webtoon")).toEqual(
      Array.from({ length: 6 }, (_, index) => `k-culture-k-webtoon-${index + 1}`)
    );
    const serialized = JSON.stringify(getCulturePackLessons("k-webtoon"));
    expect(serialized).not.toMatch(/Solo Leveling|True Beauty|Tower of God|Naver Webtoon|Kakao Webtoon/i);
    expect(serialized).toContain("K-Speak");
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
      "k-culture-k-beauty-1",
      "k-culture-k-webtoon-1",
      "k-culture-synthesis-1",
      "k-culture-synthesis-2"
    ]) {
      expect(getCultureLesson(lessonId)?.id).toBe(lessonId);
    }
  });
});
