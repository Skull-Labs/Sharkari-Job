"use client";

import { useApp } from "@/components/providers/AppProvider";

export function LanguageToggle() {
  const { lang, t, toggleLang } = useApp();
  return (
    <button
      type="button"
      onClick={toggleLang}
      className="inline-flex h-10 min-w-10 items-center justify-center rounded-full border border-navy-200 px-2 text-xs font-semibold text-navy-800 transition hover:border-saffron-400 hover:text-saffron-600 sm:px-3 sm:text-sm sm:font-medium dark:border-navy-600 dark:text-navy-50 dark:hover:border-saffron-400"
    >
      <span className="sm:hidden">{lang === "hi" ? "EN" : "हिं"}</span>
      <span className="hidden sm:inline">{t("language")}</span>
    </button>
  );
}
