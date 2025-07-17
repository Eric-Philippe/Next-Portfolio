"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { FiChevronLeft, FiChevronRight, FiMaximize2 } from "react-icons/fi";
import Image from "next/image";
import type { PhotoGallery } from "~/lib/photo-utils";
import { formatDateFromDate } from "~/lib/utils";
import { useLocale } from "next-intl";

interface Props {
  gallery: PhotoGallery;
  onImageClick: (src: string, index: number) => void;
}

export default function GalleryCarouselView({ gallery, onImageClick }: Props) {
  const locale = useLocale();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imageDirection, setImageDirection] = useState(0);

  const nextImage = () => {
    setImageDirection(1);
    setCurrentIndex((prev) => (prev + 1) % gallery.photos.length);
  };

  const prevImage = () => {
    setImageDirection(-1);
    setCurrentIndex((prev) =>
      prev === 0 ? gallery.photos.length - 1 : prev - 1,
    );
  };

  const goToImage = (index: number) => {
    setImageDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "ArrowLeft") {
      prevImage();
    } else if (event.key === "ArrowRight") {
      nextImage();
    } else if (event.key === "Enter" || event.key === " ") {
      onImageClick(gallery.photos[currentIndex]!, currentIndex);
    }
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
    }),
  };

  return (
    <div
      className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800"
      onKeyDown={handleKeyDown}
      tabIndex={0}
      style={{ userSelect: "none" }}
    >
      <div className="mx-auto max-w-7xl px-6 py-12">
        {/* Gallery Header */}
        <motion.header
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-4xl font-light tracking-tight text-transparent md:text-5xl">
            {gallery.title}
          </h1>
          <p className="mb-6 text-lg text-slate-300">{gallery.description}</p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
            <time className="flex items-center gap-2">
              📅 {formatDateFromDate(gallery.date, locale)}
            </time>
            {gallery.gear && (
              <span className="flex items-center gap-2">📷 {gallery.gear}</span>
            )}
            <span className="rounded-full bg-purple-900/30 px-3 py-1 text-purple-300">
              {gallery.category}
            </span>
          </div>
        </motion.header>

        {/* Main Carousel */}
        <motion.div
          className="group relative mb-8 overflow-hidden rounded-2xl bg-slate-800/50 backdrop-blur-sm"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="relative aspect-[16/10] w-full">
            <AnimatePresence initial={false} custom={imageDirection}>
              <motion.div
                key={currentIndex}
                custom={imageDirection}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                }}
                className="absolute inset-0"
              >
                <Image
                  src={gallery.photos[currentIndex]!}
                  alt={`${gallery.title} - Image ${currentIndex + 1}`}
                  fill
                  className="object-cover"
                  priority={currentIndex < 3}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </motion.div>
            </AnimatePresence>

            {/* Hover overlay for better visibility */}
            <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/10" />

            {/* Navigation Arrows */}
            {gallery.photos.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-4 z-20 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:scale-110 hover:bg-black/90 focus:opacity-100 focus:ring-2 focus:ring-purple-400 focus:outline-none md:opacity-20 md:hover:opacity-100"
                  aria-label="Previous image"
                >
                  <FiChevronLeft className="h-6 w-6" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-4 z-20 -translate-y-1/2 rounded-full bg-black/70 p-3 text-white opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:scale-110 hover:bg-black/90 focus:opacity-100 focus:ring-2 focus:ring-purple-400 focus:outline-none md:opacity-20 md:hover:opacity-100"
                  aria-label="Next image"
                >
                  <FiChevronRight className="h-6 w-6" />
                </button>
              </>
            )}

            {/* Fullscreen Button */}
            <button
              onClick={() =>
                onImageClick(gallery.photos[currentIndex]!, currentIndex)
              }
              className="absolute top-4 right-4 z-20 rounded-full bg-black/70 p-3 text-white opacity-0 backdrop-blur-sm transition-all group-hover:opacity-100 hover:scale-110 hover:bg-black/90 focus:opacity-100 focus:ring-2 focus:ring-purple-400 focus:outline-none"
              aria-label="Open in fullscreen"
            >
              <FiMaximize2 className="h-5 w-5" />
            </button>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-4 z-20 rounded-full bg-black/70 px-4 py-2 text-sm text-white backdrop-blur-sm">
              {currentIndex + 1} / {gallery.photos.length}
            </div>
          </div>
        </motion.div>

        {/* Thumbnail Navigation */}
        <motion.div
          className="overflow-x-auto pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="flex gap-3 px-2">
            {gallery.photos.map((photo, index) => (
              <motion.button
                key={index}
                onClick={() => goToImage(index)}
                className={`relative h-20 w-32 flex-shrink-0 overflow-hidden rounded-lg transition-all ${
                  index === currentIndex
                    ? "ring-2 ring-purple-400 ring-offset-2 ring-offset-slate-900"
                    : "opacity-70 hover:opacity-100"
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Image
                  src={photo}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="128px"
                />
                {index === currentIndex && (
                  <motion.div
                    className="absolute inset-0 bg-purple-400/20"
                    layoutId="thumbnail-highlight"
                  />
                )}
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tags */}
        {gallery.tags.length > 0 && (
          <motion.div
            className="mt-8 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            {gallery.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-800/50 px-3 py-1 text-xs text-slate-300 backdrop-blur-sm"
              >
                #{tag}
              </span>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
