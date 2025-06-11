"use client";

import { useState } from "react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaDownload,
  FaMapMarkerAlt,
  FaBirthdayCake,
} from "react-icons/fa";
import { MdEmail, MdSchool, MdWork } from "react-icons/md";
import Image from "next/image";
import AnimatedProgressBar from "../common/animated-progress-bar";
import LINKS from "../../lib/utils/links";
import { useTranslations } from "next-intl";
import { getMyAge } from "~/lib/utils/utils";

export default function AboutSection() {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations("DevPortfolio.About");

  const timelineItems = [
    {
      period: "2025 - Présent",
      title: t("eko.title"),
      company: t("eko.subtitle"),
      description: t("eko.description"),
      color1: "#f9ce22",
      color2: "#ed4e50",
      percentage: 25,
      icon: MdWork,
    },
    {
      period: "2024 - 2026",
      title: t("ynov.title"),
      company: t("ynov.subtitle"),
      description: t("ynov.description"),
      color1: "#f9ce22",
      color2: "#ed4e50",
      percentage: 53,
      icon: MdSchool,
    },
    {
      period: "2021 - 2026",
      title: t("adp.title"),
      company: t("adp.subtitle"),
      description: t("adp.description"),
      color1: "#ffac1d",
      color2: "#ed4e50",
      percentage: 75,
      icon: MdWork,
    },
    {
      period: "2021 - 2024",
      title: t("but.title"),
      company: t("but.subtitle"),
      description: t("but.description"),
      color1: "#9867f0",
      color2: "#ed4e50",
      percentage: 100,
      icon: MdSchool,
    },
    {
      period: "2020 - 2021",
      title: t("bac.title"),
      company: t("bac.subtitle"),
      description: t("bac.description"),
      color1: "#ffac1d",
      color2: "#ed4e50",
      percentage: 100,
      icon: MdSchool,
    },
  ];

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
                {/* Title Section */}
                <div className="relative mb-12">
                  {/* Glowing background for title */}
                  <div className="absolute -inset-4 rounded-2xl bg-gradient-to-r from-blue-500/20 via-purple-500/20 to-pink-500/20 opacity-50 blur-2xl"></div>
                  <h2
                    className="relative z-10 bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-5xl leading-relaxed font-bold text-transparent drop-shadow-2xl lg:text-6xl"
                    id="about"
                  >
                    {t("title")}
                  </h2>
                  {/* Subtitle line */}
                  <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 shadow-lg"></div>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:gap-12">
                  {/* Profile Section */}
                  <div className="lg:col-span-4">
                    {/* Profile Card */}
                    <div
                      className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:bg-white/20 hover:shadow-2xl"
                      style={{
                        background:
                          "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                        backdropFilter: "blur(20px)",
                        border: "1px solid rgba(255, 255, 255, 0.18)",
                      }}
                    >
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100"></div>

                      {/* Profile Image */}
                      <div className="relative mb-6 flex justify-center">
                        <div className="relative">
                          <div className="h-32 w-32 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 p-1 shadow-2xl">
                            <Image
                              src="https://avatars.githubusercontent.com/u/66321178?v=4"
                              alt="Profile"
                              width={128}
                              height={128}
                              className="h-full w-full rounded-full object-cover"
                              priority
                            />
                          </div>
                          {/* Status indicator */}
                          <div className="absolute right-2 bottom-2 h-6 w-6 rounded-full border-4 border-white bg-green-500 shadow-lg"></div>
                        </div>
                      </div>

                      {/* Name and Title */}
                      <div className="relative z-10 text-center">
                        <h3 className="mb-2 text-2xl font-bold text-white">
                          Éric PHILIPPE
                        </h3>
                        <div className="mb-4 rounded-full bg-gradient-to-r from-blue-500/20 to-purple-500/20 px-4 py-2">
                          <p className="text-lg font-medium text-blue-200">
                            {t("currentRole")}
                          </p>
                        </div>
                        <p className="mb-6 text-white/80">{t("roles")}</p>

                        {/* Quick Info */}
                        <div className="mb-6 space-y-3 text-left">
                          <div className="flex items-center text-white/70">
                            <FaMapMarkerAlt className="mr-3 text-blue-400" />
                            <span>Toulouse, France</span>
                          </div>
                          <div className="flex items-center text-white/70">
                            <MdEmail className="mr-3 text-purple-400" />
                            <span>ericphlpp@proton.me</span>
                          </div>
                          <div className="flex items-center text-white/70">
                            <FaBirthdayCake className="mr-3 text-pink-400" />
                            <span>{getMyAge() + t("years")}</span>
                          </div>
                        </div>

                        {/* Social Links */}
                        <div className="flex justify-center space-x-4">
                          <a
                            href={LINKS.GITHUB}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative overflow-hidden rounded-full border border-white/30 bg-white/20 p-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30"
                          >
                            <FaGithub className="h-5 w-5 text-white transition-transform duration-300 group-hover:rotate-12" />
                          </a>
                          <a
                            href={LINKS.LINKEDIN}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative overflow-hidden rounded-full border border-white/30 bg-white/20 p-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30"
                          >
                            <FaLinkedin className="h-5 w-5 text-blue-400 transition-transform duration-300 group-hover:rotate-12" />
                          </a>
                          <a
                            href={LINKS.INSTAGRAM}
                            target="_blank"
                            rel="noreferrer"
                            className="group relative overflow-hidden rounded-full border border-white/30 bg-white/20 p-3 shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/30"
                          >
                            <FaInstagram className="h-5 w-5 text-pink-400 transition-transform duration-300 group-hover:rotate-12" />
                          </a>
                        </div>
                      </div>

                      {/* Glass reflection effect */}
                      <div className="pointer-events-none absolute top-0 left-0 h-1/2 w-full bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>
                    </div>
                  </div>

                  {/* Timeline Section */}
                  <div className="lg:col-span-5">
                    <div className="relative">
                      <h3 className="mb-8 text-2xl font-bold text-white">
                        Mon Parcours
                      </h3>

                      {/* Timeline */}
                      <div className="relative">
                        {/* Timeline line */}
                        <div className="absolute top-0 bottom-0 left-6 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"></div>

                        <div className="space-y-8">
                          {timelineItems.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                              <div
                                key={index}
                                className="relative flex items-start"
                              >
                                {/* Timeline dot */}
                                <div className="relative z-10 mr-6 flex h-12 w-12 items-center justify-center rounded-full border-2 border-white/30 bg-gradient-to-r from-blue-500/20 to-purple-500/20 shadow-lg backdrop-blur-sm">
                                  <IconComponent className="h-5 w-5 text-white" />
                                </div>

                                {/* Timeline content */}
                                <div
                                  className="flex-1 rounded-xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/10"
                                  style={{
                                    background:
                                      "linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)",
                                  }}
                                >
                                  <div className="mb-2 text-sm font-medium text-blue-300">
                                    {item.period}
                                  </div>
                                  <h4 className="mb-1 text-lg font-semibold text-white">
                                    {item.title}
                                  </h4>
                                  <p className="mb-2 font-medium text-purple-200">
                                    {item.company}
                                  </p>
                                  <p className="mb-3 text-sm text-white/70">
                                    {item.description}
                                  </p>
                                  <AnimatedProgressBar
                                    color1={item.color1}
                                    color2={item.color2}
                                    percentage={item.percentage}
                                  />
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* CV Section */}
                  <div className="lg:col-span-3">
                    <div className="relative">
                      <h3 className="mb-6 text-2xl font-bold text-white">
                        Curriculum Vitae
                      </h3>

                      {/* CV Card */}
                      <div
                        className="group relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-md transition-all duration-500 hover:scale-[1.02] hover:bg-white/20 hover:shadow-2xl"
                        style={{
                          background:
                            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
                          backdropFilter: "blur(20px)",
                          border: "1px solid rgba(255, 255, 255, 0.18)",
                        }}
                      >
                        {/* CV Preview */}
                        <div className="relative mb-6">
                          <Image
                            src="/CV.png"
                            alt="CV Preview"
                            width={300}
                            height={400}
                            className="w-full rounded-xl border border-white/20 shadow-lg transition-all duration-500 ease-in-out"
                            style={{
                              opacity: isHovered ? 0.8 : 1,
                              filter: isHovered ? "blur(2px)" : "blur(0px)",
                            }}
                            onMouseEnter={() => setIsHovered(true)}
                            onMouseLeave={() => setIsHovered(false)}
                          />

                          {/* Download overlay */}
                          <div
                            className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
                              isHovered ? "opacity-100" : "opacity-0"
                            }`}
                          >
                            <button
                              className="flex items-center space-x-2 rounded-full border border-white/30 bg-black/60 px-6 py-3 text-white shadow-lg backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:bg-black/80"
                              onClick={() => {
                                const lienTelechargement =
                                  document.createElement("a");
                                lienTelechargement.href = LINKS.DL_CV;
                                lienTelechargement.download =
                                  "Eric_Philippe_CV.pdf";
                                document.body.appendChild(lienTelechargement);
                                lienTelechargement.click();
                                document.body.removeChild(lienTelechargement);
                              }}
                              onMouseEnter={() => setIsHovered(true)}
                            >
                              <FaDownload className="h-4 w-4" />
                              <span>{t("downloadCV")}</span>
                            </button>
                          </div>
                        </div>

                        {/* CV Info */}
                        <div className="text-center">
                          <p className="mb-2 text-sm text-white/70">
                            {t("lastUpdate")}
                          </p>
                          <p className="font-medium text-blue-300">
                            {t("lastUpdateDate")}
                          </p>
                        </div>

                        {/* Glass reflection effect */}
                        <div className="pointer-events-none absolute top-0 left-0 h-1/2 w-full bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>
                      </div>
                    </div>
                  </div>
                </div>
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
      `}</style>
    </section>
  );
}
