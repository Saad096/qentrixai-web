/**
 * Scene registry. A page names a scene; this maps the name to the drawing.
 *
 * Kept as a plain record rather than dynamic import because each scene is a
 * few hundred bytes of markup -- there is nothing worth code-splitting, and
 * a lazy boundary in a hero would cost a layout shift for no gain.
 */
import { ComputerVisionScene } from "./ComputerVisionScene";
import {
  GenerativeAiScene,
  AgenticAiScene,
  RagScene,
  VoiceAiScene,
  InferenceScene,
  SovereignScene,
} from "./batch1";

export const SCENES = {
  "computer-vision": ComputerVisionScene,
  "generative-ai": GenerativeAiScene,
  "agentic-ai": AgenticAiScene,
  "rag-enterprise-search": RagScene,
  "voice-ai": VoiceAiScene,
  "inference-engineering": InferenceScene,
  "sovereign-ai": SovereignScene,
};

export type SceneKey = keyof typeof SCENES;

export function Scene({ name }: { name: SceneKey }) {
  const S = SCENES[name];
  if (!S) return null;
  return <S />;
}
