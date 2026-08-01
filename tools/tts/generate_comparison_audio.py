import argparse
import hashlib
import json
import os
import subprocess
import sys
import tempfile
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TOOL_DIR = Path(__file__).resolve().parent
DEFAULT_MANIFEST = TOOL_DIR / "comparison_manifest.json"
PAID_PATTERNS = ("elevenlabs", "openai", "google", "azure", "clova", "polly", "typecast")
SPEEDS = ("normal", "slow")


def read_json(name):
    return json.loads((TOOL_DIR / name).read_text(encoding="utf-8"))


def phrase_slug(sentence):
    return sentence["phraseId"].replace(".", "-")


def text_hash(text):
    return hashlib.sha256(text.encode("utf-8")).hexdigest()


def relative_to_root(path):
    return path.resolve().relative_to(ROOT).as_posix()


def default_command(model, speed):
    provider_dir = TOOL_DIR / "providers"
    if model["provider"] == "melotts":
        return (
            f'"{sys.executable}" "{provider_dir / "melotts_generate.py"}" '
            '--text "{text}" --output "{output}" --speed {rate}'
        )
    if model["provider"] == "qwen3_custom_voice":
        return (
            f'"{sys.executable}" "{provider_dir / "qwen3_generate.py"}" '
            '--text "{text}" --output "{output}" --speaker "{voiceId}" --language "{language}" '
            '--model-id "{modelVersion}" --instruction "{instruction}"'
        )
    raise SystemExit(f"Unsupported comparison provider: {model['provider']}")


def validate_command(command):
    lowered = command.lower()
    blocked = [pattern for pattern in PAID_PATTERNS if pattern in lowered]
    if blocked:
        raise SystemExit(f"Blocked paid TTS command/provider pattern: {', '.join(blocked)}")
    for token in ("{text}", "{output}"):
        if token not in command:
            raise SystemExit(f"Comparison command missing required token: {token}")


def output_path(model, sentence, speed):
    return (
        ROOT
        / "public"
        / "audio"
        / "audition"
        / model["outputSlug"]
        / phrase_slug(sentence)
        / f"{speed}.wav"
    )


def build_jobs(model_filter=None, sentence_filter=None, speed_filter=None, limit=20):
    sentences = read_json("sentences.json")["sentences"][:limit]
    models = read_json("comparison_models.json")["models"]
    jobs = []
    for model in models:
        if model_filter and model["modelId"] != model_filter:
            continue
        for sentence in sentences:
            if sentence_filter and sentence["sentenceId"] != sentence_filter:
                continue
            for speed in SPEEDS:
                if speed_filter and speed != speed_filter:
                    continue
                rate = model["slowRate"] if speed == "slow" else model["normalRate"]
                instruction = model.get("slowInstruction", "") if speed == "slow" else ""
                out = output_path(model, sentence, speed)
                jobs.append(
                    {
                        "sentenceId": sentence["sentenceId"],
                        "lessonId": sentence["lessonId"],
                        "phraseId": sentence["phraseId"],
                        "koreanText": sentence["koreanText"],
                        "auditionTags": sentence.get("auditionTags", []),
                        "modelId": model["modelId"],
                        "provider": model["provider"],
                        "modelVersion": model["modelVersion"],
                        "downloadUrl": model["downloadUrl"],
                        "license": model["license"],
                        "voiceId": model["voiceId"],
                        "language": model["language"],
                        "speed": speed,
                        "rate": rate,
                        "instruction": instruction,
                        "realPersonClone": model["realPersonClone"],
                        "textHash": text_hash(sentence["koreanText"]),
                        "output": str(out),
                        "outputRelative": relative_to_root(out)
                    }
                )
    return jobs


def manifest_key(job):
    return f"{job['modelId']}::{job['sentenceId']}::{job['speed']}"


def load_manifest(path):
    if not path.exists():
        return {"version": 1, "entries": []}
    return json.loads(path.read_text(encoding="utf-8"))


def write_manifest(path, jobs, previous_manifest):
    existing = {
        f"{entry['modelId']}::{entry['sentenceId']}::{entry['speed']}": entry
        for entry in previous_manifest.get("entries", [])
    }
    updated_at = datetime.now(timezone.utc).isoformat()
    for job in jobs:
        out = Path(job["output"])
        previous = existing.get(manifest_key(job), {})
        generated_at = previous.get("generatedAt")
        if out.exists() and not generated_at:
            generated_at = updated_at
        existing[manifest_key(job)] = {
            "audioId": f"{job['modelId']}.{job['phraseId']}.{job['speed']}.v1",
            "sentenceId": job["sentenceId"],
            "lessonId": job["lessonId"],
            "phraseId": job["phraseId"],
            "modelId": job["modelId"],
            "provider": job["provider"],
            "modelVersion": job["modelVersion"],
            "downloadUrl": job["downloadUrl"],
            "license": job["license"],
            "voiceId": job["voiceId"],
            "language": job["language"],
            "speed": job["speed"],
            "rate": job["rate"],
            "instruction": job["instruction"],
            "realPersonClone": job["realPersonClone"],
            "textHash": job["textHash"],
            "wavPath": job["outputRelative"],
            "wavExists": out.exists(),
            "generatedAt": generated_at,
            "reviewStatus": "not_reviewed",
            "pronunciationAccuracy": "not_reviewed",
            "naturalness": "not_reviewed",
            "slowAudioQuality": "not_reviewed",
            "generationSpeed": "not_measured",
            "runtimeNotes": ""
        }
    manifest = {
        "version": 1,
        "updatedAt": updated_at,
        "entryCount": len(existing),
        "entries": sorted(existing.values(), key=lambda entry: entry["audioId"])
    }
    path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return manifest


