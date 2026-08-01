import { existsSync } from "node:fs";
import { join } from "node:path";
import { audioCatalog, findAudioSlot } from "../../src/data/audioCatalog";
import { tutorCharacters } from "../../src/data/characters";
import { lessons } from "../../src/data/lessons";
import type { AudioProvider, AudioSlot, TutorCharacter } from "../../src/types";

const PAID_PROVIDER_PATTERNS = [
  "elevenlabs",
  "typecast",
  "openai",
  "azure",
  "google",
  "aws",
  "polly",
  "naver",
  "clova"
];

export interface AudioValidationOptions {
  env?: NodeJS.ProcessEnv;
  publicDir?: string;
}

export interface AudioValidationResult {
  slots: AudioSlot[];
  errors: string[];
  warnings: string[];
}

const isPaidProvider = (value: string | undefined) => {
  const normalized = (value ?? "").toLowerCase();
  return PAID_PROVIDER_PATTERNS.some((pattern) => normalized.includes(pattern));
};

const fileExistsForUrl = (publicDir: string, url: string) =>
  existsSync(join(publicDir, url.replace(/^\//, "")));

export const resolveAudioSlots = () =>
  lessons.flatMap((lesson) =>
    tutorCharacters.map((character) => findAudioSlot(lesson.id, character.id))
  );

export const hasPaidProvider = (provider: string | undefined) => isPaidProvider(provider);

export const validateAudioConfiguration = ({
  env = process.env,
  publicDir = join(process.cwd(), "public")
}: AudioValidationOptions = {}): AudioValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const slots = resolveAudioSlots();
  const allowPaidTts = env.ALLOW_PAID_TTS === "true";
  const requireStaticFiles = env.AUDIO_REQUIRE_STATIC_FILES === "true";
  const configuredProvider = env.AUDIO_PROVIDER ?? "browser_speech_synthesis";

  if (allowPaidTts) {
    errors.push("ALLOW_PAID_TTS=true is blocked for this project.");
  }

  if (isPaidProvider(configuredProvider)) {
    errors.push(`Paid TTS provider is not allowed: ${configuredProvider}`);
  }

  for (const character of tutorCharacters) {
    validateVoiceProfile(character, errors);
  }

  for (const slot of slots) {
    validateSlot(slot, errors);

    if (requireStaticFiles) {
      if (!slot.naturalUrl) errors.push(`Audio slot ${slot.id} missing naturalUrl while static files are required.`);
      if (!slot.slowUrl) errors.push(`Audio slot ${slot.id} missing slowUrl while static files are required.`);
    }

    for (const url of [slot.naturalUrl, slot.slowUrl, ...(slot.chunkUrls ?? [])].filter(Boolean) as string[]) {
      if (!fileExistsForUrl(publicDir, url)) {
        const message = `Missing static audio file for ${slot.id}: ${url}`;
        if (requireStaticFiles) errors.push(message);
        else warnings.push(`${message}. Browser TTS fallback is allowed.`);
      }
    }
  }

  const explicitSlots = new Set(audioCatalog.map((slot) => `${slot.lessonId}:${slot.characterId}`));
  const generatedFallbackCount = slots.filter((slot) => !explicitSlots.has(`${slot.lessonId}:${slot.characterId}`)).length;
  if (generatedFallbackCount > 0) {
    warnings.push(`${generatedFallbackCount} lesson/character audio slots use generated browser TTS fallback metadata.`);
  }

  return { slots, errors, warnings };
};

const validateVoiceProfile = (character: TutorCharacter, errors: string[]) => {
  const profile = character.voiceProfile;
  const required = ["provider", "sourceType", "voiceId", "licenseStatus", "commercialUse"] as const;
  for (const field of required) {
    if (!profile[field]) errors.push(`Character ${character.id} missing voiceProfile.${field}.`);
  }
  if (isPaidProvider(profile.provider) || isPaidProvider(profile.voiceId)) {
    errors.push(`Character ${character.id} uses a blocked paid TTS voice profile.`);
  }
};

const validateSlot = (slot: AudioSlot, errors: string[]) => {
  const required = [
    "provider",
    "sourceType",
    "voiceId",
    "version",
    "licenseStatus",
    "commercialUse",
    "generatedBy"
  ] as const;
  for (const field of required) {
    if (!slot[field]) errors.push(`Audio slot ${slot.id} missing ${field}.`);
  }

  if (isPaidProvider(slot.provider as AudioProvider) || isPaidProvider(slot.voiceId) || isPaidProvider(slot.generatedBy)) {
    errors.push(`Audio slot ${slot.id} references a blocked paid TTS provider.`);
  }

  if (!slot.fallback || slot.fallback.type !== "browser_speech_synthesis") {
    errors.push(`Audio slot ${slot.id} must define browser speech synthesis fallback.`);
  }
};
