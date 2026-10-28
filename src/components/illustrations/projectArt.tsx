import React from 'react';
import { Art, Bar, Box, Check, Chip, Lock, Pulse, T, Window } from './primitives';
import { BG, DANGER, FAINT, LINE, MUTED, OK, PANEL, PANEL_2, WARN, WHATSAPP } from './palette';

interface ArtComponentProps {
  className?: string;
}

const CHATOPS = '#E0809B';

const DISCHARGE_COLUMNS: { name: string; cards: { time: string; tone: string }[] }[] = [
  { name: 'Pharmacy', cards: [{ time: '08m', tone: OK }, { time: '21m', tone: WARN }, { time: '04m', tone: OK }] },
  { name: 'Billing', cards: [{ time: '46m · L2', tone: DANGER }, { time: '09m', tone: OK }] },
  { name: 'Insurance', cards: [{ time: '18m', tone: WARN }, { time: '02m', tone: OK }, { time: '11m', tone: OK }] },
  { name: 'Cash counter', cards: [{ time: '05m', tone: OK }, { time: '25m', tone: WARN }] },
];

export const ChatOpsArt: React.FC<ArtComponentProps> = ({ className }) => (
  <Art label="Illustration: ChatOps.health discharge board with department queues, live SLA timers and an escalated task" hue={CHATOPS} className={className}>
    <Box x={120} y={70} w={960} h={535} r={26} />
    <T x={156} y={118} size={26} weight={600}>
      Discharges today
    </T>
    {[
      ['on time', OK, 760],
      ['due soon', WARN, 860],
      ['breached', DANGER, 966],
    ].map(([label, tone, x]) => (
      <g key={label as string}>
        <circle cx={x as number} cy={111} r={6} fill={tone as string} />
        <T x={(x as number) + 12} y={116} size={13} fill={MUTED}>
          {label}
        </T>
      </g>
    ))}
    {DISCHARGE_COLUMNS.map((column, i) => {
      const x = 156 + i * 226;
      return (
        <g key={column.name}>
          <T x={x} y={172} size={15} weight={600}>
            {column.name}
          </T>
          <Chip x={x + 158} y={156} w={40} h={24} label={String(column.cards.length)} size={12} />
          {column.cards.map((card, j) => {
            const y = 190 + j * 104;
            const escalated = card.tone === DANGER;
            return (
              <g key={j}>
                <rect x={x} y={y} width={206} height={92} rx={14} fill={PANEL_2} stroke={escalated ? DANGER : LINE} strokeWidth={escalated ? 2 : 1.5} />
                <Bar x={x + 16} y={y + 20} w={110} o={0.5} />
                <Bar x={x + 16} y={y + 40} w={80} h={8} o={0.2} />
                <circle cx={x + 26} cy={y + 70} r={10} fill={CHATOPS} opacity={0.4} />
                <rect x={x + (escalated ? 100 : 136)} y={y + 58} width={escalated ? 92 : 56} height={24} rx={12} fill={card.tone} fillOpacity={0.16} stroke={card.tone} />
                <T x={x + (escalated ? 146 : 164)} y={y + 75} size={12} font="mono" anchor="middle" fill={card.tone}>
                  {card.time}
                </T>
              </g>
            );
          })}
        </g>
      );
    })}
    <rect x={156} y={526} width={888} height={54} rx={14} fill={PANEL_2} />
    <T x={176} y={559} size={15} weight={600}>
      Bed 12 · discharge
    </T>
    {[OK, OK, OK, WARN, '#fff'].map((tone, i) => (
      <rect key={i} x={360 + i * 98} y={548} width={90} height={10} rx={5} fill={tone} opacity={i === 4 ? 0.12 : 0.85} />
    ))}
    <T x={1024} y={559} size={13} anchor="end" fill={MUTED}>
      3 of 5 clearances
    </T>
  </Art>
);

const VAMO = '#F2A65A';
const FENCE = '#6FA8DC';

