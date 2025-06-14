import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type { BlogPost } from "~/types/portfolio";

const postsDirectory = path.join(process.cwd(), "src/blog-posts");

export interface BlogPostMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  author?: string;
  image?: string;
  published?: boolean;
}

export interface BlogPostWithContent extends BlogPost {
  content: string;
  meta: BlogPostMeta;
  locale: string;
}

export interface BlogPostGroup {
  slug: string;
  locales: Record<string, BlogPostWithContent>;
  // Use the first available locale's data for display
  title: string;
  description: string;
  lastUpdated: Date;
  readingTime: number;
  tags: string[];
}

export function getAllPostSlugs(): string[] {
  try {
    const slugs = new Set<string>();
    const locales = ["en", "fr"]; // Add more locales as needed

    for (const locale of locales) {
      const localeDir = path.join(postsDirectory, locale);
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
    console.warn("Could not read blog posts directory:", error);
    return [];
  }
}

export function getPostBySlug(
  slug: string,
  locale?: string,
): BlogPostWithContent | null {
  try {
    // If locale is specified, try that first
    if (locale) {
      const localePost = getPostForLocale(slug, locale);
      if (localePost) return localePost;
    }

    // Otherwise, try to find in any available locale (prioritize 'en')
    const locales = ["en", "fr"];
    for (const loc of locales) {
      const post = getPostForLocale(slug, loc);
      if (post) return post;
    }

    return null;
  } catch (error) {
    console.warn(`Could not read post ${slug}:`, error);
    return null;
  }
}

function getPostForLocale(
  slug: string,
  locale: string,
): BlogPostWithContent | null {
  try {
    const fullPath = path.join(postsDirectory, locale, `${slug}.mdx`);

    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    const meta = data as BlogPostMeta;

    // Default to published if not specified
    if (meta.published === false) {
      return null;
    }

    const stats = readingTime(content);

    return {
      slug,
      title: meta.title,
      description: meta.description,
      lastUpdated: new Date(meta.date),
      readingTime: Math.ceil(stats.minutes),
      tags: meta.tags || [],
      content,
      meta,
      locale,
    };
  } catch {
    return null;
  }
}

export function getAllPostGroups(preferredLocale = "en"): BlogPostGroup[] {
  const slugs = getAllPostSlugs();
  const groups: BlogPostGroup[] = [];

  for (const slug of slugs) {
    const locales = ["en", "fr"];
    const postGroup: BlogPostGroup = {
      slug,
      locales: {},
      title: "",
      description: "",
      lastUpdated: new Date(),
      readingTime: 0,
      tags: [],
    };

    let primaryPost: BlogPostWithContent | null = null;

    // Get posts for all available locales
    for (const locale of locales) {
      const post = getPostForLocale(slug, locale);
      if (post) {
        postGroup.locales[locale] = post;

        // Prioritize the preferred locale, then English, then any available
        if (
          !primaryPost ||
          locale === preferredLocale ||
          (locale === "en" && primaryPost.locale !== preferredLocale)
        ) {
          primaryPost = post;
        }
      }
    }

    if (primaryPost && Object.keys(postGroup.locales).length > 0) {
      postGroup.title = primaryPost.title;
      postGroup.description = primaryPost.description;
      postGroup.lastUpdated = primaryPost.lastUpdated;
      postGroup.readingTime = primaryPost.readingTime;
      postGroup.tags = primaryPost.tags;

      groups.push(postGroup);
    }
  }

  return groups.sort((a, b) => (a.lastUpdated > b.lastUpdated ? -1 : 1));
}

export function getAllPosts(preferredLocale = "en"): BlogPost[] {
  const groups = getAllPostGroups(preferredLocale);
  return groups.map((group) => ({
    slug: group.slug,
    title: group.title,
    description: group.description,
    lastUpdated: group.lastUpdated,
    readingTime: group.readingTime,
    tags: group.tags,
    en_url: group.locales.en ? `/en/blog/${group.slug}` : undefined,
    fr_url: group.locales.fr ? `/fr/blog/${group.slug}` : undefined,
  }));
}

export function getPostsMetadata(preferredLocale = "en"): BlogPost[] {
  return getAllPosts(preferredLocale);
}

// This function will be used for static generation
export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}
