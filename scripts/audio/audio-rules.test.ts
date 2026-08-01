import { describe, expect, it } from "vitest";
import { hasPaidProvider, validateAudioConfiguration } from "./audio-rules";

describe("audio validation rules", () => {
  it("blocks paid TTS providers", () => {
    expect(hasPaidProvider("ElevenLabs")).toBe(true);
    expect(hasPaidProvider("browser_speech_synthesis")).toBe(false);

    const result = validateAudioConfiguration({
      env: {
        ALLOW_PAID_TTS: "false",
        AUDIO_PROVIDER: "openai"
      }
    });

    expect(result.errors).toContain("Paid TTS provider is not allowed: openai");
  });

  it("fails when paid TTS is explicitly allowed", () => {
    const result = validateAudioConfiguration({
      env: {
        ALLOW_PAID_TTS: "true",
        AUDIO_PROVIDER: "browser_speech_synthesis"
      }
    });

    expect(result.errors).toContain("ALLOW_PAID_TTS=true is blocked for this project.");
  });

  it("passes default free fallback configuration", () => {
    const result = validateAudioConfiguration({
      env: {
        ALLOW_PAID_TTS: "false",
        AUDIO_PROVIDER: "browser_speech_synthesis",
        AUDIO_REQUIRE_STATIC_FILES: "false"
      }
    });

    expect(result.errors).toEqual([]);
    expect(result.slots.length).toBeGreaterThan(0);
  });

  it("fails when static files are required but URLs are not configured", () => {
    const result = validateAudioConfiguration({
      env: {
        ALLOW_PAID_TTS: "false",
        AUDIO_PROVIDER: "browser_speech_synthesis",
        AUDIO_REQUIRE_STATIC_FILES: "true"
      }
    });

    expect(result.errors.some((error) => error.includes("missing naturalUrl"))).toBe(true);
    expect(result.errors.some((error) => error.includes("missing slowUrl"))).toBe(true);
  });
});