const Vehicle: React.FC<{ x: number; y: number; heading: number; selected?: boolean }> = ({ x, y, heading, selected }) => (
  <g>
    {selected && <Pulse cx={x} cy={y} r={14} color={VAMO} core={VAMO} />}
    <circle cx={x} cy={y} r={16} fill={PANEL_2} stroke={VAMO} strokeWidth={3} />
    <polygon points="0,-8 6,6 0,3 -6,6" fill={VAMO} transform={`translate(${x} ${y}) rotate(${heading})`} />
  </g>
);

export const VamosysArt: React.FC<ArtComponentProps> = ({ className }) => (
  <Art label="Illustration: VAMOSYS fleet map with a route, a geofence, vehicle markers, clusters and a telemetry card" hue={VAMO} className={className}>
    {[140, 330, 520, 700, 880, 1060].map((x) => (
      <line key={x} x1={x} x2={x} y1={0} y2={675} stroke="#fff" strokeOpacity={0.05} strokeWidth={14} />
    ))}
    {[120, 260, 400, 540].map((y) => (
      <line key={y} x1={0} x2={1200} y1={y} y2={y} stroke="#fff" strokeOpacity={0.05} strokeWidth={14} />
    ))}
    <line x1={0} y1={640} x2={760} y2={0} stroke="#fff" strokeOpacity={0.04} strokeWidth={22} />
    <path d="M0 470 C 200 430, 380 520, 560 470 S 900 380, 1200 430" fill="none" stroke="#3B6EA5" strokeOpacity={0.25} strokeWidth={26} />

    <polygon points="430,170 760,150 820,360 640,470 400,400" fill={FENCE} fillOpacity={0.07} stroke={FENCE} strokeWidth={2} strokeDasharray="8 8" />
    <Chip x={444} y={178} w={170} h={30} label="Geofence · Depot" size={13} hue={FENCE} active />

    <path d="M150 560 L330 520 L340 400 L520 380 L560 260 L700 250 L880 200 L1060 140" fill="none" stroke={VAMO} strokeOpacity={0.2} strokeWidth={14} strokeLinejoin="round" />
    <path d="M150 560 L330 520 L340 400 L520 380 L560 260 L700 250 L880 200 L1060 140" fill="none" stroke={VAMO} strokeWidth={4} strokeLinejoin="round" />
    <Vehicle x={340} y={400} heading={-10} />
    <Vehicle x={560} y={260} heading={20} selected />
    <Vehicle x={880} y={200} heading={70} />

    <circle cx={220} cy={180} r={30} fill={VAMO} opacity={0.9} />
    <T x={220} y={186} size={17} weight={700} anchor="middle" fill={BG}>
      24
    </T>
    <circle cx={1010} cy={560} r={24} fill={VAMO} opacity={0.9} />
    <T x={1010} y={566} size={15} weight={700} anchor="middle" fill={BG}>
      9
    </T>

    <Box x={850} y={262} w={270} h={200} r={20} />
    <T x={872} y={294} size={15} weight={600}>
      Vehicle 0427
    </T>
    <T x={872} y={334} size={30} weight={700}>
      52 km/h
    </T>
    <path d="M872 384 L900 372 L928 378 L956 356 L984 362 L1012 344 L1040 350 L1068 336 L1096 340" fill="none" stroke={VAMO} strokeWidth={2.5} />
    <Chip x={872} y={410} w={110} h={30} label="Ignition on" size={12} hue={OK} active />
    <Chip x={992} y={410} w={110} h={30} label="In geofence" size={12} hue={FENCE} active />

    <Box x={80} y={470} w={300} h={130} r={20} />
    <T x={104} y={504} size={14} weight={600}>
      Route history · today
    </T>
    <circle cx={116} cy={538} r={14} fill={VAMO} />
    <polygon points="111,531 111,545 123,538" fill={BG} />
    <Bar x={142} y={535} w={210} h={6} o={0.2} />
    <Bar x={142} y={535} w={124} h={6} o={1} fill={VAMO} />
    <T x={104} y={578} size={12} fill={MUTED}>
      06:10 → 09:45
    </T>
  </Art>
);

