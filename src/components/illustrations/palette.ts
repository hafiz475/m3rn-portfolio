// Shared colours for the SVG illustrations. They sit on the site's near-black background.
export const INK = '#F2F4F7';
export const MUTED = '#8A919C';
export const LINE = 'rgba(255,255,255,0.14)';
export const FAINT = 'rgba(255,255,255,0.07)';
export const PANEL = '#12151B';
export const PANEL_2 = '#191D25';
export const BG = '#0A0C10';
export const DANGER = '#F0605D';
export const WARN = '#E8B730';
export const OK = '#4FC38A';
export const WHATSAPP = '#25D366';
export const SANS = 'Inter, ui-sans-serif, system-ui, sans-serif';
export const MONO = 'ui-monospace, SFMono-Regular, Menlo, Consolas, monospace';
export const SERIF = '"Instrument Serif", Georgia, serif';

export type ArtId =
  // Case-study covers share their case study's id
  | 'sirat'
  | 'direction7-messages'
  | 'bizmagnets-bot-builder'
  | 'help-knowledge-map'
  | 'carz-moto'
  | 'my-life-journey'
  // In-article figures
  | 'fig-sirat-review'
  | 'fig-d7-single-source'
  | 'fig-bot-draft-live'
  | 'fig-help-rule'
  | 'fig-carz-intent'
  | 'fig-mlj-iterations'
  // Projects without a public screenshot
  | 'chatops-health'
  | 'vamosys'
  | 'caly'
  | 'direction7-billing'
  | 'smart-assistant'
  | 'fittracker'
  | 'neo-ninja'
  | 'ackumen';
