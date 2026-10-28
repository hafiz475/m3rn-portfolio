import React from 'react';
import { Art, Arrow, Bar, Box, Check, Chip, Lock, Pulse, T, WhatsAppGlyph } from './primitives';
import { BG, DANGER, FAINT, INK, LINE, MUTED, PANEL, PANEL_2, WARN, WHATSAPP } from './palette';

interface CoverProps {
  className?: string;
}

const SIRAT = '#6CC3AE';

export const SiratCover: React.FC<CoverProps> = ({ className }) => (
  <Art
    label="Illustration: Sirat's gentle booking intake, with an “I'm not sure yet” option and a review screen before anything is sent"
    hue={SIRAT}
    glow={[0.5, 0.55]}
    className={className}
  >
    {/* The journey path behind everything */}
    <path
      d="M40 590 C 260 470, 380 640, 620 540 S 980 330, 1170 250"
      fill="none"
      stroke={SIRAT}
      strokeOpacity={0.4}
      strokeWidth={3}
      strokeDasharray="2 12"
      strokeLinecap="round"
    />

    {/* Expectation note */}
    <g className="ill-float">
      <Box x={80} y={120} w={300} h={100} r={18} />
      <T x={104} y={152} size={12} font="mono" fill={MUTED} spacing={1.5}>
        BEFORE YOU START
      </T>
      <T x={104} y={180} size={17}>
        This is a request,
      </T>
      <T x={104} y={203} size={17}>
        not an instant confirmation.
      </T>
    </g>

    {/* Intake step card */}
    <Box x={400} y={100} w={400} h={470} r={28} fill={PANEL} />
    {[0, 1, 2, 3, 4, 5].map((i) => (
      <rect key={i} x={432 + i * 57.6} y={136} width={49} height={6} rx={3} fill={i === 0 ? SIRAT : '#fff'} opacity={i === 0 ? 1 : 0.12} />
    ))}
    <T x={432} y={180} size={12} font="mono" fill={MUTED} spacing={1.5}>
      STEP 1 OF 6
    </T>
    <T x={432} y={226} size={40} font="serif" italic>
      A gentle beginning
    </T>
    <Box x={432} y={250} w={336} h={54} r={14} fill={SIRAT} fillOpacity={0.1} stroke={SIRAT} opacity={0.9} />
    <circle cx={457} cy={277} r={8} fill={SIRAT} />
    <T x={476} y={282} size={15}>
      You do not need clinical words.
    </T>
    <T x={432} y={344} size={15} fill={MUTED}>
      Who is the support for?
    </T>
    <Chip x={432} y={362} w={162} h={42} label="Individual" />
    <Chip x={606} y={362} w={162} h={42} label="Couple" />
    <Chip x={432} y={414} w={162} h={42} label="Workplace" />
    <Chip x={606} y={414} w={162} h={42} label="I'm not sure yet" hue={SIRAT} active />
    <Check x={754} y={431} s={0.8} color={SIRAT} />
    <rect x={432} y={490} width={336} height={48} rx={24} fill={SIRAT} />
    <T x={600} y={520} size={16} weight={600} anchor="middle" fill={BG}>
      Continue
    </T>

    {/* Review before sending */}
    <g className="ill-float" style={{ animationDelay: '-3s' }}>
      <Box x={830} y={300} w={290} h={232} r={22} />
      <T x={854} y={334} size={12} font="mono" fill={MUTED} spacing={1.5}>
        REVIEW BEFORE SENDING
      </T>
      {[356, 384, 412].map((y) => (
        <g key={y}>
          <Bar x={854} y={y} w={80} o={0.14} />
          <Bar x={946} y={y} w={140} o={0.32} />
        </g>
      ))}
      <rect x={854} y={444} width={132} height={40} rx={20} fill={WHATSAPP} />
      <T x={920} y={469} size={14} weight={600} anchor="middle" fill={BG}>
        WhatsApp
      </T>
      <Chip x={996} y={444} w={100} h={40} label="Copy" />
      <Lock x={862} y={506} s={0.7} color={MUTED} />
      <T x={876} y={512} size={12} fill={MUTED}>
        Nothing is sent silently
      </T>
    </g>
  </Art>
);

const D7 = '#6FA8DC';