const CALY = '#9B8CF2';

type SlotKind = 'booked' | 'held' | 'free' | 'meet';
const CALY_SLOTS: [number, number, SlotKind][] = [
  [0, 1, 'booked'], [0, 3, 'free'], [0, 6, 'booked'],
  [1, 0, 'booked'], [1, 3, 'held'], [1, 5, 'booked'],
  [2, 1, 'free'], [2, 3, 'meet'], [2, 6, 'free'],
  [3, 1, 'booked'], [3, 4, 'free'], [3, 6, 'booked'],
  [4, 2, 'free'], [4, 4, 'booked'],
];

export const CalyArt: React.FC<ArtComponentProps> = ({ className }) => (
  <Art label="Illustration: Caly week calendar with booked, held and free slots beside a WhatsApp chat booking a time" hue={CALY} className={className}>
    <Box x={110} y={80} w={660} h={520} r={24} />
    <T x={140} y={124} size={22} weight={600}>
      This week
    </T>
    <Chip x={566} y={100} w={180} h={32} label="Synced with Google" size={12} hue={CALY} active />
    {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((day, i) => (
      <T key={day} x={250 + i * 104} y={168} size={14} anchor="middle" fill={MUTED}>
        {day}
      </T>
    ))}
    {Array.from({ length: 8 }, (_, r) => (
      <g key={r}>
        <line x1={196} x2={720} y1={184 + r * 50} y2={184 + r * 50} stroke={FAINT} />
        <T x={140} y={202 + r * 50} size={12} fill={MUTED} font="mono">
          {`${9 + r}:00`}
        </T>
      </g>
    ))}
    {CALY_SLOTS.map(([d, r, kind]) => {
      const x = 202 + d * 104;
      const y = 188 + r * 50;
      if (kind === 'free') {
        return <rect key={`${d}-${r}`} x={x} y={y} width={92} height={42} rx={10} fill="none" stroke={CALY} strokeOpacity={0.5} strokeDasharray="5 5" />;
      }
      if (kind === 'held') {
        return (
          <g key={`${d}-${r}`}>
            <rect x={x} y={y} width={92} height={42} rx={10} fill={CALY} fillOpacity={0.5} stroke={CALY} strokeWidth={2} />
            <Lock x={x + 18} y={y + 20} s={0.7} />
            <T x={x + 32} y={y + 27} size={11} weight={600}>
              held
            </T>
          </g>
        );
      }
      return (
        <g key={`${d}-${r}`}>
          <rect x={x} y={y} width={92} height={42} rx={10} fill={CALY} fillOpacity={0.24} />
          <Bar x={x + 12} y={y + 12} w={52} h={7} o={0.5} />
          {kind === 'meet' ? (
            <T x={x + 12} y={y + 34} size={11} weight={600} fill={CALY}>
              Meet link
            </T>
          ) : (
            <Bar x={x + 12} y={y + 26} w={36} h={6} o={0.2} />
          )}
        </g>
      );
    })}

    <rect x={810} y={140} width={300} height={420} rx={22} fill="#0B141A" stroke={LINE} strokeWidth={1.5} />
    <path d="M810 162 a22 22 0 0 1 22 -22 h256 a22 22 0 0 1 22 22 v36 h-300 z" fill="#1F2C34" />
    <circle cx={842} cy={170} r={14} fill={CALY} />
    <T x={866} y={176} size={15} weight={600}>
      Book a visit
    </T>
    <rect x={826} y={214} width={236} height={136} rx={14} fill="#1F2C34" />
    <T x={842} y={242} size={13}>
      Pick a time that suits you
    </T>
    <Chip x={842} y={256} w={204} h={34} label="Tue 12:00" size={13} hue={CALY} active />
    <Chip x={842} y={300} w={204} h={34} label="Wed 15:00" size={13} hue={CALY} />
    <rect x={952} y={366} width={142} height={42} rx={14} fill="#005C4B" />
    <T x={1023} y={393} size={14} anchor="middle">
      Tue 12:00
    </T>
    <rect x={826} y={424} width={260} height={70} rx={14} fill="#1F2C34" />
    <Check x={850} y={452} s={0.8} color={OK} />
    <T x={866} y={456} size={13} weight={600}>
      Booked · reminder set
    </T>
    <T x={842} y={480} size={12} fill={MUTED}>
      Calendar invite with a Meet link
    </T>
  </Art>
);

