/**
 * 3D Printing Project Detail Page
 * Individual project page with hero image, details, and content
 * Premium glassmorphism design consistent with portfolio
 */

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Header } from "~/components/common/header";
import {
  getPrintingPostBySlug,
  getAllPrintingSlugs,
} from "~/lib/printing-utils";

// Page props interface
interface ProjectPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

// Generate static params for all projects
export async function generateStaticParams() {
  const locales = ["en", "fr"];
  const slugs = getAllPrintingSlugs();
  const paths: { locale: string; slug: string }[] = [];

  for (const locale of locales) {
    for (const slug of slugs) {
      paths.push({ locale, slug });
    }
  }

  return paths;
}

// Generate metadata for SEO
export async function generateMetadata({
  params,
}: ProjectPageProps): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getPrintingPostBySlug(slug, locale);

  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      images: project.heroImage ? [project.heroImage] : [],
    },
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { locale, slug } = await params;

  // Enable static rendering for this locale
  setRequestLocale(locale);

  // Get project data
  const project = getPrintingPostBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: "printing" });

  if (!project) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="min-h-screen bg-slate-950">
        {/* Hero Section */}
        <section className="relative">
          {/* Hero Image */}
          <div className="relative h-[50vh] w-full overflow-hidden md:h-[60vh]">
            {project.heroImage ? (
              <Image
                src={project.heroImage}
                alt={project.title}
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-slate-800 to-slate-900">
                <svg
                  className="h-24 w-24 text-slate-700"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </div>
            )}

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

            {/* Back button */}
            <div className="absolute top-24 left-6 z-10">
              <Link
                href={`/${locale}/3dprinting`}
                className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-slate-900/60 px-4 py-2 text-sm text-white/80 backdrop-blur-xl transition-colors hover:bg-slate-900/80"
              >
                <svg
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span>{t("project.back")}</span>
              </Link>
            </div>
          </div>

          {/* Title overlay */}
          <div className="relative z-10 -mt-32 px-6">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 backdrop-blur-xl md:p-12">
                {/* Date */}
                <time className="text-sm font-light tracking-wide text-cyan-400/70 uppercase">
                  {new Date(project.date).toLocaleDateString(locale, {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </time>

                {/* Title */}
                <h1 className="mt-3 font-serif text-4xl font-light text-white/90 md:text-5xl">
                  {project.title}
                </h1>

                {/* Description */}
                <p className="mt-4 text-lg leading-relaxed font-light text-slate-300/80">
                  {project.description}
                </p>

                {/* Technical details grid */}
                <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-4">
                  {/* Printer */}
                  <div className="rounded-[1rem] border border-white/5 bg-slate-800/30 p-4">
                    <p className="mb-1 text-xs tracking-wide text-slate-500 uppercase">
                      {t("project.printer")}
                    </p>
                    <p className="font-light text-white/80">
                      {project.printer}
                    </p>
                  </div>

                  {/* Materials */}
                  <div className="rounded-[1rem] border border-white/5 bg-slate-800/30 p-4">
                    <p className="mb-1 text-xs tracking-wide text-slate-500 uppercase">
                      {t("project.materials")}
                    </p>
                    <p className="font-light text-white/80">
                      {project.materials.join(", ")}
                    </p>
                  </div>

                  {/* Print time */}
                  {project.printTime && (
                    <div className="rounded-[1rem] border border-white/5 bg-slate-800/30 p-4">
                      <p className="mb-1 text-xs tracking-wide text-slate-500 uppercase">
                        {t("project.printTime")}
                      </p>
                      <p className="font-light text-white/80">
                        {project.printTime}
                      </p>
                    </div>
                  )}

                  {/* Filament used */}
                  {project.filamentUsed && (
                    <div className="rounded-[1rem] border border-white/5 bg-slate-800/30 p-4">
                      <p className="mb-1 text-xs tracking-wide text-slate-500 uppercase">
                        {t("project.filament")}
                      </p>
                      <p className="font-light text-white/80">
                        {project.filamentUsed}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content Section */}
        <section className="px-6 py-16">
          <div className="mx-auto max-w-4xl">
            {/* MDX Content */}
            <article className="prose prose-invert prose-lg prose-slate prose-headings:font-serif prose-headings:font-light prose-headings:text-white/90 prose-p:text-slate-300/80 prose-p:font-light prose-a:text-cyan-400 prose-a:no-underline hover:prose-a:underline prose-strong:text-white/90 prose-code:text-cyan-300 prose-code:bg-slate-800/50 prose-code:px-2 prose-code:py-0.5 prose-code:rounded-lg prose-pre:bg-slate-800/50 prose-pre:border prose-pre:border-white/10 prose-pre:rounded-[1rem] max-w-none">
              <MDXRemote source={project.content} />
            </article>

            {/* Download button if available */}
            {project.downloadUrl && (
              <div className="mt-12 border-t border-white/10 pt-8">
                <a
                  href={project.downloadUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 rounded-full border border-white/20 bg-gradient-to-r from-cyan-500/20 to-violet-500/20 px-6 py-3 font-light text-white/90 transition-all duration-300 hover:from-cyan-500/30 hover:to-violet-500/30"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    />
                  </svg>
                  <span>{t("project.download")}</span>
                </a>
              </div>
            )}

            {/* Makerworld link if available */}
            {project.makerworldUrl && (
              <div className="mt-6">
                <a
                  href={project.makerworldUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-cyan-400/70 transition-colors hover:text-cyan-400"
                >
                  <span>{t("project.viewOnMakerworld")}</span>
                  <svg
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </a>
              </div>
            )}
          </div>
        </section>

        {/* Image Gallery if additional images exist */}
        {project.images && project.images.length > 0 && (
          <section className="bg-slate-900/50 px-6 py-16">
            <div className="mx-auto max-w-6xl">
              <h2 className="mb-8 text-center font-serif text-2xl font-light text-white/90">
                {t("project.gallery")}
              </h2>

              <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                {project.images.map((image, index) => (
                  <div
                    key={index}
                    className="relative aspect-square overflow-hidden rounded-[1.5rem] bg-slate-800/50"
                  >
                    <Image
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover transition-transform duration-500 hover:scale-105"
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  );
}
