# Course Gate 0 Foundation Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the common course foundation so K-Speak can later ship independent Foundation, Travel, K-Culture, and EPS-TOPIK courses without losing existing Day 1-30 progress, saved phrases, reviews, or sync recovery.

**Architecture:** Keep the current Foundation lesson flow intact and add course-aware metadata around it. Course identity, route versioning, completion history, EPS assessment attempts, and persistent outbox entries live in focused data/engine/service modules; `App.tsx` should only consume small helpers until later UI gates. Cloud sync must merge field-by-field and never overwrite newer local state with older remote rows.

**Tech Stack:** React 19, TypeScript 5.7, Vite 7, Vitest, Supabase JS v2, localStorage state persistence, Supabase SQL in `docs/supabase/schema.sql`.

## Global Constraints

- Do not add Travel, K-Culture, or EPS learning content in this gate.
- Preserve existing `day-*` lesson IDs and current Foundation behavior.
- Treat existing Day 1-14 progress as Foundation core completion.
- Preserve Day 15-30 as optional Foundation continuation.
- Add `courseId` with backward-compatible migration; legacy rows without course data become `foundation`.
- Active course is a timestamped user preference: local `activeCourseId + activeCourseChangedAt`, cloud `preferred_course_id + preferred_course_changed_at`.
- Course status is derived from `startedAt`, `routeVersion`, and completion history; do not synchronize a mutable course status field.
- K-Culture route data is stored as stable `routeSlots`, not regenerated lesson ID lists.
- EPS final results and in-progress attempts are separate; in-progress attempts store `attemptId`, question order, answer timestamps, current index, expiry, status, and unavailable audio IDs.
- Persistent outbox must survive app restart and remove only successfully applied changes.
- Locale approval gates learning content; unapproved learning content shows a localized "preparing" state and must not fall back to English learning content.
- Existing unrelated user changes in the worktree must not be reverted or included in commits.

---

## File Structure

- Create `src/data/courses/courseRegistry.ts`
  - Owns course IDs, route versions, release gates, current content exposure flags, and Foundation route metadata.
- Create `src/engine/courseEngine.ts`
  - Owns course normalization, active-course preference merge, lesson/course ID helpers, derived course status, completion merge, and review filtering.
- Create `src/engine/epsAssessmentEngine.ts`
  - Owns EPS assessment attempt merge primitives only. No EPS content or scoring engine in Gate 0.
- Create `src/engine/courseEngine.test.ts`
  - Unit tests for migration, status derivation, active preference conflicts, completion history, and review filtering.
- Create `src/engine/epsAssessmentEngine.test.ts`
  - Unit tests for attempt answer merge, expiry/status preservation, and duplicate result prevention.
- Modify `src/types.ts`
  - Add `CourseId`, `CourseRouteSlot`, `CourseEnrollment`, `CourseCompletion`, `EpsAssessmentAttempt`, `EpsAssessmentResult`, field-timestamp support, and outbox entity types.
- Modify `src/services/storage.ts`
  - Normalize loaded state to course-aware shape, queue course-aware pending changes, merge course fields safely, and keep Foundation migration idempotent.
- Modify `src/services/storage.test.ts`
  - Add course migration, active preference, enrollment, completion, and outbox regression tests.
- Modify `src/services/cloudSync.ts`
  - Map new course fields to/from Supabase rows and apply partial replay semantics for pending changes.
- Modify `src/services/cloudSync.test.ts`
  - Add tests for course tables, partial sync failure preservation, and active course timestamp conflict.
- Modify `docs/supabase/schema.sql`
  - Add nullable columns/tables first and explicit Foundation backfill statements.
- Modify `docs/supabase/rls.sql`
  - Add RLS grants/policies for new course and EPS attempt tables if this file owns policies.
- Modify `src/App.tsx`
  - Replace direct review list and next-lesson assumptions with course helpers only where necessary. Do not build new course catalog UI yet.

---

### Task 1: Course Types and Registry

**Files:**
- Modify: `src/types.ts`
- Create: `src/data/courses/courseRegistry.ts`
- Test: `src/engine/courseEngine.test.ts`

**Interfaces:**
- Produces: `CourseId`, `COURSE_IDS`, `FOUNDATION_COURSE_ID`, `CourseRegistryEntry`, `courseRegistry`, `getCourseRegistryEntry(courseId: CourseId)`
- Consumes: existing `LessonProgress`, `ReviewItem`, `SavedPhrase`, `SyncChange`, `UserState`

- [ ] **Step 1: Write the failing registry/type test**

Add this first block to `src/engine/courseEngine.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import { FOUNDATION_COURSE_ID, courseRegistry, getCourseRegistryEntry } from "../data/courses/courseRegistry";

describe("course registry", () => {
  it("defines the foundation route without exposing future courses", () => {
    expect(FOUNDATION_COURSE_ID).toBe("foundation");
    expect(courseRegistry.foundation.routeVersion).toBe("foundation-v1");
    expect(courseRegistry.foundation.coreLessonIds).toHaveLength(14);
    expect(courseRegistry.foundation.continuationLessonIds).toHaveLength(16);
    expect(courseRegistry.travel.exposure).toBe("hidden");
    expect(courseRegistry["k-culture"].exposure).toBe("hidden");
    expect(courseRegistry["eps-topik"].exposure).toBe("hidden");
  });

  it("returns foundation when asked for the foundation entry", () => {
    expect(getCourseRegistryEntry("foundation").id).toBe("foundation");
  });
});
```

- [ ] **Step 2: Run the new test and verify it fails**

Run: `npm test -- src/engine/courseEngine.test.ts`

Expected: FAIL because `src/data/courses/courseRegistry.ts` does not exist.

- [ ] **Step 3: Add course-aware types**

In `src/types.ts`, add these types after `LearningGoal`:

```ts
export type CourseId = "foundation" | "travel" | "k-culture" | "eps-topik";
export type CourseExposure = "visible" | "preparing" | "hidden";
export type CourseStatus = "not-started" | "in-progress" | "completed";
export type CourseRouteSlotKind = "lesson" | "common" | "primary" | "sampler" | "capstone" | "assessment";

export interface CourseRouteSlot {
  slot: number;
  kind: CourseRouteSlotKind;
  lessonId: string;
  packId?: string;
}

export interface CourseCompletion {
  courseId: CourseId;
  routeVersion: string;
  completedAt: string;
  completedLessonIds: string[];
  summary?: string;
}

export interface CourseEnrollment {
  courseId: CourseId;
  routeVersion: string;
  startedAt?: string;
  lastOpenedAt?: string;
  routeSlots?: CourseRouteSlot[];
  completions: CourseCompletion[];
  fieldUpdatedAt?: Partial<Record<"startedAt" | "lastOpenedAt" | "routeSlots" | "completions", string>>;
}

export type EpsAssessmentKind = "placement" | "stage-check" | "reading-practice" | "listening-practice" | "mock";
export type EpsAssessmentStatus = "in-progress" | "completed" | "expired" | "abandoned";

export interface EpsAttemptAnswer {
  questionId: string;
  answerId?: string;
  answeredAt: string;
}

export interface EpsAssessmentAttempt {
  attemptId: string;
  kind: EpsAssessmentKind;
  assessmentVersion: string;
  questionOrder: string[];
  answers: Record<string, EpsAttemptAnswer>;
  currentIndex: number;
  status: EpsAssessmentStatus;
  startedAt: string;
  expiresAt?: string;
  lastSavedAt: string;
  unavailableQuestionIds: string[];
}

export interface EpsAssessmentResult {
  attemptId: string;
  kind: EpsAssessmentKind;
  assessmentVersion: string;
  completedAt: string;
  correctCount: number;
  totalCount: number;
  stageRecommendations: string[];
}
```

