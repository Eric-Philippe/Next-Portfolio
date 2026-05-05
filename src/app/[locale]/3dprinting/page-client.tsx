"use client";

import { Header } from "~/components/common/header";
import {
  PrintingHead,
  WorkspaceSection,
  FilamentBandeau,
  MakerworldSection,
  ProjectsSection,
  ContactSection,
} from "~/components/3d-printing";
import { type PrintingPostWithContent } from "~/lib/printing-utils.types";
import {
  THREE_D_PRINTING_PORTFOLIO_FIRST_COLOR,
  THREE_D_PRINTING_PORTFOLIO_SECOND_COLOR,
} from "~/content/3dprinting-content";

// Page props interface
interface Props {
  locale: string;
  projects: PrintingPostWithContent[];
}

export default function PrintingPageClient({ locale, projects }: Props) {
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

        {/* Contact Section */}
        <ContactSection />
      </main>
    </>
  );
}
