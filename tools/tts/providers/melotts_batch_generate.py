import argparse
import json
from pathlib import Path

from melotts_generate import load_korean_model, synthesize


def main():
    parser = argparse.ArgumentParser(description="Generate multiple Korean WAV files with MeloTTS-Korean.")
    parser.add_argument("--jobs", required=True, help="JSON file containing text/output/speed jobs.")
    parser.add_argument("--device", default="cpu")
    args = parser.parse_args()

    jobs = json.loads(Path(args.jobs).read_text(encoding="utf-8"))
    if not isinstance(jobs, list):
        raise SystemExit("MeloTTS batch jobs must be a JSON array.")

    model, speaker_id = load_korean_model(args.device)
    for job in jobs:
        synthesize(
            model,
            speaker_id,
            job["text"],
            job["output"],
            float(job.get("speed", 1.0)),
        )


if __name__ == "__main__":
    main()
