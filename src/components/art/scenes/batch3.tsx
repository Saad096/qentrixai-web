import { SceneFrame, ill, panel, line } from "./Scene";
import { Panel, Window, Bar, Chip, Node, Doc, Flow, Bars } from "./primitives";

/**
 * Article scenes. Each draws the one idea the piece turns on, not its title.
 * Same grammar as the capability set: one panel, one moving beat, no text.
 */

/** Jev — a model that returns a typed value, not a paragraph. */
export function JevScene() {
  return (
    <SceneFrame label="A model returning a typed value with a confidence score instead of a paragraph of text">
      <Panel />
      {/* the prose answer, and the parse that breaks */}
      <rect x={52} y={64} width={130} height={92} rx={10} fill={panel} stroke={line(0.18)} />
      <Bar x={66} y={84} w={98} />
      <Bar x={66} y={98} w={86} />
      <Bar x={66} y={112} w={102} />
      <Bar x={66} y={126} w={64} />
      <g className="scene__pulse">
        <path d="M188 104 l16 16 M204 104 l-16 16" stroke={ill(4)} strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* the typed return */}
      <rect x={52} y={170} width={130} height={54} rx={10} fill={ill(1)} />
      <rect x={66} y={186} width={48} height={10} rx={5} fill={panel} opacity="0.85" />
      <rect x={66} y={204} width={86} height={6} rx={3} fill={panel} opacity="0.5" />
      <path d="M188 196 l8 8 l14 -16" stroke={ill(1)} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* confidence, which is the part that matters */}
      <rect x={228} y={64} width={130} height={160} rx={10} fill={panel} stroke={line(0.18)} />
      <Bars x={244} y={196} heights={[28, 52, 104, 40]} hue={1} w={20} gap={10} />
      <Bar x={244} y={80} w={62} />
    </SceneFrame>
  );
}

/** MCP — one protocol between agents and systems. */
export function McpScene() {
  return (
    <SceneFrame label="One agent reaching several systems through a single protocol layer">
      <Panel />
      <Node cx={80} cy={130} r={20} hue={1} solid />
      <Flow d="M104 130 h40" hue={1} />
      <rect x={148} y={72} width={44} height={116} rx={10} fill={ill(1)} />
      {[0, 1, 2].map((i) => (
        <Flow key={i} d={`M196 ${96 + i * 34} h44`} hue={6} delay={(["scene__d1", "scene__d2", "scene__d3"] as const)[i]} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={246} y={80 + i * 34} width={104} height={28} rx={8} fill={ill(6)} opacity="0.9" />
          <Bar x={258} y={91 + i * 34} w={46} o={0.4} />
        </g>
      ))}
      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={220} h={5} hue={1} />
    </SceneFrame>
  );
}

/** Context engineering — what the model is shown, assembled. */
export function ContextScene() {
  return (
    <SceneFrame label="Memory, retrieval and tools assembled into the context a model is given">
      <Panel />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={52} y={74 + i * 48} width={86} height={38} rx={9} fill={ill([3, 5, 6][i] as 3 | 5 | 6)} opacity="0.92" />
          <Flow d={`M142 ${93 + i * 48} q34 0 48 ${37 - i * 48 + 0}`} hue={1} delay={(["scene__d1", "scene__d2", "scene__d3"] as const)[i]} />
        </g>
      ))}
      <rect x={196} y={92} width={72} height={84} rx={10} fill={ill(1)} />
      <Flow d="M274 134 h30" hue={1} />
      <Node cx={330} cy={134} r={22} hue={1} />
      <circle cx={330} cy={134} r="8" fill={ill(1)} className="scene__pulse" />
      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={252} h={5} hue={1} />
    </SceneFrame>
  );
}

/** Computer-use agents — narrow work, watched. */
export function ComputerUseScene() {
  return (
    <SceneFrame label="An agent driving a screen through a short, watched sequence of steps">
      <Panel />
      <Window x={56} y={64} w={190} h={140} hue={1} />
      <Bar x={72} y={106} w={108} />
      <Bar x={72} y={122} w={84} />
      <Chip x={72} y={144} w={56} hue={1} h={16} />
      {/* the pointer, doing one narrow thing */}
      <g className="scene__rise">
        <path d="M150 158 l0 26 l7 -7 l6 12 l6 -3 l-6 -12 l9 -1 z" fill={ill(3)} />
      </g>
      {/* the short sequence, and a human watching the end of it */}
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={288} cy={92 + i * 40} r="9" fill={i === 2 ? panel : ill(1)} stroke={ill(1)} strokeWidth="2.5" />
      ))}
      <path d="M288 101 v22 M288 141 v22" stroke={ill(1)} strokeWidth="2" strokeDasharray="4 5" />
      <circle cx={330} cy={172} r={13} fill={ill(6)} />
      <path d="M312 208 a18 18 0 0 1 36 0 z" fill={ill(6)} />
      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={128} h={5} hue={1} />
    </SceneFrame>
  );
}

