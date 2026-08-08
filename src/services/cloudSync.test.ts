import { beforeEach, describe, expect, it, vi } from "vitest";
import type { UserState } from "../types";
import { createCultureRoute } from "../engine/culturePathEngine";
import { createInitialState } from "./storage";

const {
  mockGetSupabaseClient,
  mockIsSupabaseConfigured
} = vi.hoisted(() => ({
  mockGetSupabaseClient: vi.fn(),
  mockIsSupabaseConfigured: vi.fn()
}));

vi.mock("./supabaseClient", () => ({
  getSupabaseClient: mockGetSupabaseClient,
  isSupabaseConfigured: mockIsSupabaseConfigured
}));

import { syncWithSupabase } from "./cloudSync";

const createQueryBuilder = (data: unknown, error: unknown = null) => ({
  select: vi.fn().mockReturnThis(),
  eq: vi.fn().mockReturnThis(),
  maybeSingle: vi.fn().mockResolvedValue({ data, error }),
  returns: vi.fn().mockResolvedValue({ data, error }),
  upsert: vi.fn().mockResolvedValue({ error })
});

const buildSupabaseClient = ({
  profile = null,
  lessonProgress = [],
  reviewItems = [],
  savedPhrases = [],
  courseEnrollments = [],
  courseMissionResults = [],
  epsAssessmentAttempts = [],
  upsertError = null,
  upsertErrors = {}
}: {
  profile?: unknown;
  lessonProgress?: unknown[];
  reviewItems?: unknown[];
  savedPhrases?: unknown[];
  courseEnrollments?: unknown[];
  courseMissionResults?: unknown[];
  epsAssessmentAttempts?: unknown[];
  upsertError?: unknown;
  upsertErrors?: Partial<Record<string, unknown>>;
}) => {
  const builders = {
    profiles: createQueryBuilder(profile, null),
    lesson_progress: createQueryBuilder(lessonProgress, null),
    review_items: createQueryBuilder(reviewItems, null),
    saved_phrases: createQueryBuilder(savedPhrases, null),
    course_enrollments: createQueryBuilder(courseEnrollments, null),
    course_mission_results: createQueryBuilder(courseMissionResults, null),
    eps_assessment_attempts: createQueryBuilder(epsAssessmentAttempts, null),
    analytics_events: createQueryBuilder([], null)
  };

  builders.profiles.upsert = vi.fn().mockResolvedValue({ error: upsertErrors.profiles ?? upsertError });
  builders.lesson_progress.upsert = vi.fn().mockResolvedValue({ error: upsertErrors.lesson_progress ?? upsertError });
  builders.review_items.upsert = vi.fn().mockResolvedValue({ error: upsertErrors.review_items ?? upsertError });
  builders.saved_phrases.upsert = vi.fn().mockResolvedValue({ error: upsertErrors.saved_phrases ?? upsertError });
  builders.course_enrollments.upsert = vi.fn().mockResolvedValue({ error: upsertErrors.course_enrollments ?? upsertError });
  builders.course_mission_results.upsert = vi.fn().mockResolvedValue({
    error: upsertErrors.course_mission_results ?? upsertError
  });
  builders.eps_assessment_attempts.upsert = vi
    .fn()
    .mockResolvedValue({ error: upsertErrors.eps_assessment_attempts ?? upsertError });
  builders.analytics_events.upsert = vi.fn().mockResolvedValue({ error: upsertErrors.analytics_events ?? upsertError });

  return {
    from: vi.fn((table: keyof typeof builders) => builders[table]),
    __builders: builders
  };
};

const session = {
  user: {
    id: "user-1",
    email: "learner@example.com"
  }
};

