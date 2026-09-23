import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { testimonials } from "@/data/testimonials";
import { gridCols } from "@/lib/grid";

/**
 * Quote cards. Anything still carrying `placeholder` renders with a visible
 * chip, so invented words cannot reach production looking like a client
 * said them -- which is exactly what happened here before.
 */
export function Testimonials() {
  // Nothing renders until at least one quote is real. The flagged chip was
  // honest but it put "Placeholder" and "Sample attribution" in front of a
  // buyer, which reads as an unfinished site rather than as candour. The
  // section reappears by itself the moment a `placeholder` flag comes off.
  const real = testimonials.filter((t) => !t.placeholder);
  if (real.length === 0) return null;

  return (
    <Section
      eyebrow="What clients say"
      heading="In their words."
      ground="base"
    >
      <ul className={`mt-12 grid gap-5 ${gridCols(real.length)}`}>
        {real.map((t, i) => (
          <Card as="li" key={t.quote}>
            <figure data-reveal data-reveal-delay={i * 70} className="flex h-full flex-col gap-5 p-7">
              {t.placeholder && (
                <span className="inline-flex w-fit items-center rounded-full border border-[color:var(--color-border)] px-2.5 py-1 font-mono text-xs text-muted">
                  Placeholder
                </span>
              )}
              <blockquote className="text-md text-text">{t.quote}</blockquote>
              <figcaption className="mt-auto border-t border-[color:var(--color-border)] pt-4">
                <span className="block text-base font-semibold text-text">{t.author}</span>
                <span className="mt-0.5 block font-mono text-xs text-muted">{t.role}</span>
              </figcaption>
            </figure>
          </Card>
        ))}
      </ul>
    </Section>
  );
}
