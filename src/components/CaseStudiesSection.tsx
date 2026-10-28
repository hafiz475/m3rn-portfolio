import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { CASE_STUDIES } from '../data/caseStudies';
import { readingMinutes } from './caseStudyShared';
import { Illustration } from './illustrations/Illustration';

interface CaseStudiesSectionProps {
  onOpen: (id: string) => void;
  onViewAll: () => void;
}

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpen, onViewAll }) => {
  return (
    <section id="case-studies" className="relative z-10 overflow-hidden bg-transparent py-20 select-none md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-12 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end"
        >
          <div className="flex max-w-lg flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-stroke" />
              <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-muted">Process</span>
            </div>
            <h2 className="font-display text-4xl font-medium leading-none text-text-primary md:text-5xl lg:text-6xl">
              Case <span className="font-serif italic">studies</span>
            </h2>
            <p className="mt-2 font-body text-sm leading-relaxed text-muted md:text-base">
              The moment a real person got stuck, what I changed and why, and what shipped.
            </p>
          </div>
          <button
            type="button"
            onClick={onViewAll}
            className="group inline-flex items-center gap-2 self-start rounded-full border border-stroke bg-surface/40 px-5 py-2.5 text-sm font-medium text-text-primary transition-colors duration-300 hover:bg-surface md:self-auto"
          >
            All case studies
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
          </button>
        </motion.div>

        {/* Cards: a swipeable row on phones, a grid from tablets up */}
        <ul className="-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {CASE_STUDIES.map((study, index) => (
            <motion.li
              key={study.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              className="w-[84%] shrink-0 snap-start sm:w-[60%] md:w-auto"
            >
              <button
                type="button"
                onClick={() => onOpen(study.id)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-[1.6rem] border border-stroke bg-surface/30 text-left transition-colors duration-300 hover:bg-surface"
              >
                <span className="relative block aspect-[16/10] w-full overflow-hidden border-b border-stroke">
                  <span className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-[1.04]">
                    <Illustration id={study.cover} className="h-full w-full" />
                  </span>
                  <span className="absolute left-4 top-4 rounded-full border border-white/10 bg-black/60 px-3 py-1 font-mono text-[10px] text-text-primary/90 backdrop-blur-md">
                    {study.indexLabel}
                  </span>
                </span>
                <span className="flex flex-grow flex-col gap-3 p-5 md:p-6">
                  <span className="flex items-center gap-2 text-[11px] text-muted">
                    <span>{study.date}</span>
                    <span className="h-1 w-1 rounded-full bg-stroke" />
                    <Clock className="h-3 w-3" />
                    <span>{readingMinutes(study)} min read</span>
                  </span>
                  <span className="text-base font-semibold leading-snug text-text-primary/90 transition-colors duration-300 group-hover:text-text-primary md:text-lg">
                    {study.title}
                  </span>
                  <span className="line-clamp-2 text-sm leading-relaxed text-muted">{study.blurb}</span>
                  <span className="mt-auto flex items-center justify-between pt-2">
                    <span className="text-xs font-medium text-text-primary/70">Read the case study</span>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border border-stroke transition-all duration-300 group-hover:border-transparent group-hover:bg-text-primary">
                      <ArrowUpRight className="h-4 w-4 text-text-primary transition-colors duration-300 group-hover:text-bg" />
                    </span>
                  </span>
                </span>
              </button>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
};
