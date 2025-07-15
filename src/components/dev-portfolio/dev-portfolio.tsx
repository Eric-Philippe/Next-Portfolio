"use client";

import DevHead from "./dev-head";
import ProjectsSection from "./projects-section";
import SkillsSection from "./skills-section";
import AboutSection from "./about-section";
import ContactSection from "./contact-section";
import type { DevProject } from "~/types/DevProjct";

interface DevPortfolioProps {
  devProjects: DevProject[];
  locale: string;
}

export default function DevPortfolio({
  devProjects,
  locale,
}: DevPortfolioProps) {
  return (
    <div className="min-h-screen text-white">
      <DevHead />
      <ProjectsSection devProjects={devProjects} locale={locale} />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
