/**
 * The anti-demo message lives here and nowhere else. The old site said it six
 * times across the homepage (hero x2, Problem, AboutPreview, CaseStudies,
 * WhyUs, ProductsShowcase).
 *
 * Dark ground (2026-09-21): the stock `violet-wave.jpg` that sat behind this
 * at 40% is gone. It threw a mauve diagonal across the block that muddied
 * the ground and dropped the contrast of the prose sitting on it, and it was
 * the last photographic wash on the homepage. The `wash` ground -- two soft
 * brand and accent radials on near-black, plus grain -- does the job without
 * a photograph.
 *
 * Rebuilt: the stock glass render is gone and the pipeline is the centrepiece.
 * Previously the argument was entirely in the prose, a generic 3D image sat
 * beside it saying nothing, and the diagram was a small afterthought below
 * both. Now each stage of the pipeline carries the clause from the prose that
 * belongs to it.
 */
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
      {/* Two columns of prose rather than one column and an empty half. */}
      <div className="mt-9 grid gap-x-14 gap-y-5 text-md text-muted lg:grid-cols-2">
        <p>
          A model that answers well in a notebook is not a system. Production means retrieval that
          stays fresh and agents that fail safely. It means traces you can read at 3am, evals that
          catch a regression before your customer does, and a rollback path when they do.
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
