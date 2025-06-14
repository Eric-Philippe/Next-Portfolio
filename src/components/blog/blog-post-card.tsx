"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { FiCalendar, FiClock, FiArrowUpRight, FiGlobe } from "react-icons/fi";
import type { BlogPost } from "~/types/portfolio";

export function BlogPostCard({ post }: { post: BlogPost }) {
  const t = useTranslations("BlogPage");

  return (
    <motion.div
      className="group relative h-full"
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Card background with glassmorphism */}
      <div className="absolute inset-0 rounded-3xl border border-white/20 bg-gradient-to-br from-white/60 to-white/30 shadow-xl backdrop-blur-md transition-all duration-500 group-hover:border-white/40 group-hover:shadow-2xl" />

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Content */}
      <div className="relative flex h-full flex-col p-8">
        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.slice(0, 3).map((tag, index) => (
            <span
              key={tag}
              className="rounded-full px-3 py-1 text-xs font-medium transition-all duration-300"
              style={{
                background:
                  index === 0
                    ? "linear-gradient(135deg, rgba(59, 130, 246, 0.15), rgba(59, 130, 246, 0.1))"
                    : "linear-gradient(135deg, rgba(139, 92, 246, 0.15), rgba(139, 92, 246, 0.1))",
                color: index === 0 ? "#3b82f6" : "#8b5cf6",
                border: `1px solid ${index === 0 ? "rgba(59, 130, 246, 0.2)" : "rgba(139, 92, 246, 0.2)"}`,
              }}
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="rounded-full border border-slate-200/50 bg-slate-100/50 px-3 py-1 text-xs font-medium text-slate-500">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="mb-3 line-clamp-2 text-xl font-semibold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
          {post.title}
        </h3>

        {/* Description */}
        <p className="mb-6 line-clamp-3 flex-grow text-sm leading-relaxed text-slate-600">
          {post.description}
        </p>

        {/* Meta info */}
        <div className="mb-6 space-y-2 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <FiCalendar className="h-3 w-3 text-blue-500" />
            <span>
              {t("lastUpdated", {
                date: post.lastUpdated.toLocaleDateString(),
              })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <FiClock className="h-3 w-3 text-purple-500" />
            <span>{t("minutesRead", { count: post.readingTime })}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between border-t border-slate-200/50 pt-4">
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 transition-colors duration-200 hover:text-blue-700"
          >
            {t("readMore")}
            <FiArrowUpRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>

          <div className="flex items-center gap-3">
            <FiGlobe className="h-4 w-4 text-slate-400" />
            <div className="flex gap-1">
              {post.en_url && (
                <Link
                  href={post.en_url}
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100/70 text-sm transition-all duration-200 hover:scale-110 hover:bg-slate-200/70"
                  title="Available in English"
                >
                  🇺🇸
                </Link>
              )}
              {post.fr_url && (
                <Link
                  href={post.fr_url}
                  className="flex h-7 w-7 items-center justify-center rounded-md bg-slate-100/70 text-sm transition-all duration-200 hover:scale-110 hover:bg-slate-200/70"
                  title="Available in French"
                >
                  🇫🇷
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle shimmer effect on hover */}
      <div className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        <div className="absolute inset-0 -translate-x-full -skew-x-12 transform rounded-3xl bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full" />
      </div>
    </motion.div>
  );
}
