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
      <Section id="faq" eyebrow="Before the call" heading="Questions buyers actually ask." ground="band">
        <ul className="mt-11 max-w-measure">
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
      </Section>

      <section className="relative isolate overflow-hidden pb-24 md:pb-32">
        <OrbField />
        <Container className="above-orbs">
          <div className="rounded-lg bg-brand p-9 text-on-brand md:p-14">
            <h2 className="max-w-[20ch] text-2xl font-bold">
              Bring a goal. Leave with an architecture and a timeline.
            </h2>
            <p className="mt-4 max-w-measure text-md">
              Thirty minutes, no pitch deck. If we are not the right fit, we will say so on the call.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
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
