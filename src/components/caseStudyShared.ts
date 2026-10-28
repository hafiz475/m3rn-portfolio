import type { CaseStudy } from '../data/caseStudies';

export const CASE_STUDIES_HASH = '#/case-studies';
export const caseStudyHash = (id: string) => `${CASE_STUDIES_HASH}/${encodeURIComponent(id)}`;

export const fadeUp = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-80px' },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as [number, number, number, number] },
};

export const pad = (n: number) => String(n).padStart(2, '0');

export const prefersReducedMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export const scrollToId = (id: string) => {
  document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
};

/** Rough reading time at 200 words a minute. */
export const readingMinutes = (study: CaseStudy) => {
  const parts = [study.title, study.summary, study.principle];
  for (const section of study.sections) {
    for (const block of section.blocks) {
      if (block.type === 'text' || block.type === 'note') parts.push(block.value);
      else if (block.type === 'list') parts.push(...block.items);
      else if (block.type === 'iterations') parts.push(...block.rows.flatMap((row) => [row.tried, row.result]));
    }
  }
  const words = parts.join(' ').split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
};
