"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  type ReactNode,
} from "react";
import type { PortfolioMode } from "~/types/portfolio";

interface PortfolioContextType {
  mode: PortfolioMode;
  setMode: (mode: PortfolioMode) => void;
  focusedProject: number | null;
  setFocusedProject: (projectId: number | null) => void;
  focusedAlbum: number | null;
  setFocusedAlbum: (albumId: number | null) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(
  undefined,
);

export function PortfolioProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<PortfolioMode>("dev");
  const [focusedProject, setFocusedProject] = useState<number | null>(null);
  const [focusedAlbum, setFocusedAlbum] = useState<number | null>(null);

  // Load last opened page from localStorage
  useEffect(() => {
    const lastOpenedPage = localStorage.getItem("lastOpenedPage");
    if (lastOpenedPage) {
      const isDev = JSON.parse(lastOpenedPage) as boolean;
      setModeState(isDev ? "dev" : "photo");
    }
  }, []);

  const setMode = (newMode: PortfolioMode) => {
    setModeState(newMode);
    localStorage.setItem("lastOpenedPage", JSON.stringify(newMode === "dev"));
  };

  return (
    <PortfolioContext.Provider
      value={{
        mode,
        setMode,
        focusedProject,
        setFocusedProject,
        focusedAlbum,
        setFocusedAlbum,
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
