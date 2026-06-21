import { useEffect, useRef, useState, useCallback } from 'react';

interface ScrollVideoBackgroundProps {
  /** Video URL (MP4) to use as the scroll-controlled source */
  videoUrl: string;
  /** Optional overlay opacity (0-1) to darken the video */
  overlayOpacity?: number;
  /** Optional className for the container */
  className?: string;
  /** Optional z-index for layering */
  zIndex?: number;
}

export const ScrollVideoBackground = ({
  videoUrl,
  overlayOpacity = 0.2,
  className = '',
  zIndex = -10,
}: ScrollVideoBackgroundProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const framesRef = useRef<ImageBitmap[]>([]);
  const framesReadyRef = useRef(false);
  const lastFrameIndexRef = useRef(-1);
  const videoSeekingRef = useRef(false);
  const rafIdRef = useRef<number | null>(null);

  // Smooth scroll tracking via Linear Interpolation (Lerp)
  const targetProgressRef = useRef(0);
  const currentProgressRef = useRef(0);

  const [isFramesMode, setIsFramesMode] = useState(false);
  const [loadProgress, setLoadProgress] = useState(0);

  // Resize canvas to match container with DPR scaling
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const dpr = Math.min(window.devicePixelRatio, 2);
    const rect = container.getBoundingClientRect();
    const w = Math.round(rect.width * dpr);
    const h = Math.round(rect.height * dpr);

    if (canvas.width !== w || canvas.height !== h) {
      canvas.width = w;
      canvas.height = h;
      canvas.style.width = '100%';
      canvas.style.height = '100%';
    }
    lastFrameIndexRef.current = -1;
  }, []);

  // Extract frames from video
  const extractFrames = useCallback(async () => {
    const canvas = canvasRef.current;
    const videoEl = videoRef.current;
    if (!canvas || !videoEl) return;

    try {
      const response = await fetch(videoUrl, { mode: 'cors' });
      if (!response.ok) throw new Error('Network response was not OK');
      const blob = await response.blob();
      const objectUrl = URL.createObjectURL(blob);

      const video = document.createElement('video');
      video.muted = true;
      video.playsInline = true;
      video.crossOrigin = 'anonymous';
      video.preload = 'auto';
      video.src = objectUrl;

      await new Promise((resolve, reject) => {
        video.onloadedmetadata = () => resolve(video);
        video.onerror = () => reject(new Error('Video load failed'));
        setTimeout(() => reject(new Error('Video load timeout')), 10000);
      });

      const scale = Math.min(1, 1024 / video.videoWidth); // slightly downscale for rapid caching
      const scaledWidth = Math.round(video.videoWidth * scale);
      const scaledHeight = Math.round(video.videoHeight * scale);
      
      // Extract 80 frames for optimal load speed and scrub density
      const frameCount = 80;
      const frames: ImageBitmap[] = [];

      for (let i = 0; i < frameCount; i++) {
        const time = (i / (frameCount - 1)) * (video.duration - 0.05);
        video.currentTime = time;
        await new Promise((resolve) => {
          const onSeeked = () => {
            video.removeEventListener('seeked', onSeeked);
            resolve(null);
          };
          video.addEventListener('seeked', onSeeked);
          setTimeout(resolve, 1000); // safety fallback
        });
        
        const bitmap = await createImageBitmap(video, {
          resizeWidth: scaledWidth,
          resizeHeight: scaledHeight,
        });
        frames.push(bitmap);
        setLoadProgress(Math.round(((i + 1) / frameCount) * 100));
      }

      if (frames.length > 0) {
        framesRef.current = frames;
        framesReadyRef.current = true;
        setIsFramesMode(true);
        if (videoRef.current) {
          videoRef.current.style.display = 'none';
        }
      }

      URL.revokeObjectURL(objectUrl);
    } catch (err) {
      console.warn('Frame extraction failed, using smooth video seeking fallback', err);
      setIsFramesMode(false);
      if (videoRef.current) {
        videoRef.current.style.display = 'block';
      }
    }
  }, [videoUrl]);

  // Read raw scroll progress (0–1)
  const updateScrollProgress = useCallback(() => {
    const scrollY = window.scrollY;
    const vh = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;

    const start = vh * 0.05;
    const end = docHeight - vh;
    const range = end - start;

    if (range <= 0) {
      targetProgressRef.current = 0;
    } else {
      targetProgressRef.current = Math.max(0, Math.min(1, (scrollY - start) / range));
    }
  }, []);

  // Draw a frame onto the canvas
  const drawFrame = useCallback((frame: ImageBitmap) => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const cw = canvas.width;
    const ch = canvas.height;
    const s = Math.max(cw / frame.width, ch / frame.height);
    const dw = frame.width * s;
    const dh = frame.height * s;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(frame, (cw - dw) / 2, (ch - dh) / 2, dw, dh);
  }, []);

  // Main render loop — driven by requestAnimationFrame with Lerp smoothing
  const renderLoop = useCallback(() => {
    // Smooth the progress parameter using linear interpolation (lerp)
    // Easing factor: 0.08 (smooth glide)
    const diff = targetProgressRef.current - currentProgressRef.current;
    
    if (Math.abs(diff) > 0.0001) {
      currentProgressRef.current += diff * 0.08;
    } else {
      currentProgressRef.current = targetProgressRef.current;
    }

    const progress = currentProgressRef.current;

    if (framesReadyRef.current && framesRef.current.length > 0) {
      // Frame-by-frame mode
      const idx = Math.round(progress * (framesRef.current.length - 1));
      if (idx !== lastFrameIndexRef.current) {
        lastFrameIndexRef.current = idx;
        const frame = framesRef.current[idx];
        if (frame) drawFrame(frame);
      }
    } else {
      // Fallback seeking mode (also smoothed by lerped progress)
      const videoEl = videoRef.current;
      if (
        videoEl &&
        videoEl.duration &&
        isFinite(videoEl.duration) &&
        videoEl.readyState >= 1
      ) {
        const targetTime = progress * videoEl.duration;
        if (
          !videoSeekingRef.current &&
          Math.abs(videoEl.currentTime - targetTime) > 0.04
        ) {
          videoSeekingRef.current = true;
          videoEl.currentTime = targetTime;
        }
      }
    }

    rafIdRef.current = requestAnimationFrame(renderLoop);
  }, [drawFrame]);

  // Setup: resize + frame extraction + render loop
  useEffect(() => {
    resizeCanvas();
    extractFrames();
    renderLoop();

    const handleScroll = () => updateScrollProgress();
    const handleResize = () => resizeCanvas();

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleResize);

    const videoEl = videoRef.current;
    const onSeeked = () => { videoSeekingRef.current = false; };
    const onStalled = () => { videoSeekingRef.current = false; };

    videoEl?.addEventListener('seeked', onSeeked);
    videoEl?.addEventListener('stalled', onStalled);

    // Initial calculation
    updateScrollProgress();

    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      videoEl?.removeEventListener('seeked', onSeeked);
      videoEl?.removeEventListener('stalled', onStalled);
      
      framesRef.current.forEach((b) => b.close());
      framesRef.current = [];
    };
  }, [extractFrames, renderLoop, resizeCanvas, updateScrollProgress]);

  return (
    <div
      ref={containerRef}
      className={`fixed inset-0 w-full h-full ${className}`}
      style={{ zIndex }}
    >
      {/* Canvas — primary rendering surface */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full object-cover"
        style={{ visibility: isFramesMode ? 'visible' : 'hidden' }}
      />

      {/* Video — fallback when frames aren't ready */}
      <video
        ref={videoRef}
        muted
        playsInline
        preload="auto"
        crossOrigin="anonymous"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ display: isFramesMode ? 'none' : 'block' }}
        src={videoUrl}
      />

      {/* Subtle Frame Extraction Loader Bar at the top of the viewport */}
      {!isFramesMode && loadProgress < 100 && (
        <div className="absolute top-0 left-0 w-full h-[3px] bg-stroke/20 z-20">
          <div 
            className="h-full bg-text-primary/70 transition-all duration-300"
            style={{ width: `${loadProgress}%` }}
          />
        </div>
      )}

      {/* Overlay */}
      <div
        className="absolute inset-0"
        style={{ background: `rgba(0,0,0,${overlayOpacity})` }}
      />
    </div>
  );
};

export default ScrollVideoBackground;
