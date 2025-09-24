import React from "react";

export type ThemeMode = "light" | "dark";

export type ThemeColors = "Zinc" | "Rose" | "Blue" | "Green" | "Orange";

export interface ThemeColorStateParams {
  themeColor: ThemeColors;
  setThemeColor: React.Dispatch<React.SetStateAction<ThemeColors>>;
}

export interface ThemeConfig {
  light: Record<string, string>;
  dark: Record<string, string>;
}

export interface ThemeSystem {
  [key: string]: ThemeConfig;
}

export interface AvailableThemeColor {
  name: ThemeColors;
  light: string;
  dark: string;
}