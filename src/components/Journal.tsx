import React from 'react';
import { motion } from 'framer-motion';
import { Clock } from 'lucide-react';
import { JOURNAL_POSTS } from './JournalPostDetail';

interface JournalProps {
  onPostClick?: (postId: string) => void;
}

export const Journal: React.FC<JournalProps> = ({ onPostClick }) => {
  return (
    <section id="journal" className="bg-bg py-20 md:py-28 overflow-hidden select-none">
      <div className="max-w-[1200px] mx-auto px-5 md:px-10 lg:px-16">
        
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
        </motion.div>

        {/* Entries List */}
        <div className="flex flex-col gap-3 md:gap-5">
          {JOURNAL_POSTS.map((entry, index) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: index * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={() => onPostClick && onPostClick(entry.id)}
              className="group cursor-pointer transition-colors duration-300"
            >
              {/* Desktop Layout — horizontal pill */}
              <div className="hidden sm:flex items-center gap-5 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-full transition-colors duration-300">
                {/* Image Circle */}
                <div className="w-14 h-14 md:w-16 md:h-16 rounded-full overflow-hidden flex-shrink-0 border border-stroke">
                  <img src={entry.image} alt={entry.title} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
                </div>

                {/* Title & Metadata */}
                <div className="flex-grow flex flex-col md:flex-row md:items-center justify-between gap-2 md:gap-6 px-1">
                  <h3 className="text-sm md:text-base font-semibold text-text-primary/90 group-hover:text-text-primary transition-colors duration-300 line-clamp-1">
                    {entry.title}
                  </h3>
                  <div className="flex items-center gap-3 text-xs text-muted font-body flex-shrink-0">
                    <span className="bg-surface/60 border border-white/5 px-2.5 py-0.5 rounded-full text-[10px] text-text-primary/80 font-mono">{entry.category}</span>
                    <span>{entry.readTime}</span>
                    <span className="w-1 h-1 bg-stroke rounded-full" />
                    <span>{entry.date}</span>
                  </div>
                </div>

                {/* Arrow */}
                <div className="w-11 h-11 rounded-full border border-stroke flex items-center justify-center flex-shrink-0 group-hover:bg-text-primary group-hover:border-transparent transition-all duration-300 mr-1">
                  <span className="text-text-primary group-hover:text-bg text-sm transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
                </div>
              </div>

              {/* Mobile Layout — compact card */}
              <div className="flex sm:hidden bg-surface/30 hover:bg-surface border border-stroke rounded-2xl overflow-hidden transition-colors duration-300">
                {/* Thumbnail */}
                <div className="w-24 h-24 flex-shrink-0 overflow-hidden">
                  <img src={entry.image} alt={entry.title} className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110" />
                </div>

                {/* Content */}
                <div className="flex-grow flex flex-col justify-center gap-1.5 px-4 py-3 min-w-0">
                  <h3 className="text-[13px] font-semibold text-text-primary/90 group-hover:text-text-primary transition-colors duration-300 line-clamp-2 leading-snug">
                    {entry.title}
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] text-muted font-body">
                    <span className="bg-surface/60 border border-white/5 px-1.5 py-0.5 rounded text-text-primary/70 font-mono truncate max-w-[80px]">{entry.category}</span>
                    <div className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      <span>{entry.readTime}</span>
                    </div>
                  </div>
                </div>

                {/* Arrow */}
                <div className="flex items-center justify-center pr-3 flex-shrink-0">
                  <div className="w-8 h-8 rounded-full border border-stroke flex items-center justify-center group-hover:bg-text-primary group-hover:border-transparent transition-all duration-300">
                    <span className="text-text-primary group-hover:text-bg text-xs">↗</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};
