import PrintingProjectPageClient from "./page-client";

import {
  getAllPrintingSlugs,
  getPrintingPostBySlug,
} from "~/lib/printing-utils";

export async function generateStaticParams() {
  const slugs = getAllPrintingSlugs();

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

export default async function PrintingProjectPage({ params }: Props) {
  const resolvedParams = await params;

  // Try to get post from MDX files for the current locale first
  let post = getPrintingPostBySlug(resolvedParams.slug, resolvedParams.locale);

  // If not found for current locale, try any available locale
  post ??= getPrintingPostBySlug(resolvedParams.slug);

  return (
    <PrintingProjectPageClient
      params={Promise.resolve(resolvedParams)}
      project={post}
    />
  );
}
