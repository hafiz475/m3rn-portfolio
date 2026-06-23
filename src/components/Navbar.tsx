import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Compass, MessageSquare } from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavClick: (sectionId: string) => void;
  onCompassClick: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ activeSection, onNavClick, onCompassClick }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [logoHovered, setLogoHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const navLinks = [
    { label: 'Home', id: 'home' },
    { label: 'Work', id: 'work' },
    { label: 'Journal', id: 'journal' },
    { label: 'Playground', id: 'playground' },
  ];

  const handleMobileNav = (id: string) => {
    setMobileOpen(false);
    setTimeout(() => onNavClick(id), 300);
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center pt-4 md:pt-6 px-4 select-none gap-3">
        <motion.div
          animate={{
            boxShadow: isScrolled ? '0 10px 30px -10px rgba(0,0,0,0.7)' : '0 0px 0px rgba(0,0,0,0)',
            borderColor: isScrolled ? 'rgba(255, 255, 255, 0.15)' : 'rgba(255, 255, 255, 0.08)',
            backgroundColor: isScrolled ? 'rgba(8, 8, 8, 0.85)' : 'rgba(8, 8, 8, 0.65)',
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
            <div
              className="absolute inset-0 rounded-full transition-all duration-500"
              style={{
                background: logoHovered
                  ? 'linear-gradient(270deg, #89AACC 0%, #4E85BF 100%)'
                  : 'linear-gradient(90deg, #89AACC 0%, #4E85BF 100%)',
              }}
            />
            <div className="absolute inset-[1px] bg-bg rounded-full flex items-center justify-center">
              <span className="font-display italic text-[13px] text-text-primary font-bold tracking-tight">HR</span>
            </div>
          </button>

          {/* Divider — desktop only */}
          <div className="w-px h-5 bg-stroke mx-2 hidden md:block" />

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1.5">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onNavClick(link.id)}
                  className={`text-sm rounded-full px-4 py-2 transition-all duration-300 font-body relative ${
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
          <div className="w-px h-5 bg-stroke mx-2 hidden md:block" />

          {/* Say Hi Button — desktop only */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onNavClick('contact');
            }}
            className="hidden md:inline-flex relative text-sm rounded-full py-2 group items-center justify-center focus:outline-none overflow-visible"
          >
            <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
            <span className="flex items-center gap-2 bg-surface group-hover:bg-bg/95 rounded-full px-6 py-2 text-text-primary border border-white/5 transition-colors duration-300">
              Say hi 
              <MessageSquare className="w-3.5 h-3.5 transition-transform duration-300 group-hover:scale-110" />
            </span>
          </a>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden flex items-center justify-center w-9 h-9 rounded-full bg-surface/50 border border-white/5 ml-2 focus:outline-none cursor-pointer"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col items-center justify-center gap-[5px] w-4">
              <span className={`block w-full h-[1.5px] bg-text-primary rounded-full transition-all duration-300 ${mobileOpen ? 'rotate-45 translate-y-[3.25px]' : ''}`} />
              <span className={`block w-full h-[1.5px] bg-text-primary rounded-full transition-all duration-300 ${mobileOpen ? '-rotate-45 -translate-y-[3.25px]' : ''}`} />
            </div>
          </button>
        </motion.div>

        {/* Floating Compass Button */}
        <button
          onClick={onCompassClick}
          className="w-11 h-11 rounded-full border border-white/10 bg-surface/30 hover:bg-surface/60 backdrop-blur-md flex items-center justify-center text-text-primary hover:text-accent hover:border-white/20 transition-all duration-300 hover:scale-105 pointer-events-auto shadow-lg shadow-black/30 shrink-0"
          title="Locate Hafiz"
        >
          <Compass className="w-5 h-5 animate-spin-slow" />
        </button>
      </nav>

      {/* Mobile Full-Screen Overlay Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-bg/95 backdrop-blur-2xl flex flex-col items-center justify-center gap-2 md:hidden"
          >
            {navLinks.map((link, i) => {
              const isActive = activeSection === link.id;
              return (
                <motion.button
                  key={link.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3, delay: i * 0.06 }}
                  onClick={() => handleMobileNav(link.id)}
                  className={`text-2xl font-display font-medium px-8 py-4 rounded-2xl transition-colors duration-300 w-[70%] text-center ${
                    isActive
                      ? 'text-text-primary bg-surface border border-white/10'
                      : 'text-muted hover:text-text-primary'
                  }`}
                >
                  {link.label}
                </motion.button>
              );
            })}

            {/* Say Hi — mobile */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3, delay: navLinks.length * 0.06 }}
              onClick={() => handleMobileNav('contact')}
              className="mt-4 relative rounded-full text-sm font-semibold p-[1.5px] focus:outline-none w-[60%] group"
            >
              <span className="absolute inset-0 rounded-full accent-gradient" />
              <span className="relative flex items-center justify-center gap-2 bg-surface text-text-primary rounded-full py-3.5 text-base">
                Say hi 
                <MessageSquare className="w-4 h-4" />
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
