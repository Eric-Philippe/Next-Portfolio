import BlogPageClient from "./page-client";
import { getAllPosts } from "~/lib/blog-utils";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const posts = getAllPosts(locale);

  return <BlogPageClient posts={posts} />;
}
