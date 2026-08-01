# Korean TTS License Research - 2026-08-02

Research target: free/local Korean-capable TTS candidates for `korean-first-talk`, with a conservative production decision for static commercial app audio.

Decision rule used here: a candidate is **production_approved** only if the primary sources clearly allow the code, model weights, training-data provenance/license, and generated output use for commercial app audio. If training data or generated-output commercial terms are unclear, the status remains **pending_review** or **not_approved**.

## 2026-08-02 Correction

The earlier production recommendation in this file was too conservative for the immediate audition workflow.

After re-checking the official MeloTTS README/model card and Qwen3-TTS repo/model card, the project decision is:

- MeloTTS-Korean is approved for audition as the first recommended model because the reviewed official sources state MIT and free commercial/non-commercial use.
- Qwen3-TTS 0.6B CustomVoice Sohee is approved for audition as the quality comparison candidate because the reviewed official sources state Apache-2.0, Korean support, and the built-in Korean speaker Sohee.
- Neither model is automatically linked into the production app catalog until generated files pass listening review, manifest validation, and deployment documentation.
- Piper/KSS remains not approved because the Korean community model/data lineage is non-commercial.

## Summary

| Candidate | Korean support | Code license | Model weights/license | Training data/license | Output commercial terms | Static commercial app audio status |
|---|---:|---|---|---|---|---|
| Qwen3-TTS / Qwen-TTS | Yes | Apache-2.0 | Apache-2.0 per model card and technical report | Undisclosed beyond broad training-scale statement | No separate restriction found in reviewed primary sources | approved_for_audition |
| MeloTTS Korean | Yes | MIT | MIT on Hugging Face model card | Undisclosed in primary model/repo docs reviewed | Official source states free commercial/non-commercial use | approved_for_audition |
| Piper ONNX KSS Korean (community model) | Yes | Piper runtime MIT | CC-BY-NC-SA-4.0 | KSS / Bingsu KSS dataset, CC-BY-NC-SA-4.0 / non-commercial | Blocked by non-commercial model/data license before output analysis | not_approved |

## Candidate 1: Qwen3-TTS / Qwen-TTS

Primary sources:

- Official repo: https://github.com/QwenLM/Qwen3-TTS
- Repo license: https://raw.githubusercontent.com/QwenLM/Qwen3-TTS/main/LICENSE
- Hugging Face model card, example base model: https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-Base
- Raw model-card README: https://huggingface.co/Qwen/Qwen3-TTS-12Hz-1.7B-Base/raw/main/README.md
- Technical report: https://arxiv.org/abs/2601.15621

Findings:

- Code license: Apache-2.0. The GitHub repo exposes an Apache-2.0 license file with Alibaba Cloud copyright, and GitHub labels the repository license as Apache-2.0.
- Model weights/license: Apache-2.0 for the checked Qwen3-TTS Hugging Face model card. The raw model card frontmatter says `license: apache-2.0`; the technical report also says the tokenizers and models are released under Apache 2.0.
- Training data/license: not sufficiently disclosed for production approval. The technical report states the model was trained on over 5 million hours of speech data across 10 languages, but the official repo/model card/report reviewed here do not provide a dataset list, rights provenance, or training-data licenses.
- Generated output usage/commercial terms: not stated in the reviewed primary sources. Apache-2.0 covers the licensed work, but the sources reviewed do not separately state ownership or commercial-use terms for generated audio outputs.
- Korean support: yes. The official repo and model card list Korean among the 10 supported languages.
- Local Windows feasibility notes: possible in principle, but not a low-friction Windows-native choice. Official quickstart uses a fresh Python 3.12 conda environment and `pip install -U qwen-tts`; examples use CUDA and recommend FlashAttention 2 to reduce GPU memory. Treat Windows as a GPU/PyTorch environment-validation task, with WSL/Linux-style setup likely safer than assuming native Windows works smoothly.
- Static commercial app audio status: **approved_for_audition**. The code and model license are permissive enough for local comparison generation, but production catalog linking still requires listening review and deployment documentation.

## Candidate 2: MeloTTS Korean

Primary sources:

- Official repo: https://github.com/myshell-ai/MeloTTS
- Repo license: https://raw.githubusercontent.com/myshell-ai/MeloTTS/main/LICENSE
- Repo README: https://raw.githubusercontent.com/myshell-ai/MeloTTS/main/README.md
- Install/local usage docs: https://raw.githubusercontent.com/myshell-ai/MeloTTS/main/docs/install.md
- Training docs: https://raw.githubusercontent.com/myshell-ai/MeloTTS/main/docs/training.md
- Hugging Face Korean model card: https://huggingface.co/myshell-ai/MeloTTS-Korean

