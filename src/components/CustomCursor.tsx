import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

export const CustomCursor: React.FC = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [cursorLabel, setCursorLabel] = useState('');

  useEffect(() => {
    const cursor = cursorRef.current;
    const cursorDot = cursorDotRef.current;
    if (!cursor || !cursorDot) return;

    // Smoothly follow the mouse with GSAP
    const onMouseMove = (e: MouseEvent) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.6,
        ease: 'power3.out',
      });
      gsap.to(cursorDot, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: 'power2.out',
      });
    };

    // Detect hoverable elements
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverEl = target.closest('[data-cursor]');
      if (hoverEl) {
        setIsHovering(true);
        const label = hoverEl.getAttribute('data-cursor') || '';
        setCursorLabel(label);
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const hoverEl = target.closest('[data-cursor]');
      if (hoverEl) {
        setIsHovering(false);
        setCursorLabel('');
      }
    };

    // Also detect standard interactive elements for a subtle scale
    const addHoverListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"]');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', () => {
          if (!el.hasAttribute('data-cursor')) {
            gsap.to(cursor, { scale: 1.5, duration: 0.3, ease: 'power2.out' });
          }
        });
        el.addEventListener('mouseleave', () => {
          if (!el.hasAttribute('data-cursor')) {
            gsap.to(cursor, { scale: 1, duration: 0.3, ease: 'power2.out' });
          }
        });
      });
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    // Small delay to let DOM render
    const timer = setTimeout(addHoverListeners, 1000);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      clearTimeout(timer);
    };
  }, []);

  return (
    <>
      {/* Outer ring cursor */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none mix-blend-difference hidden md:block"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="relative flex items-center justify-center transition-all duration-300 ease-out"
          style={{
            width: isHovering ? '80px' : '36px',
            height: isHovering ? '80px' : '36px',
          }}
        >
          {/* Ring */}
          <div
            className="absolute inset-0 rounded-full border transition-all duration-300"
            style={{
              borderColor: isHovering ? 'rgba(137, 170, 204, 0.8)' : 'rgba(245, 245, 245, 0.5)',
              borderWidth: isHovering ? '2px' : '1px',
              background: isHovering ? 'rgba(137, 170, 204, 0.08)' : 'transparent',
              backdropFilter: isHovering ? 'blur(4px)' : 'none',
            }}
          />

          {/* Label text when hovering data-cursor elements */}
          {isHovering && cursorLabel && (
            <span className="text-[9px] font-body font-bold uppercase tracking-wider text-white text-center leading-tight px-1">
              {cursorLabel}
            </span>
          )}
        </div>
      </div>

      {/* Inner dot cursor */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 z-[99999] pointer-events-none hidden md:block"
        style={{
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div
          className="rounded-full bg-white transition-all duration-200"
          style={{
            width: isHovering ? '4px' : '5px',
            height: isHovering ? '4px' : '5px',
            opacity: isHovering ? 0.6 : 0.9,
          }}
        />
      </div>
    </>
  );
};
