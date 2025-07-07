import { Suspense } from "react";
import { PortfolioProvider } from "~/lib/portfolio-context";
import LoadingSpinner from "~/components/common/loading-spinner";
import { Header } from "~/components/common/header";
import DevPortfolio from "~/components/dev-portfolio";
import { fetchProjects } from "~/lib/data/projects";
import { getAllTechPostSlugs } from "~/lib/tech-utils";
import { enhanceProjectsWithTechPosts } from "~/lib/projects-service";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export default async function TechPage({ params }: Props) {
  const resolvedParams = await params;
  const firstColor = "#9967ef";
  const secondColor = "#ed4f51";

  // Fetch data server-side
  const [apiProjects, techPostSlugs] = await Promise.all([
    fetchProjects(),
    getAllTechPostSlugs(),
  ]);

  // Enhance projects with tech post information
  const enhancedProjects = enhanceProjectsWithTechPosts(
    apiProjects,
    techPostSlugs,
  );

  return (
    <PortfolioProvider>
      <Header firstColor={firstColor} secondColor={secondColor} />
      <Suspense fallback={<LoadingSpinner />}>
        <DevPortfolio
          enhancedProjects={enhancedProjects}
          locale={resolvedParams.locale}
        />
      </Suspense>
    </PortfolioProvider>
  );
}
