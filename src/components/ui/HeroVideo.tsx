"use client";

/**
 * The hero's right column: the presenter loop the owner supplied.
 *
 * It starts PAUSED, on the poster frame, with one control in the middle of
 * it: "Hear What We Do".
 *
 * That is a reversal, and the history is worth keeping because it cost a
 * lot of attempts. The brief was sound on arrival. No browser allows that
 * on a first visit -- unmuting at 0ms, after a second of playback, and after
 * re-issuing play() all ended with Chrome pausing the element, which is
 * worse than silence. What shipped instead was: start muted, unmute once
 * playback established, verify, fall back to unmuting on the first gesture.
 * It worked, but it meant a silent video playing to itself in the corner of
 * every first visit, which is the thing autoplay policies exist to prevent.
 *
 * One deliberate click gets sound immediately and reliably, in every engine,
 * with no policy to work around -- a click IS the user activation the policy
 * is asking for. So the control is the feature now rather than a fallback.
 *
 * After it starts, the controls move to the corner and Pause appears on
 * hover and on keyboard focus. WCAG 2.2.2 wants motion over five seconds to
 * be pausable; a control that only exists on hover would not satisfy that on
 * a touch screen, so the corner controls stay visible once playing and the
 * hover state only changes their prominence.
 */
import * as React from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

export function HeroVideo() {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [started, setStarted] = React.useState(false);
  const [playing, setPlaying] = React.useState(false);
  const [muted, setMuted] = React.useState(true);

  /* Start on the poster with sound armed. The first click is the user
     activation every engine wants, so play() with muted=false simply works
     -- there is nothing to detect, retry or verify. */
  const startWithSound = () => {
    const v = ref.current;
    if (!v) return;
    v.muted = false;
    setMuted(false);
    v.play().then(
      () => {
        setPlaying(true);
        setStarted(true);
      },
      () => {
        /* Only reachable if the element itself failed to load. Fall back to
           muted playback so the visitor still sees something. */
        v.muted = true;
        setMuted(true);
        void v.play().then(() => {
          setPlaying(true);
          setStarted(true);
        });
      }
    );
  };

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
    if (!next && v.paused) v.play().then(() => setPlaying(true), () => {});
  };

  return (
    <div className="hero-video group relative overflow-hidden rounded-lg bg-[color:rgb(var(--ill-panel))] shadow-2 ring-1 ring-[color:var(--color-border)]">
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

      {/* Before the first click: one control, in the middle, saying what it ############################3
          does. A bare play triangle over a paused video says "video"; it
          does not say there is something to hear. */}
      {!started && (
        <div className="absolute inset-0 grid place-items-center bg-[color:rgb(0_0_0/0.35)] p-5">
          <button
            type="button"
            onClick={startWithSound}
            className="inline-flex min-h-[52px] items-center gap-3 rounded-full bg-brand px-6 text-md font-semibold text-on-brand shadow-2 transition-[filter,transform] duration-[var(--motion-fast)] hover:brightness-110 focus-visible:brightness-110"
          >
            <Volume2 aria-hidden className="size-5 shrink-0" />
            <span className="text-left leading-tight">Hear What We Do</span>
          </button>
        </div>
      )}

      {/* After it starts: corner controls. Opaque chips, not translucent
          ones -- the footage is a white studio background and a scrim at 92%
          takes whatever contrast the frame underneath happens to give it,
          the same mistake that measured 1.13:1 on the insight cards. A solid
          surface is the token's contrast, whatever is behind it.

          They fade up on hover and on keyboard focus while it is playing.
          That hiding is gated on `@media (hover: hover)` in the stylesheet,
          because a Pause you can only reach by hovering does not exist on a
          touch screen -- and WCAG 2.2.2 wants motion over five seconds to be
          pausable. On touch they simply stay visible. */}
      {started && (
        <div
          className="hero-video__controls absolute bottom-3 left-3 flex items-center gap-2"
          data-playing={playing ? "true" : "false"}
        >
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
      )}
    </div>
  );
}
