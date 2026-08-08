# Course Gate 6 Verification: K-Beauty and K-Webtoon

Date: 2026-08-08
Branch: `paid-app/i18n-foundation`

## Release Decision

Gate 6 is approved for release after automated verification.

K-Beauty and K-Webtoon are enabled as internal K-Culture route packs, not as new top-level courses. Existing K-Pop/K-Drama routes remain stable because stored `routeSlots` are preserved and the published Pop/Drama v1 lesson ID sequence is frozen by regression tests.

## Content Inventory

- K-Culture now contains 30 lessons total.
- Shared K-Culture lessons: 4.
- Pack lessons: 24 total, with 6 each for K-Pop, K-Drama, K-Beauty, and K-Webtoon.
- Synthesis lessons: 2.
- Route shape remains unchanged: 4 shared + 6 primary + 2 sampler + 2 synthesis = 14 slots.

## Scope Confirmed

- K-Beauty lessons use generic product, color, label, caution, exchange, and review language.
- K-Beauty copy is language learning content only. It avoids diagnosis, treatment promises, guaranteed effects, and medical claims.
- K-Webtoon lessons use original K-Speak scenes and generic story-language skills: sequence, emotion, relationship, context, everyday speech conversion, and opinion.
- No real brands, product packaging, influencer or celebrity likenesses, webtoon titles, panels, characters, plot summaries, copied dialogue, or platform references are used.
- No static audio generation or new TTS model integration was added in this gate.

## Locale and Route Approval

- `us-en` exposes K-Pop, K-Drama, K-Beauty, and K-Webtoon as approved K-Culture packs.
- Other locales remain controlled by pack-level approval rows and do not automatically expose unapproved packs.
- Expanding approved pack options does not change the top-level `k-culture-v1` route version.
- Existing learners keep their stored route selections instead of receiving a recalculated route.

## Regression Coverage

- Culture route engine freezes the published K-Pop primary / K-Drama sampler v1 sequence.
- New combinations are covered, including Beauty primary / Webtoon sampler, Webtoon primary / Pop sampler, and Drama primary / Beauty sampler.
- Course progress tests verify Beauty/Webtoon route completion without marking unused culture lessons complete.
- Review tests verify expanded culture lessons still generate K-Culture review cards.
- Storage tests verify locked and completed culture routes survive app-version expansion and unrelated K-Food/EPS progress.
- Cloud sync tests verify expanded Beauty/Webtoon route slots round-trip through course enrollments.
- Approval tests verify pack-level visibility.
- Audio catalog tests verify culture lesson audio resolves to static assets or browser-TTS fallback.
- Mobile QA verifies route creation and layout behavior at 375px and 1280px.

## Verification Commands

Focused Gate 6 checks:

```bash
npm test -- src/engine/culturePathEngine.test.ts src/engine/courseEngine.test.ts src/engine/reviewEngine.test.ts src/services/storage.test.ts src/services/cloudSync.test.ts src/data/courses/contentApproval.test.ts src/data/audioCatalog.test.ts src/components/courses/CultureCourseSetup.test.tsx
npm run typecheck
npm run build
npm run lint
npm run qa:mobile
```

Result:

- Focused Gate 6 test suite: passed, 8 files and 79 tests.
- TypeScript check: passed.
- Production build: passed.
- Lint: passed.
- Mobile QA: passed for 375px mobile and 1280px desktop.

Full release verification:

```bash
npm test
npm run lint
npm run typecheck
npm run build
npm run supabase:validate
npm run qa:mobile
git diff --check
```

Result:

- Full test suite: passed, 20 files and 191 tests.
- Lint: passed.
- TypeScript check: passed.
- Production build: passed. Vite reported the existing large chunk warning for the main bundle.
- Supabase SQL validation: passed for `docs/supabase/schema.sql` and `docs/supabase/rls.sql`.
- Mobile QA: passed at 375px mobile and 1280px desktop.
- `git diff --check`: passed.

## Manual Review Notes

- Non-English translations for richer K-Beauty and K-Webtoon lesson explanations still need human/native review before broader locale approval.
- Static Korean audio files for the new culture lessons remain future work; browser TTS fallback is the current supported behavior.
- K-Beauty medical-safety wording should be rechecked before any future country-specific claims or ingredient guidance is added.
- EPS-TOPIK linkage remains outside this gate.
