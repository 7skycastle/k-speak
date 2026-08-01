import argparse
import hashlib
import json
import os
import subprocess
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TOOL_DIR = Path(__file__).resolve().parent
DEFAULT_MANIFEST = TOOL_DIR / "generated_manifest.json"
PAID_PATTERNS = ("elevenlabs", "openai", "google", "azure", "clova", "polly", "typecast")


def read_json(name):
    return json.loads((TOOL_DIR / name).read_text(encoding="utf-8"))


def slug_from_sentence(sentence_id):
    return sentence_id.split(".", 1)[1].replace(".", "-")


def output_path(sentence, character_id, speed):
    slug = slug_from_sentence(sentence["sentenceId"])
    return ROOT / "public" / "audio" / sentence["lessonId"] / character_id / f"{slug}-{speed}.wav"


def relative_to_root(path):
    return path.resolve().relative_to(ROOT).as_posix()


def validate_command(command):
    lowered = command.lower()
    blocked = [pattern for pattern in PAID_PATTERNS if pattern in lowered]
    if blocked:
        raise SystemExit(f"Blocked paid TTS command/provider pattern: {', '.join(blocked)}")
    required = ("{text}", "{output}")
    missing = [token for token in required if token not in command]
    if missing:
        raise SystemExit(f"KFT_TTS_COMMAND missing required token(s): {', '.join(missing)}")


def build_jobs(sentence_filter=None, lesson_filter=None, character_filter=None, speed_filter=None):
    sentences = read_json("sentences.json")["sentences"]
    voices = {voice["characterId"]: voice for voice in read_json("voices.json")["characters"]}
    jobs = []
    for sentence in sentences:
        if sentence_filter and sentence["sentenceId"] != sentence_filter:
            continue
        if lesson_filter and sentence["lessonId"] != lesson_filter:
            continue
        for character_id in sentence["characterIds"]:
            if character_filter and character_id != character_filter:
                continue
            voice = voices[character_id]
            for speed in sentence["speeds"]:
                if speed_filter and speed != speed_filter:
                    continue
                rate = voice["rateSlow"] if speed == "slow" else voice["rateNatural"]
                out = output_path(sentence, character_id, speed)
                jobs.append(
                    {
                        "sentenceId": sentence["sentenceId"],
                        "lessonId": sentence["lessonId"],
                        "phraseId": sentence["phraseId"],
                        "characterId": character_id,
                        "speed": speed,
                        "rate": rate,
                        "voiceId": voice["voiceId"],
                        "modelId": voice["modelId"],
                        "modelVersion": voice.get("modelVersion", "pending_model_selection"),
                        "textHash": hashlib.sha256(sentence["koreanText"].encode("utf-8")).hexdigest(),
                        "text": sentence["koreanText"],
                        "output": str(out),
                        "outputRelative": relative_to_root(out)
                    }
                )
    return jobs


def should_skip(job, manifest_entries, force):
    if force:
        return False
    out = Path(job["output"])
    if not out.exists():
        return False
    existing = manifest_entries.get(job_key(job))
    if not existing:
        return False
    return (
        existing.get("textHash") == job["textHash"]
        and existing.get("modelId") == job["modelId"]
        and existing.get("voiceId") == job["voiceId"]
        and existing.get("rate") == job["rate"]
    )


def job_key(job):
    return f"{job['sentenceId']}::{job['characterId']}::{job['speed']}"


def load_manifest(path):
    if not path.exists():
        return {"version": 1, "generatedAt": None, "entries": []}
    return json.loads(path.read_text(encoding="utf-8"))


