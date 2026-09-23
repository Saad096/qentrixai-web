"use client";

/**
 * Dark is the default, so the class we toggle is `.light`. Preference persists
 * under "qx-theme" and is applied pre-paint by the bootstrap in layout.tsx.
 * 44px hit area: the old 36x36 button failed the touch-target check.
 */
import * as React from "react";
import { Sun, Moon } from "lucide-react";
import { cn } from "@/lib/utils";

export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = React.useState<"light" | "dark">("dark");

  React.useEffect(() => {
    setTheme(document.documentElement.classList.contains("light") ? "light" : "dark");
  }, []);

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.classList.toggle("light", next === "light");
    try {
      localStorage.setItem("qx-theme", next);
    } catch {
      /* private mode: the preference simply will not persist */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full text-muted transition-colors hover:text-text",
        className
      )}
    >
      {theme === "dark" ? <Moon className="size-[18px]" /> : <Sun className="size-[18px]" />}
    </button>
  );
}
