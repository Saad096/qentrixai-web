import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { caseStudies } from "@/data/caseStudies";
import { PRIMARY_CTA } from "@/data/navigation";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return caseStudies.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const c = caseStudies.find((x) => x.slug === slug);
  if (!c) return buildMetadata({ title: "Case study not found", path: `/case-studies/${slug}` });
  return buildMetadata({
    title: c.title,
    description: c.problem,
    path: `/case-studies/${c.slug}`,
  });
}

export default async function CaseStudyDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const study = caseStudies.find((c) => c.slug === slug);
  if (!study) notFound();

  const others = caseStudies.filter((c) => c.slug !== study.slug).slice(0, 3);

  return (
    <>
      <script id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Case studies", path: "/case-studies" },
              { name: study.title, path: `/case-studies/${study.slug}` },
            ])
          ),
        }}
      />

      <section className="py-16 md:py-24">
        <Container>
          <Link
            href="/case-studies"
            className="inline-flex min-h-[44px] items-center font-mono text-xs text-muted hover:text-text"
          >
            Case studies
          </Link>
          <h1 className="mt-3 max-w-[20ch] text-3xl font-bold text-text">{study.title}</h1>
          <p className="mt-5 font-mono text-xs text-muted">
            {study.category} — {study.client}
          </p>

          {study.metric && (
            <div className="slab-fill mt-11 rounded-lg bg-brand p-8 text-on-brand md:p-10">
              <span className="block text-3xl font-bold leading-none">{study.metric.value}</span>
              <span className="mt-3 block max-w-[34ch] font-mono text-xs">{study.metric.label}</span>
            </div>
          )}
        </Container>
      </section>

      <Section heading="The problem" className="rule">
        <p className="mt-6 max-w-measure text-md text-muted">{study.problem}</p>
      </Section>

      <Section heading="What we built" className="rule">
        <p className="mt-6 max-w-measure text-md text-muted">{study.solution}</p>
        <p className="mt-10 font-mono text-xs text-muted">Stack</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {study.stack.map((t) => (
            <li
              key={t}
              className="rounded-full border border-[color:var(--color-border)] px-3.5 py-1.5 font-mono text-xs text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </Section>

      <Section heading="What changed" className="rule">
        <p className="mt-6 max-w-measure text-md text-muted">{study.outcome}</p>
        <div className="mt-10">
          <Button href={PRIMARY_CTA.href} size="lg">
            {PRIMARY_CTA.label}
          </Button>
        </div>
      </Section>

      <Section heading="More work" className="rule">
        <ul className="mt-8 max-w-measure">
          {others.map((c) => (
            <li key={c.slug} className="border-t border-[color:var(--color-border)]">
              <Link
                href={`/case-studies/${c.slug}`}
                className="flex min-h-[72px] flex-col justify-center py-4 hover:text-link"
              >
                <span className="text-md font-semibold text-text">{c.title}</span>
                <span className="mt-1 font-mono text-xs text-muted">{c.client}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