const MessageRow: React.FC<{ y: number; unread?: boolean; actions?: boolean; tag?: string }> = ({ y, unread, actions, tag }) => (
  <g>
    <rect x={180} y={y} width={840} height={64} rx={14} fill={PANEL_2} />
    {unread && <circle cx={198} cy={y + 32} r={4} fill={D7} />}
    <circle cx={228} cy={y + 32} r={19} fill={D7} opacity={0.22} />
    <Bar x={262} y={y + 18} w={190} o={0.5} />
    <Bar x={262} y={y + 38} w={300} h={8} o={0.18} />
    {actions && (
      <>
        <rect x={620} y={y + 15} width={96} height={34} rx={17} fill={D7} />
        <T x={668} y={y + 37} size={13} weight={600} anchor="middle" fill={BG}>
          Accept
        </T>
        <Chip x={726} y={y + 15} w={96} label="Decline" size={13} />
      </>
    )}
    {tag && <Chip x={620} y={y + 15} w={170} label={tag} size={13} />}
  </g>
);

export const Direction7Cover: React.FC<CoverProps> = ({ className }) => (
  <Art
    label="Illustration: Direction7 Messages inbox, where the header badges and the tab counts come from the same server query"
    hue={D7}
    className={className}
  >
    <Box x={150} y={80} w={900} h={520} r={26} />
    <T x={186} y={130} size={28} weight={600}>
      Messages
    </T>
    {/* Header badges */}
    <Box x={756} y={102} w={124} h={38} r={19} fill="transparent" />
    <T x={776} y={126} size={14} fill={MUTED}>
      Unread
    </T>
    <circle cx={856} cy={121} r={12} fill={D7} />
    <T x={856} y={126} size={13} weight={700} anchor="middle" fill={BG}>
      3
    </T>
    <Box x={892} y={102} w={136} h={38} r={19} fill="transparent" stroke={D7} />
    <T x={912} y={126} size={14} fill={INK}>
      Pending
    </T>
    <circle cx={1002} cy={121} r={14} fill={D7} />
    <T x={1002} y={126} size={13} weight={700} anchor="middle" fill={BG}>
      12
    </T>
    <line x1={150} x2={1050} y1={160} y2={160} stroke={LINE} />

    {/* Tabs */}
    <T x={186} y={198} size={17} weight={600}>
      Pending
    </T>
    <Chip x={262} y={180} w={40} h={26} label="12" size={12} hue={D7} active />
    <rect x={186} y={212} width={116} height={3} rx={1.5} fill={D7} />
    <T x={336} y={198} size={17} fill={MUTED}>
      Responded
    </T>
    <T x={436} y={198} size={14} fill={MUTED}>
      31
    </T>
    <T x={480} y={198} size={17} fill={MUTED}>
      Sent
    </T>
    <T x={524} y={198} size={14} fill={MUTED}>
      8
    </T>
    {['Connections', 'Suppliers', 'Fulfilment', 'Delivery', 'Partners'].map((label, i) => (
      <Chip key={label} x={186 + [0, 128, 240, 352, 456][i]} y={232} w={[118, 102, 102, 94, 94][i]} h={30} label={label} size={12} active={i === 1} hue={D7} />
    ))}

    <MessageRow y={282} unread actions />
    <MessageRow y={356} unread tag="Supplier request" />
    <MessageRow y={430} tag="Delivery partner" />

    {/* Held back: partial loading */}
    <Box x={420} y={518} w={250} h={44} r={22} fill="transparent" stroke={MUTED} dash="6 6" />
    <T x={545} y={546} size={15} anchor="middle" fill={MUTED}>
      Load older
    </T>
    <Chip x={682} y={523} w={112} h={34} label="held back" size={12} hue={WARN} active />

    {/* One source of truth */}
    <Arrow d="M1002 140 L1002 296" head={[1002, 300, 90]} color={D7} flow />
    <g className="ill-float">
      <Box x={850} y={306} w={300} h={98} r={20} fill="#0E1825" stroke={D7} />
      <circle cx={884} cy={340} r={14} fill={D7} />
      <Check x={884} y={340} s={0.8} color={BG} />
      <T x={908} y={346} size={17} weight={600}>
        One query, one number
      </T>
      <T x={872} y={380} size={13} fill={MUTED}>
        Badge = inbox · 14 / 14 sellers match
      </T>
    </g>
  </Art>
);

