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
      className="group inline-flex items-center gap-1.5 rounded-full border border-stroke bg-surface/60 px-4 py-2 text-xs font-medium text-text-primary transition-colors duration-300 hover:border-white/20 hover:bg-surface"
    >
      {isMail && <Mail className="h-3.5 w-3.5 text-muted" />}
      {link.label}
      {!isMail && (
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
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
  <ul aria-label="Tech stack" className="flex flex-wrap gap-1.5">
    {stack.map((tech) => (
      <li
        key={tech}
        className="inline-flex items-center gap-1.5 rounded-full border border-white/5 bg-surface/60 py-1 pl-2 pr-2.5 text-[11px] font-medium text-text-primary/85"
      >
        <TechIcon name={tech} />
        {tech}
      </li>
    ))}
  </ul>
);

export const BlockView: React.FC<{ block: CaseBlock }> = ({ block }) => {
  switch (block.type) {
    case 'text':
      return (
        <p>
          {block.lead && <strong className="font-semibold text-text-primary">{block.lead} </strong>}
          {block.value}
        </p>
      );
    case 'list':
      return (
        <ul className="flex flex-col gap-3">
          {block.items.map((item) => (
            <li key={item} className="flex gap-3">
              <span aria-hidden className="accent-gradient mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );
    case 'iterations':
      return (
        <div className="flex flex-col gap-2">
          <div className="hidden grid-cols-[3rem_1fr_1fr] gap-6 px-5 font-mono text-[10px] uppercase tracking-[0.25em] text-muted sm:grid">
            <span>Ver.</span>
            <span>What I tried</span>
            <span>Result</span>
          </div>
          <ol className="flex flex-col gap-2">
            {block.rows.map((row) => (
              <li
                key={row.version}
                className={`grid gap-3 rounded-2xl border px-5 py-4 text-sm sm:grid-cols-[3rem_1fr_1fr] sm:gap-6 ${
                  row.kept ? 'border-[#4E85BF]/50 bg-[#4E85BF]/10' : 'border-stroke bg-surface/40'
                }`}
              >
                <span className="font-mono text-xs font-semibold text-text-primary">{row.version}</span>
                <div>
                  <span className="mb-1 block font-mono text-[10px] uppercase tracking-[0.25em] text-muted sm:hidden">What I tried</span>
                  {row.tried}
                </div>
                <div className={row.kept ? 'text-text-primary' : 'text-muted'}>
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
        <dl className="grid grid-cols-3 gap-2 sm:gap-3">
          {block.items.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse justify-end gap-1 rounded-2xl border border-stroke bg-surface/40 px-4 py-5">
              <dt className="text-xs leading-snug text-muted">{stat.label}</dt>
              <dd className="font-display text-4xl leading-none text-text-primary sm:text-5xl">{stat.value}</dd>
            </div>
          ))}
        </dl>
      );
    case 'note':
      return (
        <p className="flex flex-col gap-1 rounded-xl border border-dashed border-white/15 px-4 py-3 text-sm text-muted sm:flex-row sm:gap-4">
          <span className="shrink-0 pt-0.5 font-mono text-[10px] uppercase tracking-[0.25em] text-text-primary/70">Evidence</span>
          <span>{block.value}</span>
        </p>
      );
    case 'figure':
      return (
        <figure className="my-2 overflow-hidden rounded-2xl border border-stroke bg-[#0A0C10]">
          {/* Diagrams keep a readable size on phones and scroll sideways instead of shrinking */}
          <div className="overflow-x-auto">
            <div className="min-w-[600px]">
              <Illustration id={block.art} className="block h-auto w-full" />
            </div>
          </div>
          <figcaption className="border-t border-stroke px-5 py-3 text-xs leading-relaxed text-muted sm:text-sm">
            <span aria-hidden className="mb-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-text-primary/60 md:hidden">
              Swipe to see the whole diagram →
            </span>
            {block.caption}
          </figcaption>
        </figure>
      );
    default:
      return null;
  }
};
