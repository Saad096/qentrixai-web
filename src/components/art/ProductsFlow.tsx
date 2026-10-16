import Image from "next/image";

/**
 * The /products hero: the owner's illustration of the stack we build on --
 * laptop, cloud, tablet, phone and servers -- with the connections between
 * them carrying something.
 *
 * The arrows in the artwork are baked into the raster, so they cannot move.
 * What moves is an SVG overlay: pulses that travel the same routes those
 * arrows point along, on a loop. Drawing pulses rather than redrawing the
 * lines is deliberate -- a dashed stroke laid over a solid one has to line
 * up to the pixel or it reads as a double image, while a travelling dot
 * tolerates the half-pixel drift that comes with scaling a photograph.
 *
 * The viewBox matches the cropped panel's aspect exactly, so the overlay
 * scales with the image at every width instead of drifting out of register.
 *
 * Transform and opacity only, so it stays on the compositor, and the whole
 * thing stops under prefers-reduced-motion.
 */

/* Each route follows one of the arrows in the artwork. `dur` varies so the
   pulses do not march in lockstep, which reads as a mechanism rather than a
   metronome. */
const ROUTES = [
  { d: "M 150,70 H 220", dur: "2.6s", begin: "0s", tone: 1 },      // laptop -> cloud
  { d: "M 312,62 H 410 V 92", dur: "3.1s", begin: "0.5s", tone: 2 }, // cloud -> tablet
  { d: "M 318,150 H 274 V 236", dur: "3.4s", begin: "1.1s", tone: 1 }, // tablet -> phone
  { d: "M 276,246 V 96", dur: "2.9s", begin: "1.7s", tone: 2 },     // phone -> cloud
  { d: "M 300,232 H 352 V 258", dur: "2.4s", begin: "0.9s", tone: 3 }, // down to phone
  { d: "M 392,250 H 460", dur: "2.7s", begin: "1.4s", tone: 3 },    // phone -> servers
];

export function ProductsFlow() {
  return (
    <div className="relative isolate overflow-hidden rounded-lg">
      <Image
        src="/images/products/products-flow.webp"
        alt="The stack we build on: a dashboard on a laptop and a tablet, a mobile client, and the cloud services and servers behind them."
        width={1072}
        height={866}
        priority
        sizes="(min-width: 1024px) 50vw, 100vw"
        className="h-auto w-full"
      />

      <svg
        viewBox="0 0 536 433"
        aria-hidden="true"
        className="products-flow pointer-events-none absolute inset-0 size-full"
      >
        {ROUTES.map((r, i) => (
          <g key={i}>
            {/* The path itself stays invisible: the artwork already draws
                the line. This is only the track the pulse rides. */}
            <path id={`pf-${i}`} d={r.d} fill="none" stroke="none" />
            <circle r="4.5" fill={`rgb(var(--ill-${r.tone}))`} opacity="0.9">
              <animateMotion dur={r.dur} begin={r.begin} repeatCount="indefinite">
                <mpath href={`#pf-${i}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;0.95;0.95;0"
                keyTimes="0;0.15;0.8;1"
                dur={r.dur}
                begin={r.begin}
                repeatCount="indefinite"
              />
            </circle>
          </g>
        ))}
      </svg>
    </div>
  );
}
