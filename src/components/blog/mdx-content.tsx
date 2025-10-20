"use client";

import React, { useMemo } from "react";
import { createMdxComponents } from "./mdx-components";

type Theme = "light" | "dark";

interface NumberedListItemProps {
  children: React.ReactNode;
  index: number;
  theme?: Theme;
}

const NumberedListItem: React.FC<NumberedListItemProps> = ({
  children,
  index,
  theme = "light",
}) => {
  const textColor = theme === "dark" ? "text-slate-300" : "text-slate-700";

  return (
    <li className={`flex items-start gap-3 ${textColor}`}>
      <div className="mt-1 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-xs font-medium text-white">
        {index}
      </div>
      <span className="leading-relaxed">{children}</span>
    </li>
  );
};

interface MDXContentProps {
  content?: string;
  serializedContent?: unknown;
  theme?: Theme;
}

// Simple MDX renderer using MDX components
function useMDXComponent(code: string, theme: Theme = "light") {
  return useMemo(() => {
    if (!code) return null;

    try {
      // Parse markdown and create React elements using mdxComponents
      const content = parseMarkdownToReact(code, theme);

      // Return a component that renders the parsed content
      const MDXComponent = () => (
        <div
          className="prose prose-lg max-w-none"
          key={`mdx-${theme}-${code.length}`}
        >
          {content}
        </div>
      );

      MDXComponent.displayName = "MDXComponent";
      return MDXComponent;
    } catch (error) {
      console.error("Error creating MDX component:", error);
      const ErrorComponent = () => (
        <div className="prose prose-lg max-w-none">
          <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
            Error loading content.
          </p>
        </div>
      );

      ErrorComponent.displayName = "MDXErrorComponent";
      return ErrorComponent;
    }
  }, [code, theme]);
}

