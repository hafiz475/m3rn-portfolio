import React from 'react';
import { Art, Arrow, Box, Check, Chip, Lock, Pulse, T } from './primitives';
import { BG, DANGER, INK, LINE, MUTED, PANEL, PANEL_2, WARN, WHATSAPP } from './palette';

interface FigureProps {
  className?: string;
}

/** Labelled box used by the flow diagrams. */
const Node: React.FC<{ x: number; y: number; w: number; h: number; title: string; sub?: string; tone?: string; fill?: string }> = ({
  x,
  y,
  w,
  h,
  title,
  sub,
  tone,
  fill = PANEL,
}) => (
  <g>
    <Box x={x} y={y} w={w} h={h} r={18} fill={fill} stroke={tone ?? LINE} strokeWidth={tone ? 2 : 1.5} />
    <T x={x + w / 2} y={sub ? y + h / 2 - 4 : y + h / 2 + 8} size={23} weight={600} anchor="middle">
      {title}
    </T>
    {sub && (
      <T x={x + w / 2} y={y + h / 2 + 26} size={17} anchor="middle" fill={MUTED}>
        {sub}
      </T>
    )}
  </g>
);

const SIRAT = '#6CC3AE';

export const SiratReviewFigure: React.FC<FigureProps> = ({ className }) => (
  <Art label="Diagram: the six-step intake leads to a review screen; the person then chooses to open WhatsApp or copy the details" hue={SIRAT} width={1200} height={470} fit="contain" className={className}>
    <Node x={30} y={150} w={260} h={110} title="Six-step intake" sub="essentials only" />
    <Arrow d="M290 205 L348 205" head={[350, 205, 0]} color={MUTED} />
    <Node x={350} y={150} w={260} h={110} title="Review screen" sub="see every answer first" />
    <Arrow d="M610 205 L668 205" head={[670, 205, 0]} color={MUTED} />
    <Node x={670} y={150} w={220} h={110} title="Person chooses" sub="nothing sent silently" tone={SIRAT} />
    <Arrow d="M890 190 C 920 190, 920 115, 950 115" head={[950, 115, 0]} color={WHATSAPP} />
    <Arrow d="M890 220 C 920 220, 920 295, 950 295" head={[950, 295, 0]} color={MUTED} />
    <Node x={950} y={60} w={220} h={110} title="Open WhatsApp" sub="if a number is set" tone={WHATSAPP} />
    <Node x={950} y={240} w={220} h={110} title="Copy details" sub="if no number is set" />
    <path d="M160 262 L160 378" stroke={WARN} strokeWidth={2} strokeDasharray="6 6" />
    <Box x={30} y={380} w={600} h={64} r={16} fill="#221B0A" stroke={WARN} />
    <T x={50} y={419} size={19} fill="#F3D58A">
      Crisis support → emergency notice, urgency required
    </T>
  </Art>
);

const D7 = '#6FA8DC';

export const Direction7SourceFigure: React.FC<FigureProps> = ({ className }) => (
  <Art label="Diagram: one inbox query on the server feeds both the header badges and the inbox tabs, so they can't disagree" hue={D7} width={1200} height={500} fit="contain" className={className}>
    <Node x={40} y={170} w={300} h={120} title="Inbox query" sub="runs on the server" tone={D7} />
    <Arrow d="M340 210 C 420 210, 440 115, 520 115" head={[520, 115, 0]} color={D7} flow />
    <Arrow d="M340 250 C 420 250, 440 345, 520 345" head={[520, 345, 0]} color={D7} flow />
    <Node x={520} y={60} w={320} h={110} title="Header badges" sub="3 unread · 12 pending" />
    <Node x={520} y={290} w={320} h={110} title="Inbox tabs" sub="Pending 12 · Responded 31" />
    <path d="M840 115 C 890 115, 890 230, 928 230" fill="none" stroke={LINE} strokeWidth={2} />
    <Arrow d="M840 345 C 890 345, 890 230, 928 230" head={[930, 230, 0]} color={MUTED} />
    <Box x={930} y={175} w={250} h={110} r={20} fill="#0E1825" stroke={D7} strokeWidth={2} />
    <circle cx={962} cy={213} r={15} fill={D7} />
    <Check x={962} y={213} s={0.85} color={BG} />
    <T x={986} y={221} size={22} weight={600}>
      Can't disagree
    </T>
    <T x={952} y={258} size={17} fill={MUTED}>
      14 / 14 sellers match
    </T>
    <T x={40} y={462} size={19} fill={MUTED} strike>
      Before: the header downloaded the whole inbox to draw two badges
    </T>
  </Art>
);