const buildState = (): UserState => ({
  ...createInitialState(),
  reviewItems: [
    {
      id: "day-1:hello",
      lessonId: "day-1",
      phraseId: "hello",
      korean: "annyeonghaseyo",
      meaning: "Hello",
      reason: "Review again.",
      priority: 40,
      dueAt: "2026-08-04T02:00:00.000Z",
      updatedAt: "2026-08-04T01:00:00.000Z"
    }
  ],
  savedPhrases: [
    {
      id: "day-1:core",
      lessonId: "day-1",
      phraseId: "core",
      korean: "annyeonghaseyo",
      romanization: "Annyeonghaseyo",
      meaning: "Hello",
      tags: ["core"],
      source: "core",
      savedAt: "2026-08-04T01:00:00.000Z",
      updatedAt: "2026-08-04T01:00:00.000Z"
    }
  ],
  savedPhraseTombstones: [],
  sync: {
    mode: "supabase-ready",
    pending: true,
    message: "Waiting to sync",
    pendingChanges: [
      {
        entity: "review-item",
        entityId: "day-1:hello",
        operation: "upsert",
        changedAt: "2026-08-04T01:00:00.000Z"
      },
      {
        entity: "saved-phrase",
        entityId: "day-1:core",
        operation: "upsert",
        changedAt: "2026-08-04T01:00:00.000Z"
      }
    ]
  }
});

