import type { VoiceProfile } from "../../../src/types";

export const browserSpeechSynthesisProvider = {
  id: "browser_speech_synthesis",
  label: "Browser Speech Synthesis",
  sourceType: "browser_speech_synthesis",
  licenseStatus: "browser_runtime",
  commercialUse: "browser_runtime",
  lang: "ko-KR",
  rateNatural: 1,
  rateSlow: 0.72
} as const;

export const createBrowserVoiceProfile = (
  voiceId: string,
  displayName: string
): VoiceProfile => ({
  provider: "browser_speech_synthesis",
  sourceType: "browser_speech_synthesis",
  voiceId,
  displayName,
  licenseStatus: "browser_runtime",
  commercialUse: "browser_runtime",
  rateNatural: browserSpeechSynthesisProvider.rateNatural,
  rateSlow: browserSpeechSynthesisProvider.rateSlow
});
