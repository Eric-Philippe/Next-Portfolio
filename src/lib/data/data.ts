export const EMAIL = "ericphlpp@proton.me";
export const URL = "https://ericphlpp.com";
export const GITHUB_URL = "https://github.com/Eric-Philippe/Next-Portfolio";

// https://github.com/Eric-Philippe/Next-Portfolio/blob/main/src/tech-posts/fr/portfolio-website.mdx
export const getGithubDevContentUrl = (
  slug: string,
  locale: string,
): string => {
  return `${GITHUB_URL}/blob/main/src/tech-posts/${locale}/${slug}.mdx`;
};

export const getGithubBlogContentUrl = (
  slug: string,
  locale: string,
): string => {
  return `${GITHUB_URL}/blob/main/src/blog-posts/${locale}/${slug}.mdx`;
};
