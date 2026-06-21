import React from 'react';
import { motion } from 'framer-motion';

interface TechItem {
  name: string;
  desc: string;
  color: string;
  icon: React.ReactNode;
}

// Inline custom SVG path icons for maximum fidelity
const ICONS = {
  react: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="2">
      <circle cx="12" cy="12" r="2" />
      <path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9z" strokeDasharray="3 3" opacity="0.3" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(30 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(90 12 12)" />
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(150 12 12)" />
    </svg>
  ),
  nextjs: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="2">
      <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm-2 5.5h2v9h-2zm4.5 4.5a2.5 2.5 0 0 1 2.5 2.5v2h-2v-2a.5.5 0 0 0-.5-.5h-.5v3h-2v-9h2.5a2.5 2.5 0 0 1 2.5 2.5z" fill={color} stroke="none" />
    </svg>
  ),
  typescript: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M9 9h3M10.5 9v6M14 15c.5.5 1 .7 1.7.7s1-.3 1-.7c0-1.5-3-1-3-3.3 0-.6.4-1.2 1.3-1.2s1.5.3 2 .8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  javascript: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.5">
      <rect x="3" y="3" width="18" height="18" rx="3" />
      <path d="M10 15c.5.5 1.2.7 1.8.7.6 0 1-.3 1-.7 0-1.2-2.8-.7-2.8-2.5 0-.7.6-1.5 1.8-1.5s1.8.5 2.2 1M16 10v4.5c0 .8-.5 1.5-1.2 1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  redux: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="2">
      <path d="M12 3L4 7v10l8 4 8-4V7l-8-4z" />
      <path d="M12 8l-4 2v4l4 2 4-2v-4z" fill={`${color}20`} />
      <circle cx="12" cy="12" r="1.5" fill={color} />
    </svg>
  ),
  threejs: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.5">
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  database: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.8">
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
      <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3" />
    </svg>
  ),
  server: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.8">
      <rect x="2" y="2" width="20" height="6" rx="1" />
      <rect x="2" y="9" width="20" height="6" rx="1" />
      <rect x="2" y="16" width="20" height="6" rx="1" />
      <circle cx="6" cy="5" r="1" fill={color} />
      <circle cx="6" cy="12" r="1" fill={color} />
      <circle cx="6" cy="19" r="1" fill={color} />
    </svg>
  ),
  cloud: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  code: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M16 18l6-6-6-6M8 6L2 12l6 6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
  testing: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3-3a1 1 0 0 0 0-1.4l-1.6-1.6a1 1 0 0 0-1.4 0l-3 3z" />
      <path d="M16 12v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6" />
    </svg>
  ),
  nginx: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 17l10 5 10-5V7L12 12 2 7v10z" />
    </svg>
  ),
  git: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <circle cx="6" cy="18" r="3" />
      <path d="M6 9v6M9 6h9v9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  ),
};

const FRONTEND: TechItem[] = [
  { name: 'React', desc: 'Component UI Library', color: '#61DAFB', icon: ICONS.react('#61DAFB') },
  { name: 'Next.js', desc: 'Fullstack framework', color: '#FFFFFF', icon: ICONS.nextjs('#FFFFFF') },
  { name: 'TypeScript', desc: 'Static Typing Layer', color: '#3178C6', icon: ICONS.typescript('#3178C6') },
  { name: 'JavaScript', desc: 'Core scripting engine', color: '#F7DF1E', icon: ICONS.javascript('#F7DF1E') },
  { name: 'Redux Toolkit', desc: 'Global State architecture', color: '#764ABC', icon: ICONS.redux('#764ABC') },
  { name: 'Redux-Saga', desc: 'Side Effect Middleware', color: '#89D96D', icon: ICONS.code('#89D96D') },
  { name: 'Redux Thunk', desc: 'Async flow handler', color: '#764ABC', icon: ICONS.redux('#764ABC') },
  { name: 'Kendo React', desc: 'Enterprise component pack', color: '#FF6358', icon: ICONS.react('#FF6358') },
  { name: 'Material UI', desc: 'Material design system', color: '#007FFF', icon: ICONS.code('#007FFF') },
  { name: 'Bootstrap', desc: 'Responsive grid library', color: '#7952B3', icon: ICONS.code('#7952B3') },
  { name: 'Tailwind CSS', desc: 'Utility-first utility kit', color: '#06B6D4', icon: ICONS.code('#06B6D4') },
  { name: 'SCSS / Sass', desc: 'Extended style nesting', color: '#CD6799', icon: ICONS.code('#CD6799') },
  { name: 'Jest', desc: 'Unit testing runner', color: '#C21325', icon: ICONS.testing('#C21325') },
  { name: 'Testing Library', desc: 'React component queries', color: '#E33332', icon: ICONS.testing('#E33332') },
];

const BACKEND: TechItem[] = [
  { name: 'Node.js', desc: 'V8 JS Runtime Environment', color: '#339933', icon: ICONS.nextjs('#339933') },
  { name: 'Express.js', desc: 'Lightweight API structure', color: '#FFFFFF', icon: ICONS.code('#FFFFFF') },
  { name: 'FastAPI', desc: 'Python API async framework', color: '#009688', icon: ICONS.code('#009688') },
  { name: 'REST APIs', desc: 'Standard client request design', color: '#FF6C37', icon: ICONS.server('#FF6C37') },
  { name: 'WebSockets', desc: 'Bidirectional state piping', color: '#F5A623', icon: ICONS.server('#F5A623') },
  { name: 'Socket.IO', desc: 'Event-driven real-time library', color: '#FFFFFF', icon: ICONS.server('#FFFFFF') },
  { name: 'MongoDB', desc: 'BSON Document Database', color: '#47A248', icon: ICONS.database('#47A248') },
  { name: 'PostgreSQL', desc: 'Relational ACID Database', color: '#4169E1', icon: ICONS.database('#4169E1') },
  { name: 'Firebase', desc: 'Serverless SDK ecosystem', color: '#FFCA28', icon: ICONS.cloud('#FFCA28') },
];