/** Production-ready, not demos — the gap after the demo. */
export function ProductionScene() {
  return (
    <SceneFrame label="A demo on one side of a gap and a production system on the other, bridged by tests and tracing">
      <Panel />
      <rect x={52} y={92} width={92} height={70} rx={10} fill={ill(6)} opacity="0.9" />
      <Bar x={66} y={116} w={56} o={0.4} />
      <Bar x={66} y={132} w={40} o={0.4} />

      {/* the gap */}
      <path d="M152 162 l0 34 M248 162 l0 34" stroke={line(0.2)} strokeWidth="2" />
      <Flow d="M152 127 h96" hue={1} />
      <g className="scene__pulse">
        <rect x={168} y={182} width={64} height={22} rx={7} fill={ill(3)} />
      </g>

      <rect x={256} y={80} width={96} height={94} rx={10} fill={ill(1)} />
      <path d="M280 124 l9 10 l22 -24" stroke={panel} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={272} h={5} hue={1} />
    </SceneFrame>
  );
}

/** Agentic automation — a process a person used to carry. */
export function AgenticAutomationScene() {
  return (
    <SceneFrame label="A repeated multi-step process running unattended, with one step held for approval">
      <Panel />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={56 + i * 78} y={104} width={58} height={52} rx={10} fill={i === 2 ? ill(3) : ill(1)} opacity={i === 2 ? 1 : 0.92} />
          {i < 3 && <Flow d={`M${118 + i * 78} 130 h14`} hue={1} delay={(["scene__d1", "scene__d2", "scene__d3"] as const)[i]} />}
        </g>
      ))}
      <g className="scene__pulse">
        <circle cx={241} cy={80} r={12} fill={ill(3)} />
        <path d="M235 80 l4 5 l9 -10" stroke={panel} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <path d="M56 186 h288" stroke={line(0.16)} strokeDasharray="4 6" />
      <Chip x={56} y={198} w={72} hue={6} h={15} />
      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={234} h={5} hue={1} />
    </SceneFrame>
  );
}

/** RAG in the enterprise — what actually works. */
export function RagEnterpriseScene() {
  return (
    <SceneFrame label="Hybrid keyword and vector retrieval, reranked, answering with a citation">
      <Panel />
      <Doc x={52} y={80} hue={6} w={40} h={50} lines={3} />
      <Doc x={52} y={144} hue={6} w={40} h={50} lines={3} />
      {/* two retrievers, because each fails where the other works */}
      <rect x={112} y={82} width={70} height={44} rx={9} fill={ill(5)} />
      <rect x={112} y={148} width={70} height={44} rx={9} fill={ill(3)} />
      <Flow d="M186 104 q26 0 26 26" hue={1} />
      <Flow d="M186 170 q26 0 26 -26" hue={1} delay="scene__d1" />
      {/* rerank, then answer */}
      <rect x={212} y={108} width={52} height={52} rx={10} fill={ill(1)} />
      <Flow d="M270 134 h24" hue={1} delay="scene__d2" />
      <rect x={300} y={92} width={58} height={84} rx={10} fill={panel} stroke={line(0.18)} />
      <Bar x={312} y={110} w={34} />
      <Bar x={312} y={124} w={28} />
      <g className="scene__pulse">
        <Chip x={312} y={144} w={34} hue={3} h={13} />
      </g>
      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={258} h={5} hue={1} />
    </SceneFrame>
  );
}

/** Voice AI for call centres — containment, and the zero-press. */
export function CallCentreScene() {
  return (
    <SceneFrame label="Calls contained by intent, with the ones that are not routed to a person">
      <Panel />
      <Node cx={72} cy={130} r={18} hue={1} solid />
      {[0, 1, 2].map((i) => (
        <Flow key={i} d={`M94 130 q30 0 44 ${-44 + i * 44}`} hue={1} delay={(["scene__d1", "scene__d2", "scene__d3"] as const)[i]} />
      ))}
      {[0, 1].map((i) => (
        <rect key={i} x={146} y={72 + i * 92} width={84} height={44} rx={10} fill={ill(1)} />
      ))}
      <rect x={146} y={118} width={84} height={44} rx={10} fill={ill(6)} opacity="0.9" />
      <Bars x={252} y={186} heights={[92, 66, 30]} hue={1} w={26} gap={18} />
      <g className="scene__pulse">
        <circle cx={330} cy={84} r={13} fill={ill(6)} />
        <path d="M312 120 a18 18 0 0 1 36 0 z" fill={ill(6)} />
      </g>
      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={196} h={5} hue={1} />
    </SceneFrame>
  );
}

