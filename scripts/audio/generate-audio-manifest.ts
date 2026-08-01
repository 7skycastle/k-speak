import { resolveAudioSlots, validateAudioConfiguration } from "./audio-rules";

const validation = validateAudioConfiguration();
if (validation.errors.length > 0) {
  for (const error of validation.errors) {
    console.error(`ERROR ${error}`);
  }
  process.exit(1);
}

const manifest = {
  generatedAt: new Date().toISOString(),
  policy: {
    allowPaidTts: false,
    defaultProvider: process.env.AUDIO_PROVIDER ?? "browser_speech_synthesis",
    staticFilesRequired: process.env.AUDIO_REQUIRE_STATIC_FILES === "true"
  },
  warnings: validation.warnings,
  slots: resolveAudioSlots().map((slot) => ({
    id: slot.id,
    lessonId: slot.lessonId,
    characterId: slot.characterId,
    sentenceId: slot.sentenceId,
    provider: slot.provider,
    sourceType: slot.sourceType,
    voiceId: slot.voiceId,
    version: slot.version,
    licenseStatus: slot.licenseStatus,
    commercialUse: slot.commercialUse,
    naturalUrl: slot.naturalUrl ?? null,
    slowUrl: slot.slowUrl ?? null,
    fallback: slot.fallback
  }))
};

console.log(JSON.stringify(manifest, null, 2));
