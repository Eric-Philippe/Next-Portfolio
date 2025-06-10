"use client";

import { Suspense } from "react";
import { PortfolioProvider } from "~/lib/portfolio-context";
import LoadingSpinner from "~/components/common/loading-spinner";
import { Header } from "~/components/common/header";
import DevPortfolio from "~/components/dev-portfolio";

export default function TechPage() {
  const firstColor = "#9967ef";
  const secondColor = "#ed4f51";

  return (
    <PortfolioProvider>
      <Header firstColor={firstColor} secondColor={secondColor} />
      <Suspense fallback={<LoadingSpinner />}>
        <DevPortfolio />
      </Suspense>
    </PortfolioProvider>
  );
}
