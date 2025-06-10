"use client";

import { Suspense, useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Canon800dModel } from "./canon-800d-model";

export default function Canon800dCanvas() {
  const BASE = 240;
  const FIRST_STEP = 400;
  const ROTATION_STOP = 1400;
  const SECOND_STEP = 1150;
  const ROTATION_SPEED = 0.006;

  // Use a client-side state for screen size to avoid hydration issues
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [mounted, setMounted] = useState(false);

  const [rotation, setRotation] = useState(0);
  const [modelHeight, setModelHeight] = useState(BASE);
  const [opacity, setOpacity] = useState(1);

  // Handle hydration and screen size detection
  useEffect(() => {
    setMounted(true);
    const checkScreenSize = () => {
      setIsSmallScreen(window.innerWidth < 1020);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  // Initialize scroll position on mount
  useEffect(() => {
    if (!mounted) return;

    const scrollY = window.scrollY;
    setRotation(scrollY < SECOND_STEP ? scrollY * ROTATION_SPEED : 0);
  }, [mounted]);

  useEffect(() => {
    if (!mounted) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;

      // Rotation logic
      if (scrollY <= ROTATION_STOP) {
        setRotation(scrollY * ROTATION_SPEED);
      } else {
        setRotation(ROTATION_STOP * ROTATION_SPEED);
      }

      // Height logic
      if (scrollY > SECOND_STEP) {
        setModelHeight(BASE - FIRST_STEP * 0.5 - (scrollY - SECOND_STEP) * 0.4);
      } else if (scrollY < FIRST_STEP) {
        setModelHeight(BASE - scrollY * 0.5);
      }

      // Opacity logic
      if (scrollY > SECOND_STEP) {
        setOpacity(Math.max(0, 1 - (scrollY - SECOND_STEP) / 200));
      } else {
        setOpacity(1);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Call once to set initial state
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mounted]);

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  const FOV = isSmallScreen ? 20 : 10;

  return (
    <Canvas
      camera={{ position: [0, 0, 2], fov: FOV }}
      style={{
        position: "fixed",
        top: modelHeight,
        width: "40%",
        right: "0.5%",
        opacity: opacity,
        zIndex: 10,
        pointerEvents: "none", // Allow clicking through the canvas
      }}
    >
      <ambientLight intensity={1.25} />
      <ambientLight intensity={0.1} />
      <directionalLight intensity={0.4} />
      <Suspense fallback={null}>
        <Canon800dModel position={[0.025, 0, 0]} rotation={[0, rotation, 0]} />
      </Suspense>
      <OrbitControls enabled={false} />
    </Canvas>
  );
}
