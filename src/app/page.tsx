"use client";

import { Suspense } from "react";
import { PortfolioProvider, usePortfolio } from "~/lib/portfolio-context";
import LoadingSpinner from "~/components/common/loading-spinner";
import { Header } from "~/components/common/header";
import DevPortfolio from "~/components/dev-portfolio";
import PhotoPortfolio from "~/components/photo-portfolio";

function PortfolioContent() {
  const { mode, setMode } = usePortfolio();

  // Define colors based on current mode
  const firstColor = mode === "dev" ? "#9967ef" : "#ff6b6b";
  const secondColor = mode === "dev" ? "#ed4f51" : "#feca57";

  return (
    <>
      <Header
        isDev={mode === "dev"}
        setIsDev={(isDev: boolean) => setMode(isDev ? "dev" : "photo")}
        firstColor={firstColor}
        secondColor={secondColor}
      />
      <Suspense fallback={<LoadingSpinner />}>
        {mode === "dev" ? <DevPortfolio /> : <PhotoPortfolio />}
      </Suspense>
    </>
  );
}

export default function HomePage() {
  return (
    <PortfolioProvider>
      <PortfolioContent />
    </PortfolioProvider>
  );
}