describe("syncWithSupabase", () => {
  beforeEach(() => {
    localStorage.clear();
    mockIsSupabaseConfigured.mockReset();
    mockGetSupabaseClient.mockReset();
  });

  it("clears pending changes after a successful sync", async () => {
    mockIsSupabaseConfigured.mockReturnValue(true);
    mockGetSupabaseClient.mockReturnValue(buildSupabaseClient({}));

    const next = await syncWithSupabase(buildState(), session as never);

    expect(next.sync.pending).toBe(false);
    expect(next.sync.pendingChanges).toEqual([]);
    expect(next.accountEmail).toBe("learner@example.com");
  });

  it("loads deleted cloud phrases into tombstones instead of reviving them", async () => {
    mockIsSupabaseConfigured.mockReturnValue(true);
    mockGetSupabaseClient.mockReturnValue(
      buildSupabaseClient({
        savedPhrases: [
          {
            id: "day-1:core",
            lesson_id: "day-1",
            phrase_id: "core",
            korean: "annyeonghaseyo",
            romanization: "Annyeonghaseyo",
            meaning: "Hello",
            tags: ["core"],
            source: "core",
            saved_at: "2026-08-03T01:00:00.000Z",
            updated_at: "2026-08-04T03:00:00.000Z",
            deleted_at: "2026-08-04T03:00:00.000Z"
          }
        ]
      })
    );

    const next = await syncWithSupabase(buildState(), session as never);

    expect(next.savedPhrases).toEqual([]);
    expect(next.savedPhraseTombstones).toHaveLength(1);
    expect(next.savedPhraseTombstones[0].id).toBe("day-1:core");
  });

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

  it("round-trips a locked K-Culture route through course enrollments", async () => {
    mockIsSupabaseConfigured.mockReturnValue(true);
    const routeSlots = createCultureRoute({ primaryPackId: "k-pop", samplerPackId: "k-drama" });
    const supabase = buildSupabaseClient({
      courseEnrollments: [
        {
          course_id: "k-culture",
          route_version: "k-culture-v1",
          started_at: "2026-08-08T09:00:00.000Z",
          last_opened_at: "2026-08-08T09:10:00.000Z",
          route_locked_at: "2026-08-08T09:30:00.000Z",
          route_slots: routeSlots,
          completions: [],
          field_updated_at: {
            routeSlots: "2026-08-08T09:00:00.000Z",
            routeLockedAt: "2026-08-08T09:30:00.000Z"
          }
        }
      ]
    });
    mockGetSupabaseClient.mockReturnValue(supabase);

    const next = await syncWithSupabase(buildState(), session as never);

    expect(next.courseEnrollments["k-culture"]?.routeLockedAt).toBe("2026-08-08T09:30:00.000Z");
    expect(supabase.__builders.course_enrollments.upsert).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          course_id: "k-culture",
          route_locked_at: "2026-08-08T09:30:00.000Z",
          route_slots: routeSlots
        })
      ]),
      { onConflict: "user_id,course_id" }
    );
  });

  it("round-trips an expanded Beauty/Webtoon culture route through course enrollments", async () => {
    mockIsSupabaseConfigured.mockReturnValue(true);
    const routeSlots = createCultureRoute({ primaryPackId: "k-beauty", samplerPackId: "k-webtoon" });
    const supabase = buildSupabaseClient({
      courseEnrollments: [
        {
          course_id: "k-culture",
          route_version: "k-culture-v1",
          started_at: "2026-08-08T12:00:00.000Z",
          last_opened_at: "2026-08-08T12:10:00.000Z",
          route_locked_at: "2026-08-08T12:05:00.000Z",
          route_slots: routeSlots,
          completions: [],
          field_updated_at: {
            routeSlots: "2026-08-08T12:00:00.000Z",
            routeLockedAt: "2026-08-08T12:05:00.000Z"
          }
        }
      ]
    });
    mockGetSupabaseClient.mockReturnValue(supabase);

    const next = await syncWithSupabase(buildState(), session as never);

    expect(next.courseEnrollments["k-culture"]?.routeSlots?.[1]).toMatchObject({
      lessonId: "k-culture-k-beauty-1",
      packId: "k-beauty"
    });
    expect(supabase.__builders.course_enrollments.upsert).toHaveBeenCalledWith(
      expect.arrayContaining([expect.objectContaining({ route_slots: routeSlots })]),
      { onConflict: "user_id,course_id" }
    );
  });

  it("loads and persists course mission results by latest completion time", async () => {
    mockIsSupabaseConfigured.mockReturnValue(true);
    const supabase = buildSupabaseClient({
      courseMissionResults: [
        {
          user_id: "user-1",
          course_id: "k-food",
          lesson_id: "k-food-day-14",
          completed_at: "2026-08-08T11:00:00.000Z",
          checks: {
            "choose-food": "success",
            "short-order": "practice-more",
            "resolve-problem": "success"
          }
        }
      ]
    });
    mockGetSupabaseClient.mockReturnValue(supabase);

    const next = await syncWithSupabase(
      {
        ...buildState(),
        kFoodMissionResults: {
          "k-food-day-14": {
            lessonId: "k-food-day-14",
            completedAt: "2026-08-08T10:00:00.000Z",
            checks: {
              "choose-food": "practice-more",
              "short-order": "practice-more",
              "resolve-problem": "practice-more"
            }
          }
        }
      },
      session as never
    );

    expect(next.kFoodMissionResults?.["k-food-day-14"]?.completedAt).toBe("2026-08-08T11:00:00.000Z");
    expect(supabase.__builders.course_mission_results.upsert).toHaveBeenCalledWith(
      expect.arrayContaining([
        expect.objectContaining({
          user_id: "user-1",
          course_id: "k-food",
          lesson_id: "k-food-day-14",
          completed_at: "2026-08-08T11:00:00.000Z"
        })
      ]),
      { onConflict: "user_id,course_id,lesson_id" }
    );
  });

  it("keeps pending changes when cloud upsert fails", async () => {
    mockIsSupabaseConfigured.mockReturnValue(true);
    mockGetSupabaseClient.mockReturnValue(buildSupabaseClient({ upsertError: new Error("temporary") }));

    await expect(syncWithSupabase(buildState(), session as never)).rejects.toThrow("temporary");

    const stored = JSON.parse(localStorage.getItem("korean-first-talk:user-state:v1") ?? "{}") as UserState;
    expect(stored.sync.pendingChanges?.length).toBeGreaterThan(0);
  });

  it("keeps mission pending changes when the course mission sync step fails", async () => {
    mockIsSupabaseConfigured.mockReturnValue(true);
    mockGetSupabaseClient.mockReturnValue(
      buildSupabaseClient({
        upsertErrors: {
          course_mission_results: new Error("mission temporary")
        }
      })
    );

    await expect(
      syncWithSupabase(
        {
          ...buildState(),
          kFoodMissionResults: {
            "k-food-day-14": {
              lessonId: "k-food-day-14",
              completedAt: "2026-08-08T12:00:00.000Z",
              checks: {
                "choose-food": "success",
                "short-order": "practice-more",
                "resolve-problem": "success"
              }
            }
          },
          sync: {
            ...buildState().sync,
            pending: true,
            pendingChanges: [
              {
                entity: "course-mission-result",
                entityId: "k-food:k-food-day-14",
                operation: "upsert",
                changedAt: "2026-08-08T12:00:00.000Z"
              }
            ]
          }
        },
        session as never
      )
    ).rejects.toThrow("mission temporary");

    const stored = JSON.parse(localStorage.getItem("korean-first-talk:user-state:v1") ?? "{}") as UserState;
    expect(stored.sync.pending).toBe(true);
    expect(stored.sync.pendingChanges).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          entity: "course-mission-result",
          entityId: "k-food:k-food-day-14",
          operation: "upsert"
        })
      ])
    );
  });
});
