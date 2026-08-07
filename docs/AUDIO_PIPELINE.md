# Audio Pipeline

`korean-first-talk` uses a static-audio-first policy for fixed lesson phrases.

## Runtime Order

1. Try `naturalUrl` or `slowUrl` from `src/data/audioCatalog.ts`.
2. If the static file is missing or fails, use browser `speechSynthesis`.
3. If browser TTS is unavailable, keep the lesson completable and show a status message.

The runtime catalog now resolves lesson static files to `.wav` paths by default so it matches the current local TTS tooling output.

## Production Asset Rule

Only approved static files may be linked from `src/data/audioCatalog.ts`.

Approval needs:

- code license reviewed
- model weight license reviewed
- training data license reviewed
- commercial-use status recorded
- listening review completed for natural and slow speed

Until then, assets stay out of the production catalog and listening `reviewStatus` remains `not_reviewed`.

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

MeloTTS/Qwen3 comparison preparation:

```bash
npm run tts:compare:plan
npm run tts:compare:manifest
npm run tts:compare:generate -- --model-id melotts-korean-candidate
npm run tts:compare:generate -- --model-id qwen3-tts-12hz-0.6b-customvoice-sohee
npm run tts:review-data
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

Comparison audition files use a model-based layout:

```text
public/audio/audition/melotts-korean/hello-nice-meet-you/normal.wav
public/audio/audition/melotts-korean/hello-nice-meet-you/slow.wav
public/audio/audition/qwen3-sohee/hello-nice-meet-you/normal.wav
public/audio/audition/qwen3-sohee/hello-nice-meet-you/slow.wav
```

`tools/tts/comparison_manifest.json` records model name, model version, download URL, license, voice id, text hash, speed, output path, review status, generation speed, and runtime notes.

`public/tts-review.html` loads `public/audio/audition/review-data.json` and provides a browser-based listening review surface. Review notes are stored in browser localStorage and can be exported as JSON.

`npm run tts:review-data` now rebuilds that file strictly from `tools/tts/comparison_manifest.json`, so the browser review surface stays aligned with the 20-sentence comparison pack.

`createStaticAudioSlot` in `src/data/audioCatalog.ts` is the intended helper for linking a chosen production model into the runtime catalog after listening review.

## Local Runtime Notes

MeloTTS official docs say the project was developed/tested on Ubuntu 20.04 and Python 3.9 and suggest Docker for Windows users. Docker is not currently available in this workspace, so Windows generation should use a dedicated virtual environment or WSL rather than the app runtime. In this workspace, MeloTTS-Korean generated the 20-sentence comparison pack successfully from a dedicated Python 3.11 virtual environment after installing `eunjeon`.

Qwen3-TTS official docs recommend a fresh Python 3.12 environment and commonly use CUDA-oriented examples. The comparison script targets the built-in `Sohee` speaker and does not use voice cloning. In this workspace, Qwen3-TTS generated the 20-sentence comparison pack successfully from a dedicated Python 3.12 virtual environment on CPU. It emitted non-fatal `flash-attn` and SoX PATH warnings.

MP3 conversion can be added after WAV review. Keep original WAVs and compressed distribution files conceptually separate.

## Current Status

- Browser fallback works.
- Static production audio files are not approved yet.
- `tools/tts` currently contains audition metadata, dry-run planning, comparison manifest generation, provider adapters, and validation.
- The lesson/character audition pack plans 160 slots: 20 Korean test sentences, 4 characters, and 2 speeds.
- The MeloTTS/Qwen3 comparison pack generated 80 audition WAV files: 20 Korean test sentences, 2 models, and 2 speeds.
- MeloTTS-Korean is the first recommended audition model.
- Qwen3-TTS 0.6B CustomVoice `Sohee` is the quality comparison model.
