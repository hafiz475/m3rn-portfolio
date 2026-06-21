import React from 'react';
import { motion } from 'framer-motion';
import { JOURNAL_POSTS } from './JournalPostDetail';

interface JournalProps {
  onPostClick?: (postId: string) => void;
}

export const Journal: React.FC<JournalProps> = ({ onPostClick }) => {
  return (
    <section id="journal" className="bg-bg py-20 md:py-28 overflow-hidden select-none">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6"
        >
          <div className="flex flex-col gap-3 max-w-lg">
            <div className="flex items-center gap-3">
              <span className="w-8 h-px bg-stroke" />
              <span className="text-xs text-muted uppercase tracking-[0.3em] font-body font-bold">Journal</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary font-display font-medium leading-none">
              Recent <span className="italic font-serif">thoughts</span>
            </h2>
            <p className="text-sm md:text-base text-muted font-body leading-relaxed mt-2">
              Writing about design philosophy, front-end details, and artificial intelligence systems.
            </p>
          </div>

          {/* Desktop Only button */}
          <button className="hidden md:inline-flex relative group rounded-full text-xs font-semibold p-[1.5px] focus:outline-none overflow-visible">
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative flex items-center gap-2 bg-surface text-text-primary border border-white/5 rounded-full px-6 py-3 transition-colors duration-300">
              View all thoughts <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-0.5">→</span>
            </span>
          </button>
        </motion.div>

        {/* Entries List */}
        <div className="flex flex-col gap-4 md:gap-5">
          {JOURNAL_POSTS.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => onPostClick && onPostClick(entry.id)}
              className="flex items-center gap-4 sm:gap-6 p-3 sm:p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full group cursor-pointer transition-colors duration-300"
            >
              {/* Image Circle */}
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-full overflow-hidden flex-shrink-0 border border-stroke">
                <img
                  src={entry.image}
                  alt={entry.title}
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                />
              </div>

              {/* Title & Metadata */}
              <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-6 px-1 sm:px-2">
                <h3 className="text-sm sm:text-base font-semibold text-text-primary/90 group-hover:text-text-primary transition-colors duration-300 line-clamp-1">
                  {entry.title}
                </h3>
                
                {/* Meta details */}
                <div className="flex items-center gap-4 text-xs text-muted font-body flex-shrink-0">
                  <span className="bg-surface/50 border border-white/5 px-2 py-0.5 rounded text-[10px] text-text-primary font-mono">{entry.category}</span>
                  <span>{entry.readTime}</span>
                  <span className="w-1.5 h-1.5 bg-stroke rounded-full" />
                  <span>{entry.date}</span>
                </div>
              </div>

              {/* Arrow Indicator */}
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border border-stroke flex items-center justify-center flex-shrink-0 bg-surface sm:bg-transparent group-hover:bg-text-primary group-hover:border-transparent transition-all duration-300 mr-1 sm:mr-2">
                <span className="text-text-primary group-hover:text-bg text-sm sm:text-base transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile Only Button */}
        <div className="flex justify-center mt-10 md:hidden">
          <button className="relative group rounded-full text-xs font-semibold p-[1.5px] focus:outline-none w-full">
            <span className="absolute inset-0 rounded-full accent-gradient" />
            <span className="relative flex items-center justify-center gap-2 bg-surface text-text-primary rounded-full py-3.5">
              View all thoughts <span>→</span>
            </span>
          </button>
        </div>

      </div>
    </section>
  );
};
