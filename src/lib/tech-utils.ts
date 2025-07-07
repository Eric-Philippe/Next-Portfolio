import "server-only";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";

const techPostsDirectory = path.join(process.cwd(), "src/tech-posts");

export interface TechPostMeta {
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
  featured?: boolean;
  published?: boolean;
  priority?: number;
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
  meta: TechPostMeta;
  locale: string;
}

export interface TechPostGroup {
  slug: string;
  locales: Record<string, TechPostWithContent>;
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
  priority: number;
}

export function getAllTechPostSlugs(): string[] {
  try {
    const slugs = new Set<string>();
    const locales = ["en", "fr"];

    for (const locale of locales) {
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
    const locales = ["en", "fr"];
    for (const loc of locales) {
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
      meta,
      locale,
    };
  } catch {
    return null;
  }
}

export function getAllTechPostGroups(preferredLocale = "en"): TechPostGroup[] {
  const slugs = getAllTechPostSlugs();
  const groups: TechPostGroup[] = [];

  for (const slug of slugs) {
    const locales = ["en", "fr"];
    const postGroup: TechPostGroup = {
      slug,
      locales: {},
      title: "",
      description: "",
      productDescription: "",
      heroImage: undefined,
      gallery: undefined,
      liveUrl: undefined,
      githubUrl: undefined,
      techs: [],
      tags: [],
      lastUpdated: new Date(),
      readingTime: 0,
      priority: 999,
    };

    let primaryPost: TechPostWithContent | null = null;

    // Get posts for all available locales
    for (const locale of locales) {
      const post = getTechPostForLocale(slug, locale);
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
      postGroup.productDescription = primaryPost.productDescription;
      postGroup.heroImage = primaryPost.heroImage;
      postGroup.gallery = primaryPost.gallery;
      postGroup.liveUrl = primaryPost.liveUrl;
      postGroup.githubUrl = primaryPost.githubUrl;
      postGroup.techs = primaryPost.techs;
      postGroup.tags = primaryPost.tags;
      postGroup.lastUpdated = primaryPost.lastUpdated;
      postGroup.readingTime = primaryPost.readingTime;
      postGroup.priority = primaryPost.meta.priority ?? 999;

      groups.push(postGroup);
    }
  }

  return groups.sort((a, b) => {
    // Sort by priority first, then by date
    if (a.priority !== b.priority) {
      return a.priority - b.priority;
    }
    return a.lastUpdated > b.lastUpdated ? -1 : 1;
  });
}

export function getAllTechPosts(preferredLocale = "en") {
  const groups = getAllTechPostGroups(preferredLocale);
  return groups.map((group) => ({
    slug: group.slug,
    title: group.title,
    description: group.description,
    productDescription: group.productDescription,
    heroImage: group.heroImage,
    gallery: group.gallery,
    liveUrl: group.liveUrl,
    githubUrl: group.githubUrl,
    techs: group.techs,
    tags: group.tags,
    lastUpdated: group.lastUpdated,
    readingTime: group.readingTime,
    priority: group.priority,
    en_url: group.locales.en ? `/en/tech/${group.slug}` : undefined,
    fr_url: group.locales.fr ? `/fr/tech/${group.slug}` : undefined,
  }));
}

// This function will be used for static generation
export function generateTechStaticParams() {
  const slugs = getAllTechPostSlugs();
  return slugs.map((slug) => ({ slug }));
}
