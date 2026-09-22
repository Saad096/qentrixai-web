import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { FaqCta } from "@/components/sections/FaqCta";
import { caseStudies } from "@/data/caseStudies";
import { buildMetadata, breadcrumbJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Six AI systems running in production",
  path: "/case-studies",
  description:
    "Problem, what we built, what changed. Multi-agent operations, document intelligence, voice screening, meeting intelligence, IVR replacement and computer vision.",
});

export default function CaseStudiesPage() {
  return (
    <>
      <script id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Case studies", path: "/case-studies" },
            ])
          ),
        }}
      />

      <PageHero
        title="Selected work"
        art="timeline"
        artLabel="A delivery timeline with the artifact handed over at each phase"
        lede={
          <>
            Six production systems. Where a client is under NDA we describe the shape of the
            business. We do not invent a logo.
          </>
        }
      />


      <Section className="rule">
        <ul>
          {caseStudies.map((c) => (
            <li key={c.slug} className="border-t border-[color:var(--color-border)]">
              <Link href={`/case-studies/${c.slug}`} className="group grid gap-5 py-9 md:grid-cols-12">
                <div className="md:col-span-3">
                  <span className="font-mono text-xs text-link">{c.category}</span>
                  <span className="mt-2 block font-mono text-xs text-muted">{c.client}</span>
                </div>
                <div className="md:col-span-6">
                  <h2 className="text-lg font-semibold text-text group-hover:text-link">
                    {c.title}
                  </h2>
                  <p className="mt-2 text-base text-text-2">{c.problem}</p>
                </div>
                <div className="md:col-span-3">
                  {c.metric ? (
                    <>
                      <span className="block text-xl font-bold text-text">{c.metric.value}</span>
                      <span className="mt-1 block font-mono text-xs text-muted">
                        {c.metric.label}
                      </span>
                    </>
                  ) : (
                    <span className="block text-base text-muted">{c.outcome}</span>
                  )}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <FaqCta />
    </>
  );
}
