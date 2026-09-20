/**
 * Promoted from position 12 to position 2. Each card carries a metric slot
 * that stays empty until the owner supplies real figures -- no placeholder
 * numbers ship (copy deck section 5).
 */
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { caseStudies } from "@/data/caseStudies";

const HOME_SLUGS = [
  "multi-agent-ai-platform",
  "enterprise-document-intelligence",
  "voice-recruitment-automation",
];

/**
 * Only one of the three studies shown here has a published screenshot — the
 * rest are under NDA. Imaging one card and leaving two bare looks worse than
 * imaging none, so the others fall back to abstract art keyed by category.
 *
 * Abstract is the honest choice: it decorates without implying it is a
 * screenshot of the client's system. Never substitute another client's
 * interface here.
 */
const FALLBACK_ART: Record<string, string> = {
  "Agentic AI": "/images/abstract/system-cluster.png",
  RAG: "/images/abstract/glass-curve.jpg",
  "Voice AI": "/images/abstract/chrome-ribbons.jpg",
};
const DEFAULT_ART = "/images/abstract/violet-wave.jpg";

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
                <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-2">
                  <Image
                    src={study.cover || FALLBACK_ART[study.category] || DEFAULT_ART}
                    alt=""
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className="object-cover object-top"
                  />
                </div>

                <div className="flex flex-1 flex-col gap-4 p-7">
                <span className="font-mono text-xs text-link">{study.category}</span>
                <h3 className="text-lg font-semibold text-text">{study.title}</h3>
                <p className="text-base text-muted">{study.problem}</p>
                {study.metric ? (
                  <p className="mt-auto pt-5">
                    <span className="block text-3xl font-bold text-text">{study.metric.value}</span>
                    <span className="mt-1 block font-mono text-xs text-muted">
                      {study.metric.label}
                    </span>
                  </p>
                ) : (
                  <p className="mt-auto pt-5 text-base text-muted">{study.outcome}</p>
                )}
                </div>
              </Link>
            </div>
          </Card>
        ))}
      </ul>

      <p className="mt-9">
        <Link href="/case-studies" className="inline-flex min-h-[44px] items-center text-base font-semibold text-link hover:brightness-110">
          All six case studies
        </Link>
      </p>
    </Section>
  );
}