const BIZ = '#4FC38A';

const FlowNode: React.FC<{ x: number; y: number; title: string; sub: string; tone?: string; error?: boolean }> = ({ x, y, title, sub, tone = BIZ, error }) => (
  <g>
    <rect x={x} y={y} width={200} height={66} rx={14} fill={PANEL_2} stroke={error ? DANGER : LINE} strokeWidth={error ? 2 : 1.5} />
    <rect x={x} y={y + 14} width={4} height={38} rx={2} fill={error ? DANGER : tone} />
    <T x={x + 20} y={y + 29} size={15} weight={600}>
      {title}
    </T>
    <T x={x + 20} y={y + 50} size={12} fill={MUTED}>
      {sub}
    </T>
    {error && (
      <g>
        <circle cx={x + 196} cy={y + 4} r={13} fill={DANGER} />
        <T x={x + 196} y={y + 9} size={15} weight={800} anchor="middle" fill={BG}>
          !
        </T>
      </g>
    )}
  </g>
);

export const BotBuilderCover: React.FC<CoverProps> = ({ className }) => (
  <Art
    label="Illustration: BizMagnets chatbot builder canvas with an element palette, branching nodes, and publishing blocked by one error"
    hue={BIZ}
    glow={[0.55, 0.5]}
    className={className}
  >
    {/* Element palette */}
    <Box x={60} y={90} w={210} h={490} r={20} />
    <T x={84} y={126} size={16} weight={600}>
      Elements
    </T>
    <Box x={84} y={142} w={162} h={36} r={10} fill={PANEL_2} />
    <circle cx={104} cy={159} r={6} fill="none" stroke={MUTED} strokeWidth={2} />
    <T x={118} y={165} size={13} fill={MUTED}>
      Search
    </T>
    {[
      ['MESSAGES', 'Text', 'Media'],
      ['QUESTIONS', 'Ask a question', 'Buttons'],
      ['INTEGRATIONS', 'Shopify', 'Google Sheets'],
    ].map(([group, a, b], i) => {
      const y = 212 + i * 118;
      return (
        <g key={group}>
          <T x={84} y={y} size={11} font="mono" fill={MUTED} spacing={1.2}>
            {group}
          </T>
          {[a, b].map((item, j) => (
            <g key={item}>
              <rect x={84} y={y + 14 + j * 44} width={162} height={36} rx={9} fill={PANEL_2} stroke={LINE} />
              <circle cx={102} cy={y + 32 + j * 44} r={5} fill={BIZ} opacity={0.8} />
              <T x={116} y={y + 37 + j * 44} size={13} fill="#C9CED6">
                {item}
              </T>
            </g>
          ))}
        </g>
      );
    })}

    {/* Toolbar */}
    <Chip x={640} y={92} w={84} h={36} label="Draft" hue={BIZ} active />
    <circle cx={752} cy={110} r={10} fill={BIZ} opacity={0.25} />
    <Check x={752} y={110} s={0.6} color={BIZ} />
    <T x={770} y={115} size={14} fill={MUTED}>
      Saved · 300 ms after edit
    </T>
    <rect x={970} y={90} width={150} height={40} rx={20} fill="#262A32" />
    <Lock x={1000} y={108} s={0.75} color={MUTED} />
    <T x={1060} y={116} size={15} weight={600} anchor="middle" fill={MUTED}>
      Publish
    </T>

    {/* Edges */}
    <path d="M420 236 L420 300" stroke={LINE} strokeWidth={2} />
    <path d="M520 333 C 560 333, 560 233, 600 233" fill="none" stroke={BIZ} strokeOpacity={0.6} strokeWidth={2} />
    <path d="M520 333 C 560 333, 560 433, 600 433" fill="none" stroke={BIZ} strokeOpacity={0.6} strokeWidth={2} />
    <path d="M800 222 C 840 222, 840 196, 880 196" fill="none" stroke={BIZ} strokeWidth={2} className="ill-flow" strokeDasharray="6 6" />
    <path d="M800 246 C 840 246, 840 330, 880 330" fill="none" stroke={DANGER} strokeOpacity={0.7} strokeWidth={2} strokeDasharray="6 6" />
    <Chip x={494} y={270} w={112} h={28} label="Track order" size={12} fill={BG} />
    <Chip x={494} y={368} w={112} h={28} label="Book a visit" size={12} fill={BG} />
    <circle cx={840} cy={208} r={11} fill={BIZ} />
    <Check x={840} y={208} s={0.55} color={BG} width={2.2} />
    <circle cx={840} cy={290} r={11} fill={DANGER} />
    <path d="M835 285 l10 10 M845 285 l-10 10" stroke={BG} strokeWidth={2.2} strokeLinecap="round" />

    {/* Nodes */}
    <FlowNode x={320} y={170} title="Start" sub="When a message arrives" />
    <FlowNode x={320} y={300} title="Ask a question" sub="What do you need?" />
    <FlowNode x={600} y={200} title="Shopify" sub="Get order status" tone="#9ED36A" />
    <FlowNode x={600} y={400} title="Google Sheets" sub="Add a row" error />
    <FlowNode x={880} y={163} title="Send status" sub="Order is on its way" />
    <FlowNode x={880} y={297} title="Hand off" sub="Assign to an agent" tone={WARN} />

    {/* Error explanation */}
    <Box x={830} y={420} w={300} h={66} r={16} fill="#2A1617" stroke={DANGER} opacity={0.95} />
    <T x={852} y={448} size={14} weight={600} fill="#F7A3A1">
      1 issue blocks publishing
    </T>
    <T x={852} y={470} size={13} fill="#D9A3A2">
      Choose a sheet for this step
    </T>
  </Art>
);

