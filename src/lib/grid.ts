/**
 * Column count follows item count.
 *
 * Every one of these grids was a fixed `md:grid-cols-3`, which is right only
 * when the list happens to have three things in it. Most of them do not:
 * eleven of the sixteen industries have exactly one case study and one
 * product, so the evidence section rendered a single card in a three-column
 * row and left two thirds of the band empty. The owner reported it as empty
 * space on the right, which is exactly what it was.
 *
 * One item takes the whole row rather than a third of it. Two split it.
 * Three or more keep the three-up grid.
 */
export function gridCols(n: number) {
  if (n <= 1) return "";
  if (n === 2) return "md:grid-cols-2";
  return "md:grid-cols-3";
}

/** True when a list renders a single card that should lay out horizontally. */
export const isSolo = (n: number) => n <= 1;
