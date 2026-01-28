"use client";

/**
 * ContactSection Component for 3D Printing Portfolio
 * Contact form with amber/orange theme matching the 3D printing aesthetic
 */

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { FaCube, FaLayerGroup, FaPrint } from "react-icons/fa";
import ContactForm from "../common/contact-form";
import Footer from "../common/footer";
import { EMAIL } from "~/lib/utils";

export function ContactSection() {
  const t = useTranslations("printing.contact");

  return (
    <>
      <section className="relative px-6 py-20">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-zinc-900 to-black" />

        {/* Subtle accent glow */}
        <div className="absolute top-1/4 left-1/4 h-[400px] w-[400px] rounded-full bg-amber-600/5 blur-3xl" />
        <div className="absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-orange-600/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Section Title */}
            <div className="mb-16 text-center">
              <h2 className="mb-4 font-serif text-4xl font-light text-amber-50 md:text-5xl">
                {t("title")}
              </h2>
              <p className="mx-auto max-w-xl font-light text-stone-400">
                {t("subtitle")}
              </p>
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
              {/* Left Side - Info */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex flex-col justify-center space-y-8"
              >
                {/* Description */}
                <div className="space-y-4">
                  <h3 className="text-2xl font-light text-amber-50">
                    {t("descriptionTitle")}
                  </h3>
                  <p className="leading-relaxed font-light text-stone-400">
                    {t("description")}
                  </p>
                </div>

                {/* Services List */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4 rounded-2xl border border-amber-900/20 bg-zinc-900/50 p-4 backdrop-blur-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-800/30 bg-gradient-to-br from-amber-600/20 to-orange-700/20">
                      <FaCube className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-amber-50">
                        {t("service1Title")}
                      </h4>
                      <p className="text-sm text-stone-500">
                        {t("service1Desc")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-amber-900/20 bg-zinc-900/50 p-4 backdrop-blur-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-800/30 bg-gradient-to-br from-amber-600/20 to-orange-700/20">
                      <FaLayerGroup className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-amber-50">
                        {t("service2Title")}
                      </h4>
                      <p className="text-sm text-stone-500">
                        {t("service2Desc")}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-4 rounded-2xl border border-amber-900/20 bg-zinc-900/50 p-4 backdrop-blur-sm">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-amber-800/30 bg-gradient-to-br from-amber-600/20 to-orange-700/20">
                      <FaPrint className="h-5 w-5 text-amber-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-amber-50">
                        {t("service3Title")}
                      </h4>
                      <p className="text-sm text-stone-500">
                        {t("service3Desc")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Contact Info */}
                <div className="flex items-center gap-3 text-stone-400">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full border border-amber-800/30 bg-amber-600/10">
                    <span className="text-sm">📧</span>
                  </div>
                  <span>{EMAIL}</span>
                </div>
              </motion.div>

              {/* Right Side - Contact Form */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <ContactForm origin="3DPRINT" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </>
  );
}
