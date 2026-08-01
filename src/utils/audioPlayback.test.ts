import { describe, expect, it, vi, beforeEach, afterEach } from "vitest";
import type { AudioSlot } from "../types";

const speechMock = vi.hoisted(() => ({
  hasKoreanSpeechVoice: vi.fn(),
  speakKorean: vi.fn()
}));

vi.mock("./speech", () => speechMock);

import { playLessonAudio } from "./audioPlayback";

const slot: AudioSlot = {
  id: "day-1-hello-haneul",
  characterId: "haneul",
  lessonId: "day-1",
  sentenceId: "hello-nice-meet-you",
  naturalUrl: "/audio/day-1/haneul/natural.mp3",
  slowUrl: "/audio/day-1/haneul/slow.mp3",
  version: "free-browser-tts-v1",
  rights: "Free static audio or browser runtime TTS only.",
  replacementNote: "Replace with licensed static free audio when available.",
  usesTtsFallback: true,
  sourceType: "browser_speech_synthesis",
  provider: "browser_speech_synthesis",
  voiceId: "ko-KR-browser-haneul",
  licenseStatus: "browser_runtime",
  commercialUse: "browser_runtime",
  generatedBy: "browser_speech_synthesis",
  replaceBeforeProduction: false,
  rateNatural: 1,
  rateSlow: 0.72,
  fallback: {
    type: "browser_speech_synthesis",
    lang: "ko-KR",
    rateNatural: 1,
    rateSlow: 0.72
  }
};

describe("playLessonAudio", () => {
  beforeEach(() => {
    speechMock.hasKoreanSpeechVoice.mockReturnValue(true);
    speechMock.speakKorean.mockReturnValue(true);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it("prefers static free audio when the file plays", async () => {
    const play = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal(
      "Audio",
      class {
        constructor(public src: string) {}
        play = play;
      }
    );

    const result = await playLessonAudio(slot, "안녕하세요.", "natural");

    expect(result.source).toBe("static-file");
    expect(result.usedFallback).toBe(false);
    expect(result.url).toBe(slot.naturalUrl);
    expect(speechMock.speakKorean).not.toHaveBeenCalled();
  });

  it("falls back to browser speech synthesis when static audio fails", async () => {
    const play = vi.fn().mockRejectedValue(new Error("blocked"));
    vi.stubGlobal(
      "Audio",
      class {
        constructor(public src: string) {}
        play = play;
      }
    );

    const result = await playLessonAudio(slot, "안녕하세요.", "slow");

    expect(result.ok).toBe(true);
    expect(result.source).toBe("browser_speech_synthesis");
    expect(result.usedFallback).toBe(true);
    expect(result.errorCode).toBe("static_audio_failed");
    expect(speechMock.speakKorean).toHaveBeenCalledWith("안녕하세요.", 0.72);
  });

  it("still returns a completable playback result when no Korean TTS voice is installed", async () => {
    speechMock.hasKoreanSpeechVoice.mockReturnValue(false);
    speechMock.speakKorean.mockReturnValue(true);

    const result = await playLessonAudio({ ...slot, naturalUrl: undefined }, "안녕하세요.", "natural");

    expect(result.ok).toBe(true);
    expect(result.hasKoreanVoice).toBe(false);
    expect(result.source).toBe("browser_speech_synthesis");
    expect(result.message).toContain("계속 진행");
  });
});
