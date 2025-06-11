"use client";

import { motion } from "framer-motion";
import { albums } from "~/lib/data/albums";

export default function AlbumsSection() {
  return (
    <section className="bg-gray-900 px-4 py-20">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="mb-16 text-center text-4xl font-light text-white md:text-5xl">
            Photo Albums
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {albums.map((album, index) => (
            <motion.div
              key={index}
              className="group cursor-pointer"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <div className="flex h-full w-full items-center justify-center bg-gray-800 transition-transform duration-500 group-hover:scale-110">
                  <span className="text-gray-400">Album Preview</span>
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 flex items-end bg-black/0 transition-all duration-300 group-hover:bg-black/30">
                  <div className="translate-y-full transform p-6 text-white transition-transform duration-300 group-hover:translate-y-0">
                    <h3 className="mb-1 text-xl font-light">{album.title}</h3>
                    <p className="text-sm text-gray-300">
                      {album.date} • {album.camera}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
