import type { AudioSlot } from "../types";

export const audioCatalog: AudioSlot[] = [
  {
    id: "day-1-hello-haneul",
    characterId: "haneul",
    lessonId: "day-1",
    sentenceId: "hello-nice-meet-you",
    version: "slot-v1",
    rights: "Recorded Korean voice file is not attached yet. Use only licensed voice assets.",
    replacementNote: "Place natural and slow MP3 files in public/audio/day-1/haneul/ and update this slot.",
    usesTtsFallback: true
  },
  {
    id: "day-1-hello-jun",
    characterId: "jun",
    lessonId: "day-1",
    sentenceId: "hello-nice-meet-you",
    version: "slot-v1",
    rights: "Recorded Korean voice file is not attached yet. Use only licensed voice assets.",
    replacementNote: "Place natural and slow MP3 files in public/audio/day-1/jun/ and update this slot.",
    usesTtsFallback: true
  },
  {
    id: "day-1-hello-mina",
    characterId: "mina",
    lessonId: "day-1",
    sentenceId: "hello-nice-meet-you",
    version: "slot-v1",
    rights: "Recorded Korean voice file is not attached yet. Use only licensed voice assets.",
    replacementNote: "Place natural and slow MP3 files in public/audio/day-1/mina/ and update this slot.",
    usesTtsFallback: true
  },
  {
    id: "day-1-hello-taeho",
    characterId: "taeho",
    lessonId: "day-1",
    sentenceId: "hello-nice-meet-you",
    version: "slot-v1",
    rights: "Recorded Korean voice file is not attached yet. Use only licensed voice assets.",
    replacementNote: "Place natural and slow MP3 files in public/audio/day-1/taeho/ and update this slot.",
    usesTtsFallback: true
  }
];

export const findAudioSlot = (lessonId: string, characterId: string) =>
  audioCatalog.find((slot) => slot.lessonId === lessonId && slot.characterId === characterId);
