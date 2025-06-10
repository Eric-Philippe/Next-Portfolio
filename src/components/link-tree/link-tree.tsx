"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
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
  const CardComponent = isExternal ? "a" : Link;
  const linkProps = isExternal
    ? { href, target: "_blank", rel: "noopener noreferrer" }
    : { href };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group"
    >
      <CardComponent
        {...linkProps}
        className="relative block h-full overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-6 backdrop-blur-md transition-all duration-300 hover:border-white/30 hover:bg-white/15 hover:shadow-xl hover:shadow-black/20"
      >
        <div
          className={`absolute inset-0 opacity-10 transition-opacity duration-300 group-hover:opacity-30 ${gradient}`}
        />

        <div className="relative z-10 flex h-full flex-col">
          <div className="mb-4 flex items-center justify-between">
            <div className="rounded-xl border border-white/20 bg-white/15 p-3 backdrop-blur-sm transition-colors group-hover:border-white/30 group-hover:bg-white/20">
              {icon}
            </div>
            <ArrowRight className="h-5 w-5 text-white/70 transition-all duration-300 group-hover:translate-x-1 group-hover:text-white" />
          </div>

          <h3 className="mb-2 text-xl font-semibold text-white/95 transition-colors group-hover:text-white">
            {title}
          </h3>

          <p className="text-sm leading-relaxed text-white/80 transition-colors group-hover:text-white/90">
            {description}
          </p>
        </div>
      </CardComponent>
    </motion.div>
  );
}

export function LinkTree() {
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
      href: "/blog",
      title: t("portfolio.blog.title"),
      description: t("portfolio.blog.description"),
      icon: <BookOpen className="h-6 w-6 text-green-400" />,
      gradient: "bg-gradient-to-br from-green-500/20 to-teal-500/20",
      delay: 0.3,
    },
  ];

  const externalLinks = [
    {
      href: "https://github.com/Eric-Philippe",
      title: t("external.github.title"),
      description: t("external.github.description"),
      icon: <Github className="h-6 w-6 text-white" />,
      isExternal: true,
      gradient: "bg-gradient-to-br from-gray-500/20 to-gray-700/20",
      delay: 0.4,
    },
    {
      href: "https://your-latest-project.com",
      title: t("external.latest.title"),
      description: t("external.latest.description"),
      icon: <ExternalLink className="h-6 w-6 text-purple-400" />,
      isExternal: true,
      gradient: "bg-gradient-to-br from-purple-500/20 to-indigo-500/20",
      delay: 0.5,
    },
  ];

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
        <div className="mb-16 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-2xl font-bold text-white">Eric Philippe</h1>
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
          className="mx-auto max-w-2xl"
        >
          <div className="grid gap-6 md:grid-cols-2">
            {externalLinks.map((link) => (
              <LinkCard key={link.href} {...link} />
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
