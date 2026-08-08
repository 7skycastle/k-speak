import {
  kFoodCourseCopy,
  kFoodLessonSources,
  localized,
  phrase,
  type KFoodLessonSource
} from "../../i18n/kFoodCourse";
import type { KFoodMissionCheck, Lesson } from "../../types";

const kFoodMissionChecks = (): KFoodMissionCheck[] => [
  { id: "choose-food" },
  { id: "short-order" },
  { id: "resolve-problem" }
];

const makeKFoodLesson = (source: KFoodLessonSource, index: number): Lesson => {
  const core = phrase(source.korean, source.romanization, source.meaning);
  const { response, rescue, review, steps } = kFoodCourseCopy;

  return {
    id: source.id,
    courseId: "k-food",
    day: index + 1,
    title: localized(source.title),
    situation: localized(`K-Food scene: ${source.scene}`),
    phraseId: `${source.id}:core`,
    korean: source.korean,
    romanization: source.romanization,
    meaningByCountry: localized(source.meaning),
    dialogue: [
      { speaker: "Learner", speakerRole: "learner", ...core },
      { speaker: "Staff", speakerRole: "staff", ...response }
    ],
    responsePhrase: response,
    rescuePhrase: rescue,
    structure: {
      pattern: kFoodCourseCopy.structurePattern,
      explanationByCountry: kFoodCourseCopy.structureExplanation
    },
    swapSlots: kFoodCourseCopy.swapSlots,
    sceneWords: kFoodCourseCopy.sceneWords,
    roleplay: {
      prompt: core,
      expected: core,
      fallback: rescue
    },
    reviewCards: [
      {
        id: "listen",
        kind: "listen",
        promptByCountry: review.listenPrompt,
        phrase: core,
        reasonByCountry: review.listenReason
      },
      {
        id: "speak",
        kind: "speak",
        promptByCountry: review.speakPrompt,
        phrase: core,
        reasonByCountry: review.speakReason
      },
      {
        id: "roleplay",
        kind: "roleplay",
        promptByCountry: review.roleplayPrompt,
        phrase: core,
        reasonByCountry: review.roleplayReason
      }
    ],
    bridgeSkillIds: source.bridgeSkillIds,
    kFoodMissionChecks: source.id === "k-food-day-14" ? kFoodMissionChecks() : undefined,
    countryNotes: kFoodCourseCopy.countryNotes,
    pronunciationByCountry: kFoodCourseCopy.pronunciation,
    audioTargets: {
      core,
      response,
      rescue
    },
    steps: [
      { id: "situation", kind: "situation", title: steps.situationTitle, body: `K-Food scene: ${source.scene}` },
      {
        id: "dialogue",
        kind: "dialogue",
        title: steps.dialogueTitle,
        body: steps.dialogueBody,
        audioTargetId: "core"
      },
      {
        id: "phrase",
        kind: "phrase",
        title: steps.phraseTitle,
        body: source.meaning,
        korean: source.korean,
        romanization: source.romanization,
        audioTargetId: "core",
        saveTargetId: "core"
      },
      { id: "listen", kind: "listen", title: steps.listenTitle, body: steps.listenBody, audioTargetId: "core" },
      {
        id: "repeat",
        kind: "repeat",
        title: steps.repeatTitle,
        body: steps.repeatBody,
        audioTargetId: "core"
      },
      {
        id: "record",
        kind: "record",
        title: steps.recordTitle,
        body: steps.recordBody,
        audioTargetId: "core"
      },
      {
        id: "quiz",
        kind: "quiz",
        title: steps.quizTitle,
        body: steps.quizBody,
        choices: [source.meaning, ...steps.quizDistractors],
        answer: source.meaning
      },
      {
        id: "roleplay",
        kind: "roleplay",
        title: steps.roleplayTitle,
        body: steps.roleplayBody,
        audioTargetId: "response"
      },
      { id: "summary", kind: "summary", title: steps.summaryTitle, body: steps.summaryBody, saveTargetId: "core" }
    ]
  };
};

export const kFoodLessons: Lesson[] = kFoodLessonSources.map(makeKFoodLesson);
export const kFoodLessonIds = kFoodLessons.map((lesson) => lesson.id);
export const getKFoodLesson = (lessonId: string) => kFoodLessons.find((lesson) => lesson.id === lessonId);
