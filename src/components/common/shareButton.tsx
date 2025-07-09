import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiShare2, FiTwitter, FiLinkedin, FiLink } from "react-icons/fi";

interface ShareButtonProps {
  link: string;
  title: string;
  darkMode?: boolean;
}

export default function ShareButton({
  link,
  title,
  darkMode = false,
}: ShareButtonProps) {
  const t = useTranslations("Common");

  const [shareMenuOpen, setShareMenuOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ top: 0, left: 0 });
  const [showToast, setShowToast] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleShare = (platform: "x" | "linkedin" | "copy") => {
    setShareMenuOpen(false);
    const shareUrl = encodeURIComponent(link);
    const shareTitle = encodeURIComponent(title);

    if (platform === "x") {
      window.open(
        `https://twitter.com/intent/tweet?text=${shareTitle}&url=${shareUrl}`,
        "_blank",
      );
    } else if (platform === "linkedin") {
      window.open(
        `https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`,
        "_blank",
      );
    } else if (platform === "copy") {
      void navigator.clipboard.writeText(link);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
      }, 3000);
    }
  };

  const toggleShareMenu = () => {
    if (!shareMenuOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setModalPosition({
        top: rect.bottom + 8,
        left: rect.right - 120,
      });
    }
    setShareMenuOpen(!shareMenuOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node) &&
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        setShareMenuOpen(false);
      }
    };

    if (shareMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [shareMenuOpen]);

  return (
    <>
      <motion.button
        ref={buttonRef}
        onClick={toggleShareMenu}
        className={`rounded-lg ${darkMode ? "bg-slate-700 text-slate-300 hover:bg-slate-600" : "bg-slate-100 text-slate-600 hover:bg-slate-200"} p-2 transition-all duration-200`}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <FiShare2 className="h-4 w-4" />
      </motion.button>

      {shareMenuOpen &&
        typeof document !== "undefined" &&
        createPortal(
          <motion.div
            ref={modalRef}
            className="fixed rounded-xl border border-white/10 p-2 shadow-lg backdrop-blur-md"
            style={{
              background: "rgba(0, 0, 0, 0.8)",
              top: modalPosition.top,
              left: modalPosition.left,
              zIndex: 99999,
            }}
            initial={{ opacity: 0, scale: 0.9, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex min-w-[120px] flex-col gap-1">
              <button
                onClick={() => handleShare("x")}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition-colors hover:bg-white/10"
              >
                <FiTwitter className="h-4 w-4" />X
              </button>
              <button
                onClick={() => handleShare("linkedin")}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition-colors hover:bg-white/10"
              >
                <FiLinkedin className="h-4 w-4" />
                LinkedIn
              </button>
              <button
                onClick={() => handleShare("copy")}
                className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white transition-colors hover:bg-white/10"
              >
                <FiLink className="h-4 w-4" />
                {t("copyLink")}
              </button>
            </div>
          </motion.div>,
          document.body,
        )}

      {/* Toast */}
      {showToast &&
        typeof document !== "undefined" &&
        createPortal(
          <div
            style={{
              position: "fixed",
              top: "25px",
              right: "25px",
              background: darkMode
                ? "linear-gradient(135deg, rgba(16, 185, 129, 0.25), rgba(5, 150, 105, 0.35))"
                : "linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.95))",
              backdropFilter: "blur(20px)",
              WebkitBackdropFilter: "blur(20px)",
              border: darkMode
                ? "1px solid rgba(255, 255, 255, 0.2)"
                : "1px solid rgba(16, 185, 129, 0.2)",
              borderRadius: "16px",
              padding: "16px 20px",
              zIndex: 999999,
              fontSize: "14px",
              fontWeight: "500",
              color: darkMode ? "white" : "#059669",
              boxShadow: darkMode
                ? "0 8px 32px rgba(0, 0, 0, 0.3), 0 2px 8px rgba(16, 185, 129, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)"
                : "0 8px 32px rgba(16, 185, 129, 0.15), 0 2px 8px rgba(16, 185, 129, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)",
              display: "flex",
              alignItems: "center",
              gap: "8px",
              minWidth: "280px",
              transform: showToast ? "translateX(0)" : "translateX(100%)",
              opacity: showToast ? 1 : 0,
              transition: "all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            <div
              style={{
                width: "20px",
                height: "20px",
                borderRadius: "50%",
                background: "linear-gradient(135deg, #10b981, #059669)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "12px",
                flexShrink: 0,
                boxShadow: darkMode
                  ? "0 2px 8px rgba(16, 185, 129, 0.4)"
                  : "0 2px 8px rgba(16, 185, 129, 0.3), 0 0 0 3px rgba(16, 185, 129, 0.1)",
                color: "white",
              }}
            >
              ✓
            </div>
            <span style={{ flex: 1, fontWeight: darkMode ? "500" : "600" }}>
              {t("copied")}
            </span>
            <div
              style={{
                width: "4px",
                height: "4px",
                borderRadius: "50%",
                background: darkMode
                  ? "rgba(255, 255, 255, 0.6)"
                  : "rgba(16, 185, 129, 0.7)",
                animation: "pulse 2s infinite",
              }}
            />
          </div>,
          document.body,
        )}
    </>
  );
}
