/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { FiCopy, FiCheck } from "react-icons/fi";
import { useState } from "react";

const CodeBlock = ({
  children,
  className,
}: {
  children: string;
  className?: string;
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    void navigator.clipboard.writeText(children);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative my-6">
      <div
        className="overflow-hidden rounded-2xl border border-white/20 bg-slate-900/95 backdrop-blur-md"
        style={{
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.12)",
        }}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-6 py-3">
          <span className="text-xs font-medium text-slate-400">
            {className?.replace("language-", "") ?? "code"}
          </span>
          <button
            onClick={copyToClipboard}
            className="flex items-center gap-2 rounded-lg bg-white/10 px-3 py-1 transition-all duration-200 hover:bg-white/20"
          >
            {copied ? (
              <FiCheck className="h-3 w-3 text-green-400" />
            ) : (
              <FiCopy className="h-3 w-3 text-slate-400" />
            )}
            <span className="text-xs text-slate-400">
              {copied ? "Copied!" : "Copy"}
            </span>
          </button>
        </div>
        <pre className="overflow-x-auto p-6 text-sm leading-relaxed">
          <code className="text-slate-300">{children}</code>
        </pre>
      </div>
    </div>
  );
};

export const mdxComponents = {
  h1: ({ children }: { children: React.ReactNode }) => (
    <motion.h1
      className="mt-12 mb-8 text-4xl font-light tracking-tight text-slate-900 md:text-5xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.h1>
  ),

  h2: ({ children }: { children: React.ReactNode }) => (
    <motion.h2
      className="mt-12 mb-6 text-3xl font-light tracking-tight text-slate-900 md:text-4xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.h2>
  ),

  h3: ({ children }: { children: React.ReactNode }) => (
    <motion.h3
      className="mt-8 mb-4 text-2xl font-medium text-slate-900"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.h3>
  ),

  p: ({ children }: { children: React.ReactNode }) => (
    <motion.p
      className="mb-6 text-lg leading-relaxed text-slate-700"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.p>
  ),

  blockquote: ({ children }: { children: React.ReactNode }) => (
    <motion.div
      className="relative my-8"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <div
        className="rounded-2xl border border-blue-200/50 bg-gradient-to-r from-blue-50/80 to-purple-50/80 p-6 backdrop-blur-md"
        style={{
          boxShadow: "0 8px 32px rgba(59, 130, 246, 0.08)",
        }}
      >
        <div className="absolute top-6 left-6 h-12 w-1 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
        <div className="pl-6 text-slate-700 italic">{children}</div>
      </div>
    </motion.div>
  ),

  code: ({ children, className }: { children: string; className?: string }) => {
    if (className) {
      return <CodeBlock className={className}>{children}</CodeBlock>;
    }
    return (
      <code className="rounded-md border border-slate-200 bg-slate-100 px-2 py-1 font-mono text-sm text-slate-800">
        {children}
      </code>
    );
  },

  ul: ({ children }: { children: React.ReactNode }) => (
    <motion.ul
      className="mb-6 list-none space-y-2"
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      {children}
    </motion.ul>
  ),

  li: ({ children }: { children: React.ReactNode }) => (
    <li className="flex items-start gap-3 text-slate-700">
      <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
      <span className="leading-relaxed">{children}</span>
    </li>
  ),

  a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
    <a
      href={href}
      className="text-blue-600 underline decoration-blue-200 transition-colors duration-200 hover:text-blue-700 hover:decoration-blue-300"
    >
      {children}
    </a>
  ),

  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <img
      src={src}
      alt={alt}
      className="my-8 h-auto w-full rounded-xl shadow-lg"
    />
  ),
};
