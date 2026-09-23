import { SceneFrame, ill, panel, line } from "./Scene";
import { Panel, Window, Bar, Chip, Flow } from "./primitives";

/**
 * Industry scenes for the two domains with no honest photograph, and the
 * eight top-level routes. These replace the line-art pass: same subjects,
 * filled and coloured, on the owner's direction that outlines "present no
 * sense".
 */

/** /industries/saas-and-platform — the product around the model. */
export function SaasPlatformScene() {
  return (
    <SceneFrame label="A web app and a mobile client over one backend, with tenancy, billing and a deploy pipeline">
      <Panel />
      <Window x={52} y={58} w={162} h={104} hue={1} />
      <Bar x={68} y={98} w={78} />
      <Bar x={68} y={114} w={110} />
      <Chip x={68} y={132} w={44} hue={1} h={14} />

      <rect x={232} y={52} width={58} height={116} rx={12} fill={panel} stroke={line(0.2)} />
      <rect x={241} y={72} width={40} height={7} rx={3.5} fill={ill(1)} />
      <Bar x={241} y={88} w={32} />
      <Bar x={241} y={102} w={38} />

      {/* one backend under both */}
      <Flow d="M133 168 v14" hue={1} />
      <Flow d="M261 172 v10" hue={1} delay="scene__d1" />
      <rect x={52} y={188} width={238} height={32} rx={9} fill={ill(1)} />
      <Chip x={66} y={196} w={48} hue={3} h={16} />
      <Chip x={122} y={196} w={40} hue={5} h={16} />
      <Chip x={170} y={196} w={56} hue={6} h={16} />

      {/* the pipeline that ships it */}
      <g className="scene__rise">
        <rect x={306} y={64} width={52} height={156} rx={10} fill={panel} stroke={line(0.18)} />
        {[0, 1, 2].map((i) => (
          <circle key={i} cx={332} cy={92 + i * 42} r="9" fill={i === 2 ? ill(1) : ill(6)} />
        ))}
        <path d="M332 101 v24 M332 143 v24" stroke={ill(1)} strokeWidth="2" strokeDasharray="4 5" />
      </g>
    </SceneFrame>
  );
}

/** /industries/ai-automation — rules where it is rules. */
export function AiAutomationScene() {
  return (
    <SceneFrame label="A repeated process running on rules, with a model only at the step that needs judgement">
      <Panel />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect
            x={54 + i * 76}
            y={106}
            width={56}
            height={50}
            rx={10}
            fill={i === 2 ? ill(1) : ill(6)}
            opacity={i === 2 ? 1 : 0.88}
          />
          {i < 3 && <Flow d={`M${114 + i * 76} 131 h12`} hue={1} delay={(["scene__d1", "scene__d2", "scene__d3"] as const)[i]} />}
        </g>
      ))}
      {/* the one step that is judgement, called out */}
      <g className="scene__pulse">
        <rect x={198} y={72} width={68} height={22} rx={11} fill={ill(3)} />
        <path d="M232 94 v10" stroke={ill(3)} strokeWidth="2.5" />
      </g>
      {/* the alarm, because a silent failure is worse than the manual version */}
      <circle cx={334} cy={186} r="13" fill={ill(4)} className="scene__pulse" />
      <path d="M334 180 v7 M334 192 v1" stroke={panel} strokeWidth="2.5" strokeLinecap="round" />
      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={228} h={5} hue={1} />
    </SceneFrame>
  );
}

/** /services — four groups, wired where they ship together. */
export function ServicesIndexScene() {
  return (
    <SceneFrame label="Four groups of capabilities, wired together where they ship as one engagement">
      <Panel />
      {[[52, 62], [212, 62], [52, 146], [212, 146]].map(([x, y], i) => (
        <g key={i}>
          <rect x={x} y={y} width={136} height={68} rx={12} fill={i === 0 ? ill(1) : ill(6)} opacity={i === 0 ? 1 : 0.88} />
          <Bar x={x + 16} y={y + 18} w={72} o={0.45} />
          <Bar x={x + 16} y={y + 34} w={92} o={0.45} />
          <Bar x={x + 16} y={y + 50} w={54} o={0.45} />
        </g>
      ))}
      <Flow d="M188 96 h24" hue={1} />
      <Flow d="M120 130 v16" hue={1} delay="scene__d1" />
      <Flow d="M280 130 v16" hue={1} delay="scene__d2" />
      <Flow d="M188 180 h24" hue={1} delay="scene__d3" />
      <Bar x={52} y={232} w={300} h={5} o={0.16} />
      <Bar x={52} y={232} w={240} h={5} hue={1} />
    </SceneFrame>
  );
}

