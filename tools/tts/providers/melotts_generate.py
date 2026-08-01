import argparse
import os
import sys
from pathlib import Path


def remove_unsafe_import_paths():
    cwd = str(Path.cwd())
    repo_root = str(Path(__file__).resolve().parents[3])
    safe_paths = []
    for path in sys.path:
        if not path or path == cwd:
            continue
        resolved = str(Path(path).resolve())
        if resolved.startswith(repo_root) and f"{os.sep}.venv" not in resolved:
            continue
        safe_paths.append(path)
    sys.path[:] = safe_paths


def load_korean_model(device="cpu"):
    remove_unsafe_import_paths()

    try:
        from melo.api import TTS
    except ImportError as exc:
        raise SystemExit(
            "MeloTTS is not installed. Create a dedicated TTS environment first; "
            f"see docs/AUDIO_PIPELINE.md. Import error: {exc}"
        ) from exc

    model = TTS(language="KR", device=device)
    speaker_ids = model.hps.data.spk2id
    return model, speaker_ids["KR"]


def synthesize(model, speaker_id, text, output, speed=1.0):
    output_path = Path(output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    model.tts_to_file(text, speaker_id, str(output_path), speed=speed)


def main():
    parser = argparse.ArgumentParser(description="Generate one Korean WAV with MeloTTS-Korean.")
    parser.add_argument("--text", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--speed", type=float, default=1.0)
    parser.add_argument("--device", default="cpu")
    args = parser.parse_args()

    model, speaker_id = load_korean_model(args.device)
    synthesize(model, speaker_id, args.text, args.output, args.speed)


if __name__ == "__main__":
    main()
