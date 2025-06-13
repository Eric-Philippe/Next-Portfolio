"use client";

import { useState, useEffect } from "react";
import ProjectCard from "./project-card";
import { ALL_TAGS, getEmojiFromTag } from "../../lib/utils/tags";
import { fetchProjects } from "../../lib/data/projects";
import type { DevProject, DevProjectTags } from "../../types/portfolio";
import { useTranslations } from "next-intl";

interface ProjectsSectionProps {
  onProjectFocus: (index: number) => void;
}

export default function ProjectsSection({
  onProjectFocus,
}: ProjectsSectionProps) {
  const [categoriesVisible, setCategoriesVisible] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<
    Set<DevProjectTags>
  >(new Set());
  const [showAllProjects, setShowAllProjects] = useState(false);
  const [sortByDate, setSortByDate] = useState(false);
  const [projects, setProjects] = useState<DevProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const INITIAL_PROJECTS_COUNT = 6;

  const t = useTranslations("DevPortfolio");
  // Fetch projects on component mount
  useEffect(() => {
    const loadProjects = async () => {
      setIsLoading(true);
      try {
        const projectsData = await fetchProjects();
        setProjects(projectsData);
      } catch (error) {
        console.error("Error loading projects:", error);
        setProjects([]);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProjects();
  }, []);

  const toggleCategories = () => {
    setCategoriesVisible(!categoriesVisible);
  };

  const toggleCategory = (category: DevProjectTags) => {
    const newSelected = new Set(selectedCategories);
    if (newSelected.has(category)) {
      newSelected.delete(category);
    } else {
      newSelected.add(category);
    }
    setSelectedCategories(newSelected);
  };

  const clearAllCategories = () => {
    setSelectedCategories(new Set());
  };

  const toggleShowAllProjects = () => {
    setShowAllProjects(!showAllProjects);
  };

  const toggleSortByDate = () => {
    setSortByDate(!sortByDate);
  };

  const isAllSelected = selectedCategories.size === 0;

  // Filter projects based on selected categories
  let filteredProjects = projects.filter((project) =>
    selectedCategories.size === 0
      ? true
      : project.tags.some((tag) => selectedCategories.has(tag)),
  );

  // Sort projects by date if enabled
  if (sortByDate) {
    filteredProjects = [...filteredProjects].sort((a, b) => {
      // Convert date strings to comparable format (YYYY/MM)
      const dateA = new Date(a.date.replace("/", "/01/")).getTime();
      const dateB = new Date(b.date.replace("/", "/01/")).getTime();
      return dateB - dateA; // Most recent first
    });
  }

  // Determine which projects to show
  const projectsToShow = showAllProjects
    ? filteredProjects
    : filteredProjects.slice(0, INITIAL_PROJECTS_COUNT);

  const hasMoreProjects = filteredProjects.length > INITIAL_PROJECTS_COUNT;

  return (
    <section className="mb-5 scroll-mt-8 lg:scroll-mt-0">
      <div className="overflow-hidden px-0 lg:px-4">
        <div
          className="relative z-0 py-12 lg:rounded-3xl lg:py-24"
          style={{
            background:
              "linear-gradient(135deg, #0f172a 0%, #1e293b 25%, #334155 50%, #1e293b 75%, #0f172a 100%)",
          }}
        >
          {/* Subtle animated background pattern */}
          <div className="absolute inset-0 opacity-[0.03]">
            <div
              className="absolute inset-0 rounded-3xl"
              style={{
                backgroundImage: `radial-gradient(circle at 25% 25%, rgba(59, 130, 246, 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)`,
                backgroundSize: "400px 400px",
                animation: "float 20s ease-in-out infinite",
              }}
            ></div>
          </div>

          {/* Top border glow */}
          <div className="absolute top-0 right-0 left-0 h-px bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>

          <div className="project-container relative z-10">
            <div className="grid grid-cols-12">
              <div className="col-span-12 mb-8 lg:col-span-10 lg:col-start-2">
                <div className="relative mb-12">
                  {/* Glowing background for title */}
                  <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-50 blur-2xl"></div>
                  <h2
                    className="relative z-10 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-5xl leading-relaxed font-bold text-transparent drop-shadow-2xl lg:text-6xl"
                    id="realisations"
                  >
                    {t("projects")}
                  </h2>
                  {/* Subtitle line */}
                  <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg"></div>
                </div>
                {/* @CATEGORIES */}
                <div className="mb-8">
                  {/* Controls container */}
                  <div className="mb-6 flex flex-wrap items-center gap-8">
                    {/* Main toggle button */}
                    <button
                      className={`text-md group flex items-center rounded-full border px-6 py-3 font-medium whitespace-nowrap shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl focus:ring-0 focus:outline-none ${
                        isAllSelected
                          ? "scale-105 border-blue-400/30 text-white shadow-blue-500/20"
                          : "border-white/20 text-white/90 hover:border-white/30 hover:text-white"
                      }`}
                      style={{
                        background: isAllSelected
                          ? "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 197, 253, 0.1) 100%)"
                          : "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                        backdropFilter: "blur(20px)",
                      }}
                      onClick={toggleCategories}
                    >
                      {/* Selected state glow for "all" */}
                      {isAllSelected && (
                        <div className="absolute inset-0 rounded-full bg-blue-400/10 opacity-60 blur-md"></div>
                      )}

                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        strokeWidth="0"
                        viewBox="0 0 512 512"
                        className="mr-2 text-xl opacity-80"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M256 185a167.85 167.85 0 01134.9-18.28C382.36 99.83 325.12 48 256 48S129.64 99.83 121.1 166.67A167.85 167.85 0 01256 185zm80 146.73a167.51 167.51 0 01-52.37 118.08A135 135 0 00344 464c75 0 136-61 136-136a136 136 0 00-59.06-112.08A168.53 168.53 0 01336 331.73zm-52.42-125.54a167.87 167.87 0 0149.36 89.89 136.14 136.14 0 0058.06-95.7 135.87 135.87 0 00-107.43 5.81zM176.05 331.73a168.53 168.53 0 01-85-115.81A136 136 0 0032 328c0 75 61 136 136 136a135 135 0 0060.42-14.19 167.51 167.51 0 01-52.37-118.08zm3.01-35.65a167.87 167.87 0 0149.36-89.89A135.87 135.87 0 00121 200.38a136.14 136.14 0 0058.06 95.7zm123.84 49.25a168.22 168.22 0 01-93.8 0A135.9 135.9 0 00256 431.6a135.9 135.9 0 0046.9-86.27zM209 311.62a136 136 0 0094 0 135.93 135.93 0 00-47-87.22 135.93 135.93 0 00-47 87.22z"></path>
                      </svg>
                      <span className="relative">{t("allCategories")}</span>
                      <svg
                        className={`ml-2 h-4 w-4 transition-transform duration-300 ${categoriesVisible ? "rotate-180" : "rotate-0"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Sort by date toggle */}
                    <button
                      className={`group flex items-center rounded-full border px-4 py-2.5 text-sm font-medium whitespace-nowrap shadow-lg backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-xl focus:ring-0 focus:outline-none ${
                        sortByDate
                          ? "scale-105 border-green-400/30 text-green-300 shadow-green-500/20"
                          : "scale-105 border-purple-400/30 text-purple-300 shadow-purple-500/20"
                      }`}
                      style={{
                        background: sortByDate
                          ? "linear-gradient(135deg, rgba(34, 197, 94, 0.2) 0%, rgba(74, 222, 128, 0.1) 100%)"
                          : "linear-gradient(135deg, rgba(128, 90, 213, 0.2) 0%, rgba(168, 85, 247, 0.1) 100%)",
                        backdropFilter: "blur(20px)",
                      }}
                      onClick={toggleSortByDate}
                    >
                      {/* Selected state glow for sort */}
                      {sortByDate ? (
                        <div className="absolute inset-0 rounded-full bg-green-400/10 opacity-60 blur-md"></div>
                      ) : (
                        <div className="absolute inset-0 rounded-full bg-purple-400/10 opacity-60 blur-md"></div>
                      )}

                      <svg
                        className={`mr-2 h-4 w-4 transition-transform duration-300 ${sortByDate ? "text-green-300" : "text-purple-80"}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d={
                            sortByDate
                              ? "M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                              : "M5 16L3 10l5.5-3L12 4l3.5 3L21 10l-2 6H5zM7.5 13L9 8l3 2 3-2 1.5 5H7.5z"
                          }
                        />
                      </svg>
                      <span className="relative">
                        {sortByDate ? t("filterByDate") : t("filterByFeatured")}
                      </span>
                    </button>
                  </div>

                  {/* Categories */}
                  <div
                    className={`transition-all duration-500 ease-out ${
                      categoriesVisible
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 overflow-hidden opacity-0"
                    }`}
                  >
                    <div className="mb-4 flex flex-wrap items-center justify-start gap-3 px-2 py-4">
                      {/* Category tags */}
                      {ALL_TAGS.map((tag, index) => {
                        const isSelected = selectedCategories.has(tag.type);
                        return (
                          <button
                            key={tag.name}
                            className={`group relative flex items-center rounded-full border px-3 py-1.5 text-xs font-medium backdrop-blur-md transition-all duration-300 hover:scale-105 focus:ring-0 focus:outline-none ${
                              categoriesVisible ? "animate-slideInUp" : ""
                            } ${
                              isSelected
                                ? "scale-105 shadow-xl"
                                : "hover:shadow-md"
                            }`}
                            style={{
                              background: isSelected
                                ? `linear-gradient(135deg, ${tag.color}40, ${tag.color}20)`
                                : `linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)`,
                              borderColor: isSelected
                                ? `${tag.color}70`
                                : "rgba(255, 255, 255, 0.2)",
                              color: isSelected
                                ? tag.color
                                : "rgba(255, 255, 255, 0.8)",
                              animationDelay: `${index * 80}ms`,
                              animationFillMode: "both",
                              backdropFilter: "blur(15px)",
                              boxShadow: isSelected
                                ? `0 8px 32px ${tag.color}25, 0 4px 16px ${tag.color}20`
                                : undefined,
                            }}
                            onClick={() => toggleCategory(tag.type)}
                          >
                            {/* Selected state glow */}
                            {isSelected && (
                              <div
                                className="absolute inset-0 rounded-full opacity-60 blur-sm"
                                style={{
                                  background: `${tag.color}30`,
                                }}
                              ></div>
                            )}

                            {/* Hover effect overlay */}
                            <div
                              className="absolute inset-0 rounded-full opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                              style={{
                                background: `linear-gradient(135deg, ${tag.color}15, transparent)`,
                              }}
                            ></div>

                            <div className="relative flex items-center space-x-1.5">
                              <span
                                className={`text-sm ${
                                  isSelected
                                    ? "scale-110 opacity-100"
                                    : "opacity-80"
                                } transition-all duration-300 group-hover:scale-110 group-hover:opacity-100`}
                              >
                                {getEmojiFromTag(tag)}
                              </span>
                              <span
                                className={`leading-none font-medium ${
                                  isSelected ? "opacity-100" : "opacity-90"
                                } transition-opacity duration-300 group-hover:opacity-100`}
                              >
                                {tag.name}
                              </span>
                            </div>
                          </button>
                        );
                      })}

                      {/* Clear all button - positioned after the last tag */}
                      {selectedCategories.size > 0 && (
                        <button
                          className="animate-slideInUp flex items-center rounded-full border px-3 py-1.5 text-xs font-medium shadow-md backdrop-blur-md transition-all duration-300 hover:scale-105 hover:shadow-lg focus:ring-0 focus:outline-none"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(248, 113, 113, 0.1) 100%)",
                            borderColor: "rgba(239, 68, 68, 0.3)",
                            color: "rgb(239, 68, 68)",
                            backdropFilter: "blur(15px)",
                            animationDelay: `${ALL_TAGS.length * 80}ms`,
                            animationFillMode: "both",
                          }}
                          onClick={clearAllCategories}
                        >
                          <span className="mr-1.5">🗑️</span>
                          <span>Effacer</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>{" "}
                {/* @PROJECTS */}
                {isLoading ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="h-12 w-12 animate-spin rounded-full border-4 border-white/20 border-t-blue-500"></div>
                      <p className="text-lg text-white/70">
                        Loading projects...
                      </p>
                    </div>
                  </div>
                ) : projects.length === 0 ? (
                  <div className="flex items-center justify-center py-16">
                    <div className="flex flex-col items-center space-y-4">
                      <div className="text-6xl">😔</div>
                      <p className="text-lg text-white/70">No projects found</p>
                      <p className="text-sm text-white/50">
                        There might be an issue loading the data
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2 lg:gap-10 xl:grid-cols-2 2xl:grid-cols-3">
                    {projectsToShow.map((project, index) => (
                      <div
                        key={`${project.en.title}-${index}`}
                        className={`transform transition-all duration-700 ease-out ${
                          index >= INITIAL_PROJECTS_COUNT && showAllProjects
                            ? "animate-slideInUp"
                            : ""
                        }`}
                        style={{
                          animationDelay:
                            index >= INITIAL_PROJECTS_COUNT
                              ? `${(index - INITIAL_PROJECTS_COUNT) * 150}ms`
                              : "0ms",
                          animationFillMode: "both",
                        }}
                      >
                        <ProjectCard
                          project={project}
                          onFocus={onProjectFocus}
                          index={index}
                        />
                      </div>
                    ))}
                  </div>
                )}
                {/* See More Button */}
                {hasMoreProjects && (
                  <div className="mt-12 flex justify-center">
                    <button
                      onClick={toggleShowAllProjects}
                      className="group relative overflow-hidden rounded-full border border-white/30 px-8 py-4 font-medium text-white shadow-lg backdrop-blur-md transition-all duration-500 hover:scale-105 hover:shadow-xl focus:ring-0 focus:outline-none"
                      style={{
                        background: showAllProjects
                          ? "linear-gradient(135deg, rgba(239, 68, 68, 0.2) 0%, rgba(248, 113, 113, 0.1) 100%)"
                          : "linear-gradient(135deg, rgba(59, 130, 246, 0.2) 0%, rgba(147, 197, 253, 0.1) 100%)",
                        borderColor: showAllProjects
                          ? "rgba(239, 68, 68, 0.4)"
                          : "rgba(59, 130, 246, 0.4)",
                        backdropFilter: "blur(20px)",
                      }}
                    >
                      {/* Background glow effect */}
                      <div
                        className="absolute inset-0 rounded-full opacity-60 blur-md transition-all duration-500"
                        style={{
                          background: showAllProjects
                            ? "rgba(239, 68, 68, 0.1)"
                            : "rgba(59, 130, 246, 0.1)",
                        }}
                      ></div>

                      {/* Hover shimmer effect */}
                      <div className="absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100">
                        <div className="absolute inset-0 -translate-x-full -skew-x-12 transform bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-1000 group-hover:translate-x-full"></div>
                      </div>

                      <div className="relative flex items-center space-x-3">
                        <span className="text-lg transition-transform duration-300 group-hover:scale-110">
                          {showAllProjects ? "🔼" : "🔽"}
                        </span>
                        <span className="font-semibold tracking-wide">
                          {showAllProjects
                            ? t("seeLess")
                            : t("seeMore", {
                                count:
                                  filteredProjects.length -
                                  INITIAL_PROJECTS_COUNT,
                              })}
                        </span>
                        <svg
                          className={`h-5 w-5 transition-transform duration-500 ${
                            showAllProjects ? "rotate-180" : "rotate-0"
                          }`}
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Bottom gradient fade */}
          <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-20 rounded-b-3xl bg-gradient-to-t from-slate-900/30 to-transparent"></div>
        </div>
      </div>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          50% {
            transform: translateY(-10px) rotate(2deg);
          }
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .animate-slideInUp {
          animation: slideInUp 0.6s ease-out forwards;
        }
      `}</style>
    </section>
  );
}
