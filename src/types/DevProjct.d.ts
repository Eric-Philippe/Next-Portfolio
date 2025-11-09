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
  | "Mobiles"
  | "Other";

export type Tags = {
  name: string;
  type: DevProjectTags;
  emoji: string;
  color: string;
  fadedColor: string;
  secColor: string;
  secGradientColor: string;
};
