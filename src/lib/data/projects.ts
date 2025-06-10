import type { ProjectData } from "~/types/portfolio";

// Placeholder data - replace with your actual projects
export const projects: ProjectData[] = [
  {
    title: "Portfolio Website",
    shortDesc:
      "Modern portfolio built with Next.js, TypeScript, and Tailwind CSS. Features a dual portfolio for development and photography work.",
    techs: [["Next.js"], ["TypeScript"], ["Tailwind CSS"], ["Framer Motion"]],
    gitLink: "https://github.com/Eric-Philippe/portfolio",
    date: "January 2024",
    tag: "FRONTEND",
    // previewImg: "/projects/portfolio-preview.gif",
    content: `
      <h3>Presentation</h3>
      <p>My portfolio is a website that allows me to present my development and photography projects and skills. It's built with Next.js and uses Tailwind CSS for styling. It's written in TypeScript and deployed automatically on Vercel.</p>
      
      <h3>Features</h3>
      <ul>
        <li>Dual portfolio for development and photography</li>
        <li>Modern responsive design</li>
        <li>Interactive animations with Framer Motion</li>
        <li>Contact forms with validation</li>
        <li>Project and album showcase</li>
      </ul>
      
      <h3>Technologies</h3>
      <p>This project showcases modern web development practices using Next.js 15, React 19, TypeScript, and Tailwind CSS. The architecture is designed for performance and scalability.</p>
    `,
  },
  // Add more projects here as needed
];

export const getProjectById = (id: number): ProjectData | undefined => {
  return projects[id];
};

export const getProjectsByTag = (tag: string): ProjectData[] => {
  return projects.filter((project) => project.tag === tag);
};
