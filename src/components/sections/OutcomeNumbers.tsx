import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { outcomeMetrics } from "@/data/testimonials";

/**
 * The metrics band the reference runs as "real numbers from client work".
 *
 * Two of ours are real and traceable to a case study. The other two show an
 * em dash and a "Placeholder" chip rather than a number, because a made-up
 * outcome figure is the one claim a buyer will check hardest.
 */
export function OutcomeNumbers() {
  return (
    <Section
      eyebrow="Measured, not claimed"
      heading="Numbers from the work."
      lede="Each one traces to a case study on this site. Where we cannot publish a figure yet, the card says so rather than inventing one."
      ground="band"
      headerClassName="mx-auto text-center"
    >
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {outcomeMetrics.map((m, i) => (
          <Card as="li" key={m.label}>
            <div data-reveal data-reveal-delay={i * 60} className="flex h-full flex-col gap-3 p-7">
              <span className="text-3xl font-bold leading-none text-text">{m.value}</span>
              <span className="text-base text-text">{m.label}</span>
              <span className="mt-auto pt-4 font-mono text-xs text-muted">{m.context}</span>
              {m.placeholder && (
                <span className="inline-flex w-fit items-center rounded-full border border-[color:var(--color-border)] px-2.5 py-1 font-mono text-xs text-muted">
                  Awaiting the measured figure
                </span>
              )}
            </div>
          </Card>
        ))}
      </ul>
    </Section>
  );
}
