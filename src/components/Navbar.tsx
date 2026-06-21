import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface NavbarProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Work', id: 'work' },
    { label: 'Journal', id: 'journal' },
    { label: 'Playground', id: 'playground' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4 select-none">
      <motion.div
        animate={{
          boxShadow: isScrolled ? '0 10px 30px -10px rgba(0,0,0,0.7)' : '0 0px 0px rgba(0,0,0,0)',
          borderColor: isScrolled ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)',
          backgroundColor: isScrolled ? 'rgba(8, 8, 8, 0.85)' : 'rgba(8, 8, 8, 0.65)'
        }}
        transition={{ duration: 0.3 }}
        className="inline-flex items-center rounded-full backdrop-blur-md border border-white/10 px-3 py-2"
      >
        {/* Logo */}
        <button
          onClick={() => onNavClick('home')}
          onMouseEnter={() => setLogoHovered(true)}
          onMouseLeave={() => setLogoHovered(false)}
          className="relative w-9 h-9 rounded-full flex items-center justify-center p-[1px] transition-transform duration-300 hover:scale-110 focus:outline-none"
        >
          {/* Outer Ring Accent Gradient */}
          <div
            className="absolute inset-0 rounded-full transition-all duration-500"
            style={{
              background: logoHovered
                ? 'linear-gradient(270deg, #89AACC 0%, #4E85BF 100%)' // Reverse direction on hover
                : 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
            }}
          />
          <div className="absolute inset-[1px] bg-bg rounded-full flex items-center justify-center">
            <span className="font-display italic text-[13px] text-text-primary font-bold tracking-tight">HR</span>
          </div>
        </button>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-2 hidden sm:block" />

        {/* Nav Links */}
        <div className="flex items-center gap-1 sm:gap-1.5">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavClick(link.id)}
                className={`text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-all duration-300 font-body relative ${
                  isActive
                    ? 'text-text-primary bg-stroke/50'
                    : 'text-muted hover:text-text-primary hover:bg-stroke/30'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>

        {/* Divider */}
        <div className="w-px h-5 bg-stroke mx-2" />

        {/* Say Hi Button */}
        <a
          href="#contact"
          onClick={(e) => {
            e.preventDefault();
            onNavClick('contact');
          }}
          className="relative text-xs sm:text-sm rounded-full px-3.5 sm:px-4.5 py-1.5 sm:py-2 group inline-flex items-center justify-center focus:outline-none overflow-visible"
        >
          {/* Animated gradient border on hover */}
          <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
          
          {/* Inner content wrapper */}
          <span className="flex items-center gap-1 bg-surface group-hover:bg-bg/95 rounded-full px-3.5 sm:px-4.5 py-1.5 sm:py-2 text-text-primary border border-white/5 transition-colors duration-300">
            Say hi <span className="inline-block transform transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">↗</span>
          </span>
        </a>
      </motion.div>
    </nav>
  );
};
