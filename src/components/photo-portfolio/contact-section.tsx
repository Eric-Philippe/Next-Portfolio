"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { EMAIL } from "~/lib/utils";
import ContactForm from "../common/contact-form";

export function ContactSection() {
  const t = useTranslations("PhotoPortfolio.Contact");

  return (
    <section className="flex flex-col items-center justify-center gap-6 bg-gray-900 p-6 py-20 md:p-10 lg:flex-row lg:gap-12">
      <div>
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
            className="max-w-md space-y-6 lg:max-w-lg"
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
                <span className="text-gray-300">Occitanie</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <ContactForm origin="PHOTO" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
