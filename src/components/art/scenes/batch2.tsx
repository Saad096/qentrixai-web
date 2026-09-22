import { SceneFrame, ill, panel, line } from "./Scene";
import { Panel, Window, Bar, Chip, Node, Doc, Flow, Bars, Wave, Shield } from "./primitives";

/** /services/nlp-document-ai — per field, not per document. */
export function DocumentAiScene() {
  return (
    <SceneFrame label="A scanned form with fields extracted, one scored low and routed to a reviewer">
      <Panel />
      <g className="scene__rise">
        <rect x={54} y={64} width={104} height={132} rx={6} fill={ill(6)} opacity="0.9" transform="rotate(-4 106 130)" />
      </g>
      <rect x={62} y={70} width={100} height={128} rx={6} fill={ill(3)} opacity="0.95" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} x={74} y={88 + i * 26} width={i === 2 ? 52 : 76} height="6" rx="3" fill={panel} opacity="0.5" />
      ))}

      <Flow d="M170 134 h32" hue={1} />

      {/* extracted fields, each scored on its own */}
      <rect x={210} y={70} width={148} height={128} rx={10} fill={panel} stroke={line(0.18)} />
      {[0, 1, 3].map((i) => (
        <g key={i}>
          <Bar x={224} y={88 + i * 28} w={64} />
          <Chip x={306} y={83 + i * 28} w={38} hue={1} h={14} />
        </g>
      ))}
      <g className="scene__pulse">
        <Bar x={224} y={144} w={64} hue={4} />
        <Chip x={306} y={139} w={38} hue={4} h={14} />
      </g>

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={222} h={5} hue={1} />
    </SceneFrame>
  );
}

/** /services/ai-mvp-development — six weeks, ending deployed. */
export function MvpScene() {
  return (
    <SceneFrame label="Six weeks of build, ending in a deployed system rather than a prototype">
      <Panel />
      <path d="M56 176 h288" stroke={line(0.16)} strokeWidth="2" />
      <Bars x={62} y={176} heights={[30, 46, 62, 78, 96, 114]} hue={1} w={30} gap={18} />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <circle key={i} cx={77 + i * 48} cy={176} r="4" fill={ill(1)} />
      ))}

      {/* it ends shipped, not demoed */}
      <g className="scene__rise">
        <rect x={276} y={54} width={84} height={44} rx={10} fill={ill(1)} />
        <path d="M300 76 l7 8 l16 -18" stroke={panel} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Chip x={62} y={196} w={44} hue={6} h={13} />
      <Chip x={296} y={196} w={44} hue={1} h={13} />

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={288} h={5} hue={1} />
    </SceneFrame>
  );
}

/** /services/ai-saas-and-mobile — the product around the model. */
export function SaasMobileScene() {
  return (
    <SceneFrame label="A web app and a mobile client sharing one backend, with billing and quotas">
      <Panel />
      <Window x={52} y={64} w={168} h={122} hue={1} />
      <Bar x={68} y={106} w={84} />
      <Bar x={68} y={122} w={116} />
      <Chip x={68} y={142} w={48} hue={1} h={14} />

      {/* phone */}
      <rect x={240} y={58} width={62} height={124} rx={12} fill={panel} stroke={line(0.2)} />
      <rect x={250} y={78} width={42} height={7} rx={3.5} fill={ill(1)} />
      <Bar x={250} y={94} w={34} />
      <Bar x={250} y={108} w={42} />
      <rect x={262} y={64} width={18} height={3} rx={1.5} fill={line(0.25)} />

      {/* the commercial layer underneath both */}
      <rect x={52} y={198} width={250} height={26} rx={8} fill={ill(6)} opacity="0.85" />
      <Chip x={64} y={203} w={46} hue={3} h={15} />
      <Chip x={120} y={203} w={38} hue={5} h={15} />
      <Chip x={168} y={203} w={52} hue={1} h={15} />

      <Flow d="M136 186 v12" hue={1} />
      <Flow d="M270 182 v16" hue={1} delay="scene__d1" />

      <g className="scene__pulse">
        <circle cx={336} cy={210} r="14" fill={ill(1)} />
      </g>
    </SceneFrame>
  );
}

