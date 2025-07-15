import { Suspense } from "react";
import fs from "fs";
import path from "path";
import LoadingSpinner from "~/components/common/loading-spinner";
import { Header } from "~/components/common/header";
import DevPortfolio from "~/components/dev-portfolio";
import type { DevProject } from "~/types/DevProjct";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export default async function TechPage({ params }: Props) {
  const resolvedParams = await params;
  const firstColor = "#9967ef";
  const secondColor = "#ed4f51";

  const file = fs.readFileSync(
    path.join(process.cwd(), "src/content/", "dev-index.json"),
    "utf-8",
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const apiProjects: DevProject[] = JSON.parse(file);

  return (
    <div>
      <Header firstColor={firstColor} secondColor={secondColor} />
      <Suspense fallback={<LoadingSpinner />}>
        <DevPortfolio
          devProjects={apiProjects}
          locale={resolvedParams.locale}
        />
      </Suspense>
    </div>
  );
}