Findings:

- Code license: MIT. The repository `LICENSE` grants broad MIT permissions, and the README states the library is under MIT and free for commercial and non-commercial use.
- Model weights/license: MIT on the Hugging Face Korean model card. The checked model page labels `myshell-ai/MeloTTS-Korean` as `License: mit`.
- Training data/license: undisclosed in the primary sources reviewed. The README lists supported languages and downloadable example audio, while the training docs describe how to train on a custom dataset, but the Korean pretrained model card/repo docs reviewed here do not identify the dataset(s), source speaker rights, or dataset license for the released Korean weights.
- Generated output usage/commercial terms: not stated separately in the reviewed primary sources. The repo says the library is free for commercial/non-commercial use, but no reviewed source clearly states commercial rights for generated audio outputs from the pretrained Korean model.
- Korean support: yes. The official README lists Korean, the Hugging Face model card is specifically Korean, and local usage docs include `TTS(language='KR')`.
- Local Windows feasibility notes: feasible, especially via Docker. The official install docs say the repo was developed/tested on Ubuntu 20.04 and Python 3.9, and recommend Docker for Windows users. The docs also show CPU use for Korean inference, and the README says MeloTTS is fast enough for CPU real-time inference.
- Static commercial app audio status: **approved_for_audition**. Code/model license labels and official commercial/non-commercial use language are sufficient for local comparison generation, but production catalog linking still requires listening review and deployment documentation.

## Candidate 3: Piper ONNX KSS Korean (community model)

This is not an official Piper voice from `rhasspy/piper-voices`; it is included only as an additional local/free Korean-capable option with clearer model/data-license signals.

Primary sources:

- Piper repo: https://github.com/rhasspy/piper
- Piper runtime license: https://raw.githubusercontent.com/rhasspy/piper/master/LICENSE.md
- Piper voices list: https://raw.githubusercontent.com/rhasspy/piper/master/VOICES.md
- Korean ONNX model card/file page: https://huggingface.co/neurlang/piper-onnx-kss-korean
- Korean ONNX config page: https://huggingface.co/neurlang/piper-onnx-kss-korean/blob/main/piper-kss-korean.onnx.json
- Bingsu KSS dataset card: https://huggingface.co/datasets/Bingsu/KSS_Dataset
- Original KSS project reference: https://github.com/Kyubyong/kss
- Original KSS Kaggle dataset page: https://www.kaggle.com/datasets/bryanpark/korean-single-speaker-speech-dataset
- Creative Commons BY-NC-SA 4.0 legal code: https://creativecommons.org/licenses/by-nc-sa/4.0/legalcode.en

Findings:

- Code license: Piper runtime is MIT. Note that the original `rhasspy/piper` repo is archived and says development moved to `OHF-Voice/piper1-gpl`; this assessment is only for the MIT-licensed archived Piper runtime.
- Model weights/license: not approved for commercial use. The `neurlang/piper-onnx-kss-korean` Hugging Face model page labels the model as `cc-by-nc-sa-4.0`.
- Training data/license: non-commercial. The model card identifies `Bingsu/KSS_Dataset`; that dataset card is licensed `cc-by-nc-sa-4.0` and states the KSS dataset may not be used for any commercial purpose. The original KSS GitHub project points to the KSS Kaggle dataset as its data source.
- Generated output usage/commercial terms: not needed for approval because the model/data license is already non-commercial. Even if output terms were favorable, this candidate should not be used for commercial static app audio without separate rights clearance.
- Korean support: yes. The model page is tagged Korean; its config sets the voice/language to Korean.
- Local Windows feasibility notes: technically attractive for local/offline use because Piper uses ONNX models and a small runtime, but Korean support here comes from a community model rather than the official Piper voice list. The archived official Piper voices list reviewed here did not include Korean.
- Static commercial app audio status: **not_approved**. The non-commercial model/data licensing blocks static commercial app audio.

## Production Recommendation

None of the generated files should be linked into the production app catalog before listening review and manifest validation. The audition workflow may proceed with MeloTTS-Korean first and Qwen3-TTS 0.6B CustomVoice Sohee as the comparison model.

- Use **MeloTTS Korean** as the first audition model.
- Use **Qwen3-TTS 0.6B CustomVoice Sohee** as the quality comparison model.
- Do **not** use the Piper/KSS Korean ONNX model for commercial app audio unless separate commercial rights are obtained for the model and underlying KSS-trained lineage.

## Suggested Next Step

For production static audio, prefer either:

1. A TTS provider/model with explicit commercial generated-output terms and disclosed/cleared training-data posture, or
2. Commissioned/contracted Korean voice recordings for the fixed app phrases, with direct performer and usage rights in the contract.
