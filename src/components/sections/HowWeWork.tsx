/**
 * Six steps collapse to four. Integrate and Deploy fold into Run; Monitor &
 * improve becomes Run's last clause. No facts are lost.
 *
 * Numbered because it genuinely is a sequence -- the one case where numbered
 * markers earn their place.
 */
import { Section } from "@/components/ui/Section";
import { phases } from "@/data/company";

export function HowWeWork() {
  return (
    <Section
      id="how-we-work"
      eyebrow="How we work"
      heading="Four phases, and what you own after each one."
      lede="Every phase ends with an artifact in your repo, not a status call."
      className="rule"
    >
      <ol className="mt-12 grid gap-px overflow-hidden rounded-md bg-[color:var(--color-border)] md:grid-cols-2 xl:grid-cols-4">
        {phases.map((p, i) => (
          <li key={p.step} className="bg-bg">
            <div data-reveal data-reveal-delay={i * 60} className="flex h-full flex-col gap-4 p-7">
              <span className="font-mono text-xs text-link">{p.step}</span>
              <h3 className="text-lg font-semibold text-text">{p.title}</h3>
              <p className="text-base text-muted">{p.body}</p>
              <p className="mt-auto border-t border-[color:var(--color-border)] pt-4 text-base text-text">
                <span className="font-mono text-xs text-muted">You own </span>
                {p.artifact}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </Section>
  );
}
