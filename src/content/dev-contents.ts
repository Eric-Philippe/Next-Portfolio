import type { DevProjectTags, Tags } from "~/types/DevProjct";
import URLS from "./URLs";

export const DEV_PORTFOLIO_FIRST_COLOR = "#9967ef";
export const DEV_PORTFOLIO_SECOND_COLOR = "#ed4f51";

const TECH_COLOR: Record<string, string> = {
  // WEB FRAMEWORKS
  NextJs: "#424242ff",
  React: "#61dafb",
  Angular: "#b52e31",
  Symfony: "#c72d38",

  // FRONTEND LANGUAGES
  HTML: "#e34c26",
  CSS: "#1572B6",
  JavaScript: "#f7e02a",
  TypeScript: "#3178c6",
  PHP: "#777bb3",
  Twig: "#c1d6f0",

  // CSS FRAMEWORKS
  Tailwind: "#38bdf8",
  Bootstrap: "#563d7c",

  // BACKEND LANGUAGES
  Python: "#4f8ebd",
  Golang: "#00ADD8",
  Rust: "#dea584",
  CSharp: "#239120",
  Julia: "#a270ba",
  Java: "#f89820",
  Kotlin: "#563d7c",

  // BACKEND FRAMEWORKS
  SpringBoot: "#6db33f",

  // DATABASES
  PostgreSQL: "#336791",
  MySQL: "#4479a1",
  Redis: "#dc382d",
  Prisma: "#2d3748",
  SQLite: "#003b57",

  // DEVOPS & INFRASTRUCTURE
  Proxmox: "#e57100",
  Docker: "#2496ed",
  TrueNAS: "#0072c6",
  Grafana: "#f46800",
  Prometheus: "#e6522c",

  // OTHERS
  GoogleAPI: "#4285f4",
  Mobile: "#5ac8fa",
  UML: "#f0f0f0",
  UIUX: "#f0f0f0",
};

export const WEBDEV: Tags = {
  name: "WebDev",
  type: "WebDev",
  emoji: "💻",
  color: "rgb(59, 130, 246)",
  fadedColor: "rgba(59, 130, 246, 0.2)",
  secColor: "#93c5fd",
  secGradientColor: "#7c3aed",
};

export const DEVOPS: Tags = {
  name: "DevOps",
  type: "DevOps",
  emoji: "⚙️",
  color: "rgb(34, 197, 94)",
  fadedColor: "rgba(34, 197, 94, 0.2)",
  secColor: "#86efac",
  secGradientColor: "#06b6d4",
};

const BOT: Tags = {
  name: "Bot",
  type: "Bot",
  emoji: "🤖",
  color: "rgb(168, 85, 247)",
  fadedColor: "rgba(168, 85, 247, 0.2)",
  secColor: "#c084fc",
  secGradientColor: "#ec4899",
};

const TOOLS: Tags = {
  name: "Tools",
  type: "Tools",
  emoji: "🛠️",
  color: "rgb(34, 197, 94)",
  fadedColor: "rgba(34, 197, 94, 0.2)",
  secColor: "#86efac",
  secGradientColor: "#06b6d4",
};

const CHALLENGES: Tags = {
  name: "Challenges",
  type: "Challenges",
  emoji: "🧩",
  color: "rgb(249, 115, 22)",
  fadedColor: "rgba(249, 115, 22, 0.2)",
  secColor: "#fdba74",
  secGradientColor: "#f59e0b",
};

const MOBILES: Tags = {
  name: "Mobiles",
  type: "Mobiles",
  emoji: "📱",
  color: "rgb(14, 165, 233)",
  fadedColor: "rgba(14, 165, 233, 0.2)",
  secColor: "#7dd3fc",
  secGradientColor: "#0ea5e9",
};

const OTHER: Tags = {
  name: "Other",
  type: "Other",
  emoji: "✨",
  color: "rgb(139, 92, 246)",
  fadedColor: "rgba(139, 92, 246, 0.2)",
  secColor: "#c4b5fd",
  secGradientColor: "#8b5cf6",
};

export const ALL_TAGS: Tags[] = [WEBDEV, DEVOPS, BOT, TOOLS, CHALLENGES, MOBILES, OTHER];

export const getTagsFromString = (tagType: DevProjectTags): Tags => {
  switch (tagType) {
    case "WebDev":
      return WEBDEV;
    case "DevOps":
      return DEVOPS;
    case "Bot":
      return BOT;
    case "Tools":
      return TOOLS;
    case "Challenges":
      return CHALLENGES;
    case "Mobiles":
      return MOBILES;
    case "Other":
      return OTHER;
    default:
      return WEBDEV;
  }
};

export const getEmojiFromTag = (tag: Tags): string => {
  return tag.emoji;
};

export const getTechColor = (tech: string) => {
  if (tech in TECH_COLOR) return TECH_COLOR[tech];
  return "bg-gray-300";
};
export const getGithubDevContentUrl = (
  slug: string,
  locale: string,
): string => {
  return `${URLS.PORTFOLIO_GITHUB}/blob/main/src/content/tech-posts/${locale}/${slug}.mdx`;
};
