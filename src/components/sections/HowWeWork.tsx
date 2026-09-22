/**
 * Six steps collapse to four. Integrate and Deploy fold into Run; Monitor &
 * improve becomes Run's last clause. No facts are lost.
 *
 * Numbered because it genuinely is a sequence -- the one case where numbered
 * markers earn their place.
 */
import { Activity, Hammer, PenTool, Target } from "lucide-react";
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
};

export function HowWeWork() {
  return (
    <Section
      id="how-we-work"
      eyebrow="How we work"
      heading="Four phases, and what you own after each one."
      lede="Every phase ends with an artifact in your repo, not a status call."
      ground="base"
    >
      {/* Pinned progression (motion plan D). The wrapper holds still for
          about a viewport while the active phase advances 1 -> 4; the
          heading above it scrolls away as normal. Desktop only -- pinning on
          a phone fights the browser's own scroll, which is the usual way
          this pattern goes wrong. */}
      <div data-pin-sequence>
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
        {phases.map((p) => (
          <Card as="li" key={p.step} data-pin-step className="pin-step">
            {/* No data-reveal here. Inside the pin the reveal trigger never
                fires -- a pinned element stops satisfying "top 88%" -- so the
                cards stayed at opacity 0 for the whole sequence. The pin owns
                their appearance. */}
            <div className="flex h-full flex-col gap-4 p-7">
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
              <h3 className="text-lg font-semibold text-text">{p.title}</h3>
              {/* Both paragraphs take `text` rather than one taking `muted`.
                  Two colours inside one short card read as an inconsistency
                  rather than a hierarchy, which is how it was reported.
                  Weight carries the difference instead. */}
              <p className="text-base font-medium text-text">{p.body}</p>
              <p className="text-base text-text">{p.detail}</p>
              {/* The most valuable sentence on the card, so it stops looking
                  like a footnote. */}
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
