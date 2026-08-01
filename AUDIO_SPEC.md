# AUDIO_SPEC

## Voice Policy

`korean-first-talk` uses free AI/TTS audio as the baseline. Paid TTS APIs or paid voice services are blocked for this project.

The runtime order is:

1. Play a static free audio file when `naturalUrl` or `slowUrl` exists in `src/data/audioCatalog.ts`.
2. Fall back to browser `speechSynthesis` with `lang: "ko-KR"` when the static file is missing or cannot play.
3. Allow the lesson to continue even when the browser has no Korean voice or no speech synthesis support.

## Environment

```bash
AUDIO_PROVIDER=browser_speech_synthesis
AUDIO_GENERATION_ENABLED=false
ALLOW_PAID_TTS=false
AUDIO_REQUIRE_STATIC_FILES=false
AUDIO_SHOW_DEV_PLACEHOLDER_BADGE=true
```

`ALLOW_PAID_TTS=true` is treated as a validation failure. `AUDIO_REQUIRE_STATIC_FILES=true` makes missing static files fail validation.

## Metadata

Each `AudioSlot` stores provider, source type, voice id, version, license status, commercial-use status, generated-by metadata, natural/slow rates, and browser fallback details.

Each tutor character also has a `voiceProfile` linked to a free browser Korean TTS profile:

- `haneul`: `ko-KR-browser-soft-female`
- `jun`: `ko-KR-browser-clear-male`
- `mina`: `ko-KR-browser-warm-female`
- `taeho`: `ko-KR-browser-coach-male`

## Scripts

```bash
npm run audio:validate
npm run audio:manifest
npm run audio:placeholder
npm run audio:voices
npm run tts:plan
npm run tts:manifest
npm run tts:validate
```

`scripts/audio/validate-audio-assets.ts` checks required metadata and blocks paid providers such as ElevenLabs, Typecast, OpenAI, Azure, Google, AWS Polly, Naver, and Clova.

`scripts/audio/generate-audio-manifest.ts` prints the current lesson/character audio manifest.

`scripts/audio/generate-placeholder-audio.ts` writes silent development-only placeholder WAV files only when `AUDIO_GENERATION_ENABLED=true`.

`scripts/audio/list-browser-tts-voices.ts` prints the browser DevTools snippet for inspecting Korean voices.

`tools/tts` contains the static Korean TTS audition pipeline. It is dry-run and pending-license-review by default. `npm run tts:manifest` writes review metadata without approving or generating production audio.
