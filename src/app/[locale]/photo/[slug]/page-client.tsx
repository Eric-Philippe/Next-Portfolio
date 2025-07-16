"use client";

import { use } from "react";
import { Header } from "~/components/common/header";
import {
  PHOTO_PORTFOLIO_FIRST_COLOR,
  PHOTO_PORTFOLIO_SECOND_COLOR,
} from "~/content/photo-contents";
import type { PhotoGallery } from "~/lib/photo-utils";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

interface Props {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
  gallery: PhotoGallery | null;
}

export default function PhotoGalleryPageClient({ params, gallery }: Props) {
  const resolvedParams = use(params);

  if (!gallery) {
    return (
      <div>
        <Header
          firstColor={PHOTO_PORTFOLIO_FIRST_COLOR}
          secondColor={PHOTO_PORTFOLIO_SECOND_COLOR}
        />
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
          <div className="text-center">
            <h1 className="mb-4 text-4xl font-bold text-white">
              Gallery Not Found
            </h1>
            <p className="mb-8 text-slate-400">
              The gallery you&apos;re looking for doesn&apos;t exist.
            </p>
            <Link
              href={`/${resolvedParams.locale}/tech`}
              className="inline-flex items-center gap-2 rounded-xl bg-purple-600 px-6 py-3 text-white transition-colors hover:bg-purple-700"
            >
              <FiArrowLeft className="h-4 w-4" />
              Back to Gallery
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Header
        firstColor={PHOTO_PORTFOLIO_FIRST_COLOR}
        secondColor={PHOTO_PORTFOLIO_SECOND_COLOR}
      />
    </div>
  );
}
