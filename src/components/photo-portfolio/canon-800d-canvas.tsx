"use client";

import { Suspense, useEffect, useState, useCallback, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Canon800dModel } from "./canon-800d-model";

export default function Canon800dCanvas() {
  // Performance optimized constants - adjusted for more subtle behavior
  const SCROLL_CONSTANTS = useMemo(
    () => ({
      BASE: 280, // Increased base position to start lower
      FIRST_STEP: 400,
      ROTATION_STOP: 1200, // Reduced rotation range
      SECOND_STEP: 1000, // Adjusted for earlier fade
      ROTATION_SPEED: 0.004, // Reduced rotation speed for subtlety
    }),
    [],
  );

  // State management
  const [isSmallScreen, setIsSmallScreen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [rotation, setRotation] = useState(0);
  const [modelHeight, setModelHeight] = useState(SCROLL_CONSTANTS.BASE);
  const [opacity, setOpacity] = useState(1);

  // Optimized screen size check
  const checkScreenSize = useCallback(() => {
    setIsSmallScreen(window.innerWidth < 1020);
  }, []);

  // Handle hydration and screen size detection
  useEffect(() => {
    setMounted(true);
    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, [checkScreenSize]);

  // Optimized scroll handler with throttling
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    const { BASE, FIRST_STEP, ROTATION_STOP, SECOND_STEP, ROTATION_SPEED } =
      SCROLL_CONSTANTS;

    // Rotation logic - simplified
    const newRotation =
      scrollY <= ROTATION_STOP
        ? scrollY * ROTATION_SPEED
        : ROTATION_STOP * ROTATION_SPEED;
    setRotation(newRotation);

    // Height logic - optimized calculations
    let newHeight = BASE;
    if (scrollY > SECOND_STEP) {
      newHeight = BASE - FIRST_STEP * 0.5 - (scrollY - SECOND_STEP) * 0.4;
    } else if (scrollY < FIRST_STEP) {
      newHeight = BASE - scrollY * 0.5;
    }
    setModelHeight(newHeight);

    // Opacity logic - smoother transition
    const newOpacity =
      scrollY > SECOND_STEP
        ? Math.max(0, 1 - (scrollY - SECOND_STEP) / 200)
        : 1;
    setOpacity(newOpacity);
  }, [SCROLL_CONSTANTS]);

  // Throttled scroll event listener
  useEffect(() => {
    if (!mounted) return;

    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Initial call
    throttledScroll();

    window.addEventListener("scroll", throttledScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledScroll);
  }, [mounted, handleScroll]);

  // Camera FOV based on screen size - reduced for smaller, more subtle appearance
  const cameraFOV = isSmallScreen ? 15 : 8;

  // Canvas style object - memoized for performance
  const canvasStyle = useMemo(
    () => ({
      position: "fixed" as const,
      top: modelHeight,
      width: "25%", // Reduced from 40% to 25%
      height: "300px", // Added fixed height for better control
      right: "2%", // Moved slightly more inward
      opacity: opacity * 0.8, // Made more subtle by reducing opacity
      zIndex: 5, // Reduced z-index to make it less prominent
      pointerEvents: "none" as const,
    }),
    [modelHeight, opacity],
  );

  // Don't render until mounted to avoid hydration mismatch
  if (!mounted) {
    return null;
  }

  return (
    <Canvas
      camera={{ position: [0, 0, 3], fov: cameraFOV }} // Moved camera further back
      style={canvasStyle}
      dpr={[1, 2]} // Performance optimization: limit device pixel ratio
      frameloop="demand" // Only render when needed
    >
      {/* More subtle lighting setup */}
      <ambientLight intensity={0.6} />
      <directionalLight
        position={[5, 5, 5]}
        intensity={0.4}
        castShadow={false} // Disable shadows for performance
      />

      <Suspense fallback={null}>
        <Canon800dModel position={[0.025, 0, 0]} rotation={[0, rotation, 0]} />
      </Suspense>

      <OrbitControls
        enabled={false}
        enableZoom={false}
        enablePan={false}
        enableRotate={false}
      />
    </Canvas>
  );
}
