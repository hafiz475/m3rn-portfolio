import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Info, X, ChevronLeft, ChevronRight } from 'lucide-react';

interface TechItem {
  name: string;
  desc: string;
  longDesc: string;
  color: string;
  icon: React.ReactNode;
  expertPct: number;
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
  gsap: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <path d="M4 12h16M12 4v16" strokeDasharray="3 3" opacity="0.3" />
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8a4 4 0 1 1-4 4" stroke={color} strokeWidth="2.5" />
    </svg>
  ),
  framermotion: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M4 4h16L12 12H4z" fill={`${color}10`} />
      <path d="M4 12h8l8 8H4z" fill={`${color}15`} />
      <path d="M4 20h8l-8-8z" />
    </svg>
  ),
  lucide: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.8">
      <circle cx="7" cy="7" r="3" />
      <rect x="13" y="4" width="6" height="6" rx="1" />
      <path d="M10 19l-4-6h8z" />
    </svg>
  ),
  redis: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.8">
      <path d="M12 2L2 7l10 5 10-5-10-5z" />
      <path d="M2 12l10 5 10-5" />
      <path d="M2 17l10 5 10-5" />
    </svg>
  ),
  threads: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.8" strokeLinecap="round">
      <path d="M12 2v20M17 5v14M7 5v14M22 8v8M2 8v8" strokeDasharray="1 1" opacity="0.3" />
      <circle cx="12" cy="12" r="3" fill={color} />
      <circle cx="17" cy="8" r="1.5" fill={color} />
      <circle cx="7" cy="16" r="1.5" fill={color} />
    </svg>
  ),
  cluster: (color: string) => (
    <svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke={color} strokeWidth="1.8">
      <rect x="9" y="9" width="6" height="6" rx="1" fill={`${color}20`} />
      <rect x="2" y="2" width="5" height="5" rx="1" />
      <rect x="17" y="2" width="5" height="5" rx="1" />
      <rect x="2" y="17" width="5" height="5" rx="1" />
      <rect x="17" y="17" width="5" height="5" rx="1" />
      <path d="M7 4.5h10M4.5 7v10M19.5 7v10M7 19.5h10" strokeDasharray="2 2" opacity="0.3" />
    </svg>
  ),
};

const FRONTEND: TechItem[] = [
  { name: 'React', desc: 'Component UI Library', longDesc: 'Core framework for building dynamic SPA/SSR applications with state orchestration and optimized component renders.', color: '#61DAFB', icon: ICONS.react('#61DAFB'), expertPct: 95 },
  { name: 'Next.js', desc: 'Fullstack framework', longDesc: 'Production framework for server-rendered react apps, static site generation, and optimized routes.', color: '#FFFFFF', icon: ICONS.nextjs('#FFFFFF'), expertPct: 90 },
  { name: 'TypeScript', desc: 'Static Typing Layer', longDesc: 'Strongly typed programming language compiling to JavaScript, enabling scalable frontend architecture.', color: '#3178C6', icon: ICONS.typescript('#3178C6'), expertPct: 92 },
  { name: 'JavaScript', desc: 'Core scripting engine', longDesc: 'Core scripting engine powering modern web interactive interfaces and custom browser animations.', color: '#F7DF1E', icon: ICONS.javascript('#F7DF1E'), expertPct: 96 },
  { name: 'Redux Toolkit', desc: 'Global State architecture', longDesc: 'Predictable state container for managing complex global store logic and data flows.', color: '#764ABC', icon: ICONS.redux('#764ABC'), expertPct: 90 },
  { name: 'Redux-Saga', desc: 'Side Effect Middleware', longDesc: 'Middleware for managing complex asynchronous side effects, background data sync, and API requests.', color: '#89D96D', icon: ICONS.code('#89D96D'), expertPct: 88 },
  { name: 'Redux Thunk', desc: 'Async flow handler', longDesc: 'Simple middleware helper for handling asynchronous actions and API calls inside Redux applications.', color: '#764ABC', icon: ICONS.redux('#764ABC'), expertPct: 90 },
  { name: 'Kendo React', desc: 'Enterprise component pack', longDesc: 'Enterprise UI component library used to build professional client grids, forms, and custom analytics boards.', color: '#FF6358', icon: ICONS.react('#FF6358'), expertPct: 85 },
  { name: 'Material UI', desc: 'Material design system', longDesc: 'UI component library designed using Google\'s Material Design guidelines to create polished layouts.', color: '#007FFF', icon: ICONS.code('#007FFF'), expertPct: 90 },
  { name: 'Bootstrap', desc: 'Responsive grid library', longDesc: 'CSS framework for responsive layouts and mobile-first design patterns.', color: '#7952B3', icon: ICONS.code('#7952B3'), expertPct: 90 },
  { name: 'Tailwind CSS', desc: 'Utility-first utility kit', longDesc: 'Utility-first styling framework for fast, custom, and lightweight modern UI development.', color: '#06B6D4', icon: ICONS.code('#06B6D4'), expertPct: 95 },
  { name: 'SCSS / Sass', desc: 'Extended style nesting', longDesc: 'CSS extension language with nesting, variables, and mixin capabilities for cleaner stylesheets.', color: '#CD6799', icon: ICONS.code('#CD6799'), expertPct: 92 },
  { name: 'Jest', desc: 'Unit testing runner', longDesc: 'JavaScript testing framework with a focus on simplicity and unit reliability.', color: '#C21325', icon: ICONS.testing('#C21325'), expertPct: 88 },
  { name: 'Testing Library', desc: 'React component queries', longDesc: 'Testing utilities that encourage good testing practices by querying DOM elements like users do.', color: '#E33332', icon: ICONS.testing('#E33332'), expertPct: 88 },
  { name: 'Lucide React', desc: 'Vector Icon Pack', longDesc: 'A clean, modern React icon library offering pixel-perfect vector SVG icons matching the portfolio design.', color: '#F05080', icon: ICONS.lucide('#F05080'), expertPct: 95 },
];

