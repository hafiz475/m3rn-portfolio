import React, { useEffect } from 'react';
import { motion, MotionConfig } from 'framer-motion';
import { ArrowDown } from 'lucide-react';
import { CASE_STUDIES, CASE_STUDY_PRINCIPLES, MORE_PROJECTS, PROFILE_LINKS, QUICK_FIXES, type CaseStudy } from '../data/caseStudies';
import { BlockView, Eyebrow, LinkPill, StackChips } from './CaseStudyParts';
import { fadeUp, pad, scrollToId } from './caseStudyShared';
import { Illustration } from './illustrations/Illustration';

const SectionHeading: React.FC<{ id?: string; eyebrow: string; title: React.ReactNode; description?: string }> = ({
  id,
  eyebrow,
  title,
  description,
}) => (
  <motion.div {...fadeUp} className="mb-10 flex max-w-2xl flex-col gap-3 md:mb-14">
    <Eyebrow>{eyebrow}</Eyebrow>
    <h2 id={id} className="font-display text-4xl font-medium leading-none text-text-primary md:text-5xl lg:text-6xl">
      {title}
    </h2>
    {description && <p className="mt-2 font-body text-sm leading-relaxed text-muted md:text-base">{description}</p>}
  </motion.div>
);

const CaseArticle: React.FC<{ study: CaseStudy; index: number }> = ({ study, index }) => (
  <motion.article
    {...fadeUp}
    id={`case-${study.id}`}
    aria-labelledby={`case-${study.id}-title`}
    className="scroll-mt-36 rounded-[2rem] border border-stroke bg-bg/85 p-6 sm:p-10 lg:p-14"
  >
    <div className="relative mb-10 aspect-[16/10] overflow-hidden rounded-[1.4rem] border border-stroke sm:aspect-[21/9] lg:mb-14">
      <Illustration id={study.cover} className="absolute inset-0 h-full w-full" />
    </div>
    <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
      {/* Meta column */}
      <aside className="flex flex-col gap-6 lg:sticky lg:top-28 lg:col-span-4 lg:self-start">
        <div className="flex items-center gap-4">
          <span className="font-display text-5xl italic leading-none text-muted/60">{pad(index + 1)}</span>
          <span className="h-px flex-grow bg-stroke" />
        </div>
        <div className="flex flex-col gap-3">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            <span className="rounded-full border border-white/5 bg-surface px-3 py-1 font-semibold tracking-wide text-text-primary">
              {study.kind}
            </span>
            <span>{study.date}</span>
          </div>
          <p className="text-lg font-medium text-text-primary">{study.project}</p>
        </div>
        <dl className="flex flex-col gap-5 text-sm">
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Role</dt>
            <dd className="mt-1.5 leading-relaxed text-text-primary/90">{study.role}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Stack</dt>
            <dd className="mt-2">
              <StackChips stack={study.stack} />
            </dd>
          </div>
        </dl>
        {study.links.length > 0 && (
          <div className="flex flex-wrap gap-2">
            {study.links.map((link) => (
              <LinkPill key={link.href} link={link} />
            ))}
          </div>
        )}
      </aside>

      {/* Story column */}
      <div className="flex flex-col gap-10 lg:col-span-8">
        <header className="flex flex-col gap-5">
          <h2
            id={`case-${study.id}-title`}
            className="font-display text-3xl font-medium leading-[1.1] tracking-tight text-text-primary sm:text-4xl md:text-5xl"
          >
            {study.title}
          </h2>
          <p className="border-l-2 border-stroke pl-5 text-base leading-relaxed text-muted sm:text-lg">{study.summary}</p>
        </header>

        {study.sections.map((section) => (
          <section key={section.heading} className="flex flex-col gap-4">
            <h3 className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.3em] text-muted">
              <span className="h-px w-6 bg-stroke" />
              {section.heading}
            </h3>
            <div className="flex flex-col gap-4 text-[15px] font-light leading-[1.75] text-text-primary/90 sm:text-base">
              {section.blocks.map((block, i) => (
                <BlockView key={i} block={block} />
              ))}
            </div>
          </section>
        ))}

        <figure className="relative overflow-hidden rounded-2xl border border-stroke bg-surface/60 p-6 sm:p-8">
          <span aria-hidden className="accent-gradient absolute inset-y-0 left-0 w-[3px]" />
          <figcaption className="mb-3 text-[10px] font-bold uppercase tracking-[0.3em] text-muted">Principle</figcaption>
          <blockquote className="font-display text-2xl italic leading-snug text-text-primary sm:text-3xl">{study.principle}</blockquote>
        </figure>
      </div>
    </div>
  </motion.article>
);

