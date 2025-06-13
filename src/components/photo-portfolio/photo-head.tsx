"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { Header } from "~/components/common/header";

const PHOTO_COLOR_PALETTE = {
  primary: "#ff6b6b", // Warm coral
  secondary: "#feca57", // Golden yellow
  accent: "#ff9ff3", // Soft pink
  dark: "#0f0f0f", // Almost black
  light: "#f8f9fa", // Off white
};

interface PhotoHeadProps {
  firstColor?: string;
  secondColor?: string;
}

export default function PhotoHead({
  firstColor = PHOTO_COLOR_PALETTE.primary,
  secondColor = PHOTO_COLOR_PALETTE.secondary,
}: PhotoHeadProps) {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const t = useTranslations("PhotoPortfolio");

  // Transform values for parallax effects
  const y = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -100]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {" "}
      {/* Floating header for photo portfolio */}
      <Header
        firstColor={firstColor}
        secondColor={secondColor}
        hideLogo={true}
        showTopBorder={false}
      />{" "}
      <motion.section
        ref={containerRef}
        className="relative flex min-h-screen items-center justify-center overflow-hidden"
        style={{ scale, opacity }}
      >
        {/* Subtle gradient overlay with parallax */}
        <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
          <div
            className="absolute inset-0 opacity-30"
            style={{
              background: `radial-gradient(circle at 20% 50%, ${firstColor}10 0%, transparent 50%), radial-gradient(circle at 80% 50%, ${secondColor}10 0%, transparent 50%)`,
            }}
          />
        </motion.div>

        {/* Minimal grid pattern */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: "50px 50px",
            }}
          />
        </div>

        {/* Camera grid overlay - Rule of thirds */}
        <div className="pointer-events-none absolute inset-0">
          {/* Vertical lines */}
          <div
            className="absolute h-full w-px opacity-40"
            style={{
              left: "33.333%",
              background: `linear-gradient(to bottom, transparent 0%, ${firstColor}40 20%, ${firstColor}60 50%, ${firstColor}40 80%, transparent 100%)`,
            }}
          />
          <div
            className="absolute h-full w-px opacity-10"
            style={{
              left: "66.666%",
              background: `linear-gradient(to bottom, transparent 0%, ${secondColor}40 20%, ${secondColor}60 50%, ${secondColor}40 80%, transparent 100%)`,
            }}
          />

          {/* Horizontal lines */}
          <div
            className="absolute h-px w-full opacity-30"
            style={{
              top: "33.333%",
              background: `linear-gradient(to right, transparent 0%, ${firstColor}40 20%, ${firstColor}60 50%, ${firstColor}40 80%, transparent 100%)`,
            }}
          />
          <div
            className="absolute h-px w-full opacity-10"
            style={{
              top: "66.666%",
              background: `linear-gradient(to right, transparent 0%, ${secondColor}40 20%, ${secondColor}60 50%, ${secondColor}40 80%, transparent 100%)`,
            }}
          />

          {/* Corner focus points */}
          <div
            className="absolute h-2 w-2 rounded-full border border-white/10"
            style={{
              left: "33.333%",
              top: "33.333%",
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${firstColor}20, transparent)`,
            }}
          />
          <div
            className="absolute h-2 w-2 rounded-full border border-white/10"
            style={{
              left: "66.666%",
              top: "33.333%",
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${secondColor}20, transparent)`,
            }}
          />
          <div
            className="absolute h-2 w-2 rounded-full border border-white/10"
            style={{
              left: "33.333%",
              top: "66.666%",
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${firstColor}20, transparent)`,
            }}
          />
          <div
            className="absolute h-2 w-2 rounded-full border border-white/10"
            style={{
              left: "66.666%",
              top: "66.666%",
              transform: "translate(-50%, -50%)",
              background: `radial-gradient(circle, ${secondColor}20, transparent)`,
            }}
          />
        </div>

        {/* Floating photography elements */}
        <motion.div
          className="absolute top-8 left-10 font-mono text-xs tracking-wider text-white/30"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1 }}
        >
          RAW
        </motion.div>

        <motion.div
          className="absolute top-8 right-10 font-mono text-xs tracking-wider text-white/30"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          f/1.8
        </motion.div>

        <motion.div
          className="absolute bottom-22 left-16 font-mono text-xs tracking-wider text-white/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.4 }}
        >
          ISO 400
        </motion.div>

        <motion.div
          className="absolute right-16 bottom-20 font-mono text-xs tracking-wider text-white/30"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.6 }}
        >
          24mm
        </motion.div>

        {/* Main content */}
        <motion.div
          className="relative z-10 mx-auto max-w-5xl px-6 text-center"
          style={{ y }}
        >
          {/* Portfolio badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mb-8 inline-flex items-center justify-center"
          >
            <div
              className="absolute inset-0 rounded-full backdrop-blur-sm"
              style={{
                background: `linear-gradient(135deg, ${firstColor}15, ${secondColor}15)`,
                border: `1px solid ${firstColor}20`,
              }}
            />
            <span
              className="relative z-10 px-6 py-2 text-sm font-light tracking-widest"
              style={{
                background: `linear-gradient(135deg, ${firstColor}, ${secondColor})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Photo Portfolio
            </span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            className="mb-8 font-light tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            style={{
              fontSize: "clamp(3rem, 8vw, 7rem)",
              lineHeight: "0.9",
            }}
          >
            <span className="block text-white/90">Éric</span>
            <span
              className="block"
              style={{
                background: `linear-gradient(135deg, ${firstColor}, ${secondColor})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              PHILIPPE
            </span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            className="mb-12 text-lg font-light tracking-wide text-white/70 md:text-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Capturing light, shadow & instant memories
          </motion.p>

          {/* Action buttons */}
          <motion.div
            className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <button
              onClick={() => scrollToSection("setup")}
              className="group relative overflow-hidden rounded-lg px-8 py-3 font-light tracking-wider transition-all duration-300"
              style={{
                background: `linear-gradient(135deg, ${firstColor}, ${secondColor})`,
              }}
            >
              <span className="relative z-10 text-white">
                {t("viewGallery")}
              </span>
              <div className="absolute inset-0 -translate-x-full transform bg-white/20 transition-transform duration-300 group-hover:translate-x-0" />
            </button>

            <button
              onClick={() => (window.location.href = "/tech")}
              className="rounded-lg border border-white/20 px-8 py-3 font-light tracking-wider text-white/80 backdrop-blur-sm transition-all duration-300 hover:border-white/40 hover:bg-white/10 hover:text-white"
            >
              {t("seeMore")}
            </button>
          </motion.div>

          {/* Photography specs bar */}
          <motion.div
            className="mt-16 flex items-center justify-center gap-8 font-mono text-xs tracking-wider text-white/40"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-white/40" />
              <span>CANON 800D</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-white/40" />
              <span>PRIME LENSES</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-1 w-1 rounded-full bg-white/40" />
              <span>NATURAL LIGHT</span>
            </div>
          </motion.div>
        </motion.div>

        {/* Minimalist scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
        >
          <motion.div
            className="flex flex-col items-center gap-2"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="h-6 w-px bg-gradient-to-b from-white/60 to-transparent" />
            <div
              className="h-2 w-2 rounded-full"
              style={{
                background: `linear-gradient(135deg, ${firstColor}, ${secondColor})`,
              }}
            />
          </motion.div>{" "}
        </motion.div>
      </motion.section>
    </>
  );
}
