import React from 'react';
import { motion } from 'framer-motion';

interface StatItem {
  id: string;
  value: string;
  label: string;
  subtext: string;
}

const STATS: StatItem[] = [
  {
    id: 'stat-1',
    value: '4+',
    label: 'Years Experience',
    subtext: 'Building scalable products and high-performance interactive web systems.'
  },
  {
    id: 'stat-2',
    value: '20+',
    label: 'Projects Done',
    subtext: 'Delivering end-to-end products for startups and enterprises.'
  },
];

export const Stats: React.FC = () => {
  return (
    <section className="bg-bg py-20 md:py-28 overflow-hidden select-none border-b border-stroke">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-12 lg:gap-16">
          
          {STATS.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: index * 0.15, ease: [0.25, 0.1, 0.25, 1] }}
              className="flex flex-col gap-3 relative md:border-l md:border-stroke md:pl-8 lg:pl-12 first:border-0 first:pl-0"
            >
              {/* Stat Value */}
              <div className="text-6xl sm:text-7xl lg:text-8xl font-display italic text-text-primary tracking-tight font-medium">
                {stat.value}
              </div>

              {/* Label */}
              <div className="text-xs text-text-primary uppercase tracking-[0.2em] font-body font-bold mt-1">
                {stat.label}
              </div>

              {/* Subtext */}
              <p className="text-xs sm:text-sm text-muted font-body leading-relaxed max-w-[280px] mt-1">
                {stat.subtext}
              </p>
            </motion.div>
          ))}

        </div>
      </div>
    </section>
  );
};
