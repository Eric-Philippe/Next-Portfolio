import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider, hasLocale } from "next-intl";
import { routing } from "~/i18n/routing";
import "~/styles/globals.css";

export const metadata: Metadata = {
  title: "Eric Philippe - Portfolio",
  description:
    "Full Stack Developer & Photographer Portfolio - Modern web development and creative photography",
  icons: [{ rel: "icon", url: "/favicon.svg" }],
};

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  // Ensure that the incoming `locale` is valid
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
