"server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { LOCALES, PHOTO_GALLERY_DIR_PATH } from "./utils";
import type { GalleryData } from "../types/GalleryData";

const photoGalleryDirectory = path.join(process.cwd(), PHOTO_GALLERY_DIR_PATH);

export type GalleryMetadata = Omit<GalleryData, "photos" | "slug">;
export type PhotoGallery = GalleryData & {
  content: string;
  locale: string;
};

export function getAllPhotoGallerySlugs(): string[] {
  try {
    const slugs = new Set<string>();

    for (const locale of LOCALES) {
      const localeDir = path.join(photoGalleryDirectory, locale);
      if (fs.existsSync(localeDir)) {
        const fileNames = fs.readdirSync(localeDir);
        fileNames
          .filter((name) => name.endsWith(".mdx"))
          .forEach((name) => {
            slugs.add(name.replace(/\.mdx$/, ""));
          });
      }
    }

    return Array.from(slugs);
  } catch (error) {
    console.warn("Could not read photo gallery directory:", error);
    return [];
  }
}

export function getPhotoGalleryForLocale(
  slug: string,
  locale: string,
): PhotoGallery | null {
  try {
    const filePath = path.join(photoGalleryDirectory, locale, `${slug}.mdx`);

    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, "utf8");
    const { data, content } = matter(fileContent);
    const meta = data as GalleryMetadata;

    return {
      ...meta,
      slug,
      photos: getAllPhotosFromGalleryContent(content),
      content,
      locale,
    };
  } catch (error) {
    console.warn(
      `Could not read photo gallery for ${slug} in ${locale}:`,
      error,
    );
    return null;
  }
}

export function getPhotoGalleryBySlug(
  slug: string,
  locale?: string,
): PhotoGallery | null {
  try {
    // If locale is specified, try that first
    if (locale) {
      const localeGallery = getPhotoGalleryForLocale(slug, locale);
      if (localeGallery) return localeGallery;
    }

    // Otherwise, try to find in any available locale (prioritize 'en')
    for (const loc of LOCALES) {
      const gallery = getPhotoGalleryForLocale(slug, loc);
      if (gallery) return gallery;
    }

    return null;
  } catch (error) {
    console.warn(`Could not read photo gallery ${slug}:`, error);
    return null;
  }
}

export function getAllPhotoGalleries(locale = "en"): GalleryData[] {
  const slugs = getAllPhotoGallerySlugs();
  const galleries: GalleryData[] = [];

  for (const slug of slugs) {
    const gallery = getPhotoGalleryBySlug(slug, locale);
    if (gallery) {
      galleries.push(gallery);
    }
  }

  return galleries;
}

const getAllPhotosFromGalleryContent = (content: string): string[] => {
  const photoRegex = /!\[.*?\]\((.*?)\)/g;
  const photos: string[] = [];
  let match;

  while ((match = photoRegex.exec(content)) !== null) {
    if (!match[1]) continue;
    const photoPath = match[1].trim();
    if (photoPath) {
      photos.push(photoPath);
    }
  }

  return photos;
};
