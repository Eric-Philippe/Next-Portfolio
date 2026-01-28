"use client";

/**
 * PrintingProjectCard Component
 */
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { PrintingPostWithContent } from "~/lib/printing-utils";

interface PrintingProjectCardProps {
  project: PrintingPostWithContent;
  locale: string;
  index?: number;
}

export function PrintingProjectCard({
  project,
  locale,
  index = 0,
}: PrintingProjectCardProps) {
  // Determine card size variation for visual interest
  const isLarge = index % 5 === 0;
  const isMedium = index % 5 === 1 || index % 5 === 3;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className={`group ${isLarge ? "md:col-span-2 md:row-span-2" : isMedium ? "md:row-span-2" : ""}`}
    >
      <Link href={`/${locale}/3dprinting/${project.slug}`}>
        <article className="relative h-full overflow-hidden rounded-[2rem] border border-amber-900/20 bg-zinc-900/50 backdrop-blur-xl transition-all duration-500 hover:border-amber-700/30 hover:bg-zinc-800/50 hover:shadow-2xl hover:shadow-amber-900/10 dark:bg-zinc-900/50">
          {/* Inner glow on hover */}
          <div className="pointer-events-none absolute inset-0 rounded-[2rem] bg-gradient-to-br from-amber-600/10 via-transparent to-orange-900/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

          {/* Image container */}
          <div className="relative aspect-[4/3] overflow-hidden">
            {/* Placeholder for hero image */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-800 to-zinc-900">
              {project.heroImage ? (
                <Image
                  src={project.heroImage}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-zinc-600">
                  <svg
                    className="h-16 w-16"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              )}
            </div>

            {/* Gradient overlay for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-zinc-950/20 to-transparent" />

            {/* Printer badge */}
            <div className="absolute top-4 right-4">
              <span className="rounded-full border border-amber-900/20 bg-zinc-900/60 px-3 py-1 text-xs font-light text-amber-100/80 backdrop-blur-md">
                {project.printer}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="relative p-6">
            {/* Date */}
            <time className="text-xs font-light tracking-wide text-stone-500 uppercase">
              {new Date(project.date).toLocaleDateString(locale, {
                year: "numeric",
                month: "long",
              })}
            </time>

            {/* Title */}
            <h3 className="mt-2 line-clamp-2 font-serif text-xl text-amber-50 transition-colors group-hover:text-white">
              {project.title}
            </h3>

            {/* Description */}
            <p className="mt-2 line-clamp-2 text-sm font-light text-stone-400">
              {project.description}
            </p>

            {/* Materials */}
            <div className="mt-4 flex flex-wrap gap-2">
              {project.materials.slice(0, 3).map((material, i) => (
                <span
                  key={i}
                  className="rounded-full bg-neutral-800/50 px-2 py-1 text-xs text-stone-300/70"
                >
                  {material}
                </span>
              ))}
            </div>

            {/* View project indicator */}
            <div className="mt-4 flex items-center gap-2 text-sm font-light text-amber-500/70 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
              <span>View project</span>
              <svg
                className="h-4 w-4 transform transition-transform group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </div>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}
