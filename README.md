<div style="display: flex; align-items: center;">
    <img src="./img/icon.png" style="width: 50px; height: 50px; margin-right: 10px;">
    <h1>Eric Philippe - Dev, Photo, 3D Printing Portfolio | Blog</h1>
</div>
    
This is my personal portfolio and blog, showcasing my work in web development, photography, and 3D printing. The site is built with Next.js, leveraging its powerful features for a seamless user experience.

[Check out my portfolio](https://ericphlpp.com)

![Portfolio Screenshot](./img/hero.png)

> As of February 2026, the portfolio saw a massive cleanup and added the 3D printing section, showcasing my projects and designs in the 3D printing space !

## Table of Contents

- [Table of Contents](#table-of-contents)
- [About the Project](#about-the-project)
- [Technologies](#technologies)
- [Continuous Integration](#continuous-integration)
- [Technical guides](#technical-guides)
- [Author](#author)

## About the Project

This project is a complete rewrite of my [previous portfolio](https://github.com/Eric-Philippe/PortfolioArchive/tree/main) which was built with React Vite. The new version uses Next.js for better performance and a better SEO.

This website was designed to be content driven, allowing me to easily update my projects and blog posts without needing to modify the codebase. The content is managed through a combination of Markdown files (`.mdx`) allowing me to write rich text content with images, code snippets, and more.

The previous one came with another project, [Julia MarkdownJoy](https://github.com/Eric-Philippe/JuliaMarkdownJoy), which was a Markdown converter made with Julia, with the same approach as what MDX already does. My previous portfolio went with its own sub-project, including this one- [SnapFileThing](https://github.com/Eric-Philippe/SnapFileThing). An easy way for me to host my documents, photos, projects screenshots.

> Before SnapFileThing, I've first started a POC written in Rust for serving all the content of the site and hosting the files, but I quickly realized that Next.js already provides a great solution for this. So I decided to stick with Next.js and use its built-in features for serving static content, also improving the performance and SEO of the site.

## Technologies

| Technology | Description                                               | Version |
| ---------- | --------------------------------------------------------- | ------- |
| Stack      | T3 Stack: Next.js, TypeScript, Tailwind CSS, and more     |         |
| Next.js    | React framework for building server-rendered applications | 15.2.3  |
| TypeScript | Typed superset of JavaScript                              | 5.8.3   |
| React      | JavaScript library for building user interfaces           | 19.0.0  |
| Bun        | JavaScript runtime for fast builds and development        | 1.2.18  |

## Continuous Integration

Making this project with Next.js was a way to leverage the power of Vercel's platform for continuous integration and deployment. The project is hosted on Vercel, which provides automatic deployments on every push to the main branch, ensuring that the latest changes are always live.

## Technical guides

- All the texts are traduced in French and English, using the `next-i18next` package for internationalization, check the `messages/` directory for the translations.
- The `content/` directory contains all the Markdown files, and constants for the projects and blog posts (tags, categories, etc.).
- - All the URLs that are in the website are in the `URLs.ts` file.
- The `lib/` directory contains the utility functions and components used throughout the site, as well as the mdx components for fetching and rendering the Markdown content.
- - Some common utils methods are in the `lib/utils.ts` and the mailer is in the `lib/mailer.ts` file.
- The `components/` directory contains the React components used in the site, including the layout, header, footer, and other reusable components.
- The `app/` directory contains the Next.js app directory structure, including the pages, API routes, and other application-specific code.

## Author

[Eric Philippe](https://ericphilippe.com) - Web Developer & Photographer