const BIZ = '#4FC38A';

const MiniNode: React.FC<{ x: number; y: number; label: string; error?: boolean }> = ({ x, y, label, error }) => (
  <g>
    <rect x={x} y={y} width={200} height={56} rx={12} fill={PANEL_2} stroke={error ? DANGER : LINE} strokeWidth={error ? 2.5 : 1.5} />
    <rect x={x} y={y + 12} width={4} height={32} rx={2} fill={error ? DANGER : BIZ} />
    <T x={x + 20} y={y + 35} size={19} weight={600}>
      {label}
    </T>
    {error && (
      <g>
        <circle cx={x + 196} cy={y + 4} r={14} fill={DANGER} />
        <T x={x + 196} y={y + 10} size={17} weight={800} anchor="middle" fill={BG}>
          !
        </T>
      </g>
    )}
  </g>
);

const MiniFlow: React.FC<{ x: number; error?: boolean }> = ({ x, error }) => (
  <g>
    <path d={`M${x + 100} 196 L${x + 100} 240`} stroke={LINE} strokeWidth={2} />
    <path d={`M${x + 200} 268 L${x + 250} 268`} stroke={LINE} strokeWidth={2} />
    <path d={`M${x + 350} 296 L${x + 350} 340`} stroke={error ? DANGER : LINE} strokeWidth={2} />
    <MiniNode x={x} y={140} label="Start" />
    <MiniNode x={x} y={240} label="Ask a question" />
    <MiniNode x={x + 250} y={240} label="Shopify" />
    <MiniNode x={x + 250} y={340} label={error ? 'Google Sheets' : 'Send status'} error={error} />
  </g>
);

export const BotDraftLiveFigure: React.FC<FigureProps> = ({ className }) => (
  <Art label="Diagram: the live bot is shown read-only beside the draft; an error marker in the draft blocks publishing" hue={BIZ} width={1200} height={500} fit="contain" className={className}>
    <Box x={30} y={30} w={540} h={440} r={22} fill={PANEL} />
    <T x={60} y={76} size={22} weight={600}>
      Live
    </T>
    <Lock x={118} y={68} s={0.9} color={MUTED} />
    <T x={136} y={76} size={17} fill={MUTED}>
      read-only
    </T>
    <line x1={30} x2={570} y1={100} y2={100} stroke={LINE} />
    <g opacity={0.7}>
      <MiniFlow x={60} />
    </g>

    <Box x={630} y={30} w={540} h={440} r={22} fill={PANEL} stroke={BIZ} strokeWidth={2} />
    <T x={660} y={76} size={22} weight={600}>
      Draft
    </T>
    <circle cx={734} cy={69} r={6} fill={BIZ} />
    <T x={750} y={76} size={17} fill={MUTED}>
      autosaves 300 ms after an edit
    </T>
    <line x1={630} x2={1170} y1={100} y2={100} stroke={LINE} />
    <MiniFlow x={660} error />
    <rect x={660} y={404} width={226} height={44} rx={22} fill="#262A32" />
    <Lock x={690} y={422} s={0.8} color={MUTED} />
    <T x={708} y={433} size={17} weight={600} fill={MUTED}>
      Publish · 1 issue
    </T>
  </Art>
);

const PIPE = '#F07178';
const STACK = '#4FC38A';

