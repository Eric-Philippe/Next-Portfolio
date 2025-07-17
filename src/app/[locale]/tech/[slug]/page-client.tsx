"use client";

import { Header } from "~/components/common/header";
import { useState, use } from "react";
import {
  FiArrowLeft,
  FiClock,
  FiCalendar,
  FiTag,
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
import { useTranslations } from "next-intl";
import BookmarkButton from "~/components/common/bookmarkButton";
import ShareButton from "~/components/common/shareButton";
import { getGithubDevContentUrl, getTechColor } from "~/content/dev-contents";
import Footer from "~/components/common/footer";

interface Props {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
  post: TechPostWithContent | null;
}

export default function TechPostPageClient({ params, post }: Props) {
  const resolvedParams = use(params);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState<"product" | "tech">(
    "product",
  );
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  const t = useTranslations("DevPortfolio.Details");

  // If no post provided, show a fallback
  if (!post) {
    return (
      <div>
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
              {t("backToProjects")}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out this project: ${post.title}`;

  return (
    <div>
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
              {t("backToProjects")}
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
            <h1 className="mb-6 text-3xl leading-tight font-light tracking-tight md:text-4xl lg:text-5xl xl:text-6xl">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="mb-8 flex flex-col items-start gap-4 text-slate-400 sm:flex-row sm:items-center sm:gap-6">
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

            {/* Project Links & Actions */}
            <motion.div
              className="flex flex-col gap-6 rounded-2xl border border-white/10 p-6 backdrop-blur-md md:flex-row md:items-center md:justify-between"
              style={{
                background: "rgba(255, 255, 255, 0.05)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-4">
                <div className="relative flex-shrink-0">
                  <Image
                    src="https://avatars.githubusercontent.com/u/66321178?v=4"
                    alt="Éric Philippe"
                    className="h-12 w-12 rounded-full object-cover"
                    width={48}
                    height={48}
                  />
                  <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="font-medium text-white">Éric Philippe</h3>
                  <p className="text-sm text-slate-400">
                    Full-Stack Developer & Designer
                  </p>
                </div>
              </div>

              {/* Project Links & Actions */}
              <div className="flex items-center justify-center gap-3 md:justify-end">
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

                <BookmarkButton
                  slug={post.slug}
                  domain="tech"
                  darkMode={true}
                />

                <ShareButton
                  link={shareUrl}
                  title={shareText}
                  darkMode={true}
                />
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
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 md:px-6 md:text-base ${
                  activeSection === "product"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <FiMonitor className="h-4 w-4" />
                <span className="hidden sm:inline">{t("productOverview")}</span>
                <span className="sm:hidden">{t("smProductOverview")}</span>
              </button>
              <button
                onClick={() => setActiveSection("tech")}
                className={`flex flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-300 md:px-6 md:text-base ${
                  activeSection === "tech"
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg"
                    : "text-slate-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <FiCode className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {t("technicalDetails")}
                </span>
                <span className="sm:hidden">{t("smTechnicalDetails")}</span>
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
                      {t("descriptionTitle")}
                    </h2>
                  </div>
                  <div className="prose prose-lg max-w-none text-slate-300">
                    <p className="text-lg leading-relaxed">
                      {post.productDescription}
                    </p>
                    <MDXContent content={post.productContent} theme="dark" />
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
                        {t("galleryTitle")}
                      </h2>
                    </div>
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
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
                      {t("technologiesUsed")}
                    </h2>
                  </div>
                  <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {post.techs.map((tech, index) => (
                      <motion.div
                        key={tech}
                        className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 p-3 backdrop-blur-sm transition-all duration-300 hover:bg-white/10 md:gap-3 md:p-4"
                        style={{
                          borderColor: `${getTechColor(tech)}40`,
                          background: `linear-gradient(135deg, ${getTechColor(tech)}10, rgba(255, 255, 255, 0.05))`,
                        }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                      >
                        <div
                          className="h-2 w-2 flex-shrink-0 rounded-full md:h-3 md:w-3"
                          style={{ backgroundColor: getTechColor(tech) }}
                        />
                        <span className="text-sm font-medium text-white md:text-base">
                          {tech}
                        </span>
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
                      {t("technicalImplementation")}
                    </h2>
                  </div>
                  {post.content ? (
                    <div className="prose prose-lg prose-invert max-w-none">
                      <MDXContent content={post.techContent} theme="dark" />
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
            className="flex flex-col-reverse items-center justify-between gap-4 border-t border-white/10 pt-8 md:flex-row md:gap-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <Link
              href={`/${resolvedParams.locale}/tech`}
              className="flex items-center gap-2 rounded-xl bg-slate-700 px-6 py-3 transition-colors hover:bg-slate-600"
            >
              <FiArrowLeft className="h-4 w-4" />
              {t("backToProjects")}
            </Link>

            <Link
              href={getGithubDevContentUrl(post.slug, resolvedParams.locale)}
              target="_blank"
              className="flex items-center gap-4 rounded-xl bg-slate-700 px-3 py-2 text-slate-400 transition-colors hover:bg-slate-600"
            >
              <FiGithub className="h-4 w-4" />
              {t("suggestEdit")}
            </Link>

            <div className="text-center text-sm text-slate-400 md:text-right">
              {t("thanksForChecking")}
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

      <Footer />
    </div>
  );
}
