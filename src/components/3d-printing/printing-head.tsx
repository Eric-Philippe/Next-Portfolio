"use client";

/**
 * PrintingHead Component
 * Hero/introduction section for the 3D Printing portfolio
 */

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";

export function PrintingHead() {
  const t = useTranslations("printing");
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0 },
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden py-20">
      {/* Background timelapse video */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        preload="none"
        poster="/images/3dprinting/timelapse-poster.png"
        className="absolute inset-0 h-full w-full object-cover"
      >
        {isVisible && (
          <>
            <source src="/videos/3dprinting/timelapse.mp4" type="video/mp4" />
          </>
        )}
      </video>

      {/* Overlay for content readability */}
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/30 via-transparent to-slate-950/20" />

      {/* Content container */}
      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* Glassmorphism card - highly rounded, no sharp rectangle corners */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative"
        >
          {/* Glass container with organic shape feel */}
          <div className="light:bg-black/5 relative rounded-[3rem] border border-white/10 bg-white/5 p-12 shadow-2xl backdrop-blur-xl dark:bg-white/5">
            {/* Inner glow effect */}
            <div className="pointer-events-none absolute inset-0 rounded-[3rem] bg-gradient-to-br from-white/10 via-transparent to-transparent" />

            {/* Title with elegant serif typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative mb-6 font-serif text-5xl font-light tracking-tight text-white/90 md:text-7xl"
            >
              {t("title")}
            </motion.h1>

            {/* Subtitle with clean sans-serif */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="relative mx-auto max-w-2xl text-lg leading-relaxed font-light text-slate-300/80 md:text-xl"
            >
              {t("subtitle")}
            </motion.p>

            {/* Decorative thin line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mx-auto mt-8 h-px w-24 bg-gradient-to-r from-transparent via-amber-400/50 to-transparent"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
