"use client";

import PhotoHead from "./photo-head";
import AlbumsSection from "./albums-section";
import SetupSection from "./setup-section";
import ContactSection from "./contact-section";
import Canon800dCanvas from "./canon-800d-canvas";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PhotoPortfolio() {
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <PhotoHead />

      {/* Desktop Layout with 3D Canvas */}
      {!isSmallScreen ? (
        <>
          {/* 3D Canvas - Fixed positioned */}
          <Canon800dCanvas />

          {/* Main content with proper spacing for the 3D model */}
          <div className="mb-6 grid grid-cols-[2fr_1fr] overflow-auto">
            <div className="overflow-y-hidden pr-8">
              <AlbumsSection />
              <SetupSection />
              <ContactSection />
            </div>
            {/* Empty div for 3D canvas space */}
            <div />
          </div>
        </>
      ) : (
        /* Mobile Layout without 3D Canvas */
        <>
          {/* Camera GIF for mobile */}
          <div className="mb-6 flex justify-center">
            <Image
              className="mx-auto h-32 w-32 rounded-full object-cover"
              src="/canon_800d.gif"
              alt="Canon 800D Camera"
              width={128}
              height={128}
              unoptimized // For GIF animation
            />
          </div>

          <AlbumsSection />
          <SetupSection />
          <ContactSection />
        </>
      )}
    </div>
  );
}
