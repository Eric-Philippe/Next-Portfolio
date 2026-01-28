import fs from "fs";
import path from "path";
import type { DevProject } from "~/types/DevProjct";
import { TECH_DATA_DIR_PATH } from "~/lib/utils";
import TechPageClient from "./page-client";

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
    <TechPageClient devProjects={apiProjects} locale={resolvedParams.locale} />
  );
}
