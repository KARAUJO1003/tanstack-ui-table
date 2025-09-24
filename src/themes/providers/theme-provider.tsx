"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { useTheme } from "next-themes";
import type { ThemeColorStateParams, ThemeColors, ThemeMode } from "../types";
import {
  setGlobalColorTheme,
  getSavedThemeColor,
  saveThemeColor,
} from "../utils";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeColorStateParams>(
  {} as ThemeColorStateParams
);

export function ThemesProvider({ children }: ThemeProviderProps) {
  const [themeColor, setThemeColor] = useState<ThemeColors>(
    getSavedThemeColor()
  );
  const [isMounted, setIsMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    saveThemeColor(themeColor);
    setGlobalColorTheme(theme as ThemeMode, themeColor);

    if (!isMounted) {
      setIsMounted(true);
    }
  }, [themeColor, theme, isMounted]);

  // Previne hidratação inconsistente
  if (!isMounted) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ themeColor, setThemeColor }}>
      {children}
    </ThemeContext.Provider>
  );
}

/**
 * Hook para acessar o contexto do tema
 * @deprecated Use useThemeColor from hooks instead
 */
export function useThemeContext(): ThemeColorStateParams {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useThemeContext must be used within a ThemeProvider");
  }

  return context;
}
