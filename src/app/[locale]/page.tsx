import HomePageClient from "./page-client";

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  // Ensure params are resolved for Next.js
  await params;

  return <HomePageClient />;
}
