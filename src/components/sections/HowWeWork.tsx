/**
 * Six steps collapse to four. Integrate and Deploy fold into Run; Monitor &
 * improve becomes Run's last clause. No facts are lost.
 *
 * Numbered because it genuinely is a sequence -- the one case where numbered
 * markers earn their place.
 */
import { Activity, Hammer, LineChart, PenTool, Target } from "lucide-react";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/utils";
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
      <ol className="mt-11 grid gap-4 lg:grid-cols-2">
        {phases.map((p, i) => (
          <Card
            as="li"
            key={p.step}
            data-pin-step
            /* An odd count leaves the last cell of a two-column grid empty.
               The last phase takes the whole row instead -- which suits
               Monitor, since it is the one most engagements skip and the one
               that decides whether the thing still works in six months. */
            className={cn(
              "pin-step",
              i === phases.length - 1 && phases.length % 2 === 1 && "lg:col-span-2"
            )}
          >
            {/* No data-reveal here. Inside the pin the reveal trigger never
                fires -- a pinned element stops satisfying "top 88%" -- so the
                cards stayed at opacity 0 for the whole sequence. The pin owns
                their appearance. */}
            {/* Two per row, so five phases are two screens of reading rather
                than five full-width bands. At half the container the earlier
                three-column split gave each column about 330px, which is not
                a column, so the card stacks: mark and number on one line,
                then the title, then the body, then what you own. */}
            <div className="flex h-full flex-col gap-4 p-6 md:p-7">
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
                <h3 className="text-lg font-semibold text-text">{p.title}</h3>
              </span>

              {/* Both paragraphs take `text` rather than one taking `muted`.
                  Two colours inside one short card read as an inconsistency
                  rather than a hierarchy, which is how it was reported.
                  Weight carries the difference instead. */}
              <p className="text-base font-medium text-text">{p.body}</p>
              <p className="text-base text-text">{p.detail}</p>

              {/* The most valuable sentence on the card, so it stops looking
                  like a footnote. mt-auto pins it to the bottom edge so the
                  pair in a row line up whatever length the body runs to. */}
              <p className="mt-auto border-t border-[color:var(--color-border)] pt-4">
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
