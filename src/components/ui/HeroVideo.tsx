"use client";

/**
 * The hero's right column: the presenter loop the owner supplied.
 *
 * It plays on arrival without anyone asking, which is what was wanted, and
 * it can be stopped, which is the part that matters. A moving figure beside
 * a headline competes with the headline, and the owner's note was exactly
 * that -- people should be able to settle it and read.
 *
 * Two controls, both visible rather than on hover, because a control you
 * have to discover is not a control:
 *
 *   Pause   stops the motion. The poster frame stays, so the column keeps
 *           its shape and nothing reflows.
 *   Sound   the file has a voiceover. Autoplay is only permitted muted, so
 *           it starts muted and this is the way in. Unmuting also means the
 *           viewer chose to hear it, which is the only decent way to ship
 *           audio on a landing page.
 *
 * Under `prefers-reduced-motion` it does not autoplay at all. The poster
 * shows and the play control is there for anyone who wants it, which is
 * what that preference is asking for -- not "never", but "not at me
 * unprompted".
 */
import * as React from "react";
import { Pause, Play, Volume2, VolumeX } from "lucide-react";

export function HeroVideo() {
  const ref = React.useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = React.useState(true);
  const [muted, setMuted] = React.useState(true);

  React.useEffect(() => {
    const v = ref.current;
    if (!v) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      v.pause();
      setPlaying(false);
      return;
    }
    // Autoplay can still be refused. If it is, show the true state rather
    // than a pause button over a stopped video.
    v.play().then(
      () => setPlaying(true),
      () => setPlaying(false)
    );
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
    v.muted = !v.muted;
    setMuted(v.muted);
    // Unmuting is an explicit ask to hear it, so start it if it is stopped.
    if (!v.muted && v.paused) v.play().then(() => setPlaying(true), () => {});
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
