import BlogPageClient from "./page-client";
import { getPostsMetadata } from "~/lib/blog-utils";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params;
  const posts = getPostsMetadata(locale);

  return <BlogPageClient posts={posts} />;
}