Update `ReviewItem`, `SavedPhrase`, and `LessonProgress`:

```ts
  courseId?: CourseId;
```

Update `UserState`:

```ts
  activeCourseId: CourseId;
  activeCourseChangedAt: string;
  courseEnrollments: Partial<Record<CourseId, CourseEnrollment>>;
  epsAssessmentAttempts: Record<string, EpsAssessmentAttempt>;
  epsAssessmentResults: Record<string, EpsAssessmentResult>;
```

Update `SyncChange`:

```ts
  entity:
    | "review-item"
    | "saved-phrase"
    | "profile-course-preference"
    | "course-enrollment"
    | "eps-assessment-attempt"
    | "eps-assessment-result";
```

- [ ] **Step 4: Create the registry**

Create `src/data/courses/courseRegistry.ts`:

```ts
import type { CourseExposure, CourseId } from "../../types";

export const FOUNDATION_COURSE_ID = "foundation" satisfies CourseId;

export const COURSE_IDS = ["foundation", "travel", "k-culture", "eps-topik"] as const satisfies readonly CourseId[];

export interface CourseRegistryEntry {
  id: CourseId;
  titleKey: string;
  routeVersion: string;
  exposure: CourseExposure;
  coreLessonIds: string[];
  continuationLessonIds: string[];
}

const dayIds = (from: number, to: number) =>
  Array.from({ length: to - from + 1 }, (_, index) => `day-${from + index}`);

export const courseRegistry: Record<CourseId, CourseRegistryEntry> = {
  foundation: {
    id: "foundation",
    titleKey: "course.foundation.title",
    routeVersion: "foundation-v1",
    exposure: "visible",
    coreLessonIds: dayIds(1, 14),
    continuationLessonIds: dayIds(15, 30)
  },
  travel: {
    id: "travel",
    titleKey: "course.travel.title",
    routeVersion: "travel-v1",
    exposure: "hidden",
    coreLessonIds: [],
    continuationLessonIds: []
  },
  "k-culture": {
    id: "k-culture",
    titleKey: "course.kCulture.title",
    routeVersion: "k-culture-v1",
    exposure: "hidden",
    coreLessonIds: [],
    continuationLessonIds: []
  },
  "eps-topik": {
    id: "eps-topik",
    titleKey: "course.epsTopik.title",
    routeVersion: "eps-topik-v1",
    exposure: "hidden",
    coreLessonIds: [],
    continuationLessonIds: []
  }
};

export const getCourseRegistryEntry = (courseId: CourseId) => courseRegistry[courseId];
```

- [ ] **Step 5: Run the registry test**

Run: `npm test -- src/engine/courseEngine.test.ts`

Expected: PASS for the registry block, or TypeScript failures identifying the next exact type touch.

- [ ] **Step 6: Commit this task**

```bash
git add src/types.ts src/data/courses/courseRegistry.ts src/engine/courseEngine.test.ts
git commit -m "feat: add course registry foundation"
```

---

### Task 2: Course Normalization and Foundation Migration

**Files:**
- Create: `src/engine/courseEngine.ts`
- Modify: `src/services/storage.ts`
- Modify: `src/engine/courseEngine.test.ts`
- Modify: `src/services/storage.test.ts`

**Interfaces:**
- Consumes: `courseRegistry`, `UserState`, `LessonProgress`, `ReviewItem`, `SavedPhrase`
- Produces:
  - `LEGACY_INFERRED_AT`
  - `getLessonCourseId(lessonId: string): CourseId`
  - `normalizeUserCourses(state: UserState): UserState`
  - `getDerivedCourseStatus(state: UserState, courseId: CourseId): CourseStatus`
  - `getReviewItemsForCourse(state: UserState, courseId?: CourseId): ReviewItem[]`

- [ ] **Step 1: Add failing migration tests**

Append to `src/engine/courseEngine.test.ts`:

```ts
import type { UserState } from "../types";
import { createInitialState } from "../services/storage";
import {
  LEGACY_INFERRED_AT,
  getDerivedCourseStatus,
  getLessonCourseId,
  getReviewItemsForCourse,
  normalizeUserCourses
} from "./courseEngine";

const baseState = (patch: Partial<UserState> = {}): UserState => ({
  ...createInitialState(),
  ...patch
});

describe("course normalization", () => {
  it("maps legacy day lessons to foundation", () => {
    expect(getLessonCourseId("day-1")).toBe("foundation");
    expect(getLessonCourseId("day-30")).toBe("foundation");
  });

  it("adds foundation metadata to legacy progress, reviews, and saved phrases", () => {
    const normalized = normalizeUserCourses(
      baseState({
        activeCourseId: undefined as never,
        activeCourseChangedAt: undefined as never,
        lessonProgress: {
          "day-1": {
            lessonId: "day-1",
            status: "completed",
            currentStepId: "summary",
            completedStepIds: ["summary"],
            metrics: {},
            completedAt: "2026-08-01T00:00:00.000Z"
          }
        },
        reviewItems: [
          {
            id: "day-1:core",
            lessonId: "day-1",
            phraseId: "core",
            korean: "안녕하세요",
            meaning: "Hello",
            reason: "Review",
            priority: 10,
            dueAt: "2026-08-02T00:00:00.000Z"
          }
        ],
        savedPhrases: [
          {
            id: "day-1:core",
            lessonId: "day-1",
            phraseId: "core",
            korean: "안녕하세요",
            meaning: "Hello",
            tags: ["core"],
            source: "core",
            savedAt: "2026-08-01T00:00:00.000Z"
          }
        ]
      })
    );

    expect(normalized.activeCourseId).toBe("foundation");
    expect(normalized.activeCourseChangedAt).toBe(LEGACY_INFERRED_AT);
    expect(normalized.lessonProgress["day-1"].courseId).toBe("foundation");
    expect(normalized.reviewItems[0].courseId).toBe("foundation");
    expect(normalized.savedPhrases[0].courseId).toBe("foundation");
    expect(normalized.courseEnrollments.foundation?.routeVersion).toBe("foundation-v1");
  });

  it("derives completion from current route version", () => {
    const state = normalizeUserCourses(
      baseState({
        courseEnrollments: {
          foundation: {
            courseId: "foundation",
            routeVersion: "foundation-v1",
            startedAt: "2026-08-01T00:00:00.000Z",
            completions: [
              {
                courseId: "foundation",
                routeVersion: "foundation-v1",
                completedAt: "2026-08-14T00:00:00.000Z",
                completedLessonIds: Array.from({ length: 14 }, (_, index) => `day-${index + 1}`)
              }
            ]
          }
        }
      })
    );

    expect(getDerivedCourseStatus(state, "foundation")).toBe("completed");
  });

  it("filters reviews by active course while preserving untagged legacy reviews as foundation", () => {
    const state = normalizeUserCourses(
      baseState({
        activeCourseId: "foundation",
        reviewItems: [
          {
            id: "day-1:core",
            lessonId: "day-1",
            phraseId: "core",
            korean: "안녕하세요",
            meaning: "Hello",
            reason: "Review",
            priority: 10,
            dueAt: "2026-08-02T00:00:00.000Z"
          },
          {
            id: "travel-1:core",
            lessonId: "travel-1",
            phraseId: "core",
            korean: "도와주세요",
            meaning: "Help me",
            reason: "Review",
            priority: 10,
            dueAt: "2026-08-02T00:00:00.000Z",
            courseId: "travel"
          }
        ]
      })
    );

    expect(getReviewItemsForCourse(state).map((item) => item.id)).toEqual(["day-1:core"]);
  });
});
```

