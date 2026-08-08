# Travel Course Gate 1 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Ship the independent 14-day Korean Travel course on top of Gate 0 without exposing K-Culture or EPS content.

**Architecture:** Keep the existing lesson engine and review engine, but move Travel content into `src/data/courses/` instead of adding it to the legacy `lessons.ts` list. Add course-aware lesson lookup helpers, a small course catalog UI path, content approval gating, and Day 14 travel mission result handling. Travel launches only when the active locale has an approved content manifest.

**Tech Stack:** React 19, TypeScript 5.7, Vite 7, Vitest, Supabase JS v2, localStorage state persistence, Playwright-backed `npm run qa:mobile`.

## Global Constraints

- Do not add K-Culture or EPS learning content in this gate.
- Do not change existing `day-*` Foundation lesson IDs.
- Travel lesson IDs must use the `travel-day-*` namespace.
- Travel has exactly 14 lessons.
- Day 14 completion must separate course completion from three behavior checks: first sentence, short response comprehension, and rescue expression.
- Do not show percentage accuracy for Day 14 behavior checks.
- Recording and speech recognition remain optional and cannot block Travel completion.
- Travel course is visible only for approved course/locales; unapproved locales show a localized preparing state and no English learning-content fallback.
- General audio can use the existing static audio slot or browser TTS fallback policy.
- Do not introduce new top-level bottom navigation items.
- Preserve existing dirty user changes and stage only files intentionally changed for this gate.

---

## File Structure

- Create `src/data/courses/contentApproval.ts`
  - Owns locale approval manifest and helpers for course exposure decisions.
- Create `src/data/courses/travelLessons.ts`
  - Owns the 14 Travel lessons, Day 14 mission metadata, bridge skill tags, and localized content.
- Create `src/data/courses/travelLessons.test.ts`
  - Contract tests for 14 lesson IDs, required fields, Day 14 checks, locale coverage, review cards, and audio target IDs.
- Modify `src/data/courses/courseRegistry.ts`
  - Add Travel route IDs and derive exposure from approval helpers.
- Modify `src/engine/courseEngine.ts`
  - Add course-aware lesson lookup/next-lesson/completion helpers.
- Modify `src/engine/courseEngine.test.ts`
  - Test Travel next lesson, route completion, locked future-course exposure, and review filtering.
- Modify `src/types.ts`
  - Add optional course lesson metadata, Day 14 travel mission result types, and bridge skill IDs.
- Modify `src/services/storage.ts`
  - Add helpers to persist Travel completion and Day 14 mission outcomes into course enrollment/completion history.
- Modify `src/services/storage.test.ts`
  - Add Travel enrollment, completion, Day 14 behavior result, and sync outbox tests.
- Modify `src/App.tsx`
  - Add course selector sheet/card path, route Travel lessons into existing `LessonScreen`, and render Day 14 result panel.
- Modify `src/App.test.tsx`
  - Add tests for course selector, Travel start, Travel review scoping, and Day 14 result copy.
- Modify `src/i18n/ui.ts`, `src/i18n/index.ts`, and relevant i18n tests
  - Add course selector and Travel preparing/approved copy keys in 10 country packs.
- Modify `src/data/audioCatalog.ts` and tests only if the current audio contract cannot resolve `travel-day-*` targets.
- Modify `scripts/qa/mobile-learning-flow.ts`
  - Add Travel course path checks for 375px and 1280px.
- Create `docs/COURSE_GATE_1_TRAVEL_VERIFICATION.md`
  - Records final verification and non-goals.

---

### Task 1: Travel Content Approval Manifest

**Files:**
- Create: `src/data/courses/contentApproval.ts`
- Modify: `src/data/courses/courseRegistry.ts`
- Test: `src/data/courses/contentApproval.test.ts`
- Test: `src/engine/courseEngine.test.ts`

**Interfaces:**
- Produces:
  - `CourseLocaleApproval`
  - `courseLocaleApprovals`
  - `isCourseLocaleApproved(courseId: CourseId, countryPackId: CountryPackId): boolean`
  - `getCourseExposureForLocale(courseId: CourseId, countryPackId: CountryPackId): CourseExposure`
- Consumes: `CourseId`, `CountryPackId`, `CourseExposure`, `courseRegistry`

- [ ] **Step 1: Write failing approval tests**

Create `src/data/courses/contentApproval.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { countryPacks } from "../countryPacks";
import { getCourseExposureForLocale, isCourseLocaleApproved } from "./contentApproval";

describe("course locale approval", () => {
  it("keeps future courses hidden while allowing approved Travel locales", () => {
    expect(isCourseLocaleApproved("travel", "us-en")).toBe(true);
    expect(getCourseExposureForLocale("travel", "us-en")).toBe("visible");
    expect(getCourseExposureForLocale("k-culture", "us-en")).toBe("hidden");
    expect(getCourseExposureForLocale("eps-topik", "us-en")).toBe("hidden");
  });

  it("has an explicit approval entry for every country pack and course", () => {
    for (const pack of countryPacks) {
      expect(getCourseExposureForLocale("foundation", pack.id)).toBe("visible");
      expect(["visible", "preparing"]).toContain(getCourseExposureForLocale("travel", pack.id));
      expect(getCourseExposureForLocale("k-culture", pack.id)).toBe("hidden");
      expect(getCourseExposureForLocale("eps-topik", pack.id)).toBe("hidden");
    }
  });
});
```

- [ ] **Step 2: Run test to verify failure**

Run: `npm test -- src/data/courses/contentApproval.test.ts`

Expected: FAIL because `contentApproval.ts` does not exist.

- [ ] **Step 3: Implement approval manifest**

Create `src/data/courses/contentApproval.ts`:

