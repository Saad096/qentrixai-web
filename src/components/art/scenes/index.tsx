/**
 * Scene registry. A page names a scene; this maps the name to the drawing.
 *
 * Kept as a plain record rather than dynamic import because each scene is a
 * few hundred bytes of markup -- there is nothing to code-split, and a lazy
 * boundary in a hero would cost a layout shift for no gain.
 */
import { ComputerVisionScene } from "./ComputerVisionScene";

export const SCENES = {
  "computer-vision": ComputerVisionScene,
} as const;

export type SceneKey = keyof typeof SCENES;

export function Scene({ name, className }: { name: SceneKey; className?: string }) {
  const S = SCENES[name];
  if (!S) return null;
  return <S />;
}
