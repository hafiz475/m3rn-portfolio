import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Mail, Phone, MapPin, ExternalLink, Send } from 'lucide-react';
import Hls from 'hls.js';
import { WordsPullUp } from './WordsPullUp';

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8';

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(e => console.log('HLS contact play error:', e));
      });

      return () => hls.destroy();
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = streamUrl;
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(e => console.log('Native HLS contact play error:', e));
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: '', email: '', message: '' });
      }, 3000);
    }
  };

  const fadeUpVariants = {
    hidden: { y: 25, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number]
      }
    }
  };

  return (
    <section id="contact" className="w-full bg-bg py-24 px-4 sm:px-6 md:px-8 border-t border-stroke text-left select-none relative overflow-hidden">
      {/* Background Video (Flipped Vertically) */}
      <div className="absolute inset-0 w-full h-full z-0 overflow-hidden bg-black">
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          autoPlay
          className="absolute inset-0 w-full h-full object-cover opacity-60 scale-y-[-1]"
        />
        {/* Darker overlay */}
        <div className="absolute inset-0 bg-black/65 z-0" />
        {/* Top fade */}
        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-bg to-transparent z-[1]" />
      </div>

      <div className="max-w-6xl mx-auto flex flex-col items-center relative z-10">
        
        {/* Section Title */}
        <div className="mb-16 text-center">
          <WordsPullUp
            text="Get in Touch"
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-text-primary"
          />
          <p className="text-muted text-xs sm:text-sm md:text-base mt-2 font-light">
            Let's collaborate on SaaS platforms, real-time products, and 3D web applications
          </p>
        </div>

        {/* Content Layout */}
        <div ref={containerRef} className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full text-left items-start">
          
          {/* Info Details (left) */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-5 flex flex-col gap-8"
          >
            <div>
              <h3 className="text-2xl font-medium text-text-primary mb-4">
                Let's build something.
              </h3>
              <p className="text-muted text-sm font-light leading-relaxed">
                If you are looking for a Senior Product Engineer to architect scalable frontend modules, optimize code bundles, implement high-performance state management, or deploy robust MERN stack applications, feel free to reach out.
              </p>
            </div>

            {/* Icon Info List */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface/50 border border-stroke group-hover:border-text-primary/20 flex items-center justify-center transition-colors">
                  <Mail className="w-4 h-4 text-text-primary" />
                </div>
                <div>
                  <span className="text-[10px] text-muted uppercase tracking-widest font-mono block">Email</span>
                  <a href="mailto:mohammed.hafiz.4755@gmail.com" className="text-text-primary/95 hover:text-text-primary transition-colors text-sm sm:text-base font-light">
                    mohammed.hafiz.4755@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface/50 border border-stroke group-hover:border-text-primary/20 flex items-center justify-center transition-colors">
                  <Phone className="w-4 h-4 text-text-primary" />
                </div>
                <div>
                  <span className="text-[10px] text-muted uppercase tracking-widest font-mono block">Call</span>
                  <a href="tel:+918754274815" className="text-text-primary/95 hover:text-text-primary transition-colors text-sm sm:text-base font-light">
                    +91 87542 74815
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface/50 border border-stroke flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-text-primary" />
                </div>
                <div>
                  <span className="text-[10px] text-muted uppercase tracking-widest font-mono block">Location</span>
                  <span className="text-text-primary/95 text-sm sm:text-base font-light">
                    Chennai, India
                  </span>
                </div>
              </div>
            </div>

            {/* Social Links Row */}
            <div className="flex items-center gap-4 pt-4 border-t border-stroke">
              <a
                href="https://github.com/hafiz475"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-surface/50 border border-stroke hover:border-text-primary/20 flex items-center justify-center text-muted hover:text-text-primary transition-all"
                title="GitHub"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                  <path d="M9 18c-4.51 2-5-2-7-2" />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/hafiz-webdeveloper/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-surface/50 border border-stroke hover:border-text-primary/20 flex items-center justify-center text-muted hover:text-text-primary transition-all"
                title="LinkedIn"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect width="4" height="12" x="2" y="9" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
              <a
                href="https://hafiz475.github.io/MY_LIFE_JOURNEY_3d/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-surface/50 border border-stroke hover:border-text-primary/20 flex items-center justify-center text-muted hover:text-text-primary transition-all gap-1 text-[10px] uppercase font-mono tracking-wider font-bold"
                title="3D Portfolio"
              >
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </motion.div>

          {/* Contact Form (right) */}
          <motion.div
            variants={fadeUpVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="lg:col-span-7 bg-surface border border-stroke rounded-2xl p-6 sm:p-8 w-full shadow-2xl relative"
          >
            {submitted ? (
              <div className="flex flex-col items-center justify-center py-12 text-center">
                <span className="w-12 h-12 rounded-full bg-text-primary/10 border border-text-primary/20 flex items-center justify-center text-text-primary text-xl font-bold mb-4">
                  ✓
                </span>
                <h4 className="text-xl font-medium text-text-primary mb-2">Message Sent</h4>
                <p className="text-muted text-sm font-light">
                  Thank you for reaching out! I'll get back to you as soon as possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-[10px] text-muted uppercase tracking-widest font-mono">Name</label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                    placeholder="Enter your name"
                    className="bg-bg/50 border border-stroke focus:border-text-primary/30 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-muted outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-[10px] text-muted uppercase tracking-widest font-mono">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                    placeholder="Enter your email address"
                    className="bg-bg/50 border border-stroke focus:border-text-primary/30 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-muted outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-[10px] text-muted uppercase tracking-widest font-mono">Message</label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                    placeholder="Describe your inquiry or collaboration idea"
                    className="bg-bg/50 border border-stroke focus:border-text-primary/30 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-muted outline-none transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="flex items-center justify-center gap-2 bg-text-primary hover:bg-muted text-bg font-medium py-3 rounded-lg text-sm transition-colors mt-2 cursor-pointer"
                >
                  <span>Send Message</span>
                  <Send className="w-4 h-4 shrink-0" />
                </button>
              </form>
            )}
          </motion.div>

        </div>

      </div>
    </section>
  );
};
