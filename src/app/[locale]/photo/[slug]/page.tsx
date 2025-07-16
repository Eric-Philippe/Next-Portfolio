import {
  getAllPhotoGallerySlugs,
  getPhotoGalleryBySlug,
} from "~/lib/photo-utils";
import PhotoGalleryPageClient from "./page-client";

// Generate static params for all photo galleries
export async function generateStaticParams() {
  const slugs = getAllPhotoGallerySlugs();

  // Generate for both locales
  const params = [];
  for (const slug of slugs) {
    params.push({ slug, locale: "en" });
    params.push({ slug, locale: "fr" });
  }

  return params;
}

interface Props {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default async function PhotoGalleryPage({ params }: Props) {
  const resolvedParams = await params;

  // Try to get gallery from MDX files for the current locale first
  let gallery = getPhotoGalleryBySlug(
    resolvedParams.slug,
    resolvedParams.locale,
  );

  // If not found for current locale, try any available locale
  gallery ??= getPhotoGalleryBySlug(resolvedParams.slug);

  return (
    <PhotoGalleryPageClient
      params={Promise.resolve(resolvedParams)}
      gallery={gallery}
    />
  );
}
