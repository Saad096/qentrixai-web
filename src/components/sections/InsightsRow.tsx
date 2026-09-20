import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { blogs } from "@/data/blogs";
import { formatDate } from "@/lib/utils";

export function InsightsRow() {
  const latest = [...blogs]
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 3);

  return (
    <Section eyebrow="Insights" heading="Field notes from the work." ground="base">
      <ul className="mt-11 grid gap-px overflow-hidden rounded-md bg-[color:var(--color-border)] md:grid-cols-3">
        {latest.map((post) => (
          <li key={post.slug} className="bg-bg">
            <Link
              href={`/blogs/${post.slug}`}
              className="flex h-full flex-col gap-3 p-7 transition-colors hover:bg-surface"
            >
              <span className="font-mono text-xs text-muted">
                {formatDate(post.date)} · {post.readingTime}
              </span>
              <h3 className="text-lg font-semibold text-text">{post.title}</h3>
              <p className="text-base text-muted">{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>

      <p className="mt-9">
        <Link href="/blogs" className="inline-flex min-h-[44px] items-center text-base font-semibold text-link hover:brightness-110">
          All articles
        </Link>
      </p>
    </Section>
  );
}
