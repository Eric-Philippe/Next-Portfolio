"use client";

import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import type { DevProject } from "../../types/portfolio";
import { formatDevProjectDate, getTechColor } from "../../lib/utils/utils";
import { getTagsFromString } from "../../lib/utils/tags";
import Image from "next/image";
import { useLocale } from "next-intl";

interface ProjectCardProps {
  project: DevProject;
  onFocus: (index: number) => void;
  index: number;
}

export default function ProjectCard({
  project,
  onFocus,
  index,
}: ProjectCardProps) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const locale = useLocale() as "en" | "fr";

  return (
    <div
      className="h-full w-full overflow-hidden rounded-3xl"
      style={{ opacity: 1, transform: "none" }}
    >
      <div
        className="group relative block h-full min-h-[400px] w-full transform cursor-pointer overflow-hidden rounded-3xl border border-white/20 bg-white/10 px-6 py-4 shadow-lg backdrop-blur-md transition-all duration-500 will-change-transform hover:scale-[1.02] hover:bg-white/20 hover:shadow-2xl focus:outline-none lg:px-8 lg:py-8"
        onClick={() => {
          onFocus(index);
        }}
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
          <div className="absolute inset-0 -translate-x-full -skew-x-12 transform bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
        </div>

        <div className="relative z-20 w-full">
          {/* Header with title and expand button */}
          <div className="mb-4 flex items-start justify-between">
            <h3 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm lg:text-3xl">
              {project[locale].title}
            </h3>
            <div
              className="relative"
              onMouseEnter={() => setIsButtonHovered(true)}
              onMouseLeave={() => setIsButtonHovered(false)}
            >
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-white/30 bg-white/20 text-white shadow-lg backdrop-blur-sm transition-all duration-300 ease-out hover:scale-110 hover:bg-white/30">
                <FaPlus className="h-4 w-4" />
              </button>
              {project.previewImg && (
                <div
                  className={`absolute top-12 right-0 origin-top-right transform transition-all duration-500 ease-out ${
                    isButtonHovered
                      ? "translate-y-0 scale-100 opacity-100"
                      : "-translate-y-2 scale-95 opacity-0"
                  }`}
                  style={{ zIndex: isButtonHovered ? 50 : -1 }}
                >
                  <Image
                    src={project.previewImg}
                    alt="Project preview"
                    width={280}
                    height={180}
                    className="rounded-xl border border-white/20 shadow-2xl"
                    style={{
                      maxWidth: "280px",
                      objectFit: "cover",
                    }}
                    priority={false}
                  />
                </div>
              )}
            </div>
          </div>

          {/* Date */}
          <div className="mb-4 text-sm font-medium text-white/70">
            {formatDevProjectDate(project.date, locale)}
          </div>

          {/* Tags */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag, tagIndex) => {
                const tagInfo = getTagsFromString(tag);
                return (
                  <span
                    key={`${tag}-${tagIndex}`}
                    className="inline-flex items-center rounded-full border border-white/20 px-3 py-1 text-xs font-semibold text-white shadow-md backdrop-blur-sm"
                    style={{
                      background: `linear-gradient(135deg, ${tagInfo.color}, ${tagInfo.secGradientColor})`,
                      borderColor: `${tagInfo.secColor}40`,
                    }}
                  >
                    <span className="mr-1">{tagInfo.emoji}</span>
                    {tagInfo.name}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Technologies */}
          <div className="mb-6">
            <div className="flex flex-wrap gap-2">
              {project.techs.flat().map((tech, techIndex) => (
                <span
                  key={`${tech}-${techIndex}`}
                  className="inline-flex items-center rounded-md border border-white/20 bg-white/10 px-2 py-1 text-xs font-medium text-white/90 backdrop-blur-sm transition-colors duration-200 hover:bg-white/20"
                  style={{
                    borderColor: `${getTechColor(tech)}40`,
                    background: `linear-gradient(135deg, ${getTechColor(tech)}20, rgba(255, 255, 255, 0.1))`,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <p className="text-base leading-relaxed font-light text-white/80">
              {project[locale].shortDesc}
            </p>
          </div>
        </div>

        {/* Glass reflection effect */}
        <div className="pointer-events-none absolute top-0 left-0 h-1/2 w-full bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>
      </div>
    </div>
  );
}
