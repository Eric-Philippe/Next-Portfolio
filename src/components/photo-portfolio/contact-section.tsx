"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { EMAIL } from "~/lib/data/data";

interface ContactFormData {
  name: string;
  email: string;
  message: string;
  projectType: string;
}

export default function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>();

  const t = useTranslations("PhotoPortfolio.Contact");

  const onSubmit = async (_data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // TODO: Implement actual email sending logic
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate API call
      setSubmitStatus("success");
      reset();
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="bg-gray-900 px-4 py-20">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-16 text-center text-4xl font-light text-white md:text-5xl">
            {t("title")}
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="mb-6 text-2xl font-light text-white">
              {t("subtitle")}
            </h3>

            <p className="text-lg leading-relaxed font-light text-gray-300">
              {t("description")}
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <span className="text-sm text-white">📧</span>
                </div>
                <span className="text-gray-300">{EMAIL}</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <span className="text-sm text-white">📍</span>
                </div>
                <span className="text-gray-300">Based in South France</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div>
                <input
                  {...register("name", { required: "Name is required" })}
                  type="text"
                  placeholder={t("namePlaceholder")}
                  className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-white/40 focus:outline-none"
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^\S+@\S+$/i,
                      message: "Please enter a valid email",
                    },
                  })}
                  type="email"
                  placeholder={t("emailPlaceholder")}
                  className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-white/40 focus:outline-none"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  rows={5}
                  placeholder={t("contentPlaceholder")}
                  className="w-full resize-none rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-white/40 focus:outline-none"
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full rounded-lg border border-white/20 bg-white/10 px-6 py-3 font-light text-white transition-colors hover:bg-white/20 disabled:bg-gray-600"
              >
                {isSubmitting ? "Sending..." : t("sendInquiry")}
              </button>

              {submitStatus === "success" && (
                <p className="text-center text-green-400">
                  Inquiry sent successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-center text-red-400">
                  Failed to send inquiry. Please try again.
                </p>
              )}
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