/** /services/model-training — a held-out set, and a baseline to beat. */
export function TrainingScene() {
  return (
    <SceneFrame label="Training data split from a held-out set, with a curve rising past a baseline">
      <Panel />
      {/* the split */}
      <rect x={52} y={70} width={92} height={54} rx={8} fill={ill(6)} opacity="0.9" />
      <rect x={52} y={134} width={56} height={40} rx={8} fill={ill(3)} />
      <Chip x={52} y={182} w={56} hue={3} h={13} />

      <Flow d="M152 110 h28" hue={1} />

      {/* the curve */}
      <rect x={190} y={62} width={168} height={128} rx={10} fill={panel} stroke={line(0.18)} />
      <path d="M204 176 h140" stroke={line(0.18)} />
      <path d="M204 152 h140" stroke={ill(4)} strokeWidth="2" strokeDasharray="5 5" />
      <path
        d="M204 172 C 232 168, 250 140, 272 124 S 316 96, 344 88"
        fill="none"
        stroke={ill(1)}
        strokeWidth="3"
        strokeLinecap="round"
        className="scene__trace"
        strokeDasharray="200"
      />
      <circle cx={344} cy={88} r="5" fill={ill(1)} className="scene__pulse" />

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={200} h={5} hue={1} />
    </SceneFrame>
  );
}

/** /services/managed-ai-services — someone is watching it. */
export function ManagedScene() {
  return (
    <SceneFrame label="A live system under monitoring, with drift caught and a rollback available">
      <Panel />
      <rect x={52} y={62} width={172} height={128} rx={10} fill={panel} stroke={line(0.18)} />
      <path
        d="M66 150 l22 -14 l20 10 l24 -26 l22 16 l20 -30 l26 12"
        fill="none"
        stroke={ill(1)}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M66 112 h144" stroke={ill(4)} strokeWidth="1.5" strokeDasharray="4 5" />
      <g className="scene__pulse">
        <circle cx={178} cy={96} r="6" fill={ill(4)} />
      </g>
      <Bar x={66} y={166} w={52} />
      <Bar x={126} y={166} w={40} />

      {/* on-call, and a way back */}
      <rect x={244} y={62} width={114} height={58} rx={10} fill={ill(1)} />
      <path d="M268 92 h30 M286 80 l-12 12 l12 12" stroke={panel} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x={244} y={132} width={114} height={58} rx={10} fill={panel} stroke={line(0.18)} />
      <circle cx={272} cy={161} r="11" fill={ill(6)} />
      <Bar x={292} y={152} w={50} />
      <Bar x={292} y={166} w={36} />

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={300} h={5} hue={1} />
    </SceneFrame>
  );
}

/** /services/hire-ai-engineers — senior people, in your repo. */
export function HiringScene() {
  return (
    <SceneFrame label="Two engineers joining an existing team's repository and review process">
      <Panel />
      {/* the existing team */}
      {[0, 1].map((i) => (
        <g key={i}>
          <circle cx={84 + i * 56} cy={100} r={17} fill={ill(6)} />
          <path d={`M${62 + i * 56} 150 a22 22 0 0 1 44 0 z`} fill={ill(6)} />
        </g>
      ))}
      {/* the two who arrive */}
      {[0, 1].map((i) => (
        <g key={i} className={`scene__rise ${i ? "scene__d1" : ""}`}>
          <circle cx={216 + i * 56} cy={100} r={17} fill={ill(1)} />
          <path d={`M${194 + i * 56} 150 a22 22 0 0 1 44 0 z`} fill={ill(1)} />
        </g>
      ))}

      {/* one repo, one review process */}
      <rect x={62} y={172} width={276} height={44} rx={10} fill={panel} stroke={line(0.18)} />
      <Chip x={78} y={186} w={58} hue={1} h={16} />
      <Bar x={148} y={191} w={72} />
      <Chip x={236} y={186} w={44} hue={6} h={16} />
      <Chip x={290} y={186} w={34} hue={3} h={16} />

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={180} h={5} hue={1} />
    </SceneFrame>
  );
}

/** /services/aeo-and-geo — cited, not ranked. */
export function AeoScene() {
  return (
    <SceneFrame label="An assistant answering a question and citing a source, rather than a list of ranked results">
      <Panel />
      <rect x={52} y={62} width={188} height={132} rx={12} fill={panel} stroke={line(0.18)} />
      <Chip x={68} y={80} w={70} hue={5} h={16} />
      <Bar x={68} y={110} w={150} />
      <Bar x={68} y={126} w={126} />
      <Bar x={68} y={142} w={140} />
      {/* the citation, which is the whole point */}
      <g className="scene__pulse">
        <Chip x={68} y={160} w={58} hue={1} h={16} />
      </g>

      <Flow d="M252 128 h26" hue={1} />
      {/* you, as the source */}
      <rect x={288} y={92} width={70} height={74} rx={10} fill={ill(1)} />
      <path d="M304 128 h38 M304 142 h26" stroke={panel} strokeWidth="3" strokeLinecap="round" />
      <circle cx={323} cy={112} r="8" fill={panel} />

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={158} h={5} hue={1} />
    </SceneFrame>
  );
}

