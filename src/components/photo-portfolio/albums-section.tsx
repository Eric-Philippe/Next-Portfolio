"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useMemo } from "react";
import { albums } from "~/lib/data/albums";
import type { AlbumCategory } from "~/types/portfolio";
import AlbumCard from "./album-card";

export default function AlbumsSection() {
  const [viewMode, setViewMode] = useState<"grid" | "masonry">("masonry");
  const [sortBy, setSortBy] = useState<"date" | "featured" | "category">(
    "featured",
  );
  const [selectedCategory, setSelectedCategory] = useState<
    AlbumCategory | "all"
  >("all");
  const [hoveredAlbum, setHoveredAlbum] = useState<string | null>(null);

  // Get unique categories
  const categories = useMemo(() => {
    const uniqueCategories = [
      ...new Set(albums.map((album) => album.category)),
    ];
    return ["all", ...uniqueCategories] as const;
  }, []);

  // Filter and sort albums
  const filteredAndSortedAlbums = useMemo(() => {
    let filtered = albums;

    // Filter by category
    if (selectedCategory !== "all") {
      filtered = filtered.filter(
        (album) => album.category === selectedCategory,
      );
    }

    // Sort albums
    const sorted = [...filtered].sort((a, b) => {
      switch (sortBy) {
        case "date":
          return parseInt(b.date) - parseInt(a.date);
        case "featured":
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return parseInt(b.date) - parseInt(a.date);
        case "category":
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

    return sorted;
  }, [selectedCategory, sortBy]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  return (
    <section
      id="albums"
      className="relative min-h-screen bg-gradient-to-br from-gray-900 via-gray-950 to-black px-4 py-20"
    >
      {/* Ambient background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-orange-500/5 to-pink-500/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-96 w-96 rounded-full bg-gradient-to-r from-blue-500/5 to-purple-500/5 blur-3xl" />
      </div>

      {/* Subtle grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Header with controls */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="mb-16"
        >
          {/* Title section */}
          <div className="mb-12 text-center">
            <motion.div
              className="mb-6 inline-flex items-center border border-white/10 px-6 py-2 backdrop-blur-sm"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)",
              }}
            >
              <div className="mr-3 h-2 w-2 border border-orange-400/60 bg-orange-400/20"></div>
              <span className="text-xs font-medium tracking-[0.2em] text-white/60 uppercase">
                Visual Stories
              </span>
            </motion.div>

            <h2
              className="mb-6 font-light tracking-tight text-white"
              style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
            >
              Photo
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">
                {" "}
                Albums
              </span>
            </h2>

            <p className="mx-auto max-w-2xl text-lg font-light text-white/60">
              Curated collections of moments, emotions, and stories captured
              through the lens
            </p>
          </div>

          {/* Control Panel */}
          <div className="flex flex-wrap items-center justify-between gap-6">
            {/* Category Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {categories.map((category) => {
                const isActive = selectedCategory === category;
                return (
                  <motion.button
                    key={category}
                    className={`relative overflow-hidden border px-4 py-2 text-sm font-medium transition-all duration-300 ${
                      isActive
                        ? "border-orange-400/50 text-orange-400 shadow-lg shadow-orange-500/20"
                        : "border-white/20 text-white/70 hover:border-white/30 hover:text-white"
                    }`}
                    style={{
                      background: isActive
                        ? "linear-gradient(135deg, rgba(251, 146, 60, 0.15) 0%, rgba(249, 115, 22, 0.1) 100%)"
                        : "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
                      backdropFilter: "blur(10px)",
                    }}
                    onClick={() => setSelectedCategory(category)}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {category === "all" ? "All" : category}
                    {isActive && (
                      <motion.div
                        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-pink-400"
                        layoutId="activeCategory"
                        initial={{ width: 0 }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Sort and View Controls */}
            <div className="flex items-center gap-4">
              {/* Sort Options */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-white/50">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) =>
                    setSortBy(
                      e.target.value as "date" | "featured" | "category",
                    )
                  }
                  className="border border-white/20 bg-white/5 px-3 py-1.5 text-sm text-white backdrop-blur-sm focus:border-orange-400/50 focus:outline-none"
                  style={{ backdropFilter: "blur(10px)" }}
                >
                  <option value="featured" className="bg-gray-900">
                    Featured
                  </option>
                  <option value="date" className="bg-gray-900">
                    Date
                  </option>
                  <option value="category" className="bg-gray-900">
                    Category
                  </option>
                </select>
              </div>

              {/* View Mode Toggle */}
              <div
                className="flex overflow-hidden border border-white/20"
                style={{ backdropFilter: "blur(10px)" }}
              >
                {["masonry", "grid"].map((mode) => (
                  <button
                    key={mode}
                    className={`px-3 py-1.5 text-sm transition-all duration-200 ${
                      viewMode === mode
                        ? "bg-orange-400/20 text-orange-400"
                        : "text-white/60 hover:bg-white/5 hover:text-white"
                    }`}
                    onClick={() => setViewMode(mode as "grid" | "masonry")}
                  >
                    {mode === "masonry" ? "Masonry" : "Grid"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Albums Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`${
            viewMode === "masonry"
              ? "columns-1 gap-6 md:columns-2 lg:columns-3"
              : "grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
          }`}
        >
          <AnimatePresence>
            {filteredAndSortedAlbums.map((album, index) => (
              <AlbumCard
                key={album.slug}
                album={album}
                index={index}
                viewMode={viewMode}
                hoveredAlbum={hoveredAlbum}
                onMouseEnter={() => setHoveredAlbum(album.slug)}
                onMouseLeave={() => setHoveredAlbum(null)}
                onClick={() => {
                  // Handle album click - can be used for navigation later
                  console.log(`Clicked on album: ${album.slug}`);
                }}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Stats Footer */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div
            className="inline-flex items-center gap-8 border border-white/10 px-8 py-4 backdrop-blur-sm"
            style={{
              background:
                "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
            }}
          >
            <div className="text-center">
              <div className="text-2xl font-light text-white">
                {albums.length}
              </div>
              <div className="text-xs tracking-wider text-white/60 uppercase">
                Albums
              </div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-light text-white">
                {albums.reduce(
                  (total, album) => total + album.photos.length,
                  0,
                )}
              </div>
              <div className="text-xs tracking-wider text-white/60 uppercase">
                Photos
              </div>
            </div>
            <div className="h-8 w-px bg-white/20" />
            <div className="text-center">
              <div className="text-2xl font-light text-white">
                {albums.filter((album) => album.featured).length}
              </div>
              <div className="text-xs tracking-wider text-white/60 uppercase">
                Featured
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
