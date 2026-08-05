# TTS Listening Review

Review page:

```text
/tts-review.html
```

The page loads:

```text
/audio/audition/review-data.json
```

`review-data.json` should contain only the comparison scope from `tools/tts/comparison_manifest.json`, not the full lesson sentence plan.

## Scope

The current review pack contains:

- 20 Korean sentences
- 2 models: MeloTTS-Korean and Qwen3-TTS CustomVoice Sohee
- 2 speeds per model: normal and slow
- 80 WAV files total
- 20 review-data groups total

These files are audition-only. Do not link them from `src/data/audioCatalog.ts` until one model is selected and the chosen files pass listening review.

## Review Criteria

Score each model row for:

- Pronunciation: Korean consonants, vowels, batchim, linking, numbers, and loanwords are clear.
- Naturalness: rhythm, intonation, and sentence flow sound usable for first-time learners.
- Slow quality: slow audio is slower without sounding broken or distorted.
- Defects: no truncation, noise, repeated fragments, skipped syllables, or wrong language.
- Decision: approved, needs check, or reject.

## Recommended Pass Order

1. Listen to the normal pair for each sentence.
2. Listen to both slow files only when normal is not clearly disqualifying.
3. Mark obvious failures as `Reject`.
4. Mark uncertain entries as `Needs check`.
5. Export JSON from the page after finishing the pass.

## Production Decision

Choose the production model only after checking:

- At least 14 day-content sentences are approved for the chosen model.
- All six audition stress-test sentences are approved or have an acceptable replacement plan.
- Slow files are suitable for beginner learners.
- Runtime notes in `docs/AUDIO_PIPELINE.md` are acceptable for future batch generation.

After selection, generate Day 1-14 production paths and update `src/data/audioCatalog.ts`.
