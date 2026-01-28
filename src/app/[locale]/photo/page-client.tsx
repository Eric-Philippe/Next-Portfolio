"use client";

import { Suspense } from "react";
import LoadingSpinner from "~/components/common/loading-spinner";
import {
  PHOTO_PORTFOLIO_FIRST_COLOR,
  PHOTO_PORTFOLIO_SECOND_COLOR,
} from "~/content/photo-contents";
import type { GalleryData } from "~/types/GalleryData";

import Footer from "~/components/common/footer";
import {
  ContactSection,
  GalleriesSection,
  PhotoHead,
  SetupSection,
} from "~/components/photo-portfolio";
interface Props {
  galleries: GalleryData[];
}

export default function PhotoGalleriesPageClient({ galleries }: Props) {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <div>
          <Suspense fallback={<LoadingSpinner />}>
            <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
              <PhotoHead
                firstColor={PHOTO_PORTFOLIO_FIRST_COLOR}
                secondColor={PHOTO_PORTFOLIO_SECOND_COLOR}
              />

              <>
                <SetupSection />
                <GalleriesSection galleries={galleries} />
                <ContactSection />
              </>

              <Footer />
            </div>
          </Suspense>
        </div>
      </Suspense>
    </div>
  );
}