/** /services/blockchain-web3 — usually a database, occasionally not. */
export function BlockchainScene() {
  return (
    <SceneFrame label="A chain of signed blocks shared between parties, with one contract under review">
      <Panel />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={58 + i * 92} y={98} width={68} height={68} rx={10} fill={i === 2 ? ill(1) : ill(6)} opacity={i === 2 ? 1 : 0.9} />
          <rect x={70 + i * 92} y={114} width={44} height={5} rx={2.5} fill={panel} opacity="0.55" />
          <rect x={70 + i * 92} y={126} width={32} height={5} rx={2.5} fill={panel} opacity="0.55" />
        </g>
      ))}
      <Flow d="M126 132 h24" hue={1} />
      <Flow d="M218 132 h24" hue={1} delay="scene__d1" />

      {/* audited before it holds value */}
      <g className="scene__rise">
        <Shield cx={334} cy={132} s={1.15} hue={3} />
        <path d="M326 130 l6 7 l13 -15" stroke={panel} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={252} h={5} hue={1} />
    </SceneFrame>
  );
}

/** /services/edge-ai — it answers where the data is. */
export function EdgeScene() {
  return (
    <SceneFrame label="A model running on a device at the edge, still working with the network down">
      <Panel />
      {/* the device, doing the work */}
      <rect x={60} y={92} width={112} height={96} rx={12} fill={ill(1)} />
      <rect x={78} y={116} width={76} height={48} rx={8} fill={panel} />
      <circle cx={116} cy={140} r="12" fill={ill(1)} className="scene__pulse" />
      <Chip x={66} y={198} w={60} hue={1} h={14} />

      {/* the link, down */}
      <path d="M186 140 h52" stroke={line(0.22)} strokeWidth="2" strokeDasharray="5 6" />
      <g>
        <circle cx={212} cy={140} r={13} fill={panel} stroke={ill(4)} strokeWidth="2.5" />
        <path d="M206 134 l12 12 M218 134 l-12 12" stroke={ill(4)} strokeWidth="2.5" strokeLinecap="round" />
      </g>

      {/* the cloud, unreachable and not needed */}
      <g opacity="0.45">
        <rect x={254} y={100} width={104} height={80} rx={12} fill={ill(6)} />
        <rect x={270} y={120} width={72} height={8} rx={4} fill={panel} opacity="0.5" />
        <rect x={270} y={136} width={54} height={8} rx={4} fill={panel} opacity="0.5" />
      </g>

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={132} h={5} hue={1} />
    </SceneFrame>
  );
}

/** /services/cloud-devops-mlops — the deploy stops being one person. */
export function MlopsScene() {
  return (
    <SceneFrame label="A pipeline running tests and evals before deploying, with a tested way back">
      <Panel />
      <Flow d="M92 112 h44" hue={1} />
      <Flow d="M184 112 h44" hue={1} delay="scene__d1" />
      <Flow d="M276 112 h40" hue={1} delay="scene__d2" />
      <Node cx={70} cy={112} hue={6} solid />
      <Node cx={161} cy={112} hue={1} />
      <Node cx={253} cy={112} hue={1} />
      <Node cx={338} cy={112} hue={1} solid />

      {/* the suite that has to pass */}
      <rect x={120} y={156} width={168} height={58} rx={10} fill={panel} stroke={line(0.18)} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx={142 + i * 54} cy={178} r="6" fill={i === 2 ? ill(4) : ill(1)} />
          <Bar x={134 + i * 54} y={194} w={30} />
        </g>
      ))}

      {/* rollback, tested rather than assumed */}
      <path d="M338 134 v44 a10 10 0 0 1 -10 10 h-22" stroke={ill(3)} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M312 178 l-10 10 l10 10" stroke={ill(3)} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={276} h={5} hue={1} />
    </SceneFrame>
  );
}