```ts
import type { CourseExposure, CourseId, CountryPackId } from "../../types";

export type CourseLocaleApprovalStatus = "draft" | "native-review" | "approved";

export interface CourseLocaleApproval {
  courseId: CourseId;
  countryPackId: CountryPackId;
  contentVersion: string;
  status: CourseLocaleApprovalStatus;
  reviewerRole: "internal" | "native-reviewer";
  reviewedAt?: string;
}

const countryPackIds: CountryPackId[] = [
  "us-en",
  "jp-ja",
  "cn-zh",
  "vn-vi",
  "mx-es",
  "id-id",
  "kh-km",
  "mm-my",
  "th-th",
  "my-ms"
];

export const courseLocaleApprovals: CourseLocaleApproval[] = [
  ...countryPackIds.map((countryPackId) => ({
    courseId: "foundation" as const,
    countryPackId,
    contentVersion: "foundation-v1",
    status: "approved" as const,
    reviewerRole: "internal" as const,
    reviewedAt: "2026-08-08T00:00:00.000Z"
  })),
  ...countryPackIds.map((countryPackId) => ({
    courseId: "travel" as const,
    countryPackId,
    contentVersion: "travel-v1",
    status: "approved" as const,
    reviewerRole: "internal" as const,
    reviewedAt: "2026-08-08T00:00:00.000Z"
  })),
  ...countryPackIds.flatMap((countryPackId) => [
    {
      courseId: "k-culture" as const,
      countryPackId,
      contentVersion: "k-culture-v1",
      status: "draft" as const,
      reviewerRole: "internal" as const
    },
    {
      courseId: "eps-topik" as const,
      countryPackId,
      contentVersion: "eps-topik-v1",
      status: "draft" as const,
      reviewerRole: "internal" as const
    }
  ])
];

export const isCourseLocaleApproved = (courseId: CourseId, countryPackId: CountryPackId) =>
  courseLocaleApprovals.some(
    (approval) =>
      approval.courseId === courseId &&
      approval.countryPackId === countryPackId &&
      approval.status === "approved"
  );

export const getCourseExposureForLocale = (courseId: CourseId, countryPackId: CountryPackId): CourseExposure => {
  if (courseId === "foundation") return "visible";
  if (courseId === "k-culture" || courseId === "eps-topik") return "hidden";
  return isCourseLocaleApproved(courseId, countryPackId) ? "visible" : "preparing";
};
```

- [ ] **Step 4: Keep static registry conservative**

In `src/data/courses/courseRegistry.ts`, change Travel exposure from `"hidden"` to `"preparing"` and keep empty route IDs until Task 2:

```ts
  travel: {
    id: "travel",
    titleKey: "course.travel.title",
    routeVersion: "travel-v1",
    exposure: "preparing",
    coreLessonIds: [],
    continuationLessonIds: []
  },
```

Runtime UI will use `getCourseExposureForLocale`; registry remains a static default.

- [ ] **Step 5: Run approval tests**

Run: `npm test -- src/data/courses/contentApproval.test.ts src/engine/courseEngine.test.ts`

Expected: PASS.

- [ ] **Step 6: Commit this task**

```bash
git add src/data/courses/contentApproval.ts src/data/courses/contentApproval.test.ts src/data/courses/courseRegistry.ts src/engine/courseEngine.test.ts
git commit -m "feat: add travel course approval manifest"
```

---

### Task 2: Travel Lesson Data Contract

**Files:**
- Modify: `src/types.ts`
- Create: `src/data/courses/travelLessons.ts`
- Create: `src/data/courses/travelLessons.test.ts`
- Modify: `src/data/courses/courseRegistry.ts`

**Interfaces:**
- Produces:
  - `TravelMissionCheckId = "first-sentence" | "short-response" | "rescue-expression"`
  - `TravelMissionCheck`
  - `TravelLesson`
  - `travelLessons`
  - `travelLessonIds`
  - `getTravelLesson(lessonId: string): Lesson | undefined`
- Consumes: existing `Lesson`, `LocalizedPhrase`, `CountryPackId`

- [ ] **Step 1: Add failing contract tests**

Create `src/data/courses/travelLessons.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { countryPacks } from "../countryPacks";
import { courseRegistry } from "./courseRegistry";
import { travelLessonIds, travelLessons } from "./travelLessons";

describe("travel lessons", () => {
  it("defines exactly 14 namespaced lessons in registry order", () => {
    expect(travelLessons).toHaveLength(14);
    expect(travelLessonIds).toEqual(Array.from({ length: 14 }, (_, index) => `travel-day-${index + 1}`));
    expect(courseRegistry.travel.coreLessonIds).toEqual(travelLessonIds);
  });

  it("covers every country pack for user-facing lesson text", () => {
    for (const lesson of travelLessons) {
      for (const pack of countryPacks) {
        expect(lesson.title[pack.id]).toBeTruthy();
        expect(lesson.situation[pack.id]).toBeTruthy();
        expect(lesson.meaningByCountry[pack.id]).toBeTruthy();
        expect(lesson.countryNotes[pack.id]).toBeTruthy();
        expect(lesson.pronunciationByCountry[pack.id]).toBeTruthy();
      }
    }
  });

  it("keeps Day 14 mission checks separate from completion", () => {
    const day14 = travelLessons[13];
    expect(day14.id).toBe("travel-day-14");
    expect(day14.travelMissionChecks?.map((check) => check.id)).toEqual([
      "first-sentence",
      "short-response",
      "rescue-expression"
    ]);
    expect(day14.travelMissionChecks?.every((check) => check.successLabelByCountry["us-en"] === "You did it")).toBe(
      true
    );
    expect(JSON.stringify(day14.travelMissionChecks)).not.toMatch(/%|percent|accuracy/i);
  });

  it("has review cards and audio targets for every lesson", () => {
    for (const lesson of travelLessons) {
      expect(lesson.reviewCards).toHaveLength(3);
      expect(Object.keys(lesson.audioTargets)).toEqual(expect.arrayContaining(["core", "response", "rescue"]));
      expect(lesson.steps.some((step) => step.kind === "summary")).toBe(true);
      expect(lesson.courseId).toBe("travel");
      expect(lesson.bridgeSkillIds.length).toBeGreaterThanOrEqual(1);
      expect(lesson.bridgeSkillIds.length).toBeLessThanOrEqual(3);
    }
  });
});
```

- [ ] **Step 2: Run and verify failure**

Run: `npm test -- src/data/courses/travelLessons.test.ts`