const BACKEND: TechItem[] = [
  { name: 'Node.js', desc: 'V8 JS Runtime Environment', longDesc: 'Asynchronous event-driven JavaScript runtime built on Chrome\'s V8 engine to build scalable servers.', color: '#339933', icon: ICONS.nextjs('#339933'), expertPct: 90 },
  { name: 'Express.js', desc: 'Lightweight API structure', longDesc: 'Fast, unopinionated, minimalist web framework for building server applications and microservices.', color: '#FFFFFF', icon: ICONS.code('#FFFFFF'), expertPct: 92 },
  { name: 'FastAPI', desc: 'Python API async framework', longDesc: 'Modern, high-performance web framework for building APIs with Python and automatic OpenAPI generation.', color: '#009688', icon: ICONS.code('#009688'), expertPct: 82 },
  { name: 'REST APIs', desc: 'Standard client request design', longDesc: 'Architecting scalable stateless endpoints with clean HTTP standards, pagination, and error handling.', color: '#FF6C37', icon: ICONS.server('#FF6C37'), expertPct: 95 },
  { name: 'WebSockets', desc: 'Bidirectional state piping', longDesc: 'Persistent bidirectional communication channel for low-latency live feeds and notifications.', color: '#F5A623', icon: ICONS.server('#F5A623'), expertPct: 88 },
  { name: 'Socket.IO', desc: 'Event-driven real-time library', longDesc: 'Event-driven library enabling low-latency, real-time, bidirectional communication between client and server.', color: '#FFFFFF', icon: ICONS.server('#FFFFFF'), expertPct: 90 },
  { name: 'MongoDB', desc: 'BSON Document Database', longDesc: 'Document-oriented NoSQL database for flexible schema designs and data flows.', color: '#47A248', icon: ICONS.database('#47A248'), expertPct: 88 },
  { name: 'PostgreSQL', desc: 'Relational ACID Database', longDesc: 'Relational SQL database focusing on extensibility, ACID compliance, and complex join queries.', color: '#4169E1', icon: ICONS.database('#4169E1'), expertPct: 85 },
  { name: 'Firebase', desc: 'Serverless SDK ecosystem', longDesc: 'Serverless app development platform offering authentication, database storage, and edge cloud hosting.', color: '#FFCA28', icon: ICONS.cloud('#FFCA28'), expertPct: 90 },
  { name: 'Redis', desc: 'In-Memory Cache DB', longDesc: 'High-performance in-memory key-value database used as a caching layer and message broker to optimize query latency.', color: '#D82C20', icon: ICONS.redis('#D82C20'), expertPct: 90 },
  { name: 'Worker Threads', desc: 'CPU-Intensive Concurrency', longDesc: 'Node.js multithreading API used for executing heavy CPU-bound JavaScript operations in separate threads.', color: '#00E676', icon: ICONS.threads('#00E676'), expertPct: 85 },
  { name: 'Cluster', desc: 'Node Load Balancing', longDesc: 'Production process-level load balancer enabling Node.js to spawn instances across all CPU cores for scale.', color: '#03A9F4', icon: ICONS.cluster('#03A9F4'), expertPct: 88 },
];