// Parse markdown and convert to React elements using mdxComponents
function parseMarkdownToReact(
  markdown: string,
  theme: Theme = "light",
): React.ReactNode[] {
  if (!markdown) return [];

  const mdxComponents = createMdxComponents(theme);
  const lines = markdown.split("\n");
  const elements: React.ReactNode[] = [];
  let currentParagraph: string[] = [];
  let inCodeBlock = false;
  let codeBlockContent: string[] = [];
  let codeBlockLanguage = "";
  let listItems: string[] = [];
  let isNumberedList = false;
  let elementKey = 0;

  const flushParagraph = () => {
    if (currentParagraph.length > 0) {
      const text = currentParagraph.join("\n").trim();
      if (text) {
        elements.push(
          <mdxComponents.p key={elementKey++}>
            {parseInlineElements(text, mdxComponents)}
          </mdxComponents.p>,
        );
      }
      currentParagraph = [];
    }
  };

  const flushList = () => {
    if (listItems.length > 0) {
      if (isNumberedList) {
        elements.push(
          <mdxComponents.ol key={elementKey++}>
            {listItems.map((item, index) => (
              <NumberedListItem key={index} index={index + 1} theme={theme}>
                {parseInlineElements(item, mdxComponents)}
              </NumberedListItem>
            ))}
          </mdxComponents.ol>,
        );
      } else {
        elements.push(
          <mdxComponents.ul key={elementKey++}>
            {listItems.map((item, index) => (
              <mdxComponents.li key={index}>
                {parseInlineElements(item, mdxComponents)}
              </mdxComponents.li>
            ))}
          </mdxComponents.ul>,
        );
      }
      listItems = [];
      isNumberedList = false;
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
          {parseInlineElements(line.slice(2), mdxComponents)}
        </mdxComponents.h1>,
      );
      continue;
    }

    if (line.startsWith("## ")) {
      flushParagraph();
      flushList();
      elements.push(
        <mdxComponents.h2 key={elementKey++}>
          {parseInlineElements(line.slice(3), mdxComponents)}
        </mdxComponents.h2>,
      );
      continue;
    }

    if (line.startsWith("### ")) {
      flushParagraph();
      flushList();
      elements.push(
        <mdxComponents.h3 key={elementKey++}>
          {parseInlineElements(line.slice(4), mdxComponents)}
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
          {parseInlineElements(line.slice(2), mdxComponents)}
        </mdxComponents.blockquote>,
      );
      continue;
    } // Handle list items (both unordered and numbered)
    const listMatch = /^[\*\-] /.exec(line);
    const numberedListMatch = /^\d+\.\s/.exec(line);

    if (listMatch) {
      flushParagraph();
      if (listItems.length === 0) {
        isNumberedList = false;
      }
      listItems.push(line.slice(2));
      continue;
    }

    if (numberedListMatch) {
      flushParagraph();
      if (listItems.length === 0) {
        isNumberedList = true;
      }
      listItems.push(line.slice(numberedListMatch[0].length));
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
function parseInlineElements(
  text: string,
  mdxComponents: ReturnType<typeof createMdxComponents>,
): React.ReactNode[] {
  const elements: React.ReactNode[] = [];
  let remaining = text;
  let elementKey = 0;

  while (remaining.length > 0) {
    // Find all possible matches and their positions
    const imageRegex = /!\[([^\]]*)\]\(([^)]+)\)/;
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/;
    const codeRegex = /`([^`]+)`/;
    const boldRegex = /\*\*(.*?)\*\*/;
    const italicRegex = /\_(.*?)\_/;
    const strikethroughRegex = /~~(.*?)~~/;

    const imageMatch = imageRegex.exec(remaining);
    const linkMatch = linkRegex.exec(remaining);
    const codeMatch = codeRegex.exec(remaining);
    const boldMatch = boldRegex.exec(remaining);
    const italicMatch = italicRegex.exec(remaining);
    const strikethroughMatch = strikethroughRegex.exec(remaining);

    // Find the earliest match
    const matches = [
      { match: imageMatch, type: "image" },
      { match: linkMatch, type: "link" },
      { match: codeMatch, type: "code" },
      { match: boldMatch, type: "bold" },
      { match: italicMatch, type: "italic" },
      { match: strikethroughMatch, type: "strikethrough" },
    ].filter((m) => m.match !== null) as Array<{
      match: RegExpExecArray;
      type: string;
    }>;

    if (matches.length === 0) {
      // No more special formatting, add remaining text
      if (remaining.trim()) {
        elements.push(remaining);
      }
      break;
    }

    // Sort by index to find the earliest match
    matches.sort((a, b) => a.match.index - b.match.index);
    const earliest = matches[0];

    if (!earliest) {
      // No matches found (shouldn't happen due to check above, but TypeScript safety)
      if (remaining.trim()) {
        elements.push(remaining);
      }
      break;
    }

    // Add any text before the match
    if (earliest.match.index > 0) {
      const textBefore = remaining.slice(0, earliest.match.index);
      if (textBefore) {
        elements.push(textBefore);
      }
    }

    // Process the match based on type
    switch (earliest.type) {
      case "image":
        elements.push(
          <mdxComponents.img
            key={elementKey++}
            src={earliest.match[2]}
            alt={earliest.match[1]}
          />,
        );
        break;
      case "link":
        elements.push(
          <mdxComponents.a key={elementKey++} href={earliest.match[2]}>
            {earliest.match[1]}
          </mdxComponents.a>,
        );
        break;
      case "code":
        elements.push(
          <mdxComponents.code key={elementKey++}>
            {String(earliest.match[1])}
          </mdxComponents.code>,
        );
        break;
      case "bold":
        elements.push(<strong key={elementKey++}>{earliest.match[1]}</strong>);
        break;
      case "italic":
        elements.push(<em key={elementKey++}>{earliest.match[1]}</em>);
        break;
      case "strikethrough":
        elements.push(
          <span key={elementKey++} className="line-through">
            {earliest.match[1]}
          </span>,
        );
        break;
    }

    // Move past the matched text
    remaining = remaining.slice(
      earliest.match.index + earliest.match[0].length,
    );
  }

  return elements;
}

export function MDXContent({
  content,
  serializedContent,
  theme = "light",
}: MDXContentProps) {
  const MDXComponent = useMDXComponent(content ?? "", theme);

  if (!content && !serializedContent) {
    return (
      <div className="prose prose-lg max-w-none">
        <p className={theme === "dark" ? "text-slate-400" : "text-slate-600"}>
          No content available.
        </p>
      </div>
    );
  }

  if (!MDXComponent) {
    return (
      <div className="prose prose-lg max-w-none">
        <div className="animate-pulse space-y-4">
          <div
            className={`h-4 w-3/4 rounded ${theme === "dark" ? "bg-slate-700" : "bg-slate-200"}`}
          ></div>
          <div
            className={`h-4 w-1/2 rounded ${theme === "dark" ? "bg-slate-700" : "bg-slate-200"}`}
          ></div>
          <div
            className={`h-4 w-5/6 rounded ${theme === "dark" ? "bg-slate-700" : "bg-slate-200"}`}
          ></div>
        </div>
      </div>
    );
  }

  return (
    <div key={`mdx-content-${theme}-${content?.length ?? 0}`}>
      <MDXComponent />
    </div>
  );
}
