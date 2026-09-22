import Link from "next/link";
import { notFound } from "next/navigation";
import { Breadcrumb } from "@/components/ui/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { Illustration } from "@/components/ui/Illustration";
import { BLOG_ART } from "@/data/illustrations";
import { Scene, SCENES, type SceneKey } from "@/components/art/scenes";
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

  const art = BLOG_ART[blog.slug];
  const scene = (blog.slug in SCENES ? blog.slug : undefined) as SceneKey | undefined;

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
          {/* Split hero, matching every other route. The article stacked
              title, meta and then a drawing above the prose, which pushed
              the first paragraph most of a screen down and left the right
              half of the masthead empty -- the owner's screenshot. Copy
              left, drawing top right, body starting where the eye already
              is. */}
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Breadcrumb
                trail={[
                  { name: "Home", href: "/" },
                  { name: "Insights", href: "/blogs" },
                  { name: blog.category },
                ]}
              />
              <h1 className="mt-4 max-w-[22ch] text-3xl font-bold text-text">{blog.title}</h1>
              <p className="mt-5 text-xs font-semibold uppercase tracking-[0.08em] text-muted">
                {formatDate(blog.date)} · {blog.readingTime} · {blog.author}
              </p>
              <p className="mt-6 max-w-measure text-md text-text-2">{blog.excerpt}</p>
            </div>

            {scene ? (
              <div className="lg:col-span-5">
                <Scene name={scene} />
              </div>
            ) : art ? (
              <div className="lg:col-span-5">
                <Illustration
                  src={art}
                  ratio="aspect-[4/3]"
                  className="rounded-lg shadow-2"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                  priority
                />
              </div>
            ) : null}
          </div>

          <div className="mt-12 max-w-measure space-y-6">
            {blog.content.map((para, i) => (
              <p key={i} className="text-md leading-relaxed text-text-2">
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
