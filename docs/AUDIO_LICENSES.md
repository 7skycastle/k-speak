# Audio Licenses

## Policy

Paid TTS APIs are not allowed in this project.

Blocked examples:

- ElevenLabs
- OpenAI TTS
- Google Cloud TTS
- Azure TTS
- Naver Clova Voice
- AWS Polly
- Typecast

Any per-character, per-request, metered, or cloud paid TTS service should be treated as blocked unless the project owner explicitly changes the policy.

## License Layers

Do not approve generated audio by looking only at the engine repository license.

Each candidate needs separate review:

- code license
- model weight license
- training data license
- generated-output usage terms

If any layer is unclear, keep:

```json
{
  "licenseStatus": "pending_review",
  "commercialUse": false
}
```

## Current Candidate Notes

The following candidates are listed only for audition/research. They are not approved production sources.

- Qwen3-TTS candidate: Korean voice quality and all license layers need review.
- MeloTTS Korean candidate: Korean voice quality and all license layers need review.

KSS-like datasets with non-commercial clauses such as CC BY-NC-SA must not be used for commercial/public production audio.

## Approval Checklist

Before linking a file from `src/data/audioCatalog.ts`:

- Source model is documented in `tools/tts/licenses.json`.
- `voices.json` has the selected `modelId`.
- `commercialUse` is true only when written evidence supports it.
- Natural and slow files pass listening review.
- File path exists under `public/audio`.
- `npm run tts:validate` passes.
- `AUDIO_REQUIRE_STATIC_FILES=true npm run audio:validate` passes after catalog URLs are added.
