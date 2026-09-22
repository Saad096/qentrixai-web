/**
 * The hero's right column: a looping plexus animation the owner supplied.
 *
 * Decorative, so it carries no caption and is hidden from assistive tech --
 * everything it communicates is already in the headline beside it.
 *
 * It is a <video> rather than a GIF or a Lottie for the obvious reason: the
 * source is 12MB of h264 and a GIF of it would be several times that. The
 * shipped encode is 900px wide at CRF 34, which is 759KB -- a plexus on
 * black hides compression, so the extra 900KB that CRF 28 costs buys
 * nothing at this size. Audio is stripped; there was an AAC track and an
 * autoplaying hero has no business carrying one.
 *
 * `poster` means the frame is painted before a byte of video arrives, so
 * the column is never an empty box, and `preload="metadata"` keeps it off
 * the critical path. Under `prefers-reduced-motion` the element is not
 * rendered at all and the poster stands alone -- pausing a video still
 * leaves the browser decoding it.
 */
export function HeroVideo() {
  return (
    <div
      aria-hidden="true"
      className="hero-video relative overflow-hidden rounded-lg bg-[#07070A] shadow-2 ring-1 ring-[color:var(--color-border)]"
    >
      <video
        className="block h-full w-full object-cover motion-reduce:hidden"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        poster="/media/hero-plexus-poster.webp"
      >
        <source src="/media/hero-plexus.mp4" type="video/mp4" />
      </video>

      {/* Stands in when the video is suppressed. Hidden the rest of the
          time, so it is never decoded twice. */}
      <img
        src="/media/hero-plexus-poster.webp"
        alt=""
        className="hidden h-full w-full object-cover motion-reduce:block"
      />
    </div>
  );
}
