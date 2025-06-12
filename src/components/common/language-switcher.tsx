"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "~/i18n/navigation";
import { routing } from "~/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { FaGlobe, FaChevronDown } from "react-icons/fa";

interface LanguageSwitcherProps {
  firstColor: string;
  secondColor: string;
  theme?: "default" | "photo" | "dark";
}

const localeNames = {
  en: { name: "English", flag: "🇺🇸", short: "EN" },
  fr: { name: "Français", flag: "🇫🇷", short: "FR" },
} as const;

export function LanguageSwitcher({
  firstColor,
  secondColor,
  theme = "default",
}: LanguageSwitcherProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLocaleChange = (newLocale: string) => {
    setIsOpen(false);
    router.replace(pathname, { locale: newLocale });
  };

  const currentLocale = localeNames[locale as "en" | "fr"];

  // Theme-specific styles
  const getThemeStyles = () => {
    switch (theme) {
      case "photo":
        return {
          button:
            "border-white/20 bg-black/30 text-white hover:border-white/40 hover:bg-black/50",
          buttonBg: `linear-gradient(135deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.3) 100%)`,
          buttonShadow:
            "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
          dropdown: "border-white/20 bg-black/80 backdrop-blur-xl",
          dropdownBg: `linear-gradient(135deg, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.8) 100%)`,
          dropdownShadow:
            "0 20px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.1)",
          itemText: "text-white",
          itemHover: "hover:bg-white/10 hover:text-white",
          itemActive: "bg-white/20 text-white",
        };
      case "dark":
        return {
          button:
            "border-gray-600/50 bg-gray-800/80 text-white hover:border-gray-500/70 hover:bg-gray-700/90",
          buttonBg: `linear-gradient(135deg, rgba(55,65,81,0.9) 0%, rgba(75,85,99,0.8) 100%)`,
          buttonShadow:
            "0 8px 32px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.1)",
          dropdown: "border-gray-600/50 bg-gray-800/95 backdrop-blur-xl",
          dropdownBg: `linear-gradient(135deg, rgba(31,41,55,0.95) 0%, rgba(55,65,81,0.9) 100%)`,
          dropdownShadow:
            "0 20px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)",
          itemText: "text-white",
          itemHover: "hover:bg-gray-700/80 hover:text-white",
          itemActive: "bg-gray-700/80 text-white",
        };
      default:
        return {
          button:
            "border-gray-200/50 bg-white/80 text-gray-700 hover:border-gray-300/70 hover:bg-white/90 hover:text-gray-900",
          buttonBg: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)`,
          buttonShadow:
            "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
          dropdown: "border-gray-200/50 bg-white/95 backdrop-blur-xl",
          dropdownBg: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)`,
          dropdownShadow:
            "0 20px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
          itemText: "text-gray-700",
          itemHover: "hover:bg-gray-50/80 hover:text-gray-900",
          itemActive: "bg-gray-100/80 text-gray-900",
        };
    }
  };

  const themeStyles = getThemeStyles();

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`group relative flex items-center space-x-2 rounded-xl px-3 py-2 text-sm font-medium shadow-lg backdrop-blur-md transition-all duration-300 hover:shadow-xl ${themeStyles.button}`}
        style={{
          background: themeStyles.buttonBg,
          boxShadow: themeStyles.buttonShadow,
        }}
      >
        <FaGlobe
          className="h-4 w-4 transition-transform duration-300 group-hover:rotate-12"
          style={{ color: firstColor }}
        />
        <span className="font-medium transition-colors duration-300">
          {currentLocale.short}
        </span>
        <FaChevronDown
          className={`h-3 w-3 transition-all duration-300 ${
            isOpen ? "rotate-180" : ""
          } ${theme === "photo" || theme === "dark" ? "text-white/70" : "text-gray-500"}`}
        />

        {/* Glass reflection effect */}
        <div
          className={`absolute inset-0 rounded-xl bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100 ${
            theme === "photo" || theme === "dark"
              ? "via-white/10"
              : "via-white/20"
          }`}
        />
      </button>

      {/* Dropdown */}
      <div
        className={`absolute top-full right-0 mt-2 w-48 origin-top-right transform transition-all duration-300 ease-out ${
          isOpen
            ? "translate-y-0 scale-100 opacity-100"
            : "pointer-events-none -translate-y-2 scale-95 opacity-0"
        }`}
      >
        <div
          className={`rounded-xl p-2 shadow-2xl ${themeStyles.dropdown}`}
          style={{
            background: themeStyles.dropdownBg,
            boxShadow: themeStyles.dropdownShadow,
          }}
        >
          {routing.locales.map((loc) => {
            const localeInfo = localeNames[loc];
            const isActive = loc === locale;

            return (
              <button
                key={loc}
                onClick={() => handleLocaleChange(loc)}
                className={`group flex w-full items-center space-x-3 rounded-lg px-3 py-2.5 text-left transition-all duration-200 ${
                  isActive
                    ? `${themeStyles.itemActive} shadow-lg`
                    : `${themeStyles.itemText} ${themeStyles.itemHover}`
                }`}
                style={{
                  background: isActive
                    ? `linear-gradient(135deg, ${firstColor}15 0%, ${secondColor}15 100%)`
                    : undefined,
                }}
              >
                <span className="text-lg">{localeInfo.flag}</span>
                <div className="flex-1">
                  <div className="font-medium">{localeInfo.name}</div>
                  <div
                    className={`text-xs transition-colors duration-200 group-hover:text-gray-600 ${
                      theme === "photo" || theme === "dark"
                        ? "text-gray-400"
                        : "text-gray-500"
                    }`}
                  >
                    {localeInfo.short}
                  </div>
                </div>
                {isActive && (
                  <div
                    className="h-2 w-2 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, ${firstColor} 0%, ${secondColor} 100%)`,
                      boxShadow: `0 0 8px ${firstColor}40`,
                    }}
                  />
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
