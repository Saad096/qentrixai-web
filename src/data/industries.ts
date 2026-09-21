/**
 * Aurora. Domains we can speak to, honestly labelled.
 *
 * The rule has not changed: a tab only claims an engagement if one exists.
 * What changed is the evidence base -- with eleven products shipped, most of
 * these are now backed by something we built and operate rather than by a
 * case study alone, so the list can be wider without inventing anything.
 *
 * Tabs with neither a case study nor a product say what we would build and
 * stop. No logo, no "we helped a client", no link.
 */
const DIR = "/images/undraw";

export type Industry = {
  name: string;
  line: string;
  /** Slugs in caseStudies.ts. */
  cases: string[];
  /** Slugs in products.ts. Things we built and run ourselves. */
  products?: string[];
  /** unDraw illustration, themed. Must be distinct within this list. */
  art: string;
};

export const industries: Industry[] = [
  {
    name: "Customer operations",
    art: `${DIR}/business-call.svg`,
    line: "Call deflection, screening and back-office coordination, with a confidence threshold that hands off to a human rather than guessing.",
    cases: ["ai-ivr-platform", "voice-recruitment-automation", "multi-agent-ai-platform"],
    products: ["voxroute", "voicebot"],
  },
  {
    name: "Healthcare",
    art: `${DIR}/ai-chat.svg`,
    line: "Clinical reference a doctor can use inside a two-minute ward round: differentials, doses and guidelines answered from one structured source, and working offline.",
    cases: [],
    products: ["medaculous"],
  },
  {
    name: "Financial services",
    art: `${DIR}/predictive-analytics.svg`,
    line: "Calculators, planning and market intelligence in one workspace, where every number shown can be traced back to the input that produced it.",
    cases: [],
    products: ["fintelia"],
  },
  {
    name: "Regulated industries",
    art: `${DIR}/ai-document-analysis.svg`,
    line: "Retrieval that cites its source, so an answer can be checked rather than trusted, and extraction measured per field rather than in aggregate.",
    cases: ["enterprise-document-intelligence"],
    products: ["documentai"],
  },
  {
    name: "Professional services",
    art: `${DIR}/business-decisions.svg`,
    line: "Meetings, minutes and decisions captured with a reviewer in the loop before anything is published.",
    cases: ["meeting-intelligence-platform"],
    products: ["minutely"],
  },
  {
    name: "Sales and revenue",
    art: `${DIR}/five-year-plan.svg`,
    line: "Signals, enrichment and pipeline intelligence wired into the CRM already in use, rather than a second system to keep up to date.",
    cases: [],
    products: ["salespire"],
  },
  {
    name: "Enterprise IT and workforce",
    art: `${DIR}/server-cluster.svg`,
    line: "On-device identity and attendance with anti-spoofing, and no biometric data leaving the device.",
    cases: ["computer-vision-systems"],
  },
  {
    name: "Consumer AI",
    art: `${DIR}/artificial-intelligence.svg`,
    line: "Assistants people talk to daily, instrumented so cost per message and tail latency are attributable to the kind of conversation driving them.",
    cases: [],
    products: ["rosenode", "ala", "multiagent-chatbot"],
  },
  {
    name: "Public sector",
    art: `${DIR}/security-on.svg`,
    line: "We have not published a public-sector engagement. What we would build: open-weight models on infrastructure inside the jurisdiction, keys held by the department, and every sub-processor in the path named before anything ships.",
    cases: [],
  },
  {
    name: "Logistics",
    art: `${DIR}/file-analysis.svg`,
    line: "We have not published a logistics engagement. What we would build: document extraction across manifests and customs paperwork, with accuracy measured per field.",
    cases: [],
  },
];
