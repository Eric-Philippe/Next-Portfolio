export interface RouterProps {
  setIsDev: (isDev: boolean) => void;
  isDev?: boolean;
}

export interface RouterFocusProps {
  setFocus: (focus: number | null) => void;
}

export interface ProjectData {
  title: string;
  shortDesc: string;
  techs: string[][];
  gitLink: string;
  date: string;
  tag: string;
  previewImg?: string;
  content: string;
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

export type PortfolioMode = "dev" | "photo";
