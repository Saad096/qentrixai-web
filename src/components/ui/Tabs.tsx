"use client";

import * as React from "react";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Roving-tabindex tablist.
 *
 * Extracted from Industries and StackTabs, which carried the same fourteen-line
 * keyboard handler copy-pasted into both — so a fix to one silently left the
 * other broken.
 *
 * One tabstop for the whole list; arrows move and wrap; Home and End jump to
 * the ends.
 */
export function useTabs(count: number) {
  const [active, setActive] = React.useState(0);
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const onKeyDown = React.useCallback(
    (e: React.KeyboardEvent) => {
      const last = count - 1;
      let next = active;
      if (e.key === "ArrowRight") next = active === last ? 0 : active + 1;
      else if (e.key === "ArrowLeft") next = active === 0 ? last : active - 1;
      else if (e.key === "Home") next = 0;
      else if (e.key === "End") next = last;
      else return;
      e.preventDefault();
      setActive(next);
      refs.current[next]?.focus();
    },
    [active, count]
  );

  return {
    active,
    setActive,
    registerRef: (i: number) => (el: HTMLButtonElement | null) => {
      refs.current[i] = el;
    },
    tablistProps: (label: string) => ({
      role: "tablist" as const,
      "aria-label": label,
      onKeyDown,
    }),
    tabProps: (i: number, idPrefix: string) => ({
      role: "tab" as const,
      id: `${idPrefix}-tab-${i}`,
      "aria-selected": i === active,
      "aria-controls": `${idPrefix}-panel-${i}`,
      tabIndex: i === active ? 0 : -1,
      onClick: () => setActive(i),
    }),
    panelProps: (idPrefix: string) => ({
      role: "tabpanel" as const,
      id: `${idPrefix}-panel-${active}`,
      "aria-labelledby": `${idPrefix}-tab-${active}`,
    }),
  };
}

/**
 * Pill styling for a tab.
 *
 * The previous 2px underline was near-invisible against a dark ground, so the
 * tablist did not read as a control at all. A filled pill says which one is
 * active at a glance.
 *
 * The fill is `bg-brand` with `text-on-brand`: brand as a fill is the one legal
 * use of #9B31FF in the dark theme, where it measures 3.88:1 as text.
 */
export function TabPill({
  selected,
  chevron = false,
  children,
}: {
  selected: boolean;
  /** Adds the forward mark on the selected pill. Rail-style tablists only. */
  chevron?: boolean;
  children: React.ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full px-4 text-base transition-colors",
        selected
          ? "bg-brand text-on-brand shadow-1"
          : "text-muted hover:bg-surface hover:text-text"
      )}
    >
      {children}
      {chevron && selected && <ChevronRight className="size-4 shrink-0" aria-hidden />}
    </span>
  );
}

/**
 * The rail variant: every tab inside one recessed track rather than loose
 * pills on the page ground.
 *
 * Loose pills read as a row of buttons -- eight separate things to consider.
 * Inside a track they read as one control with one selected state, which is
 * what a tablist is. The track also fixes the wrap: on a narrow screen eight
 * pills stacked into three ragged rows, so the rail scrolls sideways instead,
 * with snap points. The scroll is contained, so it never becomes page-level
 * horizontal overflow.
 */
export function TabRail({
  children,
  className,
  ...rest
}: React.ComponentPropsWithoutRef<"div">) {
  return (
    <div
      {...rest}
      className={cn(
        "tab-rail no-scrollbar -mx-1 flex snap-x snap-mandatory gap-1 overflow-x-auto rounded-full bg-surface-2 p-1.5",
        "ring-1 ring-[color:var(--color-border)]",
        className
      )}
    >
      {children}
    </div>
  );
}
