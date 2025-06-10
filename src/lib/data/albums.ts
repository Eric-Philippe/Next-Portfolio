import type { AlbumData } from "~/types/portfolio";

// Placeholder data - replace with your actual albums
export const albums: AlbumData[] = [
  {
    title: "Urban Photography 2024",
    shortTitle: "Urban",
    date: "2024",
    camera: "Canon EOS 800D",
    phone: "Galaxy ZFold4",
    lenses: [
      ["Canon EF-S 18-55mm f/4-5.6 IS STM"],
      ["Canon EF-S 10-18mm f/4.5-5.6 IS STM"],
    ],
    previewImgOne: "/albums/urban-preview.jpg",
    content: `
      <p>This album showcases urban photography captured throughout 2024. From street scenes to architectural details, these images explore the beauty and complexity of city life.</p>
      
      <h3>Equipment Used</h3>
      <p>All photos were taken with the Canon EOS 800D, primarily using the 18-55mm kit lens for versatility and the 10-18mm wide-angle for architectural shots.</p>
      
      <h3>Techniques</h3>
      <p>Focus on natural lighting, street photography ethics, and capturing candid moments in urban environments.</p>
    `,
  },
  // Add more albums here as needed
];

export const getAlbumById = (id: number): AlbumData | undefined => {
  return albums[id];
};
