"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

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

export function usePortfolio() {
  const context = useContext(PortfolioContext);
  if (context === undefined) {
    throw new Error("usePortfolio must be used within a PortfolioProvider");
  }
  return context;
}
