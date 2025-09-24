import type { AvailableThemeColor } from "../types";

export const availableThemeColors: AvailableThemeColor[] = [
  { name: "Zinc", light: "bg-zinc-900", dark: "bg-zinc-700" },
  { name: "Rose", light: "bg-rose-600", dark: "bg-rose-700" },
  { name: "Blue", light: "bg-blue-600", dark: "bg-blue-700" },
  { name: "Green", light: "bg-green-600", dark: "bg-green-500" },
  { name: "Orange", light: "bg-orange-500", dark: "bg-orange-700" },
];

export const THEME_STORAGE_KEY = "themeColor";
export const DEFAULT_THEME_COLOR = "Zinc";
