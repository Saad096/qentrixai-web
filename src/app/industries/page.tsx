import Image from "next/image";
import Link from "next/link";
import { DomainFlow } from "@/components/art/DomainFlow";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { CtaBlock } from "@/components/sections/FaqCta";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/caseStudies";
import { products } from "@/data/products";
import { PRIMARY_CTA } from "@/data/navigation";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

/**
 * The industries hub, 2026-09-21.
 *
 * It did not exist. The domains lived only as a tab strip on the homepage,
 * which meant the footer's six industry links all pointed at the same
 * anchor -- six labels, one destination, and nothing for a search engine or
 * an answer engine to land on. Each domain now has a page of its own.
 */
export const metadata = buildMetadata({
  title: "Industries we build for",
  path: "/industries",
  description:
    "Ten domains, each with the constraint that shapes the system: clinical offline-first, per-field extraction for regulated work, on-device biometrics, cost per conversation for consumer AI.",
});

export default function IndustriesPage() {
  const backed = industries.filter((i) => i.cases.length > 0 || (i.products?.length ?? 0) > 0);

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
            ])
          ),
        }}
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <p className="font-mono text-xs text-muted">Industries</p>
              <h1 className="mt-4 max-w-[20ch] text-hero font-bold text-text">
                Domain shapes the system, not just the wording
              </h1>
              <p className="mt-7 max-w-measure text-md text-text-2">
                A retrieval system for a hospital and one for a sales team share a diagram and
                almost nothing else. What differs is the constraint that comes first. Where may the
                data be processed, what does a wrong answer cost, and does the thing have to keep
                working when the network does not?
              </p>
              <div className="mt-9">
                <Button href={PRIMARY_CTA.href} size="lg">
                  {PRIMARY_CTA.label}
                </Button>
              </div>
            </div>

            <dl className="grid gap-5 sm:grid-cols-3 lg:col-span-5">
              {[
                [`${industries.length}`, "domains"],
                [`${backed.length}`, "backed by shipped work"],
                [`${caseStudies.length}`, "case studies"],
              ].map(([v, k]) => (
                <div key={k}>
                  <dt className="sr-only">{k}</dt>
                  <dd>
                    <span className="block text-2xl font-bold text-text">{v}</span>
                    <span className="mt-1.5 block text-base text-muted">{k}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      <Section ground="band">
        <ul className="grid gap-5 sm:grid-cols-2">
          {industries.map((ind, i) => {
            const evidence =
              ind.cases.length + (ind.products?.length ?? 0) > 0
                ? `${ind.cases.length + (ind.products?.length ?? 0)} shipped`
                : "No published engagement";
            return (
              <Card
                as="li"
                key={ind.slug}
                interactive
                className={`overflow-hidden${
                  i === industries.length - 1 && industries.length % 2 === 1 ? " sm:col-span-2" : ""
                }`}
              >
                <Link
                  href={`/industries/${ind.slug}`}
                  data-reveal
                  data-reveal-delay={i * 50}
                  className="flex h-full flex-col"
                >
                  {ind.image ? (
                    <div className="relative aspect-[16/9] w-full">
                      <Image
                        src={ind.image}
                        alt={ind.imageAlt ?? ""}
                        fill
                        sizes="(min-width: 640px) 50vw, 100vw"
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <DomainFlow stages={ind.flow ?? []} className="rounded-none" />
                  )}
                  <div className="flex flex-1 flex-col gap-3 p-7">
                    <span className="font-mono text-xs text-link">{evidence}</span>
                    <h2 className="text-lg font-semibold text-text">{ind.name}</h2>
                    {/* `line` and not pressures[0], which is written to be
                        read under a heading and reads as a fragment here. */}
                    <p className="text-base text-text-2">{ind.line}</p>
                  </div>
                </Link>
              </Card>
            );
          })}
        </ul>

        <p className="mt-10 max-w-measure text-base text-muted">
          Two of the ten carry no published engagement. Those pages say so in the first
          paragraph and describe what we would build instead of implying we already have.
          Across the rest there are {caseStudies.length} case studies and {products.length}{" "}
          products we operate ourselves.
        </p>
      </Section>

      <CtaBlock />
    </>
  );
}
