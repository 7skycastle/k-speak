import argparse
from pathlib import Path


def load_model(model_id, device_map="auto"):
    try:
        import soundfile as sf
        import torch
        from qwen_tts import Qwen3TTSModel
    except ImportError as exc:
        raise SystemExit(
            "Qwen3-TTS dependencies are not installed. Create a dedicated TTS environment first; "
            "see docs/AUDIO_PIPELINE.md."
        ) from exc

    dtype = torch.bfloat16 if torch.cuda.is_available() else torch.float32
    return Qwen3TTSModel.from_pretrained(model_id, device_map=device_map, dtype=dtype), sf


def synthesize(model, soundfile, text, output, speaker="Sohee", language="Korean", instruction=""):
    output_path = Path(output)
    output_path.parent.mkdir(parents=True, exist_ok=True)
    kwargs = {
        "text": text,
        "language": language,
        "speaker": speaker
    }
    if instruction:
        kwargs["instruct"] = instruction
    wavs, sample_rate = model.generate_custom_voice(**kwargs)
    soundfile.write(str(output_path), wavs[0], sample_rate)


def main():
    parser = argparse.ArgumentParser(description="Generate one Korean WAV with Qwen3-TTS CustomVoice.")
    parser.add_argument("--text", required=True)
    parser.add_argument("--output", required=True)
    parser.add_argument("--speaker", default="Sohee")
    parser.add_argument("--language", default="Korean")
    parser.add_argument("--model-id", default="Qwen/Qwen3-TTS-12Hz-0.6B-CustomVoice")
    parser.add_argument("--instruction", default="")
    parser.add_argument("--device-map", default="auto")
    args = parser.parse_args()

    model, soundfile = load_model(args.model_id, args.device_map)
    synthesize(model, soundfile, args.text, args.output, args.speaker, args.language, args.instruction)


if __name__ == "__main__":
    main()
