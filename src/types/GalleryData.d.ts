export type GalleryData = {
  slug: string;
  title: string;
  description: string;
  date: Date;
  tags: string[];
  category: GalleryCategory;
  previewUrl: string;
  photos: string[];
  gear?: string;
  featured?: boolean;
};

export type GalleryCategory =
  | "Urban"
  | "Portrait"
  | "Landscape"
  | "Street"
  | "Nature"
  | "Architecture"
  | "Travel"
  | "Event"
  | "Other";
