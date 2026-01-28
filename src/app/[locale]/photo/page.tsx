import PhotoGalleriesPageClient from "./page-client";
import { getAllPhotoGalleries } from "~/lib/photo-utils";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export default async function PhotoGalleriesPage({ params }: Props) {
  const { locale } = await params;
  const galleries = getAllPhotoGalleries(locale);

  return <PhotoGalleriesPageClient galleries={galleries} />;
}
