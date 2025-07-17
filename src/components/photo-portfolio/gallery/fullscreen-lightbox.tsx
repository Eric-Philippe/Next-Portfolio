"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useCallback } from "react";
import {
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiDownload,
  FiShare2,
  FiZoomIn,
  FiZoomOut,
  FiRotateCw,
} from "react-icons/fi";
import Image from "next/image";

interface Props {
  isOpen: boolean;
  images: string[];
  initialIndex: number;
  onClose: () => void;
  title?: string;
}

export default function FullscreenLightbox({
  isOpen,
  images,
  initialIndex,
  onClose,
  title,
}: Props) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [imageDirection, setImageDirection] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });

  // Reset states when opening or changing images
  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setZoom(1);
      setRotation(0);
      setImagePosition({ x: 0, y: 0 });
    }
  }, [isOpen, initialIndex]);

  const nextImage = useCallback(() => {
    if (images.length <= 1) return;
    setImageDirection(1);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    resetImageState();
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length <= 1) return;
    setImageDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetImageState();
  }, [images.length]);

  const zoomIn = useCallback(() => {
    setZoom((prev) => Math.min(prev + 0.5, 4));
  }, []);

  const zoomOut = useCallback(() => {
    setZoom((prev) => Math.max(prev - 0.5, 0.5));
  }, []);

  const rotate = useCallback(() => {
    setRotation((prev) => (prev + 90) % 360);
  }, []);

  // Keyboard navigation
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isOpen) return;

      switch (event.key) {
        case "Escape":
          onClose();
          break;
        case "ArrowLeft":
          event.preventDefault();
          prevImage();
          break;
        case "ArrowRight":
          event.preventDefault();
          nextImage();
          break;
        case "+":
        case "=":
          event.preventDefault();
          zoomIn();
          break;
        case "-":
          event.preventDefault();
          zoomOut();
          break;
        case "r":
        case "R":
          event.preventDefault();
          rotate();
          break;
      }
    },
    [isOpen, onClose, nextImage, prevImage, zoomIn, zoomOut, rotate],
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  // Prevent body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const resetImageState = () => {
    setZoom(1);
    setRotation(0);
    setImagePosition({ x: 0, y: 0 });
  };

  const downloadImage = async () => {
    try {
      const response = await fetch(images[currentIndex]!);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `${title ?? "image"}-${currentIndex + 1}.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Failed to download image:", error);
    }
  };

  const shareImage = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title ?? "Photo",
          url: images[currentIndex],
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // Fallback: copy to clipboard
      try {
        await navigator.clipboard.writeText(images[currentIndex]!);
        // You could add a toast notification here
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
      }
    }
  };

  // Mouse drag handlers
  const handleMouseDown = (event: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseMove = (event: React.MouseEvent) => {
    if (!isDragging || zoom <= 1) return;

    const deltaX = event.clientX - dragStart.x;
    const deltaY = event.clientY - dragStart.y;

    setImagePosition((prev) => ({
      x: prev.x + deltaX,
      y: prev.y + deltaY,
    }));

    setDragStart({ x: event.clientX, y: event.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => {
          if (e.target === e.currentTarget) onClose();
        }}
      >
        {/* Header Controls */}
        <div className="absolute top-0 right-0 left-0 z-10 flex items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <h2 className="text-lg font-medium text-white">
              {title}{" "}
              {images.length > 1 && `(${currentIndex + 1} / ${images.length})`}
            </h2>
          </div>

          <div className="flex items-center gap-2">
            {/* Zoom Controls */}
            <button
              onClick={zoomOut}
              className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              disabled={zoom <= 0.5}
            >
              <FiZoomOut className="h-5 w-5" />
            </button>

            <span className="px-2 text-sm text-white">
              {Math.round(zoom * 100)}%
            </span>

            <button
              onClick={zoomIn}
              className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
              disabled={zoom >= 4}
            >
              <FiZoomIn className="h-5 w-5" />
            </button>

            {/* Rotate */}
            <button
              onClick={rotate}
              className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            >
              <FiRotateCw className="h-5 w-5" />
            </button>

            {/* Download */}
            <button
              onClick={downloadImage}
              className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            >
              <FiDownload className="h-5 w-5" />
            </button>

            {/* Share */}
            <button
              onClick={shareImage}
              className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            >
              <FiShare2 className="h-5 w-5" />
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="rounded-full bg-black/50 p-2 text-white transition-colors hover:bg-black/70"
            >
              <FiX className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute top-1/2 left-6 -translate-y-1/2 rounded-full bg-black/50 p-4 text-white transition-all hover:scale-110 hover:bg-black/70"
            >
              <FiChevronLeft className="h-8 w-8" />
            </button>

            <button
              onClick={nextImage}
              className="absolute top-1/2 right-6 -translate-y-1/2 rounded-full bg-black/50 p-4 text-white transition-all hover:scale-110 hover:bg-black/70"
            >
              <FiChevronRight className="h-8 w-8" />
            </button>
          </>
        )}

        {/* Image Container */}
        <div className="relative h-full w-full overflow-hidden">
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
              className="absolute inset-0 flex items-center justify-center"
            >
              <div
                className={`relative max-h-full max-w-full ${
                  zoom > 1 ? "cursor-grab" : "cursor-zoom-in"
                } ${isDragging ? "cursor-grabbing" : ""}`}
                style={{
                  transform: `scale(${zoom}) rotate(${rotation}deg) translate(${imagePosition.x}px, ${imagePosition.y}px)`,
                  transition: isDragging ? "none" : "transform 0.3s ease",
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
                onClick={(e) => {
                  e.stopPropagation();
                  if (zoom === 1) {
                    zoomIn();
                  }
                }}
              >
                <Image
                  src={images[currentIndex]!}
                  alt={`${title ?? "Image"} ${currentIndex + 1}`}
                  width={1920}
                  height={1080}
                  className="max-h-[calc(100vh-8rem)] max-w-[calc(100vw-8rem)] object-contain"
                  priority
                  unoptimized // For external images
                  draggable={false}
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
            <div className="flex gap-2 rounded-full bg-black/50 p-2 backdrop-blur-sm">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setImageDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                    resetImageState();
                  }}
                  className={`relative h-12 w-16 overflow-hidden rounded transition-all ${
                    index === currentIndex
                      ? "ring-2 ring-white"
                      : "opacity-70 hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Instructions */}
        <div className="absolute right-6 bottom-6 text-right text-sm text-white/70">
          <p>Press ESC to close • Arrow keys to navigate</p>
          <p>Click to zoom • R to rotate • +/- to zoom</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
