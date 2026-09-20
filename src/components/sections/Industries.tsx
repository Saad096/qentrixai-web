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
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { TabPill, useTabs } from "@/components/ui/Tabs";
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
    >
      <div className="mt-11">
        <div {...tabs.tablistProps("Industries")} className="flex flex-wrap gap-2">
          {industries.map((ind, i) => (
            <button key={ind.name} ref={tabs.registerRef(i)} {...tabs.tabProps(i, "ind")}>
              <TabPill selected={i === tabs.active}>{ind.name}</TabPill>
            </button>
          ))}
        </div>

        <div {...tabs.panelProps("ind")} className="grid gap-9 pt-9 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="text-lg text-text">{current.line}</p>

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
              <p className="mt-6 font-mono text-xs text-muted">
                No published engagement in this sector yet.
              </p>
            )}
          </div>

          <div className="lg:col-span-7">
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-md shadow-2">
              <Image
                key={current.image}
                src={current.image}
                alt={current.imageAlt}
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