const D7B = '#F07A5A';

const RECEIPT_EDGE = (() => {
  let d = 'M780 80 H1040 V570';
  for (let x = 1040, up = true; x > 780; x -= 20, up = !up) d += ` L${x - 10} ${up ? 584 : 570}`;
  return `${d} L780 570 Z`;
})();

const BILL_ITEMS: [string, string, string][] = [
  ['Masala chai', '×2', '$7.00'],
  ['Samosa chaat', '×1', '$8.50'],
  ['Idli', '×2', '$6.00'],
  ['Mango lassi', '×1', '$4.50'],
];

export const Direction7BillingArt: React.FC<ArtComponentProps> = ({ className }) => (
  <Art label="Illustration: Direction7 billing on a tablet, a PDF receipt and a WhatsApp message carrying the receipt" hue={D7B} className={className}>
    <rect x={100} y={120} width={620} height={440} rx={30} fill="#0D0F13" stroke="#2C313A" strokeWidth={3} />
    <rect x={118} y={138} width={584} height={404} rx={18} fill={PANEL} />
    <T x={142} y={180} size={18} weight={600}>
      New bill
    </T>
    {BILL_ITEMS.map(([name, qty, price], i) => (
      <g key={name}>
        <rect x={138} y={200 + i * 64} width={334} height={52} rx={12} fill={PANEL_2} />
        <T x={156} y={231 + i * 64} size={15}>
          {name}
        </T>
        <T x={300} y={231 + i * 64} size={13} fill={MUTED}>
          {qty}
        </T>
        <T x={456} y={231 + i * 64} size={15} weight={600} anchor="end">
          {price}
        </T>
      </g>
    ))}
    <T x={506} y={190} size={14} fill={MUTED}>
      Total
    </T>
    <T x={506} y={232} size={34} weight={700}>
      $26.00
    </T>
    <rect x={506} y={252} width={170} height={32} rx={16} fill={OK} fillOpacity={0.16} stroke={OK} />
    <Check x={528} y={268} s={0.7} color={OK} />
    <T x={542} y={273} size={13}>
      Stock updated
    </T>
    <rect x={506} y={416} width={170} height={40} rx={20} fill={WHATSAPP} />
    <T x={591} y={441} size={13} weight={700} anchor="middle" fill={BG}>
      WhatsApp receipt
    </T>
    <rect x={506} y={468} width={170} height={48} rx={24} fill={D7B} />
    <T x={591} y={497} size={15} weight={700} anchor="middle" fill={BG}>
      Complete bill
    </T>

    <g transform="rotate(4 910 330)">
      <path d={RECEIPT_EDGE} fill="#F3EEE6" />
      <rect x={810} y={112} width={120} height={14} rx={7} fill="#1C1C1C" opacity={0.75} />
      <rect x={810} y={136} width={180} height={8} rx={4} fill="#1C1C1C" opacity={0.3} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={810} y={180 + i * 36} width={110} height={9} rx={4.5} fill="#1C1C1C" opacity={0.5} />
          <rect x={960} y={180 + i * 36} width={50} height={9} rx={4.5} fill="#1C1C1C" opacity={0.5} />
        </g>
      ))}
      <line x1={810} x2={1010} y1={340} y2={340} stroke="#1C1C1C" strokeOpacity={0.4} strokeDasharray="6 6" />
      <T x={810} y={376} size={16} weight={700} fill="#1C1C1C">
        Total
      </T>
      <T x={1010} y={376} size={16} weight={700} fill="#1C1C1C" anchor="end">
        $26.00
      </T>
      {[0, 1, 2].map((i) => (
        <circle key={i} cx={872 + i * 28} cy={520} r={9} fill="#1C1C1C" opacity={0.45} />
      ))}
    </g>

    <g className="ill-float">
      <rect x={880} y={446} width={260} height={74} rx={16} fill="#005C4B" />
      <rect x={898} y={460} width={34} height={44} rx={5} fill="#F3EEE6" />
      <T x={906} y={488} size={10} weight={800} fill={D7B}>
        PDF
      </T>
      <T x={946} y={478} size={15} weight={600}>
        receipt.pdf
      </T>
      <T x={946} y={500} size={12} fill="#9FC9BE">
        PDF · 1 page
      </T>
    </g>
  </Art>
);

