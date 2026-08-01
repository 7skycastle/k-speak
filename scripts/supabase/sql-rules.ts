import { readFileSync } from "node:fs";
import { join } from "node:path";

export const requiredTables = [
  "profiles",
  "lesson_progress",
  "review_items",
  "analytics_events",
  "guest_merge_requests",
  "country_pack_snapshots"
] as const;

export const requiredColumns: Record<(typeof requiredTables)[number], string[]> = {
  profiles: [
    "id",
    "country_pack_id",
    "native_language",
    "korean_level",
    "learning_goal",
    "daily_goal_minutes",
    "character_id",
    "reminder_time",
    "completed_at"
  ],
  lesson_progress: [
    "user_id",
    "lesson_id",
    "status",
    "current_step_id",
    "completed_step_ids",
    "metrics",
    "started_at",
    "completed_at"
  ],
  review_items: [
    "id",
    "user_id",
    "lesson_id",
    "phrase_id",
    "korean",
    "meaning",
    "reason",
    "priority",
    "due_at",
    "last_result"
  ],
  analytics_events: ["id", "user_id", "anonymous_id", "name", "properties", "occurred_at"],
  guest_merge_requests: ["id", "user_id", "anonymous_id", "merged_summary", "created_at"],
  country_pack_snapshots: ["id", "version", "payload", "created_at"]
};

export const requiredPolicies = [
  "profiles_select_own",
  "profiles_insert_own",
  "profiles_update_own",
  "lesson_progress_own",
  "lesson_progress_insert_own",
  "lesson_progress_update_own",
  "review_items_select_own",
  "review_items_insert_own",
  "review_items_update_own",
  "analytics_insert_own_or_guest",
  "analytics_update_own",
  "guest_merge_insert_own",
  "country_pack_read"
] as const;

export interface SupabaseSqlValidationResult {
  errors: string[];
  warnings: string[];
}

export const loadSupabaseSql = (root = process.cwd()) => {
  const schemaPath = join(root, "docs", "supabase", "schema.sql");
  const rlsPath = join(root, "docs", "supabase", "rls.sql");
  return {
    schemaPath,
    rlsPath,
    schemaSql: readFileSync(schemaPath, "utf8"),
    rlsSql: readFileSync(rlsPath, "utf8")
  };
};

export const normalizeSql = (sql: string) => sql.replace(/\s+/g, " ").toLowerCase();

export const getCreateTableBlock = (sql: string, table: string) => {
  const match = new RegExp(`create\\s+table\\s+if\\s+not\\s+exists\\s+public\\.${table}\\s*\\((.*?)\\);`, "is").exec(sql);
  return match?.[1] ?? "";
};

export const validateSupabaseSql = (schemaSql: string, rlsSql: string): SupabaseSqlValidationResult => {
  const errors: string[] = [];
  const warnings: string[] = [];
  const normalizedSchema = normalizeSql(schemaSql);
  const normalizedRls = normalizeSql(rlsSql);

  for (const table of requiredTables) {
    if (!normalizedSchema.includes(`create table if not exists public.${table}`)) {
      errors.push(`Missing table: public.${table}`);
    }
    if (!normalizedRls.includes(`alter table public.${table} enable row level security`)) {
      errors.push(`Missing RLS enable statement: public.${table}`);
    }

    const tableBlock = normalizeSql(getCreateTableBlock(schemaSql, table));
    for (const column of requiredColumns[table]) {
      const columnPattern = new RegExp(`(^|[,\\s])${column.toLowerCase()}\\s+`);
      if (!columnPattern.test(tableBlock)) {
        errors.push(`Missing expected column for ${table}: ${column}`);
      }
    }
  }

  for (const policy of requiredPolicies) {
    if (!normalizedRls.includes(`create policy "${policy}"`)) {
      errors.push(`Missing policy: ${policy}`);
    }
  }

  if (!normalizedSchema.includes("unique (user_id, lesson_id)")) {
    errors.push("Missing unique constraint for lesson_progress user_id/lesson_id upsert.");
  }

  if (!normalizedSchema.includes("primary key (id, user_id)")) {
    errors.push("Missing composite primary key for review_items id/user_id upsert.");
  }

  if (!normalizedSchema.includes("grant select, insert, update on public.lesson_progress to authenticated")) {
    warnings.push("lesson_progress authenticated grants should allow select, insert, update.");
  }

  return { errors, warnings };
};
