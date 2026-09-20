import { Boxes, GaugeCircle, UserCheck } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { pillars } from "@/data/company";

/**
 * The three pillars were bare text in three columns — the emptiest block on
 * the page. They sit on cards now, each with a mark.
 *
 * Mapped by title rather than stored on the data, because the icon is a
 * presentation decision: adding one to `company.ts` would make the content
 * file depend on the icon library.
 *
 * Not numbered. These are three reasons, not a sequence, and DESIGN.md bans
 * 01/02/03 markers on content that is not ordered.
 */
const MARKS: Record<string, typeof Boxes> = {
  "Production discipline": GaugeCircle,
  "We operate our own products": Boxes,
  "Senior-only delivery": UserCheck,
};

export function WhyUs() {
  return (
    <Section eyebrow="Why QentrixAI" heading="Three reasons, and the receipts for each." ground="band">
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {pillars.map((p, i) => {
          const Mark = MARKS[p.title] ?? GaugeCircle;
          return (
            <Card as="li" key={p.title}>
              <div data-reveal data-reveal-delay={i * 70} className="flex h-full flex-col p-7">
                <span
                  className="mb-6 grid size-11 place-items-center rounded-full bg-brand/12 text-link"
                  aria-hidden="true"
                >
                  <Mark className="size-5" />
                </span>
                <h3 className="text-lg font-semibold text-text">{p.title}</h3>
                <p className="mt-3 text-base text-muted">{p.body}</p>
                <p className="mt-auto pt-5 font-mono text-xs text-muted">
                  {p.proofHref ? (
                    <Link
                      href={p.proofHref}
                      className="inline-flex min-h-[44px] items-center text-link hover:brightness-110"
                    >
                      {p.proof}
                    </Link>
                  ) : (
                    p.proof
                  )}
                </p>
              </div>
            </Card>
          );
        })}
      </ul>
    </Section>
  );
}
