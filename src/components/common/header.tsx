"use client";

import { FaCamera, FaDesktop, FaBlog } from "react-icons/fa";
import Image from "next/image";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "~/i18n/navigation";

interface HeaderProps {
  firstColor: string;
  secondColor: string;
}

export function Header({ firstColor, secondColor }: HeaderProps) {
  const t = useTranslations("Header");
  const pathname = usePathname();

  // Determine current page based on pathname
  const isOnTech = pathname === "/tech";
  const isOnPhoto = pathname === "/photo";
  const isOnBlog = pathname === "/blog";

  return (
    <>
      <div
        className="h-1"
        style={{
          background: `linear-gradient(90deg, ${firstColor} 0%, ${secondColor} 100%)`,
        }}
      />

      <header className="header-content -mt-3 p-4">
        <div className="flex items-center justify-between">
          <button
            aria-label="Home"
            className="z-50 inline-block rounded-full transition-transform hover:scale-105"
            onClick={() => (window.location.href = "/")}
          >
            <Image
              src="/icon.png"
              alt="Logo"
              width={64}
              height={64}
              className="h-16 w-16"
              priority
            />
          </button>{" "}
          <nav className="-mt-6 flex items-center space-x-2 text-sm text-gray-800 sm:space-x-4">
            <Link
              href="/tech"
              className={`flex items-center space-x-1.5 transition-all duration-200 hover:underline ${
                isOnTech ? "text-dev-gradient glow" : "head-icon"
              }`}
              style={{
                zIndex: 10,
                border: "1px solid",
                borderColor: isOnTech ? firstColor : "transparent",
                borderRadius: "0.5rem",
                padding: "0.25rem 0.5rem",
              }}
            >
              <FaDesktop
                className={`mt-0.5 w-4 transition-colors duration-200 ${
                  isOnTech ? "text-gradient" : "head-icon"
                }`}
                style={{
                  color: isOnTech ? firstColor : "",
                }}
              />
              <span className={`${isOnTech ? "" : "hidden"} md:inline`}>
                {t("tech")}
              </span>
            </Link>

            <Link
              href="/photo"
              className={`flex items-center space-x-1.5 transition-all duration-200 hover:underline ${
                isOnPhoto ? "text-photo-gradient" : "head-icon"
              }`}
              style={{
                zIndex: 10,
                border: "1px solid",
                borderColor: isOnPhoto ? firstColor : "transparent",
                borderRadius: "0.5rem",
                padding: "0.25rem 0.5rem",
              }}
            >
              <FaCamera
                className="mt-0.5 w-4 transition-colors duration-200"
                style={{
                  color: isOnPhoto ? secondColor : "",
                }}
              />
              <span className={`${isOnPhoto ? "" : "hidden"} md:inline`}>
                {t("photo")}
              </span>
            </Link>

            <Link
              href="/blog"
              className={`flex items-center space-x-1.5 transition-all duration-200 hover:underline ${
                isOnBlog ? "text-blog-gradient" : "head-icon"
              }`}
              style={{
                zIndex: 10,
                border: "1px solid",
                borderColor: isOnBlog ? "#4ecdc4" : "transparent",
                borderRadius: "0.5rem",
                padding: "0.25rem 0.5rem",
              }}
            >
              <FaBlog
                className="mt-0.5 w-4 transition-colors duration-200"
                style={{
                  color: isOnBlog ? "#45b7d1" : "",
                }}
              />
              <span className={`${isOnBlog ? "" : "hidden"} md:inline`}>
                Blog
              </span>
            </Link>

            <div className="">
              <LanguageSwitcher
                firstColor={firstColor}
                secondColor={secondColor}
              />
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}