const DEVOPS: TechItem[] = [
  { name: 'DigitalOcean', desc: 'Linux droplet hosting VM', longDesc: 'Cloud infrastructure platform for deploying Linux Virtual Private Servers (Droplets) and static apps.', color: '#0080FF', icon: ICONS.cloud('#0080FF'), expertPct: 88 },
  { name: 'Cloudflare S3', desc: 'Edge storage & assets CDN', longDesc: 'Edge-optimized cloud storage and global CDN networks for ultra-fast asset caching and security.', color: '#F38020', icon: ICONS.cloud('#F38020'), expertPct: 86 },
  { name: 'PM2', desc: 'Node runtime process manager', longDesc: 'Production process manager for Node.js applications with load balancing and automatic crash handling.', color: '#2B037A', icon: ICONS.server('#2B037A'), expertPct: 90 },
  { name: 'Nginx', desc: 'Reverse proxy & load router', longDesc: 'High-performance web server, reverse proxy, load balancer, HTTP cache, and security firewall.', color: '#009639', icon: ICONS.nginx('#009639'), expertPct: 88 },
  { name: 'Jenkins', desc: 'Continuous deployment robot', longDesc: 'Open source automation server for continuous integration and deployment pipeline setups.', color: '#D24939', icon: ICONS.git('#D24939'), expertPct: 82 },
  { name: 'GitHub', desc: 'Version workspace ecosystem', longDesc: 'Git repository hosting service with automation actions and development collaboration workflows.', color: '#FFFFFF', icon: ICONS.git('#FFFFFF'), expertPct: 95 },
  { name: 'GitLab', desc: 'Enterprise VCS workflows', longDesc: 'DevOps software package combining wiki, issue tracking, and automated CI/CD pipelines.', color: '#FC6D26', icon: ICONS.git('#FC6D26'), expertPct: 88 },
  { name: 'CI/CD Pipelines', desc: 'Automated testing & deployments', longDesc: 'Automated build, test, and deployment processes from code commits directly to production.', color: '#40C4FF', icon: ICONS.git('#40C4FF'), expertPct: 86 },
];

const THREED: TechItem[] = [
  { name: 'Three.js', desc: 'WebGL 3D mathematical core', longDesc: 'JavaScript library used to create and display animated 3D computer graphics directly in web browsers.', color: '#FFFFFF', icon: ICONS.threejs('#FFFFFF'), expertPct: 88 },
  { name: 'React Three Fiber', desc: 'React component render system', longDesc: 'A React renderer for Three.js, allowing declarative component creation of rich 3D canvases.', color: '#61DAFB', icon: ICONS.react('#61DAFB'), expertPct: 85 },
  { name: 'Drei', desc: 'R3F canvas helper helpers', longDesc: 'A helper library for React Three Fiber, providing predefined camera setups, lighting, and textures.', color: '#F5A623', icon: ICONS.threejs('#F5A623'), expertPct: 85 },
  { name: 'Blender 3D', desc: 'High-poly polygon modelling', longDesc: 'Open-source 3D creation suite used for modeling, texturing, rigging, animation, and low-poly assets.', color: '#EA7600', icon: ICONS.threejs('#EA7600'), expertPct: 80 },
  { name: 'GSAP', desc: 'High-performance animation', longDesc: 'An extremely powerful JavaScript animation library for creating advanced timelines, scroll-driven triggers, and physics-based motion.', color: '#88CE02', icon: ICONS.gsap('#88CE02'), expertPct: 90 },
  { name: 'Framer Motion', desc: 'React animation toolkit', longDesc: 'A production-ready motion and gesture library for React components, enabling physics-based animations, layout transitions, and page load entry points.', color: '#FF00C8', icon: ICONS.framermotion('#FF00C8'), expertPct: 92 },
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
    <div 
      className="relative w-full overflow-hidden py-2"
      style={{
        WebkitMaskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)',
        maskImage: 'linear-gradient(to right, transparent, white 10%, white 90%, transparent)',
      }}
    >
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