const DEPTH = { core: '#E8A15A', pipeline: '#F07178', stack: '#4FC38A', storage: '#E8C547' };

const MapNode: React.FC<{ cx: number; cy: number; r: number; tone: string; tag: string; label: string }> = ({ cx, cy, r, tone, tag, label }) => (
  <g>
    <circle cx={cx} cy={cy} r={r + 10} fill={tone} opacity={0.08} />
    <circle cx={cx} cy={cy} r={r} fill={PANEL_2} stroke={tone} strokeWidth={2.5} />
    <T x={cx} y={cy - 6} size={10} font="mono" fill={tone} anchor="middle" spacing={1.2}>
      {tag}
    </T>
    <T x={cx} y={cy + 16} size={15} weight={600} anchor="middle">
      {label}
    </T>
  </g>
);

export const HelpCover: React.FC<CoverProps> = ({ className }) => (
  <Art
    label="Illustration: the Help knowledge map, where a topic with more than three children becomes one ordered card instead of a fan of threads"
    hue="#E8A15A"
    glow={[0.5, 0.55]}
    className={className}
  >
    {[150, 260, 380].map((r) => (
      <circle key={r} cx={600} cy={370} r={r} fill="none" stroke={FAINT} strokeWidth={1.5} strokeDasharray="4 10" />
    ))}

    {/* Before: one node fanning into nine threads */}
    <Box x={70} y={96} w={260} h={196} r={18} fill={PANEL} dash="6 6" />
    <T x={92} y={124} size={11} font="mono" fill={MUTED} spacing={1.5}>
      BEFORE
    </T>
    {Array.from({ length: 9 }, (_, i) => {
      const y = 140 + i * 15;
      return <path key={i} d={`M128 215 C 190 ${300 - i * 22}, 230 ${110 + i * 20}, 300 ${y}`} fill="none" stroke={DEPTH.pipeline} strokeOpacity={0.45} strokeWidth={1.5} />;
    })}
    <circle cx={128} cy={215} r={14} fill={PANEL_2} stroke={DEPTH.pipeline} strokeWidth={2} />
    <T x={92} y={276} size={12} fill={MUTED}>
      9 overlapping threads
    </T>

    {/* Root and its three children */}
    <path d="M600 298 L600 208" stroke={DEPTH.pipeline} strokeWidth={2.5} />
    <path d="M550 420 L432 482" stroke={DEPTH.stack} strokeWidth={2.5} />
    <path d="M650 420 L776 486" stroke={DEPTH.storage} strokeWidth={2.5} />
    <MapNode cx={600} cy={370} r={72} tone={DEPTH.core} tag="CORE ENGINE" label="V8 Engine" />
    <MapNode cx={600} cy={160} r={56} tone={DEPTH.pipeline} tag="PIPELINE" label="JS execution" />
    <MapNode cx={390} cy={500} r={56} tone={DEPTH.stack} tag="CALL STACK" label="Exec. stack" />
    <MapNode cx={812} cy={500} r={48} tone={DEPTH.storage} tag="STORAGE" label="Memory" />

    {/* After: one ordered card */}
    <path d="M656 160 C 700 160, 720 150, 768 150" fill="none" stroke={DEPTH.pipeline} strokeWidth={2.5} />
    <Box x={768} y={96} w={330} h={222} r={18} fill={PANEL} stroke={DEPTH.pipeline} />
    <T x={792} y={126} size={11} font="mono" fill={DEPTH.pipeline} spacing={1.5}>
      PIPELINE · 5 STAGES
    </T>
    {['Parser', 'AST', 'Runtime feedback', 'Machine code', 'Deoptimization'].map((stage, i) => (
      <g key={stage}>
        <circle cx={804} cy={152 + i * 34} r={11} fill={DEPTH.pipeline} opacity={0.18} />
        <T x={804} y={157 + i * 34} size={12} weight={700} anchor="middle" fill={DEPTH.pipeline}>
          {i + 1}
        </T>
        <T x={826} y={157 + i * 34} size={15}>
          {stage}
        </T>
      </g>
    ))}
    <T x={768} y={346} size={13} fill={MUTED}>
      ≤ 3 children → keywords · more → one ordered card
    </T>

    {/* Keywords for the small branches */}
    {['Function calls', 'Stack frames', 'Call stack'].map((k, i) => (
      <g key={k}>
        <path d={`M334 500 L${296} ${452 + i * 48}`} stroke={DEPTH.stack} strokeOpacity={0.5} strokeWidth={1.5} />
        <Chip x={150} y={436 + i * 48} w={146} h={32} label={k} size={13} hue={DEPTH.stack} fill={PANEL} />
      </g>
    ))}
    {['Heap', 'Objects'].map((k, i) => (
      <g key={k}>
        <path d={`M860 500 L${916} ${472 + i * 52}`} stroke={DEPTH.storage} strokeOpacity={0.5} strokeWidth={1.5} />
        <Chip x={916} y={456 + i * 52} w={100} h={32} label={k} size={13} hue={DEPTH.storage} fill={PANEL} />
      </g>
    ))}
  </Art>
);

