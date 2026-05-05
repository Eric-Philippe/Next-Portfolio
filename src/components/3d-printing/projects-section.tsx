"use client";

/**
 * ProjectsSection Component
 * Grid of 3D printing project cards
 * Uses masonry-style bento layout
 */

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { PrintingProjectCard } from "./project-card";
import type { PrintingPostWithContent } from "~/lib/printing-utils.types";

interface ProjectsSectionProps {
  projects: PrintingPostWithContent[];
  locale: string;
}

export function ProjectsSection({ projects, locale }: ProjectsSectionProps) {
  const t = useTranslations("printing");

  return (
    <section className="relative px-6 py-24">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/95 to-black" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 font-serif text-4xl font-light text-amber-50 md:text-5xl">
            {t("projects.title")}
          </h2>
          <p className="mx-auto max-w-2xl font-light text-stone-400">
            {t("projects.subtitle")}
          </p>
        </motion.div>

        {/* Projects grid - Bento style layout */}
        {projects.length > 0 ? (
          <div className="grid auto-rows-[minmax(200px,auto)] grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <PrintingProjectCard
                key={project.slug}
                project={project}
                locale={locale}
                index={index}
              />
            ))}
          </div>
        ) : (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-20 text-center"
          >
            <div className="mx-auto max-w-lg rounded-[2rem] border border-amber-900/20 bg-zinc-900/50 p-12 backdrop-blur-xl">
              <svg
                className="mx-auto mb-4 h-16 w-16 text-zinc-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
              <p className="font-light text-stone-400">{t("projects.empty")}</p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}
