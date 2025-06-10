"use client";

import { PortfolioProvider } from "~/lib/portfolio-context";
import { Header } from "~/components/common/header";

export default function BlogPage() {
  const firstColor = "#4ecdc4";
  const secondColor = "#45b7d1";

  return (
    <PortfolioProvider>
      <Header firstColor={firstColor} secondColor={secondColor} />
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="container mx-auto px-4 py-16">
          <div className="mx-auto max-w-4xl">
            <h1 className="mb-8 text-center text-5xl font-bold">
              <span
                className="bg-gradient-to-r bg-clip-text text-transparent"
                style={{
                  backgroundImage: `linear-gradient(90deg, ${firstColor} 0%, ${secondColor} 100%)`,
                }}
              >
                Blog
              </span>
            </h1>
            <div className="rounded-lg bg-slate-800 p-8 text-center">
              <h2 className="mb-4 text-2xl font-semibold">Coming Soon</h2>
              <p className="text-lg text-gray-300">
                Le blog est en cours de développement. Revenez bientôt pour
                découvrir mes articles sur le développement web et la
                photographie !
              </p>
            </div>
          </div>
        </div>
      </div>
    </PortfolioProvider>
  );
}
