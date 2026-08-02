# korean-first-talk AI Project Brief

## 1. Project Identity

- App name: `korean-first-talk`
- Repository: `https://github.com/7skycastle/k-speak`
- Local path: `C:\Users\7skyc\Desktop\Codex\K-speak`
- Production URL: `https://k-speak.vercel.app`
- Vercel project: `https://vercel.com/7skycastles-projects/k-speak`

## 2. Why This App Exists

`korean-first-talk` is a Korean learning app for foreigners in multiple countries.

The core idea is not to build a broad grammar-heavy textbook app first.
The app is meant to help absolute beginners and low-level learners:

- survive real early conversations in Korea
- speak short but useful Korean from Day 1
- keep learning even if static audio is not ready yet
- study through practical travel, daily-life, and first-contact situations
- receive guidance that matches their native language and learning habits

The app is designed around "usable spoken Korean first", not academic completeness first.

## 3. Product Goal

The intended product direction is:

- multi-country Korean learning app
- short daily lesson format
- beginner-friendly speech practice
- mobile-first usage
- free/static Korean audio pipeline where possible
- fallback-safe experience even without paid services

Important policy:

- do not depend on paid TTS providers
- do not ship features that break when premium audio is unavailable
- keep lessons completable with browser TTS fallback

## 4. Current Implementation Status

As of `2026-08-02`, the app already includes:

- React 19 + Vite + TypeScript frontend
- onboarding for `US`, `Japan`, `China`, `Vietnam`, and `Mexico/Spanish`
- tutor characters: `Haneul`, `Jun`, `Mina`, `Taeho`
- Day 1 through Day 30 lesson data
- playable lesson flow with:
  - situation
  - phrase/meaning
  - dialogue
  - structure
  - swap phrase
  - listening
  - recording
  - compare
  - quiz
  - roleplay
  - summary
- review item generation after lesson completion
- saved phrase flow
- Day 15 to Day 30 continuation lessons playable in the same flow
- home screen continuation guidance and sample phrase preview
- country-specific learning guidance
- local progress persistence
- Supabase-ready auth/progress sync structure

## 5. Learning Content Direction

The current lesson philosophy is:

- short, realistic Korean sentences
- immediate use in travel and daily-life scenarios
- simple polite endings first
- rescue phrases included for communication breakdown moments
- repeated exposure through listening, speaking, roleplay, and review

Day 1 to Day 14 are the first core beginner program.
Day 15 to Day 30 extend the experience into a broader survival-speaking path.

## 6. Recent Content Quality Work

Recent content work includes:

- Day 15 to Day 30 converted from guidance-only direction into actual playable lesson seeds
- Day 1 to Day 30 TTS sentence/manifest data regenerated
- Day 1 to Day 14 content quality pass started and applied

The latest content-quality improvements now in the working tree are:

- Day 1 to Day 14 structure explanations rewritten to sound more natural and more pedagogically useful
- Japanese, Chinese, Vietnamese, and Spanish explanation quality improved
- Day-specific pronunciation notes added for Day 1 to Day 14 instead of one generic note for all lessons
- review-card recommendation reasons rewritten to be more learner-friendly and practical

These latest lesson-content changes are currently reflected in:

- `src/data/lessons.ts`
- `src/data/lessons.test.ts`

At the moment, these two files are modified in the working tree and are not yet committed in the current session.

## 7. Audio / TTS Policy

This project intentionally avoids paid TTS dependency.

Current audio policy:

- paid TTS providers are blocked
- static free audio is preferred
- browser `speechSynthesis` fallback is allowed and actively used
- lessons must remain usable even without final static Korean voice files

Current TTS preparation status:

- `186` sentence targets generated
- `1,488` lesson manifest entries generated
- comparison metadata exists for MeloTTS and Qwen3 audition workflow
- production-approved static Korean audio is not finished yet

## 8. Verification Status

Recently verified:

- `npm audit --audit-level=moderate`
- `npm run audio:validate`
- `npm run tts:validate`
- `npm run supabase:validate`
- `npm run supabase:bundle`
- `npm run lint`
- `npm run test`
- `npm run build`
- `npm run qa:mobile`

Known latest numbers from verification:

- unit tests: `8` files passed, `30` tests passed
- build JS gzip size: `103.99 kB`
- audio slots checked: `720`
- generated browser-TTS fallback warnings: `696`

## 9. Current Constraints

Important constraints for anyone continuing this project:

- do not add paid TTS integration
- do not break browser TTS fallback
- do not remove mobile-first behavior
- do not assume Supabase project setup is complete
- do not treat static audio as approved until license and listening review are finished
- prefer improving real learning usefulness over adding flashy but shallow features

## 10. Important Files

- `src/App.tsx`
  Main app flow, screens, lesson navigation, review UI, and home behavior.

- `src/data/lessons.ts`
  Main lesson catalog and learning content source.

- `src/data/lessons.test.ts`
  Lesson integrity/content-shape tests.

- `src/data/audioCatalog.ts`
  Audio slot metadata and fallback structure.

- `src/utils/audioPlayback.ts`
  Audio playback logic with static-first and browser fallback behavior.

- `scripts/audio/`
  Audio manifest and validation scripts.

- `tools/tts/`
  TTS planning, metadata generation, comparison workflow, and validation tools.

- `docs/supabase/schema.sql`
- `docs/supabase/rls.sql`
  Supabase schema and row-level security drafts.

- `CODEX_HANDOFF.md`
  Current implementation summary and operational handoff notes.

- `TEST_REPORT.md`
  Latest verification summary.

## 11. What Is Still Missing

Main unfinished areas:

- final native-quality review of Korean lesson copy
- real static Korean audio generation and approval
- dedicated Supabase project setup
- real end-to-end OTP and progress merge validation with configured env vars
- possible analytics delivery hookup

## 12. Recommended Next Focus

If another AI continues this project, the most valuable next steps are:

1. Continue the Day 1 to Day 14 lesson-content quality pass until every line feels natural to a native Korean speaker.
2. Review Day 15 to Day 30 Korean copy with the same standard.
3. Improve localized learner explanations where they still feel too literal.
4. Prepare approved free/static Korean audio workflow without violating license policy.
5. Finish Supabase environment setup and test real auth/progress sync.

## 13. Working Principle

This app should feel like a practical speaking coach for foreigners, not a decorative demo.

When making changes, prioritize:

- natural Korean
- learner clarity
- short usable phrases
- mobile readability
- stable offline/fallback behavior
- realistic completion of the product instead of feature sprawl
