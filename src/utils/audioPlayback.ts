import type { AudioSlot } from "../types";
import { hasKoreanSpeechVoice, speakKorean } from "./speech";

export type AudioPlaybackMode = "natural" | "slow";
export type AudioPlaybackSource = "static-file" | "browser_speech_synthesis" | "unavailable";
export type AudioStatusKey =
  | "audio.status.staticOk"
  | "audio.status.ttsFallback"
  | "audio.status.noKoreanVoice"
  | "audio.status.unavailable";

export interface AudioPlaybackResult {
  ok: boolean;
  source: AudioPlaybackSource;
  usedFallback: boolean;
  hasKoreanVoice: boolean;
  messageKey: AudioStatusKey;
  errorCode?: string;
  url?: string;
}

const playStaticAudio = async (url: string) => {
  if (typeof Audio === "undefined") return false;
  try {
    const audio = new Audio(url);
    await audio.play();
    return true;
  } catch {
    return false;
  }
};

export const playLessonAudio = async (
  slot: AudioSlot,
  text: string,
  mode: AudioPlaybackMode
): Promise<AudioPlaybackResult> => {
  const staticUrl = mode === "slow" ? slot.slowUrl : slot.naturalUrl;
  const hasKoreanVoice = hasKoreanSpeechVoice();

  if (staticUrl && (await playStaticAudio(staticUrl))) {
    return {
      ok: true,
      source: "static-file",
      usedFallback: false,
      hasKoreanVoice,
      messageKey: "audio.status.staticOk",
      url: staticUrl
    };
  }

  const rate = mode === "slow" ? slot.fallback.rateSlow : slot.fallback.rateNatural;
  const spoken = speakKorean(text, rate);
  if (spoken) {
    return {
      ok: true,
      source: "browser_speech_synthesis",
      usedFallback: true,
      hasKoreanVoice,
      errorCode: staticUrl ? "static_audio_failed" : "static_audio_missing",
      messageKey: hasKoreanVoice ? "audio.status.ttsFallback" : "audio.status.noKoreanVoice"
    };
  }

  return {
    ok: false,
    source: "unavailable",
    usedFallback: true,
    hasKoreanVoice,
    errorCode: "browser_tts_unavailable",
    messageKey: "audio.status.unavailable"
  };
};
