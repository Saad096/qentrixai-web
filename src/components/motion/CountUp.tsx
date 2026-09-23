"use client";

import * as React from "react";

/**
 * Rolls a stat up to its value the first time it comes into view.
 *
 * Three constraints shape this:
 *
 *  - The final string is rendered on the server and is what a crawler, a
 *    screen reader and a visitor without JS get. The animation only ever
 *    replaces it after mount, so the number is never dependent on script.
 *  - `tabular-nums` keeps every digit the same width, so the value cannot
 *    reflow its neighbours as it counts. This must not contribute to CLS.
 *  - prefers-reduced-motion skips straight to the value.
 *
 * Values look like "5+", "25+", "12", "6wk" — a leading integer and an
 * arbitrary suffix. Anything that does not match that shape is left alone.
 */
export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = React.useState(value);

  React.useEffect(() => {
    const match = value.match(/^(\d+)(.*)$/);
    if (!match) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const target = Number(match[1]);
    const suffix = match[2];
    const node = ref.current;
    if (!node || target === 0) return;

    let frame = 0;
    let started = false;

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting || started) return;
        started = true;
        observer.disconnect();

        const duration = 900;
        const start = performance.now();
        const tick = (now: number) => {
          const t = Math.min((now - start) / duration, 1);
          // easeOutCubic: quick, then settling. Reads as counting up rather
          // than as a linear wipe.
          const eased = 1 - Math.pow(1 - t, 3);
          setDisplay(`${Math.round(target * eased)}${suffix}`);
          if (t < 1) frame = requestAnimationFrame(tick);
        };
        setDisplay(`0${suffix}`);
        frame = requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );

    observer.observe(node);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [value]);

  return (
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {display}
    </span>
  );
}
