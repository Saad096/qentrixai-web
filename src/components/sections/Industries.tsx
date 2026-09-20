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
import { caseStudies } from "@/data/caseStudies";

export function Industries() {
  const tabs = useTabs(industries.length);
  const current = industries[tabs.active];
  const linked = current.cases
    .map((slug) => caseStudies.find((c) => c.slug === slug))
    .filter((c): c is (typeof caseStudies)[number] => Boolean(c));

  return (
    <Section
      eyebrow="Where this lands"
      heading="Domain shapes the system, not just the wording."
      ground="wash"
      headerClassName="mx-auto text-center"
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

        <div {...tabs.panelProps("ind")} className="pt-9">
          {/* Stacked, not a row. Side by side, three case-study titles as long
              as "Voice AI Recruitment Screening & CRM Automation" take the
              whole line and squeeze the paragraph to one word per row. */}
          <div className="pb-8 text-center">
            <p className="mx-auto max-w-measure text-lg text-text">{current.line}</p>

            {linked.length > 0 ? (
              <ul className="mt-4 flex flex-wrap justify-center gap-x-8">
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
              <p className="mt-4 font-mono text-xs text-muted">
                No published engagement in this sector yet.
              </p>
            )}
          </div>

          <div className="relative aspect-[16/9] w-full overflow-hidden rounded-lg shadow-2">
            <Image
              key={current.image}
              src={current.image}
              alt={current.imageAlt}
              fill
              sizes="(min-width: 1260px) 1180px, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
