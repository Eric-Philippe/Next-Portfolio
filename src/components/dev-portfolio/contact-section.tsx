"use client";

import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { FaCubes } from "react-icons/fa";
import Footer from "../common/footer";
import ContactForm from "../common/contact-form";
import { useTranslations } from "next-intl";

export default function ContactSection() {
  const [isHovered, setIsHovered] = useState(false);
  const t = useTranslations("DevPortfolio.Contact");

  const { ref, inView } = useInView({
    triggerOnce: false,
  });

  useEffect(() => {
    document.body.style.transition = "background-color 0.8s ease-in-out";
    document.body.style.backgroundColor = inView ? "#1a1a1a" : "#ffffff";

    return () => {
      // Cleanup: remove transition when component unmounts
      document.body.style.transition = "";
    };
  }, [inView]);

  return (
    <>
      <section
        ref={ref}
        className="flex flex-col items-center justify-center gap-6 p-6 md:p-10 lg:flex-row lg:gap-12"
      >
        <div className="mb-3 flex w-full flex-col items-center justify-center lg:w-1/2 lg:max-w-lg">
          <div className="flex w-full flex-col items-start space-y-4">
            <a
              href="#realisations"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="group w-full"
            >
              <h1
                className="mb-5 bg-[#3f3f46] bg-clip-text text-left text-2xl font-bold text-transparent transition-all duration-300 group-hover:translate-x-2 group-hover:transform hover:bg-[#e0a4ff] hover:text-[#e0a4ff] md:text-3xl lg:text-5xl"
                style={{
                  fontFamily: "Sohne,sans-serif",
                }}
              >
                <div className="flex items-center space-x-3">
                  <div>{t("realisations")}</div>
                  <FaCubes
                    className="hidden text-3xl transition-all duration-300 group-hover:rotate-12 md:block md:text-4xl lg:inline-block lg:text-5xl"
                    style={{
                      color: isHovered ? "#e0a4ff" : "#3f3f46",
                    }}
                  />
                </div>
              </h1>
            </a>
            <a href="#competences" className="group w-full">
              <h1
                className="mb-5 bg-[#3f3f46] bg-clip-text text-left text-2xl font-bold text-transparent transition-all duration-300 group-hover:translate-x-2 group-hover:transform hover:bg-[#feea9e] hover:text-[#feea9e] md:text-3xl lg:text-5xl"
                style={{
                  fontFamily: "Sohne,sans-serif",
                }}
              >
                {t("skills")}
              </h1>
            </a>
            <a href="#about" className="group w-full">
              <h1
                className="mb-5 bg-[#3f3f46] bg-clip-text text-left text-2xl font-bold text-transparent transition-all duration-300 group-hover:translate-x-2 group-hover:transform hover:bg-[#98edff] hover:text-[#98edff] md:text-3xl lg:text-5xl"
                style={{
                  fontFamily: "Sohne,sans-serif",
                }}
              >
                {t("about")}
              </h1>
            </a>
          </div>
        </div>
        <ContactForm />
      </section>

      <Footer />
    </>
  );
}
