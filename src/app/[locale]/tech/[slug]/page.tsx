import { getAllTechPostSlugs, getTechPostBySlug } from "~/lib/tech-utils";
import TechPostPageClient from "./page-client";

// Generate static params for all tech posts
export async function generateStaticParams() {
  const slugs = getAllTechPostSlugs();

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

export default async function TechPostPage({ params }: Props) {
  const resolvedParams = await params;

  // Try to get post from MDX files for the current locale first
  let post = getTechPostBySlug(resolvedParams.slug, resolvedParams.locale);

  // If not found for current locale, try any available locale
  post ??= getTechPostBySlug(resolvedParams.slug);

  return (
    <TechPostPageClient params={Promise.resolve(resolvedParams)} post={post} />
  );
}
