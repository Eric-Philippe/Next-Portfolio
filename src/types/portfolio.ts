export type DevProjectTags =
  | "WebDev"
  | "Bot"
  | "Tools"
  | "Challenges"
  | "DevOps"
  | "Other";

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
  /** format YYYY/MM or YYYY/MM - YYYY/MM */
  date: string;
  tags: DevProjectTags[];
  previewImg?: string;
}

export interface AlbumData {
  title: string;
  shortTitle: string;
  date: string;
  camera: string;
  phone: string;
  lenses: string[][];
  previewImgOne: string;
  content: string;
}
