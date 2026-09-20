import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { blogs } from "@/data/blogs";
import { formatDate } from "@/lib/utils";

/**
 * Cover art for a post.
 *
 * Every `cover` in `blogs.ts` is currently an empty string, so the row was
 * three blocks of text in a hairline grid. Rather than source nine stock
 * photographs that would say nothing about the writing, each category gets a
 * generated panel built from the theme tokens: a two-stop gradient and the
 * category set in mono.
 *
 * Original, themed, no licence to track, and it stays right if the palette
 * changes. A real `cover` on a post wins over it.
 */
const CATEGORY_ART: Record<string, string> = {
  MCP: "from-brand/35 to-accent/25",
  "Agentic AI": "from-accent/35 to-brand/20",
  RAG: "from-brand/25 to-info/30",
  "Voice AI": "from-danger/25 to-brand/30",
  MLOps: "from-info/30 to-accent/25",
  "AI Strategy": "from-brand/20 to-accent/35",
  Product: "from-accent/30 to-info/25",
};
const DEFAULT_ART = "from-brand/25 to-accent/25";

export function InsightsRow() {
  const latest = [...blogs].sort((a, b) => (a.date < b.date ? 1 : -1)).slice(0, 3);

  return (
    <Section eyebrow="Insights" heading="Field notes from the work." ground="base">
      <ul className="mt-11 grid gap-5 md:grid-cols-3">
        {latest.map((post, i) => (
          <Card as="li" key={post.slug} interactive className="overflow-hidden">
            <div data-reveal data-reveal-delay={i * 70} className="h-full">
              <Link href={`/blogs/${post.slug}`} className="flex h-full flex-col">
                {post.cover ? (
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-surface-2">
                    <Image
                      src={post.cover}
                      alt=""
                      fill
                      sizes="(min-width: 768px) 33vw, 100vw"
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div
                    aria-hidden="true"
                    className={`grain relative flex aspect-[16/9] w-full items-end bg-gradient-to-br p-5 ${
                      CATEGORY_ART[post.category] ?? DEFAULT_ART
                    }`}
                  >
                    <span className="font-mono text-xs text-text">{post.category}</span>
                  </div>
                )}

                <div className="flex flex-1 flex-col gap-3 p-7">
                  <span className="font-mono text-xs text-muted">
                    {formatDate(post.date)} · {post.readingTime}
                  </span>
                  <h3 className="text-lg font-semibold text-text">{post.title}</h3>
                  <p className="text-base text-muted">{post.excerpt}</p>
                </div>
              </Link>
            </div>
          </Card>
        ))}
      </ul>

      <p className="mt-9">
        <Link
          href="/blogs"
          className="inline-flex min-h-[44px] items-center text-base font-semibold text-link hover:brightness-110"
        >
          All articles
        </Link>
      </p>
    </Section>
  );
}
