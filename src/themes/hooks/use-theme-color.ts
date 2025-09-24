import { useContext } from "react";
import type { ThemeColorStateParams } from "../types";
import { ThemeContext } from "../providers/theme-provider";

/**
 * Hook para acessar o contexto de cores do tema
 */
export function useThemeColor(): ThemeColorStateParams {
  const context = useContext(ThemeContext);

  if (context === undefined) {
    throw new Error("useThemeColor must be used within a ThemeProvider");
  }

  return context;
}
