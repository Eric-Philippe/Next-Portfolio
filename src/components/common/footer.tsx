"use client";

import { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTimes } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { getCurrentYear } from "~/lib/utils";
import { EMAIL } from "~/lib/utils";
import LINKS from "~/content/URLs";

interface FooterProps {
  theme?: "dark" | "light";
}

export default function Footer({ theme = "dark" }: FooterProps) {
  const [mentionLegalOpen, setMentionLegalOpen] = useState(false);
  const t = useTranslations("Footer");

  const isDark = theme === "dark";

  return (
    <>
      <footer
        className={`relative border-t backdrop-blur-sm ${
          isDark
            ? "border-white/10 bg-gray-900 text-white"
            : "border-gray-200 bg-white text-gray-900"
        }`}
      >
        <div className="mx-auto max-w-6xl px-6 py-8">
          {/* Main footer content */}
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            {/* Left side - Contact info */}
            <div className="text-center md:text-left">
              <p
                className={`text-sm font-medium ${
                  isDark ? "text-white/90" : "text-gray-900"
                }`}
              >
                Éric WAHL
              </p>
              <p
                className={`text-xs ${
                  isDark ? "text-white/60" : "text-gray-600"
                }`}
              >
                {EMAIL}
              </p>
            </div>

            {/* Center - Social links */}
            <div className="flex items-center space-x-4">
              <a
                href={LINKS.LINKEDIN}
                target="_blank"
                rel="noreferrer"
                className={`group rounded-full border p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? "border-white/20 bg-white/10 hover:bg-white/20"
                    : "border-gray-200 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <FaLinkedin className="h-4 w-4 text-blue-400 transition-colors duration-300 group-hover:text-blue-300" />
              </a>
              <a
                href={LINKS.GITHUB}
                target="_blank"
                rel="noreferrer"
                className={`group rounded-full border p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? "border-white/20 bg-white/10 hover:bg-white/20"
                    : "border-gray-200 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <FaGithub
                  className={`h-4 w-4 transition-colors duration-300 ${
                    isDark
                      ? "text-white group-hover:text-gray-300"
                      : "text-gray-700 group-hover:text-gray-900"
                  }`}
                />
              </a>
              <a
                href={LINKS.INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className={`group rounded-full border p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 ${
                  isDark
                    ? "border-white/20 bg-white/10 hover:bg-white/20"
                    : "border-gray-200 bg-gray-100 hover:bg-gray-200"
                }`}
              >
                <FaInstagram className="h-4 w-4 text-pink-400 transition-colors duration-300 group-hover:text-pink-300" />
              </a>
            </div>

            {/* Right side - Legal */}
            <div className="text-center md:text-right">
              <button
                className={`text-xs transition-colors duration-300 hover:underline ${
                  isDark
                    ? "text-white/60 hover:text-white/80"
                    : "text-gray-600 hover:text-gray-800"
                }`}
                onClick={() => setMentionLegalOpen(true)}
              >
                {t("legalNotice")}
              </button>
              <p
                className={`text-xs ${
                  isDark ? "text-white/40" : "text-gray-400"
                }`}
              >
                © {getCurrentYear()}
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Modern Legal Modal */}
      {mentionLegalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setMentionLegalOpen(false)}
        >
          <div
            className={`relative mx-4 max-w-lg overflow-hidden rounded-3xl border p-6 shadow-2xl backdrop-blur-md lg:p-8 ${
              isDark
                ? "border-white/20 bg-white/10"
                : "border-gray-200 bg-white/90"
            }`}
            style={{
              background: isDark
                ? "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(255, 255, 255, 0.8) 100%)",
              backdropFilter: "blur(20px)",
              border: isDark
                ? "1px solid rgba(255, 255, 255, 0.18)"
                : "1px solid rgba(0, 0, 0, 0.1)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className={`absolute top-4 right-4 rounded-full border p-2 transition-all duration-300 ${
                isDark
                  ? "border-white/20 bg-white/10 text-white/70 hover:bg-white/20 hover:text-white"
                  : "border-gray-200 bg-gray-100 text-gray-600 hover:bg-gray-200 hover:text-gray-900"
              }`}
              onClick={() => setMentionLegalOpen(false)}
            >
              <FaTimes className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2
                className={`text-2xl font-bold ${
                  isDark
                    ? "bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent"
                    : "text-gray-900"
                }`}
              >
                {t("legalModal.title")}
              </h2>
              <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>

            {/* Content */}
            <div
              className={`space-y-4 ${
                isDark ? "text-white/80" : "text-gray-700"
              }`}
            >
              <div>
                <h3
                  className={`mb-2 font-semibold ${
                    isDark ? "text-blue-300" : "text-blue-600"
                  }`}
                >
                  {t("legalModal.editor")}
                </h3>
                <p className="text-sm">
                  Éric WAHL
                  <br />
                  {EMAIL}
                </p>
              </div>

              <div>
                <h3
                  className={`mb-2 font-semibold ${
                    isDark ? "text-purple-300" : "text-purple-600"
                  }`}
                >
                  {t("legalModal.hosting")}
                </h3>
                <p className="text-sm">{t("legalModal.hostingCompany")}</p>
              </div>

              <div>
                <h3
                  className={`mb-2 font-semibold ${
                    isDark ? "text-green-300" : "text-green-600"
                  }`}
                >
                  {t("legalModal.personalData")}
                </h3>
                <p className="text-sm">{t("legalModal.dataPolicy")}</p>
              </div>

              <div>
                <h3
                  className={`mb-2 font-semibold ${
                    isDark ? "text-yellow-300" : "text-yellow-600"
                  }`}
                >
                  {t("legalModal.cookies")}
                </h3>
                <p className="text-sm">{t("legalModal.cookiePolicy")}</p>
              </div>
            </div>

            {/* Close button */}
            <div className="mt-6 flex justify-center">
              <button
                className="rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-2 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-blue-500 hover:to-purple-500"
                onClick={() => setMentionLegalOpen(false)}
              >
                {t("legalModal.close")}
              </button>
            </div>

            {/* Glass reflection effect */}
            <div
              className={`pointer-events-none absolute top-0 left-0 h-1/2 w-full opacity-50 ${
                isDark
                  ? "bg-gradient-to-b from-white/10 to-transparent"
                  : "bg-gradient-to-b from-white/20 to-transparent"
              }`}
            ></div>
          </div>
        </div>
      )}
    </>
  );
}
