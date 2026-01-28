"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useRef, useCallback, useState, useEffect } from "react";
import {
  ArrowRight,
  Github,
  ExternalLink,
  Code,
  Camera,
  BookOpen,
} from "lucide-react";
import { Link } from "~/i18n/navigation";
import { LanguageSwitcher } from "~/components/common/language-switcher";
import URLS from "~/content/URLs";
import { getRandomYearDisplay } from "~/lib/utils";
import { FaCube } from "react-icons/fa";

interface LinkCardProps {
  href: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  isExternal?: boolean;
  gradient: string;
  delay: number;
}

function LinkCard({
  href,
  title,
  description,
  icon,
  isExternal = false,
  gradient,
  delay,
}: LinkCardProps) {
  const shineRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = useCallback(() => {
    if (shineRef.current) {
      // Remove any existing animation class
      shineRef.current.classList.remove("animate");
      // Force reflow to ensure the class is removed
      void shineRef.current.offsetHeight;
      // Add the animation class
      shineRef.current.classList.add("animate");
    }
  }, []);

  const handleAnimationEnd = useCallback(() => {
    if (shineRef.current) {
      shineRef.current.classList.remove("animate");
    }
  }, []);

  const CardComponent = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{
        scale: 1.02,
        transition: { duration: 0.3, ease: "easeOut" },
      }}
      whileTap={{
        scale: 0.98,
        transition: { duration: 0.15, ease: "easeOut" },
      }}
      className="group link-tree-card will-change-transform"
      style={{ transformOrigin: "center" }}
      onMouseEnter={handleMouseEnter}
    >
      <CardComponent
        {...linkProps}
        className="liquid-glass relative block h-full overflow-hidden rounded-2xl p-6 transition-all duration-300 ease-out"
      >
        {/* Liquid Glass shine effect */}
        <div
          ref={shineRef}
          className="shine-effect rounded-2xl"
          onAnimationEnd={handleAnimationEnd}
        />

        {/* Liquid ripple effect */}
        <div className="liquid-ripple" />

        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-25 ${gradient}`}
        />

        {/* Inner glow effect */}
        <div
          className="absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-60"
          style={{
            background:
              "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.1) 0%, transparent 50%)",
          }}
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-xl border border-white/30 bg-white/20 p-3 backdrop-blur-sm transition-all duration-300 group-hover:border-white/40 group-hover:bg-white/30 group-hover:shadow-lg group-hover:shadow-black/20">
              {icon}
            </div>
            <ArrowRight className="h-5 w-5 text-white/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white group-hover:drop-shadow-lg" />
          </div>

          <h3 className="mb-2 text-xl font-semibold text-white/95 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-sm">
            {title}
          </h3>

          <p className="text-sm leading-relaxed text-white/80 transition-all duration-300 group-hover:text-white/90">
            {description}
          </p>
        </div>
      </CardComponent>
    </motion.div>
  );
}

interface StatusBadgeProps {
  text: string;
}

function StatusBadge({ text }: StatusBadgeProps) {
  const getStatusConfig = () => {
    return {
      color: "bg-green-500",
      glow: "shadow-green-500/50",
      gradient: "from-green-500/20 to-emerald-500/20",
    };
  };

  const { color, glow } = getStatusConfig();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mx-auto flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 backdrop-blur-sm"
    >
      {/* Status indicator dot */}
      <div className="relative">
        <div className={`h-3 w-3 rounded-full ${color} shadow-lg ${glow}`} />
        {/* Animated pulse ring */}
        <div
          className={`absolute inset-0 h-3 w-3 animate-pulse rounded-full ${color} opacity-75`}
        />
        <div
          className={`absolute -inset-1 h-5 w-5 animate-ping rounded-full ${color} opacity-20`}
        />
      </div>

      {/* Status text */}
      <span className="text-sm font-medium text-white/90">{text}</span>
    </motion.div>
  );
}

export default function HomePageClient() {
  const t = useTranslations("LinkTree");

  const portfolioLinks = [
    {
      href: "/tech",
      title: t("portfolio.tech.title"),
      description: t("portfolio.tech.description"),
      icon: <Code className="h-6 w-6 text-blue-400" />,
      gradient: "bg-gradient-to-br from-blue-500/20 to-purple-500/20",
      delay: 0.1,
    },
    {
      href: "/photo",
      title: t("portfolio.photo.title"),
      description: t("portfolio.photo.description"),
      icon: <Camera className="h-6 w-6 text-pink-400" />,
      gradient: "bg-gradient-to-br from-pink-500/20 to-orange-500/20",
      delay: 0.2,
    },
    {
      href: "/3dprinting",
      title: t("portfolio.3dprinting.title"),
      description: t("portfolio.3dprinting.description"),
      icon: <FaCube className="h-6 w-6 text-amber-400" />,
      gradient: "bg-gradient-to-br from-purple-500/20 to-indigo-500/20",
      delay: 0.3,
    },
  ];

  const externalLinks = [
    {
      href: "/blog",
      title: t("portfolio.blog.title"),
      description: t("portfolio.blog.description"),
      icon: <BookOpen className="h-6 w-6 text-green-400" />,
      gradient: "bg-gradient-to-br from-green-500/20 to-teal-500/20",
      delay: 0.3,
    },
    {
      href: URLS.GITHUB,
      title: t("external.github.title"),
      description: t("external.github.description"),
      icon: <Github className="h-6 w-6 text-white" />,
      isExternal: true,
      gradient: "bg-gradient-to-br from-gray-500/20 to-gray-700/20",
      delay: 0.4,
    },
    {
      href: URLS.LAST_PROJECT,
      title: t("external.latest.title"),
      description: t("external.latest.description"),
      icon: <ExternalLink className="h-6 w-6 text-purple-400" />,
      isExternal: true,
      gradient: "bg-gradient-to-br from-purple-500/20 to-indigo-500/20",
      delay: 0.5,
    },
  ];

  // Fix hydration error: only set random year display on client
  const [yearDisplay, setYearDisplay] = useState<string | null>(null);
  useEffect(() => {
    setYearDisplay(getRandomYearDisplay());
  }, []);

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/30 to-slate-900">
      {/* Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 rounded-full bg-blue-500/15 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-64 w-64 rounded-full bg-purple-500/15 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 transform rounded-full bg-pink-500/10 blur-3xl" />
        {/* Additional subtle pattern overlay */}
        <div className="absolute inset-0 bg-black/10" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-16 flex cursor-pointer items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            onClick={() => {
              setYearDisplay(getRandomYearDisplay());
            }}
          >
            <h1 className="text-2xl font-bold text-white">Eric Philippe</h1>
            <span className="curosor-alias mt-1 block text-sm text-white/70">
              {yearDisplay ?? ""}
            </span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <LanguageSwitcher
              firstColor="text-white/80"
              secondColor="text-white"
            />
          </motion.div>
        </div>

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-bold text-white md:text-6xl">
            {t("welcome")}{" "}
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              {t("universe")}
            </span>
          </h2>
          <p className="mx-auto max-w-2xl text-xl text-white/70">
            {t("subtitle")}
          </p>
        </motion.div>

        {/* Status Badge */}
        <div className="mb-12 text-center">
          <StatusBadge text={t("available")} />
        </div>

        {/* Portfolio Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mx-auto mb-12 max-w-4xl"
        >
          <div className="grid gap-6 md:grid-cols-3">
            {portfolioLinks.map((link) => (
              <LinkCard key={link.href} {...link} />
            ))}
          </div>
        </motion.div>

        {/* External Links */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mx-auto mb-12 max-w-4xl"
        >
          <div className="grid gap-6 md:grid-cols-3">
            {externalLinks.map((link) => (
              <LinkCard key={link.href} {...link} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
