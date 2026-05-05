/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";
import type { NextConfig } from "next";

/** @type {NextConfig} */
const config: NextConfig = {
  // Any route here that should exclude the huge .next/cache directory
  outputFileTracingExcludes: {
    "/[locale]/tech/[slug]": ["./.next/cache/**/*"],
    "/[locale]/blog/[slug]": ["./.next/cache/**/*"],
    "/[locale]/photo/[slug]": ["./.next/cache/**/*"],
    "/[locale]/blog": ["./.next/cache/**/*"],
    "/[locale]/photo": ["./.next/cache/**/*"],
    "/[locale]/tech": ["./.next/cache/**/*"],
  },
  pageExtensions: ["js", "jsx", "mdx", "ts", "tsx"],
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "github.com",
        pathname: "/**",
      },
      {
        protocol: "https" as const,
        hostname: "eric-p.gitbook.io",
        pathname: "/**",
      },
      {
        protocol: "https" as const,
        hostname: "avatars.githubusercontent.com",
        pathname: "/**",
      },
      {
        protocol: "https" as const,
        hostname: "snapfilething.homeserver-ericp.fr",
        pathname: "/uploads/**",
      },
      {
        protocol: "https" as const,
        hostname: "live.staticflickr.com",
        pathname: "/**",
      },
      {
        protocol: "https" as const,
        hostname: "skillicons.dev",
        pathname: "/icons/**",
      },
      {
        protocol: "https" as const,
        hostname: "upload.wikimedia.org",
        pathname: "/**",
      },
    ] as const,
    dangerouslyAllowSVG: true,
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(withMDX(config));