def run_job(job):
    command = os.environ.get(f"KFT_{job['provider'].upper()}_COMMAND") or default_command(job, job["speed"])
    validate_command(command)
    Path(job["output"]).parent.mkdir(parents=True, exist_ok=True)
    expanded = command.format(
        text=job["koreanText"],
        output=job["output"],
        voiceId=job["voiceId"],
        language=job["language"],
        modelId=job["modelId"],
        modelVersion=job["modelVersion"],
        speed=job["speed"],
        rate=job["rate"],
        instruction=job["instruction"]
    )
    subprocess.run(expanded, shell=True, check=True, cwd=tempfile.gettempdir())


def can_run_melotts_batch(job):
    return job["provider"] == "melotts" and not os.environ.get("KFT_MELOTTS_COMMAND")


def can_run_qwen3_batch(job):
    return job["provider"] == "qwen3_custom_voice" and not os.environ.get("KFT_QWEN3_CUSTOM_VOICE_COMMAND")


def run_melotts_batch(jobs):
    provider = TOOL_DIR / "providers" / "melotts_batch_generate.py"
    payload = []
    for job in jobs:
        Path(job["output"]).parent.mkdir(parents=True, exist_ok=True)
        payload.append(
            {
                "text": job["koreanText"],
                "output": job["output"],
                "speed": job["rate"],
            }
        )
    with tempfile.TemporaryDirectory() as tmp:
        jobs_path = Path(tmp) / "melotts_jobs.json"
        jobs_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        subprocess.run(
            [sys.executable, str(provider), "--jobs", str(jobs_path)],
            check=True,
            cwd=tempfile.gettempdir(),
        )


def run_qwen3_batch(jobs):
    provider = TOOL_DIR / "providers" / "qwen3_batch_generate.py"
    payload = []
    for job in jobs:
        Path(job["output"]).parent.mkdir(parents=True, exist_ok=True)
        payload.append(
            {
                "text": job["koreanText"],
                "output": job["output"],
                "speaker": job["voiceId"],
                "language": job["language"],
                "instruction": job["instruction"],
            }
        )
    model_ids = sorted({job["modelVersion"] for job in jobs})
    if len(model_ids) != 1:
        raise SystemExit("Qwen3 batch execution requires one modelVersion per batch.")
    with tempfile.TemporaryDirectory() as tmp:
        jobs_path = Path(tmp) / "qwen3_jobs.json"
        jobs_path.write_text(json.dumps(payload, ensure_ascii=False, indent=2), encoding="utf-8")
        subprocess.run(
            [
                sys.executable,
                str(provider),
                "--jobs",
                str(jobs_path),
                "--model-id",
                model_ids[0],
            ],
            check=True,
            cwd=tempfile.gettempdir(),
        )


def main():
    parser = argparse.ArgumentParser(description="Generate or plan MeloTTS/Qwen3 Korean TTS comparison audio.")
    parser.add_argument("--model-id")
    parser.add_argument("--sentence-id")
    parser.add_argument("--speed", choices=SPEEDS)
    parser.add_argument("--limit", type=int, default=20)
    parser.add_argument("--manifest", default=str(DEFAULT_MANIFEST))
    parser.add_argument("--execute", action="store_true")
    parser.add_argument("--write-manifest", action="store_true")
    parser.add_argument("--continue-on-error", action="store_true")
    args = parser.parse_args()

    jobs = build_jobs(args.model_id, args.sentence_id, args.speed, args.limit)
    if not jobs:
        raise SystemExit("No matching comparison jobs.")

    failures = []
    if args.execute:
        melotts_batch_jobs = [job for job in jobs if can_run_melotts_batch(job)]
        qwen3_batch_jobs = [job for job in jobs if can_run_qwen3_batch(job)]
        remaining_jobs = [
            job for job in jobs if not can_run_melotts_batch(job) and not can_run_qwen3_batch(job)
        ]
        if melotts_batch_jobs:
            try:
                run_melotts_batch(melotts_batch_jobs)
            except subprocess.CalledProcessError as exc:
                for job in melotts_batch_jobs:
                    failures.append(
                        {
                            "modelId": job["modelId"],
                            "sentenceId": job["sentenceId"],
                            "speed": job["speed"],
                            "exitCode": exc.returncode,
                            "output": job["output"]
                        }
                )
                if not args.continue_on_error:
                    remaining_jobs = []
                    qwen3_batch_jobs = []
        if qwen3_batch_jobs:
            try:
                run_qwen3_batch(qwen3_batch_jobs)
            except subprocess.CalledProcessError as exc:
                for job in qwen3_batch_jobs:
                    failures.append(
                        {
                            "modelId": job["modelId"],
                            "sentenceId": job["sentenceId"],
                            "speed": job["speed"],
                            "exitCode": exc.returncode,
                            "output": job["output"]
                        }
                    )
                if not args.continue_on_error:
                    remaining_jobs = []
        for job in remaining_jobs:
            try:
                run_job(job)
            except subprocess.CalledProcessError as exc:
                failures.append(
                    {
                        "modelId": job["modelId"],
                        "sentenceId": job["sentenceId"],
                        "speed": job["speed"],
                        "exitCode": exc.returncode,
                        "output": job["output"]
                    }
                )
                if not args.continue_on_error:
                    break

    manifest = None
    manifest_path = Path(args.manifest)
    if args.write_manifest or args.execute:
        manifest = write_manifest(manifest_path, jobs, load_manifest(manifest_path))

    result = {
        "execute": args.execute,
        "jobCount": len(jobs),
        "failureCount": len(failures),
        "manifestPath": str(manifest_path),
        "manifestEntryCount": manifest["entryCount"] if manifest else None,
        "jobs": jobs,
        "failures": failures
    }
    print(json.dumps(result, ensure_ascii=False, indent=2))
    if failures:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
