import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { outcomeMetrics } from "@/data/testimonials";

/**
 * The metrics band the reference runs as "real numbers from client work".
 *
 * Two of ours are real and traceable to a case study. The other two used to
 * render an em dash and an "Awaiting the measured figure" chip in a row of
 * four, and a review made the obvious point: two empty cards out of four
 * does not read as candour, it reads as having nothing. Same honesty, less
 * self-harm -- the measured numbers get the grid, the unmeasured ones get
 * one line of prose underneath naming what is still outstanding.
 *
 * Both lists come from the same array, so a figure arriving moves itself
 * from the footnote into the grid.
 */
export function OutcomeNumbers() {
  const measured = outcomeMetrics.filter((m) => !m.placeholder);
  const pending = outcomeMetrics.filter((m) => m.placeholder);
  if (measured.length === 0) return null;

  return (
    <Section
      eyebrow="Measured, not claimed"
      heading="Numbers from the work."
      lede="Each one traces to a case study on this site."
      ground="band"
    >
      <ul
        className={
          measured.length >= 3
            ? "mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3"
            : "mt-12 grid gap-5 sm:grid-cols-2"
        }
      >
        {measured.map((m, i) => (
          <Card as="li" key={m.label}>
            <div data-reveal data-reveal-delay={i * 60} className="flex h-full flex-col gap-3 p-7">
              <span className="text-3xl font-bold leading-none text-text">{m.value}</span>
              <span className="text-base text-text">{m.label}</span>
              <span className="mt-auto pt-4 font-mono text-xs text-muted">{m.context}</span>
            </div>
          </Card>
        ))}
      </ul>

      {pending.length > 0 && (
        <p className="mt-8 max-w-measure text-base text-muted">
          {pending.length === 1 ? "One further engagement has" : `${pending.length} further engagements have`}{" "}
          a figure we have not published yet:{" "}
          {pending.map((m) => m.context).join(", ")}. It goes here once it is measured, not before.
        </p>
      )}
    </Section>
  );
}
