import { getBlogPosts } from "~/lib/blog-server";
import BlogPageClient from "./page-client";

export default async function BlogPage() {
  const posts = getBlogPosts();

  return <BlogPageClient posts={posts} />;
}
