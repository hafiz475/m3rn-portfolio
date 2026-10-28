import React, { useId } from 'react';
import { BG, INK, LINE, MONO, PANEL, SANS, SERIF } from './palette';

interface ArtProps {
  label: string;
  hue: string;
  width?: number;
  height?: number;
  /** Centre of the background glow, as fractions of the canvas */
  glow?: [number, number];
  /** cover crops to fill its box (cards, covers); contain keeps the whole drawing (diagrams) */
  fit?: 'cover' | 'contain';
  className?: string;
  children: React.ReactNode;
}

/** Canvas every illustration draws on: dark backdrop, dot grid and a soft glow in the illustration's hue. */
export const Art: React.FC<ArtProps> = ({ label, hue, width = 1200, height = 675, glow = [0.5, 0.45], fit = 'cover', className, children }) => {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, '');
  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      preserveAspectRatio={fit === 'cover' ? 'xMidYMid slice' : 'xMidYMid meet'}
      role="img"
      aria-label={label}
      className={className}
      fontFamily={SANS}
    >
      <defs>
        <pattern id={`${uid}-dots`} width="24" height="24" patternUnits="userSpaceOnUse">
          <circle cx="1.5" cy="1.5" r="1.2" fill="#fff" opacity="0.06" />
        </pattern>
        <radialGradient id={`${uid}-glow`} cx={glow[0]} cy={glow[1]} r="0.65">
          <stop offset="0" stopColor={hue} stopOpacity="0.26" />
          <stop offset="1" stopColor={hue} stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={width} height={height} fill={BG} />
      <rect width={width} height={height} fill={`url(#${uid}-dots)`} />
      <rect width={width} height={height} fill={`url(#${uid}-glow)`} />
      {children}
    </svg>
  );
};

interface BoxProps {
  x: number;
  y: number;
  w: number;
  h: number;
  r?: number;
  fill?: string;
  stroke?: string;
  strokeWidth?: number;
  dash?: string;
  opacity?: number;
  fillOpacity?: number;
}

export const Box: React.FC<BoxProps> = ({ x, y, w, h, r = 16, fill = PANEL, stroke = LINE, strokeWidth = 1.5, dash, opacity, fillOpacity }) => (
  <rect
    x={x}
    y={y}
    width={w}
    height={h}
    rx={r}
    fill={fill}
    fillOpacity={fillOpacity}
    stroke={stroke}
    strokeWidth={strokeWidth}
    strokeDasharray={dash}
    opacity={opacity}
  />
);

/** A rounded bar standing in for a line of text. */
export const Bar: React.FC<{ x: number; y: number; w: number; h?: number; o?: number; fill?: string }> = ({ x, y, w, h = 10, o = 0.18, fill = '#fff' }) => (
  <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={fill} opacity={o} />
);

interface TextProps {
  x: number;
  y: number;
  size?: number;
  weight?: number;
  fill?: string;
  anchor?: 'start' | 'middle' | 'end';
  font?: 'sans' | 'mono' | 'serif';
  italic?: boolean;
  spacing?: number;
  opacity?: number;
  strike?: boolean;
  children: React.ReactNode;
}

export const T: React.FC<TextProps> = ({ x, y, size = 14, weight = 500, fill = INK, anchor = 'start', font = 'sans', italic, spacing, opacity, strike, children }) => (
  <text
    x={x}
    y={y}
    fontSize={size}
    fontWeight={weight}
    fill={fill}
    textAnchor={anchor}
    fontFamily={font === 'mono' ? MONO : font === 'serif' ? SERIF : undefined}
    fontStyle={italic ? 'italic' : undefined}
    letterSpacing={spacing}
    opacity={opacity}
    textDecoration={strike ? 'line-through' : undefined}
  >
    {children}
  </text>
);

interface ChipProps {
  x: number;
  y: number;
  w: number;
  h?: number;
  label: string;
  hue?: string;
  active?: boolean;
  size?: number;
  font?: 'sans' | 'mono';
  fill?: string;
  textFill?: string;
}

/** Pill with centred text. Active chips are tinted with the hue. */
export const Chip: React.FC<ChipProps> = ({ x, y, w, h = 34, label, hue = INK, active, size = 14, font = 'sans', fill, textFill }) => (
  <g>
    <rect
      x={x}
      y={y}
      width={w}
      height={h}
      rx={h / 2}
      fill={fill ?? (active ? hue : 'transparent')}
      fillOpacity={fill ? undefined : active ? 0.16 : 0}
      stroke={active ? hue : LINE}
      strokeWidth={1.5}
    />
    <T x={x + w / 2} y={y + h / 2 + size * 0.36} size={size} anchor="middle" font={font} fill={textFill ?? (active ? INK : '#C9CED6')}>
      {label}
    </T>
  </g>
);

