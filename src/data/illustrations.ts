/**
 * unDraw illustration per piece of content.
 *
 * Kept out of blogs.ts and services.ts on purpose: which picture goes with a
 * post is a presentation decision, and the content files should not have to
 * change when the art does. The `cover` field on a post still wins over this
 * -- that is for a real screenshot when we have one.
 *
 * Every entry must be distinct within a list that renders together. Two
 * adjacent cards carrying the same figure reads as a bug, which is why these
 * are per-slug rather than per-category.
 *
 * Files live in /public/images/undraw and were recoloured on download.
 * Licence and source URLs: docs/revamp/06-images.md.
 */
const DIR = "/images/undraw";

export const BLOG_ART: Record<string, string> = {
  "mcp-how-agents-reach-your-systems": `${DIR}/connection.svg`,
  "context-engineering-beat-prompting": `${DIR}/ai-context.svg`,
  "computer-use-agents-narrow-work": `${DIR}/ai-code-assistant.svg`,
  "production-ready-ai-not-demos": `${DIR}/code-deployed.svg`,
  "agentic-ai-business-automation": `${DIR}/artificial-intelligence.svg`,
  "rag-enterprise-knowledge-search": `${DIR}/file-searching.svg`,
  "voice-ai-call-centers": `${DIR}/voice-assistant.svg`,
  "mlops-observability-llm-systems": `${DIR}/dashboard.svg`,
  "build-ai-mvp-safely": `${DIR}/product-iteration.svg`,
  "ai-product-roadmap-startups": `${DIR}/five-year-plan.svg`,
  "edge-ai-when-cloud-isnt-enough": `${DIR}/mobile-devices.svg`,
};

/**
 * One per capability. They never render together -- the art is on the detail
 * page hero, not on the /services list -- but they are still all distinct,
 * because two capabilities sharing a picture is the kind of thing a visitor
 * notices when they open both.
 */
export const SERVICE_ART: Record<string, string> = {
  "generative-ai": `${DIR}/ai-generated-document.svg`,
  "agentic-ai": `${DIR}/artificial-intelligence.svg`,
  "rag-enterprise-search": `${DIR}/file-searching.svg`,
  "voice-ai": `${DIR}/voice-assistant.svg`,
  "computer-vision": `${DIR}/motion-alert.svg`,
  "nlp-document-ai": `${DIR}/ai-document-analysis.svg`,
  "ai-mvp-development": `${DIR}/product-demo.svg`,
  "blockchain-web3": `${DIR}/ethereum.svg`,
  "edge-ai": `${DIR}/mobile-devices.svg`,
  "cloud-devops-mlops": `${DIR}/server-cluster.svg`,
  "data-science-ml": `${DIR}/predictive-analytics.svg`,
  "responsible-ai": `${DIR}/security-on.svg`,
  "no-code-automation": `${DIR}/process.svg`,
  "ai-strategy-consulting": `${DIR}/business-decisions.svg`,
};

/**
 * One per case study. Two of the six are Voice AI engagements, so these are
 * per-slug rather than per-category -- the pair would otherwise carry the
 * same picture, and they sit one click apart.
 */
export const CASE_ART: Record<string, string> = {
  "multi-agent-ai-platform": `${DIR}/artificial-intelligence.svg`,
  "enterprise-document-intelligence": `${DIR}/ai-document-analysis.svg`,
  "voice-recruitment-automation": `${DIR}/voice-assistant.svg`,
  "meeting-intelligence-platform": `${DIR}/business-call.svg`,
  "ai-ivr-platform": `${DIR}/voice-control.svg`,
  "computer-vision-systems": `${DIR}/motion-alert.svg`,
};

/**
 * Products only where there is no real screenshot.
 *
 * Most ship with actual product shots and those always win: a
 * screenshot of the thing is worth more than a drawing of the idea. These
 * three are the ones marked `coverMode: "dark"` in products.ts, which
 * rendered with no imagery at all.
 */
export const PRODUCT_ART: Record<string, string> = {
  "multiagent-chatbot": `${DIR}/ai-chat.svg`,
  documentai: `${DIR}/file-analysis.svg`,
  voxroute: `${DIR}/voice-interface.svg`,
};
