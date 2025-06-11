"use client";

import { useTranslations } from "next-intl";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationTriangle,
} from "react-icons/fa";

const SENTENCES = [
  "Let's get started",
  "Let's get in touch",
  "Let's collaborate",
  "Let's get going",
  "Let's do this",
];

interface FormData {
  name: string;
  email: string;
  message: string;
}

export default function ContactForm() {
  const [selectedSentence, setSelectedSentence] = useState(SENTENCES[0]);
  const [emailSent, setEmailSent] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const t = useTranslations("DevPortfolio.Contact");

  // Set random sentence only on client side after hydration
  useEffect(() => {
    setSelectedSentence(
      SENTENCES[Math.floor(Math.random() * SENTENCES.length)],
    );
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setEmailSent(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setEmailSent(true);
      reset(); // Clear form on success
      console.log("Form data:", data);

      // Reset success message after 5 seconds
      setTimeout(() => setEmailSent(null), 5000);
    } catch (error) {
      setEmailSent(false);
      console.error("Form submission failed:", error);

      // Reset error message after 5 seconds
      setTimeout(() => setEmailSent(null), 5000);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-2xl lg:w-2/3 xl:w-1/2">
      <div
        className="relative overflow-hidden rounded-3xl border border-white/20 bg-white/10 p-6 shadow-lg backdrop-blur-md transition-all duration-500 hover:bg-white/20 hover:shadow-2xl lg:p-8"
        style={{
          background:
            "linear-gradient(135deg, rgba(255, 255, 255, 0.1) 0%, rgba(255, 255, 255, 0.05) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.18)",
        }}
      >
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 transition-opacity duration-500 hover:opacity-100"></div>

        {/* Shimmer effect */}
        <div className="absolute inset-0 opacity-0 transition-opacity duration-700 hover:opacity-100">
          <div className="absolute inset-0 -translate-x-full -skew-x-12 transform bg-gradient-to-r from-transparent via-white/10 to-transparent transition-transform duration-1000 hover:translate-x-full"></div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="relative z-10">
          {/* Header */}
          <div className="relative mb-6 text-center">
            <h1
              className="font-feijoa mb-3 bg-gradient-to-r from-[#ccf0ff] via-[#ffd7ff] to-[#f1b3cf] bg-clip-text text-2xl font-bold text-transparent drop-shadow-sm lg:text-3xl xl:text-4xl"
              style={{
                minHeight: "3rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {selectedSentence}
            </h1>

            <p className="text-sm font-light text-white/80 lg:text-base">
              {t("tagline")}
            </p>

            {/* Status Messages */}
            {emailSent === true && (
              <div className="mt-4 flex items-center justify-center space-x-2 rounded-xl border border-green-500/30 bg-green-500/20 px-4 py-3 text-green-300 transition-all duration-300">
                <FaCheckCircle className="h-4 w-4" />
                <span>{t("successMessage")}</span>
              </div>
            )}
            {emailSent === false && (
              <div className="mt-4 flex items-center justify-center space-x-2 rounded-xl border border-red-500/30 bg-red-500/20 px-4 py-3 text-red-300 transition-all duration-300">
                <FaExclamationTriangle className="h-4 w-4" />
                <span>{t("errorMessage")}</span>
              </div>
            )}
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6">
            {/* Name Field */}
            <div className="relative">
              <label
                htmlFor="name"
                className="mb-2 block bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-sm font-semibold text-transparent"
              >
                {t("name")} *
              </label>
              <input
                id="name"
                {...register("name", { required: "Ce champ est requis" })}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 focus:border-blue-500/50 focus:bg-white/20 focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
                placeholder={t("nameDesc")}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                }}
              />
              {errors.name && (
                <span className="mt-1 block text-xs text-red-400 italic">
                  {errors.name.message}
                </span>
              )}
            </div>

            {/* Email Field */}
            <div className="relative">
              <label
                htmlFor="email"
                className="mb-2 block bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-sm font-semibold text-transparent"
              >
                {t("email")} *
              </label>
              <input
                id="email"
                type="email"
                {...register("email", {
                  required: "Ce champ est requis",
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: "Adresse email invalide",
                  },
                })}
                className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 focus:border-blue-500/50 focus:bg-white/20 focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
                placeholder={t("emailDesc")}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                }}
              />
              {errors.email && (
                <span className="mt-1 block text-xs text-red-400 italic">
                  {errors.email.message}
                </span>
              )}
            </div>

            {/* Message Field - Full Width */}
            <div className="relative md:col-span-2">
              <label
                htmlFor="message"
                className="mb-2 block bg-gradient-to-r from-blue-300 to-purple-300 bg-clip-text text-sm font-semibold text-transparent"
              >
                {t("message")} *
              </label>
              <textarea
                id="message"
                rows={3}
                {...register("message", { required: "Ce champ est requis" })}
                className="w-full resize-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder-white/50 backdrop-blur-sm transition-all duration-300 focus:border-blue-500/50 focus:bg-white/20 focus:ring-2 focus:ring-blue-500/30 focus:outline-none"
                placeholder={t("messageDesc")}
                style={{
                  background: "rgba(255, 255, 255, 0.05)",
                }}
              />
              {errors.message && (
                <span className="mt-1 block text-xs text-red-400 italic">
                  {errors.message.message}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <div className="mt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className={`group relative w-full overflow-hidden rounded-xl border border-blue-500/30 bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-[1.02] hover:shadow-xl focus:ring-2 focus:ring-blue-500/50 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 ${
                isSubmitting
                  ? "animate-pulse"
                  : "hover:from-blue-500 hover:to-purple-500"
              }`}
              onClick={() => {
                if (!isSubmitting) {
                  setSelectedSentence(
                    SENTENCES[Math.floor(Math.random() * SENTENCES.length)],
                  );
                }
              }}
            >
              <div className="flex items-center justify-center space-x-2">
                {isSubmitting ? (
                  <>
                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
                    <span>{t("sending")}</span>
                  </>
                ) : (
                  <>
                    <FaPaperPlane className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                    <span>{t("send")}</span>
                  </>
                )}
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-purple-400/20 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
            </button>
          </div>
        </form>

        {/* Glass reflection effect */}
        <div className="pointer-events-none absolute top-0 left-0 h-1/2 w-full bg-gradient-to-b from-white/10 to-transparent opacity-50"></div>
      </div>
    </div>
  );
}
