import Link from "next/link";
import { PageHero } from "@/components/sections/PageHero";
import { Section } from "@/components/ui/Section";
import { CtaBlock } from "@/components/sections/FaqCta";
import { blogs } from "@/data/blogs";
import { formatDate } from "@/lib/utils";
import { buildMetadata, breadcrumbJsonLd, itemListJsonLd } from "@/lib/seo";

export const metadata = buildMetadata({
  title: "Field notes on shipping AI",
  path: "/blogs",
  description:
    "Notes from production work: MCP, context engineering, agent evals, RAG that holds up, voice latency, MLOps and edge deployment.",
});

export default function BlogsPage() {
  const posts = [...blogs].sort((a, b) => (a.date < b.date ? 1 : -1));

  return (
    <>
      <script
        id="ld-itemlist"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            itemListJsonLd("Insights", blogs.map((b) => ({ name: b.title, path: `/blogs/${b.slug}` })))
          ),
        }}
      />
      <script id="ld-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            breadcrumbJsonLd([
              { name: "Home", path: "/" },
              { name: "Insights", path: "/blogs" },
            ])
          ),
        }}
      />

      <PageHero
        title="Insights"
        photo={{
          src: "/images/insights/insights-hero.webp",
          width: 936,
          height: 970,
          /* Cropped from the supplied render. The original carries its own
             "Insights" title and lede across the left third, which put the
             page's h1 and its lede on the screen twice. */
          alt: "An article open on a laptop, with comment, idea and newsletter cards floating above it",
        }}
        lede={
          <>
            Field notes from the work. Written by the people doing it.
          </>
        }
      />


      <Section className="rule">
        <ul>
          {posts.map((post) => (
            <li key={post.slug} className="border-t border-[color:var(--color-border)]">
              <Link href={`/blogs/${post.slug}`} className="group grid gap-4 py-8 md:grid-cols-12">
                <div className="md:col-span-3">
                  <span className="font-mono text-xs text-muted">{formatDate(post.date)}</span>
                  <span className="mt-2 block font-mono text-xs text-link">{post.category}</span>
                </div>
                <div className="md:col-span-9">
                  <h2 className="text-lg font-semibold text-text group-hover:text-link">
                    {post.title}
                  </h2>
                  <p className="mt-2 max-w-measure text-base text-muted">{post.excerpt}</p>
                  <span className="mt-3 block font-mono text-xs text-muted">{post.readingTime}</span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBlock />
    </>
  );
}
