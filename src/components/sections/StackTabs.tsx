"use client";

/**
 * The tech stack lives here now, not on the homepage. The old version was a
 * 28-item wall; this is the tabbed pattern from Quixlab, which shows a few
 * at a time and keeps the rest one click away.
 */
import * as React from "react";
import { Section } from "@/components/ui/Section";
import { TabPill, useTabs } from "@/components/ui/Tabs";
import { techStack } from "@/data/techStack";

export function StackTabs() {
  const tabs = useTabs(techStack.length);

  return (
    <Section
      eyebrow="Tools we know cold"
      heading="The stack, and where each piece earns its place."
      className="rule"
    >
      <div className="mt-11">
        <div {...tabs.tablistProps("Technology stack")} className="flex flex-wrap gap-2">
          {techStack.map((group, i) => (
            <button key={group.name} ref={tabs.registerRef(i)} {...tabs.tabProps(i, "stack")}>
              <TabPill selected={i === tabs.active}>{group.name}</TabPill>
            </button>
          ))}
        </div>

        <div {...tabs.panelProps("stack")} className="pt-9">
          <ul className="flex flex-wrap gap-2">
            {techStack[tabs.active].items.map((item) => (
              <li
                key={item}
                className="rounded-full bg-surface px-4 py-2 text-base text-text shadow-1"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
