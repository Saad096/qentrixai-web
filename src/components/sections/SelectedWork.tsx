/**
 * Promoted from position 12 to position 2. Each card carries a metric slot
 * that stays empty until the owner supplies real figures -- no placeholder
 * numbers ship (copy deck section 5).
 */
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { caseStudies } from "@/data/caseStudies";

const HOME_SLUGS = [
  "multi-agent-ai-platform",
  "enterprise-document-intelligence",
  "voice-recruitment-automation",
];

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
      className="rule"
    >
      <ul className="mt-12 grid gap-px overflow-hidden rounded-md bg-[color:var(--color-border)] md:grid-cols-3">
        {shown.map((study, i) => (
          <li key={study.slug} className="bg-bg">
            <div data-reveal data-reveal-delay={i * 70}>
              <Link
                href={`/case-studies/${study.slug}`}
                className="flex h-full flex-col gap-4 p-7 transition-colors hover:bg-surface"
              >
                <span className="font-mono text-xs text-link">{study.category}</span>
                <h3 className="text-lg font-semibold text-text">{study.title}</h3>
                <p className="text-base text-muted">{study.problem}</p>
                {study.metric ? (
                  <p className="mt-auto pt-3">
                    <span className="block text-2xl font-bold text-text">{study.metric.value}</span>
                    <span className="mt-1 block font-mono text-xs text-muted">
                      {study.metric.label}
                    </span>
                  </p>
                ) : (
                  <p className="mt-auto pt-3 text-base text-muted">{study.outcome}</p>
                )}
              </Link>
            </div>
          </li>
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
