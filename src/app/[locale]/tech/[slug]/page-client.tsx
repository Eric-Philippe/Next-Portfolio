"use client";

import { PortfolioProvider } from "~/lib/portfolio-context";
import { Header } from "~/components/common/header";
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
  FiExternalLink,
  FiGithub,
  FiMonitor,
  FiCode,
  FiImage,
} from "react-icons/fi";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { MDXContent } from "~/components/blog/mdx-content";
import type { TechPostWithContent } from "~/lib/tech-utils";
import { getTechColor } from "~/lib/utils/utils";

interface Props {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
  post: TechPostWithContent | null;
}

export default function TechPostPageClient({ params, post }: Props) {
  const resolvedParams = use(params);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"product" | "tech">(
    "product",
  );
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // If no post provided, show a fallback
  if (!post) {
    return (
      <PortfolioProvider>
        <Header firstColor="#9967ef" secondColor="#ed4f51" />
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-white">
              Project Not Found
            </h1>
            <p className="mb-8 text-slate-400">
              The project you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href={`/${resolvedParams.locale}/tech`}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
            >
              <FiArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </div>
        </div>
      </PortfolioProvider>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out this project: ${post.title}`;

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
        className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-gradient-to-r from-purple-500 to-pink-500"
        style={{ scaleX }}
      />

      <Header firstColor="#9967ef" secondColor="#ed4f51" />

      <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 text-white">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-[0.02]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(153, 103, 239, 0.4) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute h-96 w-96 rounded-full opacity-10 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #9967ef 0%, transparent 70%)",
              top: "20%",
              right: "10%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute h-64 w-64 rounded-full opacity-10 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #ed4f51 0%, transparent 70%)",
              bottom: "30%",
              left: "5%",
            }}
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.1, 0.05, 0.1],
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-6xl px-6 py-12">
          {/* Back Button */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href={`/${resolvedParams.locale}/tech`}
              className="inline-flex items-center gap-2 text-slate-400 transition-colors hover:text-white"
            >
              <FiArrowLeft className="h-4 w-4" />
              Back to Projects
            </Link>
          </motion.div>

          {/* Hero Section */}
          <motion.div
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Hero Image */}
            {post.heroImage && (
              <div className="mb-8 overflow-hidden rounded-3xl">
                <Image
                  src={post.heroImage}
                  alt={post.title}
                  width={1200}
                  height={600}
                  className="h-[400px] w-full object-cover transition-transform duration-700 hover:scale-105"
                  priority
                />
              </div>
            )}

            {/* Tags */}
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium backdrop-blur-md"
                  style={{
                    background: "rgba(153, 103, 239, 0.2)",
                    border: "1px solid rgba(153, 103, 239, 0.4)",
                    color: "#c084fc",
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
            <div className="mb-8 flex flex-wrap items-center gap-6 text-slate-400">
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
                <span>{post.readingTime} min read</span>
              </div>
            </div>

            {/* Project Links & Actions */}
            <motion.div
              className="flex items-center justify-between rounded-2xl border border-white/10 p-6 backdrop-blur-md"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
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
                  <h3 className="font-medium text-white">Éric Philippe</h3>
                  <p className="text-sm text-slate-400">
                    Full-Stack Developer & Designer
                  </p>
                </div>
              </div>

              {/* Project Links & Actions */}
              <div className="flex items-center gap-3">
                {post.liveUrl && (
                  <motion.a
                    href={post.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 p-2 text-white transition-all duration-200 hover:scale-105"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="View Live Project"
                  >
                    <FiExternalLink className="h-4 w-4" />
                  </motion.a>
                )}

                {post.githubUrl && (
                  <motion.a
                    href={post.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-lg bg-slate-700 p-2 text-white transition-all duration-200 hover:bg-slate-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    title="View on GitHub"
                  >
                    <FiGithub className="h-4 w-4" />
                  </motion.a>
                )}

                <motion.button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`rounded-lg p-2 transition-all duration-200 ${
                    isBookmarked
                      ? "bg-purple-600 text-white"
                      : "bg-slate-700 text-slate-300 hover:bg-slate-600"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiBookmark className="h-4 w-4" />
                </motion.button>

                <div className="relative">
                  <motion.button
                    onClick={() => setShareMenuOpen(!shareMenuOpen)}
                    className="rounded-lg bg-slate-700 p-2 text-slate-300 transition-all duration-200 hover:bg-slate-600"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiShare2 className="h-4 w-4" />
                  </motion.button>

                  {shareMenuOpen && (
                    <motion.div
                      className="absolute top-12 right-0 z-20 rounded-xl border border-white/10 p-2 shadow-lg backdrop-blur-md"
                      style={{
                        background: "rgba(0, 0, 0, 0.8)",
                      }}
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex min-w-[120px] flex-col gap-1">
                        <button
                          onClick={() => handleShare("twitter")}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/10"
                        >
                          <FiTwitter className="h-4 w-4" />
                          Twitter
                        </button>
                        <button
                          onClick={() => handleShare("linkedin")}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/10"
                        >
                          <FiLinkedin className="h-4 w-4" />
                          LinkedIn
                        </button>
                        <button
                          onClick={() => handleShare("copy")}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-white/10"
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
          </motion.div>

          {/* Navigation Tabs */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              className="flex rounded-2xl border border-white/10 p-2 backdrop-blur-md"
              style={{ background: "rgba(255, 255, 255, 0.05)" }}
            >
              <button
                onClick={() => setActiveSection("product")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium transition-all duration-300 ${
                  activeSection === "product"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <FiMonitor className="h-4 w-4" />
                Product Overview
              </button>
              <button
                onClick={() => setActiveSection("tech")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-6 py-3 font-medium transition-all duration-300 ${
                  activeSection === "tech"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <FiCode className="h-4 w-4" />
                Technical Details
              </button>
            </div>
          </motion.div>

          {/* Content Sections */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {activeSection === "product" && (
              <motion.div
                key="product"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Product Description */}
                <div
                  className="mb-8 rounded-3xl border border-white/10 p-8 backdrop-blur-md md:p-12"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="mb-6 flex items-center gap-3">
                    <FiMonitor className="h-6 w-6 text-purple-400" />
                    <h2 className="text-2xl font-semibold text-white">
                      What is this project?
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-slate-300">
                    <p className="text-lg leading-relaxed">
                      {post.productDescription}
                    </p>
                  </div>
                </div>

                {/* Gallery */}
                {post.gallery && post.gallery.length > 0 && (
                  <div
                    className="rounded-3xl border border-white/10 p-8 backdrop-blur-md md:p-12"
                    style={{
                      background: "rgba(255, 255, 255, 0.05)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <div className="mb-6 flex items-center gap-3">
                      <FiImage className="h-6 w-6 text-purple-400" />
                      <h2 className="text-2xl font-semibold text-white">
                        Project Gallery
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                      {post.gallery.map((image, index) => (
                        <motion.div
                          key={index}
                          className="cursor-pointer overflow-hidden rounded-xl border border-white/10 transition-transform duration-300 hover:scale-105"
                          onClick={() => setSelectedImage(image)}
                          whileHover={{ scale: 1.05 }}
                        >
                          <Image
                            src={image}
                            alt={`${post.title} screenshot ${index + 1}`}
                            width={400}
                            height={300}
                            className="h-48 w-full object-cover"
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {activeSection === "tech" && (
              <motion.div
                key="tech"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Technologies Used */}
                <div
                  className="mb-8 rounded-3xl border border-white/10 p-8 backdrop-blur-md md:p-12"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="mb-6 flex items-center gap-3">
                    <FiTag className="h-6 w-6 text-purple-400" />
                    <h2 className="text-2xl font-semibold text-white">
                      Technologies Used
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
                    {post.techs.map((tech, index) => (
                      <motion.div
                        key={tech}
                        className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                        style={{
                          borderColor: `${getTechColor(tech)}40`,
                          background: `linear-gradient(135deg, ${getTechColor(tech)}10, rgba(255, 255, 255, 0.05))`,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div
                          className="h-3 w-3 rounded-full"
                          style={{ backgroundColor: getTechColor(tech) }}
                        />
                        <span className="font-medium text-white">{tech}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* Technical Content */}
                <div
                  className="rounded-3xl border border-white/10 p-8 backdrop-blur-md md:p-12"
                  style={{
                    background: "rgba(255, 255, 255, 0.05)",
                    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                  }}
                >
                  <div className="mb-6 flex items-center gap-3">
                    <FiCode className="h-6 w-6 text-purple-400" />
                    <h2 className="text-2xl font-semibold text-white">
                      Technical Implementation
                    </h2>
                  </div>
                  {post.content ? (
                    <div className="prose prose-lg prose-invert max-w-none">
                      <MDXContent content={post.content} />
                    </div>
                  ) : (
                    <div className="prose prose-lg max-w-none text-slate-400">
                      <p className="text-center">
                        Technical documentation coming soon...
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="flex items-center justify-between border-t border-white/10 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              href={`/${resolvedParams.locale}/tech`}
              className="flex items-center gap-2 rounded-xl bg-slate-700 px-6 py-3 transition-colors hover:bg-slate-600"
            >
              <FiArrowLeft className="h-4 w-4" />
              All Projects
            </Link>

            <div className="text-sm text-slate-400">
              Thanks for checking out this project! 🚀
            </div>
          </motion.div>
        </div>

        {/* Image Modal */}
        {selectedImage && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              className="relative max-h-[90vh] max-w-[90vw]"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt="Project screenshot"
                width={1200}
                height={800}
                className="max-h-[90vh] max-w-[90vw] object-contain"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              >
                ✕
              </button>
            </motion.div>
          </motion.div>
        )}

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
