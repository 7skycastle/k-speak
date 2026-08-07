# Audio Deployment Notes

Deployment target: https://vercel.com/7skycastles-projects/k-speak

## Static TTS Models

| Purpose | Model | Version / model id | Download URL | License | Voice | Status |
|---|---|---|---|---|---|---|
| First audition candidate | MeloTTS-Korean | `myshell-ai/MeloTTS-Korean` | https://huggingface.co/myshell-ai/MeloTTS-Korean | MIT | `KR` | 40 audition WAV files generated |
| Quality comparison candidate | Qwen3-TTS CustomVoice | `Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice` | https://huggingface.co/Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice | Apache-2.0 | `Sohee` | 40 audition WAV files generated |

## Current Deployment Rule

The generated files under `public/audio/audition/` are audition assets only. They are not linked from the production audio catalog until listening review chooses a model and updates `src/data/audioCatalog.ts`.

No real-person voice cloning is allowed for this project.

Production lesson audio paths should point to `/audio/<lessonId>/<characterId>/<sentenceId>-{natural|slow}.wav` so runtime lookup matches the current TTS tooling output.

When a model is selected after listening review, use `createStaticAudioSlot` in `src/data/audioCatalog.ts` to attach verified `naturalUrl` and `slowUrl` values without removing browser fallback behavior.

## Review Artifacts

- License source copies: `licenses/tts/`
- License decisions: `tools/tts/licenses.json`
- Comparison model config: `tools/tts/comparison_models.json`
- Comparison manifest: `tools/tts/comparison_manifest.json`
- Audio pipeline: `docs/AUDIO_PIPELINE.md`
