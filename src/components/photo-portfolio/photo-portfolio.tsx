import PhotoHead from "./photo-head";
import GalleriesSection from "./galleries-section";
import SetupSection from "./setup-section";
import ContactSection from "./contact-section";
import type { GalleryData } from "~/types/GalleryData";

interface PhotoPortfolioProps {
  firstColor?: string;
  secondColor?: string;
  galleries: GalleryData[];
}

export default function PhotoPortfolio({
  firstColor = "#ff6b6b",
  secondColor = "#feca57",
  galleries = [],
}: PhotoPortfolioProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <PhotoHead firstColor={firstColor} secondColor={secondColor} />

      <>
        <SetupSection />
        <GalleriesSection galleries={galleries} />
        <ContactSection />
      </>
    </div>
  );
}
