"use client";

import { Suspense } from "react";
import { PortfolioProvider } from "~/lib/portfolio-context";
import LoadingSpinner from "~/components/common/loading-spinner";
import { Header } from "~/components/common/header";
import PhotoPortfolio from "~/components/photo-portfolio";

export default function PhotoPage() {
  const firstColor = "#ff6b6b";
  const secondColor = "#feca57";

  return (
    <PortfolioProvider>
      <Header firstColor={firstColor} secondColor={secondColor} />
      <Suspense fallback={<LoadingSpinner />}>
        <PhotoPortfolio />
      </Suspense>
    </PortfolioProvider>
  );
}