export const HelpRuleFigure: React.FC<FigureProps> = ({ className }) => (
  <Art label="Diagram: before, one node fanned into nine threads; now up to three children stay keywords and more than three become one ordered card" hue={PIPE} width={1200} height={480} fit="contain" className={className}>
    <T x={40} y={50} size={20} weight={600} fill={MUTED}>
      Before
    </T>
    <T x={430} y={50} size={20} weight={600} fill={MUTED}>
      Up to 3 children
    </T>
    <T x={820} y={50} size={20} weight={600} fill={MUTED}>
      More than 3
    </T>

    {Array.from({ length: 9 }, (_, i) => (
      <g key={i}>
        <path d={`M110 260 C 200 ${420 - i * 40}, 260 ${80 + i * 42}, 350 ${90 + i * 40}`} fill="none" stroke={PIPE} strokeOpacity={0.5} strokeWidth={2} />
        <circle cx={350} cy={90 + i * 40} r={5} fill={PIPE} opacity={0.7} />
      </g>
    ))}
    <circle cx={110} cy={260} r={26} fill={PANEL_2} stroke={PIPE} strokeWidth={2.5} />
    <T x={40} y={455} size={19} fill={MUTED}>
      9 overlapping threads
    </T>

    {['Call stack', 'Frames', 'Calls'].map((k, i) => (
      <g key={k}>
        <path d={`M480 260 L590 ${190 + i * 70}`} stroke={STACK} strokeOpacity={0.6} strokeWidth={2} />
        <Chip x={590} y={170 + i * 70} w={160} h={40} label={k} size={18} hue={STACK} fill={PANEL} />
      </g>
    ))}
    <circle cx={480} cy={260} r={26} fill={PANEL_2} stroke={STACK} strokeWidth={2.5} />
    <T x={430} y={455} size={19} fill={MUTED}>
      stay as keywords
    </T>

    <path d="M876 260 L930 260" stroke={PIPE} strokeWidth={2.5} />
    <circle cx={850} cy={260} r={26} fill={PANEL_2} stroke={PIPE} strokeWidth={2.5} />
    <Box x={930} y={70} w={240} h={360} r={18} fill={PANEL} stroke={PIPE} strokeWidth={2} />
    {Array.from({ length: 9 }, (_, i) => (
      <g key={i}>
        <T x={956} y={113 + i * 35} size={16} weight={700} anchor="middle" fill={PIPE}>
          {i + 1}
        </T>
        <rect x={976} y={102 + i * 35} width={150 - (i % 3) * 22} height={12} rx={6} fill="#fff" opacity={0.28} />
      </g>
    ))}
    <T x={820} y={455} size={19} fill={MUTED}>
      become one ordered card
    </T>
  </Art>
);

const CARZ = '#E8B730';

export const CarzIntentFigure: React.FC<FigureProps> = ({ className }) => (
  <Art label="Diagram: four different buttons feed one shared WhatsApp link helper, which opens a chat with a message saying what the visitor wanted and records which button was used" hue={CARZ} width={1200} height={480} fit="contain" className={className}>
    {['Hero · Book your cruise', 'Offer · Ambient lighting', 'Gallery · Seat covers', 'Floating WhatsApp button'].map((label, i) => {
      const y = 50 + i * 80;
      return (
        <g key={label}>
          <Box x={40} y={y} w={300} h={56} r={28} fill={i === 1 ? '#221B0A' : PANEL} stroke={i === 1 ? CARZ : LINE} />
          <T x={190} y={y + 35} size={19} anchor="middle">
            {label}
          </T>
          <path d={`M340 ${y + 28} C 390 ${y + 28}, 390 220, 436 220`} fill="none" stroke={i === 1 ? CARZ : LINE} strokeWidth={2} />
        </g>
      );
    })}
    <polygon points="0,0 -12,-6.5 -12,6.5" fill={CARZ} transform="translate(440 220)" />
    <Box x={440} y={160} w={300} h={120} r={20} fill="#1A1408" stroke={CARZ} strokeWidth={2} />
    <T x={590} y={213} size={20} font="mono" anchor="middle" fill={CARZ}>
      whatsappLink(intent)
    </T>
    <T x={590} y={248} size={17} anchor="middle" fill={MUTED}>
      one shared helper
    </T>
    <Arrow d="M740 205 C 780 205, 780 140, 818 140" head={[820, 140, 0]} color={WHATSAPP} flow />
    <Arrow d="M740 235 C 780 235, 780 320, 818 320" head={[820, 320, 0]} color={CARZ} flow />
    <rect x={820} y={80} width={350} height={120} rx={18} fill="#005C4B" />
    <T x={844} y={128} size={19}>
      Hi CARZ MOTO, I'd like a
    </T>
    <T x={844} y={158} size={19}>
      quote for Ambient Lighting.
    </T>
    <Chip x={820} y={292} w={350} h={56} label="lead event: offer · ambient" size={17} font="mono" hue={CARZ} active />
    <T x={40} y={448} size={19} fill={MUTED} strike>
      Before: every button opened an empty chat, from a link copied into nine files
    </T>
  </Art>
);