const CARZ = '#E8B730';

export const CarzMotoCover: React.FC<CoverProps> = ({ className }) => (
  <Art
    label="Illustration: a CARZ MOTO ad leads to the one-page site, whose WhatsApp button opens a chat with a pre-filled quote request"
    hue={CARZ}
    className={className}
  >
    {/* Social ad */}
    <Box x={96} y={140} w={276} h={400} r={22} />
    <circle cx={128} cy={176} r={15} fill={CARZ} />
    <T x={152} y={173} size={14} weight={600}>
      carzmoto
    </T>
    <T x={152} y={191} size={11} fill={MUTED}>
      Sponsored
    </T>
    <rect x={112} y={208} width={244} height={186} rx={12} fill="#1A1408" />
    <path d="M132 360 Q 234 300 336 360" fill="none" stroke={CARZ} strokeWidth={10} opacity={0.25} />
    <path d="M132 360 Q 234 300 336 360" fill="none" stroke={CARZ} strokeWidth={3} />
    <path d="M150 300 h50 a10 10 0 0 1 10 10 v20 h-60 z M268 300 h50 v30 h-60 v-20 a10 10 0 0 1 10 -10 z" fill="#fff" opacity={0.08} />
    <T x={116} y={424} size={15} weight={600}>
      Ambient lighting
    </T>
    <T x={116} y={446} size={13} fill={MUTED}>
      Starting at ₹1,999
    </T>
    <rect x={112} y={470} width={244} height={44} rx={12} fill="#262A32" />
    <T x={234} y={498} size={14} weight={600} anchor="middle">
      Send message
    </T>

    <Arrow d="M380 340 L462 340" head={[472, 340, 0]} color={CARZ} flow />

    {/* Phone with the site */}
    <rect x={480} y={58} width={240} height={564} rx={38} fill="#0D0F13" stroke="#2C313A" strokeWidth={3} />
    <rect x={492} y={70} width={216} height={540} rx={28} fill="#15110A" />
    <rect x={570} y={82} width={60} height={16} rx={8} fill="#0D0F13" />
    <T x={600} y={148} size={24} weight={800} anchor="middle" spacing={2}>
      CARZ MOTO
    </T>
    <T x={600} y={168} size={11} anchor="middle" fill={MUTED} spacing={1}>
      CUSTOMIZE YOUR CRUISE
    </T>
    <T x={556} y={214} size={20} weight={700} anchor="middle" fill={CARZ}>
      4.9★
    </T>
    <T x={556} y={232} size={10} anchor="middle" fill={MUTED} spacing={1}>
      LOCAL REVIEWS
    </T>
    <T x={648} y={214} size={20} weight={700} anchor="middle" fill={CARZ}>
      ₹1,999
    </T>
    <T x={648} y={232} size={10} anchor="middle" fill={MUTED} spacing={1}>
      STARTING AT
    </T>
    {['Ambient lighting', 'Seat covers', 'Android systems'].map((offer, i) => (
      <g key={offer}>
        <rect x={506} y={256 + i * 76} width={188} height={64} rx={14} fill={PANEL_2} />
        <T x={520} y={282 + i * 76} size={13} weight={600}>
          {offer}
        </T>
        <rect x={520} y={292 + i * 76} width={74} height={18} rx={9} fill={CARZ} opacity={0.9} />
        <T x={557} y={305 + i * 76} size={10} weight={700} anchor="middle" fill={BG}>
          Get a quote
        </T>
      </g>
    ))}
    <rect x={506} y={496} width={188} height={44} rx={22} fill={CARZ} />
    <T x={600} y={523} size={14} weight={700} anchor="middle" fill={BG}>
      Book your cruise
    </T>
    <circle cx={676} cy={576} r={30} fill={WHATSAPP} opacity={0.35} className="ill-pulse" />
    <WhatsAppGlyph cx={676} cy={576} r={22} />

    <Arrow d="M728 340 L818 340" head={[828, 340, 0]} color={WHATSAPP} flow />

    {/* WhatsApp chat */}
    <rect x={836} y={150} width={280} height={372} rx={22} fill="#0B141A" stroke={LINE} strokeWidth={1.5} />
    <path d="M836 172 a22 22 0 0 1 22 -22 h236 a22 22 0 0 1 22 22 v36 h-280 z" fill="#1F2C34" />
    <circle cx={868} cy={180} r={15} fill={CARZ} />
    <T x={892} y={177} size={15} weight={600}>
      CARZ MOTO
    </T>
    <T x={892} y={195} size={11} fill={MUTED}>
      Business account
    </T>
    <rect x={878} y={236} width={222} height={104} rx={14} fill="#005C4B" />
    <T x={894} y={264} size={14}>
      Hi CARZ MOTO, I'd like a
    </T>
    <T x={894} y={286} size={14}>
      quote for Ambient
    </T>
    <T x={894} y={308} size={14}>
      Lighting.
    </T>
    <T x={1090} y={330} size={10} anchor="end" fill="#9FC9BE">
      sent from the offer card
    </T>
    <Chip x={878} y={354} w={222} h={30} label="lead event: which button" size={11} font="mono" hue={CARZ} active />
    <rect x={852} y={404} width={92} height={40} rx={14} fill="#1F2C34" />
    {[0, 1, 2].map((i) => (
      <circle key={i} cx={878 + i * 20} cy={424} r={4} fill={MUTED} />
    ))}
  </Art>
);

