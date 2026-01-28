"use client";

/**
 * MakerworldSection Component
 * CTA section linking to Makerworld profile
 */

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { MAKERWORLD_PROFILE_URL } from "~/content/3dprinting-content";

export function MakerworldSection() {
  const t = useTranslations("printing");

  return (
    <section className="relative px-6 py-20">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900 to-black" />

      {/* Subtle accent glow */}
      <div className="absolute top-1/2 left-1/2 h-[300px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-600/5 blur-3xl" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          {/* Card */}
          <div className="relative overflow-hidden rounded-[2.5rem] border border-amber-900/20 bg-zinc-900/50 p-12 text-center backdrop-blur-xl">
            {/* Inner gradient glow */}
            <div className="pointer-events-none absolute inset-0 rounded-[2.5rem] bg-gradient-to-br from-amber-600/10 via-transparent to-orange-900/5" />

            {/* Content */}
            <div className="relative z-10">
              {/* Icon */}
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full border border-amber-800/30 bg-gradient-to-br from-amber-600/20 to-orange-700/20">
                <Image
                  src="/images/3dprinting/makerworld.png"
                  alt="Makerworld Logo"
                  width={32}
                  height={32}
                />
              </div>

              {/* Title */}
              <h2 className="mb-4 font-serif text-3xl font-light text-amber-50 md:text-4xl">
                {t("makerworld.title")}
              </h2>

              {/* Description */}
              <p className="mx-auto mb-8 max-w-xl font-light text-stone-400">
                {t("makerworld.description")}
              </p>

              {/* CTA Button */}
              <motion.a
                href={MAKERWORLD_PROFILE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full border border-amber-700/30 bg-gradient-to-r from-amber-600/20 to-orange-700/20 px-8 py-4 font-light text-amber-50 transition-all duration-300 hover:border-amber-600/40 hover:from-amber-600/30 hover:to-orange-700/30"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span>{t("makerworld.cta")}</span>
                <svg
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
