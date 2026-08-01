# Static Korean TTS Tooling

This folder is for preparing free/static Korean audio files for `korean-first-talk`.

The safe default is review-only:

- no paid TTS API
- no model weights committed to git
- no generated audio linked as production-approved until licenses and listening review are complete
- audition candidates can be generated only when `licenses.json` records the model/license decision

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

Plan the 20-sentence MeloTTS/Qwen3 comparison pack:

```powershell
npm run tts:compare:plan
npm run tts:compare:manifest
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

## MeloTTS/Qwen3 Comparison

`generate_comparison_audio.py` creates a separate model-comparison manifest and output layout:

```text
public/audio/audition/melotts-korean/<phrase-id>/normal.wav
public/audio/audition/melotts-korean/<phrase-id>/slow.wav
public/audio/audition/qwen3-sohee/<phrase-id>/normal.wav
public/audio/audition/qwen3-sohee/<phrase-id>/slow.wav
```

Commands:

```powershell
npm run tts:compare:generate -- --model-id melotts-korean-candidate
npm run tts:compare:generate -- --model-id qwen3-tts-12hz-0.6b-customvoice-sohee
```

Provider adapters:

- `providers/melotts_generate.py`: uses `melo.api.TTS(language="KR")`.
- `providers/melotts_batch_generate.py`: loads MeloTTS once and writes many comparison WAV files.
- `providers/qwen3_generate.py`: uses Qwen3 CustomVoice with speaker `Sohee`.
- `providers/qwen3_batch_generate.py`: loads Qwen3-TTS once and writes many comparison WAV files.

Do not use real-person voice cloning for this project.

The current comparison pack has 80 generated audition files:

- 40 MeloTTS-Korean files
- 40 Qwen3-TTS 0.6B CustomVoice Sohee files

## Output Layout

```text
public/audio/day-1/haneul/hello-nice-meet-you-natural.wav
public/audio/day-1/haneul/hello-nice-meet-you-slow.wav
```

## Audition Pack

`sentences.json` includes a 20-sentence pending-review audition pack that checks:

- plain, tense, and aspirated consonants
- batchim and linking
- numbers and price
- question intonation
- polite requests and honorific speech
- short conversational reactions

These sentences are for local model comparison only. They must not be treated as production-approved audio until `licenses.json`, the generated manifest, and listening review are all updated.

After files pass license and listening review, update `src/data/audioCatalog.ts` with `naturalUrl`, `slowUrl`, and verified metadata.
