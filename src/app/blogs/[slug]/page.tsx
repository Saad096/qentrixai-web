import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Button } from "@/components/ui/Button";
import { blogs, getBlog } from "@/data/blogs";
import { formatDate } from "@/lib/utils";
import { PRIMARY_CTA } from "@/data/navigation";
import { buildMetadata, articleJsonLd, breadcrumbJsonLd } from "@/lib/seo";

type Params = { slug: string };

export function generateStaticParams() {
  return blogs.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) return buildMetadata({ title: "Article not found", path: `/blogs/${slug}` });
  return buildMetadata({
    title: blog.title,
    description: blog.excerpt,
    path: `/blogs/${blog.slug}`,
    type: "article",
    publishedTime: blog.date,
    image: blog.cover || undefined,
  });
}

export default async function BlogDetail({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const blog = getBlog(slug);
  if (!blog) notFound();

  const related = blogs.filter((b) => b.slug !== blog.slug).slice(0, 3);

  return (
    <>
      <script id="ld-article"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(
            articleJsonLd({
              title: blog.title,
              excerpt: blog.excerpt,
              slug: blog.slug,
              date: blog.date,
              author: blog.author,
              image: blog.cover || undefined,
            })
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
              { name: blog.title, path: `/blogs/${blog.slug}` },
            ])
          ),
        }}
      />

      <article className="py-16 md:py-24">
        <Container>
          <Link
            href="/blogs"
            className="inline-flex min-h-[44px] items-center font-mono text-xs text-muted hover:text-text"
          >
            Insights
          </Link>
          <h1 className="mt-3 max-w-[22ch] text-3xl font-bold text-text">{blog.title}</h1>
          <p className="mt-5 font-mono text-xs text-muted">
            {formatDate(blog.date)} — {blog.readingTime} — {blog.author}
          </p>

          <div className="mt-12 max-w-measure space-y-6">
            {blog.content.map((para, i) => (
              <p key={i} className="text-md leading-relaxed text-muted">
                {para}
              </p>
            ))}
          </div>
        </Container>
      </article>

      <Section heading="Working on something like this?" className="rule">
        <p className="mt-5 max-w-measure text-md text-muted">
          Thirty minutes, no pitch deck. Bring the problem and we will tell you how we would
          approach it.
        </p>
        <div className="mt-8">
          <Button href={PRIMARY_CTA.href} size="lg">
            {PRIMARY_CTA.label}
          </Button>
        </div>
      </Section>

      <Section heading="More notes" className="rule">
        <ul className="mt-8 max-w-measure">
          {related.map((b) => (
            <li key={b.slug} className="border-t border-[color:var(--color-border)]">
              <Link
                href={`/blogs/${b.slug}`}
                className="flex min-h-[72px] flex-col justify-center py-4 hover:text-link"
              >
                <span className="text-md font-semibold text-text">{b.title}</span>
                <span className="mt-1 font-mono text-xs text-muted">{formatDate(b.date)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
