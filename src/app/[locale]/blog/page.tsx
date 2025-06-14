"use client";

import { PortfolioProvider } from "~/lib/portfolio-context";
import { Header } from "~/components/common/header";
import { BlogPostCard } from "~/components/blog/blog-post-card";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { FiSearch, FiEdit3 } from "react-icons/fi";
import { motion } from "framer-motion";
import Image from "next/image";
import { placeholderPosts } from "~/lib/data/blog";

export default function BlogPage() {
  const t = useTranslations("BlogPage");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPosts = placeholderPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <PortfolioProvider>
      <Header firstColor="#3b82f6" secondColor="#8b5cf6" />

      {/* Main Container */}
      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 text-slate-900">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Floating gradient orbs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute h-96 w-96 rounded-full opacity-20 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
              top: "10%",
              left: "10%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.3, 0.1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute h-80 w-80 rounded-full opacity-15 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
              bottom: "20%",
              right: "15%",
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 py-20">
          {/* Hero Section */}
          <motion.div
            className="mb-20 text-center"
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Profile Picture */}
            <motion.div
              className="mb-8 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <div className="relative">
                {/* Glow effect */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/30 to-purple-500/30 blur-xl" />

                {/* Profile image container */}
                <div
                  className="relative h-24 w-24 overflow-hidden rounded-full border border-white/30 backdrop-blur-md"
                  style={{
                    background: "rgba(255, 255, 255, 0.1)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <Image
                    src="https://avatars.githubusercontent.com/u/66321178?v=4"
                    alt="Éric Philippe"
                    className="h-full w-full object-cover"
                    width={96}
                    height={96}
                  />

                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent" />
                </div>

                {/* Floating indicator */}
                <motion.div
                  className="absolute -right-1 -bottom-1 h-6 w-6 rounded-full border-2 border-white bg-green-500"
                  animate={{
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              </div>
            </motion.div>

            {/* Blog Badge */}
            <motion.div
              className="mb-8 inline-flex items-center gap-2 rounded-full px-4 py-2 backdrop-blur-md"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.4))",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <FiEdit3 className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-slate-700">
                Personal Blog
              </span>
            </motion.div>

            {/* Main Title */}
            <motion.h1
              className="mb-6 text-6xl leading-[0.95] font-light tracking-tight md:text-7xl lg:text-8xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <span className="mb-3 block text-slate-900">
                {t("titleFirstPart")}
              </span>
              <span
                className="block bg-clip-text pb-1 text-transparent"
                style={{
                  background: "linear-gradient(135deg, #3b82f6, #8b5cf6)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {t("titleSecondPart")}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              className="mx-auto max-w-2xl text-xl leading-relaxed font-light text-slate-600"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              {t("subtitleFirstPart")}
              <span className="font-medium text-blue-600">
                {" "}
                {t("subtitleSecondPart")}
              </span>
            </motion.p>
          </motion.div>

          {/* Search Section */}
          <motion.div
            className="mb-16 flex justify-center"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <div className="relative w-full max-w-xl">
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/20 to-purple-500/20 blur-xl" />
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("searchPlaceholder")}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full rounded-2xl px-6 py-4 pl-14 text-slate-900 placeholder-slate-500 backdrop-blur-md transition-all duration-300 focus:ring-2 focus:ring-blue-500/50 focus:outline-none"
                  style={{
                    background: "rgba(255, 255, 255, 0.8)",
                    border: "1px solid rgba(255, 255, 255, 0.3)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08)",
                  }}
                />
                <FiSearch className="absolute top-1/2 left-5 h-5 w-5 -translate-y-1/2 transform text-slate-400" />
              </div>
            </div>
          </motion.div>

          {/* Posts Grid */}
          {filteredPosts.length > 0 ? (
            <motion.div
              className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredPosts.map((post, _) => (
                <motion.div key={post.slug} variants={itemVariants}>
                  <BlogPostCard post={post} />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              className="py-20 text-center"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div
                className="inline-block rounded-3xl p-12 backdrop-blur-md"
                style={{
                  background: "rgba(255, 255, 255, 0.6)",
                  border: "1px solid rgba(255, 255, 255, 0.3)",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
                }}
              >
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-slate-100">
                  <FiSearch className="h-8 w-8 text-slate-400" />
                </div>
                <h3 className="mb-2 text-2xl font-light text-slate-900">
                  No articles found
                </h3>
                <p className="text-slate-600">
                  Try adjusting your search terms
                </p>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </PortfolioProvider>
  );
}
