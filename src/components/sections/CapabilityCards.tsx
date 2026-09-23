import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { services } from "@/data/services";
import { caseStudies } from "@/data/caseStudies";
import { products } from "@/data/products";
import { SectionCta } from "@/components/ui/SectionCta";

/**
 * Six capability cards, on the pattern the owner supplied from the
 * reference: an icon chip, the capability, two sentences, then a rule and a
 * concrete example under it.
 *
 * The example line is the part that matters and the part that is easy to
 * fake. Each one points at a real case study or a product we operate, and
 * it is resolved from the data by slug -- so a card cannot cite work that
 * has been removed, and the link text is the thing's own name rather than a
 * sentence written about it.
 *
 * Six rather than four, because the previous row carried a bespoke diagram
 * per card and four diagrams was the honest limit of that. These cards lead
 * with type, so the row can be the width of the offer.
 */
const CARDS: { slug: string; example: { kind: "case" | "product"; slug: string } }[] = [
  { slug: "generative-ai", example: { kind: "product", slug: "minutely" } },
  { slug: "agentic-ai", example: { kind: "case", slug: "multi-agent-ai-platform" } },
  { slug: "rag-enterprise-search", example: { kind: "case", slug: "enterprise-document-intelligence" } },
  { slug: "voice-ai", example: { kind: "case", slug: "voice-recruitment-automation" } },
  { slug: "computer-vision", example: { kind: "case", slug: "computer-vision-systems" } },
  { slug: "sovereign-ai", example: { kind: "product", slug: "medaculous" } },
];

export function CapabilityCards() {
  const cards = CARDS.map(({ slug, example }) => {
    const service = services.find((s) => s.slug === slug);
    if (!service) throw new Error(`CapabilityCards: no service "${slug}"`);

    const ex =
      example.kind === "case"
        ? caseStudies.find((c) => c.slug === example.slug) &&
          {
            label: caseStudies.find((c) => c.slug === example.slug)!.title,
            href: `/case-studies/${example.slug}`,
          }
        : products.find((p) => p.slug === example.slug) &&
          {
            label: products.find((p) => p.slug === example.slug)!.name,
            href: `/products/${example.slug}`,
          };
    if (!ex) throw new Error(`CapabilityCards: no example "${example.slug}"`);
    return { service, ex };
  });

  return (
    <Section
      eyebrow="What we build"
      heading="Six things that start most engagements."
      lede={`${services.length} capabilities in total. Each card below points at something we have actually shipped.`}
      ground="base"
    >
      <ul className="mt-12 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {cards.map(({ service, ex }, i) => {
          const Icon = service.icon;
          return (
            <Card as="li" key={service.slug}>
              <div
                data-reveal
                data-reveal-delay={i * 50}
                className="flex h-full flex-col gap-4 p-7"
              >
                <span
                  aria-hidden="true"
                  className="grid size-11 place-items-center rounded-md bg-brand/12 text-link"
                >
                  <Icon className="size-5" />
                </span>

                <h3 className="text-lg font-semibold text-text">{service.title}</h3>
                <p className="text-base text-text-2">{service.description.split(". ")[0]}.</p>

                <p className="mt-auto border-t border-[color:var(--color-border)] pt-4 text-base text-muted">
                  <span className="font-semibold text-text">Example: </span>
                  <Link href={ex.href} className="text-link underline-offset-4 hover:underline">
                    {ex.label}
                  </Link>
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="inline-flex min-h-[44px] items-center text-base font-semibold text-link underline-offset-4 hover:underline"
                >
                  {"How we build it →"}
                </Link>
              </div>
            </Card>
          );
        })}
      </ul>

      <SectionCta href="/services">{`All ${services.length} capabilities`}</SectionCta>
    </Section>
  );
}
