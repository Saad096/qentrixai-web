/**
 * Kiln (2026-09 revamp). Six tabs, honestly labelled (owner decision, GATE 4).
 *
 * Four carry a real engagement. Healthcare and Logistics carry a capability
 * statement and nothing else: no logo, no "we helped a client", no case link.
 * If we have not shipped it, the tab says what we would build and stops.
 */
export type Industry = {
  name: string;
  line: string;
  /** Slugs in caseStudies.ts. Empty means no published engagement. */
  cases: string[];
  image: string;
  /** Describes what the photograph shows, not what the tab is called. */
  imageAlt: string;
};

export const industries: Industry[] = [
  {
    name: "Customer operations",
    image: "/images/industries/customer-operations.jpg",
    imageAlt: "A busy crossing full of people moving through a city street",
    line: "Call deflection, screening and back-office coordination, with a confidence threshold that hands off to a human rather than guessing.",
    cases: ["ai-ivr-platform", "voice-recruitment-automation", "multi-agent-ai-platform"],
  },
  {
    name: "Regulated industries",
    image: "/images/industries/regulated-industries.jpg",
    imageAlt: "Trading screens showing candlestick charts and market data",
    line: "Retrieval that cites its source, so an answer can be checked rather than trusted.",
    cases: ["enterprise-document-intelligence"],
  },
  {
    name: "Professional services",
    image: "/images/industries/professional-services.jpg",
    imageAlt: "A person working at a desk in a quiet home office",
    line: "Meetings, minutes and decisions captured with a reviewer in the loop before anything is published.",
    cases: ["meeting-intelligence-platform"],
  },
  {
    name: "Enterprise IT and workforce",
    image: "/images/industries/enterprise-it.jpg",
    imageAlt: "Server racks with patched network cabling",
    line: "On-device identity and attendance with anti-spoofing, and no biometric data leaving the device.",
    cases: ["computer-vision-systems"],
  },
  {
    name: "Healthcare",
    image: "/images/industries/healthcare.jpg",
    imageAlt: "A hospital room with monitoring equipment beside the bed",
    line: "We have not published a healthcare engagement. What we would build: retrieval over clinical documentation with citation grounding, deployed in your VPC, with an eval set written by your clinicians.",
    cases: [],
  },
  {
    name: "Logistics",
    image: "/images/industries/logistics.jpg",
    imageAlt: "An aerial view of a container port stacked with freight",
    line: "We have not published a logistics engagement. What we would build: document extraction across manifests and customs paperwork, with the extraction accuracy measured per field.",
    cases: [],
  },
];
