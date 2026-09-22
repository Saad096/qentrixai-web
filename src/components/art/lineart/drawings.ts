/**
 * Path data for every hero drawing. One source, two consumers: LineArt.tsx
 * renders it on the site, scripts/figma-lineart.mjs pushes it into Figma as
 * an editable frame per drawing.
 *
 * Rules that keep forty drawings looking like one set:
 *
 *   - viewBox is 400 x 300 for every entry. Do not vary it.
 *   - `structure` is the scene: the desk, the rack, the room. Thin and quiet.
 *   - `accent` is what the page is about. One idea, never more than four
 *     paths, or nothing reads as the subject.
 *   - `dots` are endpoints and junctions. Solid, sparing.
 *   - No text. Labels belong to the page, and text inside artwork cannot be
 *     translated, selected or read by a screen reader.
 *
 * Draw the mechanism, not the metaphor. A drone over a crop row, not a
 * glowing brain.
 */
export type Drawing = {
  structure: string[];
  accent: string[];
  dots?: [number, number][];
};

const RAW = {
  /* ---------------------------------------------------------------- */
  /* Top-level routes                                                   */
  /* ---------------------------------------------------------------- */

  /** /services — four capability clusters, wired where they ship together. */
  "capability-map": {
    structure: [
      // four cluster plates
      "M40 58 h120 a8 8 0 0 1 8 8 v64 a8 8 0 0 1 -8 8 h-120 a8 8 0 0 1 -8 -8 v-64 a8 8 0 0 1 8 -8 z",
      "M240 58 h120 a8 8 0 0 1 8 8 v64 a8 8 0 0 1 -8 8 h-120 a8 8 0 0 1 -8 -8 v-64 a8 8 0 0 1 8 -8 z",
      "M40 176 h120 a8 8 0 0 1 8 8 v64 a8 8 0 0 1 -8 8 h-120 a8 8 0 0 1 -8 -8 v-64 a8 8 0 0 1 8 -8 z",
      "M240 176 h120 a8 8 0 0 1 8 8 v64 a8 8 0 0 1 -8 8 h-120 a8 8 0 0 1 -8 -8 v-64 a8 8 0 0 1 8 -8 z",
      // capability rows inside each plate
      "M52 82 h60 M52 98 h84 M52 114 h48",
      "M252 82 h72 M252 98 h52 M252 114 h66",
      "M52 200 h54 M52 216 h78 M52 232 h44",
      "M252 200 h68 M252 216 h46 M252 232 h72",
    ],
    accent: [
      // the wiring between clusters that actually ship together
      "M168 98 h64",
      "M100 142 v30",
      "M300 142 v30",
      "M168 216 h64",
    ],
    dots: [
      [168, 98],
      [232, 98],
      [168, 216],
      [232, 216],
    ],
  },

  /** /industries — a field, a ward, a rack and a headset, one line weight. */
  "domain-grid": {
    structure: [
      // crop rows
      "M40 60 h120 M40 60 l-8 60 M70 60 l-4 60 M100 60 v60 M130 60 l4 60 M160 60 l8 60",
      "M28 124 h148",
      // hospital bed
      "M240 76 h104 v40 h-104 z M240 116 v14 M344 116 v14 M258 76 v-14 h30 v14",
      // server rack
      "M48 172 h96 v82 h-96 z M48 194 h96 M48 216 h96 M48 238 h96",
      // headset
      "M252 210 a44 44 0 0 1 88 0 M252 210 v20 a10 10 0 0 0 20 0 v-20 z M320 210 v20 a10 10 0 0 0 20 0 v-20 z",
    ],
    accent: [
      // one signal crossing all four
      "M96 96 v-22",
      "M292 96 v-20",
      "M96 158 v-20",
      "M296 178 v-16",
    ],
    dots: [
      [96, 74],
      [292, 76],
      [96, 138],
      [296, 162],
    ],
  },

  /** /case-studies — a timeline with the artifact hanging off each phase. */
  timeline: {
    structure: [
      "M36 150 h328",
      // artifacts hanging below each stop
      "M60 176 h56 v44 h-56 z M70 190 h36 M70 202 h24",
      "M158 176 h56 v44 h-56 z M168 190 h36 M168 202 h30",
      "M256 176 h56 v44 h-56 z M266 190 h28 M266 202 h36",
      // phase labels as plates above
      "M60 84 h56 v40 h-56 z",
      "M158 84 h56 v40 h-56 z",
      "M256 84 h56 v40 h-56 z",
      "M88 124 v26 M186 124 v26 M284 124 v26",
      "M88 150 v26 M186 150 v26 M284 150 v26",
    ],
    accent: ["M36 150 h252"],
    dots: [
      [88, 150],
      [186, 150],
      [284, 150],
      [364, 150],
    ],
  },

  /** /products — a shelf of devices, screens left blank on purpose. */
  "device-shelf": {
    structure: [
      "M32 232 h336",
      // laptop
      "M56 108 h132 v76 h-132 z M44 184 h156 l-8 14 h-140 z",
      // tablet
      "M216 118 h64 a6 6 0 0 1 6 6 v80 a6 6 0 0 1 -6 6 h-64 a6 6 0 0 1 -6 -6 v-80 a6 6 0 0 1 6 -6 z",
      // phone
      "M308 132 h40 a6 6 0 0 1 6 6 v62 a6 6 0 0 1 -6 6 h-40 a6 6 0 0 1 -6 -6 v-62 a6 6 0 0 1 6 -6 z",
      "M188 198 v34 M248 210 v22 M328 206 v26",
    ],
    accent: ["M72 128 h60", "M226 138 h44", "M316 150 h24"],
  },

  /** /blogs — the desk a field note gets written at. */
  desk: {
    structure: [
      "M28 246 h344",
      // notebook
      "M52 152 h116 v82 h-116 z M110 152 v82",
      "M66 176 h32 M66 192 h28 M124 176 h30 M124 192 h34 M124 208 h22",
      // terminal window
      "M196 108 h148 a6 6 0 0 1 6 6 v106 a6 6 0 0 1 -6 6 h-148 a6 6 0 0 1 -6 -6 v-106 a6 6 0 0 1 6 -6 z",
      "M190 132 h160",
      "M212 158 h54 M212 176 h82 M212 194 h40",
      // mug
      "M74 96 h46 v34 a10 10 0 0 1 -10 10 h-26 a10 10 0 0 1 -10 -10 z M120 104 h14 a10 10 0 0 1 0 20 h-14",
    ],
    accent: ["M204 158 h-8 M204 176 h-8", "M212 212 h28"],
    dots: [[204, 120]],
  },

  /** /contact — a brief arriving, and a reply going back. */
  correspondence: {
    structure: [
      "M56 108 h148 a6 6 0 0 1 6 6 v92 a6 6 0 0 1 -6 6 h-148 a6 6 0 0 1 -6 -6 v-92 a6 6 0 0 1 6 -6 z",
      "M50 114 l80 56 l80 -56",
      // the two offices as pins
      "M268 116 a18 18 0 1 0 0.01 0 M276 148 l10 22 l10 -22",
      "M308 176 a18 18 0 1 0 0.01 0 M316 208 l10 22 l10 -22",
      "M286 170 l30 8",
    ],
    accent: ["M212 158 h48", "M248 150 l12 8 l-12 8"],
    dots: [
      [276, 130],
      [316, 190],
    ],
  },

  /** /book — thirty minutes, and which one. */
  calendar: {
    structure: [
      "M52 96 h200 a8 8 0 0 1 8 8 v128 a8 8 0 0 1 -8 8 h-200 a8 8 0 0 1 -8 -8 v-128 a8 8 0 0 1 8 -8 z",
      "M44 134 h216",
      "M84 96 v-16 M220 96 v-16",
      // grid
      "M96 134 v106 M148 134 v106 M200 134 v106",
      "M44 170 h216 M44 206 h216",
      // clock
      "M324 154 a44 44 0 1 0 0.01 0",
    ],
    accent: ["M148 170 h52 v36 h-52 z", "M324 130 v26 l18 12"],
    dots: [[324, 154]],
  },

  /** /careers — two chairs, one screen. */
  pairing: {
    structure: [
      "M28 244 h344",
      // whiteboard
      "M226 72 h134 v104 h-134 z M240 100 h58 M240 118 h86 M240 136 h44",
      // desk and monitor
      "M52 196 h148 M64 196 v48 M188 196 v48",
      "M84 112 h96 a6 6 0 0 1 6 6 v62 a6 6 0 0 1 -6 6 h-96 a6 6 0 0 1 -6 -6 v-62 a6 6 0 0 1 6 -6 z",
      "M118 186 h28 v10 h-28 z",
      // two chairs
      "M56 214 a16 16 0 0 1 32 0 M72 230 v14",
      "M164 214 a16 16 0 0 1 32 0 M180 230 v14",
    ],
    accent: ["M98 132 h50 M98 150 h68 M98 168 h34"],
    dots: [[288, 154]],
  },
} satisfies Record<string, Drawing>;

export const DRAWINGS: Record<string, Drawing> = RAW;
export type DrawingKey = keyof typeof RAW;
