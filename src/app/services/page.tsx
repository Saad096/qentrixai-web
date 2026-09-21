import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { FaqCta } from "@/components/sections/FaqCta";
import { services } from "@/data/services";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "AI systems built for production",
  path: "/services",
  description:
    "Seventeen capabilities, from sovereign deployments and inference engineering to agentic systems, retrieval, voice and computer vision. Each one ships with evals, tracing and a handover.",
});

export default function ServicesPage() {
  return (
    <>
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

      <section className="py-16 md:py-24">
        <Container>
          <h1 className="max-w-[16ch] text-hero font-bold text-text">What we build</h1>
          <p className="mt-7 max-w-measure text-md text-muted">
            {services.length} capabilities. Each one ships with the same production discipline: evals,
            tracing, and a handover.
          </p>
        </Container>
      </section>

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

      <FaqCta />
    </>
  );
}
