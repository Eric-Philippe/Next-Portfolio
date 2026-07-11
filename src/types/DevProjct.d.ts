export interface DevProject {
  en: {
    title: string;
    shortDesc: string;
  };

  fr: {
    title: string;
    shortDesc: string;
  };
  techs: string[];
  link: string;
  date: string;
  tags: DevProjectTags[];
  previewImg?: string;
  slug?: string;
  priority: number;
}

export type DevProjectTags =
  | "WebDev"
  | "Bot"
  | "Tools"
  | "Challenges"
  | "DevOps"
  | "Mobile"
  | "Other";

import type { IconType } from "react-icons";

export type Tags = {
  name: string;
  type: DevProjectTags;
  icon: IconType;
  color: string;
  fadedColor: string;
  secColor: string;
  secGradientColor: string;
};
