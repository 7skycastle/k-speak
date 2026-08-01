import argparse
import json
from pathlib import Path

from qwen3_generate import load_model, synthesize


def main():
    parser = argparse.ArgumentParser(description="Generate multiple WAV files with Qwen3-TTS CustomVoice.")
    parser.add_argument("--jobs", required=True, help="JSON file containing text/output/speaker/language jobs.")
    parser.add_argument("--model-id", default="Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice")
    parser.add_argument("--device-map", default="auto")
    args = parser.parse_args()

    jobs = json.loads(Path(args.jobs).read_text(encoding="utf-8"))
    if not isinstance(jobs, list):
        raise SystemExit("Qwen3 batch jobs must be a JSON array.")

    model, soundfile = load_model(args.model_id, args.device_map)
    for job in jobs:
        synthesize(
            model,
            soundfile,
            job["text"],
            job["output"],
            job.get("speaker", "Sohee"),
            job.get("language", "Korean"),
            job.get("instruction", ""),
        )


if __name__ == "__main__":
    main()
