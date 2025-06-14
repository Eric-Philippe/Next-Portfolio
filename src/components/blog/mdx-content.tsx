"use client";

import { MDXRemote } from "next-mdx-remote/rsc";
import { mdxComponents } from "~/components/blog/mdx-components";

interface MDXContentProps {
  content: string;
}

export function MDXContent({ content }: MDXContentProps) {
  return (
    <div className="prose prose-lg max-w-none">
      <MDXRemote source={content} components={mdxComponents} />
    </div>
  );
}
