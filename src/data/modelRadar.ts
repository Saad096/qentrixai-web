/**
 * The model shortlist behind ModelRadar, across the three modalities we
 * actually build on: language, speech and vision.
 *
 * Every number here traces back to /docs/revamp/09-model-landscape.md, which
 * carries the sources. They are ordinal rather than measured: they preserve
 * the ordering and rough spacing that published benchmarks and list pricing
 * establish, on a 0-100 scale the reader's weights can act on. The component
 * says so on the page, because a composite score is a number and CLAUDE.md
 * §1.6 does not allow inventing one quietly.
 *
 * Every axis points the same way -- higher is better -- so cost and latency
 * are inverted. Cheaper scores higher. Faster scores higher. Otherwise the
 * weights stop being legible the moment a reader drags one.
 *
 * Refreshed 2026-09-23. This moves monthly; the date is rendered.
 */

export const RADAR_UPDATED = "September 2026";

export type Axis = "quality" | "cost" | "latency" | "sovereignty" | "multimodality";

export type Modality = "language" | "speech" | "vision";

/**
 * Where inference can run. The open/closed split that every leaderboard uses
 * is the wrong one for a buyer: a 1.6T open-weight model that only runs on
 * rented H100s does not put inference inside your boundary any more than a
 * hosted API does. These four tiers are what the sovereignty axis scores.
 */
export type Access = "hosted" | "rack" | "server" | "edge";

export const ACCESS_LABEL: Record<Access, string> = {
  hosted: "hosted API",
  rack: "open weights, rack",
  server: "open weights, one server",
  edge: "open weights, edge",
};

export type Candidate = {
  name: string;
  vendor: string;
  access: Access;
  scores: Record<Axis, number>;
  note: string;
};

export const AXES: { key: Axis; label: string; hint: Record<Modality, string> }[] = [
  {
    key: "quality",
    label: "Quality",
    hint: {
      language: "Reasoning, instruction following, tool use",
      speech: "Word error rate, or naturalness for synthesis",
      vision: "Benchmark standing on its own task",
    },
  },
  {
    key: "cost",
    label: "Cost",
    hint: {
      language: "Lower spend per million tokens scores higher",
      speech: "Lower spend per minute or per million characters",
      vision: "Lower compute per frame or per page",
    },
  },
  {
    key: "latency",
    label: "Latency",
    hint: {
      language: "Time to first token, and tail behaviour",
      speech: "Time to first partial, or to first audio",
      vision: "Milliseconds per frame at production resolution",
    },
  },
  {
    key: "sovereignty",
    label: "Sovereignty",
    hint: {
      language: "Can inference run inside your own boundary",
      speech: "Can audio stay on your infrastructure",
      vision: "Can it run on your own hardware, including edge",
    },
  },
  {
    key: "multimodality",
    label: "Multimodality",
    hint: {
      language: "Native inputs and outputs beyond text",
      speech: "Handles both directions, or reasons about audio",
      vision: "Reads language and layout, not just pixels",
    },
  },
];

export const MODALITIES: { key: Modality; label: string; lede: string }[] = [
  {
    key: "language",
    label: "Language",
    lede:
      "The tier where sovereignty costs the most. The open-weight models that match frontier quality are 700B to 1.6T parameters, so they are open by licence and rented in practice. The models you can actually run on one server sit a clear step below on quality and a long way above on everything else.",
  },
  {
    key: "speech",
    label: "Speech",
    lede:
      "Two pipelines, not one. Speech-to-speech behind a single socket keeps tone and pacing a transcript throws away. A cascaded stack keeps deterministic barge-in, per-stage traces, and is the only path under roughly ten cents a minute. Weight latency against cost and the list splits along that seam.",
  },
  {
    key: "vision",
    label: "Vision",
    lede:
      "The modality where sovereignty is nearly free. The strongest detectors and segmenters are open-weight, permissively licensed and small enough for a Jetson. Push sovereignty to the top here and the top of the list barely moves: the hosted models drop off and the open ones that were already winning stay put. On the language tab the same drag inverts the whole ranking.",
  },
];

