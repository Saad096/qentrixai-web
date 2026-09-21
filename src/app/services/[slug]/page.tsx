import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ModelRadar } from "@/components/sections/ModelRadar";
import { Button } from "@/components/ui/Button";
import { Illustration } from "@/components/ui/Illustration";
import { services } from "@/data/services";
import { SERVICE_ART } from "@/data/illustrations";
import { caseStudies } from "@/data/caseStudies";
import { PRIMARY_CTA } from "@/data/navigation";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const s = services.find((x) => x.slug === slug);
  if (!s) return buildMetadata({ title: "Capability not found", path: `/services/${slug}` });
  return buildMetadata({ title: s.title, description: s.description, path: `/services/${s.slug}` });
}

export default async function ServiceDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const service = services.find((s) => s.slug === slug);
  if (!service) notFound();

  const art = SERVICE_ART[service.slug];

  // Case studies that share this capability's category wording.
  const related = caseStudies.filter((c) =>
    service.technologies.some((t) => c.stack.includes(t))
  );

  return (
    <>
      <script id="ld-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            serviceJsonLd({
              title: service.title,
              description: service.description,
              slug: service.slug,
            })
          ),
        }}
      />
      <script id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "What we build", path: "/services" },
              { name: service.title, path: `/services/${service.slug}` },
            ])
          ),
        }}
      />

      {/* Two columns. The page was a single left-hand text column with the
          whole right half of the viewport empty from the masthead down, which
          is what made fourteen capability pages read as one wall of prose.
          The illustration fills it and gives each capability a face. */}
      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Link
                href="/services"
                className="inline-flex min-h-[44px] items-center font-mono text-xs text-muted hover:text-text"
              >
                What we build
              </Link>
              <h1 className="mt-3 max-w-[18ch] text-3xl font-bold text-text">{service.title}</h1>
              <p className="mt-6 max-w-measure text-md text-muted">{service.description}</p>
              <div className="mt-9">
                <Button href={PRIMARY_CTA.href} size="lg">
                  {PRIMARY_CTA.label}
                </Button>
              </div>
            </div>

            {art ? (
              <div className="lg:col-span-5">
                <Illustration
                  src={art}
                  ratio="aspect-[4/3]"
                  className="rounded-lg shadow-2"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  priority
                />
              </div>
            ) : null}
          </div>
        </Container>
      </section>

      <Section heading="What you get" className="rule">
        <ul className="mt-9 max-w-measure">
          {service.outcomes.map((o) => (
            <li
              key={o}
              className="border-t border-[color:var(--color-border)] py-5 text-md text-text"
            >
              {o}
            </li>
          ))}
        </ul>
      </Section>

      <Section heading="How we build it" className="rule">
        <ul className="mt-9 max-w-measure space-y-4">
          {service.bullets.map((b) => (
            <li key={b} className="flex gap-4 text-base text-muted">
              <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
              {b}
            </li>
          ))}
        </ul>
        <p className="mt-10 font-mono text-xs text-muted">Tools we reach for</p>
        <ul className="mt-3 flex flex-wrap gap-2">
          {service.technologies.map((t) => (
            <li
              key={t}
              className="rounded-full border border-[color:var(--color-border)] px-3.5 py-1.5 font-mono text-xs text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </Section>

      {related.length > 0 && (
        <Section heading="Where we have shipped this" className="rule">
          <ul className="mt-9 max-w-measure">
            {related.slice(0, 3).map((c) => (
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
      )}
      {service.slug === "inference-engineering" && <ModelRadar />}
    </>
  );
}
