import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { ModelRadar } from "@/components/sections/ModelRadar";
import { Button } from "@/components/ui/Button";
import { Illustration } from "@/components/ui/Illustration";
import { services, SERVICE_GROUPS } from "@/data/services";
import { serviceDetail } from "@/data/serviceDetail";
import { industries } from "@/data/industries";
import { industryDetail } from "@/data/industryDetail";
import { SERVICE_ART } from "@/data/illustrations";
import { caseStudies } from "@/data/caseStudies";
import { PRIMARY_CTA } from "@/data/navigation";
import { Card } from "@/components/ui/Card";
import { FaqCta } from "@/components/sections/FaqCta";
import { buildMetadata, serviceJsonLd, breadcrumbJsonLd, faqJsonLd } from "@/lib/seo";

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
  const detail = serviceDetail[service.slug];

  // Which domains name this capability. Generated, so a new industry that
  // lists it appears here without anyone remembering to add it.
  const domains = industries.filter((i) =>
    industryDetail[i.slug]?.services.includes(service.slug)
  );

  // Siblings in the same group, for somewhere to go that is not the index.
  const siblings = services
    .filter((s) => s.group === service.group && s.slug !== service.slug)
    .slice(0, 3);

  /**
   * Grounds alternate down the page, and two of the sections below are
   * conditional -- a capability with no matching case study and no industry
   * naming it renders six sections, one with both renders eight. Hard-coding
   * the grounds means those two pages get two `base` sections meeting, which
   * reads as one section with a hole in it.
   *
   * So the ground is taken in render order instead. The hero is `base`, so
   * the first Section takes `band`. FaqCta hard-codes `band` and always
   * closes the page, so the last section before it is pinned to `base`
   * rather than taking its turn.
   */
  let groundIndex = 0;
  const nextGround = (): "band" | "base" => (groundIndex++ % 2 === 0 ? "band" : "base");

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
      {detail && (
        <script
          id="ld-faq-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(detail.faqs)) }}
        />
      )}
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

      {detail && (
        <Section
          eyebrow="The problem"
          heading="What this is for."
          ground={nextGround()}
        >
          <div className="mt-10 grid gap-12 lg:grid-cols-12 lg:gap-14">
            <p className="text-md text-muted lg:col-span-7">{detail.problem}</p>
            <div className="lg:col-span-5">
              <p className="font-mono text-xs text-muted">You are probably here because</p>
              <ul className="mt-4 space-y-3">
                {detail.signals.map((sig) => (
                  <li key={sig} className="flex gap-3 text-base text-text">
                    <span aria-hidden className="mt-2.5 size-1.5 shrink-0 rounded-full bg-brand" />
                    {sig}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Section>
      )}

      <Section eyebrow="Deliverables" heading="What you get." ground={nextGround()}>
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

      {detail && (
        <Section eyebrow="The work" heading="Three stages, in this order." ground={nextGround()}>
          <ol className="mt-12 grid gap-5 md:grid-cols-3">
            {detail.stages.map((st, i) => (
              <Card as="li" key={st.title}>
                <div data-reveal data-reveal-delay={i * 60} className="flex h-full flex-col gap-3 p-7">
                  <span className="font-mono text-xs text-link">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-semibold text-text">{st.title}</h3>
                  <p className="text-base text-muted">{st.body}</p>
                </div>
              </Card>
            ))}
          </ol>
        </Section>
      )}

      <Section eyebrow="Specifics" heading="How we build it." ground={nextGround()}>
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
        <Section eyebrow="Evidence" heading="Where we have shipped this." ground={nextGround()}>
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

      {domains.length > 0 && (
        <Section
          eyebrow="Where it lands"
          heading="Domains that lean on this."
          lede="Generated from the industry pages, so this stays true as those change."
          ground={nextGround()}
        >
          <ul className="mt-10 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {domains.map((d, i) => (
              <Card as="li" key={d.slug} interactive>
                <Link
                  href={`/industries/${d.slug}`}
                  data-reveal
                  data-reveal-delay={i * 50}
                  className="flex h-full flex-col gap-3 p-7"
                >
                  <h3 className="text-lg font-semibold text-text">{d.name}</h3>
                  <p className="text-base text-muted">{d.line}</p>
                </Link>
              </Card>
            ))}
          </ul>
        </Section>
      )}

      {detail && (
        <Section ground={nextGround()}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-5" data-reveal>
              <p className="mb-4 font-mono text-xs text-muted">Before the call</p>
              <h2 className="text-3xl font-bold text-text">Two questions that always come up.</h2>
              <p className="mt-5 text-md text-muted">
                The general ones -- ownership, lock-in, run cost, residency -- are answered at the
                bottom of this page. These two are specific to this capability.
              </p>
            </div>
            <ul className="lg:col-span-7">
              {detail.faqs.map((f) => (
                <li key={f.question} className="border-t border-[color:var(--color-border)]">
                  <details className="group">
                    <summary className="flex min-h-[60px] cursor-pointer list-none items-center justify-between gap-6 py-4 text-md font-semibold text-text marker:content-none">
                      {f.question}
                      <span aria-hidden className="shrink-0 font-mono text-lg text-muted group-open:hidden">
                        +
                      </span>
                      <span aria-hidden className="hidden shrink-0 font-mono text-lg text-muted group-open:block">
                        -
                      </span>
                    </summary>
                    <p className="pb-6 pr-10 text-base text-muted">{f.answer}</p>
                  </details>
                </li>
              ))}
            </ul>
          </div>
        </Section>
      )}

      {siblings.length > 0 && (
        <Section
          eyebrow={service.group}
          heading="Usually bought alongside."
          ground="base"
        >
          <ul className="mt-10 grid gap-5 md:grid-cols-3">
            {siblings.map((sib, i) => (
              <Card as="li" key={sib.slug} interactive>
                <Link
                  href={`/services/${sib.slug}`}
                  data-reveal
                  data-reveal-delay={i * 50}
                  className="flex h-full flex-col gap-3 p-7"
                >
                  <h3 className="text-lg font-semibold text-text">{sib.title}</h3>
                  <p className="text-base text-muted">{sib.short}</p>
                </Link>
              </Card>
            ))}
          </ul>
          <p className="mt-9">
            <Link
              href="/services"
              className="inline-flex min-h-[44px] items-center text-base font-semibold text-link underline-offset-4 hover:underline"
            >
              {`All ${services.length} capabilities across ${SERVICE_GROUPS.length} groups \u2192`}
            </Link>
          </p>
        </Section>
      )}

      <FaqCta />
    </>
  );
}
