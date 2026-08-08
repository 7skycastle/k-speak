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
