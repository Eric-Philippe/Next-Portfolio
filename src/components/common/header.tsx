"use client";

import { FaCamera, FaDesktop } from "react-icons/fa";
import Image from "next/image";
import type { RouterProps } from "../../types/portfolio";

interface HeaderProps extends RouterProps {
  firstColor: string;
  secondColor: string;
}

export function Header({
  setIsDev,
  isDev,
  firstColor,
  secondColor,
}: HeaderProps) {
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
            onClick={() => {
              // Optional: Add home navigation logic here
            }}
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

          <nav className="-mt-6 flex space-x-4 text-sm text-gray-800">
            <button
              className={`flex items-center space-x-1.5 transition-all duration-200 hover:underline ${
                isDev ? "text-dev-gradient glow" : "head-icon"
              }`}
              onClick={() => setIsDev(true)}
              style={{
                zIndex: 10,
                cursor: "pointer",
                border: "1px solid",
                borderColor: isDev ? firstColor : "transparent",
                borderRadius: "0.5rem",
                padding: "0.25rem 0.5rem",
              }}
            >
              <FaDesktop
                className={`mt-0.5 w-4 transition-colors duration-200 ${
                  isDev ? "text-gradient" : "head-icon"
                }`}
                style={{
                  color: isDev ? firstColor : "",
                }}
              />
              <span className={`${isDev ? "" : "hidden"} md:inline`}>
                Informatique
              </span>
            </button>

            <button
              className={`flex items-center space-x-1.5 transition-all duration-200 hover:underline ${
                !isDev ? "text-photo-gradient" : "head-icon"
              }`}
              onClick={() => setIsDev(false)}
              style={{
                zIndex: 10,
                cursor: "pointer",
                border: "1px solid",
                borderColor: isDev ? "transparent" : firstColor,
                borderRadius: "0.5rem",
                padding: "0.25rem 0.5rem",
              }}
            >
              <FaCamera
                className="mt-0.5 w-4 transition-colors duration-200"
                style={{
                  color: isDev ? "" : secondColor,
                }}
              />
              <span className={`${isDev ? "hidden" : ""} md:inline`}>
                Photographie
              </span>
            </button>
          </nav>
        </div>
      </header>
    </>
  );
}
