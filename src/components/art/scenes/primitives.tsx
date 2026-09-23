/**
 * Scene primitives.
 *
 * Thirty-odd scenes hand-drawn from scratch drift: line weights wander, radii
 * disagree, every author picks a different chip height. These are the shared
 * pieces every scene is composed from, so the set stays one set and each
 * drawing stays short enough to read.
 *
 * Coordinates are in the 400x300 scene space. Nothing here sets colour by
 * itself -- the caller passes an `--ill-*` hue, because which hue carries
 * meaning is a per-scene decision.
 */
import { ill, panel, line } from "./Scene";

/** The surface a scene's content sits on. Most scenes open with one. */
export function Panel({
  x = 28,
  y = 40,
  w = 344,
  h = 180,
  r = 14,
}: { x?: number; y?: number; w?: number; h?: number; r?: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={r} fill={panel} />
      <rect x={x} y={y} width={w} height={h} rx={r} fill="none" stroke={line(0.14)} />
    </>
  );
}

/** A window with a title bar. For anything that is software. */
export function Window({
  x, y, w, h, hue = 1,
}: { x: number; y: number; w: number; h: number; hue?: 1 | 2 | 3 | 4 | 5 | 6 }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={panel} stroke={line(0.18)} />
      <path d={`M${x} ${y + 26} h${w}`} stroke={line(0.18)} />
      <circle cx={x + 16} cy={y + 13} r="3.5" fill={ill(hue)} />
      <circle cx={x + 28} cy={y + 13} r="3.5" fill={line(0.22)} />
      <circle cx={x + 40} cy={y + 13} r="3.5" fill={line(0.22)} />
    </>
  );
}

/** A line of content. The workhorse: text, rows, list items. */
export function Bar({
  x, y, w, h = 7, hue, o = 0.32,
}: { x: number; y: number; w: number; h?: number; hue?: 1 | 2 | 3 | 4 | 5 | 6; o?: number }) {
  return (
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={h / 2}
      fill={hue ? ill(hue) : line(o)}
    />
  );
}

/** A labelled pill. Tags, states, model names. */
export function Chip({
  x, y, w, hue = 1, h = 16,
}: { x: number; y: number; w: number; hue?: 1 | 2 | 3 | 4 | 5 | 6; h?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={ill(hue)} />;
}

/** A node in a graph. Filled when it is the active one. */
export function Node({
  cx, cy, r = 14, hue = 1, solid = false,
}: { cx: number; cy: number; r?: number; hue?: 1 | 2 | 3 | 4 | 5 | 6; solid?: boolean }) {
  return (
    <circle
      cx={cx}
      cy={cy}
      r={r}
      fill={solid ? ill(hue) : panel}
      stroke={ill(hue)}
      strokeWidth="2.5"
    />
  );
}

/** A document. Retrieval, extraction, anything with pages. */
export function Doc({
  x, y, w = 46, h = 58, hue = 6, lines = 3,
}: { x: number; y: number; w?: number; h?: number; hue?: 1 | 2 | 3 | 4 | 5 | 6; lines?: number }) {
  return (
    <>
      <rect x={x} y={y} width={w} height={h} rx={5} fill={ill(hue)} opacity="0.9" />
      {Array.from({ length: lines }).map((_, i) => (
        <rect
          key={i}
          x={x + 8}
          y={y + 12 + i * 11}
          width={w - 16 - (i === lines - 1 ? 12 : 0)}
          height="4"
          rx="2"
          fill={panel}
          opacity="0.55"
        />
      ))}
    </>
  );
}

/** A connector that shows direction without an arrowhead. */
export function Flow({
  d, hue = 1, animate = true, delay,
}: { d: string; hue?: 1 | 2 | 3 | 4 | 5 | 6; animate?: boolean; delay?: "scene__d1" | "scene__d2" | "scene__d3" }) {
  return (
    <path
      d={d}
      fill="none"
      stroke={ill(hue)}
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="6 8"
      className={animate ? `scene__trace ${delay ?? ""}` : undefined}
    />
  );
}

/** A column chart. Measurement, cost, throughput. */
export function Bars({
  x, y, heights, hue = 1, w = 14, gap = 10,
}: { x: number; y: number; heights: number[]; hue?: 1 | 2 | 3 | 4 | 5 | 6; w?: number; gap?: number }) {
  return (
    <>
      {heights.map((hh, i) => (
        <rect
          key={i}
          x={x + i * (w + gap)}
          y={y - hh}
          width={w}
          height={hh}
          rx={4}
          fill={ill(hue)}
          opacity={0.45 + (i / Math.max(1, heights.length - 1)) * 0.55}
        />
      ))}
    </>
  );
}

/** A speech waveform. */
export function Wave({
  x, y, bars = 13, hue = 1, scale = 1,
}: { x: number; y: number; bars?: number; hue?: 1 | 2 | 3 | 4 | 5 | 6; scale?: number }) {
  const pattern = [10, 22, 34, 20, 42, 28, 48, 26, 38, 18, 30, 14, 8];
  return (
    <>
      {Array.from({ length: bars }).map((_, i) => {
        const hh = (pattern[i % pattern.length] ?? 20) * scale;
        return (
          <rect
            key={i}
            x={x + i * 11}
            y={y - hh / 2}
            width="5"
            height={hh}
            rx="2.5"
            fill={ill(hue)}
            opacity={0.5 + ((i % 4) / 4) * 0.5}
          />
        );
      })}
    </>
  );
}

/** A shield. Safety, governance, anything defended. */
export function Shield({
  cx, cy, s = 1, hue = 1,
}: { cx: number; cy: number; s?: number; hue?: 1 | 2 | 3 | 4 | 5 | 6 }) {
  const w = 34 * s;
  const h = 42 * s;
  return (
    <path
      d={`M${cx} ${cy - h / 2} l${w / 2} ${h * 0.18} v${h * 0.36} q0 ${h * 0.34} -${w / 2} ${h * 0.46} q-${w / 2} -${h * 0.12} -${w / 2} -${h * 0.46} v-${h * 0.36} z`}
      fill={ill(hue)}
      opacity="0.92"
    />
  );
}
