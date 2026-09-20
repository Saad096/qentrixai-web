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
type Art = { a: string; b: string };

/**
 * Two radial stops per category, as raw token references so the alpha can go
 * high enough to actually read. The first attempt used Tailwind gradient
 * utilities at 20-35% alpha, which on the light theme washed out to pale
 * rectangles that looked like images that had failed to load.
 */
const CATEGORY_ART: Record<string, Art> = {
  MCP: { a: "var(--color-brand)", b: "var(--color-accent)" },
  "Agentic AI": { a: "var(--color-accent)", b: "var(--color-brand)" },
  RAG: { a: "var(--color-brand)", b: "var(--color-info)" },
  "Voice AI": { a: "var(--color-danger)", b: "var(--color-brand)" },
  MLOps: { a: "var(--color-info)", b: "var(--color-accent)" },
  "AI Strategy": { a: "var(--color-accent)", b: "var(--color-brand)" },
  Product: { a: "var(--color-info)", b: "var(--color-brand)" },
};
const DEFAULT_ART: Art = { a: "var(--color-brand)", b: "var(--color-accent)" };

/** A mesh of two offset radials over a deep base, plus the grain overlay. */
function artStyle({ a, b }: Art) {
  return {
    backgroundColor: "rgb(var(--color-surface-2))",
    backgroundImage: [
      `radial-gradient(75% 85% at 18% 12%, rgb(${a} / 0.85), transparent 68%)`,
      `radial-gradient(70% 80% at 88% 78%, rgb(${b} / 0.75), transparent 66%)`,
      `linear-gradient(140deg, rgb(${a} / 0.30), rgb(${b} / 0.18))`,
    ].join(", "),
  };
}

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
                    className="grain relative flex aspect-[16/9] w-full items-end p-5"
                    style={artStyle(CATEGORY_ART[post.category] ?? DEFAULT_ART)}
                  >
                    <span className="rounded-full bg-black/35 px-2.5 py-1 font-mono text-xs text-white backdrop-blur-sm">
                      {post.category}
                    </span>
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
