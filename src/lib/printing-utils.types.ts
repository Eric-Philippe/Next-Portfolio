/**
 * Type definitions for printing utilities
 * This file contains only types and can be imported safely in client components
 */

export interface PrintingPostMeta {
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
  published?: boolean;
}

export interface PrintingPostWithContent {
  slug: string;
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
  tags: string[];
  lastUpdated: Date;
  readingTime: number;
  content: string;
  meta: PrintingPostMeta;
  locale: string;
}