const ASSIST = '#8FA8FF';

export const SmartAssistantArt: React.FC<ArtComponentProps> = ({ className }) => (
  <Art label="Illustration: Smart Assistant chat with prompt suggestions, a code answer saved to notes, and a notes panel with export" hue={ASSIST} className={className}>
    <Window x={110} y={80} w={700} h={520} title="Smart Assistant" />
    <Chip x={700} y={91} w={90} h={26} label="Gemini" size={12} hue={ASSIST} active />
    <rect x={470} y={150} width={310} height={46} rx={16} fill={ASSIST} fillOpacity={0.2} stroke={ASSIST} strokeOpacity={0.5} />
    <T x={486} y={178} size={14}>
      How does the event loop work?
    </T>
    <circle cx={146} cy={232} r={14} fill={ASSIST} />
    <rect x={170} y={216} width={530} height={200} rx={16} fill={PANEL_2} />
    <Bar x={190} y={238} w={440} o={0.4} />
    <Bar x={190} y={258} w={380} o={0.25} />
    <rect x={190} y={286} width={490} height={96} rx={10} fill={BG} />
    {[
      [210, 306, 140, ASSIST],
      [226, 328, 220, OK],
      [226, 350, 170, WARN],
      [210, 372, 90, ASSIST],
    ].map(([x, y, w, fill]) => (
      <rect key={`${x}-${y}`} x={x as number} y={(y as number) - 6} width={w as number} height={8} rx={4} fill={fill as string} opacity={0.7} />
    ))}
    <Bar x={190} y={396} w={300} o={0.2} h={8} />
    <Chip x={170} y={428} w={150} h={34} label="Save to notes" size={13} hue={ASSIST} active />
    <Chip x={330} y={428} w={84} h={34} label="Copy" size={13} />
    {['Summarise this', 'Write a reply', 'Explain code'].map((label, i) => (
      <Chip key={label} x={130 + [0, 162, 302][i]} y={476} w={[150, 130, 126][i]} h={32} label={label} size={12} />
    ))}
    <rect x={130} y={522} width={660} height={56} rx={28} fill={PANEL_2} stroke={LINE} />
    <T x={158} y={556} size={14} fill={MUTED}>
      Ask anything…
    </T>
    <circle cx={760} cy={550} r={18} fill={ASSIST} />
    <path d="M753 550 h14 m-6 -6 l6 6 l-6 6" fill="none" stroke={BG} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />

    <Box x={840} y={120} w={270} h={440} r={22} />
    <T x={864} y={158} size={18} weight={600}>
      Notes
    </T>
    <path d="M1078 142 v14 m-6 -6 l6 6 l6 -6 M1068 162 h20" fill="none" stroke={MUTED} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
    <rect x={860} y={182} width={230} height={100} rx={14} fill={PANEL_2} stroke={ASSIST} strokeWidth={1.5} />
    <T x={878} y={210} size={14} weight={600}>
      Event loop
    </T>
    <Bar x={878} y={224} w={180} h={8} o={0.25} />
    <Bar x={878} y={240} w={140} h={8} o={0.25} />
    <T x={878} y={268} size={11} fill={ASSIST}>
      Saved just now
    </T>
    {[296, 398].map((y) => (
      <g key={y}>
        <rect x={860} y={y} width={230} height={88} rx={14} fill={PANEL_2} />
        <Bar x={878} y={y + 22} w={110} o={0.45} />
        <Bar x={878} y={y + 44} w={180} h={8} o={0.2} />
        <Bar x={878} y={y + 60} w={130} h={8} o={0.2} />
      </g>
    ))}
    <Chip x={860} y={506} w={230} h={36} label="Export notes" size={13} />
  </Art>
);

