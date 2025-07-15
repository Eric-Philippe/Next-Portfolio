"use client";

import { Suspense } from "react";
import LoadingSpinner from "~/components/common/loading-spinner";
import PhotoPortfolio from "~/components/photo-portfolio";
import {
  PHOTO_PORTFOLIO_FIRST_COLOR,
  PHOTO_PORTFOLIO_SECOND_COLOR,
} from "~/content/photo-contents";

export default function PhotoPage() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <PhotoPortfolio
          firstColor={PHOTO_PORTFOLIO_FIRST_COLOR}
          secondColor={PHOTO_PORTFOLIO_SECOND_COLOR}
        />
      </Suspense>
    </div>
  );
}
