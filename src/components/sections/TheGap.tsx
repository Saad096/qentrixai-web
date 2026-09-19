/**
 * The anti-demo message lives here and nowhere else. The old site said it six
 * times across the homepage (hero x2, Problem, AboutPreview, CaseStudies,
 * WhyUs, ProductsShowcase).
 */
import { Section } from "@/components/ui/Section";

export function TheGap() {
  return (
    <Section eyebrow="Why this is hard" heading="The demo is the easy part." className="rule">
      <div className="mt-8 max-w-measure space-y-5 text-md text-muted">
        <p>
          A model that answers well in a notebook is not a system. Production means retrieval that
          stays fresh, agents that fail safely, traces you can read at 3am, evals that catch a
          regression before your customer does, and a rollback path when they don&apos;t.
        </p>
        <p>
          That work is unglamorous and it is most of the job. We are not a slide-deck consultancy,
          an offshore body shop, or a demo factory.
        </p>
      </div>
    </Section>
  );
}
