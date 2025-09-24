"use client";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useThemeColor } from "../hooks";
import { availableThemeColors } from "../config";

export function ThemeColorSelector() {
  const { themeColor, setThemeColor } = useThemeColor();
  const { theme } = useTheme();

  const createSelectItems = () => {
    return availableThemeColors.map(({ name, light, dark }) => (
      <SelectItem
        key={name}
        value={name}
      >
        <div className="flex items-center space-x-3">
          <div
            className={cn(
              "rounded-full w-[20px] h-[20px]",
              theme === "light" ? light : dark
            )}
          />
          <div className="text-sm">{name}</div>
        </div>
      </SelectItem>
    ));
  };

  return (
    <Select
      onValueChange={(value) => setThemeColor(value as any)}
      defaultValue={themeColor}
    >
      <SelectTrigger className="focus:ring-transparent ring-offset-transparent w-[180px]">
        <SelectValue placeholder="Selecionar Cor" />
      </SelectTrigger>
      <SelectContent className="border-muted">
        {createSelectItems()}
      </SelectContent>
    </Select>
  );
}