export const CANDIDATES: Record<Modality, Candidate[]> = {
  language: [
    {
      name: "Claude Opus 5.5",
      vendor: "Anthropic",
      access: "hosted",
      scores: { quality: 97, cost: 28, latency: 62, sovereignty: 8, multimodality: 72 },
      note: "$4/$20 per million. The 1M context window at standard rates, with no long-context surcharge.",
    },
    {
      name: "GPT-5.6",
      vendor: "OpenAI",
      access: "hosted",
      scores: { quality: 95, cost: 52, latency: 70, sovereignty: 8, multimodality: 82 },
      note: "$2/$10 per million. Strongest of the hosted models on computer use and structured output.",
    },
    {
      name: "Claude Sonnet 5",
      vendor: "Anthropic",
      access: "hosted",
      scores: { quality: 87, cost: 52, latency: 74, sovereignty: 8, multimodality: 72 },
      note: "$2/$10 per million. The workhorse tier: most production traffic ends up here rather than on Opus.",
    },
    {
      name: "Grok 4.6",
      vendor: "xAI",
      access: "hosted",
      scores: { quality: 82, cost: 66, latency: 74, sovereignty: 8, multimodality: 66 },
      note: "$2/$6 per million. Output pricing is the cheapest of the frontier hosted tier.",
    },
    {
      name: "Gemini 3.7 Flash",
      vendor: "Google",
      access: "hosted",
      scores: { quality: 73, cost: 78, latency: 92, sovereignty: 10, multimodality: 90 },
      note: "$0.75/$3.75 per million. The Flash tier leads time-to-first-token and takes audio and video natively.",
    },
    {
      name: "GPT-5.6 Luna",
      vendor: "OpenAI",
      access: "hosted",
      scores: { quality: 62, cost: 92, latency: 88, sovereignty: 8, multimodality: 72 },
      note: "$0.20/$1.20 per million. Where high-volume classification and extraction belong.",
    },
    {
      name: "DeepSeek V4",
      vendor: "DeepSeek",
      access: "rack",
      scores: { quality: 88, cost: 86, latency: 62, sovereignty: 52, multimodality: 58 },
      note: "1.6T at the Pro tier. Leads raw SWE-bench Verified among open weights. Open by licence, rented in practice.",
    },
    {
      name: "Qwen3.8 Max",
      vendor: "Alibaba",
      access: "rack",
      scores: { quality: 86, cost: 84, latency: 64, sovereignty: 50, multimodality: 74 },
      note: "Tops the open-weight ranking at 73.3. Widest size range of any open family, which matters downstream.",
    },
    {
      name: "Kimi K3",
      vendor: "Moonshot",
      access: "rack",
      scores: { quality: 85, cost: 82, latency: 58, sovereignty: 48, multimodality: 60 },
      note: "Roughly 1T parameters, very long context. Leads the frontend code arena ahead of several hosted models.",
    },
    {
      name: "GLM-5.2",
      vendor: "Z.ai",
      access: "rack",
      scores: { quality: 83, cost: 84, latency: 60, sovereignty: 46, multimodality: 62 },
      note: "744B. Practitioners report five RTX Pro 6000s plus a 5090 to serve it locally at usable speed.",
    },
    {
      name: "MiniMax M3",
      vendor: "MiniMax",
      access: "rack",
      scores: { quality: 76, cost: 86, latency: 66, sovereignty: 54, multimodality: 64 },
      note: "Around 428B. The smallest of the frontier-scale open models, and the easiest of them to host.",
    },
    {
      name: "Qwen3.8 27B",
      vendor: "Alibaba",
      access: "server",
      scores: { quality: 64, cost: 92, latency: 78, sovereignty: 92, multimodality: 66 },
      note: "Fits one server. Quantisation holds at 4-bit and collapses at 1-bit, so plan the VRAM rather than the trick.",
    },
    {
      name: "Mistral Small 4",
      vendor: "Mistral",
      access: "server",
      scores: { quality: 54, cost: 94, latency: 86, sovereignty: 94, multimodality: 52 },
      note: "Small, fast, EU-hosted options. The pragmatic default when the data cannot leave the building.",
    },
    {
      name: "Gemma",
      vendor: "Google",
      access: "edge",
      scores: { quality: 44, cost: 95, latency: 90, sovereignty: 95, multimodality: 58 },
      note: "Cheap and quick on narrow, well-scoped tasks. A router's second hop.",
    },
    {
      name: "Phi",
      vendor: "Microsoft",
      access: "edge",
      scores: { quality: 34, cost: 96, latency: 94, sovereignty: 96, multimodality: 54 },
      note: "Edge-sized. Good at the classification step that decides whether a bigger model is needed at all.",
    },
  ],

  speech: [
    {
      name: "Scribe v2",
      vendor: "ElevenLabs",
      access: "hosted",
      scores: { quality: 96, cost: 46, latency: 66, sovereignty: 8, multimodality: 30 },
      note: "Recognition. 2.2% average WER, the best hosted score we can find. $0.22 an hour in batch.",
    },
    {
      name: "Scribe v2 Realtime",
      vendor: "ElevenLabs",
      access: "hosted",
      scores: { quality: 94, cost: 42, latency: 90, sovereignty: 8, multimodality: 30 },
      note: "Recognition. Roughly 150ms to first partial across 90-plus languages.",
    },
    {
      name: "Flux",
      vendor: "Deepgram",
      access: "hosted",
      scores: { quality: 82, cost: 80, latency: 94, sovereignty: 12, multimodality: 30 },
      note: "Recognition. Sub-300ms end-of-turn with detection built in, which is what kills awkward pauses.",
    },
    {
      name: "Nova-3",
      vendor: "Deepgram",
      access: "hosted",
      scores: { quality: 84, cost: 88, latency: 84, sovereignty: 12, multimodality: 28 },
      note: "Recognition. 5.26% WER in batch at $0.0043 a minute, $0.0077 streaming.",
    },
    {
      name: "Universal-2",
      vendor: "AssemblyAI",
      access: "hosted",
      scores: { quality: 85, cost: 84, latency: 62, sovereignty: 10, multimodality: 44 },
      note: "Recognition. Around $0.006 a minute, and the strongest transcript intelligence layer on top.",
    },
    {
      name: "Canary-Qwen 2.5B",
      vendor: "NVIDIA",
      access: "server",
      scores: { quality: 82, cost: 94, latency: 74, sovereignty: 94, multimodality: 34 },
      note: "Recognition, open weights. Around 5.1% average WER, the best open score, and audio never leaves.",
    },
    {
      name: "Whisper large-v3",
      vendor: "OpenAI",
      access: "server",
      scores: { quality: 74, cost: 94, latency: 54, sovereignty: 95, multimodality: 32 },
      note: "Recognition, open weights. Batch-shaped rather than streaming, and still the safest self-host default.",
    },
    {
      name: "Sonic 4",
      vendor: "Cartesia",
      access: "hosted",
      scores: { quality: 88, cost: 62, latency: 97, sovereignty: 10, multimodality: 26 },
      note: "Synthesis. Roughly 40ms to first audio, the lowest we have measured anywhere.",
    },
    {
      name: "Flash v2.5",
      vendor: "ElevenLabs",
      access: "hosted",
      scores: { quality: 90, cost: 40, latency: 94, sovereignty: 8, multimodality: 26 },
      note: "Synthesis. Around 75ms to first audio, and closer to the flagship voice than the price suggests.",
    },
    {
      name: "Multilingual v3",
      vendor: "ElevenLabs",
      access: "hosted",
      scores: { quality: 96, cost: 22, latency: 58, sovereignty: 8, multimodality: 26 },
      note: "Synthesis. Leads expressiveness across 70-plus languages, at $100 per million characters.",
    },
    {
      name: "Orpheus",
      vendor: "Canopy",
      access: "server",
      scores: { quality: 82, cost: 92, latency: 82, sovereignty: 92, multimodality: 24 },
      note: "Synthesis, open weights. Around 200ms streaming, 100ms with input streaming, with guided emotion.",
    },
    {
      name: "Kokoro 82M",
      vendor: "Hexgrad",
      access: "edge",
      scores: { quality: 66, cost: 97, latency: 90, sovereignty: 97, multimodality: 20 },
      note: "Synthesis, open weights. 82M parameters, and it runs on hardware you already own.",
    },
    {
      name: "Realtime",
      vendor: "OpenAI",
      access: "hosted",
      scores: { quality: 88, cost: 44, latency: 90, sovereignty: 8, multimodality: 86 },
      note: "Speech to speech. One socket, no transcript in the middle, and your model choice locked to one vendor.",
    },
    {
      name: "Gemini Live",
      vendor: "Google",
      access: "hosted",
      scores: { quality: 86, cost: 58, latency: 90, sovereignty: 10, multimodality: 92 },
      note: "Speech to speech. Takes video on the same connection, which changes what a support call can be.",
    },
  ],

  vision: [
    {
      name: "RF-DETR-L",
      vendor: "Roboflow",
      access: "server",
      scores: { quality: 92, cost: 92, latency: 86, sovereignty: 92, multimodality: 20 },
      note: "Detection. 56.5 AP on COCO at 6.8ms a frame on a T4, and it tops the real-world RF100-VL too.",
    },
    {
      name: "YOLO26-N",
      vendor: "Ultralytics",
      access: "edge",
      scores: { quality: 62, cost: 97, latency: 98, sovereignty: 98, multimodality: 18 },
      note: "Detection. 12MB on disk, around 5ms a frame, and INT8 export holds its FP32 accuracy. AGPL or commercial.",
    },
    {
      name: "YOLO26-L",
      vendor: "Ultralytics",
      access: "server",
      scores: { quality: 80, cost: 90, latency: 84, sovereignty: 92, multimodality: 18 },
      note: "Detection. The same NMS-free decoder at a size that competes on accuracy rather than only on speed.",
    },
    {
      name: "SAM 3",
      vendor: "Meta",
      access: "server",
      scores: { quality: 88, cost: 78, latency: 50, sovereignty: 90, multimodality: 34 },
      note: "Segmentation. Promptable and open-vocabulary masks, which is what makes dataset building fast.",
    },
    {
      name: "DINOv3",
      vendor: "Meta",
      access: "server",
      scores: { quality: 78, cost: 86, latency: 74, sovereignty: 92, multimodality: 22 },
      note: "Backbone. Where to start when you have a domain and almost no labels.",
    },
    {
      name: "Grounding DINO",
      vendor: "IDEA",
      access: "server",
      scores: { quality: 68, cost: 80, latency: 60, sovereignty: 90, multimodality: 46 },
      note: "Zero-shot annotation. Describe the object in words and it labels your corpus for you.",
    },
    {
      name: "Depth Anything 3",
      vendor: "TikTok",
      access: "server",
      scores: { quality: 74, cost: 88, latency: 78, sovereignty: 92, multimodality: 20 },
      note: "Depth. Monocular scene depth good enough to skip a second sensor on a lot of jobs.",
    },
    {
      name: "Qwen3-VL 235B",
      vendor: "Alibaba",
      access: "rack",
      scores: { quality: 93, cost: 58, latency: 44, sovereignty: 50, multimodality: 92 },
      note: "Multimodal. Rivals the hosted frontier across VQA, grounding, video and documents. OCR in 32 languages.",
    },
    {
      name: "Qwen3-VL 8B",
      vendor: "Alibaba",
      access: "server",
      scores: { quality: 72, cost: 92, latency: 76, sovereignty: 92, multimodality: 88 },
      note: "Multimodal. Reads tilted, blurred and low-light text on one GPU, which covers most document work.",
    },
    {
      name: "InternVL3-78B",
      vendor: "Shanghai AI Lab",
      access: "rack",
      scores: { quality: 86, cost: 64, latency: 48, sovereignty: 62, multimodality: 86 },
      note: "Multimodal. 72.2 on MMMU under a clean MIT licence with no use restrictions, which is rarer than it sounds.",
    },
    {
      name: "Phi-4 multimodal",
      vendor: "Microsoft",
      access: "edge",
      scores: { quality: 56, cost: 94, latency: 86, sovereignty: 94, multimodality: 72 },
      note: "Multimodal. Small enough for a device, competitive on OCRBench and ChartQA.",
    },
    {
      name: "GPT-5.6 vision",
      vendor: "OpenAI",
      access: "hosted",
      scores: { quality: 94, cost: 48, latency: 68, sovereignty: 8, multimodality: 94 },
      note: "Multimodal. Still the one to beat when the image needs reasoning rather than recognition.",
    },
    {
      name: "Gemini 3.7 Flash vision",
      vendor: "Google",
      access: "hosted",
      scores: { quality: 82, cost: 76, latency: 88, sovereignty: 10, multimodality: 94 },
      note: "Multimodal. Long video in one request, at a price that makes batch processing reasonable.",
    },
  ],
};

