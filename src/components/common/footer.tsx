"use client";

import { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin, FaTimes } from "react-icons/fa";
import { useTranslations } from "next-intl";
import LINKS from "../../lib/utils/links";
import { getCurrentYear } from "~/lib/utils/utils";

export default function Footer() {
  const [mentionLegalOpen, setMentionLegalOpen] = useState(false);
  const t = useTranslations("Footer");

  return (
    <>
      <footer className="relative mt-16 border-t border-white/10 bg-black/20 backdrop-blur-sm">
        <div className="mx-auto max-w-6xl px-6 py-8">
          {/* Main footer content */}
          <div className="flex flex-col items-center justify-between space-y-4 md:flex-row md:space-y-0">
            {/* Left side - Contact info */}
            <div className="text-center md:text-left">
              <p className="text-sm font-medium text-white/90">Éric Philippe</p>
              <p className="text-xs text-white/60">ericphlpp@proton.me</p>
            </div>

            {/* Center - Social links */}
            <div className="flex items-center space-x-4">
              <a
                href={LINKS.LINKEDIN}
                target="_blank"
                rel="noreferrer"
                className="group rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/20"
              >
                <FaLinkedin className="h-4 w-4 text-blue-400 transition-colors duration-300 group-hover:text-blue-300" />
              </a>
              <a
                href={LINKS.GITHUB}
                target="_blank"
                rel="noreferrer"
                className="group rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/20"
              >
                <FaGithub className="h-4 w-4 text-white transition-colors duration-300 group-hover:text-gray-300" />
              </a>
              <a
                href={LINKS.INSTAGRAM}
                target="_blank"
                rel="noreferrer"
                className="group rounded-full border border-white/20 bg-white/10 p-2 backdrop-blur-sm transition-all duration-300 hover:scale-110 hover:bg-white/20"
              >
                <FaInstagram className="h-4 w-4 text-pink-400 transition-colors duration-300 group-hover:text-pink-300" />
              </a>
            </div>

            {/* Right side - Legal */}
            <div className="text-center md:text-right">
              <button
                className="text-xs text-white/60 transition-colors duration-300 hover:text-white/80 hover:underline"
                onClick={() => setMentionLegalOpen(true)}
              >
                {t("legalNotice")}
              </button>
              <p className="text-xs text-white/40">© {getCurrentYear()}</p>
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
            className="relative mx-4 max-w-lg overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-md lg:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
              backdropFilter: "blur(20px)",
              border: "1px solid rgba(255, 255, 255, 0.18)",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              className="absolute top-4 right-4 rounded-full border border-white/20 bg-white/10 p-2 text-white/70 transition-all duration-300 hover:bg-white/20 hover:text-white"
              onClick={() => setMentionLegalOpen(false)}
            >
              <FaTimes className="h-4 w-4" />
            </button>

            {/* Header */}
            <div className="mb-6">
              <h2 className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-2xl font-bold text-transparent">
                {t("legalModal.title")}
              </h2>
              <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-blue-500 to-purple-500"></div>
            </div>

            {/* Content */}
            <div className="space-y-4 text-white/80">
              <div>
                <h3 className="mb-2 font-semibold text-blue-300">
                  {t("legalModal.editor")}
                </h3>
                <p className="text-sm">
                  {t("legalModal.name")}
                  <br />
                  ericphlpp@proton.me
                </p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-purple-300">
                  {t("legalModal.hosting")}
                </h3>
                <p className="text-sm">{t("legalModal.hostingCompany")}</p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-green-300">
                  {t("legalModal.personalData")}
                </h3>
                <p className="text-sm">{t("legalModal.dataPolicy")}</p>
              </div>

              <div>
                <h3 className="mb-2 font-semibold text-yellow-300">
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
            <div className="pointer-events-none absolute top-0 left-0 h-1/2 w-full bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>
          </div>
        </div>
      )}
    </>
  );
}
