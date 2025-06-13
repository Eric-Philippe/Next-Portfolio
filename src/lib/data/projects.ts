import type { DevProject, DevProjectTags } from "~/types/portfolio";
import { API_CONTENT_URL } from "../utils/utils";

interface ApiProject {
  slug: string;
  en_title: string;
  en_short_description: string;
  fr_title: string;
  fr_short_description: string;
  techs: string;
  link: string;
  date: string;
  tags: string;
  priority: number;
}

// Transform API data to DevProject format
const transformApiProject = (apiProject: ApiProject): DevProject => {
  return {
    en: {
      title: apiProject.en_title,
      shortDesc: apiProject.en_short_description,
    },
    fr: {
      title: apiProject.fr_title,
      shortDesc: apiProject.fr_short_description,
    },
    techs: apiProject.techs.split(",").map((tech) => tech.trim()),
    link: apiProject.link,
    date: apiProject.date,
    tags: apiProject.tags.split(",").map((tag) => tag.trim() as DevProjectTags),
  };
};

// Fetch projects from API
export const fetchProjects = async (): Promise<DevProject[]> => {
  try {
    const response = await fetch(`${API_CONTENT_URL}/dev-projects`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as unknown;

    // Validate that the response is an array
    if (!Array.isArray(data)) {
      throw new Error("Invalid response format: expected array");
    }

    const apiProjects = data as ApiProject[];
    return apiProjects
      .sort((a, b) => a.priority - b.priority) // Sort by priority
      .map(transformApiProject);
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return []; // Return empty array on any error
  }
};
