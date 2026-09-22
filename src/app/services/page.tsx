import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBlock } from "@/components/sections/FaqCta";
import { services } from "@/data/services";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI systems built for production",
  path: "/services",
  description:
    "Twenty-one AI capabilities across build, deploy, models and advice. Each ships with evals, tracing and a handover, not a demo.",
});

export default function ServicesPage() {
  return (
    <>
      <script
        id="ld-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd("What we build", services.map((s) => ({ name: s.title, path: `/services/${s.slug}` })))
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
            ])
          ),
        }}
      />

      <PageHero
        title="What we build"
        art="index-services"
        lede={
          <>
            {services.length} capabilities. Each one ships with the same production discipline: evals,
            tracing, and a handover.
          </>
        }
      />


      <Section className="rule">
        <ul className="grid gap-x-10 gap-y-px sm:grid-cols-2">
          {services.map((s) => (
            <li key={s.slug} className="border-t border-[color:var(--color-border)]">
              <Link href={`/services/${s.slug}`} className="group flex gap-5 py-7">
                <s.icon className="mt-0.5 size-5 shrink-0 text-link" aria-hidden />
                <span>
                  <span className="block text-lg font-semibold text-text group-hover:text-link">
                    {s.title}
                  </span>
                  <span className="mt-2 block text-base text-muted">{s.short}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBlock />
    </>
  );
}
