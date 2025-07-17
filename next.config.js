/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
import "./src/env.js";
import createNextIntlPlugin from "next-intl/plugin";
import createMDX from "@next/mdx";

/** @type {import("next").NextConfig} */
const config = {
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
        protocol: "https",
        hostname: "github.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "eric-p.gitbook.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "snapfilething.homeserver-ericp.fr",
        port: "",
        pathname: "/uploads/**",
      },
      {
        protocol: "https",
        hostname: "skillicons.dev",
        port: "",
        pathname: "/icons/**",
      },
      {
        protocol: "https",
        hostname: "upload.wikimedia.org",
        port: "",
        pathname: "/**",
      },
    ],
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
