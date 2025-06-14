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
}

export function getAllPostSlugs(): string[] {
  try {
    const fileNames = fs.readdirSync(postsDirectory);
    return fileNames
      .filter((name) => name.endsWith(".mdx"))
      .map((name) => name.replace(/\.mdx$/, ""));
  } catch (error) {
    console.warn("Could not read blog posts directory:", error);
    return [];
  }
}

export function getPostBySlug(slug: string): BlogPostWithContent | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.mdx`);
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
    };
  } catch (error) {
    console.warn(`Could not read post ${slug}:`, error);
    return null;
  }
}

export function getAllPosts(): BlogPost[] {
  const slugs = getAllPostSlugs();
  const posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPostWithContent => post !== null)
    .sort((post1, post2) => (post1.lastUpdated > post2.lastUpdated ? -1 : 1));

  return posts;
}

export function getPostsMetadata(): BlogPost[] {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
    title: post.title,
    description: post.description,
    lastUpdated: post.lastUpdated,
    readingTime: post.readingTime,
    tags: post.tags,
  }));
}

// This function will be used for static generation
export function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}
