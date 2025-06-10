"use client";

import { useEffect, useMemo, useState } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { type Container, type ISourceOptions } from "@tsparticles/engine";
import { loadSlim } from "@tsparticles/slim";

interface ParticlesProps {
  color1: string;
  color2: string;
  className?: string;
}

export const ParticlesDesign = ({
  color1,
  color2,
  className = "",
}: ParticlesProps) => {
  const [init, setInit] = useState(false);

  useEffect(() => {
    void initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  const particlesLoaded = async (_container?: Container): Promise<void> => {
    // Optional: Log when particles are loaded
  };

  const options: ISourceOptions = useMemo(
    () => ({
      fpsLimit: 120,
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "repulse",
          },
          resize: {
            enable: true,
            delay: 0.5,
          },
        },
        modes: {
          push: {
            quantity: 4,
          },
          repulse: {
            distance: 90,
            duration: 0.4,
          },
        },
      },
      particles: {
        color: {
          value: [color1, color2],
        },
        links: {
          color: "#c2c2c2",
          distance: 150,
          enable: true,
          opacity: 0.5,
          width: 1,
        },
        move: {
          direction: "none",
          enable: true,
          outModes: {
            default: "bounce",
          },
          random: false,
          speed: 2,
          straight: false,
        },
        number: {
          density: {
            enable: true,
            width: 1920,
            height: 1080,
          },
          value: 25,
        },
        opacity: {
          value: 0.6,
        },
        shape: {
          type: ["circle", "square"],
        },
        size: {
          value: { min: 2, max: 8 },
        },
      },
      fullScreen: {
        enable: false,
        zIndex: 0,
      },
      background: {
        opacity: 0,
      },
      detectRetina: true,
      smooth: true,
    }),
    [color1, color2],
  );

  if (init) {
    return (
      <div className={`absolute inset-0 ${className}`}>
        <Particles
          id="tsparticles"
          particlesLoaded={particlesLoaded}
          options={options}
        />
      </div>
    );
  }

  return null;
};
