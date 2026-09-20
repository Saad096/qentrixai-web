/**
 * The anti-demo message lives here and nowhere else. The old site said it six
 * times across the homepage (hero x2, Problem, AboutPreview, CaseStudies,
 * WhyUs, ProductsShowcase).
 */
import Image from "next/image";
import { GapDiagram } from "@/components/ui/GapDiagram";
import { Section } from "@/components/ui/Section";

export function TheGap() {
  return (
    <Section
      eyebrow="Why this is hard"
      heading="The demo is the easy part."
      ground="wash"
      className="relative isolate overflow-hidden"
    >
      {/* Dark theme only.
          violet-wave.jpg is a dark photograph. At 30% over the light theme's
          lavender wash the two averaged into a muddy grey-purple that dulled
          the heading and swallowed the diagram. In light the wash and grain
          carry the section on their own; in dark the photograph has something
          to sit against, so it stays and gets a little more presence. */}
      <div className="absolute inset-0 -z-10 hidden dark:block">
        <Image
          src="/images/abstract/violet-wave.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
      </div>
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

      <div className="mt-11" data-reveal>
        <GapDiagram />
      </div>
    </Section>
  );
}
