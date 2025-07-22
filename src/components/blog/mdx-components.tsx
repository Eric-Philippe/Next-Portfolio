/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { FiCopy, FiCheck } from "react-icons/fi";
import { useState } from "react";

type Theme = "light" | "dark";

interface ThemeColors {
  text: {
    primary: string;
    secondary: string;
    muted: string;
  };
  background: {
    primary: string;
    secondary: string;
    accent: string;
  };
  border: string;
  link: {
    default: string;
    hover: string;
    decoration: {
      default: string;
      hover: string;
    };
  };
  code: {
    background: string;
    text: string;
    border: string;
  };
  blockquote: {
    background: string;
    border: string;
    shadow: string;
  };
}

const themeColors: Record<Theme, ThemeColors> = {
  light: {
    text: {
      primary: "text-slate-900",
      secondary: "text-slate-700",
      muted: "text-slate-600",
    },
    background: {
      primary: "bg-white",
      secondary: "bg-slate-50",
      accent: "bg-gradient-to-r from-blue-50/80 to-purple-50/80",
    },
    border: "border-slate-200",
    link: {
      default: "text-blue-600",
      hover: "hover:text-blue-700",
      decoration: {
        default: "decoration-blue-200",
        hover: "hover:decoration-blue-300",
      },
    },
    code: {
      background: "bg-slate-100",
      text: "text-slate-800",
      border: "border-slate-200",
    },
    blockquote: {
      background: "bg-gradient-to-r from-blue-50/80 to-purple-50/80",
      border: "border-blue-200/50",
      shadow: "0 8px 32px rgba(59, 130, 246, 0.08)",
    },
  },
  dark: {
    text: {
      primary: "text-slate-100",
      secondary: "text-slate-300",
      muted: "text-slate-400",
    },
    background: {
      primary: "bg-slate-900",
      secondary: "bg-slate-800",
      accent: "bg-gradient-to-r from-slate-800/80 to-slate-700/80",
    },
    border: "border-slate-700",
    link: {
      default: "text-blue-400",
      hover: "hover:text-blue-300",
      decoration: {
        default: "decoration-blue-400/50",
        hover: "hover:decoration-blue-300/70",
      },
    },
    code: {
      background: "bg-slate-800",
      text: "text-slate-200",
      border: "border-slate-700",
    },
    blockquote: {
      background: "bg-gradient-to-r from-slate-800/80 to-slate-700/80",
      border: "border-slate-600/50",
      shadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    },
  },
};

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

export const createMdxComponents = (theme: Theme = "light") => {
  const colors = themeColors[theme];

  return {
    h1: ({ children }: { children: React.ReactNode }) => (
      <motion.h1
        className={`mt-12 mb-8 text-4xl font-light tracking-tight ${colors.text.primary} md:text-5xl`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        key={`h1-${theme}`}
      >
        {children}
      </motion.h1>
    ),

    h2: ({ children }: { children: React.ReactNode }) => (
      <motion.h2
        className={`mt-12 mb-6 text-3xl font-light tracking-tight ${colors.text.primary} md:text-4xl`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        key={`h2-${theme}`}
      >
        {children}
      </motion.h2>
    ),

    h3: ({ children }: { children: React.ReactNode }) => (
      <motion.h3
        className={`mt-8 mb-4 text-2xl font-medium ${colors.text.primary}`}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        key={`h3-${theme}`}
      >
        {children}
      </motion.h3>
    ),

    p: ({ children }: { children: React.ReactNode }) => (
      <motion.p
        className={`mb-6 text-lg leading-relaxed ${colors.text.secondary}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        key={`p-${theme}`}
      >
        {children}
      </motion.p>
    ),

    blockquote: ({ children }: { children: React.ReactNode }) => (
      <motion.div
        className="relative my-8"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        key={`blockquote-${theme}`}
      >
        <div
          className={`rounded-2xl border ${colors.blockquote.border} ${colors.blockquote.background} p-6 backdrop-blur-md`}
          style={{
            boxShadow: colors.blockquote.shadow,
          }}
        >
          <div className="absolute top-6 left-6 h-12 w-1 rounded-full bg-gradient-to-b from-blue-500 to-purple-500" />
          <div className={`pl-6 ${colors.text.secondary} italic`}>
            {children}
          </div>
        </div>
      </motion.div>
    ),

    code: ({
      children,
      className,
    }: {
      children: string;
      className?: string;
    }) => {
      if (className) {
        return <CodeBlock className={className}>{children}</CodeBlock>;
      }
      return (
        <code
          className={`rounded-md border ${colors.code.border} ${colors.code.background} px-2 py-1 font-mono text-sm ${colors.code.text}`}
        >
          {children}
        </code>
      );
    },

    ul: ({ children }: { children: React.ReactNode }) => (
      <motion.ul
        className="mb-6 list-none space-y-2"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        key={`ul-${theme}`}
      >
        {children}
      </motion.ul>
    ),

    ol: ({ children }: { children: React.ReactNode }) => (
      <motion.ol
        className="mb-6 list-none space-y-3"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        key={`ol-${theme}`}
      >
        {children}
      </motion.ol>
    ),

    li: ({ children }: { children: React.ReactNode }) => (
      <li className={`flex items-start gap-3 ${colors.text.secondary}`}>
        <div className="mt-3 h-2 w-2 flex-shrink-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-500" />
        <span className="leading-relaxed">{children}</span>
      </li>
    ),

    a: ({ children, href }: { children: React.ReactNode; href?: string }) => (
      <a
        href={href}
        className={`${colors.link.default} underline ${colors.link.decoration.default} transition-colors duration-200 ${colors.link.hover} ${colors.link.decoration.hover}`}
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
};

// Export par défaut avec le thème light pour la compatibilité
export const mdxComponents = createMdxComponents("light");
