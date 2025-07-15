export interface AlbumData {
  title: string;
  shortTitle: string;
  date: string;
  camera: string;
  phone?: string;
  lenses: string[][];
  previewImgOne: string;
  featured?: boolean;
  category: AlbumCategory;
  slug: string;
  description: string;
  photos: {
    imgUrl: string;
    caption: string;
  }[];
}

export type AlbumCategory =
  | "Urban"
  | "Portrait"
  | "Landscape"
  | "Street"
  | "Nature"
  | "Architecture"
  | "Travel"
  | "Event"
  | "Other";
