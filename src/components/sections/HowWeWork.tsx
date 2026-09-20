/**
 * Six steps collapse to four. Integrate and Deploy fold into Run; Monitor &
 * improve becomes Run's last clause. No facts are lost.
 *
 * Numbered because it genuinely is a sequence -- the one case where numbered
 * markers earn their place.
 */
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { phases } from "@/data/company";

export function HowWeWork() {
  return (
    <Section
      id="how-we-work"
      eyebrow="How we work"
      heading="Four phases, and what you own after each one."
      lede="Every phase ends with an artifact in your repo, not a status call."
      ground="base"
    >
      {/* The line only reads as a sequence when the four phases sit on one
          row, so it is desktop-only rather than shown and meaningless. */}
      <div className="relative mt-12 hidden h-px bg-[color:var(--color-border)] xl:block">
        <span
          data-progress-line
          aria-hidden="true"
          className="absolute inset-0 origin-left bg-brand"
        />
      </div>

      <ol className="mt-5 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {phases.map((p, i) => (
          <Card as="li" key={p.step}>
            <div data-reveal data-reveal-delay={i * 60} className="flex h-full flex-col gap-4 p-7">
              <span className="font-mono text-xs text-link">{p.step}</span>
              <h3 className="text-lg font-semibold text-text">{p.title}</h3>
              <p className="text-base text-muted">{p.body}</p>
              <p className="mt-auto border-t border-[color:var(--color-border)] pt-4 text-base text-text">
                <span className="font-mono text-xs text-muted">You own </span>
                {p.artifact}
              </p>
            </div>
          </Card>
        ))}
      </ol>
    </Section>
  );
}
