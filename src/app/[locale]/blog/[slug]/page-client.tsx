"use client";

import { PortfolioProvider } from "~/lib/portfolio-context";
import { Header } from "~/components/common/header";
// import { useTranslations } from "next-intl";
import { useState, use } from "react";
import {
  FiArrowLeft,
  FiShare2,
  FiBookmark,
  FiClock,
  FiCalendar,
  FiTag,
  FiTwitter,
  FiLinkedin,
  FiLink,
} from "react-icons/fi";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MDXContent } from "~/components/blog/mdx-content";
import type { BlogPostWithContent } from "~/lib/mdx-utils";
import { ArticleContent } from "~/blog-posts/first-post";

interface Props {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
  post: BlogPostWithContent | null;
}

export default function BlogPostPageClient({ params, post }: Props) {
  const resolvedParams = use(params);
  // const t = useTranslations("BlogPage");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // If no post provided, show a fallback
  if (!post) {
    return (
      <PortfolioProvider>
        <Header firstColor="#3b82f6" secondColor="#8b5cf6" />
        <div className="flex min-h-screen items-center justify-center">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-slate-900">
              Post Not Found
            </h1>
            <p className="mb-8 text-slate-600">
              The blog post you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href={`/${resolvedParams.locale}/blog`}
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3 text-white transition-colors hover:bg-blue-700"
            >
              <FiArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </div>
        </div>
      </PortfolioProvider>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out this article: ${post.title}`;

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case "copy":
        void navigator.clipboard.writeText(shareUrl);
        setShareMenuOpen(false);
        return;
    }
    if (url) window.open(url, "_blank");
    setShareMenuOpen(false);
  };

  return (
    <PortfolioProvider>
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
              Back to Blog
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
            </h1>

            {/* Meta Info */}
            <div className="mb-8 flex flex-wrap items-center gap-6 text-slate-600">
              <div className="flex items-center gap-2">
                <FiCalendar className="h-4 w-4" />
                <span>{post.lastUpdated.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
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
                <motion.button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`rounded-lg p-2 transition-all duration-200 ${
                    isBookmarked
                      ? "bg-blue-100 text-blue-600"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiBookmark className="h-4 w-4" />
                </motion.button>

                <div className="relative">
                  <motion.button
                    onClick={() => setShareMenuOpen(!shareMenuOpen)}
                    className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-all duration-200 hover:bg-slate-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiShare2 className="h-4 w-4" />
                  </motion.button>

                  {shareMenuOpen && (
                    <motion.div
                      className="absolute top-12 right-0 z-20 rounded-xl border border-white/20 p-2 shadow-lg backdrop-blur-md"
                      style={{
                        background: "rgba(255, 255, 255, 0.9)",
                      }}
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex min-w-[120px] flex-col gap-1">
                        <button
                          onClick={() => handleShare("twitter")}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-100"
                        >
                          <FiTwitter className="h-4 w-4" />
                          Twitter
                        </button>
                        <button
                          onClick={() => handleShare("linkedin")}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-100"
                        >
                          <FiLinkedin className="h-4 w-4" />
                          LinkedIn
                        </button>
                        <button
                          onClick={() => handleShare("copy")}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-100"
                        >
                          <FiLink className="h-4 w-4" />
                          Copy Link
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.header>

          {/* Article Content */}
          <motion.div
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
              {post.content ? (
                <MDXContent content={post.content} />
              ) : (
                <ArticleContent />
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
              All Posts
            </Link>

            <div className="text-sm text-slate-600">Thanks for reading! 🚀</div>
          </motion.div>
        </div>

        {/* Click outside to close share menu */}
        {shareMenuOpen && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShareMenuOpen(false)}
          />
        )}
      </div>
    </PortfolioProvider>
  );
}
