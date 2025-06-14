"use client";

import { PortfolioProvider } from "~/lib/portfolio-context";
import { Header } from "~/components/common/header";
import { mdxComponents } from "~/components/blog/mdx-components";
// import { useTranslations } from "next-intl";
import { useState, use } from "react";
import {
  FiArrowLeft,
  FiShare2,
  FiBookmark,
  FiClock,
  FiCalendar,
  FiTag,
  FiTwitter,
  FiLinkedin,
  FiLink,
} from "react-icons/fi";
import { motion, useScroll, useSpring } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { placeholderPosts } from "~/lib/data/blog";

interface Props {
  params: Promise<{
    slug: string;
    locale: string;
  }>;
}

export default function BlogPostPage({ params }: Props) {
  const resolvedParams = use(params);
  // const t = useTranslations("BlogPage");
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // Mock post data - in real app this would come from CMS/API
  const post =
    placeholderPosts.find((p) => p.slug === resolvedParams.slug) ??
    placeholderPosts[0]!;

  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const shareText = `Check out this article: ${post.title}`;

  const handleShare = (platform: string) => {
    let url = "";
    switch (platform) {
      case "twitter":
        url = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
        break;
      case "linkedin":
        url = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`;
        break;
      case "copy":
        void navigator.clipboard.writeText(shareUrl);
        setShareMenuOpen(false);
        return;
    }
    if (url) window.open(url, "_blank");
    setShareMenuOpen(false);
  };

  // Mock article content
  const ArticleContent = () => (
    <article className="prose prose-lg max-w-none">
      <mdxComponents.h1>
        The Future of Web Development: Embracing Modern Technologies
      </mdxComponents.h1>

      <mdxComponents.p>
        In today&apos;s rapidly evolving digital landscape, web development has
        become more sophisticated and powerful than ever before. As developers,
        we&apos;re constantly adapting to new frameworks, libraries, and
        methodologies that promise to make our applications faster, more
        maintainable, and more user-friendly.
      </mdxComponents.p>

      <mdxComponents.h2>The Rise of Full-Stack Frameworks</mdxComponents.h2>

      <mdxComponents.p>
        Modern full-stack frameworks like Next.js have revolutionized how we
        build web applications. They provide us with server-side rendering,
        static site generation, and API routes all in one cohesive package. This
        integration allows developers to build complete applications without the
        complexity of managing separate frontend and backend codebases.
      </mdxComponents.p>

      <mdxComponents.blockquote>
        &quot;The best frameworks are those that get out of your way and let you
        focus on building great user experiences.&quot; - A wise developer
        somewhere
      </mdxComponents.blockquote>

      <mdxComponents.h3>Key Benefits of Modern Frameworks</mdxComponents.h3>

      <mdxComponents.ul>
        <mdxComponents.li>
          Improved developer experience with hot reloading and TypeScript
          support
        </mdxComponents.li>
        <mdxComponents.li>
          Better performance through automatic code splitting and optimization
        </mdxComponents.li>
        <mdxComponents.li>
          Enhanced SEO capabilities with server-side rendering
        </mdxComponents.li>
        <mdxComponents.li>
          Simplified deployment and hosting options
        </mdxComponents.li>
      </mdxComponents.ul>

      <mdxComponents.h2>The Importance of Design Systems</mdxComponents.h2>

      <mdxComponents.p>
        Design systems have become crucial for maintaining consistency across
        large applications. They provide a shared language between designers and
        developers, ensuring that user interfaces remain cohesive and
        accessible. Tools like Tailwind CSS have made it easier than ever to
        implement design systems at scale.
      </mdxComponents.p>

      <mdxComponents.code className="language-typescript">
        {`// Example of a reusable button component
interface ButtonProps {
  variant: 'primary' | 'secondary' | 'outline';
  size: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export function Button({ variant, size, children, onClick }: ButtonProps) {
  const baseClasses = 'rounded-lg font-medium transition-all duration-200';
  const variantClasses = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700',
    secondary: 'bg-slate-200 text-slate-900 hover:bg-slate-300',
    outline: 'border-2 border-blue-600 text-blue-600 hover:bg-blue-50'
  };
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg'
  };

  return (
    <button 
      className={\`\${baseClasses} \${variantClasses[variant]} \${sizeClasses[size]}\`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}`}
      </mdxComponents.code>

      <mdxComponents.h2>Animation and User Experience</mdxComponents.h2>

      <mdxComponents.p>
        Subtle animations and micro-interactions play a crucial role in creating
        delightful user experiences. Libraries like Framer Motion have made it
        incredibly easy to add smooth, performant animations to React
        applications. The key is to use animations purposefully - to guide user
        attention, provide feedback, and create a sense of continuity.
      </mdxComponents.p>

      <mdxComponents.img
        src="https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&h=400&fit=crop"
        alt="Modern web development workspace with multiple monitors showing code"
      />

      <mdxComponents.h3>Best Practices for Web Animations</mdxComponents.h3>

      <mdxComponents.ul>
        <mdxComponents.li>
          Keep animations short and purposeful (typically 200-500ms)
        </mdxComponents.li>
        <mdxComponents.li>
          Use easing functions that feel natural
        </mdxComponents.li>
        <mdxComponents.li>
          Respect user preferences for reduced motion
        </mdxComponents.li>
        <mdxComponents.li>
          Test performance on lower-end devices
        </mdxComponents.li>
      </mdxComponents.ul>

      <mdxComponents.h2>Looking Ahead</mdxComponents.h2>

      <mdxComponents.p>
        As we continue to push the boundaries of what&apos;s possible on the
        web, it&apos;s exciting to see new technologies emerging. From
        WebAssembly enabling near-native performance to AI-assisted development
        tools, the future of web development looks incredibly promising.
      </mdxComponents.p>

      <mdxComponents.p>
        The most important thing is to stay curious, keep learning, and always
        focus on creating value for users. Technology is just a tool - what
        matters is how we use it to solve real problems and create meaningful
        experiences.
      </mdxComponents.p>
    </article>
  );

  return (
    <PortfolioProvider>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-gradient-to-r from-blue-500 to-purple-500"
        style={{ scaleX }}
      />

      <Header firstColor="#3b82f6" secondColor="#8b5cf6" />

      <div className="relative min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50/30 text-slate-900">
        {/* Background Elements */}
        <div className="absolute inset-0 opacity-[0.015]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.3) 1px, transparent 0)`,
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute h-96 w-96 rounded-full opacity-10 blur-3xl"
            style={{
              background:
                "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
              top: "20%",
              right: "10%",
            }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.05, 0.15, 0.05],
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 py-12">
          {/* Back Button */}
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href={`/${resolvedParams.locale}/blog`}
              className="inline-flex items-center gap-2 text-slate-600 transition-colors hover:text-slate-900"
            >
              <FiArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </motion.div>

          {/* Article Header */}
          <motion.header
            className="mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Tags */}
            <div className="mb-6 flex flex-wrap gap-2">
              {post.tags.map((tag, index) => (
                <motion.span
                  key={tag}
                  className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-sm font-medium backdrop-blur-md"
                  style={{
                    background: "rgba(59, 130, 246, 0.1)",
                    border: "1px solid rgba(59, 130, 246, 0.2)",
                    color: "#3b82f6",
                  }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                >
                  <FiTag className="h-3 w-3" />
                  {tag}
                </motion.span>
              ))}
            </div>

            {/* Title */}
            <h1 className="mb-6 text-4xl leading-tight font-light tracking-tight md:text-5xl lg:text-6xl">
              {post.title}
            </h1>

            {/* Meta Info */}
            <div className="mb-8 flex flex-wrap items-center gap-6 text-slate-600">
              <div className="flex items-center gap-2">
                <FiCalendar className="h-4 w-4" />
                <span>{post.lastUpdated.toLocaleDateString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <FiClock className="h-4 w-4" />
                <span>{post.readingTime} min read</span>
              </div>
            </div>

            {/* Author Info */}
            <motion.div
              className="flex items-center justify-between rounded-2xl border border-white/20 p-6 backdrop-blur-md"
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
              }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <Image
                    src="https://avatars.githubusercontent.com/u/66321178?v=4"
                    alt="Éric Philippe"
                    className="h-12 w-12 rounded-full object-cover"
                    width={48}
                    height={48}
                  />
                  <div className="absolute -right-1 -bottom-1 h-4 w-4 rounded-full border-2 border-white bg-green-500" />
                </div>
                <div>
                  <h3 className="font-medium text-slate-900">Éric Philippe</h3>
                  <p className="text-sm text-slate-600">
                    Full-Stack Developer & Designer
                  </p>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <motion.button
                  onClick={() => setIsBookmarked(!isBookmarked)}
                  className={`rounded-lg p-2 transition-all duration-200 ${
                    isBookmarked
                      ? "bg-blue-100 text-blue-600"
                      : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <FiBookmark className="h-4 w-4" />
                </motion.button>

                <div className="relative">
                  <motion.button
                    onClick={() => setShareMenuOpen(!shareMenuOpen)}
                    className="rounded-lg bg-slate-100 p-2 text-slate-600 transition-all duration-200 hover:bg-slate-200"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <FiShare2 className="h-4 w-4" />
                  </motion.button>

                  {shareMenuOpen && (
                    <motion.div
                      className="absolute top-12 right-0 z-20 rounded-xl border border-white/20 p-2 shadow-lg backdrop-blur-md"
                      style={{
                        background: "rgba(255, 255, 255, 0.9)",
                      }}
                      initial={{ opacity: 0, scale: 0.9, y: -10 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="flex min-w-[120px] flex-col gap-1">
                        <button
                          onClick={() => handleShare("twitter")}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-100"
                        >
                          <FiTwitter className="h-4 w-4" />
                          Twitter
                        </button>
                        <button
                          onClick={() => handleShare("linkedin")}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-100"
                        >
                          <FiLinkedin className="h-4 w-4" />
                          LinkedIn
                        </button>
                        <button
                          onClick={() => handleShare("copy")}
                          className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors hover:bg-slate-100"
                        >
                          <FiLink className="h-4 w-4" />
                          Copy Link
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
            </motion.div>
          </motion.header>

          {/* Article Content */}
          <motion.div
            className="mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div
              className="rounded-3xl border border-white/20 p-8 backdrop-blur-md md:p-12"
              style={{
                background: "rgba(255, 255, 255, 0.7)",
                boxShadow: "0 8px 32px rgba(0, 0, 0, 0.06)",
              }}
            >
              <ArticleContent />
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            className="flex items-center justify-between border-t border-slate-200 pt-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link
              href={`/${resolvedParams.locale}/blog`}
              className="flex items-center gap-2 rounded-xl bg-slate-100 px-6 py-3 transition-colors hover:bg-slate-200"
            >
              <FiArrowLeft className="h-4 w-4" />
              All Posts
            </Link>

            <div className="text-sm text-slate-600">Thanks for reading! 🚀</div>
          </motion.div>
        </div>

        {/* Click outside to close share menu */}
        {shareMenuOpen && (
          <div
            className="fixed inset-0 z-10"
            onClick={() => setShareMenuOpen(false)}
          />
        )}
      </div>
    </PortfolioProvider>
  );
}
