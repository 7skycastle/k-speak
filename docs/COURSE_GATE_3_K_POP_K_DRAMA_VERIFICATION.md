# Course Gate 3 K-Pop/K-Drama Verification

Date: 2026-08-08
Branch: `paid-app/i18n-foundation`

## Scope

Gate 3 adds the first K-Culture route foundation:

- Top-level course: `k-culture`
- Internal packs: `k-pop`, `k-drama`
- Route shape: 14 slots, composed from 4 shared lessons, 6 primary pack lessons, 2 sampler pack lessons, and 2 synthesis lessons
- Inventory: 18 original lessons
- Released locale gate: `us-en` only, because `k-pop-v1` and `k-drama-v1` are approved only for that locale

K-Beauty, K-Webtoon, EPS-TOPIK, real media assets, lyrics, drama dialogue, celebrity likenesses, real voices, logos, and real work titles remain out of released scope.

## Verification Evidence

- `npm test`: passed, 20 files / 164 tests
- `npm run lint`: passed
- `npm run typecheck`: passed
- `npm run build`: passed
- `npm run supabase:validate`: passed for `docs/supabase/schema.sql` and `docs/supabase/rls.sql`
- `npm run qa:mobile`: passed for `mobile-375` and `desktop-1280`
- `git diff --check`: passed

## Release Contracts

- `createCultureRoute` rejects identical primary/sampler packs and returns stable 14-slot routes.
- Stored `courseEnrollments["k-culture"].routeSlots` drives the learner route.
- `routeLockedAt` is preserved across local merge and Supabase row mapping.
- A route locks after the first primary or sampler lesson starts.
- K-Culture is visible only when at least two different culture packs are approved for the learner locale.
- `us-en` has approved `k-pop-v1` and `k-drama-v1`; other locales remain preparing.
- Browser speech synthesis fallback is available for `core`, `response`, and `rescue` targets for every K-Culture lesson.
- Policy tests reject known blocked fixture terms, temporary placeholders, URLs, and missing original-content notice.

## Browser QA

The mobile QA script now verifies:

- Home, settings, review, lesson, and TTS review routes
- K-Food route still works
- K-Culture course selection
- K-Culture original-content notice
- K-Pop primary + K-Drama sampler route creation
- K-Culture first lesson entry
- Vietnamese UI long-locale rendering without horizontal overflow
- 375px mobile and 1280px desktop layouts

## Deferred Scope

- K-Beauty and K-Webtoon implementation
- EPS-TOPIK release integration
- Static recorded audio generation/import
- Broader native review for non-English locales
- Chunk-size optimization for the existing Vite warning
