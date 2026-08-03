import { describe, expect, it } from "vitest";
import { audioCatalog, findAudioSlot } from "./audioCatalog";
import { tutorCharacters } from "./characters";
import { lessons } from "./lessons";

const paidProviderPattern = /elevenlabs|typecast|openai|azure|google|aws|polly|naver|clova/i;

describe("audio catalog", () => {
  it("defines required free TTS metadata for explicit audio slots", () => {
    expect(audioCatalog).toHaveLength(120);

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

  it("returns sentence-level fallback slots for dialogue, rescue, and swap targets", () => {
    const dialogue = findAudioSlot("day-2", "haneul", "dialogue");
    const rescue = findAudioSlot("day-2", "haneul", "rescue");
    const swap = findAudioSlot("day-2", "haneul", "swap-1");

    expect(dialogue.sentenceId).toBe("dialogue");
    expect(rescue.sentenceId).toBe("rescue");
    expect(swap.sentenceId).toBe("swap-1");
    expect(dialogue.usesTtsFallback).toBe(true);
  });

  it("links all tutor characters to free browser voice profiles", () => {
    for (const character of tutorCharacters) {
      expect(character.voiceProfile.provider).toBe("browser_speech_synthesis");
      expect(character.voiceProfile.licenseStatus).toBe("browser_runtime");
      expect(character.voiceProfile.voiceId).not.toMatch(paidProviderPattern);
    }
  });
});
