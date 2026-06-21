import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface LoadingScreenProps {
  onComplete: () => void;
}

const WORDS = ["Design", "Create", "Inspire"];

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onComplete }) => {
  const [count, setCount] = useState<number>(0);
  const [wordIndex, setWordIndex] = useState<number>(0);
  const startTimeRef = useRef<number | null>(null);
  const duration = 2700; // 2700ms duration

  // Counter animation using requestAnimationFrame
  useEffect(() => {
    let animationFrameId: number;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const progress = timestamp - startTimeRef.current;
      const percentage = Math.min((progress / duration) * 100, 100);
      
      setCount(Math.floor(percentage));

      if (percentage < 100) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        // Complete delay
        setTimeout(() => {
          onComplete();
        }, 400);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [onComplete]);

  // Word cycler every 900ms
  useEffect(() => {
    const wordInterval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % WORDS.length);
    }, 900);

    return () => clearInterval(wordInterval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] } }}
      className="fixed inset-0 z-[9999] bg-bg flex flex-col justify-between p-8 md:p-12 lg:p-16 select-none"
    >
      {/* Top Left: Portfolio Label */}
      <div className="overflow-hidden">
        <motion.div
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-xs text-muted uppercase tracking-[0.3em] font-body"
        >
          Portfolio
        </motion.div>
      </div>

      {/* Center: Rotating Words */}
      <div className="flex justify-center items-center h-full">
        <div className="relative h-20 md:h-28 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.h1
              key={wordIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 0.8 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.215, 0.61, 0.355, 1] }}
              className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary text-center"
            >
              {WORDS[wordIndex]}
            </motion.h1>
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom Row: Counter & Progress */}
      <div className="w-full flex flex-col gap-6">
        <div className="flex justify-end items-end">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums leading-none"
          >
            {String(count).padStart(3, "0")}
          </motion.div>
        </div>

        {/* Progress Bar Container */}
        <div className="w-full h-[3px] bg-stroke/30 rounded-full overflow-hidden relative">
          <div
            className="accent-gradient h-full rounded-full transition-transform duration-75 ease-out origin-left"
            style={{
              transform: `scaleX(${count / 100})`,
              boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)'
            }}
          />
        </div>
      </div>
    </motion.div>
  );
};
