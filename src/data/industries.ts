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
};

export const industries: Industry[] = [
  {
    name: "Customer operations",
    line: "Call deflection, screening and back-office coordination, with a confidence threshold that hands off to a human rather than guessing.",
    cases: ["ai-ivr-platform", "voice-recruitment-automation", "multi-agent-ai-platform"],
  },
  {
    name: "Regulated industries",
    line: "Retrieval that cites its source, so an answer can be checked rather than trusted.",
    cases: ["enterprise-document-intelligence"],
  },
  {
    name: "Professional services",
    line: "Meetings, minutes and decisions captured with a reviewer in the loop before anything is published.",
    cases: ["meeting-intelligence-platform"],
  },
  {
    name: "Enterprise IT and workforce",
    line: "On-device identity and attendance with anti-spoofing, and no biometric data leaving the device.",
    cases: ["computer-vision-systems"],
  },
  {
    name: "Healthcare",
    line: "We have not published a healthcare engagement. What we would build: retrieval over clinical documentation with citation grounding, deployed in your VPC, with an eval set written by your clinicians.",
    cases: [],
  },
  {
    name: "Logistics",
    line: "We have not published a logistics engagement. What we would build: document extraction across manifests and customs paperwork, with the extraction accuracy measured per field.",
    cases: [],
  },
];
