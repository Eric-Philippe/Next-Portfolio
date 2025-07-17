"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import {
  FiChevronLeft,
  FiChevronRight,
  FiMaximize2,
  FiPause,
  FiPlay,
} from "react-icons/fi";
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
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay || gallery.photos.length <= 1) return;

    const interval = setInterval(() => {
      if (!isDragging) {
        setImageDirection(1);
        setCurrentIndex((prev) => (prev + 1) % gallery.photos.length);
      }
    }, 4000); // Change image every 4 seconds

    return () => clearInterval(interval);
  }, [isAutoPlay, isDragging, gallery.photos.length]);

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

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
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
      <div className="mx-auto max-w-7xl px-3 py-6 md:px-6 md:py-12">
        {/* Gallery Header */}
        <motion.header
          className="mb-6 text-center md:mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-3 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-3xl font-light tracking-tight text-transparent md:mb-4 md:text-4xl lg:text-5xl">
            {gallery.title}
          </h1>
          <p className="mb-4 text-base text-slate-300 md:mb-6 md:text-lg">
            {gallery.description}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 text-xs text-slate-400 md:gap-4 md:text-sm">
            <time className="flex items-center gap-2">
              📅 {formatDateFromDate(gallery.date, locale)}
            </time>
            {gallery.gear && (
              <span className="flex items-center gap-2">📷 {gallery.gear}</span>
            )}
            <span className="rounded-full bg-purple-900/30 px-2 py-1 text-purple-300 md:px-3">
              {gallery.category}
            </span>
          </div>
        </motion.header>

        {/* Main Carousel */}
        <motion.div
          className="group relative mb-4 overflow-hidden rounded-xl bg-slate-800/50 backdrop-blur-sm md:mb-8 md:rounded-2xl"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          onMouseEnter={() => setIsDragging(true)}
          onMouseLeave={() => setIsDragging(false)}
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
                className="absolute inset-0 cursor-grab active:cursor-grabbing"
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragStart={() => setIsDragging(true)}
                onDragEnd={(event, info) => {
                  setIsDragging(false);
                  const threshold = 100;

                  if (info.offset.x > threshold) {
                    prevImage();
                  } else if (info.offset.x < -threshold) {
                    nextImage();
                  }
                }}
              >
                <Image
                  src={gallery.photos[currentIndex]!}
                  alt={`${gallery.title} - Image ${currentIndex + 1}`}
                  fill
                  className="object-cover select-none"
                  priority={currentIndex < 3}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                  draggable={false}
                />
              </motion.div>
            </AnimatePresence>

            {/* Hover overlay for better visibility */}
            <div className="absolute inset-0 bg-black/0 transition-all duration-300 group-hover:bg-black/20" />

            {/* Navigation Arrows - Cachés sur mobile, visibles sur desktop */}
            {gallery.photos.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute top-1/2 left-2 z-20 -translate-y-1/2 rounded-full bg-black/80 p-2 text-white opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/90 focus:opacity-100 focus:ring-2 focus:ring-purple-400 focus:outline-none md:left-4 md:p-3 md:opacity-60 md:hover:opacity-100"
                  aria-label="Previous image"
                >
                  <FiChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
                </button>

                <button
                  onClick={nextImage}
                  className="absolute top-1/2 right-2 z-20 -translate-y-1/2 rounded-full bg-black/80 p-2 text-white opacity-0 shadow-xl backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/90 focus:opacity-100 focus:ring-2 focus:ring-purple-400 focus:outline-none md:right-4 md:p-3 md:opacity-60 md:hover:opacity-100"
                  aria-label="Next image"
                >
                  <FiChevronRight className="h-5 w-5 md:h-6 md:w-6" />
                </button>
              </>
            )}

            {/* Auto-play Control - Plus petit sur mobile */}
            <button
              onClick={toggleAutoPlay}
              className="absolute top-2 left-2 z-20 rounded-full bg-black/60 p-2 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/90 focus:opacity-100 focus:ring-2 focus:ring-purple-400 focus:outline-none md:top-4 md:left-4 md:bg-black/80 md:p-3 md:shadow-xl"
              aria-label={isAutoPlay ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlay ? (
                <FiPause className="h-4 w-4 md:h-5 md:w-5" />
              ) : (
                <FiPlay className="h-4 w-4 md:h-5 md:w-5" />
              )}
            </button>

            {/* Fullscreen Button - Plus petit sur mobile */}
            <button
              onClick={() =>
                onImageClick(gallery.photos[currentIndex]!, currentIndex)
              }
              className="absolute top-2 right-2 z-20 rounded-full bg-black/60 p-2 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-black/90 focus:opacity-100 focus:ring-2 focus:ring-purple-400 focus:outline-none md:top-4 md:right-4 md:bg-black/80 md:p-3 md:shadow-xl"
              aria-label="Open in fullscreen"
            >
              <FiMaximize2 className="h-4 w-4 md:h-5 md:w-5" />
            </button>

            {/* Image Counter - Plus petit sur mobile */}
            <div className="absolute bottom-2 left-2 z-20 rounded-full bg-black/60 px-3 py-1 text-xs text-white shadow-lg backdrop-blur-sm md:bottom-4 md:left-4 md:bg-black/80 md:px-4 md:py-2 md:text-sm md:shadow-xl">
              {currentIndex + 1} / {gallery.photos.length}
            </div>

            {/* Progress Indicator - Plus fin sur mobile */}
            {isAutoPlay && (
              <div className="absolute right-0 bottom-0 left-0 h-0.5 bg-black/20 md:h-1">
                <motion.div
                  className="h-full bg-purple-400"
                  initial={{ width: "0%" }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 4, ease: "linear" }}
                  key={currentIndex}
                />
              </div>
            )}
          </div>
        </motion.div>

        {/* Thumbnail Navigation - Plus petit sur mobile */}
        <motion.div
          className="overflow-x-auto pb-2 md:pb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="mt-2 flex gap-2 px-1 md:gap-3 md:px-2">
            {gallery.photos.map((photo, index) => (
              <motion.button
                key={index}
                onClick={() => goToImage(index)}
                className={`relative h-16 w-24 flex-shrink-0 overflow-hidden rounded-lg transition-all md:h-20 md:w-32 ${
                  index === currentIndex
                    ? "ring-2 ring-purple-400 ring-offset-1 ring-offset-slate-900 md:ring-offset-2"
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
                  sizes="(max-width: 768px) 96px, 128px"
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
            className="mt-4 flex flex-wrap justify-center gap-2 md:mt-6"
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
