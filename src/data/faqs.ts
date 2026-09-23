/**
 * Kiln (2026-09 revamp). Four questions survive from the old eight; the rest
 * are new, drawn from what 2026 enterprise AI procurement actually asks --
 * IP ownership of fine-tuned weights, portability across the five layers of
 * lock-in, regression practice, run cost, and residency versus sovereignty.
 */
export type Faq = { question: string; answer: string };

export const faqs: Faq[] = [
  {
    question: "Who owns the code, the prompts and the fine-tuned weights?",
    answer:
      "You do. That includes the eval sets and any embeddings produced from your data. Ownership is written into the contract and survives termination. We keep no licence to reuse your data or anything derived from it.",
  },
  {
    question: "How do we avoid being locked to you, or to one model vendor?",
    answer:
      "Model access sits behind an interface, so swapping a provider is a configuration change rather than a rewrite. Prompts, eval sets, traces and audit logs export in open formats. Lock-in accumulates across model, orchestration, data, governance evidence and team knowledge, and we design against all five.",
  },
  {
    question: "How do you know the system still works after a change?",
    answer:
      "A regression suite for prompts and agents runs in your CI. A change that drops a metric does not merge. The suite is yours and it is handed over with the repo.",
  },
  {
    question: "What does it cost to run each month?",
    answer:
      "We size token, inference, storage and observability cost during the design phase, and put a ceiling and an alert on each. You get the number before the build starts, not after the first invoice.",
  },
  {
    question: "Where does our data live, and who can compel it?",
    answer:
      "Residency and sovereignty are different questions. We deploy to your cloud, your VPC or on-prem, and we name every sub-processor involved so you can answer both.",
  },
  {
    question: "Can you run entirely on-prem or in our VPC?",
    answer:
      "Yes. Everything ships Dockerised with CI/CD wired, ready for AWS, GCP, Azure or your own hardware.",
  },
  {
    question: "What is actually in a 6-week MVP?",
    answer:
      "Weeks 1 and 2 are framing and architecture. Weeks 3 and 4 build against the agreed metric. Weeks 5 and 6 are productionisation: Docker, CI/CD, monitoring, secrets and the runbook. You end with something deployed, not a prototype.",
  },
  {
    question: "What kind of AI work do you take on?",
    answer:
      "Generative AI products, agentic systems, retrieval and enterprise search, voice AI, computer vision, document and NLP pipelines, edge deployment, and the MLOps around all of it. If the work is a research project with no production path, we will say so.",
  },
  {
    question: "Can you work alongside our engineering team?",
    answer:
      "Yes, and it is usually the better outcome. We work in your repo, your review process and your CI, and we are explicit about which parts your team should own from day one.",
  },
  {
    question: "Which clouds do you support?",
    answer:
      "AWS, GCP and Azure, plus on-prem and private VPC deployments. Everything is Dockerised, so the target is a deployment decision rather than an architectural one.",
  },
  {
    question: "What does pricing look like?",
    answer:
      "Three shapes: a fixed-scope MVP, a retained engineering pod, or a short strategy sprint when the problem is not yet clear. We price after the framing call, because a number before that is a guess.",
  },
  {
    question: "Do you sign NDAs?",
    answer:
      "Yes, routinely. Several of the case studies on this site are anonymised for exactly that reason.",
  },
];