const TEAL = '#2DD4BF';
const PINK = '#EC4899';
const WEIGHT_POINTS = [300, 292, 296, 280, 274, 262, 258, 246].map((y, i) => [496 + i * 76, y] as const);

export const FitTrackerArt: React.FC<ArtComponentProps> = ({ className }) => (
  <Art label="Illustration: FitTracker dashboard with a BMI gauge, a weight chart, workouts, a reminder and an empty meals state" hue={TEAL} className={className}>
    <Box x={100} y={70} w={1000} h={540} r={26} />
    <T x={136} y={118} size={26} weight={600}>
      Today
    </T>
    <T x={226} y={118} size={14} fill={MUTED}>
      3 of 4 goals
    </T>

    <Box x={136} y={150} w={300} h={240} r={20} fill={PANEL_2} />
    <T x={156} y={182} size={14} fill={MUTED}>
      BMI
    </T>
    <path d="M186 340 A100 100 0 0 1 386 340" fill="none" stroke="#fff" strokeOpacity={0.08} strokeWidth={18} strokeLinecap="round" />
    <path d="M186 340 A100 100 0 0 1 270.4 241.2" fill="none" stroke={TEAL} strokeWidth={18} strokeLinecap="round" />
    <T x={286} y={318} size={36} weight={700} anchor="middle">
      22.4
    </T>
    <T x={286} y={340} size={12} anchor="middle" fill={MUTED}>
      healthy range
    </T>

    <Box x={456} y={150} w={608} h={240} r={20} fill={PANEL_2} />
    <T x={476} y={182} size={14} fill={MUTED}>
      Weight · 8 weeks
    </T>
    <path d={`M${WEIGHT_POINTS.map(([x, y]) => `${x} ${y}`).join(' L')} L1028 370 L496 370 Z`} fill={TEAL} opacity={0.1} />
    <path d={`M${WEIGHT_POINTS.map(([x, y]) => `${x} ${y}`).join(' L')}`} fill="none" stroke={TEAL} strokeWidth={3} strokeLinejoin="round" />
    {WEIGHT_POINTS.map(([x, y], i) => (
      <circle key={x} cx={x} cy={y} r={i === WEIGHT_POINTS.length - 1 ? 7 : 4} fill={i === WEIGHT_POINTS.length - 1 ? PINK : TEAL} />
    ))}
    <Chip x={940} y={196} w={96} h={30} label="−3.2 kg" size={13} hue={PINK} active />

    <Box x={136} y={410} w={460} h={170} r={20} fill={PANEL_2} />
    <T x={156} y={440} size={14} fill={MUTED}>
      Workouts
    </T>
    {[
      ['Push day', '45 min'],
      ['5 km run', '28 min'],
    ].map(([name, time], i) => (
      <g key={name}>
        <rect x={156} y={456 + i * 56} width={40} height={40} rx={10} fill={PINK} opacity={0.22} />
        <T x={212} y={482 + i * 56} size={15} weight={600}>
          {name}
        </T>
        <T x={576} y={482 + i * 56} size={13} anchor="end" fill={MUTED}>
          {time}
        </T>
      </g>
    ))}

    <Box x={616} y={410} w={448} h={74} r={18} fill={PANEL_2} />
    <path d="M648 462 h20 m-17 0 v-12 a7 7 0 0 1 14 0 v12 m-10 4 a3 3 0 0 0 6 0" fill="none" stroke={PINK} strokeWidth={2.5} strokeLinecap="round" />
    <T x={688} y={444} size={12} fill={MUTED}>
      Reminder
    </T>
    <T x={688} y={468} size={15} weight={600}>
      Leg day at 6:30 PM
    </T>
    <Box x={616} y={500} w={448} h={80} r={18} fill="transparent" stroke={TEAL} dash="6 6" />
    <T x={840} y={546} size={15} weight={600} anchor="middle" fill={TEAL}>
      + Log your first meal
    </T>
  </Art>
);

