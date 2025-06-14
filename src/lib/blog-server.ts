import "server-only";
import { getPostsMetadata } from "~/lib/mdx-utils";
import type { BlogPost } from "~/types/portfolio";

// Fallback posts for development or when MDX files aren't available
export const placeholderPosts: BlogPost[] = [
  {
    slug: "first-post",
    title: "My First Blog Post",
    description:
      "This is a short description of my first blog post. Exploring the wonders of modern web development and the tools that make it possible.",
    lastUpdated: new Date("2025-06-14"),
    readingTime: 5,
    tags: ["Next.js", "Web Development", "React"],
    fr_url: "/fr/blog/first-post",
  },
  {
    slug: "second-post",
    title: "Exploring Photography: A Visual Journey",
    description:
      "A deep dive into the world of photography, from capturing breathtaking landscapes to mastering portrait techniques. Discover the art and science behind stunning images.",
    lastUpdated: new Date("2025-06-10"),
    readingTime: 8,
    tags: ["Photography", "Canon", "Creative", "Art"],
    en_url: "/en/blog/second-post",
    fr_url: "/fr/blog/second-post",
  },
  {
    slug: "third-post",
    title: "Minimalist Design Principles for Impactful UIs",
    description:
      "Learn how to achieve a slick, modern, and user-friendly design by applying minimalist principles. Less is more when it comes to creating intuitive digital experiences.",
    lastUpdated: new Date("2025-06-05"),
    readingTime: 6,
    tags: ["Design", "UI/UX", "Minimalism", "Web"],
    en_url: "/en/blog/third-post",
    fr_url: "/fr/blog/third-post",
  },
  {
    slug: "ai-in-software-development",
    title: "The Rise of AI in Software Development",
    description:
      "Exploring how Artificial Intelligence is revolutionizing the software development lifecycle, from automated coding to intelligent testing and deployment.",
    lastUpdated: new Date("2025-05-28"),
    readingTime: 10,
    tags: ["AI", "Software Engineering", "Innovation", "Future Tech"],
    en_url: "/en/blog/ai-software",
    fr_url: "/fr/blog/ai-software",
  },
];

// Get blog posts from MDX files, with fallback to placeholder posts (server-only)
export function getBlogPosts(): BlogPost[] {
  try {
    const mdxPosts = getPostsMetadata();
    return mdxPosts.length > 0 ? mdxPosts : placeholderPosts;
  } catch (error) {
    console.warn("Failed to load MDX posts, using placeholder posts:", error);
    return placeholderPosts;
  }
}
