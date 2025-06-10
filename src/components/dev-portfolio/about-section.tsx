"use client";

import { useState } from "react";
import { FaGithub, FaInstagram, FaLinkedin } from "react-icons/fa";
import Image from "next/image";
import AnimatedProgressBar from "../common/animated-progress-bar";
import LINKS from "../../lib/utils/links";

export default function AboutSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="mb-5 scroll-mt-8 lg:scroll-mt-0">
      <div className="overflow-hidden px-0 lg:px-4">
        <div className="bg-gh-marketingDark relative z-0 py-12 lg:rounded-2xl lg:py-24">
          <div className="project-container margin mx-auto">
            <div className="grid grid-cols-12">
              <div className="col-span-12 mb-8 lg:col-span-10 lg:col-start-2">
                <h2
                  className="mb-8 text-5xl font-extrabold text-white"
                  id="about"
                >
                  Parcours
                </h2>
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-[0.5fr_3fr_2fr]">
                  {/* @PHOTO */}
                  <div className="group relative mb-8 md:mb-0">
                    <div className="relative">
                      <Image
                        src="https://avatars.githubusercontent.com/u/66321178?v=4"
                        alt="Profile"
                        width={96}
                        height={96}
                        className="mx-auto h-24 w-24 rounded-full object-cover"
                        priority
                      />
                      <div className="absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 transform justify-between space-x-4 opacity-0 transition-all duration-500 ease-linear group-hover:opacity-100">
                        <a href={LINKS.GITHUB} target="_blank" rel="noreferrer">
                          <FaGithub
                            size={30}
                            className="translate-x-0 translate-y-0 transform text-white transition-transform duration-1000 group-hover:-translate-x-7 group-hover:translate-y-5"
                          />
                        </a>
                        <a
                          href={LINKS.LINKEDIN}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaLinkedin
                            size={30}
                            className="translate-y-0 transform transition-transform duration-500 group-hover:translate-y-24"
                            style={{ color: "#0a66c2" }}
                          />
                        </a>
                        <a
                          href={LINKS.INSTAGRAM}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <FaInstagram
                            size={30}
                            className="translate-x-0 translate-y-0 transform transition-transform duration-1700 group-hover:translate-x-5 group-hover:translate-y-5"
                            style={{ color: "#e1306c" }}
                          />
                        </a>
                      </div>
                    </div>
                    <p className="mt-2 text-center text-gray-500 lg:text-left">
                      Éric PHILIPPE
                    </p>
                  </div>

                  {/* @PARCOURS */}
                  <div
                    className="relative"
                    style={{
                      marginLeft: "2em",
                      marginRight: "2em",
                    }}
                  >
                    <p className="mb-2 text-xl font-light text-white">
                      Étudiant / Entrepreneur / Alternant en informatique
                    </p>

                    <p className="text-gray-500">
                      2025 - Présent : Création de mon auto-entreprise -{" "}
                      <b>Eko</b>
                    </p>

                    <p
                      className="mt-1 text-gray-500"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Développement d&apos;applications web et mobile
                      personnalisées pour les entreprises
                    </p>

                    <AnimatedProgressBar
                      color1="#f9ce22"
                      color2="#ed4e50"
                      percentage={25}
                    />

                    <p className="text-gray-500">
                      2024 - 2026 : Mastère Ynov - Expert Développement Logiciel
                      - <b>Major de promotion</b>
                    </p>

                    <p
                      className="mt-1 text-gray-500"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Ynov Toulouse
                    </p>

                    <AnimatedProgressBar
                      color1="#f9ce22"
                      color2="#ed4e50"
                      percentage={53}
                    />

                    <p className="text-gray-500">
                      2021 - 2026 : Alternance - ADP GSI - Développeur Java
                      Informatique
                    </p>
                    <p
                      className="mt-1 text-gray-500"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Développement d&apos;une application afin de générer des
                      fiches de paie
                    </p>

                    <AnimatedProgressBar
                      color1="#ffac1d"
                      color2="#ed4e50"
                      percentage={75}
                    />

                    <p className="text-gray-500">
                      2021 - 2024 : BUT Informatique - <b>Major de promotion</b>
                    </p>

                    <p
                      className="mt-1 text-gray-500"
                      style={{ fontSize: "0.8rem" }}
                    >
                      IUT de Blagnac - Université Toulouse II Jean Jaurès
                    </p>

                    <AnimatedProgressBar
                      color1="#9867f0"
                      color2="#ed4e50"
                      percentage={100}
                    />

                    <p className="text-gray-500">
                      2020 - 2021 : BAC - Mention Bien
                    </p>
                    <p
                      className="mt-1 text-gray-500"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Spécialité Mathématiques, Physique-Chimie, Sciences de
                      l&apos;Ingénieur
                    </p>
                    <p
                      className="mt-1 text-gray-500"
                      style={{ fontSize: "0.8rem" }}
                    >
                      Option Mathématiques Expertes, Section Européenne Anglais
                    </p>

                    <AnimatedProgressBar
                      color1="#ffac1d"
                      color2="#ed4e50"
                      percentage={100}
                    />
                  </div>

                  {/* @CV */}
                  <div className="relative">
                    <p className="mb-2 text-xl font-light text-white">
                      Curriculum Vitae
                    </p>
                    <Image
                      src="/CV.png"
                      alt="CV Preview"
                      width={600}
                      height={800}
                      className="transition-filter duration-500 ease-in-out"
                      style={{
                        borderRadius: "9px",
                        width: "100%",
                        opacity: isHovered ? 0.8 : 1,
                        filter: isHovered ? "blur(5px)" : "blur(1px)",
                      }}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    />
                    <button
                      className="bg-opacity-50 hover:bg-opacity-70 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transform rounded bg-black px-4 py-2 text-white transition-colors duration-200"
                      onClick={() => {
                        const lienTelechargement = document.createElement("a");

                        lienTelechargement.href = LINKS.DL_CV;

                        lienTelechargement.download = "Eric_Philippe_CV.pdf";

                        document.body.appendChild(lienTelechargement);

                        lienTelechargement.click();

                        document.body.removeChild(lienTelechargement);
                      }}
                      onMouseEnter={() => setIsHovered(true)}
                    >
                      Consulter CV
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
