"use client";

/**
 * WorkspaceSection Component
 * Workspace section with title, interactive photo, and tools/materials
 */

import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";

// Stats data interface
interface PrinterStats {
  print_count: number;
  total_print_time_hours: number;
  fetched_at: string;
}

// Software tools
const software = [
  { name: "Fusion 360", category: "CAD Modeling" },
  { name: "Bambu Studio", category: "Slicing" },
  { name: "Blender", category: "3D Design" },
];

// Materials used
const materials = [
  { name: "PLA", colors: ["Matte", "Silk", "Metallic"] },
  { name: "PETG", colors: ["Translucent", "Opaque"] },
  { name: "TPU", colors: ["Shore 85A/90A/95A"] },
];

// Printer hotspots for interactive photo
interface PrinterHotspot {
  id: string;
  name: string;
  description: string;
  specs: string[];
  position: { x: number; y: number };
}

// Animation variants for staggered children
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

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

function HotspotMarker({
  hotspot,
  isActive,
  onHover,
  onLeave,
}: {
  hotspot: PrinterHotspot;
  isActive: boolean;
  onHover: () => void;
  onLeave: () => void;
}) {
  // Determine tooltip position based on hotspot location
  const isLeftSide = hotspot.position.x < 35;
  const isRightSide = hotspot.position.x > 65;
  const isTopHalf = hotspot.position.y < 50;

  // Tooltip positioning classes
  const getTooltipPositionClasses = () => {
    if (isLeftSide) {
      return "left-full top-1/2 -translate-y-1/2 ml-4";
    }
    if (isRightSide) {
      return "right-full top-1/2 -translate-y-1/2 mr-4";
    }
    if (isTopHalf) {
      return "top-full left-1/2 -translate-x-1/2 mt-4";
    }
    return "bottom-full left-1/2 -translate-x-1/2 mb-4";
  };

  // Arrow positioning
  const getArrowClasses = () => {
    if (isLeftSide) {
      return "right-full top-1/2 -translate-y-1/2 border-r-zinc-900/95 border-t-transparent border-b-transparent border-l-transparent";
    }
    if (isRightSide) {
      return "left-full top-1/2 -translate-y-1/2 border-l-zinc-900/95 border-t-transparent border-b-transparent border-r-transparent";
    }
    if (isTopHalf) {
      return "bottom-full left-1/2 -translate-x-1/2 border-b-zinc-900/95 border-l-transparent border-r-transparent border-t-transparent";
    }
    return "top-full left-1/2 -translate-x-1/2 border-t-zinc-900/95 border-l-transparent border-r-transparent border-b-transparent";
  };

  return (
    <div
      className="absolute z-10 cursor-pointer"
      style={{ left: `${hotspot.position.x}%`, top: `${hotspot.position.y}%` }}
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={() => (isActive ? onLeave() : onHover())}
    >
      {/* Outer pulsing ring */}
      <motion.div
        className="absolute -inset-2 rounded-full border border-amber-400/40 md:-inset-3"
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.4, 0, 0.4],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Middle pulsing ring */}
      <motion.div
        className="absolute -inset-1.5 rounded-full border border-amber-400/30 md:-inset-2"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.3, 0, 0.3],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      />

      {/* Core dot - smaller on mobile */}
      <motion.div
        className={`h-2 w-2 rounded-full transition-colors duration-300 md:h-3 md:w-3 ${
          isActive ? "bg-amber-400" : "bg-amber-500/80"
        }`}
        animate={{
          scale: isActive ? 1.2 : [1, 1.1, 1],
          boxShadow: isActive
            ? "0 0 20px rgba(251, 191, 36, 0.6)"
            : [
                "0 0 8px rgba(251, 191, 36, 0.4)",
                "0 0 12px rgba(251, 191, 36, 0.6)",
                "0 0 8px rgba(251, 191, 36, 0.4)",
              ],
        }}
        transition={{
          duration: 1.5,
          repeat: isActive ? 0 : Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Tooltip */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`absolute z-20 w-48 md:w-auto md:whitespace-nowrap ${getTooltipPositionClasses()}`}
          >
            <div className="rounded-xl border border-amber-900/30 bg-zinc-900/95 p-3 shadow-2xl backdrop-blur-xl md:p-4">
              <h4 className="mb-1 font-serif text-xs font-medium text-amber-50 md:text-sm">
                {hotspot.name}
              </h4>
              <p className="mb-2 text-[10px] leading-tight text-stone-400 md:mb-3 md:text-xs">
                {hotspot.description}
              </p>
              <ul className="space-y-0.5 md:space-y-1">
                {hotspot.specs.map((spec, index) => (
                  <li
                    key={index}
                    className="flex items-center gap-1.5 text-[10px] text-stone-500 md:gap-2 md:text-xs"
                  >
                    <span className="h-0.5 w-0.5 shrink-0 rounded-full bg-amber-500/60 md:h-1 md:w-1" />
                    {spec}
                  </li>
                ))}
              </ul>
              {/* Tooltip arrow */}
              <div className={`absolute border-8 ${getArrowClasses()}`} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export function WorkspaceSection() {
  const t = useTranslations("printing");
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [stats, setStats] = useState<PrinterStats | null>(null);
  const [statsLoading, setStatsLoading] = useState(true);

  const printerHotspots: PrinterHotspot[] = [
    {
      id: "printer-1",
      name: t("printers.x1carbon.name"),
      description: t("printers.x1carbon.description"),
      specs: [
        t("printers.x1carbon.spec1"),
        t("printers.x1carbon.spec2"),
        t("printers.x1carbon.spec3"),
      ],
      position: { x: 28, y: 33 },
    },
    {
      id: "printer-2",
      name: t("printers.h2c.name"),
      description: t("printers.h2c.description"),
      specs: [
        t("printers.h2c.spec1"),
        t("printers.h2c.spec2"),
        t("printers.h2c.spec3"),
      ],
      position: { x: 53, y: 50 },
    },
    {
      id: "printer-3",
      name: t("printers.a1mini.name"),
      description: t("printers.a1mini.description"),
      specs: [
        t("printers.a1mini.spec1"),
        t("printers.a1mini.spec2"),
        t("printers.a1mini.spec3"),
      ],
      position: { x: 82, y: 75 },
    },
  ];

  useEffect(() => {
    async function fetchStats() {
      try {
        if (localStorage.getItem("printerStats")) {
          const cachedStats = JSON.parse(
            localStorage.getItem("printerStats") ?? "",
          ) as PrinterStats;

          if (cachedStats.fetched_at) {
            const fetchedAt = new Date(cachedStats.fetched_at);
            const now = new Date();
            const diffHours =
              (now.getTime() - fetchedAt.getTime()) / (1000 * 60 * 60); // in hours

            // Use cached stats if fetched within the last 4 hours
            if (diffHours < 4) {
              setStats(cachedStats);
              setStatsLoading(false);
              return;
            }
          }
        }

        const response = await fetch(
          "https://makerworld-stats.homeserver-ericp.fr/stats?username=ericp_",
        );
        const data = (await response.json()) as PrinterStats;
        data.fetched_at = new Date().toISOString();
        setStats(data);
        localStorage.setItem("printerStats", JSON.stringify(data));
      } catch (error) {
        console.error("Failed to fetch printer stats:", error);
      } finally {
        setStatsLoading(false);
      }
    }
    void fetchStats();
  }, []);

  return (
    <section className="relative">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-zinc-900/95 to-black" />

      {/* Section header */}
      <div className="relative z-10 px-6 pt-24 pb-12">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="mb-4 font-serif text-4xl font-light text-amber-50 md:text-5xl">
              {t("workbench.title")}
            </h2>
            <p className="mx-auto max-w-2xl font-light text-stone-400">
              {t("workbench.subtitle")}
            </p>
          </motion.div>
        </div>
      </div>

      {/* Software & Materials Grid */}
      <div className="relative z-10 px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid auto-rows-[minmax(180px,auto)] grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4"
          >
            {/* Software Section */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="relative h-full overflow-hidden rounded-[2rem] border border-amber-900/20 bg-zinc-900/50 p-6 backdrop-blur-xl">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-stone-800/20 via-transparent to-transparent" />

                <div className="relative z-10">
                  <h3 className="mb-4 font-serif text-lg text-amber-50">
                    {t("workbench.software")}
                  </h3>

                  <div className="space-y-3">
                    {software.map((tool, i) => (
                      <div
                        key={i}
                        className="flex items-center justify-between border-b border-amber-900/10 py-2 last:border-0"
                      >
                        <span className="text-sm text-stone-200">
                          {tool.name}
                        </span>
                        <span className="text-xs text-stone-500">
                          {tool.category}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Materials Section - Spanning 2 cols */}
            <motion.div
              variants={itemVariants}
              className="md:col-span-2 lg:col-span-2"
            >
              <div className="relative h-full overflow-hidden rounded-[2rem] border border-amber-900/20 bg-zinc-900/50 p-6 backdrop-blur-xl">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-stone-800/20 via-transparent to-transparent" />

                <div className="relative z-10">
                  <h3 className="mb-4 font-serif text-lg text-amber-50">
                    {t("workbench.materials")}
                  </h3>

                  <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                    {materials.map((material, i) => (
                      <div
                        key={i}
                        className="rounded-[1rem] border border-amber-900/10 bg-neutral-800/30 p-4"
                      >
                        <h4 className="mb-2 font-medium text-amber-50">
                          {material.name}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {material.colors.map((color, j) => (
                            <span
                              key={j}
                              className="rounded-full bg-slate-700/50 px-2 py-0.5 text-xs text-slate-400"
                            >
                              {color}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Stats Section */}
            <motion.div variants={itemVariants} className="lg:col-span-1">
              <div className="relative h-full overflow-hidden rounded-[2rem] border border-amber-900/20 bg-zinc-900/50 p-6 backdrop-blur-xl">
                <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-amber-900/10 via-transparent to-transparent" />

                <div className="relative z-10 flex h-full flex-col">
                  <h3 className="mb-4 font-serif text-lg text-amber-50">
                    {t("workbench.statsTitle")}
                  </h3>

                  {statsLoading ? (
                    <div className="flex flex-1 items-center justify-center">
                      <motion.div
                        className="h-8 w-8 rounded-full border-2 border-amber-500/30 border-t-amber-500"
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      />
                    </div>
                  ) : stats ? (
                    <div className="flex flex-1 flex-col justify-center space-y-6">
                      {/* Print Count */}
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.2 }}
                          className="mb-1 font-serif text-3xl font-light text-amber-400"
                        >
                          {stats != null && stats.print_count != null ? stats.print_count.toLocaleString() : "0"}
                        </motion.div>
                        <p className="text-xs tracking-wider text-stone-500 uppercase">
                          {t("workbench.statsPrints")}
                        </p>
                      </div>

                      {/* Divider */}
                      <div className="mx-auto h-px w-16 bg-gradient-to-r from-transparent via-amber-900/40 to-transparent" />

                      {/* Print Time */}
                      <div className="text-center">
                        <motion.div
                          initial={{ scale: 0.5, opacity: 0 }}
                          whileInView={{ scale: 1, opacity: 1 }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.5, delay: 0.3 }}
                          className="mb-1 font-serif text-3xl font-light text-amber-400"
                        >
                          {stats != null && stats.total_print_time_hours != null ? stats.total_print_time_hours.toLocaleString() : "0"}
                        </motion.div>
                        <p className="text-xs tracking-wider text-stone-500 uppercase">
                          {t("workbench.statsHours")}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-1 items-center justify-center text-sm text-stone-500">
                      {t("workbench.statsUnavailable")}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Interactive Workspace Photo */}
      <div className="relative z-10 w-full overflow-visible">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative aspect-[16/9] w-full"
        >
          {/* Image container */}
          <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-neutral-900 to-black">
            {/* Placeholder pattern */}
            <div className="absolute inset-0 opacity-20">
              <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
                <defs>
                  <pattern
                    id="workspace-grid"
                    width="40"
                    height="40"
                    patternUnits="userSpaceOnUse"
                  >
                    <path
                      d="M 40 0 L 0 0 0 40"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="0.5"
                      className="text-zinc-700"
                    />
                  </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#workspace-grid)" />
              </svg>
            </div>

            {/* Full-width image */}
            <Image
              src="/images/3dprinting/workbench.jpg"
              alt={"Workspace with 3D printers and tools"}
              fill
              className="object-cover object-bottom"
              priority
            />
          </div>

          {/* Gradient overlays for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-zinc-950/50" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />

          {/* Interactive hotspots for printers */}
          {printerHotspots.map((hotspot) => (
            <HotspotMarker
              key={hotspot.id}
              hotspot={hotspot}
              isActive={activeHotspot === hotspot.id}
              onHover={() => setActiveHotspot(hotspot.id)}
              onLeave={() => setActiveHotspot(null)}
            />
          ))}

          {/* Caption card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="absolute top-8 right-8 hidden max-w-md md:block"
          >
            <div className="rounded-[1.5rem] border border-amber-900/20 bg-zinc-900/60 p-6 backdrop-blur-xl">
              <h3 className="mb-2 font-serif text-lg text-amber-50">
                {t("workspace.title")}
              </h3>
              <p className="text-sm font-light text-stone-400">
                {t("workspace.description")}
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
