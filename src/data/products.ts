export type ProductStatus =
  | "Live"
  | "Beta"
  | "MVP"
  | "Coming Soon"
  | "Internal Framework"
  | "Client Delivery"
  | "Concept";

export type Product = {
  slug: string;
  name: string;
  tagline: string;
  category: string;
  status: ProductStatus;
  /**
   * Cover image path (used only when coverMode === "image" or omitted).
   */
  cover: string;
  /**
   * "image" — cover is a product screenshot (rendered with object-contain so
   *           the entire screen is visible inside the card).
   * "dark"  — no screenshot yet. Renders a premium black/gradient panel with
   *           the product name in big display type. Avoids placeholders that
   *           look like other products' screens.
   */
  coverMode?: "image" | "dark";
  /**
   * Gallery for the modal slider. With coverMode="image" these are screenshots;
   * with coverMode="dark" they're ignored and the dark cover is shown.
   */
  gallery: string[];
  /**
   * "mobile" renders the gallery in phone frames at 9:16 instead of a
   * browser-chrome plate. Defaults to desktop.
   */
  orientation?: "desktop" | "mobile";
  problem: string;
  solution: string;
  novelty: string;
  features: string[];
  targetUsers: string[];
  techStack: string[];
  roadmap: string[];
};

export const products: Product[] = [
  {
    slug: "minutely",
    name: "Minutely",
    tagline: "AI meeting intelligence: transcripts, MOMs, action items, decisions.",
    category: "Meeting Intelligence Platform",
    status: "Beta",
    cover: "/images/products/minutely-1.webp",
    coverMode: "image",
    gallery: [
      "/images/products/minutely-1.webp",
      "/images/products/minutely-2.webp",
      "/images/products/minutely-3.webp",
      "/images/products/minutely-4.webp",
    ],
    problem:
      "Meetings produce decisions, action items and follow-ups that get lost in fragmented notes, recordings and side-chats. Teams either re-do the work or skip the follow-through.",
    solution:
      "Minutely joins your meetings, transcribes them with speaker labels, and produces structured minutes-of-meeting: decisions, action items, owners and deadlines, with an approval flow before publishing.",
    novelty:
      "Most tools stop at a raw transcript or a generic summary. Minutely adds an approval workflow, an evaluation layer for ASR/TTS accuracy, and integrates outputs back into your task tracker.",
    features: [
      "High-accuracy multilingual transcription (Whisper / WhisperX)",
      "Speaker diarization and segment-level edits",
      "Structured MOM: decisions · actions · owners · deadlines",
      "Approval workflow with reviewer roles",
      "ASR / TTS benchmarking dashboard",
      "Integrations: Slack, email, task trackers",
    ],
    targetUsers: [
      "Operations & PMO teams",
      "Consulting firms with client meeting cadence",
      "Recruitment and sales teams",
      "Engineering leadership running weekly reviews",
    ],
    techStack: [
      "Next.js",
      "FastAPI",
      "WhisperX",
      "Parakeet",
      "PostgreSQL",
      "Redis",
      "Docker",
      "Langfuse",
    ],
    roadmap: [
      "Live transcription mode for in-room meetings",
      "Custom MOM templates per department",
      "Voice agent for pre-meeting prep & post-meeting recap calls",
      "On-prem deployment for regulated industries",
    ],
  },
  {
    slug: "neuromesh",
    name: "NeuroMesh",
    tagline: "Deep agent builder for complex multi-agent workflows.",
    category: "Agentic AI Framework",
    status: "Internal Framework",
    cover: "/images/products/neuromesh-1.webp",
    coverMode: "image",
    gallery: [
      "/images/products/neuromesh-1.webp",
      "/images/products/neuromesh-2.webp",
    ],
    problem:
      "Building multi-agent systems usually means stitching together brittle prompts, manual state, and hand-rolled retries. Hard to debug, harder to maintain.",
    solution:
      "NeuroMesh is our internal framework on top of LangGraph for designing stateful, traceable agent teams. It standardises tool use, retries, human-in-the-loop checkpoints, and observability so we ship agents that survive production traffic.",
    novelty:
      "Opinionated around evaluation and traceability. Every agent run is a first-class object with versioned prompts, tool calls, and outcomes, replayable end to end.",
    features: [
      "Stateful agent graphs with checkpointing",
      "Tool registry with typed input/output schemas",
      "Human-in-the-loop approval nodes",
      "Built-in retries, timeouts and circuit breakers",
      "First-class evaluation harness",
      "Langfuse / LangSmith tracing out-of-the-box",
    ],
    targetUsers: [
      "Internal QentrixAI delivery teams",
      "Enterprise clients building agent platforms",
    ],
    techStack: ["LangGraph", "LangChain", "Python", "FastAPI", "Postgres", "Redis", "Langfuse"],
    roadmap: [
      "Visual graph editor for non-engineers",
      "Marketplace of typed tool integrations",
      "Multi-tenant agent runtime for SaaS use cases",
    ],
  },
  {
    slug: "salespire",
    name: "SalesPire",
    tagline: "AI sales co-pilot: lead enrichment, outreach, and pipeline intelligence.",
    category: "Sales Automation",
    status: "MVP",
    cover: "/images/products/salespire-1.webp",
    coverMode: "image",
    gallery: [
      "/images/products/salespire-1.webp",
      "/images/products/salespire-2.webp",
      "/images/products/salespire-3.webp",
    ],
    problem:
      "Sales teams burn hours on manual enrichment, follow-up writing, and pipeline hygiene. Generic AI tools spam inboxes and miss context.",
    solution:
      "SalesPire combines lead enrichment, AI-written contextual outreach, and a pipeline intelligence layer that surfaces stuck deals, missing actions, and next-best-step recommendations.",
    novelty:
      "Quality-first outreach. Every AI-written message is grounded in the lead's public footprint and the rep's voice, with a human approval step before send.",
    features: [
      "Lead enrichment from public sources",
      "AI-written outreach grounded in lead context",
      "Pipeline health scoring",
      "Next-best-action recommendations",
      "CRM sync (HubSpot, Salesforce, Pipedrive)",
      "Tone-matching to the rep's voice",
    ],
    targetUsers: ["B2B SaaS sales teams", "Agencies running outbound", "SDR/BDR teams"],
    techStack: ["Next.js", "FastAPI", "LangChain", "Postgres", "Pinecone", "Redis", "Docker"],
    roadmap: [
      "Voice AI follow-up calls",
      "Auto-A/B testing on outreach variants",
      "Multi-channel orchestration (email · LinkedIn · WhatsApp)",
    ],
  },
  {
    slug: "ala",
    name: "ALA",
    tagline: "Neutral answers. Reflective wisdom. Trust-first AI for interfaith learning.",
    category: "Responsible Conversational AI",
    status: "Beta",
    cover: "/images/products/ala-1.webp",
    coverMode: "image",
    gallery: [
      "/images/products/ala-1.webp",
      "/images/products/ala-2.webp",
      "/images/products/ala-3.webp",
      "/images/products/ala-4.webp",
    ],
    problem:
      "Religious, cultural and ethical questions are some of the worst use cases for off-the-shelf chatbots. They hallucinate, flatten nuance, and over-confidently pick a single tradition's voice. Users get answers that are either wrong, disrespectful, or dangerously oversimplified.",
    solution:
      "ALA gives you grounded, factual answers first, then adds faith-based or secular reflections only when you ask. Your worldview, your choice, your depth. Every response is anchored to a curated source corpus and clearly marks when a question falls outside its scope.",
    novelty:
      "Built for trust, not persuasion. Three things make ALA different: (1) a retrieval layer scoped per tradition + region so answers never blend voices, (2) a two-stage response with neutral facts first and optional reflection on request, and (3) measurable trust metrics with transparent sourcing surfaced in the UI.",
    features: [
      "Neutral facts first, optional reflective layer on request",
      "Multi-tradition retrieval with per-source provenance",
      "Multi-region & multilingual support",
      "Inline citations and transparent source attribution",
      "Sensitive-topic guardrails with human-review hooks",
      "Scholar-mode for longer, fully-cited responses",
    ],
    targetUsers: [
      "Researchers and students of comparative religion",
      "Multi-faith community platforms",
      "Cultural & heritage organisations",
      "Educators preparing nuanced curricula",
    ],
    techStack: [
      "Next.js",
      "FastAPI",
      "LangGraph",
      "LlamaIndex",
      "Qdrant",
      "Postgres",
      "Langfuse",
    ],
    roadmap: [
      "Regional dialect coverage (Urdu, Arabic, Bahasa, Swahili, Hindi, Turkish)",
      "Voice-mode reflective answers",
      "Editorial dashboard for tradition curators",
      "Public source-attribution graph",
    ],
  },
  {
    slug: "multiagent-chatbot",
    name: "MultiAgent Chatbot",
    tagline: "Multimodal personal companion: Study, Health, Finance, Growth.",
    category: "Consumer Multi-Agent Platform",
    status: "Concept",
    cover: "/images/products/multiagent-1.webp",
    coverMode: "image",
    gallery: [
      "/images/products/multiagent-1.webp",
    ],
    problem:
      "Most personal AI tools are single-purpose chatbots. Users end up juggling tabs for study help, fitness, finance, and personal growth, and none of the contexts talk to each other.",
    solution:
      "A single multimodal platform with specialised agents (Study Helper, Health Coach, Financial Advisor, Growth Partner) sharing a unified user context so advice across life domains stays coherent.",
    novelty:
      "A shared long-term memory across specialised agents. Health context informs finance advice, study load informs the health coach's pacing, without sharing user data outside the platform.",
    features: [
      "Specialised agents per life domain",
      "Shared long-term user memory",
      "Multimodal inputs (voice, image, text)",
      "Goal tracking and weekly reviews",
      "Privacy-first design with local-first options",
    ],
    targetUsers: ["Students", "Knowledge workers", "Early-career professionals"],
    techStack: ["Next.js", "FastAPI", "LangGraph", "Qdrant", "Postgres", "WhisperX"],
    roadmap: [
      "Family / group plans",
      "Wearable integrations (Apple Health, Fitbit)",
      "Custom agent marketplace",
    ],
  },
  {
    slug: "documentai",
    name: "DocumentAI",
    tagline: "Enterprise document intelligence & semantic search.",
    category: "RAG & Knowledge Platform",
    status: "Client Delivery",
    cover: "/images/products/documentai-1.webp",
    coverMode: "image",
    gallery: [
      "/images/products/documentai-1.webp",
    ],
    problem:
      "Enterprises sit on millions of pages of contracts, SOPs, manuals and tickets. Keyword search misses intent; out-of-the-box chat tools hallucinate.",
    solution:
      "A retrieval platform combining hybrid search (BM25 + dense), structured extraction, citation-grounded answers, and per-document/per-role access controls.",
    novelty:
      "Built with a measurable retrieval eval suite from day one. Every change ships with a regression report on precision, recall, and grounding rate.",
    features: [
      "Hybrid retrieval (BM25 + vector + re-rank)",
      "Structured extraction from PDFs, scans, contracts",
      "Citation-grounded answers",
      "Role-based document access",
      "Retrieval eval suite & quality dashboard",
      "Cloud-agnostic deployment",
    ],
    targetUsers: [
      "Legal & compliance teams",
      "Engineering knowledge bases",
      "Customer support deflection",
      "Regulated industries (finance, healthcare)",
    ],
    techStack: [
      "FastAPI",
      "LlamaIndex",
      "Qdrant",
      "Elasticsearch",
      "Postgres",
      "Docker",
      "Langfuse",
    ],
    roadmap: [
      "Multi-tenant SaaS edition",
      "Native MS Teams & Slack assistants",
      "Fine-tuned re-rankers per domain",
    ],
  },
  {
    slug: "voxroute",
    name: "VoxRoute",
    tagline: "AI-powered IVR & voice call automation platform.",
    category: "Voice AI Platform",
    status: "Client Delivery",
    cover: "/images/products/voxroute-1.webp",
    coverMode: "image",
    gallery: [
      "/images/products/voxroute-1.webp",
    ],
    problem:
      "Legacy IVRs frustrate callers and dump everyone into long queues. Live agents repeat the same handful of resolutions all day.",
    solution:
      "A voice AI layer that listens, understands intent, answers from your knowledge base, and only escalates when needed, with full call analytics and CRM sync.",
    novelty:
      "Real-time turn-taking tuned for noisy phone lines, with strict guardrails: if confidence drops, the call is routed to a human, never a hallucinated answer.",
    features: [
      "Real-time ASR + TTS conversational layer",
      "Intent detection & knowledge-grounded answers",
      "Smart escalation to human agents",
      "Call analytics dashboard",
      "Twilio / SIP integrations",
      "Multilingual support",
    ],
    targetUsers: [
      "Mid-market call centers",
      "Recruitment agencies (voice screening)",
      "Healthcare & clinic appointment lines",
      "Telco support",
    ],
    techStack: [
      "Twilio",
      "WhisperX",
      "Parakeet",
      "FastAPI",
      "Redis",
      "PostgreSQL",
      "Docker",
    ],
    roadmap: [
      "Outbound campaign agents",
      "Whisper-based fraud-pattern detection",
      "Native CRM connectors for HubSpot & Salesforce",
    ],
  },
  {
    slug: "voicebot",
    name: "Realtime Voice Bot",
    tagline: "Real-time conversational voice assistant: streaming ASR, instant replies.",
    category: "Conversational Voice AI",
    status: "MVP",
    cover: "/images/products/voicebot-1.webp",
    coverMode: "image",
    gallery: [
      "/images/products/voicebot-1.webp",
      "/images/products/voicebot-2.webp",
    ],
    problem:
      "Most voice assistants either feel laggy and robotic or hallucinate confidently. Teams building voice-first features need a real-time conversational layer that listens, thinks, and speaks back fast enough to feel natural, without sacrificing factual grounding.",
    solution:
      "A streaming voice-to-voice bot that captures audio, transcribes it live, reasons with an LLM, and speaks back with low-latency TTS. Conversations stay coherent across turns, and every interaction is logged with audio + transcript for review.",
    novelty:
      "Tuned for sub-second turn-taking on real-world audio (not studio-clean clips). Interruption-aware: the bot stops talking when the user starts. Built so the same brain can power phone calls, web widgets, kiosks or mobile.",
    features: [
      "Streaming ASR with speaker turn detection",
      "Streaming TTS with natural voice options",
      "Interruption handling (the bot yields when you speak)",
      "Audio + transcript replay for every conversation",
      "Pluggable LLM backend (GPT-4o, Claude, Gemini, Llama)",
      "Web widget, phone, and kiosk deployment targets",
    ],
    targetUsers: [
      "Product teams adding voice to web apps",
      "Customer-support and concierge use-cases",
      "Education & language-learning platforms",
      "Accessibility-first product builders",
    ],
    techStack: [
      "Python",
      "FastAPI",
      "WhisperX",
      "Parakeet",
      "Streamlit",
      "Redis",
      "Docker",
    ],
    roadmap: [
      "Persistent multi-session memory",
      "Tool calls from voice (search, lookup, transactional)",
      "Multilingual code-switching mid-conversation",
      "On-device variant for privacy-sensitive deployments",
    ],
  },
  {
    slug: "medaculous",
    name: "Medaculous",
    tagline: "Clinical companion for learning, practice and patient care.",
    category: "Health AI",
    status: "Live",
    cover: "/images/products/medaculous/1.webp",
    coverMode: "image",
    orientation: "mobile",
    gallery: [
      "/images/products/medaculous/1.webp",
      "/images/products/medaculous/2.webp",
      "/images/products/medaculous/3.webp",
      "/images/products/medaculous/4.webp",
      "/images/products/medaculous/5.webp",
      "/images/products/medaculous/6.webp",
      "/images/products/medaculous/7.webp",
      "/images/products/medaculous/8.webp",
      "/images/products/medaculous/9.webp",
      "/images/products/medaculous/10.webp",
      "/images/products/medaculous/11.webp",
    ],
    problem:
      "A clinician on a ward round needs a differential, a drug dose and a guideline in the same two minutes, and the three of them live in three different places.",
    solution:
      "One mobile companion covering systems and disease topics, symptom-to-differential workup, symptom-based drug recommendations, a formulary with interactions and contraindications, notes, clinical calculators, a knowledge hub and a ward dashboard.",
    novelty:
      "The assistant answers against the same structured content the rest of the app is built on, so an explanation and the formulary entry behind it do not disagree. Built to work offline, because hospital signal does not.",
    features: [
      "Systems and disease topics across all body systems",
      "Symptom workup with differentials, red flags and investigations",
      "Symptom-based drug recommendations with safety checks",
      "Formulary: indications, doses, contraindications, interactions",
      "Medaculous AI for explanations and decision support",
      "Clinical calculators at the point of care",
      "Notes with rich text, images and drawings",
      "Ward Companion for patients, tasks and handovers",
      "Exam Planner for study tracking",
    ],
    targetUsers: ["Junior doctors", "Medical students", "Ward teams", "Clinical educators"],
    techStack: ["React Native", "FastAPI", "Postgres", "Retrieval + re-ranking", "On-device cache"],
    roadmap: [
      "Institution-wide deployments with local formularies",
      "Handover export into hospital systems",
      "Offline-first sync for low-signal wards",
    ],
  },
  {
    slug: "rosenode",
    name: "RoseNode",
    tagline: "A conversational AI companion, with the economics instrumented.",
    category: "Consumer AI",
    status: "Live",
    cover: "/images/products/rosenode-1.webp",
    coverMode: "image",
    gallery: ["/images/products/rosenode-1.webp", "/images/products/rosenode-2.webp"],
    problem:
      "A consumer assistant people talk to every day is a per-message cost problem long before it is a model problem. Without per-intent cost and latency you cannot tell a product decision from a billing accident.",
    solution:
      "A voice-and-text companion with long-term memory, sitting on an operator dashboard that tracks active users, messages, cost per message and p50/p99 latency, broken down by conversation intent.",
    novelty:
      "The intent breakdown is the product analytics and the cost control at once: every conversation is classified, so spend and tail latency are attributable to the kind of conversation driving them rather than to a monthly total.",
    features: [
      "Voice and text conversation with long-term memory",
      "Per-intent classification of every conversation",
      "Cost per message tracked against active users",
      "p50 and p99 latency trends, daily through yearly",
      "Operator dashboard for usage, revenue and engagement",
    ],
    targetUsers: ["Consumer AI teams", "Operators running assistants at scale"],
    techStack: ["Next.js", "FastAPI", "Postgres", "Streaming ASR/TTS", "Langfuse"],
    roadmap: [
      "Cost ceilings and alerts per intent",
      "Retention cohorts against conversation type",
    ],
  },
  {
    slug: "fintelia",
    name: "Fintelia",
    tagline: "Financial intelligence in one workspace: calculators, planning, and market insight.",
    category: "FinTech / InsureTech AI",
    status: "Beta",
    cover: "/images/products/fintelia-1.webp",
    coverMode: "image",
    gallery: [
      "/images/products/fintelia-1.webp",
      "/images/products/fintelia-2.webp",
      "/images/products/fintelia-3.webp",
    ],
    problem:
      "Financial decisions like deductible choices, investment plans, retirement, and market timing depend on data scattered across portals, PDFs and news. Most tools solve one slice and leave the user to stitch the rest. Generic AI chatbots get the math wrong and miss compliance constraints.",
    solution:
      "Fintelia is a single AI-driven workspace with three connected modules: Calculators (deductible optimizer, ROI, tax estimator, claim decisioning), Investment Planner (goal-based plans with risk profile), and Market Intelligence (curated personal-finance feed with sentiment and daily digest).",
    novelty:
      "Modules share a user-context layer. A recommendation in Calculators reflects the goals set in Planner, and the Market feed surfaces only signals relevant to the user's portfolio. Every numerical answer cites its calculation path and assumptions, so users can audit the result, not just trust it.",
    features: [
      "Deductible optimizer with scenario analysis",
      "ROI, tax, and claim-decision calculators",
      "Goal-based investment planning with risk profiling",
      "Personal-finance market intelligence feed",
      "Daily digest with sentiment and topic-level signals",
      "Audit-ready answers with shown calculation paths",
    ],
    targetUsers: [
      "Insurance buyers comparing plans",
      "Retail investors and personal-finance enthusiasts",
      "Independent financial advisors",
      "InsureTech and FinTech platforms (white-label)",
    ],
    techStack: [
      "Next.js",
      "Streamlit",
      "FastAPI",
      "LangGraph",
      "Postgres",
      "Redis",
      "Pinecone",
    ],
    roadmap: [
      "Bank & broker account connectors (Plaid, Tink)",
      "Portfolio-aware market alerts",
      "Tax-jurisdiction packs (US · UK · EU · PK · GCC)",
      "Advisor-mode with client-facing reports",
    ],
  },
];

export function getProduct(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}