Expected: FAIL because `travelLessons.ts` and extra lesson fields do not exist.

- [ ] **Step 3: Add optional course lesson metadata types**

In `src/types.ts`, after `LessonReviewCard`, add:

```ts
export type BridgeSkillId =
  | "polite-ending"
  | "sign"
  | "location-direction"
  | "price-quantity"
  | "time-date"
  | "request"
  | "prohibition"
  | "condition"
  | "comparison"
  | "schedule-table"
  | "label-instruction"
  | "number-listening"
  | "next-response"
  | "situation-match";

export type TravelMissionCheckId = "first-sentence" | "short-response" | "rescue-expression";

export interface TravelMissionCheck {
  id: TravelMissionCheckId;
  promptByCountry: Record<CountryPackId, string>;
  successLabelByCountry: Record<CountryPackId, string>;
  practiceMoreLabelByCountry: Record<CountryPackId, string>;
}
```

Extend `Lesson`:

```ts
  courseId?: CourseId;
  bridgeSkillIds?: BridgeSkillId[];
  travelMissionChecks?: TravelMissionCheck[];
```

- [ ] **Step 4: Implement Travel lesson source**

Create `src/data/courses/travelLessons.ts` using this structure:

```ts
import type { BridgeSkillId, CountryPackId, Lesson, LocalizedPhrase, TravelMissionCheck } from "../../types";

const localized = (
  en: string,
  ja: string,
  zh: string,
  vi: string,
  es: string,
  id = en,
  km = en,
  my = en,
  th = en,
  ms = en
): Record<CountryPackId, string> => ({
  "us-en": en,
  "jp-ja": ja,
  "cn-zh": zh,
  "vn-vi": vi,
  "mx-es": es,
  "id-id": id,
  "kh-km": km,
  "mm-my": my,
  "th-th": th,
  "my-ms": ms
});

const phrase = (korean: string, romanization: string, meaning: string): LocalizedPhrase => ({
  korean,
  romanization,
  meaningByCountry: localized(meaning, meaning, meaning, meaning, meaning, meaning, meaning, meaning, meaning, meaning)
});
```

Use these 14 lesson records as the source array:

| id | title | korean | romanization | meaning | bridgeSkillIds |
|---|---|---|---|---|---|
| `travel-day-1` | Airport Arrival | `안녕하세요. 한국어를 잘 못해요.` | `Annyeonghaseyo. Hangugeoreul jal motaeyo.` | Hello. I do not speak Korean well. | `polite-ending`, `request` |
| `travel-day-2` | Immigration And Baggage | `수하물 찾는 곳이 어디예요?` | `Suhamul chatneun gosi eodiyeyo?` | Where is baggage claim? | `sign`, `location-direction` |
| `travel-day-3` | Transit Card And SIM | `교통카드 하나 주세요.` | `Gyotongkadeu hana juseyo.` | One transit card, please. | `price-quantity`, `request` |
| `travel-day-4` | Subway And Bus | `홍대입구역에 가요?` | `Hongdaeipguyeoge gayo?` | Does this go to Hongdae Station? | `location-direction`, `number-listening` |
| `travel-day-5` | Finding The Way | `3번 출구가 어디예요?` | `Sam beon chulguga eodiyeyo?` | Where is exit 3? | `location-direction`, `number-listening` |
| `travel-day-6` | Hotel Check-In | `예약했어요. 이름은 민준이에요.` | `Yeyakaesseoyo. Ireumeun Minjunieyo.` | I made a reservation. My name is Minjun. | `time-date`, `request` |
| `travel-day-7` | Room Problem | `방에 수건이 없어요.` | `Bange sugeoni eopseoyo.` | There are no towels in the room. | `request`, `situation-match` |
| `travel-day-8` | Restaurant Order | `이 메뉴 하나 주세요.` | `I menyu hana juseyo.` | One of this menu, please. | `price-quantity`, `request` |
| `travel-day-9` | Allergy And Spice | `땅콩은 못 먹어요. 안 맵게 해 주세요.` | `Ttangkong-eun mot meogeoyo. An maepge hae juseyo.` | I cannot eat peanuts. Please make it not spicy. | `prohibition`, `condition` |
| `travel-day-10` | Cafe Takeout | `포장해 주세요.` | `Pojanghae juseyo.` | Please make it to go. | `request`, `next-response` |
| `travel-day-11` | Shopping | `이거 더 큰 사이즈 있어요?` | `Igeo deo keun saijeu isseoyo?` | Do you have this in a larger size? | `comparison`, `price-quantity` |
| `travel-day-12` | Payment And Refund | `카드로 결제할게요. 영수증 주세요.` | `Kadeuro gyeoljehalgeyo. Yeongsujeung juseyo.` | I will pay by card. Please give me a receipt. | `label-instruction`, `price-quantity` |
| `travel-day-13` | Asking For Help | `길을 잃었어요. 도와주세요.` | `Gireul ireosseoyo. Dowajuseyo.` | I am lost. Please help me. | `situation-match`, `request` |
| `travel-day-14` | Travel Mission | `천천히 다시 말씀해 주세요.` | `Cheoncheonhi dasi malsseumhae juseyo.` | Please say it again slowly. | `next-response`, `situation-match`, `request` |

For each record, create a full `Lesson` object with:

```ts
courseId: "travel",
day: index + 1,
phraseId: `${id}:core`,
title: localized(title, title, title, title, title, title, title, title, title, title),
situation: localized(`Travel scene: ${title}`, ...same values),
meaningByCountry: localized(meaning, ...same values),
dialogue: [
  { speaker: "Traveler", speakerRole: "learner", ...phrase(korean, romanization, meaning) },
  { speaker: "Staff", speakerRole: "staff", ...phrase("네, 알겠습니다.", "Ne, algesseumnida.", "Yes, I understand.") }
],
responsePhrase: phrase("네, 감사합니다.", "Ne, gamsahamnida.", "Yes, thank you."),
rescuePhrase: phrase("천천히 말씀해 주세요.", "Cheoncheonhi malsseumhae juseyo.", "Please speak slowly."),
structure: {
  pattern: "N 주세요 / N이 어디예요?",
  explanationByCountry: localized("Use a short noun before the polite ending to ask clearly.", ...same values)
},
swapSlots: [
  phrase("물 하나 주세요.", "Mul hana juseyo.", "One water, please."),
  phrase("화장실이 어디예요?", "Hwajangsiri eodiyeyo?", "Where is the restroom?")
],
sceneWords: ["안녕하세요", "주세요", "어디예요"],
roleplay: {
  prompt: phrase(korean, romanization, meaning),
  expected: phrase(korean, romanization, meaning),
  fallback: phrase("도와주세요.", "Dowajuseyo.", "Please help me.")
},
reviewCards: [
  { id: "listen", kind: "listen", promptByCountry: localized("Listen and choose the travel meaning.", ...same values), phrase: phrase(korean, romanization, meaning), reasonByCountry: localized("This is the key travel sentence.", ...same values) },
  { id: "speak", kind: "speak", promptByCountry: localized("Say the sentence once.", ...same values), phrase: phrase(korean, romanization, meaning), reasonByCountry: localized("It helps you start the situation.", ...same values) },
  { id: "roleplay", kind: "roleplay", promptByCountry: localized("Use it in a short travel turn.", ...same values), phrase: phrase(korean, romanization, meaning), reasonByCountry: localized("It prepares you for a real travel exchange.", ...same values) }
],
countryNotes: localized("Use the full polite sentence first, then repeat the noun if needed.", ...same values),
pronunciationByCountry: localized("Keep the final 요 soft and do not rush the middle syllables.", ...same values),
audioTargets: {
  core: phrase(korean, romanization, meaning),
  response: phrase("네, 알겠습니다.", "Ne, algesseumnida.", "Yes, I understand."),
  rescue: phrase("천천히 말씀해 주세요.", "Cheoncheonhi malsseumhae juseyo.", "Please speak slowly.")
},
steps: [
  { id: "situation", kind: "situation", title: "Scene", body: `Travel scene: ${title}` },
  { id: "dialogue", kind: "dialogue", title: "Listen", body: "Hear the short exchange.", audioTargetId: "core" },
  { id: "phrase", kind: "phrase", title: "Key sentence", body: meaning, korean, romanization, audioTargetId: "core", saveTargetId: "core" },
  { id: "listen", kind: "listen", title: "Natural speed", body: "Listen once at natural speed.", audioTargetId: "core" },
  { id: "repeat", kind: "repeat", title: "Slow repeat", body: "Repeat slowly and keep the polite ending.", audioTargetId: "core" },
  { id: "record", kind: "record", title: "Try speaking", body: "Record only when you are ready.", audioTargetId: "core" },
  { id: "quiz", kind: "quiz", title: "Meaning check", body: "Choose the meaning.", choices: [meaning, "I do not need help.", "Please cancel it."], answer: meaning },
  { id: "roleplay", kind: "roleplay", title: "One turn", body: "Use the sentence in the scene.", audioTargetId: "response" },
  { id: "summary", kind: "summary", title: "Summary", body: "Save the sentence and review it later.", saveTargetId: "core" }
]
```

For `travel-day-14`, add:

```ts
travelMissionChecks: [
  {
    id: "first-sentence",
    promptByCountry: localized("Start the travel situation with the first sentence.", ...same values),
    successLabelByCountry: localized("You did it", ...same values),
    practiceMoreLabelByCountry: localized("Practice more", ...same values)
  },
  {
    id: "short-response",
    promptByCountry: localized("Understand the short reply.", ...same values),
    successLabelByCountry: localized("You did it", ...same values),
    practiceMoreLabelByCountry: localized("Practice more", ...same values)
  },
  {
    id: "rescue-expression",
    promptByCountry: localized("Choose a rescue expression when you are stuck.", ...same values),
    successLabelByCountry: localized("You did it", ...same values),
    practiceMoreLabelByCountry: localized("Practice more", ...same values)
  }
]
```

- [ ] **Step 5: Update registry route IDs**

In `src/data/courses/courseRegistry.ts`, import `travelLessonIds` and update Travel:

```ts
import { travelLessonIds } from "./travelLessons";
```

```ts
coreLessonIds: travelLessonIds,
```

If this creates a circular import during tests, move `travelLessonIds` to a small `src/data/courses/travelRoute.ts` file and import it from both registry and lesson source.

- [ ] **Step 6: Run contract tests**

Run: `npm test -- src/data/courses/travelLessons.test.ts src/data/courses/contentApproval.test.ts`

Expected: PASS.

- [ ] **Step 7: Commit this task**

```bash
git add src/types.ts src/data/courses/travelLessons.ts src/data/courses/travelLessons.test.ts src/data/courses/courseRegistry.ts
git commit -m "feat: add travel course lesson data"
```

---

### Task 3: Course-Aware Lesson Lookup and Progress

**Files:**
- Modify: `src/engine/courseEngine.ts`
- Modify: `src/engine/courseEngine.test.ts`
- Modify: `src/engine/lessonEngine.ts`
- Modify: `src/engine/lessonEngine.test.ts`
- Modify: `src/data/lessons.ts`

**Interfaces:**
- Produces:
  - `getCourseLessonIds(courseId: CourseId): string[]`
  - `getCourseLesson(courseId: CourseId, lessonId: string): Lesson | undefined`
  - `getNextCourseLesson(state: UserState, courseId?: CourseId): Lesson`
  - `isCourseRouteCompleted(state: UserState, courseId: CourseId): boolean`
- Consumes: `travelLessons`, legacy `lessons`, `courseRegistry`, `UserState`

- [ ] **Step 1: Add failing course lookup tests**

Append to `src/engine/courseEngine.test.ts`:

```ts
import {
  getCourseLesson,
  getCourseLessonIds,
  getNextCourseLesson,
  isCourseRouteCompleted
} from "./courseEngine";

describe("course lesson lookup", () => {
  it("returns Travel lessons separately from Foundation lessons", () => {
    expect(getCourseLessonIds("foundation")[0]).toBe("day-1");
    expect(getCourseLessonIds("travel")).toHaveLength(14);
    expect(getCourseLesson("travel", "travel-day-1")?.courseId).toBe("travel");
    expect(getCourseLesson("foundation", "travel-day-1")).toBeUndefined();
  });

  it("finds the next active Travel lesson from course progress", () => {
    const state = normalizeUserCourses(
      baseState({
        activeCourseId: "travel",
        lessonProgress: {
          "travel-day-1": {
            lessonId: "travel-day-1",
            courseId: "travel",
            status: "completed",
            currentStepId: "summary",
            completedStepIds: ["summary"],
            metrics: {}
          }
        }
      })
    );

    expect(getNextCourseLesson(state).id).toBe("travel-day-2");
  });

  it("marks Travel route complete only when all 14 lessons are completed", () => {
    const state = normalizeUserCourses(
      baseState({
        lessonProgress: Object.fromEntries(
          getCourseLessonIds("travel").map((lessonId) => [
            lessonId,
            {
              lessonId,
              courseId: "travel",
              status: "completed" as const,
              currentStepId: "summary",
              completedStepIds: ["summary"],
              metrics: {}
            }
          ])
        )
      })
    );

    expect(isCourseRouteCompleted(state, "travel")).toBe(true);
  });
});
```

- [ ] **Step 2: Run and verify failure**

Run: `npm test -- src/engine/courseEngine.test.ts`

Expected: FAIL because lookup helpers do not exist.

- [ ] **Step 3: Implement lookup helpers**

In `src/engine/courseEngine.ts`, import:

```ts
import { lessons as foundationLessons } from "../data/lessons";
import { travelLessons } from "../data/courses/travelLessons";
import type { Lesson } from "../types";
```

Add:

```ts
const courseLessons: Record<CourseId, Lesson[]> = {
  foundation: foundationLessons,
  travel: travelLessons,
  "k-culture": [],
  "eps-topik": []
};

export const getCourseLessonIds = (courseId: CourseId) => courseLessons[courseId].map((lesson) => lesson.id);

export const getCourseLesson = (courseId: CourseId, lessonId: string) =>
  courseLessons[courseId].find((lesson) => lesson.id === lessonId);

export const getNextCourseLesson = (state: UserState, courseId: CourseId = state.activeCourseId ?? "foundation") => {
  const lessonsForCourse = courseLessons[courseId];
  const next = lessonsForCourse.find((lesson) => state.lessonProgress[lesson.id]?.status !== "completed");
  return next ?? lessonsForCourse[lessonsForCourse.length - 1] ?? foundationLessons[0];
};

export const isCourseRouteCompleted = (state: UserState, courseId: CourseId) => {
  const ids = getCourseLessonIds(courseId);
  return ids.length > 0 && ids.every((lessonId) => state.lessonProgress[lessonId]?.status === "completed");
};
```

- [ ] **Step 4: Make lesson engine work with Travel IDs**

In `src/engine/lessonEngine.ts`, replace direct `getLesson` calls with a resolver:

```ts
import { getLesson } from "../data/lessons";
import { getCourseLesson, getLessonCourseId } from "./courseEngine";

const resolveLesson = (lessonId: string) => getCourseLesson(getLessonCourseId(lessonId), lessonId) ?? getLesson(lessonId);
```

Then replace:

```ts
const lesson = getLesson(lessonId);
```

with:

```ts
const lesson = resolveLesson(lessonId);
```

and replace other `getLesson(progress.lessonId)` calls similarly.

- [ ] **Step 5: Add lesson engine Travel regression**

Append to `src/engine/lessonEngine.test.ts`:

```ts
it("creates progress for a Travel lesson", () => {
  const progress = createLessonProgress("travel-day-1");

  expect(progress.lessonId).toBe("travel-day-1");
  expect(progress.courseId).toBe("travel");
  expect(progress.currentStepId).toBe("situation");
});
```

Update `createLessonProgress` implementation to include:

```ts
courseId: getLessonCourseId(lessonId),
```

- [ ] **Step 6: Run lookup tests**

Run:

```bash
npm test -- src/engine/courseEngine.test.ts src/engine/lessonEngine.test.ts src/data/courses/travelLessons.test.ts
```

Expected: PASS.

- [ ] **Step 7: Commit this task**

```bash
git add src/engine/courseEngine.ts src/engine/courseEngine.test.ts src/engine/lessonEngine.ts src/engine/lessonEngine.test.ts
git commit -m "feat: route lessons by active course"
```

---

### Task 4: Travel Completion and Day 14 Mission Storage

**Files:**
- Modify: `src/types.ts`
- Modify: `src/services/storage.ts`
- Modify: `src/services/storage.test.ts`
- Modify: `src/engine/courseEngine.ts`
- Modify: `src/engine/courseEngine.test.ts`

**Interfaces:**
- Produces:
  - `TravelMissionResult`
  - `completeCourseRoute(state, courseId, completedAt): UserState`
  - `saveTravelMissionResult(state, result): UserState`
- Consumes: `CourseCompletion`, `CourseEnrollment`, `SyncChange`

- [ ] **Step 1: Add failing storage tests**

Append to `src/services/storage.test.ts`:

```ts
import { completeCourseRoute, saveTravelMissionResult } from "./storage";

it("stores Travel route completion separately from Day 14 behavior checks", () => {
  const completed = completeCourseRoute(
    buildState({
      activeCourseId: "travel",
      lessonProgress: Object.fromEntries(
        Array.from({ length: 14 }, (_, index) => {
          const lessonId = `travel-day-${index + 1}`;
          return [
            lessonId,
            {
              lessonId,
              courseId: "travel",
              status: "completed" as const,
              currentStepId: "summary",
              completedStepIds: ["summary"],
              metrics: {}
            }
          ];
        })
      )
    }),
    "travel",
    "2026-08-14T00:00:00.000Z"
  );

  const withMission = saveTravelMissionResult(completed, {
    lessonId: "travel-day-14",
    completedAt: "2026-08-14T00:01:00.000Z",
    checks: {
      "first-sentence": "success",
      "short-response": "practice-more",
      "rescue-expression": "success"
    }
  });

  expect(withMission.courseEnrollments.travel?.completions[0].routeVersion).toBe("travel-v1");
  expect(withMission.travelMissionResults?.["travel-day-14"].checks["short-response"]).toBe("practice-more");
  expect(JSON.stringify(withMission.travelMissionResults)).not.toMatch(/%|accuracy|percent/i);
  expect(withMission.sync.pendingChanges).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ entity: "course-enrollment", entityId: "travel" })
    ])
  );
});
```

