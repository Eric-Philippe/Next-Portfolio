/**
 * Utility functions for loading and processing 3D printing project content
 */

import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import { LOCALES, PRINTING_POSTS_DIR_PATH } from "./utils";
import type {
  PrintingPostMeta,
  PrintingPostWithContent,
} from "./printing-utils.types";

// Re-export types for backward compatibility
export type { PrintingPostMeta, PrintingPostWithContent };

const printingDirectory = path.join(process.cwd(), PRINTING_POSTS_DIR_PATH);

/**
 * Get all 3D printing project slugs across all locales
 */
export function getAllPrintingSlugs(): string[] {
  try {
    const slugs = new Set<string>();

    for (const locale of LOCALES) {
      const localeDir = path.join(printingDirectory, locale);
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
    console.warn("Could not read printing posts directory:", error);
    return [];
  }
}

/**
 * Get a single 3D printing project by slug and optional locale
 */
export function getPrintingPostBySlug(
  slug: string,
  locale?: string,
): PrintingPostWithContent | null {
  try {
    // If locale is specified, try that first
    if (locale) {
      const localePost = getPrintingPostForLocale(slug, locale);
      if (localePost) return localePost;
    }

    // Otherwise, try to find in any available locale (prioritize 'en')
    for (const loc of LOCALES) {
      const post = getPrintingPostForLocale(slug, loc);
      if (post) return post;
    }

    return null;
  } catch (error) {
    console.warn(`Could not read printing post ${slug}:`, error);
    return null;
  }
}

function getPrintingPostForLocale(
  slug: string,
  locale: string,
): PrintingPostWithContent | null {
  try {
    const fullPath = path.join(printingDirectory, locale, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const meta = data as PrintingPostMeta;

    // Default to published if not specified
    if (meta.published === false) {
      return null;
    }

    const stats = readingTime(content);

    return {
      slug,
      title: meta.title,
      description: meta.description,
      date: meta.date,
      heroImage: meta.heroImage,
      images: meta.images,
      printer: meta.printer,
      materials: meta.materials || [],
      printTime: meta.printTime,
      filamentUsed: meta.filamentUsed,
      downloadUrl: meta.downloadUrl,
      makerworldUrl: meta.makerworldUrl,
      featured: meta.featured,
      tags: meta.tags ?? [],
      lastUpdated: new Date(meta.date),
      readingTime: Math.ceil(stats.minutes),
      content,
      meta,
      locale,
    };
  } catch {
    return null;
  }
}

/**
 * Get all 3D printing projects for a given locale
 */
export function getAllPrintingPosts(
  preferredLocale = "en",
): PrintingPostWithContent[] {
  const slugs = getAllPrintingSlugs();
  const posts: PrintingPostWithContent[] = [];

  for (const slug of slugs) {
    // Try preferred locale first, then fallback to any available
    let post = getPrintingPostForLocale(slug, preferredLocale);

    if (!post) {
      for (const locale of LOCALES) {
        post = getPrintingPostForLocale(slug, locale);
        if (post) break;
      }
    }

    if (post) {
      posts.push(post);
    }
  }

  // Sort by date (newest first)
  return posts.sort(
    (a, b) => b.lastUpdated.getTime() - a.lastUpdated.getTime(),
  );
}

/**
 * Get featured 3D printing projects
 */
export function getFeaturedPrintingPosts(
  preferredLocale = "en",
): PrintingPostWithContent[] {
  const allPosts = getAllPrintingPosts(preferredLocale);
  return allPosts.filter((post) => post.featured);
}

/**
 * Generate static params for all printing posts
 */
export function generateStaticParams() {
  const slugs = getAllPrintingSlugs();
  return slugs.map((slug) => ({ slug }));
}
