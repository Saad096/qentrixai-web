/**
 * The industries hero art: eight domains orbiting the constraint they all
 * share.
 *
 * Built from tokens rather than traced from the reference the owner sent.
 * That reference is a stock diagram and CLAUDE.md §7.4 rules out reusing
 * other people's assets, but the stronger reason is that it says nothing --
 * eight generic words in eight colours. The nodes here are eight of our
 * sixteen real domains, and the hub is the sentence the page argues:
 * whatever the domain, the constraint is what shapes the system.
 *
 * The ring rotates; each node counter-rotates at the same rate, so the
 * labels stay upright while they travel. 64s, slow enough that a name can
 * be read as it passes and slow enough to ignore while reading the headline
 * beside it. Transform only, so it lives on the compositor, and it stops
 * under prefers-reduced-motion and on hover or focus-within.
 *
 * No text in the SVG. Labels are HTML positioned over it -- SVG text will
 * not wrap, which is what clipped the DomainFlow labels twice before.
 */
const NODES = [
  { name: "Healthcare", slug: "healthcare", tone: 1 },
  { name: "Financial services", slug: "financial-services", tone: 2 },
  { name: "Legal and compliance", slug: "legal-tech", tone: 3 },
  { name: "Insurance", slug: "insurance-tech", tone: 4 },
  { name: "Agritech", slug: "agriculture-and-agritech", tone: 5 },
  { name: "Education", slug: "education-and-learning", tone: 6 },
  { name: "Logistics", slug: "logistics", tone: 3 },
  { name: "Public sector", slug: "public-sector", tone: 5 },
];

/** Where each node sits on the ring, in degrees clockwise from the top. */
const STEP = 360 / NODES.length;

export function DomainOrbit() {
  return (
    <div
      /* overflow-hidden because each node's placement wrapper is a full-size
             square that gets rotated, and a square rotated 45 degrees has a
             bounding box 1.41x its own width. The wrappers are empty -- the
             node inside them stays well within the ring -- but their boxes
             still pushed the document's scrollWidth out by up to 89px, which
             showed up as horizontal overflow on every viewport. */
          className="domain-orbit relative mx-auto aspect-square w-full max-w-[520px] overflow-hidden"
      role="img"
      aria-label="Eight of the domains QentrixAI builds for, arranged around the constraint they share: where the data may be processed, what a wrong answer costs, and whether it must keep working offline."
    >
      <svg viewBox="0 0 400 400" className="absolute inset-0 size-full" aria-hidden="true">
        {/* The track the nodes run on. */}
        <circle
          cx="200"
          cy="200"
          r="142"
          fill="none"
          strokeWidth="1"
          className="stroke-[color:var(--color-border)]"
        />

        {/* Spokes, drawn once and rotated with the ring so they stay under
            their own node. Dashed, because the relationship is a dependency
            rather than a flow. */}
        <g className="domain-orbit__ring" style={{ transformOrigin: "200px 200px" }}>
          {NODES.map((n, i) => (
            <line
              key={n.slug}
              x1="200"
              y1="200"
              x2="200"
              y2="70"
              strokeWidth="1.5"
              strokeDasharray="2 7"
              strokeLinecap="round"
              style={{
                stroke: `rgb(var(--ill-${n.tone}) / 0.55)`,
                transform: `rotate(${i * STEP}deg)`,
                transformOrigin: "200px 200px",
              }}
            />
          ))}
        </g>

      </svg>

      {/* The hub. Solid, because it is the one thing that does not move.
          An HTML circle rather than an SVG one, even though the rest of the
          geometry is SVG: the label has to be HTML to wrap, and with the
          fill in the SVG underneath, the label's real background is the page
          -- which is what it inherits, what a contrast checker measures, and
          what the text would actually sit on if it ever outgrew the circle.
          31% is r=62 of the 400 viewBox, so it matches the ring exactly. */}
      <div className="absolute inset-0 grid place-items-center">
        <div className="grid aspect-square w-[31%] place-items-center rounded-full bg-brand p-3">
          <p className="max-w-[9ch] text-center text-md font-bold leading-tight text-on-brand">
            The constraint
          </p>
        </div>
      </div>

      {/* The nodes.
          Four nested elements, because two of the transforms are static and
          two are animated, and an animation replaces a transform rather than
          composing with it:

            .domain-orbit__ring   spins the whole set (animated)
            outer                 rotates this node to its place (static)
            inner                 pulls it out to the radius and cancels the
                                  placement rotation (static)
            .domain-orbit__node   counter-spins so the label stays level
                                  while it travels (animated)

          Radius is 14.5% from the top: the ring sits at r=142 in a 400
          viewBox, so 50% - 35.5%. */}
      <div className="domain-orbit__ring absolute inset-0">
        {NODES.map((n, i) => (
          <div
            key={n.slug}
            className="absolute inset-0"
            style={{ transform: `rotate(${i * STEP}deg)` }}
          >
            <div
              className="absolute left-1/2 top-[14.5%]"
              style={{ transform: `translate(-50%, -50%) rotate(${-i * STEP}deg)` }}
            >
              <div
                className="domain-orbit__node grid size-[104px] place-items-center rounded-full p-2.5 text-center"
                style={{
                  backgroundColor: `rgb(var(--ill-${n.tone}) / 0.16)`,
                  boxShadow: `inset 0 0 0 1.5px rgb(var(--ill-${n.tone}) / 0.75)`,
                }}
              >
                <span className="text-xs font-semibold leading-tight text-text">{n.name}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