const NIPPON = '#F26D6D';
const ROOMS = ['Hall', 'Bedroom', 'Kitchen', 'Utility', 'Store room', 'Bathroom', 'Dining', 'Balcony', 'Staircase'];
const SWATCHES = ['#E9D8C4', '#B8D4C8', '#F2C6A0', '#9FB8D9', '#D98C8C'];

export const NeoNinjaArt: React.FC<ArtComponentProps> = ({ className }) => (
  <Art label="Illustration: Neo Ninja tablet quote with a 3 by 3 room selector, room dimensions, colours, package tiers and instalment payment" hue={NIPPON} className={className}>
    <rect x={110} y={80} width={980} height={520} rx={36} fill="#0D0F13" stroke="#2C313A" strokeWidth={3} />
    <rect x={132} y={102} width={936} height={476} rx={22} fill={PANEL} />
    <T x={160} y={148} size={18} weight={600}>
      Select a room
    </T>
    {ROOMS.map((room, i) => {
      const x = 160 + (i % 3) * 130;
      const y = 166 + Math.floor(i / 3) * 130;
      const active = room === 'Bedroom';
      return (
        <g key={room}>
          <rect x={x} y={y} width={118} height={118} rx={16} fill={active ? NIPPON : PANEL_2} fillOpacity={active ? 0.18 : 1} stroke={active ? NIPPON : LINE} strokeWidth={active ? 2 : 1.5} />
          <path d={`M${x + 44} ${y + 62} v-16 l15 -12 l15 12 v16 z`} fill="none" stroke={active ? NIPPON : MUTED} strokeWidth={2} strokeLinejoin="round" />
          <T x={x + 59} y={y + 94} size={14} anchor="middle" fill={active ? '#F2F4F7' : '#C9CED6'}>
            {room}
          </T>
        </g>
      );
    })}

    <T x={580} y={152} size={26} weight={600}>
      Bedroom
    </T>
    <T x={580} y={192} size={13} fill={MUTED}>
      Dimensions
    </T>
    {[
      ['L', '12 ft'],
      ['B', '10 ft'],
      ['H', '9 ft'],
    ].map(([k, v], i) => (
      <g key={k}>
        <rect x={580 + i * 150} y={204} width={138} height={50} rx={12} fill={PANEL_2} stroke={LINE} />
        <T x={596 + i * 150} y={235} size={13} fill={MUTED}>
          {k}
        </T>
        <T x={702 + i * 150} y={236} size={18} weight={600} anchor="end">
          {v}
        </T>
      </g>
    ))}
    <T x={580} y={292} size={13} fill={MUTED}>
      Colour
    </T>
    {SWATCHES.map((c, i) => (
      <g key={c}>
        {i === 2 && <circle cx={600 + i * 52} cy={326} r={24} fill="none" stroke={NIPPON} strokeWidth={2.5} />}
        <circle cx={600 + i * 52} cy={326} r={18} fill={c} />
      </g>
    ))}
    <T x={580} y={382} size={13} fill={MUTED}>
      Package
    </T>
    <Chip x={580} y={396} w={110} h={38} label="Basic" />
    <Chip x={700} y={396} w={124} h={38} label="Premium" hue={NIPPON} active />
    <Chip x={834} y={396} w={110} h={38} label="Luxury" />
    <T x={580} y={478} size={13} fill={MUTED}>
      Paint needed
    </T>
    <T x={580} y={510} size={24} weight={700}>
      ≈ 8 L
    </T>
    <rect x={760} y={472} width={280} height={52} rx={26} fill={NIPPON} />
    <T x={900} y={504} size={15} weight={700} anchor="middle" fill={BG}>
      Pay in 3 instalments
    </T>
  </Art>
);

