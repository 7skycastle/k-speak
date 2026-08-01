import { describe, expect, it } from "vitest";
import { audioCatalog, findAudioSlot } from "./audioCatalog";
import { tutorCharacters } from "./characters";
import { lessons } from "./lessons";

const paidProviderPattern = /elevenlabs|typecast|openai|azure|google|aws|polly|naver|clova/i;

describe("audio catalog", () => {
  it("defines required free TTS metadata for explicit audio slots", () => {
    expect(audioCatalog).toHaveLength(4);

    for (const slot of audioCatalog) {
      expect(slot.provider).toBe("browser_speech_synthesis");
      expect(slot.sourceType).toBe("browser_speech_synthesis");
      expect(slot.voiceId).toBeTruthy();
      expect(slot.version).toBeTruthy();
      expect(slot.licenseStatus).toBe("browser_runtime");
      expect(slot.commercialUse).toBe("browser_runtime");
      expect(slot.fallback.type).toBe("browser_speech_synthesis");
      expect(`${slot.provider} ${slot.voiceId} ${slot.generatedBy}`).not.toMatch(paidProviderPattern);
    }
  });

  it("provides fallback metadata for every lesson and character", () => {
    for (const lesson of lessons) {
      for (const character of tutorCharacters) {
        const slot = findAudioSlot(lesson.id, character.id);
        expect(slot.lessonId).toBe(lesson.id);
        expect(slot.characterId).toBe(character.id);
        expect(slot.usesTtsFallback).toBe(true);
        expect(slot.rateNatural).toBeGreaterThan(slot.rateSlow);
      }
    }
  });

  it("links all tutor characters to free browser voice profiles", () => {
    for (const character of tutorCharacters) {
      expect(character.voiceProfile.provider).toBe("browser_speech_synthesis");
      expect(character.voiceProfile.licenseStatus).toBe("browser_runtime");
      expect(character.voiceProfile.voiceId).not.toMatch(paidProviderPattern);
    }
  });
});