/** MLOps and observability — read what happened at 3am. */
export function ObservabilityScene() {
  return (
    <SceneFrame label="A trace of one request across services, with the slow span highlighted">
      <Panel />
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <Bar x={56} y={80 + i * 28} w={44} o={0.3} />
          <rect
            x={112 + i * 16}
            y={76 + i * 28}
            width={[70, 96, 132, 58, 44][i]}
            height={14}
            rx={7}
            fill={i === 2 ? ill(4) : ill(1)}
            opacity={i === 2 ? 1 : 0.85}
          />
        </g>
      ))}
      <path d="M56 218 h288" stroke={line(0.16)} />
      <g className="scene__pulse">
        <path d="M244 68 v150" stroke={ill(4)} strokeWidth="2" strokeDasharray="5 5" />
      </g>
      <Chip x={56} y={228} w={60} hue={6} h={14} />
    </SceneFrame>
  );
}

/** Build an AI MVP safely — cut scope while it is cheap. */
export function MvpSafelyScene() {
  return (
    <SceneFrame label="A wide scope narrowed to one workflow before the build starts">
      <Panel />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={56}
          y={74 + i * 40}
          width={120}
          height={30}
          rx={8}
          fill={i === 1 ? ill(1) : ill(6)}
          opacity={i === 1 ? 1 : 0.55}
        />
      ))}
      <Flow d="M186 118 h40" hue={1} />
      <rect x={236} y={92} width={116} height={92} rx={12} fill={ill(1)} />
      <path d="M262 138 l10 11 l26 -28" stroke={panel} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <g className="scene__pulse">
        <Chip x={56} y={228} w={64} hue={3} h={15} />
      </g>
      <Bar x={132} y={231} w={220} h={5} o={0.16} />
    </SceneFrame>
  );
}

/** AI product roadmap — sequenced by what could invalidate it. */
export function RoadmapScene() {
  return (
    <SceneFrame label="A roadmap sequenced so the cheapest invalidating test comes first">
      <Panel />
      <path d="M56 178 h288" stroke={line(0.18)} strokeWidth="2" />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <circle cx={84 + i * 76} cy={178} r={i === 0 ? 11 : 8} fill={i === 0 ? ill(3) : ill(1)} />
          <rect x={62 + i * 76} y={104 + i * 14} width={46} height={{ 0: 52, 1: 40, 2: 30, 3: 22 }[i as 0 | 1 | 2 | 3]} rx={8} fill={ill(1)} opacity={0.85 - i * 0.15} />
        </g>
      ))}
      <g className="scene__pulse">
        <rect x={62} y={76} width={46} height={20} rx={6} fill={ill(3)} />
      </g>
      <Bar x={52} y={228} w={300} h={5} o={0.16} />
      <Bar x={52} y={228} w={96} h={5} hue={1} />
    </SceneFrame>
  );
}

/** Edge AI vs cloud — when the round trip is the problem. */
export function EdgeVsCloudScene() {
  return (
    <SceneFrame label="The same decision made on a device and in the cloud, with the round trip drawn">
      <Panel />
      <rect x={52} y={88} width={104} height={84} rx={12} fill={ill(1)} />
      <circle cx={104} cy={130} r={16} fill={panel} />
      <circle cx={104} cy={130} r="7" fill={ill(1)} className="scene__pulse" />
      <Chip x={52} y={182} w={54} hue={1} h={14} />

      <path d="M166 130 h68" stroke={ill(4)} strokeWidth="2" strokeDasharray="6 7" className="scene__trace" />
      <path d="M234 122 l10 8 l-10 8" stroke={ill(4)} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      <rect x={248} y={80} width={104} height={100} rx={14} fill={ill(6)} opacity="0.85" />
      <Bar x={266} y={108} w={68} o={0.4} />
      <Bar x={266} y={126} w={52} o={0.4} />
      <Chip x={266} y={148} w={44} hue={4} h={14} />
      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={118} h={5} hue={1} />
    </SceneFrame>
  );
}
