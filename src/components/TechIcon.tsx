import React from 'react';
import { getTechIcon } from './techIcons';

/** Brand logo for a technology, or its initial when there is no logo. */
export const TechIcon: React.FC<{ name: string; className?: string }> = ({ name, className = 'h-3.5 w-3.5' }) => {
  const icon = getTechIcon(name);
  if (!icon) {
    return (
      <span
        aria-hidden
        className={`inline-flex shrink-0 items-center justify-center rounded-[4px] bg-white/10 font-sans text-[8px] font-bold leading-none text-text-primary/80 ${className}`}
      >
        {name.charAt(0).toUpperCase()}
      </span>
    );
  }
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={`shrink-0 ${className}`} fill={icon.color}>
      <path d={icon.path} />
    </svg>
  );
};