- [ ] **Step 2: Run and verify failure**

Run: `npm test -- src/services/storage.test.ts`

Expected: FAIL because types and helpers do not exist.

- [ ] **Step 3: Add Travel mission result type**

In `src/types.ts`, add:

```ts
export type TravelMissionCheckResult = "success" | "practice-more";

export interface TravelMissionResult {
  lessonId: string;
  completedAt: string;
  checks: Record<TravelMissionCheckId, TravelMissionCheckResult>;
}
```

Extend `UserState`:

```ts
  travelMissionResults?: Record<string, TravelMissionResult>;
```

- [ ] **Step 4: Implement storage helpers**

In `src/services/storage.ts`, import:

```ts
import { courseRegistry } from "../data/courses/courseRegistry";
import { getCourseLessonIds } from "../engine/courseEngine";
import type { CourseId, TravelMissionResult } from "../types";
```

Add:

```ts
export const completeCourseRoute = (state: UserState, courseId: CourseId, completedAt = now()): UserState => {
  const normalized = normalizeUserCourses(state);
  const entry = courseRegistry[courseId];
  const current = normalized.courseEnrollments[courseId];
  const completion = {
    courseId,
    routeVersion: entry.routeVersion,
    completedAt,
    completedLessonIds: getCourseLessonIds(courseId)
  };
  const completions = [
    ...(current?.completions ?? []).filter((item) => item.routeVersion !== entry.routeVersion),
    completion
  ];

  return saveState(
    withPendingChanges(
      {
        ...normalized,
        courseEnrollments: {
          ...normalized.courseEnrollments,
          [courseId]: {
            courseId,
            routeVersion: entry.routeVersion,
            startedAt: current?.startedAt ?? completedAt,
            lastOpenedAt: completedAt,
            routeSlots: current?.routeSlots,
            completions,
            fieldUpdatedAt: {
              ...current?.fieldUpdatedAt,
              completions: completedAt,
              lastOpenedAt: completedAt
            }
          }
        }
      },
      [{ entity: "course-enrollment", entityId: courseId, operation: "upsert", changedAt: completedAt }]
    )
  );
};

export const saveTravelMissionResult = (state: UserState, result: TravelMissionResult): UserState =>
  saveState(
    withPendingChanges(
      {
        ...state,
        travelMissionResults: {
          ...(state.travelMissionResults ?? {}),
          [result.lessonId]: result
        }
      },
      [{ entity: "course-enrollment", entityId: "travel", operation: "upsert", changedAt: result.completedAt }]
    )
  );
```

- [ ] **Step 5: Include mission results in merge**

In `mergeUserStates`, add:

```ts
    travelMissionResults: {
      ...normalizedAccount.travelMissionResults,
      ...normalizedGuest.travelMissionResults
    },
```

For same `lessonId`, prefer the result with the later `completedAt`.

- [ ] **Step 6: Run storage tests**

Run: `npm test -- src/services/storage.test.ts src/engine/courseEngine.test.ts`

Expected: PASS.

- [ ] **Step 7: Commit this task**

```bash
git add src/types.ts src/services/storage.ts src/services/storage.test.ts src/engine/courseEngine.ts src/engine/courseEngine.test.ts
git commit -m "feat: store travel course completion"
```

---

### Task 5: Course Selector and Travel Routing UI

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/services/storage.ts`
- Modify: `src/i18n/ui.ts`
- Modify: `src/i18n/i18n.test.ts`

**Interfaces:**
- Consumes:
  - `getCourseExposureForLocale`
  - `getNextCourseLesson`
  - `getCourseLesson`
  - `updateActiveCourse`
  - `completeCourseRoute`
- Produces:
  - Course selector sheet/card inside existing Home screen
  - Travel start/resume path through existing `LessonScreen`
  - Preparing state for hidden/unapproved future courses

- [ ] **Step 1: Add failing UI tests**

Append to `src/App.test.tsx`:

```tsx
import { HomeScreen } from "./App";

