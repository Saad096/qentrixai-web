import { SceneFrame, ill, panel, line } from "./Scene";
import { Panel, Window, Bar, Chip, Node, Doc, Flow, Bars, Wave } from "./primitives";

/**
 * /services/generative-ai — the system around the model.
 * The page's argument is that the model is one component: what matters is
 * the eval set that defines correct, and the tracing around it. So the model
 * is a small node and the harness is the scene.
 */
export function GenerativeAiScene() {
  return (
    <SceneFrame label="A request passing through a model, checked against an evaluation set, with traces recorded">
      <Panel />
      <Window x={52} y={62} w={136} h={136} hue={1} />
      <Bar x={68} y={104} w={92} />
      <Bar x={68} y={120} w={68} />
      <Chip x={68} y={140} w={52} hue={1} />
      <Chip x={126} y={140} w={34} hue={6} />

      <Flow d="M196 130 h40" hue={1} />
      <Node cx={256} cy={130} r={22} hue={1} solid />
      <circle cx={256} cy={130} r="9" fill={panel} />

      {/* the eval set: pass, pass, fail — the one that stops a release */}
      <g className="scene__rise">
        <rect x={300} y={78} width={56} height={104} rx={8} fill={panel} stroke={line(0.18)} />
        <circle cx={316} cy={98} r="6" fill={ill(1)} />
        <Bar x={328} y={95} w={18} />
        <circle cx={316} cy={124} r="6" fill={ill(1)} />
        <Bar x={328} y={121} w={14} />
        <circle cx={316} cy={150} r="6" fill={ill(4)} className="scene__pulse" />
        <Bar x={328} y={147} w={20} hue={4} />
      </g>

      {/* traces underneath */}
      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={168} h={5} hue={1} />
    </SceneFrame>
  );
}

/**
 * /services/agentic-ai — a graph, not a loop.
 * The argument is that most of a reliable agent is not model-driven: the
 * transitions are rules and only one step needs judgement. So the graph is
 * explicit and the approval gate is the loudest thing in it.
 */
export function AgenticAiScene() {
  return (
    <SceneFrame label="An agent state graph with typed tools and an approval gate before the irreversible step">
      <Panel />
      <Flow d="M92 130 h46" hue={1} />
      <Flow d="M184 130 h46" hue={1} delay="scene__d1" />
      <Flow d="M276 130 h44" hue={1} delay="scene__d2" />

      <Node cx={70} cy={130} hue={1} solid />
      <Node cx={161} cy={130} hue={1} />
      <Node cx={253} cy={130} hue={3} />
      <Node cx={342} cy={130} hue={1} />

      {/* tools hanging off the middle step */}
      <path d="M161 152 v20 M161 172 h-42 M161 172 h42" stroke={line(0.2)} strokeWidth="1.5" />
      <rect x={100} y={178} width={38} height={22} rx={6} fill={ill(6)} opacity="0.85" />
      <rect x={184} y={178} width={38} height={22} rx={6} fill={ill(6)} opacity="0.85" />

      {/* the gate: a human signs the step that cannot be undone */}
      <g className="scene__pulse">
        <rect x={228} y={74} width={50} height={26} rx={13} fill={ill(3)} />
        <path d="M253 100 v8" stroke={ill(3)} strokeWidth="2.5" />
      </g>

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={214} h={5} hue={1} />
    </SceneFrame>
  );
}

/**
 * /services/rag-enterprise-search — the citation is the product.
 * Answers carry the passage they came from, so the scene is documents going
 * in and one of them coming back attached to the answer.
 */
export function RagScene() {
  return (
    <SceneFrame label="Documents indexed and retrieved, with the answer carrying the passage it came from">
      <Panel />
      <Doc x={52} y={74} hue={6} />
      <Doc x={52} y={142} hue={6} />
      <g className="scene__rise">
        <Doc x={106} y={108} hue={3} />
      </g>

      <Flow d="M162 130 h34" hue={1} />
      <Node cx={218} cy={130} r={20} hue={1} solid />
      <path d="M212 130 l4 5 l9 -11" stroke={panel} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Flow d="M240 130 h30" hue={1} delay="scene__d1" />

      {/* the answer, with its source pinned to it */}
      <rect x={278} y={86} width={82} height={88} rx={10} fill={panel} stroke={line(0.18)} />
      <Bar x={292} y={104} w={54} />
      <Bar x={292} y={118} w={44} />
      <Bar x={292} y={132} w={50} />
      <g className="scene__pulse">
        <Chip x={292} y={148} w={40} hue={3} h={14} />
      </g>

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={246} h={5} hue={1} />
    </SceneFrame>
  );
}

