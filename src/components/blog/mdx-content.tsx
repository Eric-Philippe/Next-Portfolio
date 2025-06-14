"use client";

import React, { useMemo } from "react";
import { mdxComponents } from "./mdx-components";

interface MDXContentProps {
  content?: string;
  serializedContent?: unknown;
}

// Simple MDX renderer using MDX components
function useMDXComponent(code: string) {
  return useMemo(() => {
    if (!code) return null;

    try {
      // Parse markdown and create React elements using mdxComponents
      const content = parseMarkdownToReact(code);

      // Return a component that renders the parsed content
      const MDXComponent = () => (
        <div className="prose prose-lg max-w-none">{content}</div>
      );

      MDXComponent.displayName = "MDXComponent";
      return MDXComponent;
    } catch (error) {
      console.error("Error creating MDX component:", error);
      const ErrorComponent = () => (
        <div className="prose prose-lg max-w-none">
          <p className="text-slate-600">Error loading content.</p>
        </div>
      );

      ErrorComponent.displayName = "MDXErrorComponent";
      return ErrorComponent;
    }
  }, [code]);
}

// Parse markdown and convert to React elements using mdxComponents
function parseMarkdownToReact(markdown: string): React.ReactNode[] {
  if (!markdown) return [];

  const lines = markdown.split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLanguage = "";
  let listItems: string[] = [];
  let elementKey = 0;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join("\n").trim();
      if (text) {
        elements.push(
          <mdxComponents.p key={elementKey++}>
            {parseInlineElements(text)}
          </mdxComponents.p>,
        );
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
              {parseInlineElements(item)}
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
          {parseInlineElements(line.slice(2))}
        </mdxComponents.h1>,
      );
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      elements.push(
        <mdxComponents.h2 key={elementKey++}>
          {parseInlineElements(line.slice(3))}
        </mdxComponents.h2>,
      );
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      elements.push(
        <mdxComponents.h3 key={elementKey++}>
          {parseInlineElements(line.slice(4))}
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
          {parseInlineElements(line.slice(2))}
        </mdxComponents.blockquote>,
      );
      continue;
    } // Handle list items
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

// Parse inline elements (bold, italic, links, etc.)
function parseInlineElements(text: string): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let remaining = text;
  let elementKey = 0;
  while (remaining.length > 0) {
    // Handle images
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
    const imageMatch = imageRegex.exec(remaining);
    if (imageMatch && imageMatch.index === 0) {
      elements.push(
        <mdxComponents.img
          key={elementKey++}
          src={imageMatch[2]}
          alt={imageMatch[1]}
        />,
      );
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
    } // Handle inline code
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

export function MDXContent({ content, serializedContent }: MDXContentProps) {
  const MDXComponent = useMDXComponent(content ?? "");

  if (!content && !serializedContent) {
    return (
      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">No content available.</p>
      </div>
    );
  }

  if (!MDXComponent) {
    return (
      <div className="prose prose-lg max-w-none">
        <div className="animate-pulse space-y-4">
          <div className="h-4 w-3/4 rounded bg-slate-200"></div>
          <div className="h-4 w-1/2 rounded bg-slate-200"></div>
          <div className="h-4 w-5/6 rounded bg-slate-200"></div>
        </div>
      </div>
    );
  }

  return <MDXComponent />;
}
