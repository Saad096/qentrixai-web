import Link from "next/link";

/**
 * The visible trail, in small type: Home / Industries / Healthcare.
 *
 * The site already emitted BreadcrumbList JSON-LD on every detail route, so
 * a search engine knew where each page sat and a reader did not. Detail
 * pages carried a single back-link instead ("Industries", "What we build"),
 * which says where you can go but not where you are.
 *
 * The last crumb is the current page and is not a link -- `aria-current`
 * rather than an anchor to itself.
 */
export function Breadcrumb({
  trail,
}: {
  /** Ancestors first, current page last. */
  trail: { name: string; href?: string }[];
}) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-xs text-muted">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.name} className="flex items-center gap-2">
              {c.href && !last ? (
                /* A 44px box on the link, not on the li: the separator must
                   not grow with it. The crumbs were 19px tall, which is the
                   whole trail failing the tap-target floor on every detail
                   page. Negative margin keeps the row its original height,
                   so nothing moves -- only the hit area changes. */
                <Link
                  href={c.href}
                  className="-my-3 flex min-h-[44px] items-center underline-offset-4 hover:text-text hover:underline"
                >
                  {c.name}
                </Link>
              ) : (
                <span aria-current={last ? "page" : undefined} className={last ? "text-text" : undefined}>
                  {c.name}
                </span>
              )}
              {!last && (
                <span aria-hidden="true" className="text-muted">
                  /
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
