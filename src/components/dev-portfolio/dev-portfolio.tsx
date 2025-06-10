"use client";

import { useState } from "react";
import DevHead from "./dev-head";
import ProjectsSection from "./projects-section";
import SkillsSection from "./skills-section";
import AboutSection from "./about-section";
import ContactSection from "./contact-section";

export default function DevPortfolio() {
  const [focusedProject, setFocusedProject] = useState<number | null>(null);

  const handleProjectFocus = (index: number) => {
    setFocusedProject(index);
  };

  if (focusedProject !== null) {
    // Return consultation view for specific project
    return (
      <div className="min-h-screen bg-gray-900 text-white">
        <div className="container mx-auto px-4 py-8">
          <button
            onClick={() => setFocusedProject(null)}
            className="mb-4 rounded bg-blue-600 px-4 py-2 text-white transition-colors hover:bg-blue-700"
          >
            ← Back to Projects
          </button>
          <h1 className="mb-4 text-3xl font-bold">Project Details</h1>
          <p>
            Project consultation view for project {focusedProject} - To be
            implemented
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <DevHead />
      <ProjectsSection onProjectFocus={handleProjectFocus} />
      <SkillsSection />
      <AboutSection />
      <ContactSection />
    </div>
  );
}
