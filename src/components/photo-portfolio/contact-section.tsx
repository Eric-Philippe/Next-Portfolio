"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";

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

  const projectTypes = [
    "Portrait Photography",
    "Event Photography",
    "Product Photography",
    "Wedding Photography",
    "Commercial Work",
    "Other",
  ];

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
            Book a Session
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
              Let&apos;s create something beautiful together
            </h3>

            <p className="text-lg leading-relaxed font-light text-gray-300">
              Whether you&apos;re looking for portrait photography, event
              coverage, or commercial work, I&apos;d love to discuss your vision
              and bring it to life.
            </p>

            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <span className="text-sm text-white">📧</span>
                </div>
                <span className="text-gray-300">eric.photo@example.com</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <span className="text-sm text-white">📱</span>
                </div>
                <span className="text-gray-300">+33 6 XX XX XX XX</span>
              </div>

              <div className="flex items-center space-x-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  <span className="text-sm text-white">📍</span>
                </div>
                <span className="text-gray-300">Based in France</span>
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
                  placeholder="Your Name"
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
                  placeholder="Your Email"
                  className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white placeholder-gray-400 transition-colors focus:border-white/40 focus:outline-none"
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <div>
                <select
                  {...register("projectType", {
                    required: "Please select a project type",
                  })}
                  className="w-full rounded-lg border border-white/20 bg-black/50 px-4 py-3 text-white transition-colors focus:border-white/40 focus:outline-none"
                >
                  <option value="">Select Project Type</option>
                  {projectTypes.map((type) => (
                    <option key={type} value={type} className="bg-gray-900">
                      {type}
                    </option>
                  ))}
                </select>
                {errors.projectType && (
                  <p className="mt-1 text-sm text-red-400">
                    {errors.projectType.message}
                  </p>
                )}
              </div>

              <div>
                <textarea
                  {...register("message", { required: "Message is required" })}
                  rows={5}
                  placeholder="Tell me about your project..."
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
                {isSubmitting ? "Sending..." : "Send Inquiry"}
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
