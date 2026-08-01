# Audio Pipeline

`korean-first-talk` uses a static-audio-first policy for fixed lesson phrases.

## Runtime Order

1. Try `naturalUrl` or `slowUrl` from `src/data/audioCatalog.ts`.
2. If the static file is missing or fails, use browser `speechSynthesis`.
3. If browser TTS is unavailable, keep the lesson completable and show a status message.

## Production Asset Rule

Only approved static files may be linked from `src/data/audioCatalog.ts`.

Approval needs:

- code license reviewed
- model weight license reviewed
- training data license reviewed
- commercial-use status recorded
- listening review completed for natural and slow speed

Until then, assets stay out of the production catalog and `commercialUse` remains `false`.

## Tooling

Primary app validation:

```bash
npm run audio:validate
npm run audio:manifest
```

Static TTS preparation:

```bash
npm run tts:plan
npm run tts:plan -- --lesson-id day-1 --character-id haneul
npm run tts:manifest -- --lesson-id day-1
npm run tts:validate
```

Windows wrapper:

```powershell
.\tools\tts\generate.ps1
.\tools\tts\generate.ps1 -SentenceId day-1.hello-nice-meet-you -CharacterId haneul
```

`tools/tts/generate_audio.py` is dry-run by default. To execute a local approved TTS command:

```powershell
$env:KFT_TTS_COMMAND="path-to-local-tts --text {text} --output {output}"
python tools/tts/generate_audio.py --execute --sentence-id day-1.hello-nice-meet-you --write-manifest
```

The command is blocked if it contains known paid provider names.

The generation manifest is written to `tools/tts/generated_manifest.json` by default. It records `audioId`, `modelId`, `modelVersion`, `voiceId`, `textHash`, rate, WAV path, license status, commercial-use status, and listening review status. Existing WAV files are skipped when their manifest entry already matches the same text hash, model, voice, and rate; use `--force` only for intentional replacement.

## Output Layout

```text
public/audio/day-1/haneul/hello-nice-meet-you-natural.wav
public/audio/day-1/haneul/hello-nice-meet-you-slow.wav
```

MP3 conversion can be added after WAV review. Keep original WAVs and compressed distribution files conceptually separate.

## Current Status

- Browser fallback works.
- Static production audio files are not approved yet.
- `tools/tts` currently contains audition metadata and dry-run planning only.
- Candidate model licenses remain `pending_review`.
