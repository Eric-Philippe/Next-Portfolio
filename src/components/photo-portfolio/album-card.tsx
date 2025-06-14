"use client";

import { motion } from "framer-motion";
import type { AlbumData } from "~/types/portfolio";

interface AlbumCardProps {
  album: AlbumData;
  index: number;
  viewMode: "grid" | "masonry";
  hoveredAlbum: string | null;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onClick?: () => void;
}

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 30,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
};

export default function AlbumCard({
  album,
  index,
  viewMode,
  hoveredAlbum,
  onMouseEnter,
  onMouseLeave,
  onClick,
}: AlbumCardProps) {
  const isHovered = hoveredAlbum === album.slug;

  return (
    <motion.div
      key={album.slug}
      variants={itemVariants}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
      className={`group br-6 relative cursor-pointer break-inside-avoid ${
        viewMode === "masonry" ? "mb-6" : ""
      }`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
    >
      <div
        className={`relative overflow-hidden border border-white/10 backdrop-blur-sm transition-all duration-500 group-hover:border-orange-400/30 group-hover:shadow-2xl group-hover:shadow-orange-500/10 ${
          viewMode === "masonry"
            ? `${index % 3 === 0 ? "aspect-[4/5]" : index % 3 === 1 ? "aspect-[4/6]" : "aspect-[4/4]"}`
            : "aspect-[4/5]"
        }`}
        style={{
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)",
          borderRadius: "0.375rem",
        }}
      >
        {/* Featured Badge */}
        {album.featured && (
          <div className="absolute top-4 right-4 z-10">
            <div className="border border-orange-400/50 bg-orange-400/20 px-2 py-1 text-xs font-medium text-orange-400 backdrop-blur-sm">
              Featured
            </div>
          </div>
        )}

        {/* Album Preview */}
        <div className="relative h-full w-full overflow-hidden">
          {/* Background fallback */}
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 via-gray-900 to-black" />

          {/* Album Image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
            style={{
              backgroundImage: `url(${album.previewImgOne})`,
            }}
          />

          {/* Image overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-black/10" />

          {/* Camera settings overlay */}
          <div className="absolute top-4 left-4 z-10 font-mono text-xs text-white/40">
            {album.camera.replace("Canon EOS ", "")}
          </div>

          {/* Photo count indicator */}
          <div className="absolute top-4 right-4 z-10 font-mono text-xs text-white/40">
            {album.photos.length} photos
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20"
            initial={{ opacity: 0 }}
            animate={{
              opacity: isHovered ? 1 : 0,
            }}
            transition={{ duration: 0.3 }}
          />

          {/* Content overlay */}
          <motion.div
            className="absolute inset-0 flex flex-col justify-end p-6"
            initial={{ opacity: -50, y: 50 }}
            animate={{
              opacity: isHovered ? 1 : 0,
              y: isHovered ? -50 : 50,
            }}
            transition={{ duration: 0.3 }}
          >
            <div className="mb-2 text-xs font-medium tracking-wider text-orange-400 uppercase">
              {album.category} • {album.date}
            </div>
            <h3 className="mb-2 text-xl font-light text-white">
              {album.title}
            </h3>
            <p className="line-clamp-2 text-sm text-white/80">
              {album.description}
            </p>
          </motion.div>
        </div>

        {/* Bottom info bar - always visible */}
        <div className="absolute right-0 bottom-0 left-0 border-t border-white/10 bg-black/40 p-3 backdrop-blur-sm">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-white">
                {album.shortTitle}
              </div>
              <div className="text-xs text-white/60">{album.category}</div>
            </div>
            <div className="text-right">
              <div className="text-xs font-medium text-orange-400">
                {album.date}
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