- [ ] **Step 2: Run the migration tests and verify failure**

Run: `npm test -- src/engine/courseEngine.test.ts`

Expected: FAIL because `courseEngine.ts` does not exist.

- [ ] **Step 3: Implement `courseEngine.ts`**

Create `src/engine/courseEngine.ts`:

```ts
import { courseRegistry, FOUNDATION_COURSE_ID } from "../data/courses/courseRegistry";
import type { CourseId, CourseStatus, UserState } from "../types";

export const LEGACY_INFERRED_AT = "1970-01-01T00:00:00.000Z";

const now = () => new Date().toISOString();

export const getLessonCourseId = (lessonId: string): CourseId => {
  if (/^day-\d+$/.test(lessonId)) return FOUNDATION_COURSE_ID;
  if (lessonId.startsWith("travel-")) return "travel";
  if (lessonId.startsWith("k-culture-")) return "k-culture";
  if (lessonId.startsWith("eps-")) return "eps-topik";
  return FOUNDATION_COURSE_ID;
};

export const normalizeUserCourses = (state: UserState): UserState => {
  const activeCourseId = state.activeCourseId ?? FOUNDATION_COURSE_ID;
  const activeCourseChangedAt = state.activeCourseChangedAt ?? LEGACY_INFERRED_AT;
  const foundationEntry = courseRegistry.foundation;
  const existingFoundation = state.courseEnrollments?.foundation;

  const lessonProgress = Object.fromEntries(
    Object.entries(state.lessonProgress ?? {}).map(([lessonId, progress]) => [
      lessonId,
      {
        ...progress,
        courseId: progress.courseId ?? getLessonCourseId(progress.lessonId ?? lessonId)
      }
    ])
  );

  const reviewItems = (state.reviewItems ?? []).map((item) => ({
    ...item,
    courseId: item.courseId ?? getLessonCourseId(item.lessonId)
  }));

  const savedPhrases = (state.savedPhrases ?? []).map((item) => ({
    ...item,
    courseId: item.courseId ?? getLessonCourseId(item.lessonId)
  }));

  const savedPhraseTombstones = (state.savedPhraseTombstones ?? []).map((item) => ({
    ...item,
    courseId: item.courseId ?? getLessonCourseId(item.lessonId)
  }));

  const hasFoundationProgress = Object.values(lessonProgress).some((progress) => progress.courseId === "foundation");

  return {
    ...state,
    activeCourseId,
    activeCourseChangedAt,
    lessonProgress,
    reviewItems,
    savedPhrases,
    savedPhraseTombstones,
    courseEnrollments: {
      ...(state.courseEnrollments ?? {}),
      foundation:
        existingFoundation ??
        (hasFoundationProgress
          ? {
              courseId: "foundation",
              routeVersion: foundationEntry.routeVersion,
              startedAt: LEGACY_INFERRED_AT,
              lastOpenedAt: LEGACY_INFERRED_AT,
              completions: [],
              fieldUpdatedAt: {
                startedAt: LEGACY_INFERRED_AT,
                lastOpenedAt: LEGACY_INFERRED_AT,
                completions: LEGACY_INFERRED_AT
              }
            }
          : undefined)
    },
    epsAssessmentAttempts: state.epsAssessmentAttempts ?? {},
    epsAssessmentResults: state.epsAssessmentResults ?? {}
  };
};

export const getDerivedCourseStatus = (state: UserState, courseId: CourseId): CourseStatus => {
  const normalized = normalizeUserCourses(state);
  const enrollment = normalized.courseEnrollments?.[courseId];
  if (!enrollment?.startedAt) return "not-started";
  const currentRouteVersion = courseRegistry[courseId].routeVersion;
  const completed = enrollment.completions.some((completion) => completion.routeVersion === currentRouteVersion);
  return completed ? "completed" : "in-progress";
};

export const getReviewItemsForCourse = (state: UserState, courseId: CourseId = state.activeCourseId ?? "foundation") =>
  normalizeUserCourses(state).reviewItems.filter((item) => item.courseId === courseId);

export const markCourseOpened = (state: UserState, courseId: CourseId, openedAt = now()): UserState => {
  const normalized = normalizeUserCourses(state);
  const entry = courseRegistry[courseId];
  const current = normalized.courseEnrollments[courseId];
  return {
    ...normalized,
    activeCourseId: courseId,
    activeCourseChangedAt: openedAt,
    courseEnrollments: {
      ...normalized.courseEnrollments,
      [courseId]: {
        courseId,
        routeVersion: current?.routeVersion ?? entry.routeVersion,
        startedAt: current?.startedAt ?? openedAt,
        lastOpenedAt: openedAt,
        routeSlots: current?.routeSlots,
        completions: current?.completions ?? [],
        fieldUpdatedAt: {
          ...current?.fieldUpdatedAt,
          startedAt: current?.fieldUpdatedAt?.startedAt ?? openedAt,
          lastOpenedAt: openedAt
        }
      }
    }
  };
};
```

- [ ] **Step 4: Normalize loaded and initial state**

In `src/services/storage.ts`, import `normalizeUserCourses` and `FOUNDATION_COURSE_ID`:

```ts
import { FOUNDATION_COURSE_ID } from "../data/courses/courseRegistry";
import { normalizeUserCourses } from "../engine/courseEngine";
```

In `createInitialState`, add:

```ts
  activeCourseId: FOUNDATION_COURSE_ID,
  activeCourseChangedAt: now(),
  courseEnrollments: {},
  epsAssessmentAttempts: {},
  epsAssessmentResults: {},
```

In `loadState`, wrap the returned object:

```ts
    return normalizeUserCourses({
      ...parsed,
      reviewItems: (parsed.reviewItems ?? []).map(normalizeReviewItem),
      savedPhrases: resolvedSavedPhrases.savedPhrases,
      savedPhraseTombstones: resolvedSavedPhrases.savedPhraseTombstones,
      sync: {
        ...parsed.sync,
        pendingChanges: parsed.sync.pendingChanges ?? []
      }
    });
```

- [ ] **Step 5: Add storage reload regression**