/** /industries — a field, a ward, a rack, a headset. */
export function IndustriesIndexScene() {
  return (
    <SceneFrame label="Four domains side by side: a field, a hospital bay, a server rack and a contact centre">
      <Panel />
      {[ill(1), ill(3), ill(5), ill(4)].map((c, i) => (
        <g key={i}>
          <rect x={48 + i * 78} y={78} width={62} height={104} rx={12} fill={c} opacity="0.92" />
          <rect x={60 + i * 78} y={{ 0: 140, 1: 122, 2: 106, 3: 132 }[i as 0 | 1 | 2 | 3]} width={38} height={8} rx={4} fill={panel} opacity="0.6" />
          <rect x={60 + i * 78} y={{ 0: 154, 1: 136, 2: 120, 3: 146 }[i as 0 | 1 | 2 | 3]} width={26} height={8} rx={4} fill={panel} opacity="0.6" />
        </g>
      ))}
      <g className="scene__rise">
        <rect x={48} y={198} width={296} height={24} rx={8} fill={panel} stroke={line(0.18)} />
        <Bar x={62} y={206} w={80} hue={1} />
        <Bar x={154} y={206} w={60} />
        <Bar x={226} y={206} w={96} />
      </g>
    </SceneFrame>
  );
}

/** /case-studies — problem, build, handover. */
export function CaseStudiesIndexScene() {
  return (
    <SceneFrame label="A delivery timeline with the artifact handed over at each phase">
      <Panel />
      <path d="M56 130 h288" stroke={line(0.18)} strokeWidth="2" />
      <path d="M56 130 h216" stroke={ill(1)} strokeWidth="3" strokeLinecap="round" />
      {[0, 1, 2, 3].map((i) => (
        <circle key={i} cx={74 + i * 74} cy={130} r={i === 3 ? 7 : 10} fill={i === 3 ? ill(6) : ill(1)} />
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i} className={i ? `scene__rise scene__d${i}` : "scene__rise"}>
          <rect x={48 + i * 74} y={158} width={56} height={52} rx={9} fill={ill([6, 3, 5][i] as 6 | 3 | 5)} opacity="0.92" />
          <rect x={58 + i * 74} y={174} width={36} height={5} rx={2.5} fill={panel} opacity="0.6" />
          <rect x={58 + i * 74} y={186} width={26} height={5} rx={2.5} fill={panel} opacity="0.6" />
        </g>
      ))}
      <rect x={48} y={68} width={182} height={40} rx={10} fill={ill(1)} opacity="0.18" />
      <Bar x={62} y={84} w={86} hue={1} />
    </SceneFrame>
  );
}

/** /products — eleven, operated. */
export function ProductsIndexScene() {
  return (
    <SceneFrame label="A laptop, tablet and phone on a shelf, running software we operate">
      <Panel />
      <rect x={52} y={78} width={148} height={92} rx={10} fill={ill(1)} />
      <rect x={66} y={94} width={120} height={60} rx={6} fill={panel} />
      <Bar x={78} y={108} w={62} />
      <Bar x={78} y={122} w={88} />
      <Chip x={78} y={136} w={40} hue={1} h={12} />
      <path d="M40 182 h172 l-10 -12 h-152 z" fill={ill(6)} opacity="0.85" />

      <rect x={222} y={86} width={62} height={96} rx={10} fill={ill(5)} />
      <rect x={232} y={100} width={42} height={62} rx={5} fill={panel} />
      <rect x={302} y={104} width={48} height={78} rx={10} fill={ill(3)} />
      <rect x={310} y={116} width={32} height={50} rx={4} fill={panel} />

      <path d="M36 192 h330" stroke={line(0.2)} strokeWidth="2" />
      <g className="scene__pulse">
        <circle cx={340} cy={96} r="7" fill={ill(1)} />
      </g>
    </SceneFrame>
  );
}

