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

/**
 * The homepage "why us" grid, 2026-09-21. Six cells rather than three cards,
 * at the owner's direction, following the reference layout.
 *
 * Every line traces to something already on this page: `stats` above, the
 * three `pillars` below, and the nine products in products.ts. Nothing here
 * is a new claim -- the reference site's own cells include a "95% client
 * retention rate" we have no basis for, so it is not here.
 *
 * `pillars` is kept as-is. It is the fuller three-reason argument and /about
 * is the place for it; this is the scannable form.
 */
export type Reason = {
  title: string;
  line: string;
  href?: string;
};

export const reasons: Reason[] = [
  {
    title: "Senior-only delivery",
    line: "The people who scope the work are the people who build it. No junior bench.",
    href: "/about",
  },
  {
    title: "We run our own products",
    line: "Nine of them, in production. We live with our own architecture decisions.",
    href: "/products",
  },
  {
    title: "Evals before launch",
    line: "Tracing, eval suites and a rollback path wired up front, not after an incident.",
    href: "/services/cloud-devops-mlops",
  },
  {
    title: "25+ systems shipped",
    line: "Across five years of AI and data engineering, not five years of pilots.",
    href: "/case-studies",
  },
  {
    title: "12 client geographies",
    line: "Delivered remotely into twelve countries, working in your timezone.",
  },
  {
    title: "Six weeks to an MVP",
    line: "Kickoff to something real users can use, with the repo yours at handover.",
    href: "/#how-we-work",
  },
];

export type Company = typeof company;