/* Equal weights are not "balanced": four cheap axes outvote quality and a
   tiny edge model lands above the frontier ones, which is arithmetic rather
   than advice. The first pass at Balanced did exactly that -- it put Gemma
   above Claude Opus, which is the kind of output that makes a reader stop
   trusting the tool rather than start arguing with it.

   So Balanced means what a buyer means by it: quality is half the vote, cost
   is real, sovereignty is not a requirement. Each preset is a stance, not a
   dial arrangement. Quality-first is the only weighting where a hosted
   frontier model tops the language tab; add a real cost weight and the big
   open models take it, which is the argument. */
export const PRESETS: { label: string; weights: Record<Axis, number> }[] = [
  { label: "Balanced", weights: { quality: 100, cost: 35, latency: 30, sovereignty: 10, multimodality: 25 } },
  { label: "Sovereign first", weights: { quality: 55, cost: 40, latency: 35, sovereignty: 100, multimodality: 20 } },
  { label: "Cost first", weights: { quality: 40, cost: 100, latency: 60, sovereignty: 35, multimodality: 15 } },
  { label: "Real time", weights: { quality: 55, cost: 45, latency: 100, sovereignty: 25, multimodality: 30 } },
  { label: "Quality first", weights: { quality: 100, cost: 10, latency: 25, sovereignty: 5, multimodality: 30 } },
];

export const BANDS: { name: string; min: number; blurb: string }[] = [
  { name: "Adopt", min: 75, blurb: "Would put in front of users on this weighting" },
  { name: "Trial", min: 62, blurb: "Worth a bake-off against your own evals" },
  { name: "Assess", min: 48, blurb: "Keep on the list, watch the next release" },
  { name: "Hold", min: 0, blurb: "Not what these weights are asking for" },
];

export function bandOf(score: number) {
  return BANDS.find((b) => score >= b.min) ?? BANDS[BANDS.length - 1];
}

export function rank(modality: Modality, weights: Record<Axis, number>) {
  const total = AXES.reduce((sum, a) => sum + weights[a.key], 0) || 1;
  return CANDIDATES[modality]
    .map((m) => ({
      ...m,
      score: Math.round(
        AXES.reduce((sum, a) => sum + m.scores[a.key] * weights[a.key], 0) / total
      ),
    }))
    .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name));
}
