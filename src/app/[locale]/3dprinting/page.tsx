/**
 * 3D Printing Portfolio Page
 * Main page showcasing 3D printing projects and setup
 */

import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "~/components/common/header";
import {
  PrintingHead,
  WorkspaceSection,
  FilamentBandeau,
  MakerworldSection,
  ProjectsSection,
} from "~/components/3d-printing";
import { getAllPrintingPosts } from "~/lib/printing-utils";
import {
  THREE_D_PRINTING_PORTFOLIO_FIRST_COLOR,
  THREE_D_PRINTING_PORTFOLIO_SECOND_COLOR,
} from "~/content/3dprinting-content";

// Page props interface
interface PrintingPageProps {
  params: Promise<{
    locale: string;
  }>;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: PrintingPageProps): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "printing" });

  return {
    title: t("meta.title"),
    description: t("meta.description"),
    openGraph: {
      title: t("meta.title"),
      description: t("meta.description"),
      type: "website",
    },
  };
}

export default async function PrintingPage({ params }: PrintingPageProps) {
  const { locale } = await params;

  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Get all 3D printing projects
  const projects = getAllPrintingPosts(locale);

  return (
    <>
      <Header
        firstColor={THREE_D_PRINTING_PORTFOLIO_FIRST_COLOR}
        secondColor={THREE_D_PRINTING_PORTFOLIO_SECOND_COLOR}
      />

      <main className="min-h-screen bg-slate-950">
        {/* Hero/Introduction Section */}
        <PrintingHead />

        {/* Workbench Section - Tools, Printers, Materials */}
        <WorkspaceSection />

        {/* Decorative Filament Bandeau */}
        <FilamentBandeau />

        {/* Makerworld CTA Section */}
        <MakerworldSection />

        {/* Projects Grid */}
        <ProjectsSection projects={projects} locale={locale} />
      </main>
    </>
  );
}
