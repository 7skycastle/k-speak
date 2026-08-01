import json
from pathlib import Path

ROOT = Path(__file__).resolve().parents[2]
TOOL_DIR = Path(__file__).resolve().parent
OUTPUT = ROOT / "public" / "audio" / "audition" / "review-data.json"


def read_json(path):
    return json.loads(path.read_text(encoding="utf-8"))


def public_path(wav_path):
    if not wav_path.startswith("public/"):
        raise SystemExit(f"Audition wavPath must start with public/: {wav_path}")
    return "/" + wav_path.removeprefix("public/")


def main():
    sentences = read_json(TOOL_DIR / "sentences.json")["sentences"]
    sentence_map = {sentence["sentenceId"]: sentence for sentence in sentences}
    manifest = read_json(TOOL_DIR / "comparison_manifest.json")
    entries = manifest.get("entries", [])

    groups = {}
    for sentence in sentences:
        groups[sentence["sentenceId"]] = {
            "sentenceId": sentence["sentenceId"],
            "lessonId": sentence["lessonId"],
            "phraseId": sentence["phraseId"],
            "koreanText": sentence["koreanText"],
            "romanization": sentence["romanization"],
            "auditionTags": sentence.get("auditionTags", []),
            "models": {},
        }

    for entry in entries:
        sentence = sentence_map.get(entry["sentenceId"])
        if not sentence:
            raise SystemExit(f"Manifest references unknown sentenceId: {entry['sentenceId']}")
        group = groups[entry["sentenceId"]]
        model = group["models"].setdefault(
            entry["modelId"],
            {
                "modelId": entry["modelId"],
                "provider": entry["provider"],
                "modelVersion": entry["modelVersion"],
                "downloadUrl": entry["downloadUrl"],
                "license": entry["license"],
                "voiceId": entry["voiceId"],
                "language": entry["language"],
                "realPersonClone": entry["realPersonClone"],
                "audio": {},
            },
        )
        model["audio"][entry["speed"]] = {
            "audioId": entry["audioId"],
            "speed": entry["speed"],
            "rate": entry["rate"],
            "src": public_path(entry["wavPath"]),
            "wavPath": entry["wavPath"],
            "wavExists": entry["wavExists"],
            "generatedAt": entry["generatedAt"],
        }

    review_items = list(groups.values())
    missing = []
    for item in review_items:
        for model_id, model in item["models"].items():
            for speed in ("normal", "slow"):
                audio = model["audio"].get(speed)
                if not audio:
                    missing.append(f"{item['sentenceId']}::{model_id}::{speed}")
                    continue
                if not (ROOT / audio["wavPath"]).exists():
                    missing.append(audio["wavPath"])
    if missing:
        raise SystemExit("Missing review audio: " + ", ".join(missing[:10]))

    payload = {
        "version": 1,
        "sourceManifest": "tools/tts/comparison_manifest.json",
        "entryCount": len(entries),
        "sentenceCount": len(review_items),
        "reviewCriteria": [
            "pronunciationAccuracy",
            "naturalness",
            "slowAudioQuality",
            "defects",
            "overallDecision",
        ],
        "items": review_items,
    }
    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT.write_text(json.dumps(payload, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {OUTPUT.relative_to(ROOT)} with {len(review_items)} sentence groups and {len(entries)} audio entries.")


if __name__ == "__main__":
    main()
