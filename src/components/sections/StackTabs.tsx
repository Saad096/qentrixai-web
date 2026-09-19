"use client";

/**
 * The tech stack lives here now, not on the homepage. The old version was a
 * 28-item wall; this is the tabbed pattern from Quixlab, which shows a few
 * at a time and keeps the rest one click away.
 */
import * as React from "react";
import { Section } from "@/components/ui/Section";
import { techStack } from "@/data/techStack";
import { cn } from "@/lib/utils";

export function StackTabs() {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  function onKeyDown(e: React.KeyboardEvent) {
    const last = techStack.length - 1;
    let next = active;
    if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (e.key === "Home") next = 0;
    else if (e.key === "End") next = last;
    else return;
    e.preventDefault();
    setActive(next);
    refs.current[next]?.focus();
  }

  return (
    <Section
      eyebrow="Tools we know cold"
      heading="The stack, and where each piece earns its place."
      className="rule"
    >
      <div className="mt-11">
        <div
          role="tablist"
          aria-label="Technology stack"
          onKeyDown={onKeyDown}
          className="flex flex-wrap gap-x-7 gap-y-1 border-b border-[color:var(--color-border)]"
        >
          {techStack.map((group, i) => (
            <button
              key={group.name}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`stack-tab-${i}`}
              aria-selected={i === active}
              aria-controls={`stack-panel-${i}`}
              tabIndex={i === active ? 0 : -1}
              onClick={() => setActive(i)}
              className={cn(
                "-mb-px min-h-[44px] min-w-[44px] border-b-2 px-1 text-base transition-colors",
                i === active ? "border-brand text-text" : "border-transparent text-muted hover:text-text"
              )}
            >
              {group.name}
            </button>
          ))}
        </div>

        <div
          role="tabpanel"
          id={`stack-panel-${active}`}
          aria-labelledby={`stack-tab-${active}`}
          className="pt-9"
        >
          <ul className="flex flex-wrap gap-2">
            {techStack[active].items.map((item) => (
              <li
                key={item}
                className="rounded-full border border-[color:var(--color-border)] px-4 py-2 text-base text-text"
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
