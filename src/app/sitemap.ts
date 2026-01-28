import type { MetadataRoute } from "next";
import { LOCALES } from "~/lib/utils";

const baseUrl = "https://ericphlpp.com";

const staticRoutes = [
  "", // Home page
  "/blog",
  "/photo",
  "/tech",
  "/3dprinting",
];

interface BlogPost {
  slug: string;
  lastModified: Date;
}

const blogPosts: BlogPost[] = [
  // { slug: 'my-first-post', lastModified: new Date() },
  // { slug: 'another-great-article', lastModified: new Date() },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const sitemapEntries: MetadataRoute.Sitemap = [];

  LOCALES.forEach((locale) => {
    // Add static routes for each locale
    staticRoutes.forEach((route) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: route === "" ? 1 : 0.8, // Higher priority for home page
      });
    });

    // Add dynamic blog post routes for each locale (if any)
    blogPosts.forEach((post) => {
      sitemapEntries.push({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: post.lastModified,
        changeFrequency: "daily",
        priority: 0.7,
      });
    });
  });

  return sitemapEntries;
}
