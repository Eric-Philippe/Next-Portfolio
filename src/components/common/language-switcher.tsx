"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "~/i18n/navigation";
import { routing } from "~/i18n/routing";
import { useState, useRef, useEffect } from "react";
import { FaGlobe, FaChevronDown } from "react-icons/fa";

interface LanguageSwitcherProps {
  firstColor: string;
  secondColor: string;
}

const localeNames = {
  en: { name: "English", flag: "🇺🇸", short: "EN" },
  fr: { name: "Français", flag: "🇫🇷", short: "FR" },
} as const;

export function LanguageSwitcher({
  firstColor,
  secondColor,
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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group relative flex items-center space-x-2 rounded-xl border border-gray-200/50 bg-white/80 px-3 py-2 text-sm font-medium text-gray-700 shadow-lg backdrop-blur-md transition-all duration-300 hover:border-gray-300/70 hover:bg-white/90 hover:text-gray-900 hover:shadow-xl"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.8) 100%)`,
          boxShadow:
            "0 8px 32px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
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
          className={`h-3 w-3 text-gray-500 transition-all duration-300 ${
            isOpen ? "rotate-180 text-gray-700" : "group-hover:text-gray-700"
          }`}
        />

        {/* Glass reflection effect */}
        <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
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
          className="rounded-xl border border-gray-200/50 bg-white/95 p-2 shadow-2xl backdrop-blur-xl"
          style={{
            background: `linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(255,255,255,0.9) 100%)`,
            boxShadow:
              "0 20px 40px rgba(0,0,0,0.1), inset 0 1px 0 rgba(255,255,255,0.9)",
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
                    ? "bg-gray-100/80 text-gray-900 shadow-lg"
                    : "text-gray-700 hover:bg-gray-50/80 hover:text-gray-900"
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
                  <div className="text-xs text-gray-500 transition-colors duration-200 group-hover:text-gray-600">
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
