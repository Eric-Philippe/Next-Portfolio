"use client";

import { motion } from "framer-motion";
import { useMemo } from "react";
import { createMdxComponents } from "~/components/blog/mdx-components";
import type { PhotoGallery } from "~/lib/photo-utils";
import Image from "next/image";
import { formatDateFromDate, getPhotoGalleryCategory } from "~/lib/utils";
import { useLocale } from "next-intl";

interface Props {
  gallery: PhotoGallery;
  onImageClick: (src: string, index: number) => void;
}

// Custom MDX renderer that handles image clicks
function useMDXComponent(
  code: string,
  gallery: PhotoGallery,
  onImageClick: (src: string, index: number) => void,
) {
  return useMemo(() => {
    if (!code) return null;

    try {
      const content = parseMarkdownToReact(code, gallery, onImageClick);
      const MDXComponent = () => (
        <div className="prose prose-invert prose-lg max-w-none">{content}</div>
      );
      MDXComponent.displayName = "MDXComponent";
      return MDXComponent;
    } catch (error) {
      console.error("Error creating MDX component:", error);
      const ErrorComponent = () => (
        <div className="prose prose-invert prose-lg max-w-none">
          <p className="text-slate-400">Error loading content.</p>
        </div>
      );
      ErrorComponent.displayName = "MDXErrorComponent";
      return ErrorComponent;
    }
  }, [code, gallery, onImageClick]);
}

// Parse markdown and convert to React elements with clickable images
function parseMarkdownToReact(
  markdown: string,
  gallery: PhotoGallery,
  onImageClick: (src: string, index: number) => void,
): React.ReactNode[] {
  if (!markdown) return [];

  const mdxComponents = createMdxComponents("dark");
  const lines = markdown.split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLanguage = "";
  let listItems: string[] = [];
  let elementKey = 0;

  // Create clickable image component
  const ClickableImage = ({ src, alt }: { src?: string; alt?: string }) => {
    const imageIndex = gallery.photos.findIndex((photo) => photo === src);
    return (
      <motion.div
        className="my-8 cursor-pointer overflow-hidden rounded-xl"
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
        onClick={() => src && onImageClick(src, imageIndex)}
        key={elementKey++}
      >
        <Image
          src={src ?? ""}
          alt={alt ?? ""}
          width={800}
          height={600}
          className="h-auto w-full rounded-xl shadow-2xl transition-transform duration-300 hover:shadow-purple-500/20"
          priority={imageIndex < 3}
        />
        {alt && (
          <motion.div
            className="mt-3 text-center text-sm text-slate-400 italic"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            {alt}
          </motion.div>
        )}
      </motion.div>
    );
  };

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join("\n").trim();
      if (text) {
        // Check if the paragraph contains only an image
        const imageRegex = /^!\[([^\]]*)\]\(([^)]+)\)$/;
        const imageMatch = imageRegex.exec(text);

        if (imageMatch) {
          // If it's just an image, render it as a block element
          elements.push(
            <ClickableImage
              key={elementKey++}
              src={imageMatch[2]}
              alt={imageMatch[1]}
            />,
          );
        } else {
          // Otherwise, parse inline elements but exclude images from paragraphs
          elements.push(
            <p
              key={elementKey++}
              className="font-mono tracking-wide text-gray-300"
            >
              {parseInlineElementsExcludingImages(text, mdxComponents)}
            </p>,
          );
        }
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      elements.push(
        <mdxComponents.ul key={elementKey++}>
          {listItems.map((item, index) => (
            <mdxComponents.li key={index}>
              {parseInlineElementsExcludingImages(item, mdxComponents)}
            </mdxComponents.li>
          ))}
        </mdxComponents.ul>,
      );
      listItems = [];
    }
  };

  for (const line of lines) {
    // Handle code blocks
    if (line.startsWith("```")) {
      flushParagraph();
      flushList();

      if (!inCodeBlock) {
        inCodeBlock = true;
        codeBlockLanguage = line.slice(3).trim();
        codeBlockContent = [];
      } else {
        // End of code block
        elements.push(
          <mdxComponents.code
            key={elementKey++}
            className={
              codeBlockLanguage ? `language-${codeBlockLanguage}` : undefined
            }
          >
            {codeBlockContent.join("\n")}
          </mdxComponents.code>,
        );
        inCodeBlock = false;
        codeBlockContent = [];
        codeBlockLanguage = "";
      }
      continue;
    }

    if (inCodeBlock) {
      codeBlockContent.push(line);
      continue;
    }

    // Handle headers
    if (line.startsWith("# ")) {
      flushParagraph();
      flushList();
      elements.push(
        <mdxComponents.h1 key={elementKey++}>
          {parseInlineElementsExcludingImages(line.slice(2), mdxComponents)}
        </mdxComponents.h1>,
      );
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      elements.push(
        <mdxComponents.h2 key={elementKey++}>
          {parseInlineElementsExcludingImages(line.slice(3), mdxComponents)}
        </mdxComponents.h2>,
      );
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      elements.push(
        <mdxComponents.h3 key={elementKey++}>
          {parseInlineElementsExcludingImages(line.slice(4), mdxComponents)}
        </mdxComponents.h3>,
      );
      continue;
    }

    // Handle blockquotes
    if (line.startsWith("> ")) {
      flushParagraph();
      flushList();
      elements.push(
        <mdxComponents.blockquote key={elementKey++}>
          {parseInlineElementsExcludingImages(line.slice(2), mdxComponents)}
        </mdxComponents.blockquote>,
      );
      continue;
    }

    // Handle standalone images
    const imageRegex = /^!\[([^\]]*)\]\(([^)]+)\)$/;
    const imageMatch = imageRegex.exec(line.trim());
    if (imageMatch) {
      flushParagraph();
      flushList();
      elements.push(
        <ClickableImage
          key={elementKey++}
          src={imageMatch[2]}
          alt={imageMatch[1]}
        />,
      );
      continue;
    }

    // Handle list items
    const listMatch = /^[\*\-] /.exec(line);
    if (listMatch) {
      flushParagraph();
      listItems.push(line.slice(2));
      continue;
    }

    // Handle empty lines
    if (line.trim() === "") {
      flushParagraph();
      flushList();
      continue;
    }

    // Handle regular paragraphs
    if (listItems.length > 0) {
      flushList();
    }
    currentParagraph.push(line);
  }

  // Flush remaining content
  flushParagraph();
  flushList();

  return elements;
}

