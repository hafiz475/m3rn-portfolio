import React, { useEffect, useState } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { ArrowLeft, ArrowUpRight, Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react';
import { CASE_STUDIES } from '../data/caseStudies';
import { BlockView, LinkPill, StackChips } from './CaseStudyParts';
import { fadeUp, pad, readingMinutes } from './caseStudyShared';
import { Illustration } from './illustrations/Illustration';

interface CaseStudyDetailProps {
  id: string;
  onBack: () => void;
  /** Show another case study in place of this one */
  onSwitch: (id: string) => void;
  onViewAll: () => void;
}

export const CaseStudyDetail: React.FC<CaseStudyDetailProps> = ({ id, onBack, onSwitch, onViewAll }) => {
  const total = CASE_STUDIES.length;
  const index = Math.max(0, CASE_STUDIES.findIndex((s) => s.id === id));
  const study = CASE_STUDIES[index];
  const prev = CASE_STUDIES[(index - 1 + total) % total];
  const next = CASE_STUDIES[(index + 1) % total];
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const previousTitle = document.title;
    document.title = `${study.title} — Case study — J Md Hafizur Rahman`;
    return () => {
      document.title = previousTitle;
    };
  }, [study.title]);

  useEffect(() => {
    const handleScroll = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(range > 0 ? Math.min(1, Math.max(0, window.scrollY / range)) : 0);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <div className="relative min-h-screen w-full overflow-x-hidden bg-bg pb-24 text-text-primary selection:bg-text-primary/25">
        {/* Floating reader header */}
        <div className="pointer-events-none sticky left-0 right-0 top-3 z-50 mx-auto w-full max-w-[96%] px-2 sm:top-6 sm:px-4 md:max-w-[750px]">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="pointer-events-auto relative flex w-full items-center justify-between gap-2 sm:gap-3 rounded-full border border-white/10 bg-surface/85 py-2 pl-3.5 pr-2 sm:pl-5 shadow-xl backdrop-blur-xl"
          >
            <button
              type="button"
              onClick={onBack}
              className="group flex items-center gap-1.5 sm:gap-2 text-xs font-semibold text-muted transition-colors hover:text-text-primary focus:outline-none focus-visible:text-text-primary"
            >
              <ArrowLeft className="h-4 w-4 transition-transform duration-300 group-hover:-translate-x-1" />
              <span>Back</span>
            </button>
            <span className="hidden max-w-[300px] truncate text-xs font-medium text-muted/80 sm:inline-block">{study.project}</span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => onSwitch(prev.id)}
                aria-label={`Previous case study: ${prev.project}`}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-stroke/60 hover:text-text-primary"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <span className="font-mono text-[11px] text-muted" aria-label={`Case study ${index + 1} of ${total}`}>
                {pad(index + 1)} / {pad(total)}
              </span>
              <button
                type="button"
                onClick={() => onSwitch(next.id)}
                aria-label={`Next case study: ${next.project}`}
                className="flex h-8 w-8 items-center justify-center rounded-full text-muted transition-colors hover:bg-stroke/60 hover:text-text-primary"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
            <div className="absolute bottom-0 left-6 right-6 h-[1.5px] overflow-hidden rounded-full bg-stroke">
              <div className="accent-gradient h-full transition-all duration-75" style={{ width: `${scrollProgress * 100}%` }} />
            </div>
          </motion.div>
        </div>

        <article key={study.id} aria-labelledby="case-detail-title" className="relative z-10 mx-auto mt-14 w-full min-w-0 max-w-[860px] px-4 sm:mt-24 sm:px-6 md:px-8">
          {/* Cover */}
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="flex w-full min-w-0 flex-col gap-5 sm:gap-6"
          >
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-xs text-muted">
              <span className="rounded-full border border-white/5 bg-surface px-3 py-1 sm:px-3.5 sm:py-1.5 font-semibold tracking-wide text-text-primary">{study.kind}</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5" />
                {study.date}
              </span>
              <span className="h-1.5 w-1.5 rounded-full bg-stroke" />
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5" />
                {readingMinutes(study)} min read
              </span>
            </div>
            <p className="text-sm font-medium text-text-primary/70 break-words">{study.project}</p>
            <h1
              id="case-detail-title"
              className="font-display text-2xl font-medium leading-[1.15] tracking-tight text-text-primary break-words sm:text-4xl md:text-5xl lg:text-6xl"
            >
              {study.title}
            </h1>
            <p className="mt-1 max-w-[720px] border-l-2 border-stroke pl-4 sm:pl-5 text-sm sm:text-base italic leading-relaxed text-muted break-words md:text-xl">
              {study.summary}
            </p>
            <div className="relative mt-3 sm:mt-4 aspect-[16/10] w-full overflow-hidden rounded-xl sm:rounded-[2rem] border border-stroke shadow-xl sm:aspect-[16/9]">
              <Illustration id={study.cover} className="absolute inset-0 h-full w-full" />
            </div>
          </motion.header>

          {/* At a glance */}
          <motion.dl {...fadeUp} className="mt-8 sm:mt-10 grid w-full min-w-0 gap-6 rounded-[1.4rem] border border-stroke bg-surface/40 p-5 sm:grid-cols-[1fr_1.4fr] sm:rounded-[1.6rem] sm:p-8">
            <div className="flex flex-col gap-5 sm:gap-6 min-w-0">
              <div>
                <dt className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Role</dt>
                <dd className="mt-1.5 text-sm leading-relaxed text-text-primary/90 break-words">{study.role}</dd>
              </div>
              {study.links.length > 0 && (
                <div>
                  <dt className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Links</dt>
                  <dd className="mt-2 flex flex-wrap gap-2">
                    {study.links.map((link) => (
                      <LinkPill key={link.href} link={link} />
                    ))}
                  </dd>
                </div>
              )}
            </div>
            <div className="min-w-0">
              <dt className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Stack</dt>
              <dd className="mt-2 w-full">
                <StackChips stack={study.stack} />
              </dd>
            </div>
          </motion.dl>

          {/* Story */}
          {study.sections.map((section) => (
            <motion.section key={section.heading} {...fadeUp} className="mt-10 sm:mt-14 flex w-full min-w-0 max-w-full flex-col gap-4 sm:gap-5">
              <h2 className="flex items-center gap-3 sm:gap-4 font-display text-2xl sm:text-3xl font-normal tracking-tight text-text-primary">
                <span aria-hidden className="accent-gradient h-5 sm:h-6 w-[3px] rounded-full" />
                {section.heading}
              </h2>
              <div className="flex w-full min-w-0 max-w-full flex-col gap-4 sm:gap-5 font-body text-[14.5px] sm:text-[15px] font-light leading-[1.8] sm:leading-[1.85] text-text-primary/90 sm:text-base">
                {section.blocks.map((block, i) => (
                  <BlockView key={i} block={block} />
                ))}
              </div>
            </motion.section>
          ))}

          <motion.figure {...fadeUp} className="relative mt-10 sm:mt-14 w-full max-w-full overflow-hidden rounded-xl sm:rounded-2xl border border-stroke bg-surface/60 p-5 sm:p-8">
            <span aria-hidden className="accent-gradient absolute inset-y-0 left-0 w-[3px]" />
            <figcaption className="mb-2.5 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Principle</figcaption>
            <blockquote className="font-display text-xl sm:text-2xl md:text-3xl italic leading-snug text-text-primary break-words">{study.principle}</blockquote>
          </motion.figure>

          {/* Keep reading */}
          <nav aria-label="More case studies" className="mt-16 border-t border-stroke pt-12 sm:mt-24">
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                { label: 'Previous', item: prev },
                { label: 'Next', item: next },
              ].map(({ label, item }) => (
                <li key={label}>
                  <button
                    type="button"
                    onClick={() => onSwitch(item.id)}
                    className="group flex w-full items-center gap-4 rounded-2xl border border-stroke bg-surface/30 p-3 text-left transition-colors duration-300 hover:bg-surface"
                  >
                    <span aria-hidden className="relative h-16 w-24 shrink-0 overflow-hidden rounded-xl border border-stroke">
                      <Illustration id={item.cover} className="absolute inset-0 h-full w-full" />
                    </span>
                    <span className="flex min-w-0 flex-col gap-1">
                      <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">{label}</span>
                      <span className="line-clamp-2 text-sm font-semibold text-text-primary/90 group-hover:text-text-primary">{item.title}</span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <button
                type="button"
                onClick={onViewAll}
                className="group inline-flex items-center gap-2 rounded-full border border-stroke bg-surface/40 px-5 py-2.5 text-sm font-medium text-text-primary transition-colors duration-300 hover:bg-surface"
              >
                All case studies, quick fixes and more projects
                <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </button>
            </div>
          </nav>
        </article>
      </div>
    </MotionConfig>
  );
};
