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
import {
  DocumentAiScene,
  MvpScene,
  SaasMobileScene,
  TrainingScene,
  ManagedScene,
  HiringScene,
  AeoScene,
  BlockchainScene,
  EdgeScene,
  MlopsScene,
  DataScienceScene,
  ResponsibleScene,
  AutomationScene,
  StrategyScene,
} from "./batch2";
import {
  JevScene,
  McpScene,
  ContextScene,
  ComputerUseScene,
  ProductionScene,
  AgenticAutomationScene,
  RagEnterpriseScene,
  CallCentreScene,
  ObservabilityScene,
  MvpSafelyScene,
  RoadmapScene,
  EdgeVsCloudScene,
} from "./batch3";

export const SCENES = {
  "computer-vision": ComputerVisionScene,
  "generative-ai": GenerativeAiScene,
  "agentic-ai": AgenticAiScene,
  "rag-enterprise-search": RagScene,
  "voice-ai": VoiceAiScene,
  "inference-engineering": InferenceScene,
  "sovereign-ai": SovereignScene,
  "nlp-document-ai": DocumentAiScene,
  "ai-mvp-development": MvpScene,
  "ai-saas-and-mobile": SaasMobileScene,
  "model-training": TrainingScene,
  "managed-ai-services": ManagedScene,
  "hire-ai-engineers": HiringScene,
  "aeo-and-geo": AeoScene,
  "blockchain-web3": BlockchainScene,
  "edge-ai": EdgeScene,
  "cloud-devops-mlops": MlopsScene,
  "data-science-ml": DataScienceScene,
  "responsible-ai": ResponsibleScene,
  "no-code-automation": AutomationScene,
  "ai-strategy-consulting": StrategyScene,

  // Articles. Keyed by blog slug.
  "jev-typed-decisions-not-text": JevScene,
  "mcp-how-agents-reach-your-systems": McpScene,
  "context-engineering-beat-prompting": ContextScene,
  "computer-use-agents-narrow-work": ComputerUseScene,
  "production-ready-ai-not-demos": ProductionScene,
  "agentic-ai-business-automation": AgenticAutomationScene,
  "rag-enterprise-knowledge-search": RagEnterpriseScene,
  "voice-ai-call-centers": CallCentreScene,
  "mlops-observability-llm-systems": ObservabilityScene,
  "build-ai-mvp-safely": MvpSafelyScene,
  "ai-product-roadmap-startups": RoadmapScene,
  "edge-ai-when-cloud-isnt-enough": EdgeVsCloudScene,
};

export type SceneKey = keyof typeof SCENES;

export function Scene({ name }: { name: SceneKey }) {
  const S = SCENES[name];
  if (!S) return null;
  return <S />;
}
