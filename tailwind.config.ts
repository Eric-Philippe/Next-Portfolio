import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sohne: ["var(--font-sohne)", "system-ui", "sans-serif"],
        feijoa: ["var(--font-feijoa)", "Georgia", "serif"],
        expose: ["var(--font-expose)", "Arial", "Helvetica", "sans-serif"],
      },
      colors: {
        "gh-marketingDark": "#0d1117",
        "gh-marketingLight": "#21262d",
        "gh-textLight": "#8b949e",
      },
    },
  },
  plugins: [],
};

export default config;
