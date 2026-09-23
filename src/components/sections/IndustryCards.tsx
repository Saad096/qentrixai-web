import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/caseStudies";
import { products } from "@/data/products";
import { SectionCta } from "@/components/ui/SectionCta";

/**
 * Industries as cards rather than a tab strip, on the pattern the owner
 * supplied: the domain, one line, then the named work under it as chips.
 *
 * The tabbed version showed one domain at a time, so nine of the ten were
 * invisible and the section read as smaller than the offer. Ten cards say
 * the range in one screen, which is the whole argument of the section.
 *
 * The chips are resolved from `cases` and `products` by slug. A domain with
 * neither renders the honest label instead, same rule as everywhere else --
 * and because the chips come from the data rather than from this file, a
 * card cannot name work that does not exist.
 */
export function IndustryCards() {
  const rows = industries.map((ind) => {
    const chips = [
      ...ind.cases
        .map((sl) => caseStudies.find((c) => c.slug === sl))
        .filter((c): c is (typeof caseStudies)[number] => Boolean(c))
        .map((c) => ({ label: c.category, href: `/case-studies/${c.slug}` })),
      ...(ind.products ?? [])
        .map((sl) => products.find((p) => p.slug === sl))
        .filter((p): p is (typeof products)[number] => Boolean(p))
        .map((p) => ({ label: p.name, href: `/products/${p.slug}` })),
    ].slice(0, 3);
    return { ind, chips };
  });

  return (
    <Section
      id="industries"
      eyebrow="Industries"
      heading="Shipped in more places than the case studies show."
      lede="If the problem involves documents, calls, images or a knowledge base someone cannot search, we have built something close to it."
      ground="band"
    >
      <ul className="mt-12 grid gap-5 sm:grid-cols-2">
        {rows.map(({ ind, chips }, i) => (
          <Card
            as="li"
            key={ind.slug}
            /* An odd count would leave the last card alone on its row. */
            className={i === rows.length - 1 && rows.length % 2 === 1 ? "sm:col-span-2" : undefined}
          >
            <div data-reveal data-reveal-delay={i * 40} className="flex h-full flex-col gap-3 p-7">
              <h3 className="text-lg font-semibold text-text">
                <Link
                  href={`/industries/${ind.slug}`}
                  className="underline-offset-4 hover:text-link hover:underline"
                >
                  {ind.name}
                </Link>
              </h3>
              <p className="text-base text-text-2">{ind.line}</p>

              {chips.length > 0 ? (
                <ul className="mt-auto flex flex-wrap gap-2 pt-4">
                  {chips.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className="inline-flex min-h-[36px] items-center rounded-full border border-[color:var(--color-border)] px-3.5 font-mono text-xs text-link hover:border-brand"
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-auto pt-4 font-mono text-xs text-muted">
                  No published engagement yet
                </p>
              )}
            </div>
          </Card>
        ))}
      </ul>

      <SectionCta href="/industries">All industries</SectionCta>
    </Section>
  );
}
