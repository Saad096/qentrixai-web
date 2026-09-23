/**
 * Six steps collapse to four. Integrate and Deploy fold into Run; Monitor &
 * improve becomes Run's last clause. No facts are lost.
 *
 * Numbered because it genuinely is a sequence -- the one case where numbered
 * markers earn their place.
 */
import { Activity, Hammer, LineChart, PenTool, Target } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { phases } from "@/data/company";

/**
 * A mark per phase. Keyed by title so `company.ts` stays free of any
 * dependency on the icon set.
 */
const MARKS: Record<string, typeof Target> = {
  Frame: Target,
  Design: PenTool,
  Build: Hammer,
  Run: Activity,
  Monitor: LineChart,
};

export function HowWeWork() {
  return (
    <Section
      id="how-we-work"
      eyebrow="How we work"
      heading={`${phases.length} phases, and what you own after each one.`}
      lede="Every phase ends with an artifact in your repo, not a status call."
      ground="base"
    >
      {/* Pinned progression (motion plan D). The wrapper holds still for
          about a viewport while the active phase advances 1 -> 5; the
          heading above it scrolls away as normal. Desktop only -- pinning on
          a phone fights the browser's own scroll, which is the usual way
          this pattern goes wrong. */}
      <div data-pin-sequence>
      {/* Five rows, not five columns. As a 5-across grid each card was a
          narrow 400px-tall strip of stacked paragraphs, and the owner read
          the set as lengthy and out of step with every other card on the
          page. A phase is a stage in a sequence with three parts -- what it
          is, what happens, what you walk away with -- and those are three
          columns of one row, not three rows of one column.

          The separate horizontal progress rail is gone with it: it spanned
          a row that no longer exists. Progression is carried by the accent
          bar on the active row, which pin-step::before already draws. */}
      <ol className="mt-11 grid gap-4">
        {phases.map((p) => (
          <Card as="li" key={p.step} data-pin-step className="pin-step">
            {/* No data-reveal here. Inside the pin the reveal trigger never
                fires -- a pinned element stops satisfying "top 88%" -- so the
                cards stayed at opacity 0 for the whole sequence. The pin owns
                their appearance. */}
            <div className="grid gap-x-8 gap-y-5 p-6 md:p-7 lg:grid-cols-12 lg:items-start">
              <div className="lg:col-span-2">
                <span className="flex items-center gap-3">
                  <span
                    className="grid size-10 shrink-0 place-items-center rounded-full bg-brand/12 text-link"
                    aria-hidden="true"
                  >
                    {(() => {
                      const Mark = MARKS[p.title] ?? Target;
                      return <Mark className="size-[18px]" />;
                    })()}
                  </span>
                  <span className="font-mono text-xs text-link">{p.step}</span>
                </span>
                <h3 className="mt-4 text-lg font-semibold text-text">{p.title}</h3>
              </div>

              {/* Both paragraphs take `text` rather than one taking `muted`.
                  Two colours inside one short card read as an inconsistency
                  rather than a hierarchy, which is how it was reported.
                  Weight carries the difference instead. */}
              <div className="lg:col-span-7">
                <p className="text-base font-medium text-text">{p.body}</p>
                <p className="mt-3 text-base text-text">{p.detail}</p>
              </div>

              {/* The most valuable sentence on the card, so it stops looking
                  like a footnote. Its own column on wide screens, and the
                  rule turns horizontal below the breakpoint where the row
                  stacks. */}
              <p className="border-t border-[color:var(--color-border)] pt-4 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
                <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-muted">
                  You own
                </span>
                <span className="mt-1.5 block text-base font-semibold text-link">{p.artifact}</span>
              </p>
            </div>
          </Card>
        ))}
      </ol>
      </div>
    </Section>
  );
}
