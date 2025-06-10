"use client";

import { motion } from "framer-motion";

export default function SetupSection() {
  const equipment = [
    {
      category: "Cameras",
      items: [
        {
          name: "Canon EOS 800D",
          description: "Primary camera for photography work",
        },
        {
          name: "Galaxy ZFold4",
          description: "Mobile photography and everyday shots",
        },
      ],
    },
    {
      category: "Lenses",
      items: [
        {
          name: "Canon EF-S 18-55mm f/4-5.6 IS STM",
          description: "Versatile kit lens for most situations",
        },
        {
          name: "Canon EF-S 10-18mm f/4.5-5.6 IS STM",
          description: "Wide-angle lens for landscapes and architecture",
        },
      ],
    },
    {
      category: "Accessories",
      items: [
        {
          name: "Tripod",
          description: "Stable support for long exposures",
        },
        { name: "ND Filters", description: "Creative control over exposure" },
        {
          name: "External Flash",
          description: "Additional lighting when needed",
        },
      ],
    },
  ];

  return (
    <section className="bg-black px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-16 text-center text-4xl font-light text-white md:text-5xl">
            My Setup
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex h-96 w-full items-center justify-center rounded-lg bg-gray-900">
              <span className="text-gray-400">Camera Setup 3D Model</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            {equipment.map((category, categoryIndex) => (
              <div key={category.category}>
                <h3 className="mb-4 text-2xl font-light text-white">
                  {category.category}
                </h3>
                <div className="space-y-3">
                  {category.items.map((item, itemIndex) => (
                    <motion.div
                      key={item.name}
                      className="border-l-2 border-white/20 py-2 pl-4"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.3,
                        delay: categoryIndex * 0.2 + itemIndex * 0.1,
                      }}
                      viewport={{ once: true }}
                    >
                      <h4 className="text-lg font-light text-white">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-400">
                        {item.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
