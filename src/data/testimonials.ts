/**
 * Client quotes.
 *
 * Every entry here carries `placeholder: true` and renders with a visible
 * "Placeholder" chip on the card. That is deliberate and it is the whole
 * safety mechanism: this site already shipped invented quotes once, under a
 * heading that called them "plain words from real engagements", and they had
 * to be pulled in the audit.
 *
 * To make one real: replace the words, replace the attribution, delete the
 * `placeholder` flag. The chip disappears on its own. Nothing else to do.
 *
 * Do not delete the flag while the text is still invented.
 */
export type Testimonial = {
  quote: string;
  author: string;
  role: string;
  placeholder?: boolean;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "They shipped the eval harness before the feature. Six months on it is the thing that tells us whether a model upgrade is safe, and nobody else offered it.",
    author: "Sample attribution",
    role: "Head of Engineering, mid-market SaaS",
    placeholder: true,
  },
  {
    quote:
      "We had been quoted a rebuild. They found the answer was routing: a small model first, the large one only on failure. The bill dropped and the latency held.",
    author: "Sample attribution",
    role: "CTO, customer operations platform",
    placeholder: true,
  },
  {
    quote:
      "The handover was the part that surprised us. Runbook, dashboards, a rollback path, and two weeks of our team driving it with them watching.",
    author: "Sample attribution",
    role: "Director of Product, regulated industry",
    placeholder: true,
  },
];

/**
 * Outcome numbers for the metrics band.
 *
 * Same rule. The multi-agent figure is real and published in
 * caseStudies.ts; the rest are shaped like the numbers we expect and are
 * flagged until the owner supplies the measured ones.
 */
export type OutcomeMetric = {
  value: string;
  label: string;
  context: string;
  placeholder?: boolean;
};

export const outcomeMetrics: OutcomeMetric[] = [
  {
    value: "0 to 70%",
    label: "of in-scope tasks automated",
    context: "Multi-agent operations platform, one quarter",
  },
  {
    value: "500",
    label: "question eval set",
    context: "Enterprise document intelligence, run on every change",
  },
  {
    value: "—",
    label: "reduction in first-round screening time",
    context: "Voice AI recruitment screening",
    placeholder: true,
  },
  {
    value: "—",
    label: "containment on in-scope intents",
    context: "AI-powered IVR replacement",
    placeholder: true,
  },
];
