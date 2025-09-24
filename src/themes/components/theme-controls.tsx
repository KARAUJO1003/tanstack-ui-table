"use client";

import { ThemeColorSelector } from "./theme-color-selector";
import { ThemeModeToggle } from "./theme-mode-toggle";

interface ThemeControlsProps {
  className?: string;
  showColorSelector?: boolean;
  showModeToggle?: boolean;
}

export function ThemeControls({
  className = "",
  showColorSelector = true,
  showModeToggle = true,
}: ThemeControlsProps) {
  return (
    <div className={`flex items-center space-x-4 ${className}`}>
      {showColorSelector && <ThemeColorSelector />}
      {showModeToggle && <ThemeModeToggle />}
    </div>
  );
}