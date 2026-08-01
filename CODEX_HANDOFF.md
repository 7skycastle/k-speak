# CODEX_HANDOFF

## Project

- App: `korean-first-talk`
- Local path: `C:\Users\7skyc\Desktop\Codex\K-speak`
- GitHub: `https://github.com/7skycastle/k-speak`
- Vercel project: `https://vercel.com/7skycastles-projects/k-speak`
- Production URL: `https://k-speak.vercel.app`

## Run

```bash
npm install
npm run dev -- --port 5173
```

## Verify

```bash
npm audit --audit-level=moderate
npm run audio:validate
npm run audio:manifest
npm run supabase:validate
npm run lint
npm run test
npm run build
```

## Current App Scope

- Vite, React 19, TypeScript.
- Country onboarding for US, Japan, China, Vietnam, and Mexico/Spanish.
- Tutor characters: Haneul, Jun, Mina, Taeho.
- Day 1 to Day 14 lesson data.
- Lesson flow includes listening, repeating, recording, comparing, quiz, roleplay, and summary.
- Review items are generated after completed lessons.
- Local progress persistence is implemented.
- Supabase email OTP and progress sync are ready when env vars are configured.

## Audio/TTS Policy

The Word plan requires free TTS/audio only. The current implementation follows that:

- Paid TTS providers are blocked.
- Static free audio URLs are attempted first when present.
- Browser `speechSynthesis` fallback is used when static audio is missing or fails.
- Lessons remain completable when no Korean TTS voice is available.
- Each tutor character has a browser Korean TTS voice profile.
- Each `AudioSlot` stores provider, source type, voice id, version, license status, commercial-use status, generated-by metadata, and fallback details.

Audio scripts:

```bash
npm run audio:validate
npm run audio:manifest
npm run audio:placeholder
npm run audio:voices
```

`audio:manifest` and `audio:validate` both fail if paid TTS is enabled or configured.

## Environment

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_SUPABASE_REDIRECT_URL=http://localhost:5173
AUDIO_PROVIDER=browser_speech_synthesis
AUDIO_GENERATION_ENABLED=false
ALLOW_PAID_TTS=false
AUDIO_REQUIRE_STATIC_FILES=false
AUDIO_SHOW_DEV_PLACEHOLDER_BADGE=true
```

`AUDIO_REQUIRE_STATIC_FILES=true` makes missing `naturalUrl`, `slowUrl`, or missing files fail validation.

## Supabase

SQL drafts:

- `docs/supabase/schema.sql`
- `docs/supabase/rls.sql`

Setup guide:

- `docs/SUPABASE_SETUP.md`

Validation and bundle commands:

```bash
npm run supabase:validate
npm run --silent supabase:bundle
```

Supabase project creation was previously attempted through MCP but returned `INVALID_ARGUMENT`. The existing `K_study` project was not modified.

## Important Files

- `src/App.tsx`: main screens and lesson flow.
- `src/data/lessons.ts`: Day 1 to Day 14 lesson data.
- `src/data/audioCatalog.ts`: audio slots and browser fallback metadata.
- `src/utils/audioPlayback.ts`: static-first audio playback and browser fallback.
- `scripts/audio/`: free TTS/audio manifest and validation tools.
- `scripts/supabase/`: Supabase SQL contract validation and bundle output.
- `AUDIO_SPEC.md`: audio policy details.
- `TEST_REPORT.md`: latest verification notes.

## Remaining Work

- Add real free/static Korean audio files and update `src/data/audioCatalog.ts`.
- Create/configure the dedicated Supabase project and add env vars in Vercel.
- Apply `docs/supabase/schema.sql` and `docs/supabase/rls.sql`.
- Run an end-to-end Supabase OTP/progress merge check after env vars are configured.
- Connect real analytics delivery if needed.
