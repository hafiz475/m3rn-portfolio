import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Clock } from 'lucide-react';
import { CASE_STUDIES } from '../data/caseStudies';
import { prefersReducedMotion, readingMinutes } from './caseStudyShared';
import { Illustration } from './illustrations/Illustration';

interface CaseStudiesSectionProps {
  onOpen: (id: string) => void;
  onViewAll: () => void;
}

const PHONE_QUERY = '(max-width: 767px)';

export const CaseStudiesSection: React.FC<CaseStudiesSectionProps> = ({ onOpen, onViewAll }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // Phones get a cover-flow row: the centred card faces the reader, its neighbours turn away and dim
  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    const phone = window.matchMedia(PHONE_QUERY);
    let frame = 0;

    const update = () => {
      frame = 0;
      const slides = [...list.children] as HTMLElement[];
      const cards = slides.map((slide) => slide.firstElementChild as HTMLElement);
      if (!phone.matches) {
        cards.forEach((card) => {
          card.style.transform = '';
          card.style.opacity = '';
        });
        return;
      }
      const centre = list.scrollLeft + list.clientWidth / 2;
      const reduce = prefersReducedMotion();
      let nearest = 0;
      let nearestDistance = Infinity;
      slides.forEach((slide, i) => {
        // -1 is one slide to the left of centre, 1 one slide to the right
        const offset = (slide.offsetLeft + slide.offsetWidth / 2 - centre) / slide.offsetWidth;
        const distance = Math.min(Math.abs(offset), 1.2);
        if (Math.abs(offset) < nearestDistance) {
          nearestDistance = Math.abs(offset);
          nearest = i;
        }
        cards[i].style.transform = reduce
          ? `scale(${1 - distance * 0.06})`
          : `perspective(900px) rotateY(${Math.sign(offset) * -distance * 30}deg) scale(${1 - distance * 0.12})`;
        cards[i].style.opacity = String(1 - Math.min(distance, 1) * 0.45);
      });
      setActiveIndex(nearest);
    };

    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    list.addEventListener('scroll', schedule, { passive: true });
    window.addEventListener('resize', schedule);
    phone.addEventListener('change', schedule);
    return () => {
      cancelAnimationFrame(frame);
      list.removeEventListener('scroll', schedule);
      window.removeEventListener('resize', schedule);
      phone.removeEventListener('change', schedule);
    };
  }, []);

  const scrollToSlide = (index: number) => {
    const list = listRef.current;
    const slide = list?.children[index] as HTMLElement | undefined;
    if (!list || !slide) return;
    list.scrollTo({
      left: slide.offsetLeft - (list.clientWidth - slide.offsetWidth) / 2,
      behavior: prefersReducedMotion() ? 'auto' : 'smooth',
    });
  };

  return (
    <section id="case-studies" className="relative z-10 overflow-hidden bg-transparent py-20 select-none md:py-28">
      <div className="mx-auto max-w-[1200px] px-5 md:px-10 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="mb-10 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-end"
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

        {/* Phones: a swipeable cover-flow row. Tablets and up: a grid.
            overflow-y-hidden keeps vertical swipes going to the page instead of the row. */}
        <motion.ul
          ref={listRef}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
          aria-label="Case studies"
          className="relative -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto overflow-y-hidden overscroll-x-contain px-[11%] py-2 sm:px-[20%] md:mx-0 md:grid md:grid-cols-2 md:gap-5 md:overflow-visible md:p-0 lg:grid-cols-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {CASE_STUDIES.map((study) => (
            <li key={study.id} className="w-[78%] shrink-0 snap-center sm:w-[60%] md:w-auto">
              <button
                type="button"
                onClick={() => onOpen(study.id)}
                className="group flex h-full w-full flex-col overflow-hidden rounded-[1.6rem] border border-stroke bg-surface/30 text-left transition-colors duration-300 will-change-transform hover:bg-surface"
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
            </li>
          ))}
        </motion.ul>

        {/* Slide dots, phones only */}
        <div className="mt-5 flex items-center justify-center gap-1 md:hidden">
          {CASE_STUDIES.map((study, i) => (
            <button
              key={study.id}
              type="button"
              onClick={() => scrollToSlide(i)}
              aria-label={`Show case study ${i + 1} of ${CASE_STUDIES.length}: ${study.project}`}
              aria-current={i === activeIndex ? 'true' : undefined}
              className="flex h-6 items-center justify-center px-1"
            >
              <span
                className={`block h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'accent-gradient w-6' : 'w-2 bg-white/25'}`}
              />
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
