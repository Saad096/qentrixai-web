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
 *
 * Photography per tab, from the reference set the owner supplied plus
 * Unsplash where that set had no honest fit. Provenance per file is in
 * docs/revamp/06-images.md.
 */
const DIR = "/images/industries";

export type Industry = {
  name: string;
  line: string;
  /** Slugs in caseStudies.ts. */
  cases: string[];
  /** Slugs in products.ts. Things we built and run ourselves. */
  products?: string[];
  /** Photograph for the tab panel. */
  image: string;
  /** Describes what the photograph shows, not what the tab is called. */
  imageAlt: string;
};

export const industries: Industry[] = [
  {
    name: "Customer operations",
    image: `${DIR}/customer-operations.webp`,
    imageAlt: "A headset resting on a desk beside an open laptop",
    line: "Call deflection, screening and back-office coordination, with a confidence threshold that hands off to a human rather than guessing.",
    cases: ["ai-ivr-platform", "voice-recruitment-automation", "multi-agent-ai-platform"],
    products: ["voxroute", "voicebot"],
  },
  {
    name: "Healthcare",
    image: `${DIR}/healthcare.webp`,
    imageAlt: "A hospital room with monitoring equipment beside the bed",
    line: "Clinical reference a doctor can use inside a two-minute ward round: differentials, doses and guidelines answered from one structured source, and working offline.",
    cases: [],
    products: ["medaculous"],
  },
  {
    name: "Financial services",
    image: `${DIR}/financial-services.webp`,
    imageAlt: "Trading screens showing candlestick charts and market data",
    line: "Calculators, planning and market intelligence in one workspace, where every number shown can be traced back to the input that produced it.",
    cases: [],
    products: ["fintelia"],
  },
  {
    name: "Regulated industries",
    image: `${DIR}/regulated-industries.webp`,
    imageAlt: "A person signing a printed contract at a desk",
    line: "Retrieval that cites its source, so an answer can be checked rather than trusted, and extraction measured per field rather than in aggregate.",
    cases: ["enterprise-document-intelligence"],
    products: ["documentai"],
  },
  {
    name: "Professional services",
    image: `${DIR}/professional-services.webp`,
    imageAlt: "Colleagues meeting in a glass-walled conference room",
    line: "Meetings, minutes and decisions captured with a reviewer in the loop before anything is published.",
    cases: ["meeting-intelligence-platform"],
    products: ["minutely"],
  },
  {
    name: "Sales and revenue",
    image: `${DIR}/sales-and-revenue.webp`,
    imageAlt: "An abstract visualisation of streaming data",
    line: "Signals, enrichment and pipeline intelligence wired into the CRM already in use, rather than a second system to keep up to date.",
    cases: [],
    products: ["salespire"],
  },
  {
    name: "Enterprise IT and workforce",
    image: `${DIR}/enterprise-it.webp`,
    imageAlt: "Server racks with patched network cabling",
    line: "On-device identity and attendance with anti-spoofing, and no biometric data leaving the device.",
    cases: ["computer-vision-systems"],
  },
  {
    name: "Consumer AI",
    image: `${DIR}/consumer-ai.webp`,
    imageAlt: "A customer browsing shelves in a shop",
    line: "Assistants people talk to daily, instrumented so cost per message and tail latency are attributable to the kind of conversation driving them.",
    cases: [],
    products: ["rosenode", "ala", "multiagent-chatbot"],
  },
  {
    name: "Public sector",
    image: `${DIR}/public-sector.webp`,
    imageAlt: "The facade of a civic government building",
    line: "We have not published a public-sector engagement. What we would build: open-weight models on infrastructure inside the jurisdiction, keys held by the department, and every sub-processor in the path named before anything ships.",
    cases: [],
  },
  {
    name: "Logistics",
    image: `${DIR}/logistics.webp`,
    imageAlt: "An aerial view of a container port stacked with freight",
    line: "We have not published a logistics engagement. What we would build: document extraction across manifests and customs paperwork, with accuracy measured per field.",
    cases: [],
  },
];