/** /services/data-science-ml — not everything needs a language model. */
export function DataScienceScene() {
  return (
    <SceneFrame label="A forecast over time series data with a confidence band and a flagged anomaly">
      <Panel />
      <rect x={52} y={62} width={296} height={132} rx={10} fill={panel} stroke={line(0.18)} />
      <path d="M68 178 h264 M68 178 v-100" stroke={line(0.18)} />

      {/* the band, then the line through it */}
      <path d="M78 150 C 130 138, 168 118, 214 108 L 214 138 C 168 148, 130 162, 78 170 Z" fill={ill(1)} opacity="0.18" />
      <path
        d="M78 160 C 130 148, 168 128, 214 122 S 290 96, 330 86"
        fill="none"
        stroke={ill(1)}
        strokeWidth="3"
        strokeLinecap="round"
      />
      {/* the point that does not belong */}
      <g className="scene__pulse">
        <circle cx={268} cy={140} r="7" fill={ill(4)} />
        <circle cx={268} cy={140} r="13" fill="none" stroke={ill(4)} strokeWidth="2" />
      </g>
      <Bars x={78} y={178} heights={[10, 16, 12, 20, 14, 22, 12]} hue={6} w={9} gap={26} />

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={192} h={5} hue={1} />
    </SceneFrame>
  );
}

/** /services/responsible-ai — evidence, not a policy document. */
export function ResponsibleScene() {
  return (
    <SceneFrame label="Safety and bias checks running alongside accuracy, producing an audit trail">
      <Panel />
      <g className="scene__rise">
        <Shield cx={116} cy={126} s={2} hue={1} />
        <path d="M104 124 l9 10 l20 -22" stroke={panel} strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      </g>

      {/* the checks, each measured rather than asserted */}
      <rect x={196} y={64} width={162} height={130} rx={10} fill={panel} stroke={line(0.18)} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <Bar x={212} y={86 + i * 34} w={58} />
          <rect x={282} y={82 + i * 34} width={60} height={10} rx={5} fill={line(0.16)} />
          <rect x={282} y={82 + i * 34} width={[52, 44, 58][i]} height={10} rx={5} fill={ill(1)} />
        </g>
      ))}
      <Chip x={212} y={160} w={70} hue={3} h={15} />

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={228} h={5} hue={1} />
    </SceneFrame>
  );
}

/** /services/no-code-automation — the handoff nobody is paid for. */
export function AutomationScene() {
  return (
    <SceneFrame label="Two systems connected by an automated workflow, with an alert when a step fails">
      <Panel />
      <rect x={52} y={94} width={92} height={78} rx={10} fill={ill(6)} opacity="0.9" />
      <rect x={256} y={94} width={92} height={78} rx={10} fill={ill(6)} opacity="0.9" />
      <Bar x={68} y={118} w={56} o={0.4} />
      <Bar x={68} y={134} w={44} o={0.4} />
      <Bar x={272} y={118} w={56} o={0.4} />
      <Bar x={272} y={134} w={44} o={0.4} />

      <Flow d="M152 116 h96" hue={1} />
      <Flow d="M248 150 h-96" hue={6} delay="scene__d1" />

      {/* the rule in the middle, and the alarm when it breaks */}
      <rect x={168} y={182} width={64} height={34} rx={9} fill={ill(1)} />
      <path d="M186 199 h28 M204 191 l10 8 l-10 8" stroke={panel} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <g className="scene__pulse">
        <circle cx={200} cy={70} r="13" fill={ill(3)} />
        <path d="M200 64 v7 M200 76 v1" stroke={panel} strokeWidth="2.5" strokeLinecap="round" />
      </g>

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={146} h={5} hue={1} />
    </SceneFrame>
  );
}

/** /services/ai-strategy-consulting — a number before a build. */
export function StrategyScene() {
  return (
    <SceneFrame label="Candidate projects compared against a measurable target, and sequenced">
      <Panel />
      {/* options on the table */}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={56} y={70 + i * 46} width={120} height={36} rx={9} fill={i === 1 ? ill(1) : ill(6)} opacity={i === 1 ? 1 : 0.85} />
          <Bar x={70} y={84 + i * 46} w={i === 1 ? 74 : 58} o={0.45} />
        </g>
      ))}

      {/* the bar each has to clear */}
      <path d="M200 76 v130" stroke={line(0.18)} />
      <path d="M200 140 h150" stroke={ill(4)} strokeWidth="2" strokeDasharray="5 5" />
      <Bars x={216} y={206} heights={[38, 96, 56]} hue={1} w={30} gap={22} />
      <g className="scene__pulse">
        <circle cx={261} cy={110} r="6" fill={ill(1)} />
      </g>

      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={112} h={5} hue={1} />
    </SceneFrame>
  );
}
