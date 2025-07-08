"use client";

import { createContext, useState, type ReactNode } from "react";

interface PortfolioContextType {
  focusedProject: number | null;
  setFocusedProject: (projectId: number | null) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined,
);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [focusedProject, setFocusedProject] = useState<number | null>(null);

  return (
    <PortfolioContext.Provider
      value={{
        focusedProject,
        setFocusedProject,
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
}
