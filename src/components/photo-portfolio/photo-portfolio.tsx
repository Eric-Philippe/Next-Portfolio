"use client";

import { usePortfolio } from "~/lib/portfolio-context";
import PhotoHead from "./photo-head";
import AlbumsSection from "./albums-section";
import SetupSection from "./setup-section";
import ContactSection from "./contact-section";
import Canon800dCanvas from "./canon-800d-canvas";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function PhotoPortfolio() {
  const { focusedAlbum } = usePortfolio();
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

  if (focusedAlbum !== null) {
    // Return consultation view for specific album
    return (
      <div className="min-h-screen bg-black text-white">
        <div className="container mx-auto px-4 py-8">
          <h1 className="mb-4 text-3xl font-bold">Album Details</h1>
          <p>
            Album consultation view for album {focusedAlbum} - To be implemented
          </p>
        </div>
      </div>
    );
  }

  if (!mounted) {
    return (
      <div className="min-h-screen bg-black text-white">
        <PhotoHead />
      </div>
    );
  }

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
