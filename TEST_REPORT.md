# TEST_REPORT

Date: 2026-08-01

## Latest Verification

Passed:

- `npm audit --audit-level=moderate`
- `npm run audio:validate`
- `npm run audio:manifest`
- paid-provider blocking check with `ALLOW_PAID_TTS=true AUDIO_PROVIDER=openai npm run audio:manifest`
- `npm run supabase:validate`
- `npm run supabase:bundle`
- `npm run lint`
- `npm run test`
- `npm run build`
- Playwright local render check: 390x844 and 1280x900
- Playwright local lesson audio check: two audio controls and fallback status message visible

Current unit test result:

- 8 test files passed
- 23 tests passed

Build result:

- Vite production build passed
- Output JS gzip size: 80.87 kB

Audio validation result:

- 56 lesson/character audio slots checked
- 0 validation errors
- 52 generated browser-TTS fallback slot warnings

Supabase SQL validation result:

- `docs/supabase/schema.sql` and `docs/supabase/rls.sql` match the app cloud sync contract.
- Required upsert constraints for `lesson_progress` and `review_items` are present.
- SQL bundle generation succeeds.

## Previously Verified

- Vercel production `https://k-speak.vercel.app`: HTTP 200 and mobile render check passed
- Earlier viewport sweep passed for 360, 390, 430, tablet, and desktop
- Earlier lesson flow check passed: Day 1 completion leads to Day 2 and creates review items

## Audio Notes

- Static free audio is attempted first when URLs are configured.
- Browser `speechSynthesis` fallback is used when static files are missing or fail.
- Lessons remain completable without a Korean TTS voice.
- Paid TTS providers are blocked by validation.
- `AUDIO_REQUIRE_STATIC_FILES=true` fails validation when `naturalUrl`, `slowUrl`, or actual files are missing.

## Remaining Manual Items

- Real static Korean audio files are not included yet.
- Supabase cloud sync remains ready for env configuration, but a dedicated Supabase project was not created in this run.
