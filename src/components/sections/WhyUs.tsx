import { Boxes, Clock4, Globe2, Rocket, ShieldCheck, UserCheck } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { reasons } from "@/data/company";

/**
 * Six reasons on a divided grid, 2026-09-21, replacing three pillar cards.
 *
 * Cards were the wrong container here. Six of them in a row would be the
 * "three identical rounded cards" tell that DESIGN.md bans, and the content
 * -- a title and one line -- is too light to justify an object with its own
 * elevation. Hairline rules give the same grouping for none of the weight,
 * and they are what the reference layout uses.
 *
 * The icon is mapped by title rather than stored on the data, because it is a
 * presentation decision: putting it in `company.ts` would make the content
 * file depend on the icon library.
 *
 * Not numbered. These are six reasons, not a sequence, and DESIGN.md bans
 * 01/02/03 markers on content that is not ordered.
 */
const MARKS: Record<string, typeof Boxes> = {
  "Senior-only delivery": UserCheck,
  "We run our own products": Boxes,
  "Evals before launch": ShieldCheck,
  "25+ systems shipped": Rocket,
  "12 client geographies": Globe2,
  "Six weeks to an MVP": Clock4,
};

export function WhyUs() {
  return (
    <Section
      eyebrow="Why QentrixAI"
      heading="Six reasons, and the receipts for each."
      ground="band"
      headerClassName="mx-auto text-center"
    >
      {/* The rules are drawn per cell rather than by a `gap-px` grid over a
          background, so they stop at the grid edge instead of bleeding past
          it. The column count changes at every breakpoint, so which cells sit
          on an inner edge changes too -- `edges` works that out per index.

          It emits at most one border utility per side per breakpoint. Writing
          it the obvious way (always `border-t`, then `sm:border-t-0` to undo)
          puts two conflicting widths on the same element at the same
          breakpoint, and which one wins is down to Tailwind's output order,
          not the order they are written in. */}
      <ul className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r, i) => {
          const Mark = MARKS[r.title] ?? ShieldCheck;
          const edges = [
            // Top rule: every cell below the first row, at 1 / 2 / 3 columns.
            i >= 1 && "border-t",
            i === 1 && "sm:border-t-0",
            i === 2 && "lg:border-t-0",
            // Left rule: every cell right of the first column.
            i % 2 === 1 && "sm:border-l",
            i % 2 === 1 && i % 3 === 0 && "lg:border-l-0",
            i % 2 === 0 && i % 3 !== 0 && "lg:border-l",
          ]
            .filter(Boolean)
            .join(" ");
          const body = (
            <>
              <span
                className="mx-auto mb-6 grid size-12 place-items-center rounded-lg bg-brand/12 text-link ring-1 ring-brand/20"
                aria-hidden="true"
              >
                <Mark className="size-5" />
              </span>
              <span className="block text-lg font-semibold text-text">{r.title}</span>
              <span className="mt-3 block text-base text-muted">{r.line}</span>
            </>
          );

          return (
            <li key={r.title} className={`border-[color:var(--color-border)] ${edges}`}>
              <div data-reveal data-reveal-delay={i * 60} className="h-full px-7 py-10 text-center">
                {r.href ? (
                  <Link
                    href={r.href}
                    className="group block rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:rgb(var(--color-link))]"
                  >
                    {body}
                  </Link>
                ) : (
                  body
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
