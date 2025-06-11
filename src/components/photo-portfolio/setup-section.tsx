"use client";

import { motion } from "framer-motion";
import { useRef, Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Canon800dModel } from "./canon-800d-model";
import type * as THREE from "three";

// Wrapper component for the rotating 3D model
function RotatingCanon800d() {
  const [rotation, setRotation] = useState(0);
  const groupRef = useRef<THREE.Group>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const newRotation = scrollY * 0.003;
      setRotation(newRotation);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = rotation;
      // Significantly larger scale for better visibility
      groupRef.current.scale.set(6, 6, 6);
    }
  }, [rotation]);

  return (
    <group ref={groupRef}>
      <Canon800dModel position={[0, -0.1, 0]} />
    </group>
  );
}

export default function SetupSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeCategory, setActiveCategory] = useState(0);

  const equipment = [
    {
      category: "Body",
      icon: "camera",
      items: [
        {
          name: "Canon EOS 800D",
          description: "APS-C DSLR with 24.2MP sensor",
          specs: "24.2MP • Dual Pixel CMOS AF • 4K Video",
        },
        {
          name: "Galaxy ZFold4",
          description: "Mobile photography companion",
          specs: "108MP • Ultra-wide • Portrait",
        },
      ],
    },
    {
      category: "Optics",
      icon: "lens",
      items: [
        {
          name: "EF-S 18-55mm f/4-5.6 IS STM",
          description: "Versatile standard zoom lens",
          specs: "18-55mm • Image Stabilization • STM Motor",
        },
        {
          name: "EF-S 10-18mm f/4.5-5.6 IS STM",
          description: "Ultra-wide angle lens",
          specs: "10-18mm • Wide-angle • Landscape Photography",
        },
      ],
    },
    {
      category: "Accessories",
      icon: "gear",
      items: [
        {
          name: "Carbon Fiber Tripod",
          description: "Lightweight stability",
          specs: "1.2kg • 165cm max height • Ball head",
        },
        {
          name: "ND Filter Set",
          description: "Creative exposure control",
          specs: "ND4 • ND8 • ND64 • Circular Polarizer",
        },
        {
          name: "Speedlite Flash",
          description: "Additional lighting solution",
          specs: "GN 60 • TTL • High-speed sync",
        },
      ],
    },
  ];

  return (
    <motion.section
      ref={sectionRef}
      id="setup"
      className="relative min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 px-4 py-20"
    >
      {/* Geometric background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 h-32 w-32 rotate-45 border border-gray-300/30" />
        <div className="absolute bottom-40 left-20 h-24 w-24 rotate-12 border border-gray-400/20" />
        <div className="absolute top-1/3 left-1/4 h-16 w-16 rotate-45 bg-gradient-to-br from-gray-300/10 to-gray-400/10" />
        <div className="absolute right-1/4 bottom-1/3 h-20 w-20 rotate-12 bg-gradient-to-tl from-gray-200/15 to-gray-300/15" />
      </div>

      {/* Minimal grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative mx-auto max-w-7xl">
        {/* Modern Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <motion.div
            className="mb-6 inline-flex items-center border border-gray-300/40 px-6 py-2 backdrop-blur-sm"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <div className="mr-3 h-2 w-2 border border-gray-400"></div>
            <span className="text-xs font-medium tracking-[0.2em] text-gray-600 uppercase">
              ÉQUIPEMENT
            </span>
          </motion.div>

          <h2
            className="mb-4 font-light tracking-tight text-gray-900"
            style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)" }}
          >
            Photography Setup
          </h2>

          <p className="mx-auto max-w-2xl text-base leading-relaxed font-light text-gray-500">
            L&apos;équipement soigneusement sélectionné pour capturer
            l&apos;essence de chaque moment
          </p>
        </motion.div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Equipment Categories - Interactive */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="space-y-8"
          >
            {/* Category Tabs */}
            <div className="mb-8 flex flex-wrap gap-2">
              {equipment.map((category, index) => (
                <motion.button
                  key={category.category}
                  onClick={() => setActiveCategory(index)}
                  className={`border px-6 py-3 font-light transition-all duration-300 ${
                    activeCategory === index
                      ? "border-gray-900 bg-gray-900 text-white"
                      : "border-gray-300 bg-transparent text-gray-700 hover:border-gray-400 hover:bg-gray-50"
                  }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-sm tracking-wide uppercase">
                    {category.category}
                  </span>
                </motion.button>
              ))}
            </div>

            {/* Active Category Items */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              {equipment[activeCategory]?.items.map((item, itemIndex) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: itemIndex * 0.1 }}
                  className="group relative border border-gray-200 bg-white/60 p-6 backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:bg-white/80"
                >
                  {/* Minimal accent line */}
                  <div className="absolute top-0 left-0 h-full w-px scale-y-0 transform bg-gray-900 transition-transform duration-300 group-hover:scale-y-100" />

                  <div className="relative">
                    <h4 className="mb-2 text-lg font-light text-gray-900 transition-colors">
                      {item.name}
                    </h4>
                    <p className="mb-3 text-sm leading-relaxed font-light text-gray-600">
                      {item.description}
                    </p>
                    <div className="inline-flex items-center border border-gray-200 px-3 py-1">
                      <span className="font-mono text-xs tracking-wide text-gray-500 uppercase">
                        {item.specs}
                      </span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* 3D Model Showcase */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true, margin: "-50px" }}
            className="relative flex items-center justify-center"
          >
            <div className="relative h-[600px] w-full max-w-lg border border-gray-300 bg-gradient-to-br from-gray-100 via-white to-gray-50">
              {/* Minimal grid overlay */}
              <div className="absolute inset-0 opacity-[0.02]">
                <div
                  className="h-full w-full"
                  style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                  }}
                />
              </div>

              {/* 3D Canvas */}
              <Canvas
                camera={{ position: [0, 0, 3], fov: 45 }}
                className="h-full w-full"
                dpr={[1, 2]}
              >
                <ambientLight intensity={1.2} />
                <directionalLight
                  position={[10, 10, 5]}
                  intensity={1.2}
                  castShadow={false}
                />
                <pointLight
                  position={[-5, 5, 5]}
                  intensity={0.5}
                  color="#666666"
                />

                <Suspense fallback={null}>
                  <RotatingCanon800d />
                </Suspense>

                <OrbitControls
                  enabled={true}
                  enableZoom={true}
                  enablePan={false}
                  autoRotate={true}
                  autoRotateSpeed={0.3}
                  maxDistance={5}
                  minDistance={2}
                />
              </Canvas>

              {/* Geometric corner accents */}
              <div className="absolute top-4 left-4 h-6 w-6 border-t border-l border-gray-400/60" />
              <div className="absolute top-4 right-4 h-6 w-6 border-t border-r border-gray-400/60" />
              <div className="absolute bottom-4 left-4 h-6 w-6 border-b border-l border-gray-400/60" />
              <div className="absolute right-4 bottom-4 h-6 w-6 border-r border-b border-gray-400/60" />

              {/* Camera info card */}
              <motion.div
                className="absolute right-4 bottom-4 left-4 border border-gray-300 bg-white/95 p-4 backdrop-blur-sm"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center border border-gray-400">
                    <div className="h-3 w-3 border border-gray-600"></div>
                  </div>
                  <div>
                    <h4 className="text-sm font-light text-gray-900">
                      Canon EOS 800D
                    </h4>
                    <p className="text-xs font-light text-gray-500">
                      Interactive 3D Model
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Statistics Cards */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-20 grid grid-cols-2 gap-4 md:grid-cols-4"
        >
          {[
            { label: "Photos", value: "10K+", icon: "camera" },
            { label: "Équipements", value: "8", icon: "gear" },
            { label: "Années", value: "5+", icon: "time" },
            { label: "Projets", value: "50+", icon: "project" },
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              className="border border-gray-200 bg-white/70 p-6 text-center backdrop-blur-sm transition-all duration-300 hover:border-gray-300 hover:bg-white/90"
              whileHover={{ scale: 1.02 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="mb-2 flex justify-center">
                <div className="h-4 w-4 border border-gray-400"></div>
              </div>
              <div className="mb-1 text-xl font-light text-gray-900">
                {stat.value}
              </div>
              <div className="text-xs font-light tracking-wide text-gray-500 uppercase">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </motion.section>
  );
}
