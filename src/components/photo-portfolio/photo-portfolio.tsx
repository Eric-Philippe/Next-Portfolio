import PhotoHead from "./photo-head";
import AlbumsSection from "./albums-section";
import SetupSection from "./setup-section";
import ContactSection from "./contact-section";
import { useEffect, useState } from "react";

interface PhotoPortfolioProps {
  firstColor?: string;
  secondColor?: string;
}

export default function PhotoPortfolio({
  firstColor = "#ff6b6b",
  secondColor = "#feca57",
}: PhotoPortfolioProps) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1024);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white">
      <PhotoHead firstColor={firstColor} secondColor={secondColor} />

      {/* Desktop Layout with 3D Canvas */}
      {!isSmallScreen ? (
        <>
          <SetupSection />
          <AlbumsSection />
          <ContactSection />
        </>
      ) : (
        /* Mobile Layout without 3D Canvas */
        <>
          <SetupSection />
          <AlbumsSection />
          <ContactSection />
        </>
      )}
    </div>
  );
}
