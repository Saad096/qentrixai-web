"use client";

/**
 * Tabbed industries -- the pattern borrowed from Quixlab, filled with our own
 * content and with the honesty rule from GATE 4: a tab with no published
 * engagement shows what we would build and links nowhere.
 *
 * Roving tabindex, arrow-key navigation, one tabstop for the whole tablist.
 */
import * as React from "react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { industries } from "@/data/industries";
import { caseStudies } from "@/data/caseStudies";
import { cn } from "@/lib/utils";

export function Industries() {
  const [active, setActive] = React.useState(0);
  const tabRefs = React.useRef<(HTMLButtonElement | null)[]>([]);
  const current = industries[active];
  const linked = current.cases
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter((c): c is (typeof caseStudies)[number] => Boolean(c));

  function onKeyDown(e: React.KeyboardEvent) {
    const last = industries.length - 1;
    let next = active;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    tabRefs.current[next]?.focus();
  }

  return (
    <Section
      eyebrow="Where this lands"
      heading="Domain shapes the system, not just the wording."
      className="rule"
    >
      <div className="mt-11">
        <div
          role="tablist"
          aria-label="Industries"
          onKeyDown={onKeyDown}
          className="flex flex-wrap gap-x-7 gap-y-1 border-b border-[color:var(--color-border)]"
        >
          {industries.map((ind, i) => (
            <button
              key={ind.name}
              ref={(el) => {
                tabRefs.current[i] = el;
              }}
              role="tab"
              id={`tab-${i}`}
              aria-selected={i === active}
              aria-controls={`panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "-mb-px min-h-[44px] min-w-[44px] border-b-2 px-1 text-base transition-colors",
                i === active
                  ? "border-brand text-text"
                  : "border-transparent text-muted hover:text-text"
              )}
            >
              {ind.name}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`panel-${active}`}
          aria-labelledby={`tab-${active}`}
          className="pt-9"
        >
          <p className="max-w-measure text-lg text-text">{current.line}</p>

          {linked.length > 0 ? (
            <ul className="mt-7 flex flex-wrap gap-x-8 gap-y-2">
              {linked.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/case-studies/${c.slug}`}
                    className="inline-flex min-h-[44px] items-center text-base font-semibold text-link hover:brightness-110"
                  >
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-6 font-mono text-xs text-muted">No published engagement in this sector yet.</p>
          )}
        </div>
      </div>
    </Section>
  );
}
