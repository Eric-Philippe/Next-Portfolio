"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { FiGrid, FiList } from "react-icons/fi";
import Image from "next/image";
import type { PhotoGallery } from "~/lib/photo-utils";
import { formatDateFromDate } from "~/lib/utils";
import { useLocale } from "next-intl";

interface Props {
  gallery: PhotoGallery;
  onImageClick: (src: string, index: number) => void;
}

export default function GalleryGridView({ gallery, onImageClick }: Props) {
  const locale = useLocale();
  const [layout, setLayout] = useState<"masonry" | "grid">("masonry");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.9 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  // Calculate dynamic grid sizes for masonry layout
  const getImageSize = (index: number) => {
    const sizes = [
      { aspect: "aspect-[4/3]", span: "col-span-1 row-span-1" },
      { aspect: "aspect-[3/4]", span: "col-span-1 row-span-2" },
      { aspect: "aspect-[16/9]", span: "col-span-2 row-span-1" },
      { aspect: "aspect-square", span: "col-span-1 row-span-1" },
      { aspect: "aspect-[4/5]", span: "col-span-1 row-span-1" },
    ];
    return sizes[index % sizes.length]!;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
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

        {/* Layout Toggle */}
        <motion.div
          className="mb-8 flex justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="flex rounded-full bg-slate-800/50 p-1 backdrop-blur-sm">
            <button
              onClick={() => setLayout("masonry")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${
                layout === "masonry"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FiList className="h-4 w-4" />
              Masonry
            </button>
            <button
              onClick={() => setLayout("grid")}
              className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition-all ${
                layout === "grid"
                  ? "bg-purple-600 text-white shadow-lg"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <FiGrid className="h-4 w-4" />
              Grid
            </button>
          </div>
        </motion.div>

        {/* Image Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={
            layout === "masonry"
              ? "grid auto-rows-[200px] grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
              : "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          }
        >
          {gallery.photos.map((photo, index) => {
            const imageSize = layout === "masonry" ? getImageSize(index) : null;

            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className={`group relative overflow-hidden rounded-xl bg-slate-800/30 ${
                  layout === "masonry"
                    ? `${imageSize?.span} ${imageSize?.aspect}`
                    : "aspect-square"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Image
                  src={photo}
                  alt={`${gallery.title} - Image ${index + 1}`}
                  fill
                  className="cursor-pointer object-cover transition-transform duration-500 group-hover:scale-110"
                  onClick={() => onImageClick(photo, index)}
                  sizes={
                    layout === "masonry"
                      ? "(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                      : "(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  }
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Image Number */}
                <div className="absolute bottom-3 left-3 rounded-full bg-black/70 px-2 py-1 text-xs text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {index + 1}
                </div>

                {/* Hover Effect */}
                <motion.div
                  className="absolute inset-0 bg-purple-600/20"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Gallery Stats */}
        <motion.div
          className="mt-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <p className="text-slate-400">
            {gallery.photos.length}{" "}
            {gallery.photos.length === 1 ? "photo" : "photos"} in this gallery
          </p>
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
