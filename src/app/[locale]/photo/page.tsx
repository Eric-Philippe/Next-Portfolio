"use client";

import { Suspense } from "react";
import LoadingSpinner from "~/components/common/loading-spinner";
import PhotoPortfolio from "~/components/photo-portfolio";

export default function PhotoPage() {
  const firstColor = "#ff6b6b";
  const secondColor = "#feca57";

  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <PhotoPortfolio firstColor={firstColor} secondColor={secondColor} />
      </Suspense>
    </div>
  );
}
