import { describe, expect, it } from "vitest";
import { getCreateTableBlock, loadSupabaseSql, requiredPolicies, requiredTables, validateSupabaseSql } from "./sql-rules";

describe("supabase sql rules", () => {
  it("matches the app's expected cloud sync tables and policies", () => {
    const { schemaSql, rlsSql } = loadSupabaseSql();
    const result = validateSupabaseSql(schemaSql, rlsSql);

    expect(result.errors).toEqual([]);
    expect(requiredTables.length).toBeGreaterThan(0);
    expect(requiredPolicies.length).toBeGreaterThan(0);
  });

  it("fails when a required table is missing", () => {
    const { rlsSql } = loadSupabaseSql();
    const result = validateSupabaseSql("create table if not exists public.profiles (id uuid primary key);", rlsSql);

    expect(result.errors).toContain("Missing table: public.lesson_progress");
  });

  it("checks required columns inside the matching table block", () => {
    const { schemaSql, rlsSql } = loadSupabaseSql();
    const brokenSchema = schemaSql.replace("  native_language text not null,\n", "");
    const result = validateSupabaseSql(brokenSchema, rlsSql);

    expect(getCreateTableBlock(schemaSql, "profiles")).toContain("native_language");
    expect(result.errors).toContain("Missing expected column for profiles: native_language");
  });

  it("fails when a required policy is missing", () => {
    const { schemaSql } = loadSupabaseSql();
    const result = validateSupabaseSql(schemaSql, "");

    expect(result.errors).toContain("Missing policy: profiles_select_own");
  });
});
