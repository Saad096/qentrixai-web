/**
 * Promoted from position 12 to position 2. Each card carries a metric slot
 * that stays empty until the owner supplies real figures -- no placeholder
 * numbers ship (copy deck section 5).
 */
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { Illustration } from "@/components/ui/Illustration";
import { caseStudies } from "@/data/caseStudies";
import { CASE_ART } from "@/data/illustrations";
import { SectionCta } from "@/components/ui/SectionCta";

const HOME_SLUGS = [
  "multi-agent-ai-platform",
  "enterprise-document-intelligence",
  "voice-recruitment-automation",
];

/**
 * Thumbnails are the case study's unDraw illustration, not photography.
 *
 * Three abstract renders keyed by category used to fill these, and they said
 * nothing about the engagements -- one of them was a dark-only PNG that
 * disappeared on the light theme. The illustrations at least depict the shape
 * of the work.
 *
 * All three take the same treatment on purpose. One real screenshot beside
 * two illustration plates makes the row look half-finished, so the screenshot
 * we do have is not used here.
 *
 * Never substitute another client's interface here.
 */

export function SelectedWork() {
  const shown = HOME_SLUGS.map((slug) => caseStudies.find((c) => c.slug === slug)).filter(
    (c): c is (typeof caseStudies)[number] => Boolean(c)
  );

  return (
    <Section
      id="work"
      eyebrow="Selected work"
      heading="Six systems in production. Here are three."
      lede="Problem, what we built, what changed. Names are withheld where the contract says so."
      ground="band"
    >
      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {shown.map((study, i) => (
          <Card as="li" key={study.slug} interactive className="overflow-hidden">
            <div data-reveal data-reveal-delay={i * 70} className="h-full">
              <Link
                href={`/case-studies/${study.slug}`}
                className="flex h-full flex-col"
              >
                <Illustration
                  src={CASE_ART[study.slug]}
                  sizes="(min-width: 768px) 33vw, 100vw"
                />

                <div className="flex flex-1 flex-col gap-4 p-7">
                <span className="font-mono text-xs text-link">{study.category}</span>
                <h3 className="text-lg font-semibold text-text">{study.title}</h3>
                <p className="text-base text-text-2">{study.problem}</p>
                {/* No metric slot here. One of the three has a published
                    figure and two do not, so the row rendered at three
                    different heights and the two without read as the weak
                    ones. Inventing the other two is out, so none of them
                    leads with a number on this row -- the outcome line does
                    the work and the figure still leads its own page. */}
                <p className="mt-auto border-t border-[color:var(--color-border)] pt-5 text-base text-text-2">
                  {study.outcome}
                </p>
                </div>
              </Link>
            </div>
          </Card>
        ))}
      </ul>

      <SectionCta href="/case-studies">All six case studies</SectionCta>
    </Section>
  );
}