const DEVOPS: TechItem[] = [
  { name: 'DigitalOcean', desc: 'Linux droplet hosting VM', color: '#0080FF', icon: ICONS.cloud('#0080FF') },
  { name: 'Cloudflare S3', desc: 'Edge storage & assets CDN', color: '#F38020', icon: ICONS.cloud('#F38020') },
  { name: 'PM2', desc: 'Node runtime process manager', color: '#2B037A', icon: ICONS.server('#2B037A') },
  { name: 'Nginx', desc: 'Reverse proxy & load router', color: '#009639', icon: ICONS.nginx('#009639') },
  { name: 'Jenkins', desc: 'Continuous deployment robot', color: '#D24939', icon: ICONS.git('#D24939') },
  { name: 'GitHub', desc: 'Version workspace ecosystem', color: '#FFFFFF', icon: ICONS.git('#FFFFFF') },
  { name: 'GitLab', desc: 'Enterprise VCS workflows', color: '#FC6D26', icon: ICONS.git('#FC6D26') },
  { name: 'CI/CD Pipelines', desc: 'Automated testing & deployments', color: '#40C4FF', icon: ICONS.git('#40C4FF') },
];

const THREED: TechItem[] = [
  { name: 'Three.js', desc: 'WebGL 3D mathematical core', color: '#FFFFFF', icon: ICONS.threejs('#FFFFFF') },
  { name: 'React Three Fiber', desc: 'React component render system', color: '#61DAFB', icon: ICONS.react('#61DAFB') },
  { name: 'Drei', desc: 'R3F canvas helper helpers', color: '#F5A623', icon: ICONS.threejs('#F5A623') },
  { name: 'Blender 3D', desc: 'High-poly polygon modelling', color: '#EA7600', icon: ICONS.threejs('#EA7600') },
];

interface MarqueeRowProps {
  items: TechItem[];
  direction: 'left' | 'right';
  speed?: number;
}

const MarqueeRow: React.FC<MarqueeRowProps> = ({ items, direction, speed = 30 }) => {
  const tripled = [...items, ...items, ...items];
  const animClass = direction === 'left' ? 'animate-marquee-left' : 'animate-marquee-right';

  return (
    <div className="relative w-full overflow-hidden py-2">
      {/* Side gradients inside the card panel wrapper */}
      <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-r from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent" />
      <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-16 sm:w-24 z-10 bg-gradient-to-l from-[#0d0d0d] via-[#0d0d0d]/80 to-transparent" />

      <div
        className={`flex gap-3 sm:gap-4 w-max ${animClass}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {tripled.map((item, idx) => (
          <div
            key={`${item.name}-${idx}`}
            className="flex items-center gap-3 w-[240px] sm:w-[270px] px-4 py-3 rounded-xl bg-white/[0.02] border border-white/[0.05] hover:border-white/15 hover:bg-white/[0.06] transition-all duration-300 flex-shrink-0 group"
          >
            {/* Logo Wrapper */}
            <div
              className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-105"
              style={{ backgroundColor: `${item.color}10`, border: `1px solid ${item.color}20` }}
            >
              {item.icon}
            </div>
            
            {/* Description Text */}
            <div className="flex flex-col gap-0.5 min-w-0">
              <span className="text-[13px] font-semibold text-text-primary group-hover:text-text-primary transition-colors duration-200 truncate">
                {item.name}
              </span>
              <span className="text-[10px] text-muted leading-snug truncate group-hover:text-text-primary/75 transition-colors">
                {item.desc}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const ROWS = [
  { label: 'Frontend', items: FRONTEND, direction: 'left', speed: 45 },
  { label: 'Backend', items: BACKEND, direction: 'right', speed: 38 },
  { label: 'Server & DevOps', items: DEVOPS, direction: 'left', speed: 34 },
  { label: '3D & Creative', items: THREED, direction: 'right', speed: 22 },
];

export const TechStack: React.FC = () => {
  return (
    <section className="relative z-10 bg-transparent py-20 md:py-28 overflow-hidden select-none border-b border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col gap-3 max-w-lg mb-12 md:mb-16"
        >
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-body font-bold">Tech Stack</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary font-display font-medium leading-none">
            Tools I <span className="italic font-serif">work with</span>
          </h2>
          <p className="text-sm md:text-base text-muted font-body leading-relaxed mt-2">
            Technologies and frameworks I use to build scalable, high-performance web applications.
          </p>
        </motion.div>

        {/* Constrained Glassy Panel Container */}
        <div className="bg-[#0c0c0c] border border-stroke rounded-[32px] p-6 sm:p-8 md:p-10 flex flex-col gap-8 overflow-hidden relative shadow-2xl">
          {ROWS.map((row, i) => (
            <motion.div
              key={row.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="flex flex-col gap-3"
            >
              {/* Category Header Label */}
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }} />
                <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-mono font-semibold">
                  {row.label}
                </span>
              </div>

              {/* Marquee Track */}
              <MarqueeRow items={row.items} direction={row.direction} speed={row.speed} />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
