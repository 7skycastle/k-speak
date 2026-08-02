import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { tutorCharacters } from "../../src/data/characters";
import { lessons } from "../../src/data/lessons";

const root = process.cwd();
const sentencesPath = join(root, "tools", "tts", "sentences.json");
const characterIds = tutorCharacters.map((character) => character.id);

const existing = JSON.parse(readFileSync(sentencesPath, "utf8")) as {
  version?: string;
  sentences?: Array<Record<string, unknown>>;
};

const targetPhraseId = (lessonPhraseId: string, targetId: string) => (targetId === "core" ? lessonPhraseId : targetId);

const sentenceId = (lessonId: string, lessonPhraseId: string, targetId: string) =>
  `${lessonId}.${targetId === "core" ? lessonPhraseId : targetId}`;

const targetTags = (targetId: string) => {
  if (targetId === "dialogue") return ["day-content", "dialogue", "continuous-listening"];
  if (targetId === "response") return ["day-content", "response", "roleplay"];
  if (targetId === "rescue") return ["day-content", "rescue-phrase", "saved-phrase"];
  if (targetId.startsWith("swap")) return ["day-content", "substitution", "saved-phrase"];
  return ["day-content", "core-phrase", "saved-phrase"];
};

const daySentences = lessons.flatMap((lesson) =>
  Object.entries(lesson.audioTargets).map(([targetId, target]) => ({
    sentenceId: sentenceId(lesson.id, lesson.phraseId, targetId),
    lessonId: lesson.id,
    phraseId: targetPhraseId(lesson.phraseId, targetId),
    audioTargetId: targetId,
    koreanText: target.korean,
    romanization: target.romanization ?? "",
    auditionTags: targetTags(targetId),
    licenseUse: "pending_review_audition_only",
    speeds: ["natural", "slow"],
    characterIds,
    reviewStatus: "ready_for_audition"
  }))
);

const auditionSentences = (existing.sentences ?? []).filter((sentence) => sentence.lessonId === "audition");
const payload = {
  version: new Date().toISOString().slice(0, 10),
  generatedFrom: "src/data/lessons.ts audioTargets",
  sentenceCount: daySentences.length + auditionSentences.length,
  daySentenceCount: daySentences.length,
  auditionSentenceCount: auditionSentences.length,
  sentences: [...daySentences, ...auditionSentences]
};

writeFileSync(sentencesPath, JSON.stringify(payload, null, 2) + "\n", "utf8");
console.log(`Wrote ${sentencesPath} with ${payload.sentenceCount} sentence targets.`);
