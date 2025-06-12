"use client";

import { FaCamera, FaDesktop, FaBlog } from "react-icons/fa";
import Image from "next/image";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "~/i18n/navigation";
import type { ReactNode } from "react";

interface HeaderProps {
  firstColor: string;
  secondColor: string;
  hideLogo?: boolean;
  showTopBorder?: boolean;
}

interface NavButtonProps {
  href: string;
  isActive: boolean;
  firstColor: string;
  secondColor?: string;
  children: ReactNode;
  blogColors?: boolean;
}

function NavButton({
  href,
  isActive,
  firstColor,
  children,
  blogColors = false,
}: NavButtonProps) {
  const borderColor =
    blogColors && isActive ? "#4ecdc4" : isActive ? firstColor : "transparent";

  return (
    <Link
      href={href}
      className={`flex items-center space-x-1.5 transition-all duration-200 hover:underline ${
        isActive ? "text-gradient" : "head-icon"
      }`}
      style={{
        zIndex: 10,
        border: "1px solid",
        borderColor,
        borderRadius: "0.5rem",
        padding: "0.25rem 0.5rem",
      }}
    >
      {children}
    </Link>
  );
}

export function Header({
  firstColor,
  secondColor,
  hideLogo = false,
  showTopBorder = true,
}: HeaderProps) {
  const t = useTranslations("Header");
  const pathname = usePathname();

  // Determine current page based on pathname
  const isOnTech = pathname === "/tech";
  const isOnPhoto = pathname === "/photo";
  const isOnBlog = pathname === "/blog";

  return (
    <>
      {showTopBorder && (
        <div
          className="h-1"
          style={{
            background: `linear-gradient(90deg, ${firstColor} 0%, ${secondColor} 100%)`,
          }}
        />
      )}
      <header
        className="header-content -mt-3 p-4"
        style={!showTopBorder ? { paddingTop: "1.5rem" } : {}}
      >
        <div className="flex items-center justify-between">
          {/* Logo or Navigation Buttons */}
          {hideLogo ? (
            // When logo is hidden, show navigation buttons in its place
            <nav className="flex items-center space-x-2">
              <NavButton
                href="/tech"
                isActive={isOnTech}
                firstColor={firstColor}
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
              </NavButton>

              <NavButton
                href="/photo"
                isActive={isOnPhoto}
                firstColor={firstColor}
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
              </NavButton>

              <NavButton
                href="/blog"
                isActive={isOnBlog}
                firstColor={firstColor}
                blogColors={true}
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
              </NavButton>
            </nav>
          ) : (
            // When logo is visible, show logo
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
            </button>
          )}

          {/* Right side content */}
          {!hideLogo ? (
            // When logo is visible, show navigation on the right
            <nav
              className="flex items-center space-x-2 text-sm text-gray-800 sm:space-x-4"
              style={{ marginTop: "-1.5rem" }}
            >
              <NavButton
                href="/tech"
                isActive={isOnTech}
                firstColor={firstColor}
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
              </NavButton>

              <NavButton
                href="/photo"
                isActive={isOnPhoto}
                firstColor={firstColor}
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
              </NavButton>

              <NavButton
                href="/blog"
                isActive={isOnBlog}
                firstColor={firstColor}
                blogColors={true}
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
              </NavButton>

              <div className="">
                <LanguageSwitcher
                  firstColor={firstColor}
                  secondColor={secondColor}
                  theme={isOnPhoto ? "photo" : "default"}
                />
              </div>
            </nav>
          ) : (
            // When logo is hidden, show only language switcher on the right
            <div className="">
              <LanguageSwitcher
                firstColor={firstColor}
                secondColor={secondColor}
                theme={isOnPhoto ? "photo" : "default"}
              />
            </div>
          )}
        </div>
      </header>
    </>
  );
}
