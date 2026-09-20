/**
 * Native <details> rather than a JS accordion: it is keyboard accessible and
 * screen-reader correct for free, and it costs no client JavaScript.
 */
import { Section } from "@/components/ui/Section";
import { Container } from "@/components/ui/Container";
import { OrbField } from "@/components/ui/OrbField";
import { Button } from "@/components/ui/Button";
import { faqs } from "@/data/faqs";
import { PRIMARY_CTA } from "@/data/navigation";

export function FaqCta() {
  return (
    <>
      {/* Two columns rather than one.
          The accordion was capped at `max-w-measure` and left-aligned, which
          left the entire right half of the section empty — on /contact that
          dead space is most of the page. The heading and a standing offer to
          just ask now hold the left column, the questions fill the right. */}
      <Section id="faq" ground="band">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-5" data-reveal>
            <p className="mb-4 font-mono text-xs text-muted">Before the call</p>
            <h2 className="text-3xl font-bold text-text">Questions buyers actually ask.</h2>
            <p className="mt-5 text-md text-muted">
              If yours is not here, ask it on the call. We answer scoping and architecture
              questions before there is a contract.
            </p>
            <div className="mt-8 rounded-md bg-surface p-7 shadow-1">
              <p className="text-base text-muted">
                Thirty minutes, no pitch deck. If we are not the right fit, we will say so.
              </p>
              <Button href={PRIMARY_CTA.href} size="lg" className="mt-5 w-full sm:w-auto">
                {PRIMARY_CTA.label}
              </Button>
            </div>
          </div>

          <ul className="lg:col-span-7">
          {faqs.map((faq) => (
            <li key={faq.question} className="border-t border-[color:var(--color-border)]">
              <details className="group">
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

      <section className="relative isolate overflow-hidden pb-24 md:pb-32">
        <OrbField />
        <Container className="above-orbs">
          {/* Centred. The card is geometrically centred on the page and always
              was, but its contents sat hard left with the whole right half
              empty, which is what read as "not centred". A final CTA is the
              one block on the page with a single message and a single action,
              so centring it is also the right call typographically. */}
          <div className="rounded-lg bg-brand px-9 py-14 text-center text-on-brand md:px-14 md:py-20">
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
    </>
  );
}
