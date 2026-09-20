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
      headerClassName="lg:max-w-[46ch]"
    >
      {/* Dark theme only.
          violet-wave.jpg is a dark photograph. At 30% over the light theme's
          lavender wash the two averaged into a muddy grey-purple that dulled
          the heading and swallowed the diagram. */}
      <div className="absolute inset-0 -z-10 hidden dark:block">
        <Image
          src="/images/abstract/violet-wave.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
      </div>

      {/* Two columns. With the photograph gone from the light theme the right
          half of this section was simply empty. */}
      <div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
        <div className="space-y-5 text-md text-muted lg:col-span-6">
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

        <div className="lg:col-span-6" data-reveal>
          {/* glass-curve reads on both themes — it is pastel rather than dark,
              so it does not need the dark:-only treatment the wave does. */}
          <div className="relative aspect-[16/11] w-full overflow-hidden rounded-lg shadow-2">
            <Image
              src="/images/abstract/glass-curve.jpg"
              alt=""
              fill
              sizes="(min-width: 1024px) 46vw, 92vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>

      <div className="mt-11" data-reveal>
        <GapDiagram />
      </div>
    </Section>
  );
}
