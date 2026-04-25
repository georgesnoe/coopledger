"use client";

import * as React from "react";
import { IconMoon, IconSun } from "@tabler/icons-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="relative rounded-full w-9 h-9 border border-border/70 bg-background/80 hover:bg-muted/80 transition-all duration-300"
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <IconSun className="h-[1rem] w-[1rem] rotate-0 scale-100 text-amber-500 transition-all dark:-rotate-90 dark:scale-0" />
      <IconMoon className="absolute h-[1rem] w-[1rem] rotate-90 scale-0 text-sky-400 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
