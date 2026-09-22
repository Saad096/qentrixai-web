import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { DeviceFrame, DevicePlaceholder } from "@/components/ui/DeviceFrame";
import { FaqCta } from "@/components/sections/FaqCta";
import { industries } from "@/data/industries";
import { industryDetail } from "@/data/industryDetail";
import { caseStudies } from "@/data/caseStudies";
import { products } from "@/data/products";
import { services } from "@/data/services";
import { PRIMARY_CTA } from "@/data/navigation";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return industries.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) return buildMetadata({ title: "Industry not found", path: `/industries/${slug}` });
  return buildMetadata({
    title: `AI for ${ind.name.toLowerCase()}`,
    description: industryDetail[ind.slug]?.intro ?? ind.line,
    path: `/industries/${ind.slug}`,
  });
}

/**
 * Evidence is generated from the data, never written into the page. If an
 * industry has no case studies and no products, the section does not render
 * and the page says what we would build instead -- which is exactly what the
 * intro already says for the two domains in that position.
 */
export default async function IndustryPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) notFound();

  const detail = industryDetail[ind.slug];
  if (!detail) notFound();

  const cases = ind.cases
    .map((s) => caseStudies.find((c) => c.slug === s))
    .filter((c): c is (typeof caseStudies)[number] => Boolean(c));
  const owned = (ind.products ?? [])
    .map((s) => products.find((p) => p.slug === s))
    .filter((p): p is (typeof products)[number] => Boolean(p));
  const related = detail.services
    .map((s) => services.find((x) => x.slug === s))
    .filter((s): s is (typeof services)[number] => Boolean(s));
  const hasEvidence = cases.length > 0 || owned.length > 0;

  return (
    <>
      <script
        id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Industries", path: "/industries" },
              { name: ind.name, path: `/industries/${ind.slug}` },
            ])
          ),
        }}
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-6">
              <Breadcrumb
                trail={[
                  { name: "Home", href: "/" },
                  { name: "Industries", href: "/industries" },
                  { name: ind.name },
                ]}
              />
              <h1 className="mt-4 max-w-[18ch] text-3xl font-bold text-text">{ind.name}</h1>
              <p className="mt-6 max-w-measure text-md text-text-2">{detail.intro}</p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Button href={PRIMARY_CTA.href} size="lg">
                  {PRIMARY_CTA.label}
                </Button>
                {hasEvidence && (
                  <Button href="#evidence" size="lg" variant="secondary">
                    What we shipped
                  </Button>
                )}
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg shadow-2">
                <Image
                  src={ind.image}
                  alt={ind.imageAlt}
                  fill
                  priority
                  sizes="(min-width: 1024px) 48vw, 100vw"
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <Section
        eyebrow="What makes it hard"
        heading="Three things that go wrong here."
        lede="Before any model is involved. These are the constraints the architecture has to answer to."
        ground="band"
      >
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {detail.pressures.map((p, i) => (
            <Card as="li" key={p.title}>
              <div data-reveal data-reveal-delay={i * 60} className="flex h-full flex-col gap-3 p-7">
                <span className="font-mono text-xs text-link">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h2 className="text-lg font-semibold text-text">{p.title}</h2>
                <p className="text-base text-text-2">{p.body}</p>
              </div>
            </Card>
          ))}
        </ul>
      </Section>

      <Section eyebrow="What we build" heading="And what it is shaped by." ground="base">
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {detail.build.map((b, i) => (
            <Card as="li" key={b.title}>
              <div data-reveal data-reveal-delay={i * 60} className="flex h-full flex-col gap-3 p-7">
                <h2 className="text-lg font-semibold text-text">{b.title}</h2>
                <p className="text-base text-text-2">{b.body}</p>
              </div>
            </Card>
          ))}
        </ul>

        <p className="mt-10 max-w-measure text-md text-muted">{ind.line}</p>
      </Section>

      {hasEvidence ? (
        <Section
          id="evidence"
          eyebrow="Evidence"
          heading="What we have shipped in this domain."
          lede="Generated from the case studies and products in the data, so this page cannot claim work that does not exist."
          ground="band"
        >
          {cases.length > 0 && (
            <ul className="mt-12 grid gap-5 md:grid-cols-3">
              {cases.map((c, i) => (
                <Card as="li" key={c.slug} interactive>
                  <Link
                    href={`/case-studies/${c.slug}`}
                    data-reveal
                    data-reveal-delay={i * 60}
                    className="flex h-full flex-col gap-3 p-7"
                  >
                    <span className="font-mono text-xs text-link">{c.category}</span>
                    <h3 className="text-md font-semibold text-text">{c.title}</h3>
                    <p className="text-base text-text-2">{c.problem}</p>
                    {c.metric && (
                      <p className="mt-auto pt-4">
                        <span className="block text-2xl font-bold text-text">{c.metric.value}</span>
                        <span className="mt-1 block font-mono text-xs text-muted">
                          {c.metric.label}
                        </span>
                      </p>
                    )}
                  </Link>
                </Card>
              ))}
            </ul>
          )}

          {owned.length > 0 && (
            <>
              <p className="mt-14 font-mono text-xs text-muted">
                Products we built and operate in this domain
              </p>
              <ul className="mt-5 grid gap-9 md:grid-cols-3">
                {owned.map((p, i) => {
                  const shot = p.coverMode === "dark" ? "" : p.cover || p.gallery[0] || "";
                  return (
                    <li key={p.slug}>
                      <Link
                        href={`/products/${p.slug}`}
                        data-reveal
                        data-reveal-delay={i * 60}
                        className="group block"
                      >
                        {shot ? (
                          <DeviceFrame
                            src={shot}
                            alt={`${p.name} interface`}
                            orientation={p.orientation}
                            sizes="(min-width: 768px) 33vw, 100vw"
                          />
                        ) : (
                          <DevicePlaceholder name={p.name} />
                        )}
                        <h3 className="mt-5 text-lg font-semibold text-text group-hover:text-link">
                          {p.name}
                        </h3>
                        <p className="mt-2 text-base text-text-2">{p.tagline}</p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          )}
        </Section>
      ) : (
        <Section eyebrow="Evidence" heading="None published in this domain." ground="band">
          <p className="mt-8 max-w-measure text-md text-muted">
            We have not shipped a named engagement here, and this page is not going to imply
            otherwise. What is above is what we would build and why. The nearest shipped work is
            in the case studies, where the same techniques are applied in a domain we can talk
            about.
          </p>
          <p className="mt-7">
            <Link
              href="/case-studies"
              className="inline-flex min-h-[44px] items-center text-base font-semibold text-link underline-offset-4 hover:underline"
            >
              {`All ${caseStudies.length} case studies →`}
            </Link>
          </p>
        </Section>
      )}

      <Section eyebrow="Capabilities" heading="What this work draws on." ground="base">
        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {related.map((s, i) => (
            <Card as="li" key={s.slug} interactive>
              <Link
                href={`/services/${s.slug}`}
                data-reveal
                data-reveal-delay={i * 60}
                className="flex h-full flex-col gap-3 p-7"
              >
                <span className="font-mono text-xs text-link">{s.group}</span>
                <h2 className="text-lg font-semibold text-text">{s.title}</h2>
                <p className="text-base text-text-2">{s.short}</p>
              </Link>
            </Card>
          ))}
        </ul>
      </Section>

      <Section eyebrow="Other domains" heading="Where else this applies." ground="band">
        <ul className="mt-10 flex flex-wrap gap-3">
          {industries
            .filter((i) => i.slug !== ind.slug)
            .map((i) => (
              <li key={i.slug}>
                <Link
                  href={`/industries/${i.slug}`}
                  className="inline-flex min-h-[44px] items-center rounded-full border border-[color:var(--color-border)] px-5 text-base text-text hover:border-brand hover:text-link"
                >
                  {i.name}
                </Link>
              </li>
            ))}
        </ul>
      </Section>

      <FaqCta />
    </>
  );
}
