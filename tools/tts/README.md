# Static Korean TTS Tooling

This folder is for preparing free/static Korean audio files for `korean-first-talk`.

The safe default is review-only:

- no paid TTS API
- no model weights committed to git
- no generated audio committed as approved until licenses are verified
- `commercialUse` remains `false` until code, weight, and training-data licenses are confirmed

## Files

- `voices.json`: character voice profiles and review status
- `sentences.json`: stable lesson/phrase text to generate
- `licenses.json`: candidate model/license review notes
- `generate_audio.py`: dry-run generation planner and optional local command runner
- `validate_audio.py`: validates metadata and generated files
- `generate.ps1`: Windows PowerShell wrapper

## Dry Run

```powershell
python tools/tts/generate_audio.py --dry-run
python tools/tts/validate_audio.py
```

Plan one lesson, character, or speed:

```powershell
python tools/tts/generate_audio.py --lesson-id day-1 --character-id haneul --speed slow
```

Write the review manifest without generating audio:

```powershell
npm run tts:manifest -- --lesson-id day-1
python tools/tts/validate_audio.py
```

## Optional Local TTS Command

When a license-approved local TTS command is selected, set:

```powershell
$env:KFT_TTS_COMMAND="path-to-local-tts --text {text} --output {output}"
python tools/tts/generate_audio.py --execute --sentence-id day-1.hello-nice-meet-you --write-manifest
```

The command template must support:

- `{text}`: Korean text
- `{output}`: target WAV path
- `{voiceId}`: voice profile id
- `{speed}`: `natural` or `slow`
- `{rate}`: numeric rate

Do not use ElevenLabs, OpenAI TTS, Google Cloud TTS, Azure TTS, Naver Clova, AWS Polly, or any metered/paid API.

The generator skips an existing WAV when the manifest already has the same text hash, model, voice, and rate. Use `--force` only when intentionally replacing an audition file. Failed executions are reported in the `failures` array; use `--continue-on-error` to keep running the remaining jobs.

## Output Layout

```text
public/audio/day-1/haneul/hello-nice-meet-you-natural.wav
public/audio/day-1/haneul/hello-nice-meet-you-slow.wav
```

## Audition Pack

`sentences.json` includes a pending-review audition pack that checks:

- plain, tense, and aspirated consonants
- batchim and linking
- numbers and price
- question intonation
- polite requests and honorific speech
- short conversational reactions

These sentences are for local model comparison only. They must not be treated as production-approved audio until `licenses.json`, the generated manifest, and listening review are all updated.

After files pass license and listening review, update `src/data/audioCatalog.ts` with `naturalUrl`, `slowUrl`, and verified metadata.
