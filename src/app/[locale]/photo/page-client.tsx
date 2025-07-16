"use client";

import { Suspense } from "react";
import LoadingSpinner from "~/components/common/loading-spinner";
import PhotoPortfolio from "~/components/photo-portfolio";
import {
  PHOTO_PORTFOLIO_FIRST_COLOR,
  PHOTO_PORTFOLIO_SECOND_COLOR,
} from "~/content/photo-contents";
import type { GalleryData } from "~/types/GalleryData";

interface Props {
  galleries: GalleryData[];
}

export default function PhotoGalleriesPageClient({ galleries }: Props) {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <PhotoPortfolio
          firstColor={PHOTO_PORTFOLIO_FIRST_COLOR}
          secondColor={PHOTO_PORTFOLIO_SECOND_COLOR}
          galleries={galleries}
        />
      </Suspense>
    </div>
  );
}