const MLJ = '#4FE3F0';

const STARS: [number, number, number][] = [
  [80, 70, 1.6], [180, 40, 1.2], [260, 96, 1], [400, 60, 1.4], [470, 130, 1], [560, 46, 1.6], [640, 110, 1.1], [720, 70, 1.3],
  [800, 40, 1], [870, 120, 1.5], [1060, 60, 1.2], [1130, 130, 1], [1160, 40, 1.6], [940, 220, 1], [1100, 260, 1.3], [760, 200, 1],
  [340, 220, 1.1], [60, 260, 1.4], [1020, 340, 1], [140, 380, 1.2],
];

export const MyLifeJourneyCover: React.FC<CoverProps> = ({ className }) => (
  <Art
    label="Illustration: the My Life Journey island at night, with a seaplane, a windmill and a house, each marked by a pulsing cyan dot"
    hue={MLJ}
    glow={[0.5, 0.6]}
    className={className}
  >
    <rect width={1200} height={675} fill="#071423" opacity={0.6} />
    {STARS.map(([x, y, r]) => (
      <circle key={`${x}-${y}`} cx={x} cy={y} r={r} fill="#fff" opacity={0.6} />
    ))}
    <circle cx={990} cy={150} r={80} fill="#EAF6FF" opacity={0.05} />
    <circle cx={990} cy={150} r={34} fill="#EAF6FF" opacity={0.9} />

    {/* Storm the visitor flies through */}
    <ellipse cx={170} cy={120} rx={150} ry={42} fill="#9AA8B8" opacity={0.12} />
    <ellipse cx={300} cy={96} rx={120} ry={36} fill="#9AA8B8" opacity={0.1} />
    {Array.from({ length: 14 }, (_, i) => (
      <line key={i} x1={60 + i * 26} y1={170 + (i % 3) * 14} x2={50 + i * 26} y2={196 + (i % 3) * 14} stroke="#9AA8B8" strokeOpacity={0.25} strokeWidth={2} />
    ))}

    {/* Seaplane */}
    <g transform="translate(300 250) rotate(-8)">
      <rect x={-70} y={-36} width={140} height={10} rx={5} fill="#E8D9B5" />
      <ellipse cx={0} cy={0} rx={66} ry={15} fill="#C8553D" />
      <rect x={-56} y={6} width={120} height={8} rx={4} fill="#E8D9B5" />
      <line x1={-40} y1={14} x2={-44} y2={34} stroke="#C9CED6" strokeWidth={2} />
      <line x1={40} y1={14} x2={44} y2={34} stroke="#C9CED6" strokeWidth={2} />
      <rect x={-64} y={32} width={136} height={9} rx={4.5} fill="#E8D9B5" />
      <path d="M-66 -4 l-22 -20 l8 26 z" fill="#C8553D" />
      <line x1={70} y1={-16} x2={70} y2={16} stroke="#fff" strokeOpacity={0.6} strokeWidth={3} />
    </g>
    <Pulse cx={300} cy={236} color={MLJ} />

    {/* Sea */}
    <rect x={0} y={480} width={1200} height={195} fill="#0B1B2B" />
    {[510, 548, 590, 636].map((y, i) => (
      <path key={y} d={`M0 ${y} Q 150 ${y - 10} 300 ${y} T 600 ${y} T 900 ${y} T 1200 ${y}`} fill="none" stroke={MLJ} strokeOpacity={0.12 - i * 0.02} strokeWidth={2} />
    ))}

    {/* Island */}
    <path d="M300 492 C 380 400, 520 360, 640 372 C 760 384, 850 420, 920 492 Z" fill="#132A22" />
    <path d="M280 494 C 400 470, 800 470, 940 494 Z" fill="#C9B98F" opacity={0.25} />

    {/* Windmill */}
    <path d="M506 440 L534 440 L527 316 L513 316 Z" fill="#D9DEE5" opacity={0.9} />
    <g transform="translate(520 312)">
      <g className="ill-spin">
        {[0, 90, 180, 270].map((a) => (
          <rect key={a} x={-5} y={-76} width={10} height={70} rx={3} fill="#C9CED6" opacity={0.85} transform={`rotate(${a + 20})`} />
        ))}
      </g>
    </g>
    <Pulse cx={520} cy={312} color={MLJ} />

    {/* House */}
    <rect x={660} y={360} width={110} height={74} rx={4} fill="#1B2A36" stroke={LINE} />
    <path d="M650 364 L715 318 L780 364 Z" fill="#24384A" />
    <rect x={676} y={380} width={30} height={24} rx={3} fill={MLJ} opacity={0.4} />
    <rect x={724} y={394} width={26} height={40} rx={3} fill="#0E1822" />
    <Pulse cx={737} cy={414} r={9} color={MLJ} />

    {/* Cursor */}
    <path d="M548 336 l0 34 l9 -8 l7 15 l7 -3 l-7 -15 l12 -1 z" fill="#fff" stroke={BG} strokeWidth={1.5} />

    {/* Legend */}
    <Box x={840} y={540} w={290} h={48} r={24} fill={PANEL} />
    <Pulse cx={870} cy={564} r={8} color={MLJ} />
    <T x={892} y={569} size={14}>
      = you can interact with this
    </T>
  </Art>
);