def write_manifest(path, jobs, previous_manifest):
    entries_by_key = {
        f"{entry['sentenceId']}::{entry['characterId']}::{entry['speed']}": entry
        for entry in previous_manifest.get("entries", [])
    }
    generated_at = datetime.now(timezone.utc).isoformat()
    manifest_touched = False
    for job in jobs:
        out = Path(job["output"])
        previous_entry = entries_by_key.get(job_key(job), {})
        entry_generated_at = previous_entry.get("generatedAt")
        if out.exists() and not entry_generated_at:
            entry_generated_at = generated_at
            manifest_touched = True
        if previous_entry.get("wavExists") != out.exists():
            manifest_touched = True
        entries_by_key[job_key(job)] = {
            "audioId": f"{job['lessonId']}.{job['phraseId']}.{job['characterId']}.{job['speed']}.v1",
            "sentenceId": job["sentenceId"],
            "lessonId": job["lessonId"],
            "phraseId": job["phraseId"],
            "characterId": job["characterId"],
            "speed": job["speed"],
            "sourceType": "ai_generated_static",
            "provider": "local_open_source",
            "modelId": job["modelId"],
            "modelVersion": job["modelVersion"],
            "voiceId": job["voiceId"],
            "audioVersion": "v1",
            "textHash": job["textHash"],
            "rate": job["rate"],
            "wavPath": job["outputRelative"],
            "wavExists": out.exists(),
            "generatedAt": entry_generated_at,
            "codeLicense": "pending_review",
            "weightLicense": "pending_review",
            "trainingDataLicense": "pending_review",
            "licenseStatus": "pending_review",
            "commercialUse": False,
            "reviewStatus": "not_reviewed"
        }
    path.parent.mkdir(parents=True, exist_ok=True)
    manifest = {
        "version": 1,
        "updatedAt": generated_at if manifest_touched else previous_manifest.get("updatedAt"),
        "entryCount": len(entries_by_key),
        "entries": sorted(entries_by_key.values(), key=lambda entry: entry["audioId"])
    }
    path.write_text(json.dumps(manifest, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    return manifest


def run_job(command_template, job):
    out = Path(job["output"])
    out.parent.mkdir(parents=True, exist_ok=True)
    command = command_template.format(
        text=job["text"],
        output=job["output"],
        voiceId=job["voiceId"],
        speed=job["speed"],
        rate=job["rate"]
    )
    subprocess.run(command, shell=True, check=True)


def main():
    parser = argparse.ArgumentParser(description="Plan or run local static Korean TTS generation.")
    parser.add_argument("--sentence-id")
    parser.add_argument("--lesson-id")
    parser.add_argument("--character-id")
    parser.add_argument("--speed", choices=["natural", "slow"])
    parser.add_argument("--execute", action="store_true", help="Run KFT_TTS_COMMAND. Default is dry-run.")
    parser.add_argument("--dry-run", action="store_true", help="Print generation plan only.")
    parser.add_argument("--force", action="store_true", help="Regenerate even when manifest and file hash metadata match.")
    parser.add_argument("--continue-on-error", action="store_true", help="Keep running other jobs after a command failure.")
    parser.add_argument("--manifest", default=str(DEFAULT_MANIFEST), help="Manifest path to read/update.")
    parser.add_argument("--write-manifest", action="store_true", help="Write/update manifest for matching jobs without executing.")
    args = parser.parse_args()

    jobs = build_jobs(args.sentence_id, args.lesson_id, args.character_id, args.speed)
    if not jobs:
        raise SystemExit("No matching TTS jobs.")

    manifest_path = Path(args.manifest)
    previous_manifest = load_manifest(manifest_path)
    manifest_entries = {
        f"{entry['sentenceId']}::{entry['characterId']}::{entry['speed']}": entry
        for entry in previous_manifest.get("entries", [])
    }
    skipped = [job for job in jobs if should_skip(job, manifest_entries, args.force)]
    runnable_jobs = [job for job in jobs if job not in skipped]
    failures = []

    command_template = os.environ.get("KFT_TTS_COMMAND", "")
    if args.execute:
        validate_command(command_template)
        for job in runnable_jobs:
            try:
                run_job(command_template, job)
            except subprocess.CalledProcessError as exc:
                failures.append(
                    {
                        "sentenceId": job["sentenceId"],
                        "characterId": job["characterId"],
                        "speed": job["speed"],
                        "output": job["output"],
                        "exitCode": exc.returncode
                    }
                )
                if not args.continue_on_error:
                    break

    manifest = None
    if args.execute or args.write_manifest:
        manifest = write_manifest(manifest_path, jobs, previous_manifest)

    result = {
        "execute": args.execute,
        "manifestPath": str(manifest_path),
        "jobCount": len(jobs),
        "skippedCount": len(skipped),
        "runnableCount": len(runnable_jobs),
        "failureCount": len(failures),
        "jobs": jobs,
        "skipped": skipped,
        "failures": failures
    }
    if manifest:
        result["manifestEntryCount"] = manifest["entryCount"]
    print(json.dumps(result, ensure_ascii=False, indent=2))

    if failures:
        raise SystemExit(1)


if __name__ == "__main__":
    main()
