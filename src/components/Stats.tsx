import React, { useEffect, useRef } from 'react';
import { animate, motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring, useTransform } from 'framer-motion';
import portrait from '../assets/portrait.webp';
import quillMark from '../assets/quill-mark.png';

interface StatItem {
  id: string;
  value: string;
  label: string;
  subtext: string;
}

// First developer role started December 2021
const CAREER_START = new Date(2021, 11, 1);
const yearsOfExperience = (Date.now() - CAREER_START.getTime()) / (365.25 * 24 * 60 * 60 * 1000);
const fullYears = Math.floor(yearsOfExperience);

const STATS: StatItem[] = [
  {
    id: 'stat-1',
    value: yearsOfExperience >= 5 ? `${fullYears}+` : String(Math.round(yearsOfExperience)),
    label: 'Years Experience',
    subtext: `${yearsOfExperience >= 5 ? `${fullYears}+ years` : `Nearly ${Math.round(yearsOfExperience)} years`} since December 2021, building scalable products and high-performance interactive web systems.`,
  },
  {
    id: 'stat-2',
    value: '20+',
    label: 'Projects Done',
    subtext: 'Delivering end-to-end products for startups and enterprises.'
  },
];

/** Portrait card that tilts towards the pointer, with a glare and layers floating above the photo. */
const ProfileCard: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const pointerX = useMotionValue(0.5);
  const pointerY = useMotionValue(0.5);
  const x = useSpring(pointerX, { stiffness: 140, damping: 16 });
  const y = useSpring(pointerY, { stiffness: 140, damping: 16 });
  const rotateY = useTransform(x, [0, 1], [-14, 14]);
  const rotateX = useTransform(y, [0, 1], [12, -12]);
  const glareX = useTransform(x, [0, 1], ['10%', '90%']);
  const glareY = useTransform(y, [0, 1], ['5%', '95%']);
  const glare = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.24), transparent 55%)`;

  // Without a hover pointer (phones, tablets) the card sways on its own
  useEffect(() => {
    if (reduceMotion || !window.matchMedia('(hover: none)').matches) return;
    const swayX = animate(pointerX, [0.3, 0.7, 0.3], { duration: 9, repeat: Infinity, ease: 'easeInOut' });
    const swayY = animate(pointerY, [0.4, 0.6, 0.4], { duration: 7, repeat: Infinity, ease: 'easeInOut' });
    return () => {
      swayX.stop();
      swayY.stop();
    };
  }, [reduceMotion, pointerX, pointerY]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (reduceMotion || e.pointerType !== 'mouse' || !cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    pointerX.set((e.clientX - rect.left) / rect.width);
    pointerY.set((e.clientY - rect.top) / rect.height);
  };

  const handlePointerLeave = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return;
    pointerX.set(0.5);
    pointerY.set(0.5);
  };

  return (
    <div style={{ perspective: 1100 }}>
      <motion.div
        ref={cardRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
        style={reduceMotion ? undefined : { rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className="relative aspect-[3/4] w-[250px] sm:w-[270px]"
      >
        {/* Card face */}
        <div className="absolute inset-0 rounded-[1.6rem] p-[1.5px] shadow-2xl shadow-black/60">
          <span aria-hidden className="accent-gradient absolute inset-0 rounded-[1.6rem] opacity-70" />
          <div className="relative h-full w-full overflow-hidden rounded-[calc(1.6rem-1.5px)] bg-bg">
            <img
              src={portrait}
              alt="Portrait of J Md Hafizur Rahman"
              loading="lazy"
              decoding="async"
              draggable={false}
              className="absolute inset-0 h-full w-full object-cover object-[50%_20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25" />
            <motion.div aria-hidden className="absolute inset-0 mix-blend-soft-light" style={{ background: glare }} />
          </div>
        </div>

        {/* Layers that float a little above the photo. Kept shallow: deeper layers grow and drift towards the edges. */}
        <div className="pointer-events-none absolute inset-x-4 top-4 flex items-center justify-between" style={{ transform: 'translateZ(24px)' }}>
          <span className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/50">
            <img src={quillMark} alt="" className="h-6 w-6" />
          </span>
          <span className="rounded-full border border-white/10 bg-black/50 px-3 py-1.5 font-mono text-[10px] tracking-wide text-white/90">
            Frontend Lead
          </span>
        </div>
        <div
          className="pointer-events-none absolute inset-x-4 bottom-4 rounded-2xl border border-white/10 bg-black/60 px-4 pb-3.5 pt-3 shadow-lg shadow-black/40"
          style={{ transform: 'translateZ(28px)' }}
        >
          <span className="block font-display text-[1.45rem] italic leading-[1.1] text-white">J Md Hafizur Rahman</span>
          <span className="mt-1 block text-xs text-white/75">Senior full-stack · BizMagnets</span>
          <span className="mt-3 flex items-center justify-between border-t border-white/10 pt-2.5 text-[11px] text-white/60">
            <span className="flex items-center gap-1.5">
              <span className="accent-gradient h-1.5 w-1.5 rounded-full" />
              Chennai, India
            </span>
            <span>Since 2021</span>
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export const Stats: React.FC = () => {
  return (
    <section className="relative z-10 bg-transparent py-20 md:py-28 overflow-hidden select-none border-b border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-10 md:gap-12 lg:gap-16">
          {/* The two stats share a row so their numbers line up beside the taller card */}
          <div className="grid grid-cols-1 md:col-span-2 md:grid-cols-2 items-start gap-10 md:gap-12 lg:gap-16">
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col gap-3 relative md:border-l md:border-stroke md:pl-8 lg:pl-12 first:border-0 first:pl-0"
            >
              {/* Stat Value */}
              <div className="text-6xl sm:text-7xl lg:text-8xl font-display italic text-text-primary tracking-tight font-medium">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-xs text-text-primary uppercase tracking-[0.2em] font-body font-bold mt-1">
                {stat.label}
              </div>

              {/* Subtext */}
              <p className="text-xs sm:text-sm text-muted font-body leading-relaxed max-w-[280px] mt-1">
                {stat.subtext}
              </p>
            </motion.div>
          ))}
          </div>

          {/* 3D profile card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: STATS.length * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex justify-center md:justify-end"
          >
            <ProfileCard />
          </motion.div>

        </div>
      </div>
    </section>
  );
};
