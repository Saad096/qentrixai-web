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
  /** URL segment under /industries. The detail copy lives in industryDetail.ts. */
  slug: string;
  name: string;
  line: string;
  /** Slugs in caseStudies.ts. */
  cases: string[];
  /** Slugs in products.ts. Things we built and run ourselves. */
  products?: string[];
  /** Photograph for the tab panel. Optional: a domain with no honest photo
      renders a drawn pipeline instead, which is the better artwork anyway. */
  image?: string;
  /** Describes what the photograph shows, not what the tab is called. */
  imageAlt?: string;
  /** The four stages drawn when there is no photograph. */
  flow?: { label: string; sub: string }[];
};

export const industries: Industry[] = [
  {
    slug: "customer-operations",
    name: "Customer operations",
    image: `${DIR}/customer-operations.webp`,
    imageAlt: "A headset resting on a desk beside an open laptop",
    line: "Call deflection, screening and back-office coordination, with a confidence threshold that hands off to a human rather than guessing.",
    cases: ["ai-ivr-platform", "voice-recruitment-automation", "multi-agent-ai-platform"],
    products: ["voxroute", "voicebot"],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    image: `${DIR}/healthcare.webp`,
    imageAlt: "A hospital room with monitoring equipment beside the bed",
    line: "Clinical reference a doctor can use inside a two-minute ward round: differentials, doses and guidelines answered from one structured source, and working offline.",
    cases: [],
    products: ["medaculous"],
  },
  {
    slug: "financial-services",
    name: "Financial services",
    image: `${DIR}/financial-services.webp`,
    imageAlt: "Trading screens showing candlestick charts and market data",
    line: "Calculators, planning and market intelligence in one workspace, where every number shown can be traced back to the input that produced it.",
    cases: [],
    products: ["fintelia"],
  },
  {
    slug: "regulated-industries",
    name: "Regulated industries",
    image: `${DIR}/regulated-industries.webp`,
    imageAlt: "A person signing a printed contract at a desk",
    line: "Retrieval that cites its source, so an answer can be checked rather than trusted, and extraction measured per field rather than in aggregate.",
    cases: ["enterprise-document-intelligence"],
    products: ["documentai"],
  },
  {
    slug: "professional-services",
    name: "Professional services",
    image: `${DIR}/professional-services.webp`,
    imageAlt: "Colleagues meeting in a glass-walled conference room",
    line: "Meetings, minutes and decisions captured with a reviewer in the loop before anything is published.",
    cases: ["meeting-intelligence-platform"],
    products: ["minutely"],
  },
  {
    slug: "sales-and-revenue",
    name: "Sales and revenue",
    image: `${DIR}/sales-and-revenue.webp`,
    imageAlt: "An abstract visualisation of streaming data",
    line: "Signals, enrichment and pipeline intelligence wired into the CRM already in use, rather than a second system to keep up to date.",
    cases: [],
    products: ["salespire"],
  },
  {
    slug: "enterprise-it-and-workforce",
    name: "Enterprise IT and workforce",
    image: `${DIR}/enterprise-it.webp`,
    imageAlt: "Server racks with patched network cabling",
    line: "On-device identity and attendance with anti-spoofing, and no biometric data leaving the device.",
    cases: ["computer-vision-systems"],
  },
  {
    slug: "consumer-ai",
    name: "Consumer AI",
    image: `${DIR}/consumer-ai.webp`,
    imageAlt: "A customer browsing shelves in a shop",
    line: "Assistants people talk to daily, instrumented so cost per message and tail latency are attributable to the kind of conversation driving them.",
    cases: [],
    products: ["rosenode", "ala", "multiagent-chatbot"],
  },
  {
    slug: "public-sector",
    name: "Public sector",
    image: `${DIR}/public-sector.webp`,
    imageAlt: "The facade of a civic government building",
    line: "We have not published a public-sector engagement. What we would build: open-weight models on infrastructure inside the jurisdiction, keys held by the department, and every sub-processor in the path named before anything ships.",
    cases: [],
  },
  {
    slug: "agriculture-and-agritech",
    name: "Agriculture and agritech",
    flow: [
      { label: "Capture", sub: "drone, handset" },
      { label: "Detect", sub: "on device" },
      { label: "Score", sub: "per field" },
      { label: "Act", sub: "spray plan" },
    ],
    line: "We have not published an agritech engagement. What we would build: disease and stress detection that runs on the drone or the handset, because the field is where the connection is worst and the decision is needed fastest.",
    cases: [],
  },
  {
    slug: "education-and-learning",
    name: "Education and learning",
    flow: [
      { label: "Question", sub: "learner asks" },
      { label: "Retrieve", sub: "vetted corpus" },
      { label: "Answer", sub: "with citation" },
      { label: "Review", sub: "human in loop" },
    ],
    line: "Assistants that teach from a corpus someone vetted, answer with the passage attached, and decline rather than improvise when the question runs past what the corpus covers.",
    cases: [],
    products: ["ala"],
  },
  {
    slug: "logistics",
    name: "Logistics",
    image: `${DIR}/logistics.webp`,
    imageAlt: "An aerial view of a container port stacked with freight",
    line: "We have not published a logistics engagement. What we would build: document extraction across manifests and customs paperwork, with accuracy measured per field.",
    cases: [],
  },
];
