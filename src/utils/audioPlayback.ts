import type { AudioSlot } from "../types";
import { hasKoreanSpeechVoice, speakKorean } from "./speech";

export type AudioPlaybackMode = "natural" | "slow";
export type AudioPlaybackSource = "static-file" | "browser_speech_synthesis" | "unavailable";

export interface AudioPlaybackResult {
  ok: boolean;
  source: AudioPlaybackSource;
  usedFallback: boolean;
  hasKoreanVoice: boolean;
  message: string;
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
      message: "저장된 무료 음원을 재생하고 있어요.",
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
      message: hasKoreanVoice
        ? "저장된 무료 음원이 없어 브라우저 TTS로 재생하고 있어요."
        : "기기에 한국어 TTS 음성이 없어도 수업은 계속 진행할 수 있어요."
    };
  }

  return {
    ok: false,
    source: "unavailable",
    usedFallback: true,
    hasKoreanVoice,
    errorCode: "browser_tts_unavailable",
    message: "이 브라우저에서는 음성 재생을 사용할 수 없습니다. 다음 단계로 계속 진행할 수 있어요."
  };
};
