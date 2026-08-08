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
- Production build emits a Vite chunk size warning for the existing main bundle; the build succeeds.
