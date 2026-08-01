import { describe, expect, it } from "vitest";
import { countryPacks } from "./countryPacks";
import { findAudioSlot } from "./audioCatalog";
import { lessons } from "./lessons";
import { tutorCharacters } from "./characters";

describe("lesson catalog", () => {
  it("contains reusable Day 1 through Day 14 lessons", () => {
    expect(lessons.map((lesson) => lesson.day)).toEqual(Array.from({ length: 14 }, (_, index) => index + 1));

    for (const lesson of lessons) {
      expect(lesson.steps.at(0)?.id).toBe("situation");
      expect(lesson.steps.at(-1)?.id).toBe("summary");
      expect(lesson.steps.some((step) => step.kind === "listen")).toBe(true);
      expect(lesson.steps.some((step) => step.kind === "record")).toBe(true);
      expect(lesson.steps.some((step) => step.kind === "compare")).toBe(true);
    }
  });

  it("has localized meanings for every country pack", () => {
    for (const lesson of lessons) {
      for (const pack of countryPacks) {
        expect(lesson.meaningByCountry[pack.id]).toBeTruthy();
      }
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
