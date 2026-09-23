import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { DomainOrbit } from "@/components/art/DomainOrbit";
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
        /* The orbit rather than a still. The owner's reference for this slot
           was a stock four-quadrant AI diagram; the ring already exists on
           /industries, already carries our palette, and can carry our real
           capability groups instead of four generic labels. Same ring, a
           different argument: on /industries the hub is the constraint that
           shapes a system, here it is the thing all twenty-one capabilities
           are in service of. */
        visual={
          <DomainOrbit
            hub="One system"
            nodes={[
              { name: "Agents", key: "agents", tone: 1 },
              { name: "Retrieval", key: "retrieval", tone: 2 },
              { name: "Voice AI", key: "voice", tone: 3 },
              { name: "Computer vision", key: "vision", tone: 4 },
              { name: "Data engineering", key: "data", tone: 5 },
              { name: "Web and mobile", key: "product", tone: 6 },
              { name: "Cloud and MLOps", key: "cloud", tone: 3 },
              { name: "Blockchain", key: "chain", tone: 5 },
            ]}
            label="Eight of the capabilities QentrixAI builds with, arranged around the one system they are assembled into: agents, retrieval, voice AI, computer vision, data engineering, web and mobile, cloud and MLOps, and blockchain."
          />
        }
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
