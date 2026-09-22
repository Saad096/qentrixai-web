"use client";

/**
 * The hero's right column: the presenter loop the owner supplied.
 *
 * SOUND. The owner wants it audible on arrival, with the visitor able to
 * turn it off. No browser permits that literally: Chrome, Safari and
 * Firefox all refuse play() on an unmuted element until the visitor has
 * interacted with the page, and calling it anyway means the video does not
 * play at all -- worse than playing silently.
 *
 * So this gets as close as the platform allows:
 *
 *   1. Try unmuted. On a return visit with enough media engagement, Chrome
 *      permits it and the sound is simply on.
 *   2. If refused, play muted immediately so there is never a dead frame,
 *      and arm a one-shot listener. The first pointerdown, keypress or
 *      scroll anywhere on the page unmutes it -- that gesture is exactly
 *      what the browser was waiting for.
 *   3. If the visitor mutes it themselves, remember that and stop
 *      unmuting. A preference stated once should not be re-asked on every
 *      page load, and surprising someone with audio twice is how a site
 *      gets closed.
 *
 * CONTROLS are visible rather than on hover, because a control you have to
 * discover is not a control. Pause stops the motion so the headline beside
 * it can be read; Sound is the manual way in and out.
 *
 * It autoplays under `prefers-reduced-motion` too, on the owner's
 * instruction. WCAG 2.2.2 asks that motion over five seconds can be
 * paused, not that it never starts, and the Pause control satisfies that.
 * Everything else on the site still honours the preference.
 */
import * as React from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

/** Set once the visitor mutes on purpose. Survives reloads. */
const MUTE_KEY = "qx-hero-muted";

export function HeroVideo() {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(true);
  const [muted, setMuted] = React.useState(true);
  /* Set when the visitor mutes deliberately, so the first-gesture unmute
     does not undo their choice a moment later. */
  const userMuted = React.useRef(false);

  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;

    try {
      userMuted.current = window.localStorage.getItem(MUTE_KEY) === "1";
    } catch {
      /* Private mode or blocked storage. Default to asking for sound. */
    }

    let cleanup = () => {};

    const start = async () => {
      // React does not reliably reflect the `muted` prop onto the DOM
      // property after hydration, so both paths set it explicitly.
      if (!userMuted.current) {
        v.muted = false;
        try {
          await v.play();
          setMuted(false);
          setPlaying(true);
          return;
        } catch {
          /* Expected on a first visit. Fall through to muted. */
        }
      }

      v.muted = true;
      setMuted(true);
      try {
        await v.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
        return;
      }

      if (userMuted.current) return;

      // The first gesture is what the browser was waiting for.
      const unmute = () => {
        if (userMuted.current || !ref.current) return;
        ref.current.muted = false;
        setMuted(false);
        cleanup();
      };
      const opts = { once: true, passive: true } as const;
      window.addEventListener("pointerdown", unmute, opts);
      window.addEventListener("keydown", unmute, opts);
      window.addEventListener("scroll", unmute, opts);
      cleanup = () => {
        window.removeEventListener("pointerdown", unmute);
        window.removeEventListener("keydown", unmute);
        window.removeEventListener("scroll", unmute);
      };
    };

    void start();
    return () => cleanup();
  }, []);

  const toggle = () => {
    const v = ref.current;
    if (!v) return;
    if (v.paused) {
      v.play().then(() => setPlaying(true), () => setPlaying(false));
    } else {
      v.pause();
      setPlaying(false);
    }
  };

  const toggleSound = () => {
    const v = ref.current;
    if (!v) return;
    const next = !v.muted;
    v.muted = next;
    setMuted(next);
    userMuted.current = next;
    try {
      if (next) window.localStorage.setItem(MUTE_KEY, "1");
      else window.localStorage.removeItem(MUTE_KEY);
    } catch {
      /* Nothing to do. The in-memory ref still holds for this visit. */
    }
    if (!next && v.paused) v.play().then(() => setPlaying(true), () => {});
  };

  return (
    <div className="hero-video relative overflow-hidden rounded-lg bg-[color:rgb(var(--ill-panel))] shadow-2 ring-1 ring-[color:var(--color-border)]">
      <video
        ref={ref}
        className="block h-full w-full object-cover"
        loop
        muted
        playsInline
        preload="metadata"
        poster="/media/hero-robot-poster.webp"
        aria-label="QentrixAI presenter animation"
      >
        <source src="/media/hero-robot.mp4" type="video/mp4" />
      </video>

      {/* Opaque chips, not translucent ones. The footage is a white studio
          background and a scrim at 92% takes whatever contrast the frame
          underneath happens to give it -- the same mistake that measured
          1.13:1 on the insight cards. A solid surface is the token's
          contrast, whatever is behind it. */}
      <div className="absolute bottom-3 left-3 flex items-center gap-2">
        <button
          type="button"
          onClick={toggle}
          aria-pressed={!playing}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-surface px-3.5 text-xs font-semibold text-text shadow-1 ring-1 ring-[color:var(--color-border)] transition-colors hover:text-link"
        >
          {playing ? (
            <>
              <Pause aria-hidden className="size-4" /> Pause
            </>
          ) : (
            <>
              <Play aria-hidden className="size-4" /> Play
            </>
          )}
        </button>

        <button
          type="button"
          onClick={toggleSound}
          aria-pressed={!muted}
          className="inline-flex min-h-[40px] items-center gap-2 rounded-full bg-surface px-3.5 text-xs font-semibold text-text shadow-1 ring-1 ring-[color:var(--color-border)] transition-colors hover:text-link"
        >
          {muted ? (
            <>
              <VolumeX aria-hidden className="size-4" /> Sound on
            </>
          ) : (
            <>
              <Volume2 aria-hidden className="size-4" /> Mute
            </>
          )}
        </button>
      </div>
    </div>
  );
}
