import argparse
import hashlib
import json
import wave
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TOOL_DIR = Path(__file__).resolve().parent
DEFAULT_MANIFEST = TOOL_DIR / "generated_manifest.json"
DEFAULT_COMPARISON_MANIFEST = TOOL_DIR / "comparison_manifest.json"
DEFAULT_REVIEW_DATA = ROOT / "public" / "audio" / "audition" / "review-data.json"
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
    declared_entry_count = manifest.get("entryCount")
    if declared_entry_count != len(entries):
        errors.append(f"Generated manifest entryCount={declared_entry_count} does not match entries length={len(entries)}.")

    expected_by_key = {
        f"{job['sentenceId']}::{job['characterId']}::{job['speed']}": job
        for job in expected_jobs
    }
    manifest_keys = set()
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
        manifest_keys.add(key)
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

    missing_keys = sorted(set(expected_by_key) - manifest_keys)
    if missing_keys:
        preview = ", ".join(missing_keys[:5])
        errors.append(
            f"Generated manifest is missing {len(missing_keys)} expected TTS job(s). "
            f"Run npm run tts:manifest. First missing: {preview}"
        )

    return len(entries)


def validate_candidate_models(licenses, errors, warnings):
    allowed_decisions = {"pending_review", "not_approved", "approved_for_audition", "approved_for_production"}
    required_fields = (
        "modelId",
        "name",
        "sourceUrl",
        "modelCardUrl",
        "reviewDecision",
        "codeLicense",
        "weightLicense",
        "trainingDataLicense",
        "outputTerms",
        "commercialUse"
    )
    for candidate in licenses.get("candidateModels", []):
        model_id = candidate.get("modelId", "<missing-model-id>")
        for field in required_fields:
            if field not in candidate:
                errors.append(f"Candidate model {model_id} is missing {field}.")

        decision = candidate.get("reviewDecision")
        if decision not in allowed_decisions:
            errors.append(f"Candidate model {model_id} has unsupported reviewDecision: {decision}")

        has_pending_layer = any(
            candidate.get(field) in (None, "", "pending_review", "pending_primary_source")
            for field in ("codeLicense", "weightLicense", "trainingDataLicense", "outputTerms", "modelCardUrl")
        )
        if has_pending_layer and candidate.get("reviewDecision") == "approved_for_production":
            errors.append(f"Candidate model {model_id} cannot be production-approved with pending license layers.")

        if candidate.get("commercialUse") is True and candidate.get("reviewDecision") not in (
            "approved_for_audition",
            "approved_for_production"
        ):
            errors.append(f"Candidate model {model_id} cannot be commercialUse=true before approval.")

        if candidate.get("reviewDecision") == "pending_review":
            warnings.append(f"Candidate model {model_id} still needs primary-source license review.")


def validate_comparison_models(errors):
    models_path = TOOL_DIR / "comparison_models.json"
    if not models_path.exists():
        return []
    models = read_json("comparison_models.json")["models"]
    model_ids = set()
    for model in models:
        model_id = model.get("modelId", "<missing-model-id>")
        if model_id in model_ids:
            errors.append(f"Duplicate comparison modelId: {model_id}")
        model_ids.add(model_id)
        if model.get("realPersonClone") is not False:
            errors.append(f"Comparison model {model_id} must not clone a real person.")
        if model.get("provider") not in ("melotts", "qwen3_custom_voice"):
            errors.append(f"Unsupported comparison provider for {model_id}: {model.get('provider')}")
        for field in ("downloadUrl", "license", "voiceId", "normalRate", "slowRate", "outputSlug"):
            if field not in model:
                errors.append(f"Comparison model {model_id} is missing {field}.")
    return models


def validate_comparison_manifest(path, errors, warnings):
    if not path.exists():
        warnings.append(f"TTS comparison manifest does not exist yet: {path}")
        return 0
    manifest = json.loads(path.read_text(encoding="utf-8"))
    entries = manifest.get("entries", [])
    audio_ids = set()
    for entry in entries:
        audio_id = entry.get("audioId")
        if audio_id in audio_ids:
            errors.append(f"Duplicate comparison audioId: {audio_id}")
        audio_ids.add(audio_id)
        if entry.get("realPersonClone") is not False:
            errors.append(f"Comparison entry {audio_id} must not clone a real person.")
        wav_path = entry.get("wavPath", "")
        if not (wav_path.endswith("/normal.wav") or wav_path.endswith("/slow.wav")):
            errors.append(f"Comparison entry {audio_id} must end with normal.wav or slow.wav.")
        path_on_disk = ROOT / wav_path
        if path_on_disk.exists():
            validate_wave(path_on_disk, errors)
        elif entry.get("wavExists") is True:
            errors.append(f"Comparison manifest says WAV exists but file is missing: {wav_path}")
    if entries and len(entries) < 80:
        warnings.append(f"Comparison manifest has {len(entries)} entries; expected 80 for 20 sentences x 2 models x 2 speeds.")
    return len(entries)


