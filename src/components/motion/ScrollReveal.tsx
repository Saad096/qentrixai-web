"use client";

/**
 * GSAP ScrollTrigger reveals, on a performance budget.
 *
 * The audit's single biggest finding was that GSAP + ScrollTrigger + Lenis +
 * Framer Motion shipped on every page and cost ~1.1s of blocking time on
 * mobile. GSAP is back by owner request, so it is constrained:
 *
 *   - imported dynamically, never in the initial bundle
 *   - loaded on idle, or on first scroll, after the hero has painted
 *   - the hero is untouched: it is server-rendered and its <h1> is the LCP
 *     element, so nothing may gate it behind JS
 *   - skipped entirely for prefers-reduced-motion
 *   - if anything fails, .js-reveal is never set and every section renders
 *     visible
 */
import * as React from "react";

const IDLE_TIMEOUT = 1400;

export function ScrollReveal() {
  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    async function start() {
      if (cancelled) return;
      const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
      if (targets.length === 0) return;

      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        if (cancelled) return;

        gsap.registerPlugin(ScrollTrigger);
        // Only now is it safe to hide the from-state.
        document.documentElement.classList.add("js-reveal");

        const tweens = Array.from(targets).map((el) => {
          const delay = Number(el.dataset.revealDelay ?? 0) / 1000;
          return gsap.to(el, {
            opacity: 1,
            y: 0,
            duration: 0.62,
            delay,
            ease: "power3.out",
            onStart: () => el.classList.add("is-revealed"),
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          });
        });

        cleanup = () => {
          tweens.forEach((t) => {
            t.scrollTrigger?.kill();
            t.kill();
          });
          document.documentElement.classList.remove("js-reveal");
        };
      } catch {
        // Bundle failed to load: leave everything visible.
        document.documentElement.classList.remove("js-reveal");
      }
    }

    const onFirstScroll = () => start();
    window.addEventListener("scroll", onFirstScroll, { once: true, passive: true });

    const ric = (window as Window & typeof globalThis).requestIdleCallback;
    const cic = (window as Window & typeof globalThis).cancelIdleCallback;
    const idle: number = ric
      ? ric(() => start(), { timeout: IDLE_TIMEOUT })
      : window.setTimeout(() => start(), IDLE_TIMEOUT);

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onFirstScroll);
      if (cic) cic(idle);
      else window.clearTimeout(idle);
      cleanup?.();
    };
  }, []);

  return null;
}