export const CaseStudies: React.FC = () => {
  useEffect(() => {
    const previousTitle = document.title;
    document.title = 'Case studies — J Md Hafizur Rahman';
    return () => {
      document.title = previousTitle;
    };
  }, []);

  return (
    <MotionConfig reducedMotion="user">
      <main className="relative z-10 pb-24 pt-32 md:pt-40">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-20 px-5 md:gap-28 md:px-10 lg:px-16">
          {/* Intro */}
          <motion.header {...fadeUp} className="flex max-w-4xl flex-col gap-6">
            <Eyebrow>UX case studies · 2024–2026</Eyebrow>
            <h1 className="font-display text-5xl italic leading-[0.95] tracking-tight text-text-primary sm:text-6xl md:text-7xl lg:text-8xl">
              J Md Hafizur Rahman
            </h1>
            <p className="max-w-3xl text-lg font-light leading-snug text-text-primary/90 sm:text-xl md:text-2xl">
              Frontend Lead and product engineer. I turn workflow-heavy software into screens people can trust, and ship them front to back.
            </p>
            <p className="max-w-2xl text-sm leading-relaxed text-muted md:text-base">
              Selected work from client websites, my own products, and BizMagnets, where I lead the frontend team. Each case shows the problem
              a real person ran into, what I decided and why, and what changed.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              {PROFILE_LINKS.map((link) => (
                <LinkPill key={link.href} link={link} />
              ))}
            </div>
          </motion.header>

          {/* Principles */}
          <section aria-label="Principles">
            <ol className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {CASE_STUDY_PRINCIPLES.map((principle, i) => (
                <motion.li
                  key={principle.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: i * 0.08 }}
                  className="flex flex-col gap-3 rounded-2xl border border-stroke bg-bg/70 p-6"
                >
                  <span className="font-mono text-[11px] text-muted">{pad(i + 1)}</span>
                  <h2 className="font-display text-2xl leading-tight text-text-primary">{principle.title}</h2>
                  <p className="text-sm leading-relaxed text-muted">{principle.body}</p>
                </motion.li>
              ))}
            </ol>
          </section>

          {/* Index */}
          <section aria-labelledby="case-index-heading">
            <SectionHeading
              id="case-index-heading"
              eyebrow="Index"
              title={
                <>
                  Selected <span className="italic">case studies</span>
                </>
              }
            />
            <ol className="flex flex-col gap-3">
              {CASE_STUDIES.map((study, i) => (
                <motion.li key={study.id} {...fadeUp} transition={{ ...fadeUp.transition, delay: i * 0.06 }}>
                  <button
                    type="button"
                    onClick={() => scrollToId(`case-${study.id}`)}
                    className="group flex w-full items-center gap-4 rounded-2xl border border-stroke bg-surface/30 p-4 text-left transition-colors duration-300 hover:bg-surface sm:gap-6 sm:rounded-full sm:pl-7"
                  >
                    <span className="w-8 shrink-0 font-display text-2xl italic text-muted">{pad(i + 1)}</span>
                    <span aria-hidden className="relative hidden h-14 w-24 shrink-0 overflow-hidden rounded-xl border border-stroke sm:block">
                      <Illustration id={study.cover} className="absolute inset-0 h-full w-full" />
                    </span>
                    <span className="flex min-w-0 flex-grow flex-col gap-1.5">
                      <span className="text-sm font-semibold text-text-primary/90 transition-colors duration-300 group-hover:text-text-primary md:text-base">
                        {study.title}
                      </span>
                      <span className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted">
                        <span className="rounded-full border border-white/5 bg-surface/60 px-2.5 py-0.5 font-mono text-[10px] text-text-primary/80">
                          {study.indexLabel}
                        </span>
                        <span>{study.blurb}</span>
                      </span>
                    </span>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-stroke transition-all duration-300 group-hover:border-transparent group-hover:bg-text-primary">
                      <ArrowDown className="h-4 w-4 text-text-primary transition-colors duration-300 group-hover:text-bg" />
                    </span>
                  </button>
                </motion.li>
              ))}
            </ol>
            <p className="mt-6 text-sm text-muted">
              Also:{' '}
              <button
                type="button"
                onClick={() => scrollToId('quick-fixes')}
                className="text-text-primary underline decoration-stroke underline-offset-4 transition-colors hover:decoration-text-primary"
              >
                five quick fixes
              </button>{' '}
              that follow the same principles, and{' '}
              <button
                type="button"
                onClick={() => scrollToId('more-projects')}
                className="text-text-primary underline decoration-stroke underline-offset-4 transition-colors hover:decoration-text-primary"
              >
                more projects
              </button>
              .
            </p>
          </section>

          {/* Case studies */}
          <div className="flex flex-col gap-8 md:gap-12">
            {CASE_STUDIES.map((study, i) => (
              <CaseArticle key={study.id} study={study} index={i} />
            ))}
          </div>

          {/* Quick fixes */}
          <section id="quick-fixes" aria-labelledby="quick-fixes-heading" className="scroll-mt-28">
            <SectionHeading
              id="quick-fixes-heading"
              eyebrow="Direction7"
              title={
                <>
                  Five quick fixes, <span className="italic">same principles</span>
                </>
              }
              description="Smaller problems from Direction7, each pinned by automated tests so it can't quietly come back."
            />
            <ol className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {QUICK_FIXES.map((fix, i) => (
                <motion.li
                  key={fix.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: (i % 3) * 0.08 }}
                  className="flex flex-col gap-5 rounded-2xl border border-stroke bg-bg/85 p-6"
                >
                  <div className="flex items-baseline gap-3">
                    <span className="font-mono text-[11px] text-muted">{pad(i + 1)}</span>
                    <h3 className="font-display text-2xl leading-tight text-text-primary">{fix.title}</h3>
                  </div>
                  <dl className="flex flex-col gap-4 text-sm leading-relaxed">
                    {(
                      [
                        ['Problem', fix.problem],
                        ['Decision', fix.decision],
                        ['Result', fix.result],
                      ] as const
                    ).map(([label, value]) => (
                      <div key={label}>
                        <dt className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">{label}</dt>
                        <dd className="mt-1 font-light text-text-primary/85">{value}</dd>
                      </div>
                    ))}
                  </dl>
                  {fix.tickets && (
                    <ul aria-label="Test tickets" className="mt-auto flex flex-wrap gap-1.5">
                      {fix.tickets.map((ticket) => (
                        <li key={ticket} className="rounded-full border border-white/10 bg-surface px-2.5 py-1 font-mono text-[10px] text-text-primary/80">
                          {ticket}
                        </li>
                      ))}
                    </ul>
                  )}
                </motion.li>
              ))}
            </ol>
          </section>

          {/* More projects */}
          <section id="more-projects" aria-labelledby="more-projects-heading" className="scroll-mt-28">
            <SectionHeading
              id="more-projects-heading"
              eyebrow="Also built"
              title={
                <>
                  More <span className="italic">projects</span>
                </>
              }
              description="Smaller builds, each with one interaction decision worth noting."
            />
            <ul className="grid gap-3 sm:grid-cols-2">
              {MORE_PROJECTS.map((project, i) => (
                <motion.li
                  key={project.title}
                  {...fadeUp}
                  transition={{ ...fadeUp.transition, delay: (i % 2) * 0.08 }}
                  className="flex flex-col gap-4 rounded-2xl border border-stroke bg-bg/85 p-6"
                >
                  <h3 className="text-lg font-semibold text-text-primary">{project.title}</h3>
                  <p className="text-sm font-light leading-relaxed text-muted">{project.description}</p>
                  <div className="mt-auto flex flex-wrap gap-2 pt-2">
                    {project.links.map((link) => (
                      <LinkPill key={link.href} link={link} />
                    ))}
                  </div>
                </motion.li>
              ))}
            </ul>
          </section>

          {/* Evidence + links */}
          <motion.footer {...fadeUp} className="flex flex-col gap-8 border-t border-stroke pt-12">
            <p className="max-w-3xl text-sm leading-relaxed text-muted md:text-base">
              <strong className="font-semibold text-text-primary">About the evidence:</strong> every outcome on this page is something that
              shipped, checked against the code and, where tagged (for example DEL-553), against automated tests. Where a project has no user
              data yet, the case says so instead of guessing.
            </p>
            <div className="flex flex-wrap gap-2">
              {PROFILE_LINKS.map((link) => (
                <LinkPill key={link.href} link={link} />
              ))}
            </div>
          </motion.footer>
        </div>
      </main>
    </MotionConfig>
  );
};
