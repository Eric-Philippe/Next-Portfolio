import type { AlbumData } from "~/types/portfolio";
import { API_CONTENT_URL } from "../utils/utils";

interface ApiAlbum {
  slug: string;
  title: string;
  short_title: string;
  description: string;
  date: string;
  camera?: string;
  lens?: string;
  phone?: string;
  preview_img_one_url: string;
  feature: boolean;
  category: string;
}

// Transform API album data to AlbumData format
const transformApiAlbum = (apiAlbum: ApiAlbum): AlbumData => {
  return {
    title: apiAlbum.title,
    shortTitle: apiAlbum.short_title,
    slug: apiAlbum.slug,
    date: apiAlbum.date,
    camera: apiAlbum.camera ?? "Unknown Camera",
    phone: apiAlbum.phone ?? "Unknown Phone",
    lenses: apiAlbum.lens
      ? apiAlbum.lens.split(",").map((l) => [l.trim()])
      : [["Unknown Lens"]],
    previewImgOne: API_CONTENT_URL + apiAlbum.preview_img_one_url,
    featured: apiAlbum.feature,
    category: apiAlbum.category as AlbumData["category"],
    description: apiAlbum.description,
    photos: [], // Initially empty, can be populated later
  };
};

// Fetch albums from API
export const fetchAlbums = async (): Promise<AlbumData[]> => {
  try {
    const response = await fetch(`${API_CONTENT_URL}/albums`, {
      // Enable caching and make suitable for SSG
      cache: "force-cache",
      next: { revalidate: 3600 }, // Revalidate every hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = (await response.json()) as unknown;

    // Validate that the response is an array
    if (!Array.isArray(data)) {
      throw new Error("Invalid response format: expected array");
    }

    const apiAlbums = data as ApiAlbum[];
    return apiAlbums
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()) // Sort by date descending
      .map(transformApiAlbum);
  } catch (error) {
    console.error("Failed to fetch albums:", error);
    // Fallback to static albums if API fails
    return albums;
  }
};

// Photography albums data
export const albums: AlbumData[] = [
  /** ==================================================================== */
  {
    title: "Miscellaneous 2025",
    shortTitle: "Misc.25",
    slug: "misc-2025",
    date: "2025",
    featured: false,
    camera: "Canon EOS 800D",
    phone: "Galaxy ZFold4",
    lenses: [
      ["Canon EF-S 18-55mm f/4-5.6 IS STM"],
      ["Canon EF-S 10-18mm f/4.5-5.6 IS STM"],
    ],
    description:
      "Exploring the rhythm and textures of city life through candid moments and architectural details.",
    category: "Other",
    previewImgOne:
      "https://live.staticflickr.com/65535/53476564121_c496d17755_o.jpg",

    photos: [],
  },

  /** ==================================================================== */
  {
    title: "Miscellaneous 2024",
    shortTitle: "Misc.24",
    slug: "misc-2024",
    date: "2024",
    featured: false,
    camera: "Canon EOS 800D",
    lenses: [["Canon EF-S 10-18mm f/4.5-5.6 IS STM"]],
    previewImgOne:
      "https://live.staticflickr.com/65535/53477457381_90382d55ee_o.jpg",
    category: "Other",
    description:
      "Vast horizons and dramatic peaks captured during alpine adventures.",
    photos: [],
  },

  /** ==================================================================== */
  {
    title: "Bordeaux Street Lights",
    shortTitle: "Bordeaux Lights",
    date: "12/2023",
    camera: "Canon EOS 800D",
    phone: "Galaxy ZFold4",
    lenses: [
      ["Canon EF-S 18-55mm f/4-5.6 IS STM"],
      ["Canon EF-S 10-18mm f/4.5-5.6 IS STM"],
    ],
    previewImgOne:
      "https://live.staticflickr.com/65535/53465282817_5185289c8d_o.png",
    featured: false,
    category: "Urban",
    slug: "bordeaux-lights",
    description:
      "Exploring the rhythm and textures of city life through candid moments and architectural details.",
    photos: [],
  },

  /** ==================================================================== */
  {
    title: "Miscellaneous 2022-2023",
    shortTitle: "Misc.22.23",
    date: "12/2023",
    camera: "Canon EOS 800D",
    phone: "Galaxy ZFold4",
    lenses: [
      ["Canon EF-S 18-55mm f/4-5.6 IS STM"],
      ["Canon EF-S 10-18mm f/4.5-5.6 IS STM"],
    ],
    previewImgOne:
      "https://live.staticflickr.com/65535/53471412147_1a5365ae71_o.jpg",
    featured: false,
    category: "Urban",
    slug: "misc-22-23",
    description:
      "Exploring the rhythm and textures of city life through candid moments and architectural details.",
    photos: [],
  },

  /** ==================================================================== */
  {
    title: "Saint-Jean-de-Luz",
    shortTitle: "Saint-Jean-de-Luz",
    date: "03/2023",
    camera: "Canon EOS 800D",
    phone: "Galaxy ZFold4",
    lenses: [
      ["Canon EF-S 18-55mm f/4-5.6 IS STM"],
      ["Canon EF-S 10-18mm f/4.5-5.6 IS STM"],
    ],
    previewImgOne:
      "https://live.staticflickr.com/65535/53476948315_af7650bbd5_o.jpg",
    featured: false,
    category: "Nature",
    slug: "sjdl-2023",
    description:
      "Exploring the rhythm and textures of city life through candid moments and architectural details.",
    photos: [],
  },

  /** ==================================================================== */
  {
    title: "Urban London",
    shortTitle: "London",
    date: "03/2023",
    camera: "Canon EOS 800D",
    phone: "Galaxy ZFold4",
    lenses: [
      ["Canon EF-S 18-55mm f/4-5.6 IS STM"],
      ["Canon EF-S 10-18mm f/4.5-5.6 IS STM"],
    ],
    previewImgOne:
      "https://live.staticflickr.com/65535/53476564121_c496d17755_o.jpg",
    featured: false,
    category: "Urban",
    slug: "london-2023",
    description:
      "Exploring the rhythm and textures of city life through candid moments and architectural details.",
    photos: [],
  },

  /** ==================================================================== */
  {
    title: "Carcassonne - Medieval City",
    shortTitle: "Carcassonne",
    date: "07/2022",
    camera: "Canon EOS 800D",
    phone: "Galaxy ZFold4",
    lenses: [
      ["Canon EF-S 18-55mm f/4-5.6 IS STM"],
      ["Canon EF-S 10-18mm f/4.5-5.6 IS STM"],
    ],
    previewImgOne:
      "https://live.staticflickr.com/65535/53476563761_9d22f3de7c_o.jpg",
    featured: false,
    category: "Architecture",
    slug: "carcassonne-2022",
    description:
      "Exploring the rhythm and textures of city life through candid moments and architectural details.",
    photos: [],
  },

  /** ==================================================================== */
  {
    title: "Saint-Jean-de-Luz - 2022",
    shortTitle: "Saint-Jean-de-Luz",
    date: "03/2022",
    camera: "Canon EOS 800D",
    phone: "Galaxy ZFold4",
    lenses: [
      ["Canon EF-S 18-55mm f/4-5.6 IS STM"],
      ["Canon EF-S 10-18mm f/4.5-5.6 IS STM"],
    ],
    previewImgOne:
      "https://github.com/Eric-Philippe/portfolio/blob/main/_albums/img/SJL-2022.png?raw=true",
    featured: false,
    category: "Landscape",
    slug: "sjdl-2022",
    description:
      "Exploring the rhythm and textures of city life through candid moments and architectural details.",
    photos: [],
  },

  /** ==================================================================== */
  {
    title: "Cardiff",
    shortTitle: "Cardiff",
    date: "10/2019",
    camera: "Canon EOS 800D",
    phone: "Galaxy ZFold4",
    lenses: [
      ["Canon EF-S 18-55mm f/4-5.6 IS STM"],
      ["Canon EF-S 10-18mm f/4.5-5.6 IS STM"],
    ],
    previewImgOne:
      "https://live.staticflickr.com/65535/53471375247_7980df7c16_o.jpg",
    featured: false,
    category: "Urban",
    slug: "cardiff-2019",
    description:
      "Exploring the rhythm and textures of city life through candid moments and architectural details.",
    photos: [],
  },

  /** ==================================================================== */
  {
    title: "Cats and Flowers",
    shortTitle: "Cats and Flowers",
    date: "04/2018",
    camera: "Canon EOS 800D",
    phone: "Galaxy ZFold4",
    lenses: [
      ["Canon EF-S 18-55mm f/4-5.6 IS STM"],
      ["Canon EF-S 10-18mm f/4.5-5.6 IS STM"],
    ],
    previewImgOne:
      "https://images.unsplash.com/photo-1705606217796-a54c4c392c2c?q=80&w=1934&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    featured: false,
    category: "Urban",
    slug: "cats-flowers-2018",
    description:
      "Exploring the rhythm and textures of city life through candid moments and architectural details.",
    photos: [],
  },
];

export const getAlbumById = (id: number): AlbumData | undefined => {
  return albums[id];
};
