import type { DevProject } from "~/types/portfolio";

export interface EnhancedDevProject extends DevProject {
  hasDetailPage?: boolean;
  techPostSlug?: string;
}

/**
 * Enhance projects with tech post information
 * This version works with pre-fetched data to avoid server-only dependencies
 */
export function enhanceProjectsWithTechPosts(
  apiProjects: DevProject[],
  techPostSlugs: string[],
): EnhancedDevProject[] {
  // Create a set of available tech post slugs for quick lookup
  const techPostSlugSet = new Set(techPostSlugs);

  // Enhance projects with tech post information
  const enhancedProjects: EnhancedDevProject[] = apiProjects.map((project) => {
    // Try to find a corresponding tech post
    const possibleSlugs = [
      // Convert title to slug format
      project.en.title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    ];

    let matchingSlug = null;

    for (const slug of possibleSlugs) {
      if (techPostSlugSet.has(slug)) {
        matchingSlug = slug;
        break;
      }
    }

    return {
      ...project,
      slug: matchingSlug ?? undefined,
      hasDetailPage: !!matchingSlug,
      techPostSlug: matchingSlug ?? undefined,
    };
  });

  return enhancedProjects;
}
