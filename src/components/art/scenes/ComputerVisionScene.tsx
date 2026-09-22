import { SceneFrame, ill, panel, line } from "./Scene";

/**
 * /services/computer-vision
 *
 * What the page argues: production vision is about real lighting, real
 * cameras and real edge cases, not a benchmark. So the scene is a camera
 * watching a working shelf, with detections landing on it -- one of them
 * dashed and amber, because the honest part of this work is what the system
 * does when it is unsure.
 *
 * Two revisions from the first pass, both from looking at it rendered:
 * the field of view was two bare diagonals that cut straight through the
 * objects, so it is a filled cone behind everything now; and the scan was a
 * hard vertical rule that read as a stray mark, so it is a soft band.
 */
export function ComputerVisionScene() {
  return (
    <SceneFrame label="A camera watching a shelf, with detection boxes and one uncertain, dashed detection">
      <defs>
        <linearGradient id="cv-cone" x1="0.5" y1="1" x2="0.5" y2="0">
          <stop offset="0%" stopColor="rgb(var(--ill-1))" stopOpacity="0.22" />
          <stop offset="100%" stopColor="rgb(var(--ill-1))" stopOpacity="0.02" />
        </linearGradient>
        <linearGradient id="cv-scan" x1="0" y1="0.5" x2="1" y2="0.5">
          <stop offset="0%" stopColor="rgb(var(--ill-1))" stopOpacity="0" />
          <stop offset="50%" stopColor="rgb(var(--ill-1))" stopOpacity="0.5" />
          <stop offset="100%" stopColor="rgb(var(--ill-1))" stopOpacity="0" />
        </linearGradient>
        <clipPath id="cv-room">
          <rect x="28" y="40" width="344" height="180" rx="14" />
        </clipPath>
      </defs>

      <rect x="28" y="40" width="344" height="180" rx="14" fill={panel} />

      {/* Field of view, behind everything, as a cone rather than two lines. */}
      <g clipPath="url(#cv-room)">
        <path d="M200 236 L74 40 L326 40 Z" fill="url(#cv-cone)" />
        <g className="scene__sweep">
          <rect x="150" y="40" width="100" height="180" fill="url(#cv-scan)" />
        </g>
      </g>

      <rect x="28" y="40" width="344" height="180" rx="14" fill="none" stroke={line(0.14)} />

      {/* shelf */}
      <rect x="92" y="158" width="216" height="9" rx="4.5" fill={ill(6)} opacity="0.5" />

      {/* what is on it */}
      <rect x="118" y="112" width="44" height="46" rx="6" fill={ill(4)} />
      <rect x="178" y="126" width="38" height="32" rx="5" fill={ill(3)} />
      <circle cx="254" cy="138" r="20" fill={ill(5)} />

      {/* confident detections */}
      <g className="scene__pulse">
        <rect x="112" y="106" width="56" height="58" rx="5" fill="none" stroke={ill(1)} strokeWidth="2.5" />
        <rect x="112" y="94" width="34" height="11" rx="3" fill={ill(1)} />
      </g>
      <g className="scene__pulse scene__d1">
        <rect x="172" y="120" width="50" height="44" rx="5" fill="none" stroke={ill(1)} strokeWidth="2.5" />
        <rect x="172" y="108" width="30" height="11" rx="3" fill={ill(1)} />
      </g>

      {/* the uncertain one: dashed, amber, routed to a human */}
      <g className="scene__pulse scene__d2">
        <rect x="230" y="114" width="48" height="48" rx="5" fill="none" stroke={ill(3)} strokeWidth="2.5" strokeDasharray="5 4" />
        <rect x="230" y="102" width="26" height="11" rx="3" fill={ill(3)} />
      </g>

      {/* camera */}
      <g>
        <rect x="152" y="262" width="96" height="9" rx="4.5" fill={ill(6)} opacity="0.45" />
        <path d="M189 262 l11 -22 l11 22 z" fill={ill(6)} opacity="0.75" />
        <rect x="170" y="228" width="60" height="28" rx="10" fill={ill(6)} />
        <circle cx="200" cy="242" r="9.5" fill={panel} />
        <circle cx="200" cy="242" r="4.5" fill={ill(1)} />
        <circle cx="221" cy="234" r="2.5" fill={ill(4)} className="scene__pulse" />
      </g>
    </SceneFrame>
  );
}
