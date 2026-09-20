/**
 * The anti-demo message lives here and nowhere else. The old site said it six
 * times across the homepage (hero x2, Problem, AboutPreview, CaseStudies,
 * WhyUs, ProductsShowcase).
 *
 * Rebuilt: the stock glass render is gone and the pipeline is the centrepiece.
 * Previously the argument was entirely in the prose, a generic 3D image sat
 * beside it saying nothing, and the diagram was a small afterthought below
 * both. Now each stage of the pipeline carries the clause from the prose that
 * belongs to it.
 */
import Image from "next/image";
import { GapPipeline } from "@/components/ui/GapPipeline";
import { Section } from "@/components/ui/Section";

export function TheGap() {
  return (
    <Section
      eyebrow="Why this is hard"
      heading="The demo is the easy part."
      ground="wash"
      className="relative isolate overflow-hidden"
      headerClassName="max-w-[30ch]"
    >
      <div className="absolute inset-0 -z-10 hidden dark:block">
        <Image
          src="/images/abstract/violet-wave.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-40"
        />
      </div>

      {/* Two columns of prose rather than one column and an empty half. */}
      <div className="mt-9 grid gap-x-14 gap-y-5 text-md text-muted lg:grid-cols-2">
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

      <GapPipeline />
    </Section>
  );
}
