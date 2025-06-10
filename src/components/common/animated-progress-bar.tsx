"use client";

import { useEffect, useRef, useState } from "react";

interface AnimatedProgressBarProps {
  color1: string;
  color2: string;
  percentage: number;
}

export default function AnimatedProgressBar({
  color1,
  color2,
  percentage,
}: AnimatedProgressBarProps) {
  const barRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const bar = barRef.current;

    if (bar) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsVisible(true);
            }
          });
        },
        {
          threshold: 0.1, // Se déclenche quand 10% de la barre est visible
        },
      );

      observer.observe(bar);

      return () => {
        observer.unobserve(bar);
      };
    }
  }, []);

  return (
    <div className="mt-2 mb-4 h-2 w-full rounded-full bg-gray-700">
      <div
        className="h-full rounded-full transition-all duration-[2000ms] ease-out"
        ref={barRef}
        style={{
          width: isVisible ? `${percentage}%` : "0%",
          background: `linear-gradient(to right, ${color1}, ${color2})`,
        }}
      />
    </div>
  );
}
