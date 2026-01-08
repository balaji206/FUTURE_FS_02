"use client";
import React, { useRef, useEffect } from "react";
import { useScroll, useSpring, useTransform, motion } from "framer-motion";

const ScrollVideoSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // No-lag spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 60,
    mass: 0.1,
    restDelta: 0.0001
  });

  useEffect(() => {
    let requestID: number;
    const updateVideoFrame = () => {
      const video = videoRef.current;
      if (video && video.readyState >= 2) {
        const duration = video.duration;
        const targetTime = duration * smoothProgress.get();
        if (Math.abs(video.currentTime - targetTime) > 0.008) {
          video.currentTime = targetTime;
        }
      }
      requestID = requestAnimationFrame(updateVideoFrame);
    };
    requestID = requestAnimationFrame(updateVideoFrame);
    return () => cancelAnimationFrame(requestID);
  }, [smoothProgress]);

  return (
    <section ref={containerRef} className="h-[500vh] relative bg-[#c2c2c2]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        
        {/* BOTTOM SHADE ONLY: Blends Platinum video into the dark grid below */}
        <div className="absolute bottom-0 left-0 w-full h-[20vh] bg-gradient-to-t from-[#050505] to-transparent z-10" />

        <video
          ref={videoRef}
          src="/shoe video.mp4" 
          muted playsInline preload="auto"
          className="w-full h-full object-cover pointer-events-none"
          style={{ willChange: "transform", transform: "translateZ(0)" }} 
        />
        
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center pointer-events-none px-6">
           <motion.h2 
            style={{ 
                opacity: useTransform(smoothProgress, [0.05, 0.2, 0.35], [0, 1, 0]),
                scale: useTransform(smoothProgress, [0.05, 0.2], [0.8, 1])
            }}
            className="text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter text-[#CCFF00]"
           >
             Precision.
           </motion.h2>
           <motion.h2 
            style={{ 
                opacity: useTransform(smoothProgress, [0.6, 0.8, 0.95], [0, 1, 0]),
                y: useTransform(smoothProgress, [0.6, 0.8], [50, 0])
            }}
            className="text-6xl md:text-[10vw] font-black italic uppercase tracking-tighter text-white"
           >
             Movement.
           </motion.h2>
        </div>
      </div>
    </section>
  );
};

export default ScrollVideoSection;