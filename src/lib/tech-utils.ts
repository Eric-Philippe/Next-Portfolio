import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import {
  DEV_PROJECT_MDX_CONTENT_MARKER,
  LOCALES,
  TECH_POSTS_DIR_PATH,
} from "./utils";

const techPostsDirectory = path.join(process.cwd(), TECH_POSTS_DIR_PATH);

interface TechPostMeta {
  title: string;
  description: string;
  productDescription: string;
  heroImage?: string;
  gallery?: string[];
  liveUrl?: string;
  githubUrl?: string;
  techs: string[];
  tags: string[];
  date: string;
  published?: boolean;
}

export interface TechPostWithContent {
  slug: string;
  title: string;
  description: string;
  productDescription: string;
  heroImage?: string;
  gallery?: string[];
  liveUrl?: string;
  githubUrl?: string;
  techs: string[];
  tags: string[];
  lastUpdated: Date;
  readingTime: number;
  content: string;
  productContent: string;
  techContent: string;
  meta: TechPostMeta;
  locale: string;
}

export function getAllTechPostSlugs(): string[] {
  try {
    const slugs = new Set<string>();

    for (const locale of LOCALES) {
      const localeDir = path.join(techPostsDirectory, locale);
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
    console.warn("Could not read tech posts directory:", error);
    return [];
  }
}

export function getTechPostBySlug(
  slug: string,
  locale?: string,
): TechPostWithContent | null {
  try {
    // If locale is specified, try that first
    if (locale) {
      const localePost = getTechPostForLocale(slug, locale);
      if (localePost) return localePost;
    }

    // Otherwise, try to find in any available locale (prioritize 'en')
    for (const loc of LOCALES) {
      const post = getTechPostForLocale(slug, loc);
      if (post) return post;
    }

    return null;
  } catch (error) {
    console.warn(`Could not read tech post ${slug}:`, error);
    return null;
  }
}

function getTechPostForLocale(
  slug: string,
  locale: string,
): TechPostWithContent | null {
  try {
    const fullPath = path.join(techPostsDirectory, locale, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const meta = data as TechPostMeta;

    // Default to published if not specified
    if (meta.published === false) {
      return null;
    }

    // Split content by marker
    const [productContent, ...techParts] = content.split(
      DEV_PROJECT_MDX_CONTENT_MARKER,
    );
    const techContent = techParts.join(DEV_PROJECT_MDX_CONTENT_MARKER);

    const stats = readingTime(content);

    return {
      slug,
      title: meta.title,
      description: meta.description,
      productDescription: meta.productDescription,
      heroImage: meta.heroImage,
      gallery: meta.gallery,
      liveUrl: meta.liveUrl,
      githubUrl: meta.githubUrl,
      techs: meta.techs || [],
      tags: meta.tags || [],
      lastUpdated: new Date(meta.date),
      readingTime: Math.ceil(stats.minutes),
      content,
      productContent: productContent
        ? productContent.trim()
        : "Missing product content",
      techContent: techContent ? techContent.trim() : "Missing tech content",
      meta,
      locale,
    };
  } catch {
    return null;
  }
}