// Parse inline elements excluding images (to avoid nesting block elements in paragraphs)
function parseInlineElementsExcludingImages(
  text: string,
  mdxComponents: ReturnType<typeof createMdxComponents>,
): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let remaining = text;
  let elementKey = 0;

  while (remaining.length > 0) {
    // Skip images completely to avoid nesting issues
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
    const imageMatch = imageRegex.exec(remaining);
    if (imageMatch && imageMatch.index === 0) {
      // Just skip the image, don't render it inline
      remaining = remaining.slice(imageMatch[0].length);
      continue;
    }

    // Handle links
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
    const linkMatch = linkRegex.exec(remaining);
    if (linkMatch && linkMatch.index === 0) {
      elements.push(
        <mdxComponents.a key={elementKey++} href={linkMatch[2]}>
          {linkMatch[1]}
        </mdxComponents.a>,
      );
      remaining = remaining.slice(linkMatch[0].length);
      continue;
    }

    // Handle inline code
    const codeRegex = /`([^`]+)`/;
    const codeMatch = codeRegex.exec(remaining);
    if (codeMatch && codeMatch.index === 0) {
      elements.push(
        <mdxComponents.code key={elementKey++}>
          {String(codeMatch[1])}
        </mdxComponents.code>,
      );
      remaining = remaining.slice(codeMatch[0].length);
      continue;
    }

    // Handle bold text
    const boldRegex = /\*\*(.*?)\*\*/;
    const boldMatch = boldRegex.exec(remaining);
    if (boldMatch && boldMatch.index === 0) {
      elements.push(<strong key={elementKey++}>{boldMatch[1]}</strong>);
      remaining = remaining.slice(boldMatch[0].length);
      continue;
    }

    // Handle italic text
    const italicRegex = /\*(.*?)\*/;
    const italicMatch = italicRegex.exec(remaining);
    if (italicMatch && italicMatch.index === 0) {
      elements.push(<em key={elementKey++}>{italicMatch[1]}</em>);
      remaining = remaining.slice(italicMatch[0].length);
      continue;
    }

    // Find next special character or end of string
    const nextSpecial = remaining.search(/[`*!\[]/);
    if (nextSpecial === -1) {
      // No more special characters, add remaining text
      if (remaining.trim()) {
        elements.push(remaining);
      }
      break;
    } else if (nextSpecial > 0) {
      // Add text before next special character
      const textPart = remaining.slice(0, nextSpecial);
      if (textPart.trim()) {
        elements.push(textPart);
      }
      remaining = remaining.slice(nextSpecial);
    } else {
      // Special character at start but no match, add the character and continue
      elements.push(remaining[0]);
      remaining = remaining.slice(1);
    }
  }

  return elements;
}

export default function GalleryMdxView({ gallery, onImageClick }: Props) {
  const locale = useLocale();
  const MDXComponent = useMDXComponent(gallery.content, gallery, onImageClick);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-gray-900 to-slate-800">
      <div className="mx-auto max-w-4xl px-6 py-12">
        {/* Gallery Header */}
        <motion.header
          className="mb-12 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-4xl font-light tracking-tight text-transparent md:text-5xl">
            {gallery.title}
          </h1>
          <p className="mb-6 text-lg text-slate-300">{gallery.description}</p>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-slate-400">
            <time className="flex items-center gap-2">
              📅 {formatDateFromDate(gallery.date, locale)}
            </time>
            {gallery.gear && (
              <span className="flex items-center gap-2">📷 {gallery.gear}</span>
            )}
            <span className="rounded-full bg-purple-900/30 px-3 py-1 text-purple-300">
              {getPhotoGalleryCategory(gallery.category, locale)}
            </span>
          </div>
        </motion.header>

        {/* Tags */}
        {gallery.tags.length > 0 && (
          <motion.div
            className="mb-8 flex flex-wrap justify-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {gallery.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full bg-slate-800/50 px-3 py-1 text-xs text-slate-300 backdrop-blur-sm"
              >
                #{tag}
              </span>
            ))}
          </motion.div>
        )}

        {/* MDX Content */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          {MDXComponent ? (
            <MDXComponent />
          ) : (
            <div className="prose prose-invert prose-lg max-w-none">
              <p className="text-slate-400">No content available.</p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
}
