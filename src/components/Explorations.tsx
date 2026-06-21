import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence } from 'framer-motion';

// Register ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// Import images — matching reference design
import img1 from '../assets/explore_green_planet.png';
import img2 from '../assets/explore_asteroids.png';
import img3 from '../assets/explore_blue_fire.png';
import img4 from '../assets/playground_abstract.png';
import img5 from '../assets/project_automotive.png';
import img6 from '../assets/playground_cyber.png';

interface ExplorationItem {
  id: string;
  title: string;
  image: string;
  rotation: string;
  desc: string;
}

const ITEMS: ExplorationItem[] = [
  { id: 'exp-1', title: 'Green Planet', image: img1, rotation: '-rotate-3 hover:rotate-0', desc: 'Procedural planet rendering with atmospheric neon glow and aurora particle effects.' },
  { id: 'exp-2', title: 'Cosmic Debris', image: img2, rotation: 'rotate-2 hover:rotate-0', desc: 'Simulating realistic asteroid fields and floating rock formations in deep space.' },
  { id: 'exp-3', title: 'Blue Fire', image: img3, rotation: '-rotate-1 hover:rotate-0', desc: 'Ethereal flame dynamics and smoke turbulence using volumetric rendering techniques.' },
  { id: 'exp-4', title: 'Fluid Core', image: img4, rotation: 'rotate-3 hover:rotate-0', desc: 'Simulating glossy liquid metals using complex custom Fragment Shaders.' },
  { id: 'exp-5', title: 'Cyber Dynamics', image: img5, rotation: '-rotate-2 hover:rotate-0', desc: 'Exploring high-fidelity real-time shaders for automotive visualizer systems.' },
  { id: 'exp-6', title: 'Neural Flow', image: img6, rotation: 'rotate-4 hover:rotate-0', desc: 'Visualizing network architecture and floating data packets in deep layers.' },
];

export const Explorations: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const colARef = useRef<HTMLDivElement>(null);
  const colBRef = useRef<HTMLDivElement>(null);

  const [activeItem, setActiveItem] = useState<ExplorationItem | null>(null);

  useEffect(() => {
    // Pinning Left Column
    const pin = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom bottom',
      pin: leftPanelRef.current,
      pinSpacing: false,
    });

    // Column A Parallax (move up)
    const animA = gsap.fromTo(
      colARef.current,
      { y: 150 },
      {
        y: -150,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );

    // Column B Parallax (move down)
    const animB = gsap.fromTo(
      colBRef.current,
      { y: -150 },
      {
        y: 150,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      }
    );

    return () => {
      pin.kill();
      animA.scrollTrigger?.kill();
      animB.scrollTrigger?.kill();
    };
  }, []);

  // Split items into Col A (odd indexes) and Col B (even indexes)
  const colAItems = ITEMS.filter((_, idx) => idx % 2 === 0);
  const colBItems = ITEMS.filter((_, idx) => idx % 2 !== 0);

  return (
    <section
      ref={sectionRef}
      id="playground"
      className={`relative min-h-[300vh] bg-bg flex flex-col md:flex-row select-none border-b border-stroke ${activeItem ? 'z-[99999]' : 'z-10'}`}
    >
      {/* Pinned Left Panel (z-10) */}
      <div className="w-full md:w-1/2 h-screen flex flex-col justify-center items-start px-6 md:px-12 lg:px-20 z-10 pointer-events-none">
        <div ref={leftPanelRef} className="pointer-events-auto flex flex-col gap-4 max-w-md py-10">
          <div className="flex items-center gap-3">
            <span className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em] font-body font-bold">E X P L O R A T I O N S</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-text-primary font-display font-medium leading-none">
            Visual <span className="italic">playground</span>
          </h2>
          <p className="text-sm md:text-base text-muted font-body leading-relaxed mt-2">
            A space for creative experiments, motion studies and visual explorations.
          </p>

        </div>
      </div>

      {/* Parallax Right Panel (z-20) */}
      <div className="w-full md:w-1/2 min-h-screen relative flex items-start justify-center py-20 px-6 md:px-8">
        <div className="grid grid-cols-2 gap-6 md:gap-10 w-full max-w-[640px] pt-12 md:pt-24">
          
          {/* Column A (Left Grid Column) */}
          <div ref={colARef} className="flex flex-col gap-10 md:gap-14">
            {colAItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`w-full aspect-square relative rounded-2xl overflow-hidden border border-stroke bg-surface/50 cursor-pointer shadow-xl transition-all duration-500 ease-out transform hover:scale-[1.03] group ${item.rotation}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="halftone-overlay opacity-10 mix-blend-multiply absolute inset-0 pointer-events-none" />
                {/* Bottom title display */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg/95 via-bg/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] text-muted uppercase tracking-wider">Concept</span>
                  <p className="text-xs font-semibold text-text-primary mt-0.5">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Column B (Right Grid Column) */}
          <div ref={colBRef} className="flex flex-col gap-10 md:gap-14 pt-10 md:pt-20">
            {colBItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveItem(item)}
                className={`w-full aspect-square relative rounded-2xl overflow-hidden border border-stroke bg-surface/50 cursor-pointer shadow-xl transition-all duration-500 ease-out transform hover:scale-[1.03] group ${item.rotation}`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-700"
                />
                <div className="halftone-overlay opacity-10 mix-blend-multiply absolute inset-0 pointer-events-none" />
                {/* Bottom title display */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-bg/95 via-bg/40 to-transparent p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-[10px] text-muted uppercase tracking-wider">Concept</span>
                  <p className="text-xs font-semibold text-text-primary mt-0.5">{item.title}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {activeItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActiveItem(null)}
            className="fixed inset-0 z-[9999] bg-bg/90 backdrop-blur-md flex items-center justify-center p-4 md:p-8 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              transition={{ duration: 0.35, ease: [0.25, 0.1, 0.25, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-[600px] bg-surface border border-stroke rounded-3xl overflow-hidden shadow-2xl cursor-default"
            >
              {/* Media */}
              <div className="w-full aspect-video md:aspect-[4/3] border-b border-stroke overflow-hidden relative">
                <img
                  src={activeItem.image}
                  alt={activeItem.title}
                  className="w-full h-full object-cover"
                />
                <div className="halftone-overlay opacity-10 mix-blend-multiply absolute inset-0 pointer-events-none" />
                
                {/* Close Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveItem(null);
                  }}
                  className="absolute top-4 right-4 w-9 h-9 rounded-full bg-bg/60 hover:bg-bg/90 border border-white/10 flex items-center justify-center text-text-primary text-lg transition-colors duration-300 shadow-md z-50 cursor-pointer pointer-events-auto"
                >
                  ✕
                </button>
              </div>

              {/* Text Info */}
              <div className="p-6 md:p-8 flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-semibold">Visual Playground</span>
                  <span className="text-xs text-muted">2026 Edition</span>
                </div>
                <h3 className="text-xl sm:text-2xl text-text-primary font-display font-medium leading-none mt-1">
                  {activeItem.title}
                </h3>
                <p className="text-sm text-muted font-body leading-relaxed mt-2">
                  {activeItem.desc}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
};
