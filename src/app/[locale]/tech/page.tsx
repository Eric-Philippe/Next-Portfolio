import { Suspense } from "react";
import fs from "fs";
import path from "path";
import LoadingSpinner from "~/components/common/loading-spinner";
import { Header } from "~/components/common/header";
import DevPortfolio from "~/components/dev-portfolio";
import type { DevProject } from "~/types/DevProjct";
import {
  DEV_PORTFOLIO_FIRST_COLOR,
  DEV_PORTFOLIO_SECOND_COLOR,
} from "~/content/dev-contents";
import { TECH_DATA_DIR_PATH } from "~/lib/utils";

interface Props {
  params: Promise<{
    locale: string;
  }>;
}

export default async function TechPage({ params }: Props) {
  const resolvedParams = await params;

  const file = fs.readFileSync(
    path.join(process.cwd(), TECH_DATA_DIR_PATH),
    "utf-8",
  );
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const apiProjects: DevProject[] = JSON.parse(file);

  return (
    <div>
      <Header
        firstColor={DEV_PORTFOLIO_FIRST_COLOR}
        secondColor={DEV_PORTFOLIO_SECOND_COLOR}
      />
      <Suspense fallback={<LoadingSpinner />}>
        <DevPortfolio
          devProjects={apiProjects}
          locale={resolvedParams.locale}
        />
      </Suspense>
    </div>
  );
}
