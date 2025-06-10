"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { ParticlesDesign } from "../common/particles";
import { useTranslations } from "next-intl";
import { getMyAge } from "~/lib/utils/utils";

// Color palette from your original design
const DEV_COLOR_PALETTE = {
  first: "#9867f0",
  second: "#ed4e50",
  third: "#8a0101",
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
  closed: { opacity: 0, y: 20, transition: { duration: 0.2 } },
};

export default function DevHead() {
  const [isOpen, setIsOpen] = useState(false);
  const t = useTranslations("DevPortfolio");

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        {/* Animated circles similar to your original design */}
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
      <div className="relative z-20 flex items-center px-6 py-16 lg:py-20">
        <div className="mx-auto text-center">
          {/* DevPortfolio badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="relative mb-6 inline-flex items-center justify-center bg-transparent px-6 py-2"
          >
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
          </motion.div>

          {/* Main title */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mx-auto mt-6 max-w-4xl text-3xl leading-tight font-bold tracking-tight lg:text-6xl"
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
            className="mx-auto mt-6 max-w-3xl leading-normal font-light text-gray-600 lg:text-xl"
          >
            {t("about", {
              years: getMyAge(),
            })}
          </motion.div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-30 bg-white/90 backdrop-blur backdrop-filter lg:py-6">
        {/* Mobile Navigation */}
        <div className="px-4 lg:hidden">
          <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            className="relative"
          >
            <motion.button
              whileTap={{ scale: 0.97 }}
              onClick={() => setIsOpen(!isOpen)}
              className="flex w-full items-center justify-between rounded-lg border bg-white px-4 py-3 shadow-sm"
            >
              <span className="font-semibold">Réalisations</span>
              <motion.div
                variants={{
                  open: { rotate: 180 },
                  closed: { rotate: 0 },
                }}
                transition={{ duration: 0.2 }}
              >
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M0 7 L 20 7 L 10 16" />
                </svg>
              </motion.div>
            </motion.button>

            <motion.ul
              className="absolute top-full right-0 left-0 mt-2 rounded-lg bg-white p-4 font-semibold shadow-lg"
              variants={{
                open: {
                  clipPath: "inset(0% 0% 0% 0% round 10px)",
                  transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.7,
                    delayChildren: 0.3,
                    staggerChildren: 0.05,
                  },
                  display: "block",
                },
                closed: {
                  clipPath: "inset(10% 50% 90% 50% round 10px)",
                  transition: {
                    type: "spring",
                    bounce: 0,
                    duration: 0.3,
                  },
                  display: "none",
                },
              }}
              style={{
                pointerEvents: isOpen ? "auto" : "none",
              }}
            >
              <motion.li
                variants={itemVariants}
                className="cursor-pointer py-2 transition-colors hover:text-purple-600"
                onClick={() => {
                  setIsOpen(false);
                  scrollToSection("realisations");
                }}
              >
                Réalisations
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="cursor-pointer py-2 transition-colors hover:text-purple-600"
                onClick={() => {
                  setIsOpen(false);
                  scrollToSection("competences");
                }}
              >
                Mes compétences
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="cursor-pointer py-2 transition-colors hover:text-purple-600"
                onClick={() => {
                  setIsOpen(false);
                  scrollToSection("about");
                }}
              >
                Parcours
              </motion.li>
              <motion.li
                variants={itemVariants}
                className="cursor-pointer py-2 transition-colors hover:text-purple-600"
                onClick={() => {
                  setIsOpen(false);
                  scrollToSection("contact");
                }}
              >
                Contact
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
              Réalisations
            </a>
            <a
              className="inline-flex cursor-pointer text-gray-400 transition-all hover:text-gray-900"
              onClick={() => scrollToSection("competences")}
            >
              Mes compétences
            </a>
            <a
              className="inline-flex cursor-pointer text-gray-400 transition-all hover:text-gray-900"
              onClick={() => scrollToSection("about")}
            >
              Parcours
            </a>
            <a
              className="inline-flex cursor-pointer text-gray-400 transition-all hover:text-gray-900"
              onClick={() => scrollToSection("contact")}
            >
              Contact
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
}
