"use client";

import {
  FaCamera,
  FaDesktop,
  FaBlog,
  FaCube,
  FaChevronDown,
} from "react-icons/fa";
import Image from "next/image";
import { LanguageSwitcher } from "./language-switcher";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "~/i18n/navigation";
import type { ReactNode } from "react";
import { useState, useRef, useEffect } from "react";

interface HeaderProps {
  firstColor: string;
  secondColor: string;
  hideLogo?: boolean;
  showTopBorder?: boolean;
}

interface World {
  key: string;
  href: string;
  icon: React.ComponentType<{
    className?: string;
    style?: React.CSSProperties;
  }>;
  color: string;
  labelKey: string;
}

interface WorldsNavigationProps {
  firstColor: string;
  secondColor: string;
  currentWorld: string;
}

function WorldsNavigation({
  firstColor,
  secondColor,
  currentWorld,
}: WorldsNavigationProps) {
  const t = useTranslations("Header");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const worlds: World[] = [
    {
      key: "tech",
      href: "/tech",
      icon: FaDesktop,
      color: firstColor,
      labelKey: "tech",
    },
    {
      key: "photo",
      href: "/photo",
      icon: FaCamera,
      color: secondColor,
      labelKey: "photo",
    },
    {
      key: "3dprinting",
      href: "/3dprinting",
      icon: FaCube,
      color: "#ff6b6b",
      labelKey: "3dprinting",
    },
    {
      key: "blog",
      href: "/blog",
      icon: FaBlog,
      color: "#45b7d1",
      labelKey: "blog",
    },
  ];

  const currentWorldData =
    worlds.find((w) => w.key === currentWorld) || worlds[0]!;
  const isDarkMode = currentWorld === "photo";

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative min-w-[140px] md:min-w-[240px]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsOpen(true)}
        className={`group flex w-full items-center gap-1.5 rounded-lg border px-2 py-1.5 transition-all duration-300 sm:gap-2 sm:px-4 sm:py-2 ${
          isDarkMode
            ? "border-white/20 bg-black/30 text-white backdrop-blur-xl hover:border-white/40 hover:bg-black/50"
            : "border-gray-200 bg-white shadow-sm hover:border-gray-300 hover:shadow-md"
        }`}
        style={{
          background: isDarkMode
            ? "linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 100%)"
            : undefined,
          boxShadow: isDarkMode
            ? "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)"
            : undefined,
        }}
      >
        <currentWorldData.icon
          className="h-4 w-4 transition-transform duration-300 group-hover:scale-110 sm:h-5 sm:w-5"
          style={{ color: currentWorldData.color }}
        />
        <div className="relative flex flex-1 flex-col items-start justify-center text-left">
          {/* Default state */}
          <div className="flex flex-col transition-opacity duration-200 group-hover:opacity-0">
            <span
              className={`text-xs ${
                isDarkMode ? "text-gray-400" : "text-gray-500"
              }`}
            >
              {t("currentWorld")}
            </span>
            <span
              className="text-xs font-semibold sm:text-sm"
              style={{ color: currentWorldData.color }}
            >
              {t(currentWorldData.labelKey)}
            </span>
          </div>
          {/* Hover state */}
          <span
            className="absolute inset-0 flex items-center text-[10px] font-medium whitespace-nowrap opacity-0 transition-all duration-200 group-hover:opacity-100 sm:text-xs"
            style={{ color: currentWorldData.color }}
          >
            {t("discoverWorlds")}
          </span>
        </div>
        <FaChevronDown
          className={`h-2.5 w-2.5 transition-transform duration-300 sm:h-3 sm:w-3 ${
            isOpen ? "rotate-180" : ""
          } ${isDarkMode ? "text-gray-400" : "text-gray-400"}`}
        />
      </button>

      <div
        className={`absolute right-0 left-0 mt-2 overflow-hidden rounded-lg border shadow-lg backdrop-blur-xl transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        } ${
          isDarkMode
            ? "border-white/20 bg-black/80"
            : "border-gray-200 bg-white"
        }`}
        style={{
          minWidth: "200px",
          background: isDarkMode
            ? "linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 100%)"
            : undefined,
          boxShadow: isDarkMode
            ? "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)"
            : undefined,
        }}
      >
        <div className="p-2">
          {worlds.map((world, index) => {
            const isActive = world.key === currentWorld;
            return (
              <Link
                key={world.key}
                href={world.href}
                onClick={() => setIsOpen(false)}
                className={`group/item flex items-center gap-3 rounded-md px-4 py-3 transition-all duration-200 ${
                  isDarkMode
                    ? isActive
                      ? "bg-white/20"
                      : "hover:bg-white/10"
                    : isActive
                      ? "bg-gray-50"
                      : "hover:bg-gray-50"
                }`}
                style={{
                  animationDelay: `${index * 50}ms`,
                }}
              >
                <world.icon
                  className="h-5 w-5 transition-all duration-200 group-hover/item:scale-125"
                  style={{
                    color: isActive
                      ? world.color
                      : isDarkMode
                        ? "#9ca3af"
                        : "#9ca3af",
                  }}
                />
                <span
                  className={`flex-1 text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? ""
                      : isDarkMode
                        ? "text-white/90 group-hover/item:text-white"
                        : "text-gray-600 group-hover/item:text-gray-900"
                  }`}
                  style={{
                    color: isActive ? world.color : undefined,
                  }}
                >
                  {t(world.labelKey)}
                </span>
                {isActive && (
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: world.color }}
                  />
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function Header({
  firstColor,
  secondColor,
  hideLogo = false,
  showTopBorder = true,
}: HeaderProps) {
  const pathname = usePathname();

  // Determine current page based on pathname
  const isOnTech = pathname.startsWith("/tech");
  const isOnPhoto = pathname.startsWith("/photo");
  const isOnBlog = pathname.startsWith("/blog");
  const isOn3DPrinting = pathname.startsWith("/3dprinting");

  const getCurrentWorld = () => {
    if (isOnTech) return "tech";
    if (isOnPhoto) return "photo";
    if (isOnBlog) return "blog";
    if (isOn3DPrinting) return "3dprinting";
    return "tech";
  };

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
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          {!hideLogo && (
            <button
              aria-label="Home"
              className="z-50 inline-block shrink-0 rounded-full transition-transform hover:scale-105"
              onClick={() => (window.location.href = "/")}
            >
              <Image
                src="/icon.png"
                alt="Logo"
                width={64}
                height={64}
                className="h-12 w-12 sm:h-16 sm:w-16"
                priority
              />
            </button>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Right side: Worlds Navigation + Language Switcher */}
          <div className="flex items-center gap-2 sm:gap-3">
            <WorldsNavigation
              firstColor={firstColor}
              secondColor={secondColor}
              currentWorld={getCurrentWorld()}
            />
            <LanguageSwitcher
              firstColor={firstColor}
              secondColor={secondColor}
              theme={isOnPhoto ? "photo" : "default"}
            />
          </div>
        </div>
      </header>
    </>
  );
}
