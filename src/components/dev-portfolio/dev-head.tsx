"use client";

import { motion } from "framer-motion";
import { Suspense, useState, useRef, useCallback, useEffect } from "react";
import { ParticlesDesign } from "../common/particles";
import { useTranslations } from "next-intl";
import { getMyAge } from "~/lib/utils";
import type { Application } from "@splinetool/runtime";
import type { SplineEvent } from "@splinetool/runtime";
import { useSounds } from "~/hooks/use-sounds";
import React from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

const DEV_COLOR_PALETTE = {
  first: "#9867f0",
  second: "#ed4e50",
  third: "#8a0101",
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
  },
  closed: { opacity: 0, y: 20 },
};

export function DevHead() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("DevPortfolio");
  const splineRef = useRef<Application | null>(null);
  const currentHoveredKeyRef = useRef<string | null>(null);
  const { playPressSound, playReleaseSound } = useSounds();

  // Function to calculate responsive camera scale
  const getCameraScale = useCallback(() => {
    const width = window.innerWidth;

    if (width < 640) {
      return 4.5; // Small mobile (xs)
    } else if (width < 768) {
      return 4.0; // Mobile (sm)
    } else if (width < 1024) {
      return 3.2; // Tablet (md)
    } else if (width < 1280) {
      return 2.4; // Small desktop (lg)
    } else if (width < 1536) {
      return 2.0; // Desktop (xl)
    } else {
      return 1.8; // Large desktop (2xl+)
    }
  }, []);

  // Update camera scale dynamically on window resize
  useEffect(() => {
    const updateCameraScale = () => {
      const splineApp = splineRef.current;
      if (!splineApp) return;

      const camera = splineApp.findObjectByName("Camera");
      if (camera) {
        const scale = getCameraScale();
        camera.scale.x = scale;
        camera.scale.y = scale;
        camera.scale.z = scale;
      }
    };

    window.addEventListener("resize", updateCameraScale);
    return () => window.removeEventListener("resize", updateCameraScale);
  }, [getCameraScale]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleMouseHover = useCallback(
    (e: SplineEvent) => {
      const splineApp = splineRef.current;
      if (!splineApp) return;

      const targetName = e.target.name;

      // Check if this is a key (not the base/platform/keyboard body)
      const isKey =
        targetName &&
        targetName !== "body" &&
        targetName !== "platform" &&
        targetName !== "Keyboard" &&
        targetName !== "keyboard";

      // Only play sound when entering a NEW key (debounce)
      if (isKey && currentHoveredKeyRef.current !== targetName) {
        playPressSound();
        currentHoveredKeyRef.current = targetName;
      } else if (!isKey && currentHoveredKeyRef.current) {
        // Mouse left a key and is now on the base/platform
        playReleaseSound();
        currentHoveredKeyRef.current = null;
      }
    },
    [playPressSound, playReleaseSound],
  );

  const handleSplineInteractions = useCallback(() => {
    const splineApp = splineRef.current;
    if (!splineApp) return;

    const isInputFocused = () => {
      const activeElement = document.activeElement;
      return (
        activeElement &&
        (activeElement.tagName === "INPUT" ||
          activeElement.tagName === "TEXTAREA" ||
          (activeElement as HTMLElement).isContentEditable)
      );
    };

    splineApp.addEventListener("keyUp", () => {
      if (!splineApp || isInputFocused()) return;
      playReleaseSound();
    });

    splineApp.addEventListener("keyDown", (e: SplineEvent) => {
      if (!splineApp || isInputFocused()) return;
      if (
        e.target.name &&
        e.target.name !== "body" &&
        e.target.name !== "platform"
      ) {
        playPressSound();
      }
    });

    splineApp.addEventListener("mouseHover", handleMouseHover);
  }, [playPressSound, playReleaseSound, handleMouseHover]);

  const onSplineLoad = useCallback(
    (splineApp: Application) => {
      splineRef.current = splineApp;

      // Try to find the keyboard object and animate it
      const keyboard =
        splineApp.findObjectByName("Keyboard") ??
        splineApp.findObjectByName("keyboard") ??
        splineApp.getAllObjects()[0];

      if (keyboard) {
        const baseRotationY = keyboard.rotation.y;
        const amplitude = (30 * Math.PI) / 180; // 30 degrees in radians
        const duration = 8000; // 8 seconds for full cycle
        const startTime = Date.now();

        const animate = () => {
          const elapsed = Date.now() - startTime;
          const progress = (elapsed % duration) / duration;
          // Smooth sine wave oscillation
          const oscillation = Math.sin(progress * Math.PI * 2);
          keyboard.rotation.y = baseRotationY + oscillation * amplitude;

          requestAnimationFrame(animate);
        };

        animate();
      }

      // Zoom out the camera - responsive scaling based on viewport width
      const camera = splineApp.findObjectByName("Camera");
      if (camera) {
        const scale = getCameraScale();
        camera.scale.x = scale;
        camera.scale.y = scale;
        camera.scale.z = scale;
      }

      // Set up interactive event listeners
      handleSplineInteractions();
    },
    [handleSplineInteractions, getCameraScale],
  );

  return (
    <div className="relative">
      {/* Particles Background */}
      <ParticlesDesign
        color1={DEV_COLOR_PALETTE.first}
        color2={DEV_COLOR_PALETTE.second}
        className="opacity-80"
      />

      {/* Gradient Background with animated elements */}
      <div className="relative z-10">
        <motion.div
          className="absolute h-96 w-96 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${DEV_COLOR_PALETTE.first} 0%, transparent 70%)`,
            top: "-10%",
            left: "-10%",
          }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute h-80 w-80 rounded-full opacity-20"
          style={{
            background: `radial-gradient(circle, ${DEV_COLOR_PALETTE.second} 0%, transparent 70%)`,
            bottom: "0%",
            right: "0%",
          }}
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.2, 0.1, 0.2],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />
      </div>

      {/* Main hero content */}
      <div className="relative z-20 px-6 py-16 lg:py-20">
        {/* DevPortfolio badge - centered at top */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative mb-8 flex justify-center"
        >
          <div className="relative inline-flex items-center justify-center bg-transparent px-6 py-2">
            <div className="absolute inset-0 rounded-full border border-purple-500/30 bg-gradient-to-r from-purple-500/10 to-red-500/10 backdrop-blur-sm" />
            <span
              className="relative z-10 text-sm font-semibold lg:text-base"
              style={{
                background: `linear-gradient(to right, ${DEV_COLOR_PALETTE.first}, ${DEV_COLOR_PALETTE.second})`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              DevPortfolio
            </span>
          </div>
        </motion.div>

        {/* Main content: Title left, 3D model right */}
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Text content - left side */}
          <div className="flex-1 text-center lg:text-left">
            {/* Main title */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="max-w-4xl text-3xl leading-tight font-bold tracking-tight lg:text-6xl"
            >
              <span
                style={{
                  background: `linear-gradient(to right, ${DEV_COLOR_PALETTE.third}, #000000, #000000)`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Éric PHILIPPE - {t("title-1")}
              </span>{" "}
              <span
                style={{
                  background: `linear-gradient(to right, #000000, #000000, #000000, ${DEV_COLOR_PALETTE.third})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("title-2")}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mt-6 max-w-3xl leading-normal font-light text-gray-600 lg:text-xl"
            >
              {t("about", {
                years: getMyAge(),
              })}
            </motion.div>
          </div>

          {/* 3D Keyboard Model - right side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="relative flex-shrink-0"
          >
            <Suspense
              fallback={
                <div className="flex h-[300px] w-[400px] items-center justify-center lg:h-[450px] lg:w-[600px]">
                  <div className="h-8 w-8 animate-spin rounded-full border-2 border-purple-500 border-t-transparent" />
                </div>
              }
            >
              <div className="h-[350px] w-[400px] lg:h-[550px] lg:w-[700px]">
                <Spline scene="/spline/keyboard.spline" onLoad={onSplineLoad} />
              </div>
            </Suspense>
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-30 bg-white/90 pb-4 backdrop-blur backdrop-filter lg:py-6">
        {/* Mobile Navigation */}
        <div className="px-4 pt-4 lg:hidden">
          <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="relative mb-6"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              whileHover={{ scale: 1.02 }}
              onClick={() => setIsOpen(!isOpen)}
              className="relative flex w-full items-center justify-between overflow-hidden rounded-xl bg-white/80 px-5 py-4 backdrop-blur-sm"
              style={{
                background: `linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.7) 100%)`,
                border: `1px solid rgba(152, 103, 240, 0.15)`,
                boxShadow: `0 4px 20px rgba(152, 103, 240, 0.1), 0 1px 4px rgba(0, 0, 0, 0.05)`,
              }}
            >
              {/* Subtle animated glow */}
              <motion.div
                className="absolute inset-0 rounded-xl opacity-0"
                style={{
                  background: `linear-gradient(135deg, rgba(152, 103, 240, 0.03) 0%, rgba(237, 78, 80, 0.03) 100%)`,
                }}
                animate={{
                  opacity: isOpen ? 0.8 : 0,
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              />

              <span
                className="relative z-10 font-semibold text-gray-700"
                style={{
                  background: `linear-gradient(to right, ${DEV_COLOR_PALETTE.first}, ${DEV_COLOR_PALETTE.second})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {t("navigation")}
              </span>

              <motion.div
                className="relative z-10"
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 20 20"
                  style={{ fill: DEV_COLOR_PALETTE.first }}
                >
                  <path d="M0 7 L 20 7 L 10 16" />
                </svg>
              </motion.div>
            </motion.button>

            <motion.ul
              className="absolute top-full right-0 left-0 mt-3 overflow-hidden rounded-xl bg-white/95 backdrop-blur-md"
              style={{
                border: `1px solid rgba(152, 103, 240, 0.12)`,
                boxShadow: `0 8px 32px rgba(152, 103, 240, 0.15), 0 4px 12px rgba(0, 0, 0, 0.1)`,
                pointerEvents: isOpen ? "auto" : "none",
              }}
              variants={{
                open: {
                  opacity: 1,
                  scale: 1,
                  y: 0,
                  transition: {
                    type: "spring",
                    bounce: 0.2,
                    duration: 0.6,
                    delayChildren: 0.2,
                    staggerChildren: 0.1,
                  },
                },
                closed: {
                  opacity: 0,
                  scale: 0.95,
                  y: -10,
                  transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.3,
                  },
                },
              }}
            >
              {/* Very subtle background pattern */}
              <div
                className="absolute inset-0 opacity-[0.02]"
                style={{
                  background: `radial-gradient(circle at 30% 20%, ${DEV_COLOR_PALETTE.first} 0%, transparent 50%), 
                               radial-gradient(circle at 70% 80%, ${DEV_COLOR_PALETTE.second} 0%, transparent 50%)`,
                }}
              />

              <motion.li
                variants={itemVariants}
                className="hover:from-purple-25 hover:to-red-25 relative cursor-pointer border-b border-gray-50 px-5 py-4 font-medium text-gray-600 transition-all duration-300 hover:bg-gradient-to-r"
                whileHover={{
                  x: 4,
                  transition: { duration: 0.2 },
                }}
                onClick={() => {
                  setIsOpen(false);
                  scrollToSection("realisations");
                }}
              >
                <span className="transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-red-500 hover:bg-clip-text hover:text-transparent">
                  {t("realisations")}
                </span>
                {/* Subtle hover indicator */}
                <motion.div
                  className="absolute top-1/2 left-0 h-1 w-1 rounded-full opacity-0"
                  style={{
                    background: DEV_COLOR_PALETTE.first,
                    transform: "translateY(-50%)",
                  }}
                  whileHover={{ opacity: 1, scale: 1.5 }}
                />
              </motion.li>

              <motion.li
                variants={itemVariants}
                className="hover:from-purple-25 hover:to-red-25 relative cursor-pointer border-b border-gray-50 px-5 py-4 font-medium text-gray-600 transition-all duration-300 hover:bg-gradient-to-r"
                whileHover={{
                  x: 4,
                  transition: { duration: 0.2 },
                }}
                onClick={() => {
                  setIsOpen(false);
                  scrollToSection("competences");
                }}
              >
                <span className="transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-red-500 hover:bg-clip-text hover:text-transparent">
                  {t("skills")}
                </span>
                <motion.div
                  className="absolute top-1/2 left-0 h-1 w-1 rounded-full opacity-0"
                  style={{
                    background: DEV_COLOR_PALETTE.first,
                    transform: "translateY(-50%)",
                  }}
                  whileHover={{ opacity: 1, scale: 1.5 }}
                />
              </motion.li>

              <motion.li
                variants={itemVariants}
                className="hover:from-purple-25 hover:to-red-25 relative cursor-pointer border-b border-gray-50 px-5 py-4 font-medium text-gray-600 transition-all duration-300 hover:bg-gradient-to-r"
                whileHover={{
                  x: 4,
                  transition: { duration: 0.2 },
                }}
                onClick={() => {
                  setIsOpen(false);
                  scrollToSection("about");
                }}
              >
                <span className="transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-red-500 hover:bg-clip-text hover:text-transparent">
                  {t("aboutMe")}
                </span>
                <motion.div
                  className="absolute top-1/2 left-0 h-1 w-1 rounded-full opacity-0"
                  style={{
                    background: DEV_COLOR_PALETTE.first,
                    transform: "translateY(-50%)",
                  }}
                  whileHover={{ opacity: 1, scale: 1.5 }}
                />
              </motion.li>

              <motion.li
                variants={itemVariants}
                className="hover:from-purple-25 hover:to-red-25 relative cursor-pointer px-5 py-4 font-medium text-gray-600 transition-all duration-300 hover:bg-gradient-to-r"
                whileHover={{
                  x: 4,
                  transition: { duration: 0.2 },
                }}
                onClick={() => {
                  setIsOpen(false);
                  scrollToSection("contact");
                }}
              >
                <span className="transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-red-500 hover:bg-clip-text hover:text-transparent">
                  {t("contact")}
                </span>
                <motion.div
                  className="absolute top-1/2 left-0 h-1 w-1 rounded-full opacity-0"
                  style={{
                    background: DEV_COLOR_PALETTE.first,
                    transform: "translateY(-50%)",
                  }}
                  whileHover={{ opacity: 1, scale: 1.5 }}
                />
              </motion.li>
            </motion.ul>
          </motion.nav>
        </div>

        {/* Desktop Navigation */}
        <div className="container mx-auto hidden px-4 lg:block">
          <nav className="flex items-center justify-center space-x-12 text-sm font-medium tracking-widest uppercase">
            <a
              className="inline-flex cursor-pointer font-medium text-gray-900 transition-all hover:text-purple-600"
              onClick={() => scrollToSection("realisations")}
            >
              {t("realisations")}
            </a>
            <a
              className="inline-flex cursor-pointer text-gray-400 transition-all hover:text-gray-900"
              onClick={() => scrollToSection("competences")}
            >
              {t("skills")}
            </a>
            <a
              className="inline-flex cursor-pointer text-gray-400 transition-all hover:text-gray-900"
              onClick={() => scrollToSection("about")}
            >
              {t("aboutMe")}
            </a>
            <a
              className="inline-flex cursor-pointer text-gray-400 transition-all hover:text-gray-900"
              onClick={() => scrollToSection("contact")}
            >
              {t("contact")}
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
