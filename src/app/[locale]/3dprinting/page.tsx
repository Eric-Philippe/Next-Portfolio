/**
 * 3D Printing Portfolio Page
 * Main page showcasing 3D printing projects and setup
 */
import { getAllPrintingPosts } from "~/lib/printing-utils";

import PrintingPageClient from "./page-client";

// Page props interface
interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export default async function PrintingPage({ params }: Props) {
  const { locale } = await params;

  // Get all 3D printing projects
  const projects = getAllPrintingPosts(locale);

  return <PrintingPageClient locale={locale} projects={projects} />;
}
