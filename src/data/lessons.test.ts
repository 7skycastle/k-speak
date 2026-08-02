import { describe, expect, it } from "vitest";
import { countryPacks } from "./countryPacks";
import { continuationTracks, getContinuationTrack } from "./continuationProgram";
import { findAudioSlot } from "./audioCatalog";
import { lessons } from "./lessons";
import { tutorCharacters } from "./characters";

describe("lesson catalog", () => {
  it("contains reusable Day 1 through Day 30 lessons", () => {
    expect(lessons.map((lesson) => lesson.day)).toEqual(Array.from({ length: 30 }, (_, index) => index + 1));

    for (const lesson of lessons) {
      expect(lesson.steps.at(0)?.id).toBe("situation");
      expect(lesson.steps.at(-1)?.id).toBe("summary");
      expect(lesson.steps.length).toBeLessThanOrEqual(12);
      expect(lesson.steps.some((step) => step.kind === "listen")).toBe(true);
      expect(lesson.steps.some((step) => step.kind === "record")).toBe(true);
      expect(lesson.steps.some((step) => step.kind === "compare")).toBe(true);
      expect(lesson.steps.some((step) => step.kind === "dialogue")).toBe(true);
      expect(lesson.steps.some((step) => step.kind === "structure")).toBe(true);
      expect(lesson.dialogue.length).toBeGreaterThanOrEqual(3);
      expect(lesson.responsePhrase.korean).toBeTruthy();
      expect(lesson.rescuePhrase.korean).toBeTruthy();
      expect(lesson.structure.pattern).toBeTruthy();
      expect(lesson.swapSlots.length).toBeGreaterThanOrEqual(2);
      expect(lesson.sceneWords).toHaveLength(3);
      expect(lesson.reviewCards.map((card) => card.kind)).toEqual(["listen", "speak", "roleplay"]);
      expect(lesson.audioTargets.core.korean).toBe(lesson.korean);
      expect(lesson.audioTargets.response.korean).toBe(lesson.responsePhrase.korean);
      expect(lesson.audioTargets.rescue.korean).toBe(lesson.rescuePhrase.korean);
      expect(lesson.audioTargets.dialogue.korean).toContain(lesson.korean);
      expect(lesson.steps.filter((step) => step.saveTargetId).length).toBeGreaterThanOrEqual(3);
    }
  });

  it("has localized meanings for every country pack", () => {
    for (const lesson of lessons) {
      for (const pack of countryPacks) {
        expect(lesson.meaningByCountry[pack.id]).toBeTruthy();
      }
    }
  });

  it("contains first-pass English and Japanese explanation notes", () => {
    for (const lesson of lessons) {
      expect(lesson.countryNotes["us-en"]).toContain("rhythm");
      expect(lesson.countryNotes["jp-ja"]).toContain("助詞");
      expect(lesson.structure.explanationByCountry["us-en"]).toBeTruthy();
      expect(lesson.structure.explanationByCountry["jp-ja"]).toBeTruthy();
      expect(lesson.pronunciationByCountry["us-en"]).toContain("rhythm");
      expect(lesson.pronunciationByCountry["jp-ja"]).toContain("パッチム");
    }
  });

  it("contains expanded learning guidance for every country pack", () => {
    for (const pack of countryPacks) {
      expect(pack.learningGuide.focus).toBeTruthy();
      expect(pack.learningGuide.pronunciation).toBeTruthy();
      expect(pack.learningGuide.grammarBridge).toBeTruthy();
      expect(pack.learningGuide.reviewHabit).toBeTruthy();
      expect(pack.learningGuide.offlineTip).toBeTruthy();
    }
  });

  it("maps every learning goal to a Day 15 through Day 30 continuation program", () => {
    const expectedGoals = ["travel", "daily", "study", "work", "life", "k-content"];

    expect(continuationTracks.map((track) => track.id).sort()).toEqual(expectedGoals.sort());

    for (const goal of expectedGoals) {
      const track = getContinuationTrack(goal as (typeof continuationTracks)[number]["id"]);
      expect(track.title).toContain("Day 15-30");
      expect(track.modules).toHaveLength(3);
      expect(track.modules.every((module) => module.samplePhrases.length >= 3)).toBe(true);
    }
  });

  it("returns explicit TTS fallback audio metadata for every tutor and lesson", () => {
    for (const lesson of lessons) {
      for (const tutor of tutorCharacters) {
        const slot = findAudioSlot(lesson.id, tutor.id);
        expect(slot.lessonId).toBe(lesson.id);
        expect(slot.characterId).toBe(tutor.id);
        expect(slot.usesTtsFallback).toBe(true);
      }
    }
  });
});