/** /blogs — the desk a field note is written at. */
export function BlogsIndexScene() {
  return (
    <SceneFrame label="A notebook and a terminal window on a desk, with a mug beside them">
      <Panel />
      <rect x={52} y={118} width={118} height={92} rx={8} fill={ill(3)} />
      <path d="M111 118 v92" stroke={panel} strokeWidth="2" opacity="0.5" />
      <rect x={64} y={138} width={34} height={5} rx={2.5} fill={panel} opacity="0.6" />
      <rect x={64} y={152} width={28} height={5} rx={2.5} fill={panel} opacity="0.6" />
      <rect x={122} y={138} width={34} height={5} rx={2.5} fill={panel} opacity="0.6" />
      <rect x={122} y={152} width={38} height={5} rx={2.5} fill={panel} opacity="0.6" />

      <Window x={190} y={72} w={164} h={132} hue={1} />
      <Bar x={206} y={116} w={64} hue={1} />
      <Bar x={206} y={132} w={96} />
      <Bar x={206} y={148} w={48} />
      <g className="scene__pulse">
        <rect x={206} y={166} width={10} height={12} rx={2} fill={ill(1)} />
      </g>

      <rect x={64} y={64} width={44} height={38} rx={6} fill={ill(6)} />
      <path d="M108 74 h12 a10 10 0 0 1 0 20 h-12" fill="none" stroke={ill(6)} strokeWidth="5" />
      <path d="M36 218 h330" stroke={line(0.2)} strokeWidth="2" />
    </SceneFrame>
  );
}

/** /contact — a brief in, a reply out. */
export function ContactIndexScene() {
  return (
    <SceneFrame label="An envelope with a reply going back, beside pins for the two offices">
      <Panel />
      <rect x={52} y={92} width={158} height={104} rx={10} fill={ill(1)} />
      <path d="M52 100 l79 56 l79 -56" fill="none" stroke={panel} strokeWidth="3" strokeLinejoin="round" />
      <Flow d="M222 144 h34" hue={1} />
      <path d="M252 136 l10 8 l-10 8" fill="none" stroke={ill(1)} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />

      {[{ x: 292, y: 92, c: ill(3) }, { x: 316, y: 152, c: ill(5) }].map((p, i) => (
        <g key={i} className={i ? "scene__rise scene__d1" : "scene__rise"}>
          <circle cx={p.x} cy={p.y} r={17} fill={p.c} />
          <circle cx={p.x} cy={p.y} r="6" fill={panel} />
          <path d={`M${p.x - 9} ${p.y + 14} l9 18 l9 -18 z`} fill={p.c} />
        </g>
      ))}
      <path d="M296 118 l22 22" stroke={line(0.22)} strokeWidth="2" strokeDasharray="4 5" />
    </SceneFrame>
  );
}

/** /book — thirty minutes, and which one. */
export function BookIndexScene() {
  return (
    <SceneFrame label="A month grid with one slot taken, beside a clock reading thirty minutes">
      <Panel />
      <rect x={52} y={70} width={186} height={144} rx={12} fill={panel} stroke={line(0.18)} />
      <rect x={52} y={70} width={186} height={30} rx={12} fill={ill(1)} />
      <rect x={52} y={88} width={186} height={12} fill={ill(1)} />
      {[0, 1, 2].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <rect
            key={`${r}-${c}`}
            x={68 + c * 42}
            y={112 + r * 34}
            width={30}
            height={24}
            rx={5}
            fill={r === 1 && c === 2 ? ill(1) : ill(6)}
            opacity={r === 1 && c === 2 ? 1 : 0.4}
            className={r === 1 && c === 2 ? "scene__pulse" : undefined}
          />
        ))
      )}
      <circle cx={312} cy={142} r={46} fill={ill(6)} opacity="0.9" />
      <circle cx={312} cy={142} r={36} fill={panel} />
      <path d="M312 118 v24 l18 11" fill="none" stroke={ill(1)} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </SceneFrame>
  );
}

/** /careers — two chairs, one screen. */
export function CareersIndexScene() {
  return (
    <SceneFrame label="Two people at one screen, with a whiteboard behind them">
      <Panel />
      <rect x={214} y={58} width={140} height={96} rx={10} fill={ill(6)} opacity="0.85" />
      <Bar x={230} y={80} w={62} o={0.5} />
      <Bar x={230} y={96} w={90} o={0.5} />
      <Bar x={230} y={112} w={44} o={0.5} />

      <rect x={52} y={72} width={134} height={88} rx={10} fill={ill(1)} />
      <rect x={64} y={86} width={110} height={60} rx={6} fill={panel} />
      <Bar x={76} y={100} w={56} hue={1} />
      <Bar x={76} y={114} w={78} />
      <rect x={104} y={160} width={30} height={10} rx={3} fill={ill(1)} />
      <path d="M72 178 h94" stroke={line(0.2)} strokeWidth="3" strokeLinecap="round" />

      {[0, 1].map((i) => (
        <g key={i} className={i ? "scene__rise scene__d1" : "scene__rise"}>
          <circle cx={92 + i * 62} cy={200} r={15} fill={i ? ill(3) : ill(5)} />
          <path d={`M${72 + i * 62} 236 a20 20 0 0 1 40 0 z`} fill={i ? ill(3) : ill(5)} />
        </g>
      ))}
    </SceneFrame>
  );
}
