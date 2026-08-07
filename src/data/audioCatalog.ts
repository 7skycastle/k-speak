import type { AudioSlot } from "../types";

const browserFallback = {
  type: "browser_speech_synthesis" as const,
  lang: "ko-KR" as const,
  rateNatural: 1,
  rateSlow: 0.72
};

const CHARACTERS = ["haneul", "jun", "mina", "taeho"] as const;
const LESSON_COUNT = 30;
const STATIC_AUDIO_EXTENSION = "wav";

const buildAudioSlot = (
  lessonId: string,
  characterId: AudioSlot["characterId"],
  sentenceId: string,
  overrides: Partial<AudioSlot> = {}
): AudioSlot => ({
  id: `${lessonId}-${sentenceId}-${characterId}`,
  characterId,
  lessonId,
  sentenceId,
  version: "free-browser-tts-v1",
  rights:
    "No paid TTS provider is configured. Browser speech synthesis is used at runtime when static free audio is missing.",
  replacementNote: `Place free/static audio in public/audio/${lessonId}/${characterId}/${sentenceId}-{natural|slow}.${STATIC_AUDIO_EXTENSION} and add naturalUrl/slowUrl to this slot.`,
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
  fallback: browserFallback,
  ...overrides
});

export const resolveStaticAudioUrl = (
  lessonId: string,
  characterId: string,
  sentenceId: string,
  mode: "natural" | "slow"
): string => `/audio/${lessonId}/${characterId}/${sentenceId}-${mode}.${STATIC_AUDIO_EXTENSION}`;

const createBrowserTtsSlot = (
  lessonId: string,
  characterId: AudioSlot["characterId"],
  sentenceId: string
): AudioSlot => buildAudioSlot(lessonId, characterId, sentenceId);

export const createStaticAudioSlot = (
  lessonId: string,
  characterId: AudioSlot["characterId"],
  sentenceId: string,
  overrides: Partial<AudioSlot> & Pick<AudioSlot, "provider" | "sourceType" | "voiceId" | "licenseStatus" | "commercialUse" | "generatedBy" | "version" | "rights">
): AudioSlot =>
  buildAudioSlot(lessonId, characterId, sentenceId, {
    naturalUrl: resolveStaticAudioUrl(lessonId, characterId, sentenceId, "natural"),
    slowUrl: resolveStaticAudioUrl(lessonId, characterId, sentenceId, "slow"),
    ...overrides
  });

// C1: All 30 lessons × 4 characters = 120 explicit slots (browser TTS until static audio is added)
export const audioCatalog: AudioSlot[] = Array.from({ length: LESSON_COUNT }, (_, i) => {
  const lessonId = `day-${i + 1}`;
  return CHARACTERS.map((char) => createBrowserTtsSlot(lessonId, char, "core"));
}).flat();

// C2: Standard URL pattern for static audio files.
// When real audio is available, place files at:
//   public/audio/<lessonId>/<characterId>/<sentenceId>-natural.wav
//   public/audio/<lessonId>/<characterId>/<sentenceId>-slow.wav
// Then add naturalUrl / slowUrl to the matching slot in audioCatalog.

export const findAudioSlot = (lessonId: string, characterId: string, sentenceId = "core") =>
  audioCatalog.find(
    (slot) =>
      slot.lessonId === lessonId &&
      slot.characterId === characterId &&
      slot.sentenceId === sentenceId
  ) ??
  createBrowserTtsSlot(lessonId, characterId as AudioSlot["characterId"], sentenceId);
