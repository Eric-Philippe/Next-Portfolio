"use client";

import DevHead from "./dev-head";
import ProjectsSection from "./projects-section";
import SkillsSection from "./skills-section";
import AboutSection from "./about-section";
import ContactSection from "./contact-section";
import type { EnhancedDevProject } from "~/lib/projects-service";

interface DevPortfolioProps {
  enhancedProjects: EnhancedDevProject[];
  locale: string;
}

export default function DevPortfolio({
  enhancedProjects,
  locale,
}: DevPortfolioProps) {
  return (
    <div className="min-h-screen text-white">
      <DevHead />
      <ProjectsSection enhancedProjects={enhancedProjects} locale={locale} />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
