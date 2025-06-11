"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export default function SkillsSection() {
  const t = useTranslations("DevPortfolio.Skills");

  const technicalSkills = [
    {
      title: "Frontend",
      items: [
        "HTML5, CSS3, JavaScript (ES6+), TypeScript, PHP",
        "React, Next.js, Angular, Symfony",
        "SPA, SSR, SEO, Tailwind, Material, Bootstrap",
      ],
      colors: ["#ff6b35", "#ff8a65"], // Orange tones
      icon: "🎨",
    },
    {
      title: "Backend",
      items: [
        "TS, Python, Golang, Java, C#, Kotlin, COBOL",
        "Express, NestJS, SpringBoot, FastAPI, Flask",
        "REST, Websocket, MQTT, Concurrency",
      ],
      colors: ["#ef4444", "#f87171"], // Red tones
      icon: "⚙️",
    },
    {
      title: "Database",
      items: [
        "PostgreSQL, MySQL, MongoDB, SQLite, Access",
        "ORM, PL/SQL, Migration, Forme Normale, MCD, MLD",
        "Datagrip, Oracle SQL Developer, MySQL Workbench",
      ],
      colors: ["#60a5fa", "#93c5fd"], // Light blue tones
      icon: "🗄️",
    },
    {
      title: "Sys Admin",
      items: [
        "Shell, Bash, Batch, Powershell, Odin",
        "Docker, Kubernetes, Grafana, Proxmox, Ansible",
        "Linux, Windows, Debian, Ubuntu, Arch",
      ],
      colors: ["#9ca3af", "#d1d5db"], // Gray tones
      icon: "🖥️",
    },
    {
      title: "Artificial Intelligence",
      items: [
        "Claude, Gemini, ChatGPT",
        "Ollama, PyTorch, TensorFlow, LangChain",
        "Self-hosting, Confidentiality, Ethics",
      ],
      colors: ["#f97316", "#fb923c"], // Orange-red gradient
      icon: "🤖",
    },
    {
      title: "Versioning",
      items: [
        "Git, Github, Gitlab, Bitbucket",
        "Gitflow, Github Flow",
        "Gitlab CI, Github Actions, Bitbucket Pipelines",
      ],
      colors: ["#6b7280", "#9ca3af"], // Dark to light gray
      icon: "📝",
    },
  ];

  const softSkills = [
    {
      title: t("languages"),
      items: [t("french"), t("english"), t("spanish")],
      colors: ["#ef4444", "#f87171", "#60a5fa"], // Red to light blue
      icon: "🌍",
    },
    {
      title: t("communication"),
      items: [t("oralPresentation"), t("technicalWriting"), t("teamwork")],
      colors: ["#ff6b35", "#60a5fa", "#9ca3af"], // Orange, light blue, gray
      icon: "💬",
    },
    {
      title: t("managementSkills"),
      items: [t("agileMethodologies"), t("projectManagement"), t("planning")],
      colors: ["#f97316", "#ef4444", "#60a5fa"], // Orange, red, light blue
      icon: "📊",
    },
    {
      title: t("ethicsAndIA"),
      items: [t("selfHosting"), t("isAsTool"), t("iaCritics")],
      colors: ["#ff6b35", "#9ca3af", "#60a5fa"], // Orange, gray, light blue
      icon: "🎯",
    },
    {
      title: t("creativity"),
      items: [t("uiux"), t("photography"), t("blogWriting")],
      colors: ["#ef4444", "#f97316", "#6b7280"], // Red, orange, gray
      icon: "✨",
    },
  ];

  return (
    <section
      id="competences"
      className="relative mb-5 scroll-mt-8 overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 py-20 lg:scroll-mt-0"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 h-64 w-64 animate-pulse rounded-full bg-orange-500/10 blur-3xl"></div>
        <div className="absolute right-1/4 bottom-1/4 h-80 w-80 animate-pulse rounded-full bg-red-500/10 blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 h-96 w-96 animate-pulse rounded-full bg-blue-400/5 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className="grid grid-cols-12">
          <div className="col-span-12 mb-8 lg:col-span-10 lg:col-start-2">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="mb-8 text-center text-5xl font-extrabold text-white"
            >
              <span className="via-stale-400 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                {t("skills")}
              </span>
            </motion.h2>

            {/* Technical Skills */}
            <motion.h4
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="mb-6 text-center text-2xl font-semibold text-blue-300"
            >
              {t("technics")}
            </motion.h4>

            <div className="mb-12 flex flex-wrap justify-center">
              {technicalSkills.map((skill, index) => (
                <motion.div
                  key={skill.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="w-full p-3 md:w-1/2 lg:w-1/3"
                >
                  <motion.div
                    className="group relative h-full overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-2xl backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:shadow-orange-500/25"
                    whileHover={{
                      y: -8,
                      transition: { duration: 0.2 },
                    }}
                  >
                    {/* Gradient Border Effect */}
                    <div
                      className="absolute inset-0 rounded-2xl opacity-75 blur-xl transition-opacity duration-300 group-hover:opacity-100"
                      style={{
                        background: `linear-gradient(135deg, ${skill.colors[0]}20, ${skill.colors[1]}20)`,
                      }}
                    />

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="mb-4 flex items-center space-x-3">
                        <span className="text-3xl">{skill.icon}</span>
                        <h3 className="text-xl font-bold text-white">
                          {skill.title}
                        </h3>
                      </div>
                      {skill.items.map((item, itemIndex) => (
                        <div key={itemIndex}>
                          <p className="mt-3 text-sm leading-relaxed text-gray-300">
                            {item}
                          </p>
                          {itemIndex < skill.items.length - 1 && (
                            <div className="my-3">
                              <div
                                className="h-px w-full rounded opacity-60"
                                style={{
                                  background: `linear-gradient(to right, ${skill.colors[itemIndex] ?? skill.colors[0] ?? "#3b82f6"}, transparent)`,
                                }}
                              />
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Soft Skills */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              viewport={{ once: true }}
              className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-md"
            >
              {/* Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-red-500/5 to-blue-400/10 opacity-50" />

              <div className="relative z-10">
                <h4 className="mb-8 text-center text-3xl font-bold text-white">
                  <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                    Soft Skills
                  </span>
                </h4>

                <div className="flex flex-wrap justify-center">
                  {softSkills.map((skill, index) => (
                    <motion.div
                      key={skill.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="w-full p-3 md:w-1/2 lg:w-1/5"
                    >
                      <motion.div
                        className="group relative h-full overflow-hidden rounded-xl border border-white/10 bg-white/10 p-4 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                        whileHover={{
                          scale: 1.05,
                          transition: { duration: 0.2 },
                        }}
                      >
                        <div className="text-center">
                          <span className="mb-2 block text-2xl">
                            {skill.icon}
                          </span>
                          <h3 className="mb-3 text-lg font-semibold text-white">
                            {skill.title}
                          </h3>
                          {skill.items.map((item, itemIndex) => (
                            <div key={itemIndex}>
                              <p className="mt-2 text-xs leading-relaxed text-gray-300">
                                {item.includes("(") ? (
                                  <>
                                    {item.split("(")[0]}{" "}
                                    <i className="text-gray-400">
                                      ({item.split("(")[1]}
                                    </i>
                                  </>
                                ) : (
                                  item
                                )}
                              </p>
                              {itemIndex < skill.items.length - 1 && (
                                <div className="my-2">
                                  <div
                                    className="h-px w-full rounded opacity-40"
                                    style={{
                                      background: `linear-gradient(to right, ${skill.colors[itemIndex] ?? skill.colors[0] ?? "#3b82f6"}, transparent)`,
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
