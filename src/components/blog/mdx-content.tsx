"use client";

import { MDXRemote } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import { mdxComponents } from "~/components/blog/mdx-components";
import { useEffect, useState } from "react";
import type { MDXRemoteSerializeResult } from "next-mdx-remote";

interface MDXContentProps {
  content?: string;
  serializedContent?: MDXRemoteSerializeResult;
}

export function MDXContent({ content, serializedContent }: MDXContentProps) {
  const [mdxSource, setMdxSource] = useState<MDXRemoteSerializeResult | null>(
    serializedContent ?? null,
  );
  const [isLoading, setIsLoading] = useState(!serializedContent && !!content);

  useEffect(() => {
    if (serializedContent) {
      setMdxSource(serializedContent);
      setIsLoading(false);
      return;
    }

    if (!content) {
      setIsLoading(false);
      return;
    }

    const serializeContent = async () => {
      try {
        const serialized = await serialize(content, {
          mdxOptions: {
            remarkPlugins: [],
            rehypePlugins: [],
            development: process.env.NODE_ENV === "development",
          },
        });
        setMdxSource(serialized);
      } catch (error) {
        console.error("Error serializing MDX content:", error);
      } finally {
        setIsLoading(false);
      }
    };

    void serializeContent();
  }, [content, serializedContent]);

  if (isLoading) {
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

  if (!mdxSource) {
    return (
      <div className="prose prose-lg max-w-none">
        <p className="text-slate-600">Error loading content.</p>
      </div>
    );
  }

  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote {...mdxSource} components={mdxComponents} />
    </div>
  );
}
