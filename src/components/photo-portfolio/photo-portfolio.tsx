import PhotoHead from "./photo-head";
import AlbumsSection from "./albums-section";
import SetupSection from "./setup-section";
import ContactSection from "./contact-section";

interface PhotoPortfolioProps {
  firstColor?: string;
  secondColor?: string;
}

export default function PhotoPortfolio({
  firstColor = "#ff6b6b",
  secondColor = "#feca57",
}: PhotoPortfolioProps) {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <PhotoHead firstColor={firstColor} secondColor={secondColor} />

      <>
        <SetupSection />
        <AlbumsSection />
        <ContactSection />
      </>
    </div>
  );
}
