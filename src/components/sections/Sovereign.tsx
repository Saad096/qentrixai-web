import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";

/**
 * Sovereign AI, given its own section rather than a line in the capability
 * list, because it is the shift the market is actually making right now.
 *
 * Every figure here is attributed on the page. They are other people's
 * research, not our results, and a number without its source is the kind of
 * claim this site exists to avoid.
 */
const EVIDENCE = [
  {
    stat: "83%",
    line: "of companies now treat sovereign AI as at least moderately important to strategic planning.",
    source: "Deloitte, 2026",
  },
  {
    stat: "77%",
    line: "factor a vendor's country of origin into the purchasing decision.",
    source: "Deloitte, 2026",
  },
  {
    stat: "65%",
    line: "of IT leaders have already restructured cloud strategy under geopolitical pressure.",
    source: "Kyndryl, 2026",
  },
];

export function Sovereign() {
  return (
    <Section
      id="sovereign"
      eyebrow="Where the market moved"
      heading="Sovereign by default, not by exception."
      lede="Cloud-first became sovereign-first. The part most vendors still get wrong is that residency has to cover inference, not just storage."
      ground="band"
    >
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {EVIDENCE.map((e, i) => (
          <Card as="li" key={e.stat}>
            <div data-reveal data-reveal-delay={i * 70} className="flex h-full flex-col gap-3 p-7">
              <span className="text-3xl font-bold text-link">{e.stat}</span>
              <p className="text-base text-text">{e.line}</p>
              <p className="mt-auto pt-4 font-mono text-xs text-muted">{e.source}</p>
            </div>
          </Card>
        ))}
      </ul>

      <div className="mt-12 max-w-measure space-y-5 text-md text-text-2">
        <p>
          Storage residency is the half that gets written into contracts. Inference residency is the
          half that gets missed. Where are the tokens actually processed, which sub-processors sit in
          the path, and who could be compelled to hand any of it over.
        </p>
        <p>
          We build the whole lifecycle inside a boundary you own. Open-weight models on your own
          hardware or in an in-country region, and keys you hold. The exit plan is written before the
          build starts, not negotiated at the end of it.
        </p>
      </div>

      <p className="mt-9">
        <Link
          href="/services/sovereign-ai"
          className="inline-flex min-h-[44px] items-center text-base font-semibold text-link underline-offset-4 hover:underline"
        >
          How we build sovereign deployments
        </Link>
      </p>
    </Section>
  );
}
