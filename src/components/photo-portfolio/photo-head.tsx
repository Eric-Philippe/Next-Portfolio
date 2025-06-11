"use client";

import { motion } from "framer-motion";

export default function PhotoHead() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black">
      {/* Camera-like grid overlay */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent" />
        {/* Grid lines like camera viewfinder */}
        <div className="absolute top-0 bottom-0 left-1/3 w-px bg-white/10" />
        <div className="absolute top-0 right-1/3 bottom-0 w-px bg-white/10" />
        <div className="absolute top-1/3 right-0 left-0 h-px bg-white/10" />
        <div className="absolute right-0 bottom-1/3 left-0 h-px bg-white/10" />
      </div>

      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center">
        <motion.h1
          className="mb-6 text-6xl font-light text-white md:text-8xl"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Photography
        </motion.h1>

        <motion.p
          className="mb-8 text-xl font-light text-gray-300 md:text-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Capturing moments through my lens
        </motion.p>

        <motion.div
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <button className="rounded-lg border border-white/20 bg-white/10 px-8 py-3 font-light text-white backdrop-blur-sm transition-all hover:bg-white/20">
            View Gallery
          </button>
          <button className="rounded-lg border border-gray-400 px-8 py-3 font-light text-gray-300 transition-colors hover:border-gray-300 hover:text-white">
            Developer Portfolio
          </button>
        </motion.div>
      </div>

      {/* Camera aperture-like decoration */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 transform"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <div className="relative h-12 w-12 rounded-full border-2 border-white/30">
          <div className="absolute inset-2 rounded-full border border-white/20" />
          <div className="absolute inset-4 rounded-full bg-white/10" />
        </div>
      </motion.div>
    </section>
  );
}
