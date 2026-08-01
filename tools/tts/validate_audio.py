import argparse
import hashlib
import json
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TOOL_DIR = Path(__file__).resolve().parent
DEFAULT_MANIFEST = TOOL_DIR / "generated_manifest.json"
PAID_PATTERNS = ("elevenlabs", "openai", "google cloud", "azure", "clova", "polly", "typecast")


def read_json(name):
    return json.loads((TOOL_DIR / name).read_text(encoding="utf-8"))


def slug_from_sentence(sentence_id):
    return sentence_id.split(".", 1)[1].replace(".", "-")


def expected_path(sentence, character_id, speed):
    slug = slug_from_sentence(sentence["sentenceId"])
    return ROOT / "public" / "audio" / sentence["lessonId"] / character_id / f"{slug}-{speed}.wav"


def expected_relative_path(sentence, character_id, speed):
    return expected_path(sentence, character_id, speed).resolve().relative_to(ROOT).as_posix()


def validate_wave(path, errors):
    if not path.exists():
        return
    if path.stat().st_size <= 44:
        errors.append(f"Audio file is empty or too small: {path}")
        return
    try:
        with wave.open(str(path), "rb") as wav:
            duration = wav.getnframes() / float(wav.getframerate())
            if duration <= 0:
                errors.append(f"Audio file has zero duration: {path}")
            if duration > 20:
                errors.append(f"Audio file is unexpectedly long for first-talk phrase audio: {path}")
    except wave.Error as exc:
        errors.append(f"Invalid wav file {path}: {exc}")


def validate_manifest(path, expected_jobs, errors, warnings):
    if not path.exists():
        warnings.append(f"TTS generated manifest does not exist yet: {path}")
        return 0

    manifest = json.loads(path.read_text(encoding="utf-8"))
    entries = manifest.get("entries", [])
    expected_by_key = {
        f"{job['sentenceId']}::{job['characterId']}::{job['speed']}": job
        for job in expected_jobs
    }
    seen_audio_ids = set()
    paths_by_content = {}

    for entry in entries:
        audio_id = entry.get("audioId")
        if audio_id in seen_audio_ids:
            errors.append(f"Duplicate manifest audioId: {audio_id}")
        seen_audio_ids.add(audio_id)

        if entry.get("commercialUse") is True and entry.get("licenseStatus") != "approved":
            errors.append(f"Manifest entry {audio_id} cannot be commercialUse=true before approval.")

        key = f"{entry.get('sentenceId')}::{entry.get('characterId')}::{entry.get('speed')}"
        expected = expected_by_key.get(key)
        if not expected:
            warnings.append(f"Manifest entry is not in current sentence plan: {audio_id}")
        else:
            if entry.get("textHash") != expected["textHash"]:
                errors.append(f"Manifest textHash mismatch for {audio_id}.")
            if entry.get("wavPath") != expected["wavPath"]:
                errors.append(f"Manifest wavPath mismatch for {audio_id}: {entry.get('wavPath')}")

        content_key = f"{entry.get('textHash')}::{entry.get('characterId')}::{entry.get('speed')}::{entry.get('voiceId')}"
        paths_by_content.setdefault(content_key, set()).add(entry.get("wavPath"))

        wav_path = ROOT / entry.get("wavPath", "")
        if wav_path.exists():
            validate_wave(wav_path, errors)
        elif entry.get("wavExists") is True:
            errors.append(f"Manifest says WAV exists but file is missing: {entry.get('wavPath')}")

    for content_key, paths in paths_by_content.items():
        valid_paths = {path for path in paths if path}
        if len(valid_paths) > 1:
            warnings.append(f"Same text/voice/speed appears in multiple WAV paths: {content_key}")

    return len(entries)


def main():
    parser = argparse.ArgumentParser(description="Validate static Korean TTS metadata and generated WAV files.")
    parser.add_argument("--manifest", default=str(DEFAULT_MANIFEST), help="Generated manifest path to validate.")
    args = parser.parse_args()

    errors = []
    warnings = []
    voices = read_json("voices.json")["characters"]
    sentences = read_json("sentences.json")["sentences"]
    licenses = read_json("licenses.json")

    if licenses["policy"].get("paidTtsAllowed") is not False:
        errors.append("paidTtsAllowed must be false.")

    for provider in licenses.get("blockedProviders", []):
        lowered = provider.lower()
        if not any(pattern in lowered for pattern in PAID_PATTERNS):
            warnings.append(f"Blocked provider is not recognized by validator pattern list: {provider}")

    voice_ids = set()
    for voice in voices:
        voice_ids.add(voice["characterId"])
        if voice.get("commercialUse") is True and "approved" not in voice.get("reviewStatus", ""):
            errors.append(f"Voice {voice['characterId']} cannot be commercialUse=true before approval.")
        if voice.get("modelId") == "pending_model_selection":
            warnings.append(f"Voice {voice['characterId']} still needs model selection.")

    expected_jobs = []
    for sentence in sentences:
        sentence_paths_by_hash = {}
        for character_id in sentence["characterIds"]:
            if character_id not in voice_ids:
                errors.append(f"Sentence {sentence['sentenceId']} references unknown character {character_id}.")
            for speed in sentence["speeds"]:
                if speed not in ("natural", "slow"):
                    errors.append(f"Unsupported speed {speed} for {sentence['sentenceId']}.")
                path = expected_path(sentence, character_id, speed)
                validate_wave(path, errors)
                text_hash = hashlib.sha256(sentence["koreanText"].encode("utf-8")).hexdigest()
                expected_jobs.append(
                    {
                        "sentenceId": sentence["sentenceId"],
                        "characterId": character_id,
                        "speed": speed,
                        "textHash": text_hash,
                        "wavPath": expected_relative_path(sentence, character_id, speed)
                    }
                )
                sentence_paths_by_hash.setdefault(f"{text_hash}::{character_id}::{speed}", set()).add(str(path))

        for content_key, paths in sentence_paths_by_hash.items():
            if len(paths) > 1:
                warnings.append(f"Duplicate sentence content planned for multiple paths: {content_key}")

    manifest_entry_count = validate_manifest(Path(args.manifest), expected_jobs, errors, warnings)

    for warning in warnings:
        print(f"WARN {warning}")
    if errors:
        for error in errors:
            print(f"ERROR {error}")
        raise SystemExit(1)
    print(
        f"TTS metadata validation passed: {len(sentences)} sentence(s), "
        f"{len(voices)} voice profile(s), {manifest_entry_count} manifest entry(s)."
    )


if __name__ == "__main__":
    main()
