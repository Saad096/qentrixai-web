/**
 * Kiln (2026-09 revamp). `metric` is the hard-number slot for each study.
 * Only the multi-agent platform has a published figure today; the owner is
 * supplying the rest, and until they arrive the slot stays empty rather than
 * carrying an invented number (copy deck section 12).
 */
export type CaseStudy = {
  slug: string;
  metric?: { value: string; label: string };
  title: string;
  category: string;
  client: string;
  problem: string;
  solution: string;
  outcome: string;
  stack: string[];
  cover: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "multi-agent-ai-platform",
    metric: { value: "0 to 70%", label: "of in-scope tasks automated in one quarter" },
    title: "Multi-Agent AI Platform for Operational Workflows",
    category: "Agentic AI",
    client: "Enterprise (NDA)",
    problem:
      "Operations team running repetitive multi-step workflows across CRM, helpdesk, and back-office tools, losing 200+ hours a month to manual coordination.",
    solution:
      "Designed a LangGraph-based multi-agent system with typed tools, retries, and human-in-the-loop approvals on irreversible actions. Full Langfuse tracing on every run.",
    outcome:
      "Automated workflow coverage moved from 0 to 70% of in-scope tasks within a quarter, with a measurable drop in handle time and zero hallucinated actions in production.",
    stack: ["LangGraph", "FastAPI", "Postgres", "Redis", "Langfuse", "Docker"],
    cover: "/products/neuromesh-1.png",
  },
  {
    slug: "enterprise-document-intelligence",
    title: "Enterprise Document Intelligence & Semantic Search",
    category: "RAG",
    client: "Regulated Industry (NDA)",
    problem:
      "Knowledge sprawl across 100k+ documents (contracts, SOPs, manuals) with brittle keyword search and growing tickets to legal & ops.",
    solution:
      "Hybrid retrieval (BM25 + dense + re-ranker), structured extraction, citation-grounded answers, and a regression eval suite on every change.",
    outcome:
      "Self-service answer rate measured against a 500-question eval set, with citation grounding above target. Significant reduction in escalations to internal subject-matter experts.",
    stack: ["LlamaIndex", "Qdrant", "Elasticsearch", "FastAPI", "Langfuse"],
    cover: "",
  },
  {
    slug: "voice-recruitment-automation",
    title: "Voice AI Recruitment Screening & CRM Automation",
    category: "Voice AI",
    client: "Recruitment Agency",
    problem:
      "Recruiters losing hours on first-round screening calls: repetitive questions, repetitive note-taking, missed follow-ups.",
    solution:
      "Outbound voice agent for first-round screening with real-time ASR/TTS, structured note extraction, and direct CRM sync. Human handover on edge cases.",
    outcome:
      "Recruiter time on first-round screening dropped sharply; structured candidate data flows directly into the ATS with searchable transcripts attached.",
    stack: ["Twilio", "WhisperX", "Parakeet", "FastAPI", "PostgreSQL", "Docker"],
    cover: "",
  },
  {
    slug: "meeting-intelligence-platform",
    title: "Meeting Intelligence Platform with Approval Workflows",
    category: "Speech AI",
    client: "Consulting Firm",
    problem:
      "Client meetings producing scattered notes, MOMs late by days, action items missed, decisions disputed.",
    solution:
      "End-to-end meeting platform: high-accuracy transcription, speaker diarization, structured MOM extraction, reviewer-approved publishing, and CRM/email sync.",
    outcome:
      "MOMs published same day instead of next week. Decisions and actions traceable per meeting with reviewer accountability.",
    stack: ["Next.js", "FastAPI", "WhisperX", "Postgres", "Redis", "Langfuse"],
    cover: "/products/minutely-2.png",
  },
  {
    slug: "ai-ivr-platform",
    title: "AI-Powered IVR Replacement Platform",
    category: "Voice AI",
    client: "Mid-market Call Center",
    problem:
      "Legacy IVR with low containment rate and high frustration; live agents repeating the same 10 resolutions all day.",
    solution:
      "Real-time conversational layer with strict confidence gating. Answers come from a curated KB with transfer to a human when confidence drops below threshold.",
    outcome:
      "Containment rate up significantly on in-scope intents; live agents freed to handle complex cases. Full call analytics dashboard for ops leadership.",
    stack: ["Twilio", "WhisperX", "FastAPI", "Redis", "Postgres", "Grafana"],
    cover: "",
  },
  {
    slug: "computer-vision-systems",
    title: "Computer Vision Systems for Identity & Attendance",
    category: "Computer Vision",
    client: "Enterprise IT",
    problem:
      "Manual attendance verification across multiple sites: slow, error-prone, hard to audit.",
    solution:
      "On-device face recognition with anti-spoofing checks, encrypted templates, and centralised audit log. Edge-first design for offline resilience.",
    outcome:
      "Sub-second on-device verification, fully auditable attendance records, and no plain-text biometric data leaving the device.",
    stack: ["PyTorch", "ONNX Runtime", "FastAPI", "Postgres", "Docker"],
    cover: "",
  },
];
