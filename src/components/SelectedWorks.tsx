import React, { useRef, useEffect, useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpRight, ChevronDown, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PROJECTS, type Project } from '../data/projects';
import { LinkPill, StackChips } from './CaseStudyParts';
import { pad } from './caseStudyShared';
import { Illustration } from './illustrations/Illustration';

const TOTAL = PROJECTS.length;
const ANGLE_STEP = (2 * Math.PI) / TOTAL;
const AUTO_SPEED = 0.0015;
// Radius keeps neighbouring cards a steady distance apart however many projects there are
const CARD_SPACING = { desktop: 270, mobile: 196 };
const MAX_VISIBLE = 1.2;

/** Screenshot or illustration for a project, filling its box. */
const ProjectVisual: React.FC<{ project: Project; variant: 'card' | 'wide'; className?: string }> = ({ project, variant, className = '' }) => {
  if (project.screenshot) {
    const usePhone = variant === 'card' && project.screenshot.phone;
    return (
      <img
        src={usePhone ? project.screenshot.phone : project.screenshot.desktop}
        alt={`Screenshot of ${project.title}`}
        loading="lazy"
        decoding="async"
        draggable={false}
        className={`absolute inset-0 h-full w-full object-cover ${usePhone || variant === 'wide' ? 'object-top' : 'object-center'} ${className}`}
      />
    );
  }
  return project.art ? <Illustration id={project.art} className={`absolute inset-0 h-full w-full ${className}`} /> : null;
};