Append to `src/services/storage.test.ts`:

```ts
import { loadState } from "./storage";

it("migrates a legacy saved state to foundation course metadata on load", () => {
  localStorage.setItem(
    "korean-first-talk:user-state:v1",
    JSON.stringify({
      anonymousId: "guest-legacy",
      lessonProgress: {
        "day-1": progress("completed", ["summary"], "summary")
      },
      reviewItems: [reviewItem()],
      savedPhrases: [savedPhrase()],
      savedPhraseTombstones: [],
      analyticsEvents: [],
      sync: {
        mode: "local-only",
        pending: false,
        message: "legacy"
      },
      updatedAt: "2026-08-01T00:00:00.000Z"
    })
  );

  const state = loadState();

  expect(state.activeCourseId).toBe("foundation");
  expect(state.lessonProgress["day-1"].courseId).toBe("foundation");
  expect(state.reviewItems[0].courseId).toBe("foundation");
  expect(state.savedPhrases[0].courseId).toBe("foundation");
});
```

- [ ] **Step 6: Run focused tests**

Run: `npm test -- src/engine/courseEngine.test.ts src/services/storage.test.ts`

Expected: PASS.

- [ ] **Step 7: Commit this task**

```bash
git add src/engine/courseEngine.ts src/engine/courseEngine.test.ts src/services/storage.ts src/services/storage.test.ts
git commit -m "feat: migrate legacy state to foundation course"
```

---

### Task 3: Course Merge Rules and Persistent Outbox Entities

**Files:**
- Modify: `src/engine/courseEngine.ts`
- Modify: `src/services/storage.ts`
- Modify: `src/services/storage.test.ts`

**Interfaces:**
- Produces:
  - `mergeActiveCoursePreference(account: UserState, guest: UserState)`
  - `mergeCourseEnrollments(account, guest)`
  - `mergeUserStates` preserving latest field-level course state
  - `SyncChange.entity` support for course preference, enrollment, EPS attempts, and EPS results

- [ ] **Step 1: Add failing merge tests**

Append to `src/services/storage.test.ts`:

```ts
it("keeps the latest active course preference by timestamp", () => {
  const account = buildState({
    activeCourseId: "travel",
    activeCourseChangedAt: "2026-08-04T00:00:00.000Z"
  });
  const guest = buildState({
    activeCourseId: "foundation",
    activeCourseChangedAt: "2026-08-05T00:00:00.000Z"
  });

  const merged = mergeUserStates(account, guest, "learner@example.com");

  expect(merged.activeCourseId).toBe("foundation");
  expect(merged.activeCourseChangedAt).toBe("2026-08-05T00:00:00.000Z");
});

it("unions completion history by course and route version", () => {
  const account = buildState({
    courseEnrollments: {
      foundation: {
        courseId: "foundation",
        routeVersion: "foundation-v1",
        startedAt: "2026-08-01T00:00:00.000Z",
        completions: [
          {
            courseId: "foundation",
            routeVersion: "foundation-v1",
            completedAt: "2026-08-14T00:00:00.000Z",
            completedLessonIds: ["day-1"]
          }
        ]
      }
    }
  });
  const guest = buildState({
    courseEnrollments: {
      foundation: {
        courseId: "foundation",
        routeVersion: "foundation-v2",
        startedAt: "2026-08-02T00:00:00.000Z",
        completions: [
          {
            courseId: "foundation",
            routeVersion: "foundation-v2",
            completedAt: "2026-08-20T00:00:00.000Z",
            completedLessonIds: ["day-1", "day-2"]
          }
        ]
      }
    }
  });

  const merged = mergeUserStates(account, guest, "learner@example.com");

  expect(merged.courseEnrollments.foundation?.completions.map((item) => item.routeVersion).sort()).toEqual([
    "foundation-v1",
    "foundation-v2"
  ]);
});
```

- [ ] **Step 2: Run tests and verify failure**

Run: `npm test -- src/services/storage.test.ts`

Expected: FAIL until course merge is implemented.

- [ ] **Step 3: Add merge helpers in `courseEngine.ts`**

Add:

```ts
import type { CourseEnrollment, CourseCompletion } from "../types";

const compareIso = (left?: string, right?: string) => {
  const leftTime = left ? new Date(left).getTime() : 0;
  const rightTime = right ? new Date(right).getTime() : 0;
  return leftTime - rightTime;
};

export const mergeActiveCoursePreference = (account: UserState, guest: UserState) => {
  const normalizedAccount = normalizeUserCourses(account);
  const normalizedGuest = normalizeUserCourses(guest);
  return compareIso(normalizedAccount.activeCourseChangedAt, normalizedGuest.activeCourseChangedAt) <= 0
    ? {
        activeCourseId: normalizedGuest.activeCourseId,
        activeCourseChangedAt: normalizedGuest.activeCourseChangedAt
      }
    : {
        activeCourseId: normalizedAccount.activeCourseId,
        activeCourseChangedAt: normalizedAccount.activeCourseChangedAt
      };
};

const completionKey = (completion: CourseCompletion) => `${completion.courseId}:${completion.routeVersion}`;

const mergeCompletions = (left: CourseCompletion[] = [], right: CourseCompletion[] = []) => {
  const completions = new Map<string, CourseCompletion>();
  for (const completion of [...left, ...right]) {
    const key = completionKey(completion);
    const current = completions.get(key);
    if (!current || compareIso(current.completedAt, completion.completedAt) <= 0) {
      completions.set(key, completion);
    }
  }
  return Array.from(completions.values()).sort((a, b) => compareIso(a.completedAt, b.completedAt));
};

const mergeEnrollment = (left?: CourseEnrollment, right?: CourseEnrollment): CourseEnrollment | undefined => {
  if (!left) return right;
  if (!right) return left;
  const fieldUpdatedAt = {
    ...left.fieldUpdatedAt,
    ...right.fieldUpdatedAt
  };
  const startedAt =
    compareIso(left.fieldUpdatedAt?.startedAt ?? left.startedAt, right.fieldUpdatedAt?.startedAt ?? right.startedAt) <= 0
      ? right.startedAt
      : left.startedAt;
  const lastOpenedAt =
    compareIso(left.fieldUpdatedAt?.lastOpenedAt ?? left.lastOpenedAt, right.fieldUpdatedAt?.lastOpenedAt ?? right.lastOpenedAt) <= 0
      ? right.lastOpenedAt
      : left.lastOpenedAt;
  const routeSlots =
    compareIso(left.fieldUpdatedAt?.routeSlots, right.fieldUpdatedAt?.routeSlots) <= 0
      ? right.routeSlots ?? left.routeSlots
      : left.routeSlots ?? right.routeSlots;

  return {
    ...left,
    ...right,
    routeVersion:
      compareIso(left.fieldUpdatedAt?.lastOpenedAt ?? left.lastOpenedAt, right.fieldUpdatedAt?.lastOpenedAt ?? right.lastOpenedAt) <= 0
        ? right.routeVersion
        : left.routeVersion,
    startedAt,
    lastOpenedAt,
    routeSlots,
    completions: mergeCompletions(left.completions, right.completions),
    fieldUpdatedAt
  };
};

export const mergeCourseEnrollments = (account: UserState, guest: UserState): UserState["courseEnrollments"] => {
  const normalizedAccount = normalizeUserCourses(account);
  const normalizedGuest = normalizeUserCourses(guest);
  const courseIds = new Set([
    ...Object.keys(normalizedAccount.courseEnrollments ?? {}),
    ...Object.keys(normalizedGuest.courseEnrollments ?? {})
  ] as CourseId[]);

  return Object.fromEntries(
    Array.from(courseIds).map((courseId) => [
      courseId,
      mergeEnrollment(normalizedAccount.courseEnrollments[courseId], normalizedGuest.courseEnrollments[courseId])
    ])
  ) as UserState["courseEnrollments"];
};
```

