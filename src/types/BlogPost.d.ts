export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  lastUpdated: Date;
  readingTime: number;
  tags: string[];
  en_url?: string;
  fr_url?: string;
}
