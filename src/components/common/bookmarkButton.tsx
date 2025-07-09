"use client";

import { motion } from "framer-motion";
import { FiBookmark } from "react-icons/fi";
import { useState, useEffect } from "react";

interface BookmarkProps {
  domain: "tech" | "photo" | "blog";
  slug: string;
  darkMode?: boolean;
}

export default function BookmarkButton({
  slug,
  domain,
  darkMode = false,
}: BookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    const bookmarkKey = `bookmark-${domain}-${slug}`;
    const savedBookmark = localStorage.getItem(bookmarkKey);
    setIsBookmarked(savedBookmark === "true");
  }, [domain, slug]);

  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
    localStorage.setItem(`bookmark-${domain}-${slug}`, String(!isBookmarked));
  };

  const getButtonStyle = () => {
    if (isBookmarked) {
      return darkMode
        ? "bg-purple-600 text-white"
        : "bg-blue-100 text-blue-600";
    }
    return darkMode
      ? "bg-slate-700 text-slate-300 hover:bg-slate-600"
      : "bg-slate-100 text-slate-600 hover:bg-slate-200";
  };

  return (
    <motion.button
      onClick={handleBookmark}
      className={`rounded-lg p-2 transition-all duration-200 ${getButtonStyle()}`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <FiBookmark className="h-4 w-4" />
    </motion.button>
  );
}
