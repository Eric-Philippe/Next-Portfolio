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
                href={`/${resolvedParams.locale}/photo`}
                className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
              >
                <FiArrowLeft className="h-4 w-4" />
                Back to Gallery
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

      {/* Content */}
      <div className="relative z-10 flex items-center gap-1.5 sm:gap-2">
        <Icon
          className={`h-4 w-4 transition-all duration-300 ${
            isActive ? "text-white" : "text-slate-400"
          } ${isTransitioning ? "animate-pulse" : ""}`}
        />
        <span
          className={`hidden transition-all duration-300 sm:block ${
            isActive ? "text-white" : "text-slate-400"
          } ${isTransitioning ? "animate-pulse" : ""}`}
        >
          {label}
        </span>
      </div>

      {/* Mobile indicator */}
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-1/2 h-0.5 w-6 -translate-x-1/2 rounded-full bg-white sm:hidden"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0 }}
          transition={{ duration: 0.2 }}
        />
      )}

      {/* Loading overlay */}
      {isTransitioning && isActive && (
        <motion.div
          className="absolute inset-0 rounded-lg bg-black/20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        />
      )}
    </motion.button>
  );

  return (
    <div>
      <Header
        firstColor={PHOTO_PORTFOLIO_FIRST_COLOR}
        secondColor={PHOTO_PORTFOLIO_SECOND_COLOR}
      />

      {/* Navigation Bar */}
      <div className="sticky top-0 z-40 border-b border-slate-800 bg-slate-900/80 backdrop-blur-md">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 sm:py-4">
          <div className="flex items-center justify-between gap-2 sm:gap-4">
            {/* Back Button */}
            <Link
              href={`/${resolvedParams.locale}/photo`}
              className="flex items-center gap-2 rounded-lg bg-slate-800/50 px-3 py-2 text-sm text-slate-400 transition-all duration-300 hover:scale-105 hover:bg-slate-700/50 hover:text-white sm:px-4"
            >
              <FiArrowLeft className="h-4 w-4" />
              <span className="hidden sm:inline">Back to Galleries</span>
              <span className="sm:hidden">Back</span>
            </Link>

            {/* View Mode Selector */}
            <motion.div
              className="relative flex items-center gap-0.5 rounded-xl border border-slate-700/50 bg-slate-800/30 p-1 shadow-lg backdrop-blur-sm sm:gap-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ViewModeButton
                mode="mdx"
                icon={FiFileText}
                label="Story"
                isActive={viewMode === "mdx"}
              />
              <ViewModeButton
                mode="carousel"
                icon={FiImage}
                label="Carousel"
                isActive={viewMode === "carousel"}
              />
              <ViewModeButton
                mode="grid"
                icon={FiGrid}
                label="Grid"
                isActive={viewMode === "grid"}
              />
            </motion.div>
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
            <GalleryMdxView gallery={gallery} onImageClick={handleImageClick} />
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
  );
}