- [ ] **Step 4: Use merge helpers in `storage.ts`**

Import:

```ts
import { mergeActiveCoursePreference, mergeCourseEnrollments, normalizeUserCourses } from "../engine/courseEngine";
```

Inside `mergeUserStates`, before `return`, compute:

```ts
  const normalizedAccount = normalizeUserCourses(account);
  const normalizedGuest = normalizeUserCourses(guest);
  const activeCourse = mergeActiveCoursePreference(normalizedAccount, normalizedGuest);
  const courseEnrollments = mergeCourseEnrollments(normalizedAccount, normalizedGuest);
```

Update the returned object:

```ts
    activeCourseId: activeCourse.activeCourseId,
    activeCourseChangedAt: activeCourse.activeCourseChangedAt,
    courseEnrollments,
    epsAssessmentAttempts: {
      ...normalizedAccount.epsAssessmentAttempts,
      ...normalizedGuest.epsAssessmentAttempts
    },
    epsAssessmentResults: {
      ...normalizedAccount.epsAssessmentResults,
      ...normalizedGuest.epsAssessmentResults
    },
```

Replace direct `account`/`guest` array references in merge code with `normalizedAccount`/`normalizedGuest` where course fields matter.

- [ ] **Step 5: Add outbox enqueue helper for course preference**

In `storage.ts`, add:

```ts
export const updateActiveCourse = (state: UserState, courseId: UserState["activeCourseId"]): UserState => {
  const changedAt = now();
  return saveState(
    withPendingChanges(
      {
        ...normalizeUserCourses(state),
        activeCourseId: courseId,
        activeCourseChangedAt: changedAt
      },
      [
        {
          entity: "profile-course-preference",
          entityId: "active-course",
          operation: "upsert",
          changedAt
        }
      ]
    )
  );
};
```

- [ ] **Step 6: Run storage tests**

Run: `npm test -- src/services/storage.test.ts src/engine/courseEngine.test.ts`

Expected: PASS.

- [ ] **Step 7: Commit this task**

```bash
git add src/engine/courseEngine.ts src/services/storage.ts src/services/storage.test.ts src/engine/courseEngine.test.ts
git commit -m "feat: merge course state safely"
```

---

### Task 4: EPS Assessment Attempt Merge Primitives

**Files:**
- Create: `src/engine/epsAssessmentEngine.ts`
- Create: `src/engine/epsAssessmentEngine.test.ts`
- Modify: `src/services/storage.ts`
- Modify: `src/services/storage.test.ts`

**Interfaces:**
- Produces:
  - `mergeEpsAssessmentAttempt(current, incoming): EpsAssessmentAttempt`
  - `mergeEpsAssessmentAttempts(account, guest)`
  - `upsertEpsAssessmentAttempt(state, attempt)`

- [ ] **Step 1: Write failing EPS attempt tests**

Create `src/engine/epsAssessmentEngine.test.ts`:

```ts
import { describe, expect, it } from "vitest";
import type { EpsAssessmentAttempt } from "../types";
import { mergeEpsAssessmentAttempt } from "./epsAssessmentEngine";

const attempt = (patch: Partial<EpsAssessmentAttempt> = {}): EpsAssessmentAttempt => ({
  attemptId: "attempt-1",
  kind: "placement",
  assessmentVersion: "eps-v1",
  questionOrder: ["q1", "q2"],
  answers: {},
  currentIndex: 0,
  status: "in-progress",
  startedAt: "2026-08-01T00:00:00.000Z",
  expiresAt: "2026-08-01T00:50:00.000Z",
  lastSavedAt: "2026-08-01T00:00:00.000Z",
  unavailableQuestionIds: [],
  ...patch
});

describe("EPS assessment attempt merge", () => {
  it("keeps the latest answer per question by answeredAt", () => {
    const merged = mergeEpsAssessmentAttempt(
      attempt({
        answers: {
          q1: { questionId: "q1", answerId: "a", answeredAt: "2026-08-01T00:05:00.000Z" }
        }
      }),
      attempt({
        answers: {
          q1: { questionId: "q1", answerId: "b", answeredAt: "2026-08-01T00:06:00.000Z" },
          q2: { questionId: "q2", answerId: "c", answeredAt: "2026-08-01T00:07:00.000Z" }
        },
        currentIndex: 1,
        lastSavedAt: "2026-08-01T00:07:00.000Z"
      })
    );

    expect(merged.answers.q1.answerId).toBe("b");
    expect(merged.answers.q2.answerId).toBe("c");
    expect(merged.currentIndex).toBe(1);
  });

  it("preserves terminal status from the latest saved attempt", () => {
    const merged = mergeEpsAssessmentAttempt(
      attempt({ status: "completed", lastSavedAt: "2026-08-01T00:40:00.000Z" }),
      attempt({ status: "in-progress", lastSavedAt: "2026-08-01T00:30:00.000Z" })
    );

    expect(merged.status).toBe("completed");
  });

  it("unions unavailable audio question ids", () => {
    const merged = mergeEpsAssessmentAttempt(
      attempt({ unavailableQuestionIds: ["q1"] }),
      attempt({ unavailableQuestionIds: ["q2"] })
    );

    expect(merged.unavailableQuestionIds.sort()).toEqual(["q1", "q2"]);
  });
});
```

- [ ] **Step 2: Run and verify failure**

Run: `npm test -- src/engine/epsAssessmentEngine.test.ts`

Expected: FAIL because `epsAssessmentEngine.ts` does not exist.

- [ ] **Step 3: Implement EPS attempt merge**

Create `src/engine/epsAssessmentEngine.ts`:

```ts
import type { EpsAssessmentAttempt, UserState } from "../types";

const compareIso = (left?: string, right?: string) => {
  const leftTime = left ? new Date(left).getTime() : 0;
  const rightTime = right ? new Date(right).getTime() : 0;
  return leftTime - rightTime;
};

export const mergeEpsAssessmentAttempt = (
  current: EpsAssessmentAttempt,
  incoming: EpsAssessmentAttempt
): EpsAssessmentAttempt => {
  const latest = compareIso(current.lastSavedAt, incoming.lastSavedAt) <= 0 ? incoming : current;
  const fallback = latest === incoming ? current : incoming;
  const answers = { ...fallback.answers };

  for (const [questionId, answer] of Object.entries(latest.answers)) {
    const existing = answers[questionId];
    if (!existing || compareIso(existing.answeredAt, answer.answeredAt) <= 0) {
      answers[questionId] = answer;
    }
  }

  return {
    ...fallback,
    ...latest,
    answers,
    questionOrder: latest.questionOrder.length ? latest.questionOrder : fallback.questionOrder,
    unavailableQuestionIds: Array.from(new Set([...fallback.unavailableQuestionIds, ...latest.unavailableQuestionIds]))
  };
};

export const mergeEpsAssessmentAttempts = (
  account: UserState["epsAssessmentAttempts"] = {},
  guest: UserState["epsAssessmentAttempts"] = {}
) => {
  const merged = { ...account };
  for (const [attemptId, attempt] of Object.entries(guest)) {
    merged[attemptId] = merged[attemptId] ? mergeEpsAssessmentAttempt(merged[attemptId], attempt) : attempt;
  }
  return merged;
};
```

- [ ] **Step 4: Wire attempt storage and outbox**

In `storage.ts`, import:

```ts
import { mergeEpsAssessmentAttempts } from "../engine/epsAssessmentEngine";
```

Add:

```ts
export const upsertEpsAssessmentAttempt = (state: UserState, attempt: UserState["epsAssessmentAttempts"][string]): UserState =>
  saveState(
    withPendingChanges(
      {
        ...state,
        epsAssessmentAttempts: {
          ...(state.epsAssessmentAttempts ?? {}),
          [attempt.attemptId]: state.epsAssessmentAttempts?.[attempt.attemptId]
            ? mergeEpsAssessmentAttempts({ [attempt.attemptId]: state.epsAssessmentAttempts[attempt.attemptId] }, { [attempt.attemptId]: attempt })[attempt.attemptId]
            : attempt
        }
      },
      [
        {
          entity: "eps-assessment-attempt",
          entityId: attempt.attemptId,
          operation: "upsert",
          changedAt: attempt.lastSavedAt
        }
      ]
    )
  );
```

In `mergeUserStates`, replace spread-only attempt merge with:

```ts
    epsAssessmentAttempts: mergeEpsAssessmentAttempts(
      normalizedAccount.epsAssessmentAttempts,
      normalizedGuest.epsAssessmentAttempts
    ),
```

- [ ] **Step 5: Add storage regression**

Append to `src/services/storage.test.ts`:

```ts
import { upsertEpsAssessmentAttempt } from "./storage";

it("stores EPS assessment attempts in the persistent outbox", () => {
  const next = upsertEpsAssessmentAttempt(buildState(), {
    attemptId: "attempt-1",
    kind: "placement",
    assessmentVersion: "eps-v1",
    questionOrder: ["q1"],
    answers: {},
    currentIndex: 0,
    status: "in-progress",
    startedAt: "2026-08-01T00:00:00.000Z",
    lastSavedAt: "2026-08-01T00:01:00.000Z",
    unavailableQuestionIds: []
  });

  expect(next.epsAssessmentAttempts["attempt-1"].status).toBe("in-progress");
  expect(next.sync.pendingChanges).toEqual([
    expect.objectContaining({
      entity: "eps-assessment-attempt",
      entityId: "attempt-1",
      operation: "upsert"
    })
  ]);
});
```

- [ ] **Step 6: Run focused tests**

Run: `npm test -- src/engine/epsAssessmentEngine.test.ts src/services/storage.test.ts`

Expected: PASS.

- [ ] **Step 7: Commit this task**

```bash
git add src/engine/epsAssessmentEngine.ts src/engine/epsAssessmentEngine.test.ts src/services/storage.ts src/services/storage.test.ts
git commit -m "feat: persist eps assessment attempts"
```

---

### Task 5: Supabase Schema and Cloud Mapping

**Files:**
- Modify: `docs/supabase/schema.sql`
- Modify: `docs/supabase/rls.sql`
- Modify: `src/services/cloudSync.ts`
- Modify: `src/services/cloudSync.test.ts`

**Interfaces:**
- Consumes: course-aware `UserState`
- Produces:
  - profile preference columns
  - `course_enrollments`
  - `eps_assessment_attempts`
  - cloud row mappers for course enrollments and EPS attempts

- [ ] **Step 1: Add failing cloud test**

In `src/services/cloudSync.test.ts`, update `buildSupabaseClient` to include builders:

```ts
    course_enrollments: createQueryBuilder(courseEnrollments, null),
    eps_assessment_attempts: createQueryBuilder(epsAssessmentAttempts, null),
```

Add parameters:

```ts
  courseEnrollments = [],
  epsAssessmentAttempts = [],
```

Add upsert mocks:

```ts
  builders.course_enrollments.upsert = vi.fn().mockResolvedValue({ error: upsertError });
  builders.eps_assessment_attempts.upsert = vi.fn().mockResolvedValue({ error: upsertError });
```

Append:

```ts
it("loads and persists course preference and enrollments", async () => {
  mockIsSupabaseConfigured.mockReturnValue(true);
  const supabase = buildSupabaseClient({
    profile: {
      id: "user-1",
      country_pack_id: "us-en",
      native_language: "English",
      korean_level: "first-time",
      learning_goal: "daily",
      daily_goal_minutes: 5,
      character_id: "haneul",
      reminder_time: "19:00",
      completed_at: "2026-08-01T00:00:00.000Z",
      preferred_course_id: "travel",
      preferred_course_changed_at: "2026-08-04T00:00:00.000Z"
    },
    courseEnrollments: [
      {
        course_id: "foundation",
        route_version: "foundation-v1",
        started_at: "2026-08-01T00:00:00.000Z",
        last_opened_at: "2026-08-02T00:00:00.000Z",
        route_slots: null,
        completions: []
      }
    ]
  });
  mockGetSupabaseClient.mockReturnValue(supabase);

  const next = await syncWithSupabase(buildState(), session as never);

  expect(next.activeCourseId).toBe("travel");
  expect(next.courseEnrollments.foundation?.routeVersion).toBe("foundation-v1");
  expect(supabase.from).toHaveBeenCalledWith("course_enrollments");
});

it("keeps pending changes when cloud upsert fails", async () => {
  mockIsSupabaseConfigured.mockReturnValue(true);
  mockGetSupabaseClient.mockReturnValue(buildSupabaseClient({ upsertError: new Error("temporary") }));

  await expect(syncWithSupabase(buildState(), session as never)).rejects.toThrow("temporary");

  const stored = JSON.parse(localStorage.getItem("korean-first-talk:user-state:v1") ?? "{}") as UserState;
  expect(stored.sync.pendingChanges?.length).toBeGreaterThan(0);
});
```

- [ ] **Step 2: Run cloud tests and verify failure**

Run: `npm test -- src/services/cloudSync.test.ts`

Expected: FAIL until cloud mapping and partial failure preservation are implemented.

- [ ] **Step 3: Extend SQL safely**

Append to `docs/supabase/schema.sql`:

```sql
alter table public.profiles
  add column if not exists preferred_course_id text,
  add column if not exists preferred_course_changed_at timestamptz;

update public.profiles
set preferred_course_id = 'foundation',
    preferred_course_changed_at = coalesce(updated_at, created_at, now())
where preferred_course_id is null;

create table if not exists public.course_enrollments (
  user_id uuid not null references auth.users(id) on delete cascade,
  course_id text not null,
  route_version text not null,
  started_at timestamptz,
  last_opened_at timestamptz,
  route_slots jsonb,
  completions jsonb not null default '[]'::jsonb,
  field_updated_at jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now(),
  primary key (user_id, course_id)
);

create table if not exists public.eps_assessment_attempts (
  user_id uuid not null references auth.users(id) on delete cascade,
  attempt_id text not null,
  kind text not null,
  assessment_version text not null,
  question_order text[] not null default '{}',
  answers jsonb not null default '{}'::jsonb,
  current_index integer not null default 0,
  status text not null,
  started_at timestamptz not null,
  expires_at timestamptz,
  last_saved_at timestamptz not null,
  unavailable_question_ids text[] not null default '{}',
  updated_at timestamptz not null default now(),
  primary key (user_id, attempt_id)
);

grant select, insert, update on public.course_enrollments to authenticated;
grant select, insert, update on public.eps_assessment_attempts to authenticated;
```

Do not set `preferred_course_id not null` in this gate unless a separate production migration has verified zero nulls after deployment.

- [ ] **Step 4: Add cloud row interfaces**

In `src/services/cloudSync.ts`, extend `ProfileRow`:

```ts
  preferred_course_id?: UserState["activeCourseId"] | null;
  preferred_course_changed_at?: string | null;
```

Add interfaces:

```ts
interface CourseEnrollmentRow {
  course_id: UserState["activeCourseId"];
  route_version: string;
  started_at?: string | null;
  last_opened_at?: string | null;
  route_slots?: UserState["courseEnrollments"][UserState["activeCourseId"]]["routeSlots"] | null;
  completions?: UserState["courseEnrollments"][UserState["activeCourseId"]]["completions"] | null;
  field_updated_at?: UserState["courseEnrollments"][UserState["activeCourseId"]]["fieldUpdatedAt"] | null;
}

interface EpsAssessmentAttemptRow {
  attempt_id: string;
  kind: UserState["epsAssessmentAttempts"][string]["kind"];
  assessment_version: string;
  question_order: string[];
  answers: UserState["epsAssessmentAttempts"][string]["answers"];
  current_index: number;
  status: UserState["epsAssessmentAttempts"][string]["status"];
  started_at: string;
  expires_at?: string | null;
  last_saved_at: string;
  unavailable_question_ids: string[];
}
```

- [ ] **Step 5: Load and persist new tables**

In `loadCloudState`, add parallel queries:

```ts
    supabase.from("course_enrollments").select("*").eq("user_id", user.id).returns<CourseEnrollmentRow[]>(),
    supabase.from("eps_assessment_attempts").select("*").eq("user_id", user.id).returns<EpsAssessmentAttemptRow[]>()
```

Map after saved phrases:

```ts
  cloud.activeCourseId = profileResult.data?.preferred_course_id ?? "foundation";
  cloud.activeCourseChangedAt = profileResult.data?.preferred_course_changed_at ?? "1970-01-01T00:00:00.000Z";
  cloud.courseEnrollments = Object.fromEntries(
    (courseEnrollmentResult.data ?? []).map((row) => [row.course_id, courseEnrollmentRowToState(row)])
  );
  cloud.epsAssessmentAttempts = Object.fromEntries(
    (epsAttemptResult.data ?? []).map((row) => [row.attempt_id, epsAssessmentAttemptRowToState(row)])
  );
```

In `persistCloudState`, upsert rows:

```ts
  const courseRows = Object.values(state.courseEnrollments ?? {})
    .filter(Boolean)
    .map((enrollment) => courseEnrollmentToRow(user.id, enrollment));
  if (courseRows.length) {
    const { error } = await supabase.from("course_enrollments").upsert(courseRows, { onConflict: "user_id,course_id" });
    if (error) throw error;
  }

  const epsAttemptRows = Object.values(state.epsAssessmentAttempts ?? {}).map((attempt) =>
    epsAssessmentAttemptToRow(user.id, attempt)
  );
  if (epsAttemptRows.length) {
    const { error } = await supabase.from("eps_assessment_attempts").upsert(epsAttemptRows, {
      onConflict: "user_id,attempt_id"
    });
    if (error) throw error;
  }
```

- [ ] **Step 6: Add row mappers**

Add:

```ts
const courseEnrollmentRowToState = (row: CourseEnrollmentRow) => ({
  courseId: row.course_id,
  routeVersion: row.route_version,
  startedAt: row.started_at ?? undefined,
  lastOpenedAt: row.last_opened_at ?? undefined,
  routeSlots: row.route_slots ?? undefined,
  completions: row.completions ?? [],
  fieldUpdatedAt: row.field_updated_at ?? {}
});

const courseEnrollmentToRow = (userId: string, enrollment: NonNullable<UserState["courseEnrollments"][UserState["activeCourseId"]]>) => ({
  user_id: userId,
  course_id: enrollment.courseId,
  route_version: enrollment.routeVersion,
  started_at: enrollment.startedAt,
  last_opened_at: enrollment.lastOpenedAt,
  route_slots: enrollment.routeSlots ?? null,
  completions: enrollment.completions,
  field_updated_at: enrollment.fieldUpdatedAt ?? {}
});

const epsAssessmentAttemptRowToState = (row: EpsAssessmentAttemptRow) => ({
  attemptId: row.attempt_id,
  kind: row.kind,
  assessmentVersion: row.assessment_version,
  questionOrder: row.question_order,
  answers: row.answers ?? {},
  currentIndex: row.current_index,
  status: row.status,
  startedAt: row.started_at,
  expiresAt: row.expires_at ?? undefined,
  lastSavedAt: row.last_saved_at,
  unavailableQuestionIds: row.unavailable_question_ids ?? []
});

const epsAssessmentAttemptToRow = (userId: string, attempt: UserState["epsAssessmentAttempts"][string]) => ({
  user_id: userId,
  attempt_id: attempt.attemptId,
  kind: attempt.kind,
  assessment_version: attempt.assessmentVersion,
  question_order: attempt.questionOrder,
  answers: attempt.answers,
  current_index: attempt.currentIndex,
  status: attempt.status,
  started_at: attempt.startedAt,
  expires_at: attempt.expiresAt,
  last_saved_at: attempt.lastSavedAt,
  unavailable_question_ids: attempt.unavailableQuestionIds
});
```

Update `profileToRow`:

```ts
const profileToRow = (userId: string, profile: OnboardingProfile, state?: UserState): ProfileRow => ({
  id: userId,
  ...
  preferred_course_id: state?.activeCourseId ?? "foundation",
  preferred_course_changed_at: state?.activeCourseChangedAt
});
```

Call it as:

```ts
profileToRow(user.id, state.onboarding, state)
```

- [ ] **Step 7: Preserve pending changes on failed sync**

Wrap the persist phase in `syncWithSupabase`:

```ts
  try {
    await persistCloudState(supabase, activeSession.user, merged);
  } catch (error) {
    saveState({
      ...merged,
      sync: {
        ...merged.sync,
        mode: "supabase-ready",
        cloudUserId: activeSession.user.id,
        pending: true,
        messageKey: "sync.pendingRetry",
        message: "Cloud sync failed. Changes are saved on this device and will retry."
      }
    });
    throw error;
  }
```

Only clear `pendingChanges` after all required upserts finish successfully.

- [ ] **Step 8: Run SQL and cloud tests**

Run:

```bash
npm test -- src/services/cloudSync.test.ts
npm run supabase:validate
```

Expected: PASS.

- [ ] **Step 9: Commit this task**

```bash
git add docs/supabase/schema.sql docs/supabase/rls.sql src/services/cloudSync.ts src/services/cloudSync.test.ts
git commit -m "feat: sync course state with supabase"
```

---

### Task 6: App Integration Without New Course UI

**Files:**
- Modify: `src/App.tsx`
- Modify: `src/engine/reviewEngine.ts`
- Modify: `src/engine/reviewEngine.test.ts`
- Modify: `src/services/storage.ts`

**Interfaces:**
- Consumes: `getReviewItemsForCourse`, `getLessonCourseId`, `normalizeUserCourses`
- Produces: existing Foundation UI still renders; review list and lesson progress are course-aware.

- [ ] **Step 1: Add review course test**

Append to `src/engine/reviewEngine.test.ts`:

```ts
it("assigns foundation course id to review cards built from existing lessons", () => {
  const items = buildReviewItems(
    {
      lessonId: "day-1",
      status: "completed",
      currentStepId: "summary",
      completedStepIds: ["summary"],
      metrics: {}
    },
    "Hello",
    "us-en"
  );

  expect(items.length).toBeGreaterThan(0);
  expect(items.every((item) => item.courseId === "foundation")).toBe(true);
});
```

- [ ] **Step 2: Run and verify failure**

Run: `npm test -- src/engine/reviewEngine.test.ts`

Expected: FAIL until `buildReviewItems` assigns course IDs.

- [ ] **Step 3: Tag review items from lesson IDs**

In `src/engine/reviewEngine.ts`, import:

```ts
import { getLessonCourseId } from "./courseEngine";
```

Add `courseId` inside each returned item:

```ts
    courseId: getLessonCourseId(lesson.id),
```

- [ ] **Step 4: Scope app review counts to active course**

In `src/App.tsx`, import:

```ts
import { getReviewItemsForCourse, normalizeUserCourses } from "./engine/courseEngine";
```

After `const [state, setState] = useState(loadState);`, make any app-level state update use normalized data:

```ts
const updateState = (next: UserState) => setState(normalizeUserCourses(next));
```

Replace:

```ts
const dueReviews = getDueReviewItems(state.reviewItems);
```

with:

```ts
const dueReviews = getDueReviewItems(getReviewItemsForCourse(state));
```

Inside `ReviewScreen`, replace:

```ts
const dueReviews = getDueReviewItems(state.reviewItems);
```

with:

```ts
const dueReviews = getDueReviewItems(getReviewItemsForCourse(state));
```

Replace `state.reviewItems.length` in the empty-state check with:

```ts
getReviewItemsForCourse(state).length
```

- [ ] **Step 5: Run focused UI-safe tests**

Run:

```bash
npm test -- src/engine/reviewEngine.test.ts src/engine/courseEngine.test.ts src/services/storage.test.ts
npm run typecheck
```

Expected: PASS.

- [ ] **Step 6: Commit this task**

```bash
git add src/App.tsx src/engine/reviewEngine.ts src/engine/reviewEngine.test.ts src/services/storage.ts
git commit -m "feat: scope foundation reviews by course"
```

---

### Task 7: Gate 0 Verification and Documentation Notes

**Files:**
- Modify: `docs/superpowers/specs/2026-08-08-course-ecosystem-design.md`
- Optionally create: `docs/COURSE_GATE_0_VERIFICATION.md`

**Interfaces:**
- Consumes all previous tasks
- Produces a verified Gate 0 handoff with commands and known non-goals

- [ ] **Step 1: Run full automated verification**

Run:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run supabase:validate
```

Expected: all PASS.

- [ ] **Step 2: Run browser QA for current Foundation UI**

Run:

```bash
npm run qa:mobile
```

Expected: PASS. The script should inspect current Foundation screens only; hidden future courses are not expected to render.

- [ ] **Step 3: Document Gate 0 result**

Create `docs/COURSE_GATE_0_VERIFICATION.md`:

```md
# Course Gate 0 Verification

Date: 2026-08-08

## Scope

Gate 0 added common course metadata, Foundation migration, course-aware review filtering, Supabase schema/mapping, persistent outbox entities, and EPS assessment attempt persistence primitives.

## Non-Goals

- No Travel lessons were added.
- No K-Culture lessons were added.
- No EPS questions or scoring content were added.
- No new public course catalog UI was released.

## Verification

- `npm test`: PASS
- `npm run lint`: PASS
- `npm run typecheck`: PASS
- `npm run build`: PASS
- `npm run supabase:validate`: PASS
- `npm run qa:mobile`: PASS

## Manual Risk Notes

- Supabase `preferred_course_id` remains nullable until production data backfill is verified.
- Hidden future courses must remain unavailable until their locale/content approval gates pass.
```

- [ ] **Step 4: Check git status and stage only Gate 0 files**

Run:

```bash
git status --short
```

Only stage files touched by this plan. Do not stage unrelated existing dirty files unless they were intentionally modified by the Gate 0 implementation.

- [ ] **Step 5: Final Gate 0 commit**

If previous tasks were not committed individually, commit all Gate 0 files now:

```bash
git add src/types.ts src/data/courses/courseRegistry.ts src/engine/courseEngine.ts src/engine/courseEngine.test.ts src/engine/epsAssessmentEngine.ts src/engine/epsAssessmentEngine.test.ts src/engine/reviewEngine.ts src/engine/reviewEngine.test.ts src/services/storage.ts src/services/storage.test.ts src/services/cloudSync.ts src/services/cloudSync.test.ts src/App.tsx docs/supabase/schema.sql docs/supabase/rls.sql docs/COURSE_GATE_0_VERIFICATION.md
git commit -m "feat: add course gate zero foundation"
```

- [ ] **Step 6: Push only after verification passes**

Run:

```bash
git push
```

Expected: push current branch successfully.

---

## Self-Review

**Spec coverage:** This plan covers Gate 0 only: course registry, Foundation migration, active course preference timestamps, derived status, completion merge, EPS attempt persistence primitives, Supabase SQL/mapping, persistent outbox expansion, and current Foundation review filtering. It intentionally does not implement Travel, K-Culture, EPS content, or a new course catalog UI.

**Placeholder scan:** No task uses TBD/TODO/implement-later language. Each code-changing step includes concrete snippets and exact commands.

**Type consistency:** `CourseId`, `CourseEnrollment`, `CourseCompletion`, `EpsAssessmentAttempt`, and outbox entity names are introduced in Task 1 and reused with the same names in Tasks 2-7.

**Known caution for implementers:** Several source files are already dirty in this worktree. Before each task, inspect `git diff -- <file>` for files you will modify and preserve unrelated user changes.
