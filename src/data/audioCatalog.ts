import type { AudioSlot } from "../types";

const browserFallback = {
  type: "browser_speech_synthesis" as const,
  lang: "ko-KR" as const,
  rateNatural: 1,
  rateSlow: 0.72
};

const createBrowserTtsSlot = (
  lessonId: string,
  characterId: AudioSlot["characterId"],
  sentenceId: string,
  note: string
): AudioSlot => ({
  id: `${lessonId}-${sentenceId}-${characterId}`,
  characterId,
  lessonId,
  sentenceId,
  version: "free-browser-tts-v1",
  rights: "No paid TTS provider is configured. Browser speech synthesis is used at runtime when static free audio is missing.",
  replacementNote: note,
  usesTtsFallback: true,
  sourceType: "browser_speech_synthesis",
  provider: "browser_speech_synthesis",
  voiceId: `ko-KR-browser-${characterId}`,
  licenseStatus: "browser_runtime",
  commercialUse: "browser_runtime",
  generatedBy: "browser_speech_synthesis",
  replaceBeforeProduction: false,
  rateNatural: 1,
  rateSlow: 0.72,
  fallback: browserFallback
});

export const audioCatalog: AudioSlot[] = [
  createBrowserTtsSlot(
    "day-1",
    "haneul",
    "hello-nice-meet-you",
    "Optional: place free/static natural and slow files in public/audio/day-1/haneul/ and update naturalUrl/slowUrl."
  ),
  createBrowserTtsSlot(
    "day-1",
    "jun",
    "hello-nice-meet-you",
    "Optional: place free/static natural and slow files in public/audio/day-1/jun/ and update naturalUrl/slowUrl."
  ),
  createBrowserTtsSlot(
    "day-1",
    "mina",
    "hello-nice-meet-you",
    "Optional: place free/static natural and slow files in public/audio/day-1/mina/ and update naturalUrl/slowUrl."
  ),
  createBrowserTtsSlot(
    "day-1",
    "taeho",
    "hello-nice-meet-you",
    "Optional: place free/static natural and slow files in public/audio/day-1/taeho/ and update naturalUrl/slowUrl."
  )
];

export const findAudioSlot = (lessonId: string, characterId: string) =>
  audioCatalog.find((slot) => slot.lessonId === lessonId && slot.characterId === characterId) ??
  createBrowserTtsSlot(
    lessonId,
    characterId as AudioSlot["characterId"],
    "lesson-phrase",
    `Optional: add free/static natural and slow files for ${lessonId}/${characterId}, then update this generated fallback slot.`
  );