interface ProjectModalProps {
  project: Project;
  onClose: () => void;
  onOpenCaseStudy: (id: string) => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onOpenCaseStudy }) => {
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-[99999] cursor-zoom-out overflow-y-auto overscroll-contain bg-black/85 backdrop-blur-md"
    >
      <div className="flex min-h-full items-start justify-center p-3 sm:items-center sm:p-6 md:p-8">
        <motion.div
          initial={{ scale: 0.94, y: 30, opacity: 0 }}
          animate={{ scale: 1, y: 0, opacity: 1 }}
          exit={{ scale: 0.94, y: 30, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-[920px] cursor-default overflow-hidden rounded-[1.6rem] border border-stroke bg-[#0c0c0c] shadow-2xl sm:rounded-[1.8rem]"
        >
          <div className="relative aspect-[16/10] w-full overflow-hidden border-b border-stroke">
            <ProjectVisual project={project} variant="wide" />
            <span className="absolute bottom-3 left-3 rounded-full border border-white/10 bg-black/65 px-3 py-1 font-mono text-[10px] text-white/80 backdrop-blur-md">
              {project.screenshot ? 'Screenshot of the live site' : 'Illustration'}
            </span>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              aria-label="Close project details"
              className="absolute right-3 top-3 flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-black/60 text-text-primary transition-colors hover:bg-black/90 sm:right-4 sm:top-4"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="grid gap-8 p-6 sm:p-8 md:grid-cols-[1fr_250px] md:gap-10 md:p-10">
            <div className="flex min-w-0 flex-col gap-6">
              <div>
                <span className="block font-mono text-[10px] uppercase tracking-widest text-muted">
                  {project.subtitle} · {project.period}
                </span>
                <h3 id="project-modal-title" className="mt-2 text-2xl font-medium text-text-primary sm:text-3xl">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-text-primary/70">{project.role}</p>
              </div>
              <p className="text-sm font-light leading-relaxed text-text-primary/90 sm:text-[15px]">{project.overview}</p>
              <div>
                <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">What I built</h4>
                <ul className="mt-3 flex flex-col gap-2.5 text-sm font-light leading-relaxed text-text-primary/85">
                  {project.built.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span aria-hidden className="accent-gradient mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              {project.highlights && (
                <dl className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {project.highlights.map((h) => (
                    <div key={h.label} className="flex flex-col-reverse justify-end gap-1.5 rounded-2xl border border-stroke bg-surface/40 px-4 py-4">
                      <dt className="text-[11px] leading-snug text-muted">{h.label}</dt>
                      <dd className="font-display text-2xl leading-none text-text-primary">{h.value}</dd>
                    </div>
                  ))}
                </dl>
              )}
              {project.note && <p className="rounded-xl border border-dashed border-white/15 px-4 py-3 text-xs leading-relaxed text-muted">{project.note}</p>}
            </div>

            <aside className="flex flex-col gap-6 md:border-l md:border-stroke md:pl-8">
              <div>
                <h4 className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Stack · {project.stack.length}</h4>
                <StackChips stack={project.stack} />
              </div>
              {project.links.length > 0 && (
                <div>
                  <h4 className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Links</h4>
                  <div className="flex flex-wrap gap-2">
                    {project.links.map((link) => (
                      <LinkPill key={link.href} link={link} />
                    ))}
                  </div>
                </div>
              )}
              {project.caseStudyId && (
                <button
                  type="button"
                  onClick={() => onOpenCaseStudy(project.caseStudyId!)}
                  className="group relative rounded-full p-[1.5px] text-sm font-semibold"
                >
                  <span className="accent-gradient absolute inset-0 rounded-full" />
                  <span className="relative flex items-center justify-center gap-2 rounded-full bg-[#0c0c0c] px-5 py-3 text-text-primary transition-colors group-hover:bg-transparent group-hover:text-bg">
                    Read the case study
                    <ArrowUpRight className="h-4 w-4" />
                  </span>
                </button>
              )}
            </aside>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

interface SelectedWorksProps {
  onOpenCaseStudy: (id: string) => void;
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({ onOpenCaseStudy }) => {
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const targetAngle = useRef(0);
  const currentAngle = useRef(0);
  const pausedRef = useRef(false);
  const rafRef = useRef(0);
  const frontRef = useRef(0);
  const touchStartX = useRef<number | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [frontIndex, setFrontIndex] = useState(0);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const R = (isMobile ? CARD_SPACING.mobile : CARD_SPACING.desktop) / ANGLE_STEP;

    const loop = () => {
      if (!pausedRef.current) {
        targetAngle.current -= AUTO_SPEED;
      }
      // Smooth lerp towards target
      currentAngle.current += (targetAngle.current - currentAngle.current) * 0.06;

      let front = 0;
      let frontDistance = Infinity;
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        const raw = currentAngle.current + i * ANGLE_STEP;
        // Normalize to [-π, π]
        const norm = ((raw % (2 * Math.PI)) + 3 * Math.PI) % (2 * Math.PI) - Math.PI;
        const absNorm = Math.abs(norm);
        if (absNorm < frontDistance) {
          frontDistance = absNorm;
          front = i;
        }

        const x = R * Math.sin(norm);
        const y = R * (1 - Math.cos(norm));
        const rot = norm * (180 / Math.PI);
        const hidden = absNorm > MAX_VISIBLE;
        const opacity = hidden ? 0 : 1 - (absNorm / MAX_VISIBLE) * 0.7;
        const scale = hidden ? 0.75 : 1 - (absNorm / MAX_VISIBLE) * 0.12;
        const zi = Math.round((1 - absNorm / Math.PI) * 20);

        card.style.transform = `translate(-50%, 0) translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})`;
        card.style.opacity = String(Math.max(0, opacity));
        card.style.zIndex = String(zi);
        card.style.pointerEvents = hidden ? 'none' : 'auto';
      });

      if (front !== frontRef.current) {
        frontRef.current = front;
        setFrontIndex(front);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isMobile]);

  const jumpBy = useCallback((dir: number) => {
    targetAngle.current += dir * ANGLE_STEP;
  }, []);

  const closeModal = useCallback(() => setSelectedProject(null), []);

  const openCaseStudy = useCallback(
    (id: string) => {
      setSelectedProject(null);
      onOpenCaseStudy(id);
    },
    [onOpenCaseStudy],
  );

  return (
    <section id="work" className="bg-transparent py-20 md:py-28 select-none text-left relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16 flex flex-col items-center">

        {/* Header */}
        <div className="w-full flex flex-col md:flex-row md:items-end justify-between mb-8 md:mb-12 gap-6">
          <div className="flex flex-col gap-3 max-w-xl">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-bold">Selected Work</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary font-medium leading-none">
              Featured <span className="italic font-serif">projects</span>
            </h2>
            <p className="text-sm md:text-base text-muted font-body leading-relaxed mt-2">
              {TOTAL} projects: product work at BizMagnets, client sites, my own products and 3D experiments. Open any card for the full story,
              stack and links.
            </p>
          </div>
        </div>

        {/* Arc Container */}
        <div
          className="relative w-full overflow-hidden"
          style={{ height: isMobile ? 320 : 420 }}
          onMouseEnter={() => { pausedRef.current = true; }}
          onMouseLeave={() => { pausedRef.current = false; }}
          onTouchStart={(e) => {
            pausedRef.current = true;
            touchStartX.current = e.touches[0].clientX;
          }}
          onTouchEnd={(e) => {
            const start = touchStartX.current;
            touchStartX.current = null;
            pausedRef.current = false;
            if (start === null) return;
            const dx = e.changedTouches[0].clientX - start;
            if (Math.abs(dx) > 40) jumpBy(dx > 0 ? 1 : -1);
          }}
        >
          {/* Cards origin point — center-top of the arc area */}
          <div className="absolute left-1/2 top-0" style={{ width: 0, height: 0 }}>
            {PROJECTS.map((project, i) => (
              <div
                key={project.id}
                ref={(el) => { cardsRef.current[i] = el; }}
                onClick={() => setSelectedProject(project)}
                className="absolute cursor-pointer group/card"
                style={{
                  width: isMobile ? 180 : 240,
                  height: isMobile ? 260 : 340,
                  top: 0,
                  left: 0,
                  willChange: 'transform, opacity',
                  transformOrigin: 'center top',
                }}
              >
                <div className="w-full h-full rounded-2xl md:rounded-[1.4rem] overflow-hidden border border-stroke/60 shadow-xl bg-bg relative">
                  <ProjectVisual project={project} variant="card" className="transition-transform duration-500 group-hover/card:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent" />
                  {project.caseStudyId && (
                    <span className="absolute left-3 top-3 rounded-full border border-white/10 bg-black/60 px-2.5 py-1 font-mono text-[9px] text-white/90 backdrop-blur-md md:text-[10px]">
                      Case study
                    </span>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-5">
                    <h3 className="text-sm md:text-base font-semibold text-white leading-tight">{project.title}</h3>
                    <p className="text-[10px] md:text-xs text-white/60 italic mt-0.5">{project.subtitle}</p>
                    <p className="mt-2 hidden font-mono text-[10px] leading-relaxed text-white/50 md:block">
                      {project.stack.slice(0, 3).join(' · ')}
                      {project.stack.length > 3 && ` · +${project.stack.length - 3}`}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-6 mt-6">
          <button onClick={() => jumpBy(1)} className="w-11 h-11 rounded-full border border-stroke bg-surface/50 hover:bg-text-primary text-text-primary hover:text-bg flex items-center justify-center transition-all duration-300 cursor-pointer" aria-label="Previous project">
            <ChevronLeft className="w-5 h-5" />
          </button>
          <p className="min-w-[9rem] text-center text-xs text-muted">
            <span className="font-mono text-text-primary/80">{pad(frontIndex + 1)}</span> / {pad(TOTAL)}
            <span className="mt-0.5 block truncate text-text-primary/70">{PROJECTS[frontIndex].title}</span>
          </p>
          <button onClick={() => jumpBy(-1)} className="w-11 h-11 rounded-full border border-stroke bg-surface/50 hover:bg-text-primary text-text-primary hover:text-bg flex items-center justify-center transition-all duration-300 cursor-pointer" aria-label="Next project">
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Every project as a plain grid, also the keyboard-friendly way in */}
        <button
          type="button"
          onClick={() => setShowAll((v) => !v)}
          aria-expanded={showAll}
          aria-controls="all-projects"
          className="mt-8 inline-flex items-center gap-2 rounded-full border border-stroke bg-surface/40 px-5 py-2.5 text-sm font-medium text-text-primary transition-colors duration-300 hover:bg-surface"
        >
          {showAll ? 'Hide the list' : `Browse all ${TOTAL} projects`}
          <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showAll ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence initial={false}>
          {showAll && (
            <motion.ul
              id="all-projects"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.45, ease: [0.25, 0.1, 0.25, 1] }}
              className="grid w-full grid-cols-2 gap-3 overflow-hidden pt-8 sm:grid-cols-3 lg:grid-cols-4"
            >
              {PROJECTS.map((project) => (
                <li key={project.id}>
                  <button
                    type="button"
                    onClick={() => setSelectedProject(project)}
                    className="group flex h-full w-full flex-col overflow-hidden rounded-2xl border border-stroke bg-surface/30 text-left transition-colors duration-300 hover:bg-surface"
                  >
                    <span className="relative block aspect-[16/10] w-full overflow-hidden border-b border-stroke">
                      <ProjectVisual project={project} variant="wide" className="transition-transform duration-500 group-hover:scale-105" />
                    </span>
                    <span className="flex flex-col gap-0.5 p-3.5">
                      <span className="text-sm font-semibold text-text-primary/90 group-hover:text-text-primary">{project.title}</span>
                      <span className="text-[11px] leading-snug text-muted">{project.subtitle}</span>
                    </span>
                  </button>
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>

      {/* Project detail */}
      <AnimatePresence>
        {selectedProject && <ProjectModal project={selectedProject} onClose={closeModal} onOpenCaseStudy={openCaseStudy} />}
      </AnimatePresence>
    </section>
  );
};
