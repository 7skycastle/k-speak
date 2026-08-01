import { loadSupabaseSql, validateSupabaseSql } from "./sql-rules";

const { schemaSql, rlsSql, schemaPath, rlsPath } = loadSupabaseSql();
const result = validateSupabaseSql(schemaSql, rlsSql);

for (const warning of result.warnings) {
  console.warn(`WARN ${warning}`);
}

if (result.errors.length > 0) {
  console.error(`Supabase SQL validation failed for ${schemaPath} and ${rlsPath}.`);
  for (const error of result.errors) {
    console.error(`ERROR ${error}`);
  }
  process.exit(1);
}

console.log(`Supabase SQL validation passed for ${schemaPath} and ${rlsPath}.`);
