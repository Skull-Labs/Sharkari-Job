"use client";

import { useApp } from "@/components/providers/AppProvider";
import { MoonIcon, SunIcon } from "@/components/shared/Icons";

export function ThemeToggle() {
  const { theme, toggleTheme, t } = useApp();
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === "dark" ? t("themeLight") : t("themeDark")}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 text-navy-800 transition hover:border-saffron-400 dark:border-navy-600 dark:text-navy-50"
    >
      {theme === "dark" ? <SunIcon size={18} /> : <MoonIcon size={18} />}
    </button>
  );
}
