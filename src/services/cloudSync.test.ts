import { beforeEach, describe, expect, it, vi } from "vitest";
import type { UserState } from "../types";
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
  upsertError = null
}: {
  profile?: unknown;
  lessonProgress?: unknown[];
  reviewItems?: unknown[];
  savedPhrases?: unknown[];
  upsertError?: unknown;
}) => {
  const builders = {
    profiles: createQueryBuilder(profile, null),
    lesson_progress: createQueryBuilder(lessonProgress, null),
    review_items: createQueryBuilder(reviewItems, null),
    saved_phrases: createQueryBuilder(savedPhrases, null),
    analytics_events: createQueryBuilder([], null)
  };

  builders.profiles.upsert = vi.fn().mockResolvedValue({ error: upsertError });
  builders.lesson_progress.upsert = vi.fn().mockResolvedValue({ error: upsertError });
  builders.review_items.upsert = vi.fn().mockResolvedValue({ error: upsertError });
  builders.saved_phrases.upsert = vi.fn().mockResolvedValue({ error: upsertError });
  builders.analytics_events.upsert = vi.fn().mockResolvedValue({ error: upsertError });

  return {
    from: vi.fn((table: keyof typeof builders) => builders[table])
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
});