const ACK = '#4FB6F0';

const Gauge: React.FC<{ x: number; label: string; value: string; pct: number; tone: string }> = ({ x, label, value, pct, tone }) => {
  const c = 2 * Math.PI * 46;
  return (
    <g>
      <rect x={x} y={150} width={196} height={176} rx={18} fill={PANEL_2} />
      <circle cx={x + 98} cy={226} r={46} fill="none" stroke="#fff" strokeOpacity={0.08} strokeWidth={10} />
      <circle
        cx={x + 98}
        cy={226}
        r={46}
        fill="none"
        stroke={tone}
        strokeWidth={10}
        strokeLinecap="round"
        strokeDasharray={`${pct * c} ${c}`}
        transform={`rotate(-90 ${x + 98} 226)`}
      />
      <T x={x + 98} y={233} size={20} weight={700} anchor="middle">
        {value}
      </T>
      <T x={x + 98} y={306} size={13} anchor="middle" fill={MUTED}>
        {label}
      </T>
    </g>
  );
};

export const AckumenArt: React.FC<ArtComponentProps> = ({ className }) => (
  <Art label="Illustration: Ackumen cooling-tower dashboard with a tower, pH, conductivity and ORP gauges, a live chart and an alarm" hue={ACK} className={className}>
    <Box x={100} y={70} w={1000} h={540} r={26} />
    <T x={136} y={118} size={24} weight={600}>
      Cooling tower 3
    </T>
    <Chip x={340} y={98} w={90} h={28} label="Online" size={12} hue={OK} active />
    <rect x={826} y={96} width={238} height={32} rx={16} fill={WARN} fillOpacity={0.16} stroke={WARN} />
    <T x={945} y={117} size={13} anchor="middle" fill="#F3D58A">
      1 alarm · fan vibration
    </T>

    <g className="ill-float">
      <ellipse cx={270} cy={196} rx={46} ry={18} fill="#fff" opacity={0.06} />
      <ellipse cx={240} cy={168} rx={34} ry={14} fill="#fff" opacity={0.05} />
      <ellipse cx={300} cy={160} rx={30} ry={12} fill="#fff" opacity={0.04} />
    </g>
    <path d="M170 540 C 210 430, 210 330, 186 230 L350 230 C 326 330, 326 430, 366 540 Z" fill="#1A2733" stroke={LINE} strokeWidth={1.5} />
    {[300, 380, 460].map((y) => (
      <line key={y} x1={198} x2={340} y1={y} y2={y} stroke="#fff" strokeOpacity={0.06} strokeWidth={2} />
    ))}
    <rect x={150} y={540} width={236} height={16} rx={8} fill={ACK} opacity={0.3} />
    <Pulse cx={268} cy={420} r={8} color={ACK} />

    <Gauge x={440} label="pH" value="7.8" pct={0.62} tone={OK} />
    <Gauge x={654} label="Conductivity µS/cm" value="1,450" pct={0.78} tone={WARN} />
    <Gauge x={868} label="ORP mV" value="320" pct={0.55} tone={ACK} />

    <rect x={440} y={346} width={624} height={234} rx={18} fill={PANEL_2} />
    <T x={460} y={378} size={13} fill={MUTED}>
      Live · last 15 min
    </T>
    <Pulse cx={1036} cy={373} r={6} color={DANGER} core={DANGER} />
    {[420, 470, 520].map((y) => (
      <line key={y} x1={460} x2={1044} y1={y} y2={y} stroke={FAINT} />
    ))}
    <path d="M460 500 C 520 470, 560 520, 620 480 S 720 430, 780 460 S 900 420, 960 440 S 1020 410, 1044 420" fill="none" stroke={MUTED} strokeOpacity={0.5} strokeWidth={2} strokeDasharray="6 6" />
    <path d="M460 470 C 520 440, 560 500, 620 450 S 720 400, 780 430 S 900 380, 960 410 S 1020 370, 1044 386" fill="none" stroke={ACK} strokeWidth={3} />
  </Art>
);
