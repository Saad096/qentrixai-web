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
 *
 * It re-runs on every route change. This component sits in the root layout,
 * which the App Router does not remount when you navigate, so keyed on `[]`
 * it ran exactly once per full page load: `.js-reveal` stayed on <html>
 * hiding every `[data-reveal]`, while the ScrollTriggers that reveal them had
 * been built from a `querySelectorAll` of the page you just left. Every route
 * you reached by clicking rendered as empty shells until you refreshed.
 */
import * as React from "react";
import { usePathname } from "next/navigation";

const IDLE_TIMEOUT = 1400;

/**
 * Module scope, so it survives a route change and resets on a real page load
 * -- which is exactly the lifetime of the thing it describes. The idle gate
 * exists to keep GSAP off the critical path before the hero has painted.
 * Once the bundle is in memory there is no critical path left to protect, and
 * waiting up to 1.4s on every subsequent navigation would show the new page
 * unstyled and then snatch it back.
 */
let gsapLoaded = false;

export function ScrollReveal() {
  const pathname = usePathname();

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    async function start(immediate: boolean) {
      if (cancelled) return;
      const targets = document.querySelectorAll<HTMLElement>("[data-reveal]");
      if (targets.length === 0) return;

      // On the immediate path the import below resolves from cache, but not
      // synchronously. Hiding the from-state now, in the same tick as the
      // previous route's cleanup, means there is never a frame where the new
      // page paints revealed and is then hidden again.
      if (immediate) document.documentElement.classList.add("js-reveal");

      try {
        const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
        ]);
        gsapLoaded = true;
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

        // Parallax. The fraction is read off the element, so a section tunes
        // its own depth without needing another component around it.
        const parallax = Array.from(
          document.querySelectorAll<HTMLElement>("[data-parallax]")
        ).map((el) =>
          gsap.to(el, {
            yPercent: () => Number(el.dataset.parallax ?? 0) * -100,
            ease: "none",
            scrollTrigger: {
              trigger: el,
              start: "top bottom",
              end: "bottom top",
              scrub: 0.5,
            },
          })
        );

        // Progress line: scales a rule from 0 to 1 as its list passes, so the
        // four phases read as a sequence rather than four separate cards.
        const lines = Array.from(
          document.querySelectorAll<HTMLElement>("[data-progress-line]")
        ).map((el) =>
          gsap.fromTo(
            el,
            { scaleX: 0 },
            {
              scaleX: 1,
              ease: "none",
              scrollTrigger: {
                trigger: el.parentElement ?? el,
                start: "top 85%",
                end: "bottom 55%",
                scrub: 0.4,
              },
            }
          )
        );

        // Scroll-linked sequence (motion plan D, without the pin).
        //
        // The plan called for pinning the phases for a viewport. Built that
        // way it positioned wrong: the pinned element reported
        // `position: fixed; top: 162px` while its rect sat 1674px down the
        // page, so the sequence played to an empty screen. Pinning was the
        // riskiest item in the plan and this is the fallback it was flagged
        // for -- scroll still advances the phase 1 -> 4 and the active card
        // still lifts while the others recede, which is the part that
        // matters. The page simply keeps scrolling normally underneath.
        //
        // Wrapped in matchMedia so it is desktop-only and GSAP tears it down
        // cleanly on resize below the breakpoint.
        const mm = gsap.matchMedia();
        mm.add("(min-width: 1024px)", () => {
          const sections = Array.from(
            document.querySelectorAll<HTMLElement>("[data-pin-sequence]")
          );
          const triggers = sections.map((section) => {
            const steps = Array.from(
              section.querySelectorAll<HTMLElement>("[data-pin-step]")
            );
            if (steps.length < 2) return null;
            const apply = (i: number) =>
              steps.forEach((el, n) => el.classList.toggle("is-step-active", n === i));
            apply(0);
            return ScrollTrigger.create({
              trigger: section,
              start: "top 75%",
              end: "bottom 45%",
              scrub: true,
              onUpdate: (self) =>
                apply(Math.min(steps.length - 1, Math.floor(self.progress * steps.length))),
            });
          });
          return () => {
            triggers.forEach((t) => t?.kill());
            document
              .querySelectorAll<HTMLElement>("[data-pin-step]")
              .forEach((el) => el.classList.remove("is-step-active"));
          };
        });

        // Pipelines: the rail draws left to right as the block passes, and
        // each stage arrives just behind the rail head. Scrubbed, so scrolling
        // back up runs it in reverse rather than replaying.
        //
        // Every from-state is set here at runtime via fromTo, never in CSS, so
        // with no JS — or under reduced motion, which returns before any of
        // this — the stages render in their final state.
        const pipelines = Array.from(
          document.querySelectorAll<HTMLElement>("[data-pipeline]")
        ).map((el) => {
          const rail = el.querySelector<HTMLElement>("[data-pipeline-rail]");
          const nodes = el.querySelectorAll<HTMLElement>("[data-pipeline-node]");

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: el,
              // Finish while the block is still comfortably on screen. Ending
              // on `bottom` left the last stage mid-tween — faded and offset —
              // at the moment the section sits centred, which reads as a
              // rendering fault rather than as motion.
              start: "top 92%",
              end: "top 58%",
              scrub: 0.5,
            },
          });

          if (rail) tl.fromTo(rail, { scaleX: 0 }, { scaleX: 1, ease: "none" }, 0);
          if (nodes.length) {
            tl.fromTo(
              nodes,
              { opacity: 0.2, y: 14 },
              { opacity: 1, y: 0, ease: "power2.out", stagger: 0.12 },
              0
            );
          }
          return tl;
        });

        cleanup = () => {
          mm.revert();
          [...tweens, ...parallax, ...lines, ...pipelines].forEach((t) => {
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

    // Already loaded: this is a navigation, so wire the new page up now.
    if (gsapLoaded) {
      void start(true);
      return () => {
        cancelled = true;
        cleanup?.();
      };
    }

    const onFirstScroll = () => start(false);
    window.addEventListener("scroll", onFirstScroll, { once: true, passive: true });

    const ric = (window as Window & typeof globalThis).requestIdleCallback;
    const cic = (window as Window & typeof globalThis).cancelIdleCallback;
    const idle: number = ric
      ? ric(() => start(false), { timeout: IDLE_TIMEOUT })
      : window.setTimeout(() => start(false), IDLE_TIMEOUT);

    return () => {
      cancelled = true;
      window.removeEventListener("scroll", onFirstScroll);
      if (cic) cic(idle);
      else window.clearTimeout(idle);
      cleanup?.();
    };
  }, [pathname]);

  return null;
}
