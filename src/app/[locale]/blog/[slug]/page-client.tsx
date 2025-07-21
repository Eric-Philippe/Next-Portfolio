"use client";

import { Header } from "~/components/common/header";
import { useState, use, useEffect, useRef } from "react";
import {
  FiArrowLeft,
  FiClock,
  FiCalendar,
  FiTag,
  FiArrowUp,
} from "react-icons/fi";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MDXContent } from "~/components/blog/mdx-content";
import type { BlogPostWithContent } from "~/lib/blog-utils";
import BookmarkButton from "~/components/common/bookmarkButton";
import ShareButton from "~/components/common/shareButton";
import { useTranslations } from "next-intl";
import Footer from "~/components/common/footer";
import URLS from "~/content/URLs";

interface Props {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
  post: BlogPostWithContent | null;
}

export default function BlogPostPageClient({ params, post }: Props) {
  const resolvedParams = use(params);
  const t = useTranslations("BlogPage");
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const contentRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Handle scroll behavior for scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const contentElement = contentRef.current;

      if (contentElement) {
        const contentTop = contentElement.offsetTop;
        const isInContent = currentScrollY >= contentTop - 100; // Show when approaching content

        // Determine scroll direction
        const scrollingUp = currentScrollY < lastScrollY;

        // Show button only when in content area AND scrolling up
        setShowScrollTop(isInContent && scrollingUp);

        setLastScrollY(currentScrollY);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // If no post provided, show a fallback
  if (!post) {
    return (
      <div>
        <Header firstColor="#3b82f6" secondColor="#8b5cf6" />
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-slate-900">
              {t("postNotFound")}
            </h1>
            <p className="mb-8 text-slate-600">{t("noPostDescription")}</p>
            <Link
              href={`/${resolvedParams.locale}/blog`}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              <FiArrowLeft className="h-4 w-4" />
              {t("backToBlog")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-gradient-to-r from-blue-500 to-purple-500"
        style={{ scaleX }}
      />

      <Header firstColor="#3b82f6" secondColor="#8b5cf6" />

      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 text-slate-900">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute h-96 w-96 rounded-full opacity-10 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
              top: "20%",
              right: "10%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-12">
          {/* Back Button */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href={`/${resolvedParams.locale}/blog`}
              className="inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
            >
              <FiArrowLeft className="h-4 w-4" />
              {t("backToBlog")}
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Tags */}
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium backdrop-blur-md"
                  style={{
                    background: "rgba(59, 130, 246, 0.1)",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    color: "#3b82f6",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <FiTag className="h-3 w-3" />
                  {tag}
                </motion.span>
              ))}
            </div>
            {/* Title */}
            <h1 className="mb-6 text-4xl leading-tight font-light tracking-tight md:text-5xl lg:text-6xl">
              {post.title}
            </h1>{" "}
            {/* Meta Info */}
            <div className="mb-8 flex flex-wrap items-center gap-6 text-slate-600">
              <div className="flex items-center gap-2">
                <FiCalendar className="h-4 w-4" />
                <span>
                  {post.lastUpdated.toLocaleDateString(
                    resolvedParams.locale === "fr" ? "fr-FR" : "en-US",
                    {
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                    },
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="h-4 w-4" />
                <span>{t("minutesRead", { count: post.readingTime })}</span>
              </div>
            </div>
            {/* Author Info */}
            <motion.div
              className="flex items-center justify-between rounded-2xl border border-white/20 p-6 backdrop-blur-md"
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src="https://avatars.githubusercontent.com/u/66321178?v=4"
                    alt="Éric Philippe"
                    className="h-12 w-12 rounded-full object-cover"
                    width={48}
                    height={48}
                  />
                  <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">Éric Philippe</h3>
                  <p className="text-sm text-slate-600">
                    Full-Stack Developer & Designer
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <BookmarkButton slug={post.slug} domain="blog" />

                <ShareButton
                  link={`${URLS.WEBSITE}/${resolvedParams.locale}/blog/${post.slug}`}
                  title={post.title}
                  darkMode={false}
                />
              </div>
            </motion.div>
          </motion.header>

          {/* Article Content */}
          <motion.div
            ref={contentRef}
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              className="rounded-3xl border border-white/20 p-8 backdrop-blur-md md:p-12"
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
              }}
            >
              {" "}
              {post.content ? (
                <MDXContent content={post.content} />
              ) : (
                <div className="prose prose-lg max-w-none text-slate-600">
                  <p className="text-center">Loading content...</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="flex items-center justify-between border-t border-slate-200 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href={`/${resolvedParams.locale}/blog`}
              className="flex items-center gap-2 rounded-xl bg-slate-100 px-6 py-3 transition-colors hover:bg-slate-200"
            >
              <FiArrowLeft className="h-4 w-4" />
              {t("allPosts")}
            </Link>

            <div className="text-sm text-slate-600">
              {t("thanksForReading")}
            </div>
          </motion.div>
        </div>

        {/* Click outside to close share menu */}
        {shareMenuOpen && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShareMenuOpen(false)}
          />
        )}

        {/* Scroll to Top Button */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.button
              onClick={scrollToTop}
              className="fixed right-6 bottom-6 z-50 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 backdrop-blur-md transition-all hover:scale-110 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none md:right-8 md:bottom-8"
              style={{
                background: "rgba(255, 255, 255, 0.9)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
              initial={{
                opacity: 0,
                scale: 0.8,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
                transition: {
                  duration: 0.3,
                  ease: "easeOut",
                },
              }}
              exit={{
                opacity: 0,
                scale: 0.8,
                y: 20,
                transition: {
                  duration: 0.2,
                },
              }}
              whileHover={{
                scale: 1.1,
                boxShadow: "0 12px 40px rgba(0, 0, 0, 0.15)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              <FiArrowUp className="h-5 w-5 text-slate-700" />
            </motion.button>
          )}
        </AnimatePresence>
      </div>

      <Footer theme="light" />
    </div>
  );
}
