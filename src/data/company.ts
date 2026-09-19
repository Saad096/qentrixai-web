/**
 * Kiln (2026-09 revamp). Facts are untouched: the four stats, the founding
 * year, the location and the hours are exactly as they were. What changed is
 * the shape -- six process steps collapse to four phases that each name the
 * artifact they hand over, and six "why us" cards collapse to three pillars
 * that each point at something on the site that proves them.
 */
export const company = {
  name: "QentrixAI",
  legalName: "QentrixAI",
  tagline: "AI product studio",
  promise: "AI systems that survive real users, real load, and handover.",
  mission:
    "We design, build and run agentic systems, retrieval pipelines and voice AI, then hand over the repo, the eval harness and the runbook.",
  founded: "2024",
  location: "Lahore, Pakistan, serving clients worldwide",
  hours: "Mon to Sat, 9:00-19:00 PKT",
  capabilities: [
    "GenAI",
    "Agentic AI",
    "RAG Systems",
    "Voice AI",
    "Computer Vision",
    "Edge AI",
    "Responsible AI",
    "Blockchain",
    "Cloud & DevOps",
  ],
  stats: [
    { label: "years in AI and data engineering", value: "5+" },
    { label: "production systems shipped", value: "25+" },
    { label: "client geographies served", value: "12" },
    { label: "kickoff to working MVP", value: "6wk" },
  ],
};

export type Phase = {
  step: string;
  title: string;
  body: string;
  artifact: string;
};

export const phases: Phase[] = [
  {
    step: "01",
    title: "Frame",
    body: "Stakeholder interviews, a data audit, and a measurable target agreed before any model is chosen.",
    artifact: "a written problem framing with the success metric.",
  },
  {
    step: "02",
    title: "Design",
    body: "System architecture, model and retrieval strategy, integration plan, security and compliance posture.",
    artifact: "an architecture decision record, including what we rejected.",
  },
  {
    step: "03",
    title: "Build",
    body: "Weekly demos against the metric. Typed code, clean repos, evaluation harnesses for prompts and agents.",
    artifact: "the repo and a regression suite running in your CI.",
  },
  {
    step: "04",
    title: "Run",
    body: "Dockerised rollout to your cloud or VPC, tracing and alerting wired, then a supervised handover and an improvement loop.",
    artifact: "a runbook, dashboards, and a rollback path.",
  },
];

export type Pillar = {
  title: string;
  body: string;
  proof: string;
  proofHref?: string;
};

export const pillars: Pillar[] = [
  {
    title: "Production discipline",
    body: "Evals, tracing and a rollback path are wired before launch, not bolted on after an incident.",
    proof: "Langfuse, LangSmith, Grafana, Prometheus",
  },
  {
    title: "We operate our own products",
    body: "Nine of them. We live with our own architecture decisions, which is why we argue about them early.",
    proof: "See all nine products",
    proofHref: "/products",
  },
  {
    title: "Senior-only delivery",
    body: "The people who scope the work are the people who build it. No junior bench, no handoff between vendors.",
    proof: "Led by Saad Alam, CEO and AI lead",
    proofHref: "/about",
  },
];

export type Company = typeof company;
