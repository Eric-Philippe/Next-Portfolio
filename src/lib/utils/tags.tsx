import type { DevProjectTags } from "~/types/portfolio";

/**
 * @typedef {object} Tags
 * @property {string} name - The name of the tag
 * @property {DevProjectTags} type - The DevProjectTags type
 * @property {string} emoji - The emoji for the tag
 * @property {string} color - The color of the tag
 * @property {string} fadedColor - The faded color of the tag
 * @property {string} secColor - The secondary color of the tag
 * @property {string} secGradientColor - The secondary gradient color of the tag
 */
export type Tags = {
  name: string;
  type: DevProjectTags;
  emoji: string;
  color: string;
  fadedColor: string;
  secColor: string;
  secGradientColor: string;
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

const OTHER: Tags = {
  name: "Other",
  type: "Other",
  emoji: "✨",
  color: "rgb(139, 92, 246)",
  fadedColor: "rgba(139, 92, 246, 0.2)",
  secColor: "#c4b5fd",
  secGradientColor: "#8b5cf6",
};

export const ALL_TAGS: Tags[] = [WEBDEV, DEVOPS, BOT, TOOLS, CHALLENGES, OTHER];

/**
 * @description - Gets the tags from a DevProjectTags type
 * @param tagType - The DevProjectTags type to get the tag from
 * @returns {Tags} - The tags
 */
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
    case "Other":
      return OTHER;
    default:
      return WEBDEV;
  }
};

/**
 * @description - Gets the emoji from a tag
 * @param tag - The tag to get the emoji from
 * @returns {string} - The emoji
 */
export const getEmojiFromTag = (tag: Tags): string => {
  return tag.emoji;
};
