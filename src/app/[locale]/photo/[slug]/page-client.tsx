"use client";

import { use, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "~/components/common/header";
import {
  PHOTO_PORTFOLIO_FIRST_COLOR,
  PHOTO_PORTFOLIO_SECOND_COLOR,
} from "~/content/photo-contents";
import type { PhotoGallery } from "~/lib/photo-utils";
import {
  GalleryMdxView,
  GalleryCarouselView,
  GalleryGridView,
  FullscreenLightbox,
} from "~/components/photo-portfolio/gallery";
import Link from "next/link";
import {
  FiArrowLeft,
  FiFileText,
  FiImage,
  FiGrid,
  FiCamera,
} from "react-icons/fi";
import Footer from "~/components/common/footer";
import { useTranslations } from "next-intl";

interface Props {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
  gallery: PhotoGallery | null;
}

type ViewMode = "mdx" | "carousel" | "grid";

export default function PhotoGalleryPageClient({ params, gallery }: Props) {
  const resolvedParams = use(params);
  const t = useTranslations("PhotoPortfolio.Details");

  const [viewMode, setViewMode] = useState<ViewMode>("mdx");
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleViewModeChange = (newMode: ViewMode) => {
    if (newMode === viewMode) return;

    setIsTransitioning(true);
    setTimeout(() => {
      setViewMode(newMode);
      setIsTransitioning(false);
    }, 150);
  };

  const handleImageClick = (src: string, index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (!gallery) {
    return (
      <div>
        <Header
          firstColor={PHOTO_PORTFOLIO_FIRST_COLOR}
          secondColor={PHOTO_PORTFOLIO_SECOND_COLOR}
        />
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <FiCamera className="mx-auto mb-6 h-16 w-16 text-purple-400" />
              <h1 className="mb-4 text-4xl font-bold text-white">
                Gallery Not Found
              </h1>
              <p className="mb-8 text-slate-400">
                The gallery you&apos;re looking for doesn&apos;t exist or has
                been moved.
              </p>
              <Link
                href={`/${resolvedParams.locale}/photo#galleries`}
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
              >
                <FiArrowLeft className="h-4 w-4" />
                {t("backToGalleries")}
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    );
  }

  const ViewModeButton = ({
    mode,
    icon: Icon,
    label,
    isActive,
  }: {
    mode: ViewMode;
    icon: React.ComponentType<{ className?: string }>;
    label: string;
    isActive: boolean;
  }) => (
    <motion.button
      onClick={() => handleViewModeChange(mode)}
      className="relative flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105 sm:px-4"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.98 }}
      layout
      disabled={isTransitioning}
    >
      {/* Background highlight */}
      {isActive && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 shadow-lg"
          layoutId="activeBackground"
          initial={false}
          transition={{
            type: "spring",
            stiffness: 500,
            damping: 30,
          }}
        />
      )}

      {/* Inactive glass background */}
      {!isActive && (
        <div className="absolute inset-0 rounded-lg bg-slate-700/30 backdrop-blur-sm transition-all duration-300 hover:bg-slate-600/40" />
      )}

      {/* Content */}
      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
        <Icon
          className={`h-4 w-4 transition-all duration-300 ${
            isActive ? "text-white drop-shadow-sm" : "text-slate-300"
          } ${isTransitioning ? "animate-pulse" : ""}`}
        />
        <span
          className={`hidden transition-all duration-300 sm:block ${
            isActive
              ? "font-medium text-white drop-shadow-sm"
              : "text-slate-300"
          } ${isTransitioning ? "animate-pulse" : ""}`}
        >
          {label}
        </span>
      </div>

      {/* Mobile indicator */}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-white drop-shadow-sm sm:hidden"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Loading overlay */}
      {isTransitioning && isActive && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-black/5"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.button>
  );

  return (
    <div>
      {/* Navigation Bar */}
      <div className="sticky top-0 z-40 bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800 py-4">
        <div className="mx-auto max-w-7xl px-4 sm:px-6">
          {/* Glass Navigation Container */}
          <div className="relative overflow-hidden rounded-2xl border border-white/15 bg-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.25)] backdrop-blur-md before:absolute before:top-0 before:right-0 before:left-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-white/25 before:to-transparent after:absolute after:top-0 after:left-0 after:h-full after:w-px after:bg-gradient-to-b after:from-white/25 after:via-transparent after:to-white/10">
            {/* Inner glass shadow effects */}
            <div className="pointer-events-none absolute inset-0 rounded-2xl shadow-[inset_0_1px_0_rgba(255,255,255,0.15),inset_0_-1px_0_rgba(255,255,255,0.03),inset_0_0_8px_4px_rgba(255,255,255,0.1)]"></div>

            <div className="relative px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex items-center justify-between gap-2 sm:gap-4">
                {/* Back Button */}
                <Link
                  href={`/${resolvedParams.locale}/photo#galleries`}
                  className="flex items-center gap-2 rounded-xl border border-white/20 bg-white/10 px-3 py-2 text-sm text-slate-200 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-white/20 hover:text-white hover:shadow-lg sm:px-4"
                >
                  <FiArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">
                    {t("backToGalleries")}
                  </span>
                  <span className="sm:hidden">{t("back")}</span>
                </Link>

                {/* View Mode Selector */}
                <motion.div
                  className="relative overflow-hidden rounded-lg border border-slate-600/60 bg-slate-800/80 p-1 shadow-[0_4px_16px_rgba(0,0,0,0.3)] backdrop-blur-sm before:absolute before:top-0 before:right-0 before:left-0 before:h-px before:bg-gradient-to-r before:from-transparent before:via-slate-400/30 before:to-transparent after:absolute after:top-0 after:left-0 after:h-full after:w-px after:bg-gradient-to-b after:from-slate-400/30 after:via-transparent after:to-slate-600/20"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Inner shadow effects for toolbar look */}
                  <div className="pointer-events-none absolute inset-0 rounded-lg shadow-[inset_0_1px_0_rgba(255,255,255,0.1),inset_0_-1px_0_rgba(0,0,0,0.2),inset_0_0_4px_2px_rgba(0,0,0,0.1)]"></div>

                  <div className="relative flex items-center gap-0.5 sm:gap-2">
                    <ViewModeButton
                      mode="mdx"
                      icon={FiFileText}
                      label={t("story")}
                      isActive={viewMode === "mdx"}
                    />
                    <ViewModeButton
                      mode="carousel"
                      icon={FiImage}
                      label={t("carousel")}
                      isActive={viewMode === "carousel"}
                    />
                    <ViewModeButton
                      mode="grid"
                      icon={FiGrid}
                      label={t("grid")}
                      isActive={viewMode === "grid"}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>

        {/* View Content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={viewMode}
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.98 }}
            transition={{
              duration: 0.4,
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
            className="relative"
          >
            {viewMode === "mdx" && (
              <GalleryMdxView
                gallery={gallery}
                onImageClick={handleImageClick}
              />
            )}
            {viewMode === "carousel" && (
              <GalleryCarouselView
                gallery={gallery}
                onImageClick={handleImageClick}
              />
            )}
            {viewMode === "grid" && (
              <GalleryGridView
                gallery={gallery}
                onImageClick={handleImageClick}
              />
            )}
          </motion.div>
        </AnimatePresence>

        {/* Fullscreen Lightbox */}
        <FullscreenLightbox
          isOpen={lightboxOpen}
          images={gallery.photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
          title={gallery.title}
        />
      </div>

      <Footer />
    </div>
  );
}
