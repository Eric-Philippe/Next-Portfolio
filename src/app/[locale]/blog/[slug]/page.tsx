import { getAllPostSlugs, getPostBySlug } from "~/lib/mdx-utils";
import { getBlogPosts } from "~/lib/blog-server";
import BlogPostPageClient from "./page-client";

// Generate static params for all blog posts
export async function generateStaticParams() {
  const slugs = getAllPostSlugs();

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

export default async function BlogPostPage({ params }: Props) {
  const resolvedParams = await params;

  // Try to get post from MDX files for the current locale first
  let post = getPostBySlug(resolvedParams.slug, resolvedParams.locale);

  // If not found for current locale, try any available locale
  post ??= getPostBySlug(resolvedParams.slug);

  // If still not found in MDX, try fallback posts
  if (!post) {
    const fallbackPosts = getBlogPosts();
    const fallbackPost = fallbackPosts.find(
      (p) => p.slug === resolvedParams.slug,
    );
    if (fallbackPost) {
      post = {
        ...fallbackPost,
        content: "", // No MDX content for fallback posts
        meta: {
          title: fallbackPost.title,
          description: fallbackPost.description,
          date: fallbackPost.lastUpdated.toISOString(),
          tags: fallbackPost.tags,
          published: true,
        },
        locale: resolvedParams.locale,
      };
    }
  }

  return (
    <BlogPostPageClient params={Promise.resolve(resolvedParams)} post={post} />
  );
}
