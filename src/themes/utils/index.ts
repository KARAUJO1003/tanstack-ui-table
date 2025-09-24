import { themeColors } from "../config/colors";
import type { ThemeMode, ThemeColors } from "../types";
import { THEME_STORAGE_KEY, DEFAULT_THEME_COLOR } from "../config/constants"; "../config/constants";

/**
 * Aplica o tema global ao documento
 */
export function setGlobalColorTheme(
  themeMode: ThemeMode,
  color: ThemeColors
): void {
  const theme = themeColors[color][themeMode] as {
    [key: string]: string;
  };

  for (const key in theme) {
    document.documentElement.style.setProperty(`--${key}`, theme[key]);
  }
}

/**
 * Recupera a cor do tema salva no localStorage
 */
export function getSavedThemeColor(): ThemeColors {
  if (typeof window === "undefined") return DEFAULT_THEME_COLOR;

  try {
    const savedColor = localStorage.getItem(THEME_STORAGE_KEY);
    return (savedColor as ThemeColors) || DEFAULT_THEME_COLOR;
  } catch (error) {
    console.warn("Erro ao recuperar cor do tema:", error);
    return DEFAULT_THEME_COLOR;
  }
}

/**
 * Salva a cor do tema no localStorage
 */
export function saveThemeColor(color: ThemeColors): void {
  if (typeof window === "undefined") return;

  try {
    localStorage.setItem(THEME_STORAGE_KEY, color);
  } catch (error) {
    console.warn("Erro ao salvar cor do tema:", error);
  }
}
