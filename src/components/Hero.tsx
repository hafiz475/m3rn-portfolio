import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface HeroProps {
  onSeeWorksClick: () => void;
  onReachOutClick: () => void;
}

const ROLES = ["Creative", "Fullstack", "Founder", "Scholar"];

export const Hero: React.FC<HeroProps> = ({ onSeeWorksClick, onReachOutClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [roleIndex, setRoleIndex] = useState(0);
  const [downloadStep, setDownloadStep] = useState<'idle' | 'loading' | 'success'>('idle');

  // Cycle roles every 2 seconds
  useEffect(() => {
    const roleInterval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % ROLES.length);
    }, 2000);
    return () => clearInterval(roleInterval);
  }, []);

  // GSAP Entrance Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(
        '.name-reveal',
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1.2, delay: 0.1 }
      );

      tl.fromTo(
        '.blur-in',
        { opacity: 0, y: 20, filter: 'blur(10px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', duration: 1.0, stagger: 0.15 },
        '-=0.8'
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden flex flex-col justify-center items-center select-none bg-black text-left"
    >
      {/* Video Container (occupies right 60% on desktop) */}
      <div className="absolute top-0 right-0 w-full md:w-[60%] h-full z-0 overflow-hidden bg-black">
        <video
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-w-full min-h-full w-auto h-auto object-cover opacity-85"
        />
        {/* Horizontal left-to-right blending gradient overlay (desktop only) */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-r from-black via-black/60 to-transparent z-10" />
        {/* Vertical/mobile overlays */}
        <div className="md:hidden absolute inset-0 bg-black/40 z-10" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black to-transparent z-10" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center px-6 max-w-4xl flex flex-col items-center">
        {/* Eyebrow */}
        <p className="blur-in text-xs text-muted uppercase tracking-[0.30em] mb-3 md:mb-6 font-body font-semibold">
          COLLECTION '26
        </p>

        {/* Name */}
        <h1 className="name-reveal flex flex-col mb-3 md:mb-6 select-none leading-none w-full max-w-[340px] sm:max-w-xl md:max-w-2xl lg:max-w-4xl">
          <span className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-display italic tracking-tight text-text-primary text-center sm:text-left">
            Hafizur*
          </span>
          <span className="text-[10px] sm:text-xs md:text-sm font-mono uppercase tracking-[0.45em] text-muted text-center sm:text-left sm:pl-[50%] mt-2.5 sm:mt-1">
            Rahman
          </span>
        </h1>

        {/* Role line */}
        <div className="blur-in text-base sm:text-lg md:text-xl text-text-primary/90 font-body mb-2 md:mb-4 h-8 flex items-center justify-center gap-1.5">
          <span>A</span>
          <span 
            key={roleIndex} 
            className="font-display italic text-text-primary animate-role-fade-in inline-block font-semibold tracking-wide"
          >
            {ROLES[roleIndex]}
          </span>
          <span>lives in Chennai, India.</span>
        </div>

        {/* Description */}
        <p className="blur-in text-sm md:text-base text-muted max-w-md mb-6 md:mb-10 leading-relaxed">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        {/* CTA Buttons */}
        <div className="blur-in flex flex-col sm:flex-row gap-4 items-center justify-center w-full">
          
          {/* See Works (Full text button) */}
          <button
            onClick={onSeeWorksClick}
            className="relative group rounded-full text-sm font-semibold transition-all duration-300 transform hover:scale-105 p-[2px] overflow-visible focus:outline-none cursor-pointer"
          >
            {/* Hover Accent Ring background */}
            <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <span className="relative block rounded-full bg-text-primary text-bg group-hover:bg-bg group-hover:text-text-primary px-8 py-3.5 transition-colors duration-300 text-center">
              See Works
            </span>
          </button>

          {/* Row for Reach out and Resume icon-only buttons */}
          <div className="flex gap-4 items-center justify-center">
            {/* Reach out (Icon-Only) */}
            <button
              onClick={onReachOutClick}
              className="relative group w-12 h-12 rounded-full transition-all duration-300 transform hover:scale-110 p-[2px] overflow-visible focus:outline-none flex items-center justify-center cursor-pointer"
              title="Reach Out"
            >
              {/* Hover Accent Ring background */}
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center w-full h-full rounded-full border-2 border-stroke bg-bg text-text-primary group-hover:border-transparent transition-colors duration-300">
                <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </span>
            </button>

            {/* Resume Download (Icon-Only) */}
            <a
              href="/J_Md_Hafizur_Rahman_Senior_Full_Stack_Resume.pdf"
              download="J_Md_Hafizur_Rahman_Senior_Full_Stack_Resume.pdf"
              onClick={(e) => {
                if (downloadStep !== 'idle') {
                  e.preventDefault();
                  return;
                }
                setDownloadStep('loading');
                setTimeout(() => {
                  setDownloadStep('success');
                  setTimeout(() => {
                    setDownloadStep('idle');
                  }, 1500);
                }, 3000);
              }}
              className={`relative group w-12 h-12 rounded-full transition-all duration-300 transform ${
                downloadStep === 'idle' ? 'hover:scale-110 animate-gentle-float hover:animate-none' : 'scale-100'
              } p-[2px] overflow-hidden focus:outline-none flex items-center justify-center cursor-pointer`}
              title="Download Resume"
            >
              <style>{`
                @keyframes float-bounce {
                  0%, 100% { transform: translateY(0); }
                  50% { transform: translateY(-4px); }
                }
                @keyframes progress-fill-btn {
                  0% { width: 0%; }
                  100% { width: 100%; }
                }
                .animate-gentle-float {
                  animation: float-bounce 3.5s ease-in-out infinite;
                }
                .animate-btn-progress {
                  animation: progress-fill-btn 3s linear forwards;
                }
              `}</style>
              <span className="absolute inset-0 rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <span className="relative flex items-center justify-center w-full h-full rounded-full border border-stroke bg-surface/50 text-text-primary transition-colors duration-300 overflow-hidden">
                
                {/* Active Loading Progress Bar Overlay */}
                {downloadStep === 'loading' && (
                  <div className="absolute bottom-0 left-0 h-[3px] bg-gradient-to-r from-accent to-[#89AACC] animate-btn-progress rounded-full" />
                )}

                {/* Dynamic Icons */}
                {downloadStep === 'idle' && (
                  <svg className="w-5 h-5 text-text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                )}
                {downloadStep === 'loading' && (
                  <svg className="w-5 h-5 text-text-primary animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                )}
                {downloadStep === 'success' && (
                  <svg className="w-5 h-5 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                )}
              </span>
            </a>
          </div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 pointer-events-none">
        <span className="text-[10px] text-muted uppercase tracking-[0.25em] font-semibold">SCROLL</span>
        <div className="w-[1px] h-10 bg-stroke/60 relative overflow-hidden rounded-full">
          <div className="absolute top-0 left-0 w-full h-1/3 accent-gradient animate-scroll-down" />
        </div>
      </div>
    </section>
  );
};
