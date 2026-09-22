"use client";

/**
 * The hero's right column: the presenter loop the owner supplied.
 *
 * SOUND. The owner wants it audible the moment the page opens. On a
 * visitor's first visit no browser allows that, and this was tested hard
 * enough to say so with confidence rather than by quoting the spec:
 * unmuting at 0ms, after a second of playback, and after re-issuing
 * play() all ended the same way -- Chrome pauses the element, which is
 * worse than silence.
 *
 * What ships is the closest thing that works:
 *
 *   1. Start muted, because that is the only way to start.
 *   2. Unmute as soon as playback has genuinely established, about a
 *      second in. Not the moment play() resolves -- the element can still
 *      be paused a frame later while the first frames decode, and
 *      unmuting in that window makes Chrome stop it outright. Measured
 *      both ways.
 *   3. Verify. Safari pauses the element instead of allowing this, so a
 *      moment later we check: if it stopped, re-mute, resume, and fall
 *      back to unmuting on the first gesture.
 *
 * The `muted` attribute is bound to state rather than hard-coded. Left
 * static, React reconciled the DOM property back to true on every
 * re-render and re-muted the element a frame after the effect unmuted it,
 * which is indistinguishable from the browser refusing. Probing the real
 * policy directly showed unmute succeeding at every delay from 0 to
 * 2500ms, which is what pointed at React rather than at Chrome.
 *   4. An explicit mute is remembered and none of the above runs again.
 *
 * Step 3 is the part that matters. Without it the Safari path is a hero
 * that silently stops playing, which is worse than the problem being
 * solved.
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

    /* How long to wait before deciding the browser refused the unmute.
       Two frames is enough for a pause to land and short enough that
       nobody hears a stutter. */
    const VERIFY_MS = 120;

    const armGestureUnmute = () => {
      const unmute = () => {
        if (userMuted.current || !ref.current) return;
        ref.current.muted = false;
        setMuted(false);
        void ref.current.play().catch(() => {});
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

    const start = async () => {
      // Muted is the only way in. React does not reliably reflect the prop
      // onto the DOM property after hydration, so set it here.
      v.muted = true;
      try {
        await v.play();
        setPlaying(true);
      } catch {
        setPlaying(false);
        return;
      }

      if (userMuted.current) return;

      /* Wait until playback has actually established before asking for
         sound. `play()` resolving is not the same thing: the element can
         still be paused a frame later while the first frames decode, and
         unmuting in that window makes Chrome stop it outright. Measured --
         unmuting at that moment left paused=true; unmuting after roughly a
         second of real playback succeeded at every delay tried. */
      await new Promise<void>((resolve) => {
        if (v.currentTime > 0.4) return resolve();
        let done = false;
        const finish = () => {
          if (done) return;
          done = true;
          v.removeEventListener("timeupdate", onTime);
          resolve();
        };
        const onTime = () => {
          if (v.currentTime > 0.4) finish();
        };
        v.addEventListener("timeupdate", onTime);
        // Never hang on a stalled element.
        window.setTimeout(finish, 2500);
      });

      if (userMuted.current || !ref.current) return;

      // Now try for sound. This is a different permission check from
      // autoplay, and Chrome grants it on an element that is genuinely
      // playing.
      v.muted = false;
      setMuted(false);

      /* Chrome stops the element the instant it is unmuted without user
         activation, so put it back and wait for a gesture. The attempt
         above is still worth making: Chrome's autoplay policy grants
         unmuted playback to origins the visitor engages with repeatedly,
         and on those profiles this path simply succeeds. */
      window.setTimeout(() => {
        const el = ref.current;
        if (!el || userMuted.current) return;
        if (!el.paused) return;

        el.muted = true;
        setMuted(true);
        void el.play().then(
          () => setPlaying(true),
          () => setPlaying(false)
        );
        armGestureUnmute();
      }, VERIFY_MS);
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
        /* Bound to state, not a static attribute. With `muted` hard-coded
           in JSX, every re-render reconciled the DOM property back to true
           and silently re-muted the element a frame after the effect
           unmuted it -- which looked exactly like the browser refusing.
           Initial state is true so the SSR markup still carries `muted`,
           which is what autoplay requires. */
        muted={muted}
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
