/**
 * Kiln (2026-09 revamp). The `accent` field is gone with the iris palette.
 * `short` is now the outcome line used on the homepage row, and six entries
 * are marked featured. All 14 slugs get their own page under /services/[slug]
 * -- the old site wrote 300 words per capability and rendered none of them.
 */
import {
  Bot,
  Network,
  Database,
  Phone,
  Rocket,
  Cloud,
  BrainCircuit,
  Zap,
  Cpu,
  Eye,
  Languages,
  Boxes,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  title: string;
  short: string;
  description: string;
  icon: LucideIcon;
  /** Shown on the homepage "What we build" row. Six are featured. */
  featured?: boolean;
  outcomes: string[];
  technologies: string[];
  bullets: string[];
};

export const services: Service[] = [
  {
    slug: "generative-ai",
    featured: true,
    title: "Ship custom LLM products",
    short: "The whole product, not the model call: auth, billing, limits, admin and the eval suite.",
    description:
      "We design and ship LLM products anchored on your data, your tone, and your KPIs. No off-the-shelf chatbot wrappers.",
    icon: BrainCircuit,
    outcomes: [
      "Domain-tuned copilots that lift task throughput",
      "Multimodal pipelines across text, vision, and voice",
      "Eval harnesses so quality is provable, not guessed",
    ],
    technologies: ["GPT-4o", "Claude", "Gemini", "Llama", "DeepSeek", "LangChain"],
    bullets: [
      "Custom LLM apps & copilots",
      "Prompt engineering & system prompt design",
      "Multimodal (text · image · voice)",
      "Fine-tuning, LoRA & adapter strategy",
      "Evaluation suites with automated regression",
    ],
  },
  {
    slug: "agentic-ai",
    featured: true,
    title: "Put agents to work",
    short: "Agents with typed tools, retries and approval checkpoints on anything irreversible.",
    description:
      "We build tool-using, plan-and-execute agents with traceable state, retries, and approval gates. They operate inside real business workflows, not slide decks.",
    icon: Network,
    outcomes: [
      "Autonomous workflows that move tickets, leads, and tasks",
      "Human-in-the-loop approvals on sensitive actions",
      "Stable orchestration across multi-agent teams",
    ],
    technologies: ["LangGraph", "LangChain", "CrewAI", "AutoGen", "LlamaIndex"],
    bullets: [
      "LangGraph & stateful agent design",
      "Tool-using agents with retries & guardrails",
      "Human-in-the-loop approvals",
      "Multi-agent orchestration & role specialisation",
      "Observability with Langfuse / LangSmith",
    ],
  },
  {
    slug: "rag-enterprise-search",
    featured: true,
    title: "Make your knowledge answer",
    short: "Hybrid BM25 and vector retrieval with re-ranking, so answers carry citations you can check.",
    description:
      "We build retrieval systems that actually answer, with hybrid search, re-ranking, and citations. Retrieval quality is measured with evals, not guessed.",
    icon: Database,
    outcomes: [
      "Trustworthy answers with inline citations",
      "Secure, role-aware enterprise data Q&A",
      "Measurable retrieval quality with eval scores",
    ],
    technologies: ["FAISS", "Pinecone", "Qdrant", "Azure AI Search", "Elasticsearch", "LlamaIndex"],
    bullets: [
      "Document intelligence & extraction",
      "Hybrid keyword + vector retrieval",
      "Vector DBs: FAISS · Pinecone · Qdrant · Chroma",
      "Citation, grounding & hallucination guards",
      "Retrieval evaluation with quantitative metrics",
    ],
  },
  {
    slug: "voice-ai",
    featured: true,
    title: "Automate calls with voice AI",
    short: "Streaming speech agents that hold a real conversation and hand off to a human when confidence drops.",
    description:
      "ASR, TTS, and LLMs stitched into a real-time conversational layer. Outbound agents, IVR replacement, and support deflection you can measure.",
    icon: Phone,
    outcomes: [
      "Sub-second turn-taking on real calls",
      "IVR replacement with higher containment",
      "Searchable transcripts and call analytics",
    ],
    technologies: ["Whisper", "WhisperX", "Parakeet", "Twilio", "ElevenLabs"],
    bullets: [
      "ASR / TTS / streaming voice agents",
      "AI call assistants & outbound agents",
      "IVR automation & intelligent routing",
      "Real-time transcription & analytics",
      "Call-center automation with CRM sync",
    ],
  },
  {
    slug: "computer-vision",
    title: "See what your cameras see",
    short: "Detection, recognition, OCR, and video understanding for real environments.",
    description:
      "Production vision systems for identity, safety, quality, and content. We design for real lighting, real cameras, and real edge cases instead of pristine benchmarks.",
    icon: Eye,
    outcomes: [
      "Reliable detection across lighting and camera variance",
      "Auditable, privacy-respecting biometric pipelines",
      "Tight latency budgets, even on the edge",
    ],
    technologies: ["PyTorch", "YOLO", "MMDetection", "OpenCV", "MediaPipe", "ONNX Runtime"],
    bullets: [
      "Object detection & tracking",
      "Face recognition & anti-spoofing",
      "OCR & document layout analysis",
      "Video understanding & event detection",
      "Edge deployment (Jetson, mobile, kiosks)",
    ],
  },
  {
    slug: "nlp-document-ai",
    featured: true,
    title: "Turn documents into data",
    short: "Structured data out of contracts, forms and manuals, with the extraction measured.",
    description:
      "Classic and modern NLP for invoices, contracts, claims, tickets, and feedback streams. Everything wires into the systems your team already uses.",
    icon: Languages,
    outcomes: [
      "Structured data from messy documents and conversations",
      "Multilingual coverage with grounded accuracy",
      "Lower handle time on text-heavy operations",
    ],
    technologies: ["spaCy", "Hugging Face", "Llama", "Whisper", "LayoutLM", "Tesseract"],
    bullets: [
      "Entity, intent & sentiment classification",
      "Information extraction from PDFs, scans, forms",
      "Multilingual translation & summarisation",
      "Topic modelling & feedback analytics",
      "PII detection & redaction",
    ],
  },
  {
    slug: "ai-mvp-development",
    title: "Launch an AI MVP in weeks",
    short: "Idea to shippable AI product in 6 to 10 weeks.",
    description:
      "A focused sprint from problem framing to a deployable MVP. UI, backend, AI integration, Docker, and CI/CD handed over with a roadmap for V1.",
    icon: Rocket,
    outcomes: [
      "A real, deployable product instead of a Figma deck",
      "Architecture ready for V1 scale",
      "Founder-friendly handover & docs",
    ],
    technologies: ["Next.js", "FastAPI", "Postgres", "Docker", "Vercel", "AWS"],
    bullets: [
      "Discovery & MVP scoping",
      "UI/UX design & prototyping",
      "Frontend, backend & AI integration",
      "Dockerized deploy with CI/CD",
      "Fast 1-week iteration cycles",
    ],
  },
  {
    slug: "sovereign-ai",
    featured: true,
    title: "Keep the model inside your border",
    short:
      "The whole lifecycle inside boundaries you control -- inference included, not just storage.",
    description:
      "Sovereign deployments where the data, the model and the inference all stay inside a jurisdiction and an estate you own. Residency for stored data is the easy half; the half that gets missed is where the tokens are actually processed.",
    icon: ShieldCheck,
    outcomes: [
      "Inference-time residency, not just storage residency",
      "A named list of every sub-processor in the path",
      "Exportable prompts, eval sets, traces and audit logs",
    ],
    technologies: ["vLLM", "Llama", "Mistral", "Qwen", "Kubernetes", "Postgres", "Langfuse"],
    bullets: [
      "On-prem, private VPC or in-country cloud region",
      "Open-weight models served on your own hardware",
      "Jurisdiction mapping against EU AI Act, GDPR, DPDP and local rules",
      "Key management and tenancy isolation",
      "Exit plan written before the build starts",
    ],
  },
  {
    slug: "inference-engineering",
    featured: true,
    title: "Make inference cost what it should",
    short:
      "Serving, batching, quantisation and routing, so the bill tracks usage instead of outrunning it.",
    description:
      "Self-hosted and hybrid inference tuned for throughput and tail latency. Past a certain volume the API bill overtakes the cost of running it yourself, and this is the work that makes that crossover pay.",
    icon: Cpu,
    outcomes: [
      "Throughput and p99 latency measured, not estimated",
      "Cost per thousand requests tracked per route",
      "Smaller models carrying the traffic that does not need a large one",
    ],
    technologies: ["vLLM", "TensorRT-LLM", "Triton", "ONNX Runtime", "Ray", "Prometheus"],
    bullets: [
      "KV-cache reuse, continuous batching and speculative decoding",
      "Quantisation with a quality gate on the eval suite",
      "Model routing: small model first, escalate only when it fails",
      "GPU sizing and autoscaling against real traffic shape",
      "Cost ceilings and per-route alerting",
    ],
  },
  {
    slug: "ai-saas-and-mobile",
    title: "Ship the product around the model",
    short:
      "SaaS and mobile applications with the AI inside them, not bolted to the side.",
    description:
      "Full product builds -- web and mobile -- where the model is one component among auth, billing, offline state, notifications and an admin surface. The parts nobody demos and every user depends on.",
    icon: Boxes,
    outcomes: [
      "One codebase shipping to web, iOS and Android",
      "Offline-first behaviour where the network cannot be trusted",
      "An operator dashboard from day one",
    ],
    technologies: ["Next.js", "React Native", "FastAPI", "Postgres", "Stripe", "Expo"],
    bullets: [
      "Cross-platform mobile with native modules where they earn it",
      "Auth, roles, billing and usage metering",
      "Offline cache and conflict-safe sync",
      "Admin and analytics surfaces for the team running it",
      "App Store and Play submission",
    ],
  },
  {
    slug: "blockchain-web3",
    title: "Build on-chain with confidence",
    short: "Smart contracts, dApps, tokenomics, and AI agents that operate on-chain.",
    description:
      "Our CTO leads a dedicated blockchain practice covering smart contracts, secure dApps, and tokenized systems. We also wire AI agents to wallets, oracles, and on-chain state.",
    icon: Boxes,
    outcomes: [
      "Audited smart contracts with test & invariant coverage",
      "Production-grade dApp front-ends and indexers",
      "AI agents that interact with chains safely and predictably",
    ],
    technologies: ["Solidity", "Foundry", "Hardhat", "Viem", "Ethers.js", "The Graph"],
    bullets: [
      "Smart contract design & audits-ready code",
      "EVM-compatible dApp engineering (Ethereum · Polygon · Base · Arbitrum)",
      "Token design, vesting, and governance modules",
      "On-chain indexers and analytics pipelines",
      "AI agents wired to wallets, oracles, and smart contracts",
    ],
  },
  {
    slug: "edge-ai",
    title: "Run models on the edge",
    short: "Inference close to the data on phones, kiosks, cameras, and IoT.",
    description:
      "When latency, privacy, or connectivity rule out the cloud, we move models to the device. Quantized inference and hybrid routing tuned to your hardware.",
    icon: Cpu,
    outcomes: [
      "Real-time inference without cloud round-trips",
      "Data stays on-device for privacy & compliance",
      "Lower per-inference cost at scale",
    ],
    technologies: ["ONNX Runtime", "TensorRT", "OpenVINO", "Core ML", "TFLite", "NVIDIA Jetson"],
    bullets: [
      "Model quantization & pruning for edge",
      "On-device LLMs and vision models",
      "Hybrid edge + cloud routing",
      "Jetson / Coral / mobile deployments",
      "OTA model updates and remote eval",
    ],
  },
  {
    slug: "cloud-devops-mlops",
    featured: true,
    title: "Keep AI alive in production",
    short: "Tracing, evals and dashboards wired before launch, so you can see what the system is doing.",
    description:
      "Containers, deployments, observability, security, scaling, and LLM-specific evals. The unglamorous layer that decides whether your AI product survives.",
    icon: Cloud,
    outcomes: [
      "Predictable, observable AI deployments",
      "Cost controls on tokens, GPUs, and storage",
      "Clean CI/CD with one-click rollback",
    ],
    technologies: ["Docker", "Kubernetes", "AWS", "GCP", "Azure", "Langfuse", "Grafana"],
    bullets: [
      "Dockerized services & K8s-ready architecture",
      "CI/CD with GitHub Actions / GitLab",
      "LLM observability (Langfuse, LangSmith)",
      "System observability (Grafana, Prometheus, Loki)",
      "Cost dashboards & token budgeting",
    ],
  },
  {
    slug: "data-science-ml",
    title: "Predict with classic ML",
    short: "Forecasting, classification, and recommendations, productionized.",
    description:
      "Classic ML done right, with proper data pipelines, evaluation, and deployment. Every model ships monitored and re-trainable.",
    icon: BrainCircuit,
    outcomes: [
      "Models that ship, monitored and re-trained",
      "Cleaner data pipelines and feature stores",
      "Clear ROI from each model in production",
    ],
    technologies: ["PyTorch", "TensorFlow", "scikit-learn", "MLflow", "W&B", "BigQuery"],
    bullets: [
      "Forecasting, churn & propensity models",
      "Recommendation systems",
      "Data pipelines & feature stores",
      "Model deployment, monitoring, re-training",
      "Experimentation & A/B framework",
    ],
  },
  {
    slug: "responsible-ai",
    title: "Prove your AI is safe",
    short: "Safety, evaluation, bias, and privacy built into the system.",
    description:
      "AI you can defend in a board meeting and in a regulator's inbox. Eval harnesses, red-team pipelines, PII controls, and governance docs ship with the system.",
    icon: ShieldCheck,
    outcomes: [
      "Defensible AI risk posture, in writing",
      "Continuous evals, not one-time benchmarks",
      "Compliance-aligned deployments (GDPR, HIPAA, SOC2 paths)",
    ],
    technologies: ["Langfuse", "Promptfoo", "Giskard", "Presidio", "Custom evals"],
    bullets: [
      "Eval suites with regression on every change",
      "Red-team & jailbreak resistance testing",
      "Bias and fairness assessments",
      "PII detection, redaction & data minimisation",
      "Model cards, system cards, governance docs",
    ],
  },
  {
    slug: "no-code-automation",
    title: "Automate ops without a rebuild",
    short: "Internal workflows automated on the tools you already use.",
    description:
      "We extend n8n, Make, Zapier, and your CRM with AI steps. Faster than a full build and durable enough to keep.",
    icon: Zap,
    outcomes: [
      "Ops automation in days, not months",
      "AI inserted into existing CRM & sales flows",
      "Workflows your ops team can edit and own",
    ],
    technologies: ["n8n", "Make.com", "Zapier", "HubSpot", "Airtable", "Slack"],
    bullets: [
      "n8n, Make, Zapier workflow design",
      "CRM & lead-gen automation",
      "AI enrichment, scoring & routing",
      "Slack & email automations",
      "Documentation your ops team can own",
    ],
  },
  {
    slug: "ai-strategy-consulting",
    title: "Decide before you build",
    short: "Roadmap, prioritization, and architecture review for AI initiatives.",
    description:
      "For teams who need clarity before they spend. We audit your data, prioritise use cases, design the right architecture, and produce a defensible roadmap.",
    icon: Bot,
    outcomes: [
      "Prioritised AI use-case roadmap",
      "Architecture & build-vs-buy decisions",
      "Risk, cost and compliance posture",
    ],
    technologies: ["Strategy", "Architecture", "Governance", "Compliance"],
    bullets: [
      "AI readiness audit",
      "Use-case discovery & ROI modelling",
      "Architecture & vendor selection",
      "Build vs buy decisions",
      "AI governance & risk posture",
    ],
  },
];
