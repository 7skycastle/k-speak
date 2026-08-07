import { describe, expect, it } from "vitest";
import { audioCatalog, createStaticAudioSlot, findAudioSlot, resolveStaticAudioUrl } from "./audioCatalog";
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

  it("uses wav paths for static audio targets so generated local files match runtime lookup", () => {
    expect(resolveStaticAudioUrl("day-1", "haneul", "hello-nice-meet-you", "natural")).toBe(
      "/audio/day-1/haneul/hello-nice-meet-you-natural.wav"
    );
    expect(resolveStaticAudioUrl("day-1", "haneul", "hello-nice-meet-you", "slow")).toBe(
      "/audio/day-1/haneul/hello-nice-meet-you-slow.wav"
    );
  });

  it("can build a production-ready static slot while keeping browser fallback available", () => {
    const slot = createStaticAudioSlot("day-1", "haneul", "core", {
      provider: "local_tts",
      sourceType: "free_tts",
      voiceId: "melotts-kr",
      version: "melotts-day1-v1",
      rights: "MIT audition model approved for production import after listening review.",
      licenseStatus: "open_source_license_confirmed",
      commercialUse: "allowed",
      generatedBy: "melotts-korean"
    });

    expect(slot.naturalUrl).toBe("/audio/day-1/haneul/core-natural.wav");
    expect(slot.slowUrl).toBe("/audio/day-1/haneul/core-slow.wav");
    expect(slot.usesTtsFallback).toBe(true);
    expect(slot.fallback.type).toBe("browser_speech_synthesis");
    expect(slot.provider).toBe("local_tts");
    expect(slot.licenseStatus).toBe("open_source_license_confirmed");
  });

  it("links all tutor characters to free browser voice profiles", () => {
    for (const character of tutorCharacters) {
      expect(character.voiceProfile.provider).toBe("browser_speech_synthesis");
      expect(character.voiceProfile.licenseStatus).toBe("browser_runtime");
      expect(character.voiceProfile.voiceId).not.toMatch(paidProviderPattern);
    }
  });
});
