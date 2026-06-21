import React, { useEffect, useRef } from "react";
import Hls from "hls.js";

export const GlobalVideoBackground: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);

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
        video.play().catch((e) => console.log("HLS global play error:", e));
      });

      return () => hls.destroy();
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = streamUrl;
      video.addEventListener("loadedmetadata", () => {
        video
          .play()
          .catch((e) => console.log("Native HLS global play error:", e));
      });
    }
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-[-10] overflow-hidden bg-black pointer-events-none">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        autoPlay
        className="absolute inset-0 w-full h-full object-cover opacity-60 scale-y-[-1]"
      />
      {/* Darker overlay to keep text readable */}
      <div className="absolute inset-0 bg-black/65 z-0" />
      {/* Top fade */}
      <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-black to-transparent z-[1]" />
    </div>
  );
};

export default GlobalVideoBackground;
