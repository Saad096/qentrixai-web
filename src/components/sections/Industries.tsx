"use client";

/**
 * Tabbed industries -- the pattern borrowed from Quixlab, filled with our own
 * content and with the honesty rule from GATE 4: a tab with no published
 * engagement shows what we would build and links nowhere.
 *
 * Restyled 2026-09-21. The tabs were loose pills that wrapped to three ragged
 * rows on a phone, and the photo was squeezed into 7 of 12 columns beside a
 * short paragraph, so neither the control nor the image had any presence.
 * Now: one recessed rail holding every tab, the copy under it, and the photo
 * full width.
 *
 * Roving tabindex, arrow-key navigation, one tabstop for the whole tablist.
 */
import * as React from "react";
import Link from "next/link";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { TabPill, TabRail, useTabs } from "@/components/ui/Tabs";
import { industries } from "@/data/industries";
import { DomainFlow } from "@/components/art/DomainFlow";
import { caseStudies } from "@/data/caseStudies";
import { products } from "@/data/products";

export function Industries() {
  const tabs = useTabs(industries.length);
  const current = industries[tabs.active];
  const linked = [
    ...current.cases.map((slug) => {
      const c = caseStudies.find((x) => x.slug === slug);
      return c && { href: `/case-studies/${c.slug}`, title: c.title };
    }),
    ...(current.products ?? []).map((slug) => {
      const pr = products.find((x) => x.slug === slug);
      return pr && { href: `/products/${pr.slug}`, title: pr.name };
    }),
  ].filter((x): x is { href: string; title: string } => Boolean(x));

  return (
    <Section
      id="industries"
      eyebrow="Where this lands"
      heading="Domain shapes the system, not just the wording."
      ground="wash"
    >
      <div className="mt-11">
        <TabRail {...tabs.tablistProps("Industries")}>
          {industries.map((ind, i) => (
            <button
              key={ind.name}
              ref={tabs.registerRef(i)}
              {...tabs.tabProps(i, "ind")}
              className="snap-start"
            >
              <TabPill selected={i === tabs.active} chevron>
                {ind.name}
              </TabPill>
            </button>
          ))}
        </TabRail>

        <div {...tabs.panelProps("ind")} className="pt-10">
          {/* Two columns, not stacked. Stacked, a sector with no engagement
              put one short paragraph above a near-empty full-width panel --
              mostly blank screen with a line of text floating in it. Side by
              side the panel is always paired with copy. */}
          {/* Keyed on the active tab so the transition replays on every
              change, not only on mount (motion plan E). */}
          <div key={current.name} className="panel-in grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-5">
              <p className="text-lg text-text">{current.line}</p>

              {linked.length > 0 ? (
                <>
                  <p className="mt-6 font-mono text-xs text-muted">What we have shipped here</p>
                  <ul className="mt-2 flex flex-col gap-y-1">
                    {linked.map((c) => (
                      <li key={c.href}>
                        <Link
                          href={c.href}
                          className="inline-flex min-h-[44px] items-center text-base font-semibold text-link underline-offset-4 hover:underline"
                        >
                          {c.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </>
              ) : (
                <p className="mt-5 font-mono text-xs text-muted">
                  No published engagement in this sector yet.
                </p>
              )}

              {/* Each domain has a page of its own now; the tab is the
                  summary, not the destination. */}
              <p className="mt-6">
                <Link
                  href={`/industries/${current.slug}`}
                  className="inline-flex min-h-[44px] items-center text-base font-semibold text-link underline-offset-4 hover:underline"
                >
                  {`${current.name} in depth \u2192`}
                </Link>
              </p>
            </div>

            <div className="lg:col-span-7">
              {current.image ? (
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg shadow-2 sm:aspect-[16/10]">
                  <Image
                    key={current.image}
                    src={current.image}
                    alt={current.imageAlt ?? ""}
                    fill
                    sizes="(min-width: 1024px) 58vw, 100vw"
                    className="object-cover"
                  />
                </div>
              ) : (
                <DomainFlow key={current.slug} stages={current.flow ?? []} className="shadow-2" />
              )}
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