def validate_review_data(path, errors, warnings):
    if not path.exists():
        warnings.append(f"TTS listening review data does not exist yet: {path}")
        return 0
    payload = json.loads(path.read_text(encoding="utf-8"))
    items = payload.get("items", [])
    audio_count = 0
    if payload.get("sentenceCount") != len(items):
        errors.append("Review data sentenceCount does not match items length.")
    for item in items:
        if not item.get("koreanText"):
            errors.append(f"Review item {item.get('sentenceId')} is missing koreanText.")
        models = item.get("models", {})
        if len(models) != 2:
            errors.append(f"Review item {item.get('sentenceId')} must include two comparison models.")
        for model_id, model in models.items():
            if model.get("realPersonClone") is not False:
                errors.append(f"Review model {model_id} must not clone a real person.")
            audio = model.get("audio", {})
            for speed in ("normal", "slow"):
                entry = audio.get(speed)
                if not entry:
                    errors.append(f"Review model {model_id} is missing {speed} audio.")
                    continue
                audio_count += 1
                src = entry.get("src", "")
                if not src.startswith("/audio/audition/"):
                    errors.append(f"Review audio source must stay under /audio/audition/: {src}")
                wav_path = ROOT / entry.get("wavPath", "")
                if wav_path.exists():
                    validate_wave(wav_path, errors)
                else:
                    errors.append(f"Review audio file is missing: {entry.get('wavPath')}")
    if payload.get("entryCount") != audio_count:
        errors.append("Review data entryCount does not match available audio entries.")
    return audio_count


def main():
    parser = argparse.ArgumentParser(description="Validate static Korean TTS metadata and generated WAV files.")
    parser.add_argument("--manifest", default=str(DEFAULT_MANIFEST), help="Generated manifest path to validate.")
    parser.add_argument(
        "--comparison-manifest",
        default=str(DEFAULT_COMPARISON_MANIFEST),
        help="MeloTTS/Qwen comparison manifest path to validate."
    )
    parser.add_argument(
        "--review-data",
        default=str(DEFAULT_REVIEW_DATA),
        help="Listening review data path to validate."
    )
    args = parser.parse_args()

    errors = []
    warnings = []
    voices = read_json("voices.json")["characters"]
    sentences = read_json("sentences.json")["sentences"]
    licenses = read_json("licenses.json")

    if licenses["policy"].get("paidTtsAllowed") is not False:
        errors.append("paidTtsAllowed must be false.")

    validate_candidate_models(licenses, errors, warnings)
    validate_comparison_models(errors)

    for provider in licenses.get("blockedProviders", []):
        lowered = provider.lower()
        if not any(pattern in lowered for pattern in PAID_PATTERNS):
            warnings.append(f"Blocked provider is not recognized by validator pattern list: {provider}")

    voice_ids = set()
    sentence_ids = set()
    for voice in voices:
        voice_ids.add(voice["characterId"])
        if voice.get("commercialUse") is True and "approved" not in voice.get("reviewStatus", ""):
            errors.append(f"Voice {voice['characterId']} cannot be commercialUse=true before approval.")
        if voice.get("modelId") == "pending_model_selection":
            warnings.append(f"Voice {voice['characterId']} still needs model selection.")
        else:
            selected_model = next(
                (
                    candidate
                    for candidate in licenses.get("candidateModels", [])
                    if candidate.get("modelId") == voice.get("modelId")
                ),
                None
            )
            if not selected_model:
                errors.append(f"Voice {voice['characterId']} references unknown model {voice.get('modelId')}.")
            elif selected_model.get("reviewDecision") != "approved_for_production":
                errors.append(
                    f"Voice {voice['characterId']} cannot use model {voice.get('modelId')} "
                    f"with reviewDecision={selected_model.get('reviewDecision')}."
                )

    expected_jobs = []
    for sentence in sentences:
        if sentence["sentenceId"] in sentence_ids:
            errors.append(f"Duplicate sentenceId: {sentence['sentenceId']}")
        sentence_ids.add(sentence["sentenceId"])
        if sentence.get("licenseUse") != "pending_review_audition_only":
            errors.append(f"Sentence {sentence['sentenceId']} must stay pending_review_audition_only before audio approval.")
        if not sentence.get("auditionTags"):
            errors.append(f"Sentence {sentence['sentenceId']} must include auditionTags.")
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
    comparison_entry_count = validate_comparison_manifest(Path(args.comparison_manifest), errors, warnings)
    review_audio_count = validate_review_data(Path(args.review_data), errors, warnings)

    for warning in warnings:
        print(f"WARN {warning}")
    if errors:
        for error in errors:
            print(f"ERROR {error}")
        raise SystemExit(1)
    print(
        f"TTS metadata validation passed: {len(sentences)} sentence(s), "
        f"{len(voices)} voice profile(s), {manifest_entry_count} manifest entry(s), "
        f"{comparison_entry_count} comparison entry(s), {review_audio_count} review audio entry(s)."
    )


if __name__ == "__main__":
    main()
