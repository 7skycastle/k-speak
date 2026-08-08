# K-Food Course Gate 2 Verification

Date: 2026-08-08
Branch: `paid-app/i18n-foundation`

## Scope Verified

- Added independent `k-food` course registration with route version `k-food-v1`.
- Added exactly 14 K-Food lessons: `k-food-day-1` through `k-food-day-14`.
- Each K-Food lesson has 9 lesson steps, 3 review cards, and `core`, `response`, and `rescue` audio targets.
- Day 14 mission checks are non-scored: `choose-food`, `short-order`, and `resolve-problem`.
- K-Food mission results are stored separately from course completion and synced through `course_mission_results`.
- Foundation, Travel, and K-Food progress and review items remain course-scoped.
- K-Food is approved only for `us-en`; other country packs remain `preparing`.
- K-Pop, K-Drama, K-Beauty, K-Webtoon, and EPS-TOPIK remain hidden or unimplemented.

## Verification Commands

| Command | Result | Notes |
| --- | --- | --- |
| `npm test` | PASS | 16 files, 120 tests passed. |
| `npm run lint` | PASS | TypeScript build check passed with `--pretty false`. |
| `npm run typecheck` | PASS | `tsc -b` passed. |
| `npm run build` | PASS | Production build passed. Existing Vite chunk-size warning remains. |
| `npm run supabase:validate` | PASS | Schema and RLS validation passed. |
| `npm run qa:mobile` | PASS | `mobile-375` and `desktop-1280` passed home, settings, review, lesson, and layout checks. |
| `git diff --check` | PASS | No whitespace errors. Existing `.codebase-memory/artifact.json` CRLF warning only. |

## Locale Gate

- Approved: `us-en`
- Preparing: `jp-ja`, `cn-zh`, `vn-vi`, `mx-es`, `id-id`, `kh-km`, `mm-my`, `th-th`, `my-ms`

The current K-Food lesson text is complete enough to expose for the English guidance pack. Non-English packs stay closed until native-language explanation density is reviewed.

## Audio Gate

- Static audio files are not required for this gate.
- Every K-Food `core`, `response`, and `rescue` target resolves to a valid browser speech synthesis fallback.
- Normal and slow playback remain available through fallback rates when packaged static audio is absent.
- Risk: browser speech synthesis voice availability and quality vary by device. This is acceptable for Gate 2 and should be revisited when free static audio is generated.

## Data And Sync Gate

- `course_mission_results` stores mission results by `(user_id, course_id, lesson_id)`.
- K-Food Day 14 results never store percentage, score, or accuracy claims.
- Travel mission persistence also uses the new mission result table, closing the previous cross-device persistence gap for Travel behavior checks.
- Failed sync retry behavior remains covered by existing pending-change tests.

## Release Decision

K-Food Gate 2 is verified for implementation handoff and preview deployment. The rollback boundary is the Gate 2 commit range after `5f58308 chore: add deploy ignore and k-food gate 2 design`.