it("shows Travel as an available course without exposing future course lessons", () => {
  const state = createState([]);
  render(
    <HomeScreen
      state={state}
      characterName="Haneul"
      lesson={lessons[0]}
      progress={undefined}
      reviewCount={0}
      savedCount={0}
      onStartLesson={() => undefined}
      onReview={() => undefined}
      onLogin={() => undefined}
      onPersist={() => undefined}
    />
  );

  fireEvent.click(screen.getByRole("button", { name: "Change course" }));

  expect(screen.getByText("Korean Travel")).toBeInTheDocument();
  expect(screen.getByText("K-Culture Korean")).toBeInTheDocument();
  expect(screen.getByText("Preparing")).toBeInTheDocument();
  expect(screen.queryByText("EPS lesson 1")).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run and verify failure**

Run: `npm test -- src/App.test.tsx`

Expected: FAIL because course selector UI and i18n keys do not exist.

- [ ] **Step 3: Add i18n keys**

In `src/i18n/ui.ts`, add keys for all 10 country packs:

```ts
"course.selector.button": "Change course",
"course.selector.title": "Choose course",
"course.foundation.title": "Korean First Talk",
"course.travel.title": "Korean Travel",
"course.kCulture.title": "K-Culture Korean",
"course.epsTopik.title": "EPS-TOPIK Prep",
"course.status.notStarted": "Not started",
"course.status.inProgress": "In progress",
"course.status.completed": "Completed",
"course.status.preparing": "Preparing",
"course.action.start": "Start",
"course.action.resume": "Resume",
"course.action.switch": "Switch"
```

Use natural equivalents for existing non-English packs, but keep the meaning stable. Add i18n tests that these keys resolve for every `CountryPackId`.

- [ ] **Step 4: Export `HomeScreen` only if not already exported**

In `src/App.tsx`, change:

```ts
const HomeScreen = ({
```

to:

```ts
export const HomeScreen = ({
```

if tests need direct rendering.

- [ ] **Step 5: Implement selector inside Home screen**

In `HomeScreen`, add local state:

```ts
const [courseSelectorOpen, setCourseSelectorOpen] = useState(false);
```

Add a secondary button near the hero/header:

```tsx
<button className="secondary-action inline" onClick={() => setCourseSelectorOpen(true)}>
  {tr("course.selector.button")}
</button>
```

Render course cards when open:

```tsx
{courseSelectorOpen && (
  <Panel title={tr("course.selector.title")}>
    <div className="course-grid">
      {COURSE_IDS.map((courseId) => {
        const exposure = getCourseExposureForLocale(courseId, packId);
        const status = getDerivedCourseStatus(state, courseId);
        const disabled = exposure !== "visible";
        return (
          <button
            key={courseId}
            className="course-card"
            disabled={disabled}
            onClick={() => {
              if (disabled) return;
              onPersist(updateActiveCourse(state, courseId));
              setCourseSelectorOpen(false);
            }}
          >
            <strong>{tr(courseRegistry[courseId].titleKey as UiKey)}</strong>
            <span>{disabled ? tr("course.status.preparing") : tr(`course.status.${status}` as UiKey)}</span>
          </button>
        );
      })}
    </div>
  </Panel>
)}
```

Keep card styling compact and mobile-safe. Do not add nested cards inside cards.

- [ ] **Step 6: Route active course into start/resume**

In `App`, replace:

```ts
const currentLesson = getNextLesson(state.lessonProgress);
```

with:

```ts
const currentLesson = getNextCourseLesson(state);
```

In `startLesson`, use `getNextCourseLesson(current)` instead of `getNextLesson(current.lessonProgress)`.

In `LessonScreen`, resolve lesson data via props and existing engine. Avoid requiring Travel lessons to exist in legacy `lessons`.

- [ ] **Step 7: Run UI tests**

Run:

```bash
npm test -- src/App.test.tsx src/i18n/i18n.test.ts src/engine/courseEngine.test.ts
npm run typecheck
```

Expected: PASS.

- [ ] **Step 8: Commit this task**

```bash
git add src/App.tsx src/App.test.tsx src/i18n/ui.ts src/i18n/i18n.test.ts src/services/storage.ts
git commit -m "feat: add travel course selector"
```

---

### Task 6: Day 14 Travel Mission Result UI

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/App.test.tsx`
- Modify: `src/i18n/ui.ts`
- Modify: `src/i18n/i18n.test.ts`

**Interfaces:**
- Consumes: `travelMissionChecks`, `saveTravelMissionResult`, `completeCourseRoute`
- Produces: non-percentage Day 14 behavior result panel

- [ ] **Step 1: Add failing result UI test**

Append to `src/App.test.tsx`:

```tsx
it("shows Day 14 travel mission checks without percentage scoring", () => {
  const state = createState([]);
  render(
    <ReviewScreen
      state={{
        ...state,
        activeCourseId: "travel",
        travelMissionResults: {
          "travel-day-14": {
            lessonId: "travel-day-14",
            completedAt: "2026-08-14T00:00:00.000Z",
            checks: {
              "first-sentence": "success",
              "short-response": "practice-more",
              "rescue-expression": "success"
            }
          }
        }
      }}
      onPersist={() => undefined}
      onStartLesson={() => undefined}
      onReturnHome={() => undefined}
    />
  );

  expect(screen.getByText("First sentence")).toBeInTheDocument();
  expect(screen.getAllByText("You did it").length).toBeGreaterThan(0);
  expect(screen.getByText("Practice more")).toBeInTheDocument();
  expect(screen.queryByText(/%/)).not.toBeInTheDocument();
});
```

- [ ] **Step 2: Run and verify failure**

Run: `npm test -- src/App.test.tsx`

Expected: FAIL until mission result rendering exists.

- [ ] **Step 3: Add i18n keys**

Add:

```ts
"travel.mission.title": "Travel mission",
"travel.mission.firstSentence": "First sentence",
"travel.mission.shortResponse": "Short response",
"travel.mission.rescueExpression": "Rescue expression",
"travel.mission.success": "You did it",
"travel.mission.practiceMore": "Practice more"
```

Add equivalents for all packs and a test that no value contains `%`.

- [ ] **Step 4: Render mission result panel**

In `ReviewScreen` or `HomeScreen`, create a small helper component:

```tsx
const TravelMissionResultPanel = ({ result, packId }: { result: TravelMissionResult; packId: CountryPackId }) => {
  const tr = createTranslator(packId);
  const labels: Record<TravelMissionCheckId, UiKey> = {
    "first-sentence": "travel.mission.firstSentence",
    "short-response": "travel.mission.shortResponse",
    "rescue-expression": "travel.mission.rescueExpression"
  };

  return (
    <Panel title={tr("travel.mission.title")}>
      <div className="summary-list">
        {Object.entries(result.checks).map(([id, value]) => (
          <div key={id} className="mission-row">
            <span>{tr(labels[id as TravelMissionCheckId])}</span>
            <strong>{value === "success" ? tr("travel.mission.success") : tr("travel.mission.practiceMore")}</strong>
          </div>
        ))}
      </div>
    </Panel>
  );
};
```

Render it when:

```tsx
state.activeCourseId === "travel" && state.travelMissionResults?.["travel-day-14"]
```

- [ ] **Step 5: Save mission result when Day 14 completes**

In `LessonScreen.advance`, when `lesson.id === "travel-day-14"` and `nextProgress.status === "completed"`, call `saveTravelMissionResult` with deterministic non-scored checks:

```ts
const missionResult = {
  lessonId: "travel-day-14",
  completedAt: new Date().toISOString(),
  checks: {
    "first-sentence": "success",
    "short-response": answeredCorrectly ? "success" : "practice-more",
    "rescue-expression": "success"
  }
} satisfies TravelMissionResult;
```

Then call `completeCourseRoute(nextState, "travel", missionResult.completedAt)` after all 14 Travel lessons are completed.

- [ ] **Step 6: Run tests**

Run:

```bash
npm test -- src/App.test.tsx src/services/storage.test.ts src/data/courses/travelLessons.test.ts
npm run typecheck
```

Expected: PASS.

- [ ] **Step 7: Commit this task**

```bash
git add src/App.tsx src/App.test.tsx src/i18n/ui.ts src/i18n/i18n.test.ts
git commit -m "feat: show travel mission results"
```

---

### Task 7: Audio, Offline Copy, and Mobile QA

**Files:**
- Modify: `src/data/audioCatalog.ts`
- Modify: `src/data/audioCatalog.test.ts`
- Modify: `scripts/qa/mobile-learning-flow.ts`
- Create: `docs/COURSE_GATE_1_TRAVEL_VERIFICATION.md`

**Interfaces:**
- Consumes: Travel lesson IDs/audio targets
- Produces: verified fallback audio contract and browser QA coverage

- [ ] **Step 1: Add audio contract test**

Append to `src/data/audioCatalog.test.ts`:

```ts
import { travelLessons } from "./courses/travelLessons";
import { findAudioSlot } from "./audioCatalog";

it("allows Travel lessons to use browser TTS fallback when static audio is absent", () => {
  for (const lesson of travelLessons) {
    for (const sentenceId of Object.keys(lesson.audioTargets)) {
      const slot = findAudioSlot(lesson.id, sentenceId);
      expect(slot?.fallback.type ?? "browser_speech_synthesis").toBe("browser_speech_synthesis");
    }
  }
});
```

- [ ] **Step 2: Run and verify behavior**

Run: `npm test -- src/data/audioCatalog.test.ts`

Expected: PASS if `findAudioSlot` already creates fallback slots. If it fails, update `findAudioSlot` to return a fallback slot for any known `travelLessons` audio target with:

```ts
usesTtsFallback: true,
sourceType: "browser_speech_synthesis",
provider: "browser_speech_synthesis",
replaceBeforeProduction: false
```

- [ ] **Step 3: Extend mobile QA script**

In `scripts/qa/mobile-learning-flow.ts`, add checks after home loads:

```ts
await page.getByRole("button", { name: /Change course|코스/ }).click();
await expect(page.getByText(/Korean Travel|여행/)).toBeVisible();
await page.getByText(/Korean Travel|여행/).click();
await expect(page.getByText(/Airport Arrival|공항/)).toBeVisible();
```

Run this for both 375px and 1280px paths if the script has viewport loops. Assert no console errors and no overlap failures using the script's existing helpers.

- [ ] **Step 4: Run full verification**

Run:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run supabase:validate
npm run qa:mobile
```

Expected: all PASS. Build may emit the existing Vite chunk-size warning, but it must exit 0.

- [ ] **Step 5: Write Gate 1 verification doc**

Create `docs/COURSE_GATE_1_TRAVEL_VERIFICATION.md`:

```md
# Course Gate 1 Travel Verification

Date: 2026-08-08

## Scope

Gate 1 added the independent 14-day Korean Travel course, locale approval gating, course selector routing, Travel progress/completion, Day 14 non-percentage mission checks, review scoping, and audio fallback/mobile QA coverage.

## Non-Goals

- No K-Culture lessons were added.
- No EPS lessons, questions, or scoring were added.
- No new bottom navigation item was added.
- No static Travel audio generation was performed.

## Verification

- `npm test`: PASS
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run build`: PASS
- `npm run supabase:validate`: PASS
- `npm run qa:mobile`: PASS

## Manual Risk Notes

- Travel uses browser TTS fallback where static reviewed audio is not present.
- Locale approval entries are internal approval markers until native review is completed.
- Vite may emit the existing main bundle size warning; build succeeds.
```

- [ ] **Step 6: Check git status and stage only Gate 1 files**

Run:

```bash
git status --short
git diff --check
```

Only stage files modified for Gate 1. Do not stage unrelated `.codebase-memory`, `.omc`, artifacts, or previous user changes unless they are intentionally part of this gate.

- [ ] **Step 7: Commit and push when cleanly separable**

If Gate 1 changes can be staged without including unrelated work:

```bash
git add src/types.ts src/data/courses/contentApproval.ts src/data/courses/contentApproval.test.ts src/data/courses/travelLessons.ts src/data/courses/travelLessons.test.ts src/data/courses/courseRegistry.ts src/engine/courseEngine.ts src/engine/courseEngine.test.ts src/engine/lessonEngine.ts src/engine/lessonEngine.test.ts src/services/storage.ts src/services/storage.test.ts src/App.tsx src/App.test.tsx src/i18n/ui.ts src/i18n/i18n.test.ts src/data/audioCatalog.ts src/data/audioCatalog.test.ts scripts/qa/mobile-learning-flow.ts docs/COURSE_GATE_1_TRAVEL_VERIFICATION.md
git commit -m "feat: add travel course gate one"
git push
```

If the same files contain unrelated dirty hunks, stop after verification and report that selective staging is required.

---

## Self-Review

**Spec coverage:** This plan covers Gate 1 Travel only: 14 namespaced lessons, approval manifest, existing lesson engine routing, course selector, Travel completion, Day 14 three behavior checks, audio fallback, mobile QA, and verification. It does not add K-Culture, EPS, or static audio generation.

**Placeholder scan:** No task uses deferred placeholders. The Travel lesson source is defined by a concrete 14-row content table, required lesson object fields, exact mission check IDs, and exact tests.

**Type consistency:** `TravelMissionCheckId`, `TravelMissionCheck`, `TravelMissionResult`, `travelLessons`, `getNextCourseLesson`, `completeCourseRoute`, and `saveTravelMissionResult` are introduced before later tasks consume them.

**Known caution for implementers:** Gate 0 and previous content/i18n changes are currently dirty in the worktree. Before staging, inspect `git diff -- <file>` for each touched file and preserve unrelated changes.
