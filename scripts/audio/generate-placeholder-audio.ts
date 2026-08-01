import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { resolveAudioSlots } from "./audio-rules";

const enabled = process.env.AUDIO_GENERATION_ENABLED === "true";
const outputRoot = join(process.cwd(), "public", "audio", "placeholders");

const createSilentWav = () => {
  const sampleRate = 8000;
  const seconds = 0.15;
  const samples = Math.floor(sampleRate * seconds);
  const dataSize = samples * 2;
  const buffer = Buffer.alloc(44 + dataSize);
  buffer.write("RIFF", 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write("WAVEfmt ", 8);
  buffer.writeUInt32LE(16, 16);
  buffer.writeUInt16LE(1, 20);
  buffer.writeUInt16LE(1, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(sampleRate * 2, 28);
  buffer.writeUInt16LE(2, 32);
  buffer.writeUInt16LE(16, 34);
  buffer.write("data", 36);
  buffer.writeUInt32LE(dataSize, 40);
  return buffer;
};

if (!enabled) {
  console.log("AUDIO_GENERATION_ENABLED is not true. No placeholder files were written.");
  console.log(`Would inspect ${resolveAudioSlots().length} lesson/character slots.`);
  process.exit(0);
}

const wav = createSilentWav();
for (const slot of resolveAudioSlots()) {
  const filePath = join(outputRoot, slot.lessonId, slot.characterId, `${slot.sentenceId}.wav`);
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, wav);
}

console.log(`Placeholder audio files written under ${outputRoot}. Use for development only.`);
