export interface PrintingProject {
  // Core identifiers
  slug: string;
  locale: string;

  // Display information
  title: string;
  description: string;
  date: string;

  // Media
  heroImage: string;
  images?: string[];

  // Technical details
  printer: string;
  materials: string[];
  printTime?: string;
  filamentUsed?: string;

  // Optional links
  downloadUrl?: string;
  makerworldUrl?: string;

  // Content
  content: React.ReactNode;

  // Meta
  featured?: boolean;
  tags?: string[];
}

export interface PrintingFrontmatter {
  title: string;
  description: string;
  date: string;
  heroImage: string;
  images?: string[];
  printer: string;
  materials: string[];
  printTime?: string;
  filamentUsed?: string;
  downloadUrl?: string;
  makerworldUrl?: string;
  featured?: boolean;
  tags?: string[];
}
