import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { DomainFlow } from "@/components/art/DomainFlow";
import { CtaBlock } from "@/components/sections/FaqCta";
import { Section } from "@/components/ui/Section";
import { caseStudyDetail } from "@/data/caseStudyDetail";
import { caseStudies } from "@/data/caseStudies";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";
import { gridCols } from "@/lib/grid";

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

  const detail = caseStudyDetail[study.slug];

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
          <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Breadcrumb
                trail={[
                  { name: "Home", href: "/" },
                  { name: "Case studies", href: "/case-studies" },
                  { name: study.category },
                ]}
              />
              <h1 className="mt-4 max-w-[20ch] text-3xl font-bold text-text">{study.title}</h1>
              <p className="mt-4 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                {study.category} · {study.client}
              </p>
              {detail && <p className="mt-7 max-w-measure text-md text-text-2">{detail.context}</p>}

              {study.metric && (
                <div className="slab-fill mt-9 rounded-lg bg-brand p-7 text-on-brand">
                  <span className="block text-3xl font-bold leading-none">{study.metric.value}</span>
                  <span className="mt-3 block max-w-[34ch] text-base">{study.metric.label}</span>
                </div>
              )}
            </div>

            {/* The illustration that used to sit here was a 21:9 panel with
                a small drawing centred in it, and it measured 782px of blank
                on this route. A drawn pipeline of the actual architecture is
                denser, themes correctly, and says something. These
                engagements are under NDA so there is no screenshot to show;
                this does not pretend to be one. */}
            {detail && (
              <div className="lg:col-span-6">
                <DomainFlow stages={detail.flow} className="shadow-2" />
                <p className="mt-3 text-xs text-muted">
                  The shape of the system, drawn. Not a screenshot: this engagement is under NDA.
                </p>
              </div>
            )}
          </div>
        </Container>
      </section>

      <Section eyebrow="The problem" heading="What they were living with." ground="band">
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <p className="text-md text-text-2 lg:col-span-6">{study.problem}</p>
          {detail && (
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                What made it hard
              </p>
              <ul className="mt-4 space-y-4">
                {detail.constraints.map((c) => (
                  <li key={c} className="flex gap-3 text-base text-text-2">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                    {c}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </Section>

      <Section eyebrow="What we built" heading="And what it runs on." ground="base">
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <p className="text-md text-text-2 lg:col-span-7">{study.solution}</p>
          <div className="lg:col-span-5">
            <Card>
              <div className="p-7">
                <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">Stack</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {study.stack.map((t) => (
                    <li
                      key={t}
                      className="rounded-full border border-[color:var(--color-border)] px-3.5 py-1.5 font-mono text-xs text-text-2"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </Card>
          </div>
        </div>
      </Section>

      {detail && (
        <Section
          eyebrow="Decisions"
          heading="What we chose, and what we turned down."
          lede="The rejected option is the useful half. A decision with no alternative recorded is a preference."
          ground="band"
        >
          <ol className={`mt-12 grid gap-5 ${gridCols(detail.decisions.length)}`}>
            {detail.decisions.map((d, i) => (
              <Card as="li" key={d.choice}>
                <div data-reveal data-reveal-delay={i * 60} className="flex h-full flex-col gap-3 p-7">
                  <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-md font-semibold text-text">{d.choice}</h3>
                  <p className="text-base text-text-2">{d.why}</p>
                  <p className="mt-auto border-t border-[color:var(--color-border)] pt-4 text-base text-text-2">
                    <span className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                      Instead of{" "}
                    </span>
                    {d.rejected}
                  </p>
                </div>
              </Card>
            ))}
          </ol>
        </Section>
      )}

      <Section eyebrow="What changed" heading="The outcome." ground="base">
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
          <p className="text-md text-text-2 lg:col-span-6">{study.outcome}</p>
          {detail && (
            <div className="lg:col-span-6">
              <p className="text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                What carries instrumentation
              </p>
              <ul className="mt-4 space-y-3">
                {detail.measured.map((m) => (
                  <li
                    key={m}
                    className="border-t border-[color:var(--color-border)] py-3 text-base text-text-2"
                  >
                    {m}
                  </li>
                ))}
              </ul>
              {!study.metric && (
                <p className="mt-6 text-base text-muted">
                  The figures these produced are the client&rsquo;s to publish, and they have not.
                  Rather than round something up, this page says what we measured and stops.
                </p>
              )}
            </div>
          )}
        </div>

      </Section>

      <Section eyebrow="More work" heading="Other engagements." ground="band">
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
      <CtaBlock />
    </>
  );
}
