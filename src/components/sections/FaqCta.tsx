import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { faqs } from "@/data/faqs";
import { PRIMARY_CTA } from "@/data/navigation";

/**
 * Split in two on 2026-09-22.
 *
 * `FaqCta` rendered both halves and was on twelve route files, which after
 * the dynamic routes meant the same twelve questions and answers appeared
 * on about fifty pages. Three problems in one: it is a wall of duplicate
 * content for a crawler, it breaks the copy deck's "say it once" rule
 * fifty times, and it puts nine hundred words of boilerplate under every
 * short page.
 *
 * `Faq` now renders only where someone is deciding -- home, about, contact
 * -- and everywhere else `CtaBlock` carries the ask on its own. Capability
 * pages already have their own two specific questions, which is the right
 * amount of FAQ for a page about one capability.
 */
export function Faq() {
  return (
      <Section id="faq" ground="band">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5" data-reveal>
            <p className="mb-4 font-mono text-xs text-muted">Before the call</p>
            <h2 className="text-3xl font-bold text-text">Questions buyers actually ask.</h2>
            <p className="mt-5 text-md text-text-2">
              If yours is not here, ask it on the call. We answer scoping and architecture
              questions before there is a contract.
            </p>
            <div className="mt-8 rounded-md bg-surface p-7 shadow-1">
              <p className="text-base text-text-2">
                Thirty minutes, no pitch deck. If we are not the right fit, we will say so.
              </p>
              <Button href={PRIMARY_CTA.href} size="lg" className="mt-5 w-full sm:w-auto">
                {PRIMARY_CTA.label}
              </Button>
            </div>
          </div>

          <ul className="lg:col-span-7">
          {faqs.map((faq, i) => (
            <li key={faq.question} className="border-t border-[color:var(--color-border)]">
              {/* First one open, so the pattern is visible without a click. */}
              <details className="group" open={i === 0}>
                <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-md font-semibold text-text marker:content-none">
                  {faq.question}
                  <span
                    aria-hidden
                    className="shrink-0 font-mono text-lg text-muted group-open:hidden"
                  >
                    +
                  </span>
                  <span
                    aria-hidden
                    className="hidden shrink-0 font-mono text-lg text-muted group-open:block"
                  >
                    -
                  </span>
                </summary>
                <p className="pb-6 pr-10 text-base text-muted">{faq.answer}</p>
              </details>
            </li>
          ))}
          </ul>
        </div>
      </Section>
  );
}

export function CtaBlock() {
  return (
      <section className="relative isolate overflow-hidden py-12 md:py-16">
        <Container className="above-orbs">
          {/* Reported as "not centred and very big", and measurement showed it
              was already centred to the pixel -- 126px of gutter on each side
              at 1440. Two other things were doing the work.

              The panel ran the full 1188px container while the copy was capped
              at 24ch, so most of it was empty gradient: it read as a slab, not
              a card. It is capped at 880px now, near the width of its own
              content, and the vertical padding comes down with it.

              And `.brand-gradient` is a 135deg ramp, so its bright end sat in
              the top-left corner while the text sat in the middle. Centred
              copy on an off-centre ground reads as off-centre copy. The radial
              variant anchors the light stop on the text instead. */}
          <div className="brand-gradient-radial mx-auto max-w-[880px] rounded-lg px-9 py-12 text-center text-on-brand md:px-12 md:py-16">
            <h2 className="mx-auto max-w-[24ch] text-2xl font-bold">
              Bring a goal. Leave with an architecture and a timeline.
            </h2>
            <p className="mx-auto mt-5 max-w-[56ch] text-md">
              Thirty minutes, no pitch deck. If we are not the right fit, we will say so on the call.
            </p>
            {/* The caption sits under the button, not beside it. Laid out as a
                row the pair centres as a group, which leaves the button itself
                visibly left of centre — the exact thing this block is meant to
                fix. */}
            <div className="mt-9 flex flex-col items-center gap-3">
              <Button
                href={PRIMARY_CTA.href}
                size="lg"
                className="bg-on-brand text-brand hover:brightness-100"
              >
                {PRIMARY_CTA.label}
              </Button>
              <span className="font-mono text-xs">30 min, no deck</span>
            </div>
          </div>
        </Container>
      </section>
  );
}

/**
 * Both halves, for the three pages that want them. Kept as a named export
 * so those call sites read as intent rather than as two adjacent imports.
 */
export function FaqCta() {
  return (
    <>
      <Faq />
      <CtaBlock />
    </>
  );
}