interface ArrowProps {
  d: string;
  /** Arrowhead tip and the direction it points, in degrees (0 = right, 90 = down) */
  head: [number, number, number];
  color?: string;
  width?: number;
  dashed?: boolean;
  flow?: boolean;
  opacity?: number;
}

export const Arrow: React.FC<ArrowProps> = ({ d, head, color = INK, width = 2, dashed, flow, opacity = 1 }) => (
  <g opacity={opacity}>
    <path
      d={d}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={dashed || flow ? '6 6' : undefined}
      className={flow ? 'ill-flow' : undefined}
    />
    <polygon points="0,0 -12,-6.5 -12,6.5" fill={color} transform={`translate(${head[0]} ${head[1]}) rotate(${head[2]})`} />
  </g>
);

/** The pulsing "you can interact" dot. */
export const Pulse: React.FC<{ cx: number; cy: number; r?: number; color: string; core?: string }> = ({ cx, cy, r = 10, color, core = '#fff' }) => (
  <g>
    <circle cx={cx} cy={cy} r={r * 2.4} fill={color} opacity={0.12} />
    <circle cx={cx} cy={cy} r={r} fill={color} opacity={0.55} className="ill-pulse" />
    <circle cx={cx} cy={cy} r={r * 0.55} fill={core} />
  </g>
);

export const Check: React.FC<{ x: number; y: number; s?: number; color?: string; width?: number }> = ({ x, y, s = 1, color = INK, width = 2.5 }) => (
  <path
    d={`M${x - 7 * s} ${y} l${5 * s} ${5 * s} l${9 * s} ${-10 * s}`}
    fill="none"
    stroke={color}
    strokeWidth={width}
    strokeLinecap="round"
    strokeLinejoin="round"
  />
);

export const Cross: React.FC<{ x: number; y: number; s?: number; color?: string; width?: number }> = ({ x, y, s = 1, color = INK, width = 2.5 }) => (
  <path
    d={`M${x - 6 * s} ${y - 6 * s} l${12 * s} ${12 * s} M${x + 6 * s} ${y - 6 * s} l${-12 * s} ${12 * s}`}
    stroke={color}
    strokeWidth={width}
    strokeLinecap="round"
  />
);

export const Lock: React.FC<{ x: number; y: number; s?: number; color?: string }> = ({ x, y, s = 1, color = INK }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path d="M-5 -2 v-4 a5 5 0 0 1 10 0 v4" fill="none" stroke={color} strokeWidth={2} />
    <rect x={-8} y={-2} width={16} height={12} rx={3} fill={color} />
  </g>
);

/** WhatsApp-style speech bubble glyph on a green disc. */
export const WhatsAppGlyph: React.FC<{ cx: number; cy: number; r?: number; fill?: string }> = ({ cx, cy, r = 22, fill = '#25D366' }) => (
  <g>
    <circle cx={cx} cy={cy} r={r} fill={fill} />
    <path
      d={`M${cx - r * 0.42} ${cy + r * 0.42} l${r * 0.08} ${-r * 0.3} a${r * 0.42} ${r * 0.42} 0 1 1 ${r * 0.22} ${r * 0.22} z`}
      fill="none"
      stroke="#fff"
      strokeWidth={r * 0.09}
      strokeLinejoin="round"
    />
  </g>
);

/** Window frame with a title bar, used for app screens. */
export const Window: React.FC<{ x: number; y: number; w: number; h: number; r?: number; title?: string; fill?: string }> = ({ x, y, w, h, r = 24, title, fill = PANEL }) => (
  <g>
    <rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={LINE} strokeWidth={1.5} />
    {title !== undefined && (
      <>
        <circle cx={x + 26} cy={y + 24} r={5} fill="#fff" opacity={0.18} />
        <circle cx={x + 44} cy={y + 24} r={5} fill="#fff" opacity={0.12} />
        <circle cx={x + 62} cy={y + 24} r={5} fill="#fff" opacity={0.08} />
        {title && (
          <T x={x + w / 2} y={y + 29} size={13} anchor="middle" font="mono" fill="#7C838E">
            {title}
          </T>
        )}
        <line x1={x} x2={x + w} y1={y + 48} y2={y + 48} stroke={LINE} />
      </>
    )}
  </g>
);
