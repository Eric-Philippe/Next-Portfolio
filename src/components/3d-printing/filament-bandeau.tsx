"use client";

/**
 * FilamentBandeau Component
 * Decorative banner with animated filament spools
 */

import { motion } from "framer-motion";

// Filament color palette - industrial metals
const filamentColors = [
  { name: "Copper", color: "bg-amber-600", glow: "shadow-amber-600/30" },
  { name: "Bronze", color: "bg-orange-700", glow: "shadow-orange-700/30" },
  { name: "Steel", color: "bg-zinc-400", glow: "shadow-zinc-400/30" },
  { name: "Graphite", color: "bg-neutral-700", glow: "shadow-neutral-700/30" },
  { name: "Black", color: "bg-zinc-900", glow: "shadow-zinc-900/30" },
  { name: "Brushed", color: "bg-stone-400", glow: "shadow-stone-400/30" },
  { name: "Rust", color: "bg-orange-800", glow: "shadow-orange-800/30" },
  { name: "Titanium", color: "bg-slate-500", glow: "shadow-slate-500/30" },
];

// Duplicate multiple times for seamless loop
const duplicatedColors = [
  ...filamentColors,
  ...filamentColors,
  ...filamentColors,
  ...filamentColors,
];

// Spool dimensions: w-14 (56px) + gap-8 (32px) = 88px per spool
const spoolWidth = 88;
const animationDistance = spoolWidth * filamentColors.length;

export function FilamentBandeau() {
  return (
    <section className="relative overflow-hidden py-12">
      {/* Background */}
      <div className="absolute inset-0 bg-black" />

      {/* Subtle gradient accent */}
      <div className="absolute inset-0 bg-gradient-to-r from-amber-900/5 via-transparent to-orange-900/5" />

      {/* Animated filament spools container */}
      <div className="relative">
        {/* Fade edges for seamless look */}
        <div className="absolute top-0 bottom-0 left-0 z-10 w-32 bg-gradient-to-r from-black to-transparent" />
        <div className="absolute top-0 right-0 bottom-0 z-10 w-32 bg-gradient-to-l from-black to-transparent" />

        {/* Scrolling filament spools */}
        <motion.div
          animate={{ x: [0, -animationDistance] }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="flex gap-8 py-4"
        >
          {duplicatedColors.map((filament, index) => (
            <motion.div
              key={index}
              className="flex-shrink-0"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              {/* Spool representation */}
              <div className="group relative cursor-pointer">
                {/* Spool body */}
                <div
                  className={`h-14 w-14 rounded-full ${filament.color} shadow-lg ${filament.glow} transition-shadow duration-300 group-hover:shadow-xl`}
                >
                  {/* Inner ring - spool hole */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="h-5 w-5 rounded-full border-2 border-zinc-800/50 bg-zinc-950/80" />
                  </div>

                  {/* Highlight */}
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 via-transparent to-transparent" />
                </div>

                {/* Spool side ridges */}
                <div className="absolute top-1/2 -left-1 h-10 w-1 -translate-y-1/2 rounded-full bg-zinc-800 opacity-60" />
                <div className="absolute top-1/2 -right-1 h-10 w-1 -translate-y-1/2 rounded-full bg-zinc-800 opacity-60" />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Decorative line */}
      <div className="absolute right-0 bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </section>
  );
}