interface RowData {
  label: string;
  items: TechItem[];
  direction: string;
  speed: number;
}

const ROWS: RowData[] = [
  { label: 'Frontend', items: FRONTEND, direction: 'left', speed: 110 },
  { label: 'Backend', items: BACKEND, direction: 'right', speed: 95 },
  { label: 'Server & DevOps', items: DEVOPS, direction: 'left', speed: 85 },
  { label: '3D & Creative', items: THREED, direction: 'right', speed: 55 },
];

export const TechStack: React.FC = () => {
  const [activeModalRow, setActiveModalRow] = useState<RowData | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (activeModalRow) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [activeModalRow]);

  const openModal = (row: RowData) => {
    setActiveModalRow(row);
    setActiveIndex(0);
  };

  const closeModal = () => {
    setActiveModalRow(null);
  };

  const handleNext = () => {
    if (!activeModalRow) return;
    setActiveIndex((prev) => (prev + 1) % activeModalRow.items.length);
  };

  const handlePrev = () => {
    if (!activeModalRow) return;
    setActiveIndex((prev) => (prev - 1 + activeModalRow.items.length) % activeModalRow.items.length);
  };

  // Compute 3-dot active state from activeIndex and items count
  const getActiveDot = (index: number, total: number) => {
    if (total <= 3) return index; // Fallback if list is too small
    const firstThird = Math.floor(total / 3);
    const lastThird = Math.ceil((total * 2) / 3);

    if (index < firstThird) {
      return 0; // Start
    } else if (index >= lastThird) {
      return 2; // End
    } else {
      return 1; // Middle
    }
  };

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
            Technologies and frameworks I use to build scalable, high-performance web applications. Click the info icons next to categories to see details.
          </p>
        </motion.div>

        {/* Constrained Glassy Panel Container */}
        <div className="bg-surface/30 border border-stroke rounded-[32px] p-6 sm:p-8 md:p-10 flex flex-col gap-8 overflow-hidden relative shadow-2xl">
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
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' }} />
                  <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-mono font-semibold">
                    {row.label}
                  </span>
                </div>
                
                {/* Info Trigger Button */}
                <button
                  onClick={() => openModal(row)}
                  className="p-1 rounded-full text-muted hover:text-text-primary hover:bg-white/5 border border-transparent hover:border-stroke transition-all duration-300 flex items-center justify-center cursor-pointer"
                  title={`View details for ${row.label}`}
                >
                  <Info className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* Marquee Track */}
              <MarqueeRow items={row.items} direction={row.direction as 'left' | 'right'} speed={row.speed} />
            </motion.div>
          ))}
        </div>

      </div>

      {/* Detail arc modal rendered in React Portal to escape parent transforms and overlays the Navbar */}
      {activeModalRow && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModal}
            className="fixed inset-0 z-[999999] bg-black/90 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.94, y: 20, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.94, y: 20, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[500px] bg-surface/30 border border-stroke rounded-[2.2rem] overflow-hidden shadow-2xl relative p-6 md:p-8 flex flex-col gap-6"
            >
              {/* Modal Header */}
              <div className="flex items-center justify-between pb-3 border-b border-stroke">
                <div>
                  <span className="text-[10px] text-muted uppercase tracking-[0.2em] font-mono block">Category Details</span>
                  <h3 className="text-xl font-medium text-text-primary font-display">{activeModalRow.label} Stack</h3>
                </div>
                <button
                  onClick={closeModal}
                  className="w-8 h-8 rounded-full bg-black/40 hover:bg-black/80 border border-white/10 flex items-center justify-center text-text-primary cursor-pointer transition-colors"
                >
                  <X className="w-4.5 h-4.5" />
                </button>
              </div>

              {/* Arc Carousel Area */}
              <div className="relative w-full flex items-center justify-center" style={{ height: 170 }}>
                {/* Left Controller */}
                <button
                  onClick={handlePrev}
                  className="absolute left-0 z-50 w-9 h-9 rounded-full border border-stroke bg-black/40 hover:bg-text-primary text-text-primary hover:text-bg flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Arc display */}
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                  {activeModalRow.items.map((item, i) => {
                    const diff = i - activeIndex;
                    
                    // Simple angle step based on relative offset
                    const theta = diff * 0.45;
                    const isVisible = Math.abs(diff) <= 2;
                    
                    if (!isVisible) return null;

                    // Compute responsive layout variables
                    const R = 180;
                    const x = R * Math.sin(theta);
                    const y = R * (1 - Math.cos(theta)) + 10;
                    const rot = theta * (180 / Math.PI);
                    const scale = 1 - Math.min(0.25, Math.abs(diff) * 0.12);
                    const opacity = Math.max(0, 1 - Math.abs(diff) * 0.38);
                    const zIndex = 20 - Math.abs(diff);

                    return (
                      <div
                        key={item.name}
                        onClick={() => setActiveIndex(i)}
                        className={`absolute cursor-pointer select-none transition-all duration-500 rounded-2xl p-4 flex flex-col items-center justify-center gap-2 border w-[110px] h-[110px] bg-bg/95 shadow-xl`}
                        style={{
                          transform: `translate(-50%, 0) translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`,
                          opacity: opacity,
                          zIndex: zIndex,
                          left: '50%',
                          top: '15px',
                          borderColor: diff === 0 ? item.color : 'rgba(255, 255, 255, 0.08)',
                          boxShadow: diff === 0 ? `0 10px 30px -10px ${item.color}35` : 'none',
                        }}
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center"
                          style={{ backgroundColor: `${item.color}15` }}
                        >
                          {item.icon}
                        </div>
                        <span className="text-[11px] font-semibold text-text-primary text-center truncate w-full">
                          {item.name}
                        </span>
                      </div>
                    );
                  })}
                </div>

                {/* Right Controller */}
                <button
                  onClick={handleNext}
                  className="absolute right-0 z-50 w-9 h-9 rounded-full border border-stroke bg-black/40 hover:bg-text-primary text-text-primary hover:text-bg flex items-center justify-center transition-all cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* Detail Display Panel for active stack */}
              {(() => {
                const activeItem = activeModalRow.items[activeIndex];
                if (!activeItem) return null;
                
                return (
                  <div className="flex flex-col gap-4 border border-stroke bg-black/30 rounded-2xl p-5 relative overflow-hidden">
                    {/* Background glow trace */}
                    <div
                      className="absolute top-0 right-0 w-24 h-24 rounded-full filter blur-[40px] opacity-10 transition-colors duration-500"
                      style={{ background: activeItem.color }}
                    />
                    
                    {/* Title & Level */}
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-text-primary">
                        {activeItem.name}
                      </span>
                      <span className="text-xs font-mono font-bold" style={{ color: activeItem.color }}>
                        {activeItem.expertPct}% — Expert
                      </span>
                    </div>

                    {/* Progress track */}
                    <div className="w-full h-1.5 bg-white/5 border border-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${activeItem.expertPct}%` }}
                        transition={{ duration: 0.8, ease: 'easeOut' }}
                        className="h-full rounded-full"
                        style={{
                          background: `linear-gradient(90deg, ${activeItem.color}cc 0%, ${activeItem.color} 100%)`,
                          boxShadow: `0 0 8px ${activeItem.color}80`,
                        }}
                      />
                    </div>

                    {/* Introduction Paragraph */}
                    <p className="text-[12.5px] text-muted font-body leading-relaxed">
                      {activeItem.longDesc}
                    </p>
                  </div>
                );
              })()}

              {/* 3-Dot relative tracking reference */}
              <div className="flex items-center justify-center gap-2 pt-2">
                {[0, 1, 2].map((dotIndex) => {
                  const currentDot = getActiveDot(activeIndex, activeModalRow.items.length);
                  const isActive = currentDot === dotIndex;
                  const label = dotIndex === 0 ? 'Start' : dotIndex === 1 ? 'Middle' : 'End';
                  
                  return (
                    <div
                      key={dotIndex}
                      className={`h-1.5 rounded-full transition-all duration-300`}
                      style={{
                        width: isActive ? '20px' : '6px',
                        background: isActive ? 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)' : 'rgba(255, 255, 255, 0.15)',
                      }}
                      title={label}
                    />
                  );
                })}
              </div>

            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}
    </section>
  );
};
