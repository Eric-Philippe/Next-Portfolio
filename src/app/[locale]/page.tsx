import { LinkTree } from "~/components/link-tree";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  // Ensure params are resolved for Next.js
  await params;

  return <LinkTree />;
}
