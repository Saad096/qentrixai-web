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
import { Illustration } from "@/components/ui/Illustration";
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
              // gap-y matters as much as gap-x: at 390px these titles each
              // wrap to two lines and, with no vertical gap, three of them
              // read as one block of violet text.
              <ul className="mt-5 flex flex-col items-center gap-y-3 sm:flex-row sm:flex-wrap sm:justify-center sm:gap-x-8 sm:gap-y-1">
                {linked.map((c) => (
                  <li key={c.slug}>
                    <Link
                      href={`/case-studies/${c.slug}`}
                      className="inline-flex min-h-[44px] items-center text-center text-base font-semibold text-link underline-offset-4 hover:underline"
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

          {/* Illustration, not photography: the stock tiles here were
              generic -- a street crowd stood in for "customer operations" --
              and they were the only photography left on the page. */}
          <Illustration
            key={current.art}
            src={current.art}
            ratio="aspect-[4/3] sm:aspect-[16/9] lg:aspect-[16/7]"
            scale="78%"
            className="mx-auto max-w-3xl rounded-lg shadow-2"
          />
        </div>
      </div>
    </Section>
  );
}
