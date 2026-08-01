import { loadSupabaseSql, validateSupabaseSql } from "./sql-rules";

const { schemaSql, rlsSql } = loadSupabaseSql();
const validation = validateSupabaseSql(schemaSql, rlsSql);

if (validation.errors.length > 0) {
  for (const error of validation.errors) {
    console.error(`ERROR ${error}`);
  }
  process.exit(1);
}

console.log("-- korean-first-talk Supabase setup");
console.log("-- Apply this in a new Supabase project's SQL editor.");
console.log("-- Generated from docs/supabase/schema.sql and docs/supabase/rls.sql.");
console.log("");
console.log("begin;");
console.log("");
console.log(schemaSql.trim());
console.log("");
console.log(rlsSql.trim());
console.log("");
console.log("commit;");
