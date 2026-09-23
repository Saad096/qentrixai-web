# Model landscape research — language, speech, vision

**Compiled 2026-09-23.** Feeds `src/components/sections/ModelRadar.tsx` and
`src/data/modelRadar.ts`.

This exists because the radar puts numbers on a public page. CLAUDE.md §1.6
says never invent numbers, and a composite score is a number. So the rule for
this file is: every axis value in the data file traces back to something
below, the composite is computed in the browser from weights the reader sets
rather than asserted, and the page says in its own words that these are our
read rather than a benchmark run.

## Why a weighted radar rather than a leaderboard

The strongest signal in the research was not any single ranking. It was how
little practitioners trust rankings.

- Hacker News threads on the 2026 open-weight releases raise Goodhart's Law
  directly, and flag tool-use failures where a model repeats a failed action
  without reading back context — behaviour no benchmark in the ranking
  measures. ([HN 48555993](https://news.ycombinator.com/item?id=48555993))
- r/LocalLLaMA threads report that quantised checkpoints, including 8-bit,
  feel materially worse than the published scores imply; "why does my local
  model feel dumber than it is" is a recurring post.
  ([Quesma's quantisation benchmark](https://quesma.com/blog/qwen38-27b-quantizations-benchmarked/)
  finds 4-bit holds and 1-bit collapses.)
- The community reads the subreddit itself as the usability benchmark,
  because people there run models on real work rather than on test sets.
  ([Sachdeva](https://aashaysachdeva.substack.com/p/rlocalllama-is-the-real-benchmark))
- The dense-vs-MoE trade shows up constantly: dense models are smart and
  slow, MoE models are fast and make more mistakes. That is a weighting
  decision, not a ranking.

So: the ranking is a function of the reader's weights, and the page says so.

## Language

**Closed frontier.** Anthropic Claude Opus 5.5 at $4/$20 per million in/out,
Sonnet 5 at $2/$10, Haiku 4.5 at $1/$5, with the 1M context window at
standard pricing and no long-context surcharge. OpenAI GPT-5.6 at $2/$10 with
GPT-5.6 Luna at $0.20/$1.20. Google Gemini 3.7 Flash at $0.75/$3.75. xAI
Grok 4.6 at $2/$6.
([MindStudio](https://www.mindstudio.ai/blog/claude-opus-5-pricing-vs-competitors),
[Anthropic pricing](https://platform.claude.com/docs/en/about-claude/pricing),
[BenchLM](https://benchlm.ai/anthropic/api-pricing))

Median launch price per million tokens fell $6.00 (2024) → $4.38 (2025) →
$3.75 (2026). Cost is compressing; sovereignty and latency are not.
([Azumo](https://azumo.com/artificial-intelligence/ai-insights/top-10-llms-0625))

**Open weights, frontier scale.** GLM-5.2 (744B) and GLM-5.3, Kimi K2.7 and
K3 (~1T), DeepSeek V4 and V4 Pro (1.6T), MiniMax M3 (~428B), Qwen3.8 Max.
These are open in the licence sense and hosted in practice: r/LocalLLaMA
reports five RTX Pro 6000s plus a 5090 to serve GLM-5.2 at usable speed, so
most teams rent rather than rack.
([kingy.ai](https://kingy.ai/news/best-open-weight-ai-models-in-2026-glm-5-2-vs-deepseek-v4-vs-kimi-k2-6-vs-qwen-vs-mistral/),
[Understanding AI](https://www.understandingai.org/p/the-best-chinese-open-weight-models),
[Morph](https://www.morphllm.com/best-open-source-coding-model-2026))

**Open weights, actually self-hostable.** Qwen3.8-27B, Mistral Small 4,
Gemma, Phi. This is the tier that matters for on-prem and edge work, and the
tier the frontier leaderboards bury.
([Thunder Compute](https://www.thundercompute.com/blog/best-open-source-llms),
[BenchLM open leaderboard](https://benchlm.ai/blog/posts/best-open-source-llm))

**Latency.** Gemini 3.5 Flash-Lite and the Flash tier lead time-to-first
token; Groq, Fireworks and Cerebras endpoints push hundreds of tokens per
second on open weights.
([Artificial Analysis](https://artificialanalysis.ai/leaderboards/models))

The split that matters to a buyer is not open vs closed. It is *can inference
run inside my boundary* — and a 1.6T open-weight model that only runs on
rented H100s does not clear that bar any better than a hosted API does.

## Speech

**Recognition.** ElevenLabs Scribe v2 posts the best hosted score at 2.2%
AA-WER. NVIDIA Canary-Qwen 2.5B leads open models at ~5.1% average WER
(5.63% on clean English). Deepgram Nova-3 sits at 5.26% batch.
([Coval](https://www.coval.ai/blog/best-speech-to-text-providers-in-2026-independent-benchmarks-and-how-to-choose/),
[FutureAGI](https://futureagi.com/blog/speech-to-text-apis-in-2026-benchmarks-pricing-developer-s-decision-guide/))

**Latency.** Scribe v2 Realtime ≈150ms first partial across 90+ languages.
Deepgram Flux targets sub-300ms end-of-turn with integrated EOT detection.
AssemblyAI streaming ≈760ms time-to-final.

**Price.** Deepgram Nova-3 $0.0043/min batch, $0.0077/min streaming.
AssemblyAI Universal-2 ≈$0.006/min. ElevenLabs Scribe v2 $0.22/hr batch.

**Synthesis.** Cartesia Sonic 4 leads pure latency at ≈40ms time-to-first
audio; Sonic-3.6 (Aug 2026, $39/1M chars) tops both Artificial Analysis
speech arenas. ElevenLabs Flash v2.5 ≈75ms; ElevenLabs Multilingual at
$100/1M leads expressiveness and 70+ languages. Google WaveNet $4/1M,
OpenAI gpt-4o-mini-tts ≈$16/1M. Open weights: Fish Speech 1.5,
CosyVoice2-0.5B, IndexTTS-2, Orpheus (~200ms streaming, ~100ms with input
streaming), and Kokoro at 82M parameters for cheap local work.
([MarkTechPost](https://www.marktechpost.com/2026/08/18/cartesia-ships-sonic-3-6-a-streaming-tts-model-that-now-leads-both-artificial-analysis-speech-arenas/),
[FutureAGI TTS](https://futureagi.com/blog/best-text-to-speech-providers-2026/),
[Orpheus](https://github.com/canopyai/Orpheus-TTS))

**Architecture.** Speech-to-speech behind one socket removes transcription
latency and keeps tone and pacing that a transcript strips. Cascaded
STT→LLM→TTS keeps deterministic barge-in, per-stage observability, and is
the only path under ~$0.10/min. A real trade, not a winner.
([AssemblyAI](https://www.assemblyai.com/blog/best-speech-to-speech-voice-agent-api),
[Forasoft](https://www.forasoft.com/blog/article/openai-realtime-api-voice-agent-production-guide-2026))

## Vision

**Detection.** RF-DETR is the strongest general starting point, topping both
COCO and the real-world RF100-VL benchmark; RF-DETR-L reaches 56.5 AP at
6.8ms/frame on a T4. YOLO26-N hits ~203 FPS at ~5ms and 69MB peak VRAM, 12MB
on disk, and its NMS-free decoder survives INT8 export with nearly FP32 mAP
— roughly 20 FPS on a Jetson Nano, 18–20ms/frame INT8 on Xavier NX. Licence
matters here: YOLO is AGPL or commercial.
([Roboflow](https://blog.roboflow.com/best-object-detection-models/),
[Labellerr](https://www.labellerr.com/blog/best-vision-model-for-edge-deployment/),
[YOLO26 paper](https://arxiv.org/pdf/2510.09653))

**Segmentation and features.** SAM 3 for promptable and open-vocabulary
masks, DINOv3 as a backbone when labels are scarce, Grounding DINO for
zero-shot annotation, Depth Anything 3 for depth, CLIP for embeddings.

**Document and multimodal.** Qwen3-VL is the strongest all-round open-weight
VLM — OCR in 32 languages, tilted and low-light text, long-video
localisation; the 235B-A22B flagship rivals Gemini 2.5 Pro and GPT-5 across
multimodal benchmarks. InternVL3-78B holds 72.2 MMMU under a clean MIT
licence with no use restrictions. Llama 4, Pixtral, Molmo and Phi-4
multimodal are competitive on MMMU, OCRBench, DocVQA and ChartQA.
([Qwen3-VL report](https://arxiv.org/pdf/2511.21631),
[BentoML](https://www.bentoml.com/blog/multimodal-ai-a-guide-to-open-source-vision-language-models),
[Mixpeek](https://mixpeek.com/curated-lists/best-vision-language-models))

Vision is the modality where sovereignty is close to free: the strong models
are open-weight, small enough to run on a Jetson, and permissively licensed.
That is the opposite of the language tier and it is worth saying on the page.

## How the axis values were set

Each model gets 0–100 on quality, cost, latency, sovereignty and
multimodality. They are ordinal, not measured: they preserve the ordering and
rough spacing the sources above establish, on a scale the reader's weights
can act on.

- **Quality** — published benchmark standing within its own modality.
- **Cost** — inverted price. Cheaper scores higher, so every axis points the
  same way and the weights stay legible.
- **Latency** — inverted time-to-first token or audio, or ms/frame.
- **Sovereignty** — can inference run inside your boundary. Open weights that
  need a rented H100 rack score below open weights that fit a single GPU,
  which is the distinction the leaderboards drop.
- **Multimodality** — how many input and output modalities it handles
  natively, without a second model in the path.

Refresh cadence: this moves monthly. The page is dated, and the data file
carries the same date so a stale panel is visible rather than quiet.

## Calibration notes (the part that had to be fixed)

Two rounds of this were wrong in ways worth recording, because both are easy
to repeat.

**1. "Balanced" is not equal weights.** The first pass weighted quality 85
against cost 50, latency 45, sovereignty 15 and multimodality 25. Quality was
39% of the vote, four cheap axes outvoted it, and Gemma finished above Claude
Opus 5.5 on the default preset. A reader who sees that stops trusting the
tool instead of arguing with it. Balanced now means what a buyer means:
quality is half the vote, cost is real, sovereignty is not a requirement.

**2. An ordinal scale has to reflect the real gap, not leaderboard
proximity.** Language quality ran 60–97, which says Phi is 62% as capable as
Opus. Nobody who has used both believes that. Widened to 34–97. Vision ran
70–94 across models doing genuinely different jobs — a detector, a
segmenter, a depth model and a VLM — so twelve of thirteen landed in Adopt
and the ring carried no information. Widened, and the rack-scale VLMs now
carry rack-scale cost and latency instead of single-GPU numbers.

Band thresholds sit at Adopt 75 / Trial 62 / Assess 48. They are absolute
rather than percentile, so a weighting that genuinely suits nothing on the
list produces a thin Adopt ring rather than promoting whatever is least bad.

What each preset now produces, which is the check to re-run after any edit:

| Preset | Language, Adopt ring |
|---|---|
| Balanced | Qwen3.8 Max, DeepSeek V4, GPT-5.6, Gemini 3.7 Flash, GLM-5.2, Kimi K3 |
| Sovereign first | Qwen3.8 27B, Mistral Small 4, Gemma, Phi — no hosted model survives |
| Cost first | the four self-hostable models, all within a point of each other |
| Real time | Gemma, Gemini 3.7 Flash, Mistral Small 4, Phi, Qwen3.8 27B |
| Quality first | GPT-5.6, Claude Opus 5.5, Qwen3.8 Max, Claude Sonnet 5, DeepSeek V4 |

Quality-first is the only weighting where a hosted frontier model tops the
language tab. On vision, Sovereign-first barely disturbs the top of the list.
Those two facts are the section's whole argument, and they fall out of the
data rather than being asserted in the prose.
