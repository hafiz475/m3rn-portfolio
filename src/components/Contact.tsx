import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Mail, Phone, MapPin, ExternalLink, Send } from "lucide-react";
import Hls from "hls.js";
import { WordsPullUp } from "./WordsPullUp";

export const Contact: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });

  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const streamUrl =
      "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls({
        maxMaxBufferLength: 10,
        enableWorker: true,
      });
      hls.loadSource(streamUrl);
      hls.attachMedia(video);
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((e) => console.log("HLS contact play error:", e));
      });

      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        video
          .play()
          .catch((e) => console.log("Native HLS contact play error:", e));
      });
    }
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formState.name && formState.email && formState.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormState({ name: "", email: "", message: "" });
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
        ease: [0.16, 1, 0.3, 1] as [number, number, number, number],
      },
    },
  };

  return (
    <section
      id="contact"
      className="w-full bg-bg py-24 px-4 sm:px-6 md:px-8 border-t border-stroke text-left select-none relative overflow-hidden"
    >
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
            Let's collaborate on SaaS platforms, real-time products, and 3D web
            applications
          </p>
        </div>

        {/* Content Layout */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-12 w-full text-left items-start"
        >
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
                If you are looking for a Senior Product Engineer to architect
                scalable frontend modules, optimize code bundles, implement
                high-performance state management, or deploy robust MERN stack
                applications, feel free to reach out.
              </p>
            </div>

            {/* Icon Info List */}
            <div className="flex flex-col gap-5">
              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface/50 border border-stroke group-hover:border-text-primary/20 flex items-center justify-center transition-colors">
                  <Mail className="w-4 h-4 text-text-primary" />
                </div>
                <div>
                  <span className="text-[10px] text-muted uppercase tracking-widest font-mono block">
                    Email
                  </span>
                  <a
                    href="mailto:mohammed.hafiz.4755@gmail.com"
                    className="text-text-primary/95 hover:text-text-primary transition-colors text-sm sm:text-base font-light"
                  >
                    mohammed.hafiz.4755@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface/50 border border-stroke group-hover:border-text-primary/20 flex items-center justify-center transition-colors">
                  <Phone className="w-4 h-4 text-text-primary" />
                </div>
                <div>
                  <span className="text-[10px] text-muted uppercase tracking-widest font-mono block">
                    Call
                  </span>
                  <a
                    href="tel:+918754274815"
                    className="text-text-primary/95 hover:text-text-primary transition-colors text-sm sm:text-base font-light"
                  >
                    +91 87542 74815
                  </a>
                </div>
              </div>

              <div className="flex items-center gap-4 group">
                <div className="w-10 h-10 rounded-full bg-surface/50 border border-stroke flex items-center justify-center">
                  <MapPin className="w-4 h-4 text-text-primary" />
                </div>
                <div>
                  <span className="text-[10px] text-muted uppercase tracking-widest font-mono block">
                    Location
                  </span>
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
                className="w-10 h-10 rounded-full bg-surface/50 border border-stroke hover:border-white/20 flex items-center justify-center transition-all"
                title="GitHub"
              >
                <svg
                  className="w-5 h-5 fill-current text-white"
                  viewBox="0 0 24 24"
                >
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"
                  />
                </svg>
              </a>
              <a
                href="https://www.linkedin.com/in/hafiz-webdeveloper/"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-surface/50 border border-stroke hover:border-[#0077b5]/20 flex items-center justify-center transition-all"
                title="LinkedIn"
              >
                <svg className="w-5 h-5 fill-[#0077b5]" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
              <a
                href="https://wa.me/918754274815?text=Hi%20Hafiz,%20I%20would%20love%20to%20connect!"
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 rounded-full bg-surface/50 border border-stroke hover:border-[#25D366]/20 flex items-center justify-center transition-all"
                title="WhatsApp"
              >
                <svg className="w-5 h-5 fill-[#25D366]" viewBox="0 0 24 24">
                  <path d="M12 2.2c-5.41 0-9.8 4.387-9.8 9.8 0 1.73.46 3.353 1.262 4.755L2.2 21.8l5.142-1.226A9.768 9.768 0 0 0 12 21.8c5.41 0 9.8-4.387 9.8-9.8S17.41 2.2 12 2.2zm0 17.78a8.18 8.18 0 0 1-4.165-1.143l-.298-.178-3.084.735.738-3.005-.193-.31A8.155 8.155 0 0 1 3.78 12c0-4.535 3.685-8.22 8.22-8.22S20.22 7.465 20.22 12 16.535 19.98 12 19.98z" />
                  <path d="M16.6 14.05c-.227-.114-1.346-.664-1.554-.74-.207-.077-.357-.114-.508.114-.15.228-.582.74-.713.892-.13.151-.262.17-.49.057-.227-.114-.96-.354-1.83-1.13-.674-.6-1.13-1.34-1.262-1.566-.13-.227-.014-.35.1-.464.1-.103.227-.265.34-.398.114-.133.15-.227.227-.378.077-.151.038-.284-.02-.398-.057-.114-.51-1.23-.7-1.685-.187-.443-.378-.384-.52-.392l-.434-.007c-.151 0-.398.057-.605.284-.207.227-.794.776-.794 1.893 0 1.117.815 2.198.93 2.351.114.151 1.602 2.44 3.876 3.422.542.234.964.374 1.293.478.544.173 1.038.149 1.43.09.435-.066 1.346-.55 1.534-1.08.187-.53.187-.984.13-1.08-.055-.095-.207-.151-.434-.265z" />
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
                <h4 className="text-xl font-medium text-text-primary mb-2">
                  Message Sent
                </h4>
                <p className="text-muted text-sm font-light">
                  Thank you for reaching out! I'll get back to you as soon as
                  possible.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="name"
                    className="text-[10px] text-muted uppercase tracking-widest font-mono"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    required
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    placeholder="Enter your name"
                    className="bg-bg/50 border border-stroke focus:border-text-primary/30 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-muted outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="email"
                    className="text-[10px] text-muted uppercase tracking-widest font-mono"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    id="email"
                    required
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    placeholder="Enter your email address"
                    className="bg-bg/50 border border-stroke focus:border-text-primary/30 rounded-lg px-4 py-3 text-sm text-text-primary placeholder-muted outline-none transition-colors"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="message"
                    className="text-[10px] text-muted uppercase tracking-widest font-mono"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    rows={5}
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
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
