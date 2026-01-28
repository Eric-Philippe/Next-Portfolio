"use client";

import { Suspense } from "react";

import { Header } from "~/components/common/header";
import LoadingSpinner from "~/components/common/loading-spinner";
import {
  ContactSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  DevHead,
} from "~/components/dev-portfolio";

import {
  DEV_PORTFOLIO_FIRST_COLOR,
  DEV_PORTFOLIO_SECOND_COLOR,
} from "~/content/dev-contents";

import type { DevProject } from "~/types/DevProjct";

interface Props {
  devProjects: DevProject[];
  locale: string;
}

export default function TechPageClient({ devProjects, locale }: Props) {
  return (
    <div>
      <Header
        firstColor={DEV_PORTFOLIO_FIRST_COLOR}
        secondColor={DEV_PORTFOLIO_SECOND_COLOR}
      />
      <Suspense fallback={<LoadingSpinner />}>
        <div className="min-h-screen text-white">
          <DevHead />
          <ProjectsSection devProjects={devProjects} locale={locale} />
          <SkillsSection />
          <AboutSection />
          <ContactSection />
        </div>
      </Suspense>
    </div>
  );
}
