import { getBlogPosts } from "~/lib/blog-server";
import BlogPageClient from "./page-client";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const posts = getBlogPosts(locale);

  return <BlogPageClient posts={posts} />;
}