const MLJ = '#4FE3F0';

const IslandScene: React.FC<{ x: number; y: number; children: React.ReactNode; kept?: boolean; title: string }> = ({ x, y, children, kept, title }) => (
  <g>
    <rect x={x} y={y} width={360} height={360} rx={22} fill="#071423" stroke={kept ? MLJ : LINE} strokeWidth={kept ? 2.5 : 1.5} />
    <path d={`M${x + 20} ${y + 330} C ${x + 100} ${y + 250}, ${x + 260} ${y + 250}, ${x + 340} ${y + 330} Z`} fill="#132A22" />
    <path d={`M${x + 112} ${y + 300} L${x + 128} ${y + 300} L${x + 124} ${y + 200} L${x + 116} ${y + 200} Z`} fill="#D9DEE5" opacity={0.6} />
    {[0, 90, 180, 270].map((a) => (
      <rect key={a} x={x + 117} y={y + 150} width={6} height={44} rx={2} fill="#C9CED6" opacity={0.55} transform={`rotate(${a + 20} ${x + 120} ${y + 196})`} />
    ))}
    <rect x={x + 220} y={y + 252} width={74} height={50} rx={3} fill="#1B2A36" />
    <path d={`M${x + 214} ${y + 256} L${x + 257} ${y + 226} L${x + 300} ${y + 256} Z`} fill="#24384A" />
    <ellipse cx={x + 260} cy={y + 110} rx={36} ry={8} fill="#C8553D" opacity={0.7} />
    <rect x={x + 222} y={y + 96} width={76} height={5} rx={2.5} fill="#E8D9B5" opacity={0.6} />
    <T x={x + 24} y={y + 44} size={22} weight={700} fill={kept ? MLJ : INK}>
      {title}
    </T>
    {kept && (
      <g>
        <circle cx={x + 326} cy={y + 36} r={16} fill={MLJ} />
        <Check x={x + 326} y={y + 36} s={0.9} color={BG} />
      </g>
    )}
    {children}
  </g>
);

const SIGNAL_POINTS: [number, number][] = [
  [120, 196],
  [262, 288],
  [260, 110],
];

export const MljIterationsFigure: React.FC<FigureProps> = ({ className }) => (
  <Art label="Diagram: three versions of the clickable signal on the island scene: large coloured spheres, faint silver dots, and the kept white dot with a cyan glow" hue={MLJ} width={1200} height={470} fit="contain" className={className}>
    <IslandScene x={40} y={40} title="v1">
      {SIGNAL_POINTS.map(([dx, dy], i) => {
        const color = ['#F07178', '#E8C547', '#6FA8DC'][i];
        return (
          <g key={i}>
            <circle cx={40 + dx} cy={40 + dy} r={40} fill={color} opacity={0.22} />
            <circle cx={40 + dx} cy={40 + dy} r={22} fill={color} opacity={0.9} />
          </g>
        );
      })}
    </IslandScene>
    <IslandScene x={420} y={40} title="v2">
      {SIGNAL_POINTS.map(([dx, dy], i) => (
        <circle key={i} cx={420 + dx} cy={40 + dy} r={4} fill="#C9CED6" opacity={0.45} />
      ))}
    </IslandScene>
    <IslandScene x={800} y={40} title="v3" kept>
      {SIGNAL_POINTS.map(([dx, dy], i) => (
        <Pulse key={i} cx={800 + dx} cy={40 + dy} r={9} color={MLJ} />
      ))}
    </IslandScene>
    <T x={40} y={448} size={19} fill={MUTED}>
      Large coloured spheres: noisy
    </T>
    <T x={420} y={448} size={19} fill={MUTED}>
      Silver dots: nobody saw them
    </T>
    <T x={800} y={448} size={19} fill={MLJ}>
      White dot, cyan glow: kept
    </T>
  </Art>
);
