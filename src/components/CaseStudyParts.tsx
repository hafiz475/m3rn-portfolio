import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import type { CaseBlock, CaseLink } from '../data/caseStudies';
import { Illustration } from './illustrations/Illustration';
import { TechIcon } from './TechIcon';

export const LinkPill: React.FC<{ link: CaseLink }> = ({ link }) => {
  const isMail = link.href.startsWith('mailto:');
  return (
    <a
      href={link.href}
      {...(isMail ? {} : { target: '_blank', rel: 'noreferrer' })}
      className="group inline-flex max-w-full items-center gap-1.5 rounded-full border border-stroke bg-surface/60 px-3.5 py-1.5 text-xs font-medium text-text-primary transition-colors duration-300 hover:border-white/20 hover:bg-surface sm:px-4 sm:py-2"
    >
      {isMail && <Mail className="h-3.5 w-3.5 shrink-0 text-muted" />}
      <span className="truncate">{link.label}</span>
      {!isMail && (
        <ArrowUpRight className="h-3.5 w-3.5 shrink-0 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      )}
    </a>
  );
};

export const Eyebrow: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-3">
    <span className="h-px w-8 bg-stroke" />
    <span className="font-body text-xs font-bold uppercase tracking-[0.3em] text-muted">{children}</span>
  </div>
);

export const StackChips: React.FC<{ stack: string[] }> = ({ stack }) => (
  <ul aria-label="Tech stack" className="flex w-full flex-wrap gap-1.5">
    {stack.map((tech) => (
      <li
        key={tech}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-surface/60 py-1 pl-2 pr-2.5 text-[11px] font-medium text-text-primary/85"
      >
        <TechIcon name={tech} />
        <span>{tech}</span>
      </li>
    ))}
  </ul>
);

export const BlockView: React.FC<{ block: CaseBlock }> = ({ block }) => {
  switch (block.type) {
    case 'text':
      return (
        <p className="break-words">
          {block.lead && <strong className="font-semibold text-text-primary">{block.lead} </strong>}
          {block.value}
        </p>
      );
    case 'list':
      return (
        <ul className="flex w-full flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2.5 sm:gap-3">
              <span aria-hidden className="accent-gradient mt-[0.65em] h-1.5 w-1.5 shrink-0 rounded-full" />
              <span className="min-w-0 flex-1 break-words">{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'iterations':
      return (
        <div className="flex w-full min-w-0 max-w-full flex-col gap-2">
          <div className="hidden grid-cols-[3rem_1fr_1fr] gap-6 px-5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted sm:grid">
            <span>Ver.</span>
            <span>What I tried</span>
            <span>Result</span>
          </div>
          <ol className="flex w-full min-w-0 flex-col gap-2">
            {block.rows.map((row) => (
              <li
                key={row.version}
                className={`grid w-full min-w-0 gap-3 rounded-2xl border p-4 text-sm sm:grid-cols-[3rem_1fr_1fr] sm:gap-6 sm:px-5 sm:py-4 ${
                  row.kept ? 'border-[#4E85BF]/50 bg-[#4E85BF]/10' : 'border-stroke bg-surface/40'
                }`}
              >
                <span className="font-mono text-xs font-semibold text-text-primary">{row.version}</span>
                <div className="min-w-0 break-words">
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted sm:hidden">What I tried</span>
                  {row.tried}
                </div>
                <div className={`min-w-0 break-words ${row.kept ? 'text-text-primary' : 'text-muted'}`}>
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted sm:hidden">Result</span>
                  {row.result}
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    case 'stats':
      return (
        <dl className="grid w-full min-w-0 grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3">
          {block.items.map((stat) => (
            <div key={stat.label} className="flex min-w-0 flex-col-reverse justify-end gap-1 rounded-xl border border-stroke bg-surface/40 p-3.5 sm:rounded-2xl sm:px-4 sm:py-5">
              <dt className="text-[11px] leading-snug text-muted break-words sm:text-xs">{stat.label}</dt>
              <dd className="font-display text-2xl leading-none text-text-primary break-words sm:text-4xl md:text-5xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      );
    case 'note':
      return (
        <p className="flex w-full min-w-0 flex-col gap-1 rounded-xl border border-dashed border-white/15 p-3.5 text-sm text-muted break-words sm:flex-row sm:gap-4 sm:px-4 sm:py-3">
          <span className="shrink-0 pt-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-text-primary/70">Evidence</span>
          <span className="min-w-0 flex-1">{block.value}</span>
        </p>
      );
    case 'figure':
      return (
        <figure className="my-2 w-full max-w-full overflow-hidden rounded-xl border border-stroke bg-[#0A0C10] sm:rounded-2xl">
          {/* Diagrams keep a readable size on phones and scroll sideways smoothly within the card bounds */}
          <div className="w-full max-w-full overflow-x-auto touch-pan-x overscroll-x-contain [scrollbar-width:thin]">
            <div className="w-[520px] min-w-[520px] sm:w-[600px] sm:min-w-[600px]">
              <Illustration id={block.art} className="block h-auto w-full" />
            </div>
          </div>
          <figcaption className="border-t border-stroke px-4 py-3 text-xs leading-relaxed text-muted sm:px-5 sm:text-sm">
            <span aria-hidden className="mb-1 flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-[#4E85BF] md:hidden">
              <span>Swipe diagram</span>
              <span>→</span>
            </span>
            <span className="break-words">{block.caption}</span>
          </figcaption>
        </figure>
      );
    default:
      return null;
  }
};