/**
 * /services/voice-ai — latency is the product.
 * Two waveforms that overlap, because barge-in is the thing that makes a
 * voice agent feel like a conversation, and a confidence threshold that
 * hands the call to a person.
 */
export function VoiceAiScene() {
  return (
    <SceneFrame label="A caller and an agent speaking over each other, with a handoff to a human when confidence drops">
      <Panel />
      <Wave x={58} y={106} bars={12} hue={5} scale={0.95} />
      <Wave x={58} y={166} bars={12} hue={1} scale={0.8} />

      <path d="M52 136 h296" stroke={line(0.14)} strokeDasharray="4 6" />

      {/* the overlap: both talking at once */}
      <g className="scene__pulse">
        <rect x={150} y={88} width={44} height={96} rx={8} fill={ill(3)} opacity="0.18" />
        <rect x={150} y={88} width={44} height={96} rx={8} fill="none" stroke={ill(3)} strokeWidth="2" />
      </g>

      {/* confidence falling, then a person picks up */}
      <Bars x={210} y={186} heights={[46, 38, 26, 14]} hue={1} w={13} gap={9} />
      <g className="scene__rise">
        <circle cx={330} cy={122} r={15} fill={ill(6)} />
        <path d="M312 168 a18 18 0 0 1 36 0 z" fill={ill(6)} />
        <Chip x={306} y={182} w={48} hue={1} h={14} />
      </g>

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={130} h={5} hue={1} />
    </SceneFrame>
  );
}

/**
 * /services/inference-engineering — the bill tracks usage or it does not.
 * Cost per route, a small model taking the traffic that does not need a
 * large one, and the crossover where self-hosting starts to pay.
 */
export function InferenceScene() {
  return (
    <SceneFrame label="Requests routed to a small model or a large one, with cost per route falling">
      <Panel />
      <Node cx={68} cy={130} r={16} hue={1} solid />
      <Flow d="M86 122 q30 -32 62 -36" hue={1} />
      <Flow d="M86 138 q30 32 62 36" hue={6} delay="scene__d1" />

      {/* small model takes most of it */}
      <rect x={152} y={70} width={60} height={40} rx={10} fill={ill(1)} />
      <rect x={152} y={152} width={78} height={56} rx={10} fill={ill(6)} opacity="0.85" />

      <Chip x={152} y={118} w={40} hue={1} h={13} />
      <Chip x={152} y={216} w={54} hue={6} h={13} />

      {/* the bill, coming down */}
      <g className="scene__rise">
        <rect x={252} y={64} width={104} height={124} rx={10} fill={panel} stroke={line(0.18)} />
        <Bars x={266} y={166} heights={[76, 58, 40, 24]} hue={1} w={14} gap={9} />
        <path d="M266 92 L338 150" stroke={ill(4)} strokeWidth="2.5" strokeLinecap="round" />
      </g>

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={92} h={5} hue={1} />
    </SceneFrame>
  );
}

/**
 * /services/sovereign-ai — everything inside a boundary you own.
 * The whole argument is one dashed line and what is on each side of it.
 */
export function SovereignScene() {
  return (
    <SceneFrame label="Storage, index, weights and inference inside an owned boundary, with an external API outside it">
      <Panel />
      <rect x={48} y={58} width={236} height={144} rx={12} fill="none" stroke={ill(1)} strokeWidth="2" strokeDasharray="7 6" />

      <rect x={66} y={78} width={88} height={44} rx={8} fill={ill(6)} opacity="0.9" />
      <rect x={66} y={136} width={88} height={44} rx={8} fill={ill(6)} opacity="0.9" />
      <rect x={174} y={78} width={92} height={102} rx={8} fill={ill(1)} />
      <circle cx={220} cy={129} r="17" fill={panel} />
      <circle cx={220} cy={129} r="7" fill={ill(1)} className="scene__pulse" />

      <Flow d="M154 100 h18" hue={1} />
      <Flow d="M154 158 h18" hue={1} delay="scene__d1" />

      {/* outside, and not in the path */}
      <rect x={306} y={104} width={56} height={52} rx={10} fill={panel} stroke={line(0.2)} />
      <path d="M318 118 l32 24 M350 118 l-32 24" stroke={ill(4)} strokeWidth="2.5" strokeLinecap="round" />
      <path d="M284 130 h16" stroke={line(0.2)} strokeWidth="2" strokeDasharray="4 5" />

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={236} h={5} hue={1} />
    </SceneFrame>
  );
}
