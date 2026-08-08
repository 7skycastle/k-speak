import { describe, expect, it } from "vitest";
import { findAudioSlot } from "../audioCatalog";
import { CULTURE_ORIGINAL_CONTENT_NOTICE, cultureLessons } from "./cultureLessons";

const BLOCKED_KNOWN_IP_TERMS =
  /BTS|Blackpink|Squid Game|Netflix|HYBE|SM Entertainment|Laneige|Innisfree|Olive Young|Solo Leveling|True Beauty|Tower of God|Naver Webtoon|Kakao Webtoon/i;
const TEMPORARY_COPY = /TODO|TBD|lorem|https?:\/\//i;

describe("K-Culture content policy", () => {
  it("keeps culture lessons original and free of blocked fixture terms", () => {
    const serialized = JSON.stringify(cultureLessons);

    expect(CULTURE_ORIGINAL_CONTENT_NOTICE.ko).toBeTruthy();
    expect(CULTURE_ORIGINAL_CONTENT_NOTICE.en).toContain("K-Speak original");
    expect(serialized).not.toMatch(BLOCKED_KNOWN_IP_TERMS);
    expect(serialized).not.toMatch(TEMPORARY_COPY);
  });

  it("has playable normal and slow behavior for every culture target", () => {
    for (const lesson of cultureLessons) {
      for (const targetId of ["core", "response", "rescue"] as const) {
        const slot = findAudioSlot(lesson.id, "haneul", targetId);
        expect(slot?.naturalUrl || slot?.fallback.type === "browser_speech_synthesis").toBeTruthy();
        expect(slot?.slowUrl || slot?.fallback.type === "browser_speech_synthesis").toBeTruthy();
      }
    }
  });
});
