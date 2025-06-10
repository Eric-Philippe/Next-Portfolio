"use client";

import { useState, useEffect } from "react";
import { FaPlus } from "react-icons/fa";
import type { ProjectData } from "../../types/portfolio";
import { getTechColor } from "../../lib/utils/utils";
import Image from "next/image";

interface ProjectCardProps {
  project: ProjectData;
  onFocus: (index: number) => void;
  index: number;
}

export default function ProjectCard({
  project,
  onFocus,
  index,
}: ProjectCardProps) {
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    // Check on mount
    checkIfMobile();

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile);

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);

  return (
    <div
      className="col-span-full overflow-hidden rounded-3xl lg:col-span-1"
      style={{ opacity: 1, transform: "none" }}
    >
      <div
        className="group relative block h-full transform cursor-pointer overflow-hidden rounded-3xl border border-black bg-white px-6 py-4 transition will-change-transform hover:scale-[1.01] focus:outline-none lg:px-14 lg:py-10"
        onClick={() => {
          onFocus(index);
        }}
      >
        <div className="relative z-10 mr-4 w-full lg:mr-8">
          <h3 className="text-3xl font-[900] tracking-tight">
            {project.title.length > 10 && isMobile ? (
              <span className="text-2xl">{project.title}</span>
            ) : (
              project.title
            )}
          </h3>
          <div
            className="relative"
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
          >
            <button className="hover:bg-gh-marketingLight hover:text-gh-marketingDark absolute top-[-30px] -right-1 z-40 rounded-md px-3 py-1 text-sm font-semibold transition-all duration-300 ease-in-out lg:-right-3">
              <FaPlus />
            </button>
            {project.previewImg && (
              <Image
                src={project.previewImg}
                alt="Project preview"
                width={400}
                height={250}
                className={`absolute top-1 right-1 origin-top-right transform transition-all duration-500 ease-in-out ${
                  isButtonHovered
                    ? "scale-150 opacity-100"
                    : "scale-100 opacity-0"
                }`}
                style={{
                  maxWidth: "67%",
                  objectFit: "cover",
                  borderRadius: "10px",
                  zIndex: isButtonHovered ? 50 : -1,
                }}
                priority={false}
              />
            )}
          </div>
          <div className="text-gh-textLight mt-3">{project.date}</div>
          <div className="mt-4">
            <div
              className="inline-block rounded-md px-3 py-2 text-xs font-semibold tracking-widest uppercase"
              style={{
                background: project.tag,
                color: "#fff",
              }}
            >
              {project.tag}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap">
            {project.techs.flat().map((tech, techIndex) => (
              <span
                key={`${tech}-${techIndex}`}
                className="mr-2 mb-3 inline-block rounded-md bg-slate-50 px-2 py-1 text-xs font-semibold text-gray-800"
                style={{
                  borderColor: getTechColor(tech),
                  borderWidth: "1px",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
          <div
            className="mt-5 mb-8 pb-5 text-lg font-light"
            style={{
              fontSize: "1.25rem",
            }}
          >
            {project.shortDesc}
          </div>
          <a
            href={project.gitLink}
            className="absolute right-4 -bottom-6 sm:right-2 lg:-right-1 xl:-bottom-8"
            target="_blank"
            rel="noreferrer"
          >
            <svg
              role="img"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
            >
              <title>GitHub icon</title>
              <path
                fill="currentColor"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.604-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.605-.015 2.905-.015 3.3 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
          </a>
        </div>
        <div className="absolute top-0 right-0 bottom-0 w-[max(30em,50%)] opacity-80">
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 1 1"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient
                id={
                  "pj-" +
                  project.title
                    .replace(/[^a-zA-Z0-9]/g, "")
                    .split(" ")
                    .join("")
                }
                x1="0"
                y1="1"
                x2="1"
                y2="0"
              >
                <stop offset="0" stopColor="#3f3f46"></stop>
                <stop offset="1" stopColor="#6b7280"></stop>
              </linearGradient>
            </defs>
            <path
              d="M0 1 Q 0.8 0.8 1 0 L 1 1 Z"
              fill={`url(#pj-${project.title
                .replace(/[^a-zA-Z0-9]/g, "")
                .split(" ")
                .join("")})`}
            ></path>
          </svg>
          <div className="absolute inset-0 bg-white transition duration-300 will-change-transform group-hover:translate-x-[120%]"></div>
        </div>
      </div>
    </div>
  );
}
