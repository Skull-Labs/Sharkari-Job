"use client";

import { messages } from "@/data/i18n";
import type { Lang, Theme } from "@/lib/types";
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
} from "react";

const LANG_KEY = "sharkari-lang";
const THEME_KEY = "sharkari-theme";
const SAVED_KEY = "sharkari-saved";

type Prefs = {
  lang: Lang;
  theme: Theme;
  savedIds: string[];
};

const defaultPrefs: Prefs = { lang: "en", theme: "light", savedIds: [] };

let prefs: Prefs = defaultPrefs;
let didRead = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function readStorage(): Prefs {
  try {
    const storedLang = localStorage.getItem(LANG_KEY);
    const storedTheme = localStorage.getItem(THEME_KEY);
    const storedSaved = localStorage.getItem(SAVED_KEY);
    let lang: Lang = "en";
    let theme: Theme = "light";
    let savedIds: string[] = [];
    if (storedLang === "hi" || storedLang === "en") lang = storedLang;
    if (storedTheme === "dark" || storedTheme === "light") {
      theme = storedTheme;
    } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      theme = "dark";
    }
    if (storedSaved) {
      const parsed = JSON.parse(storedSaved) as unknown;
      if (Array.isArray(parsed)) {
        savedIds = parsed.filter((id): id is string => typeof id === "string");
      }
    }
    return { lang, theme, savedIds };
  } catch {
    return defaultPrefs;
  }
}

function applyDom(next: Prefs) {
  document.documentElement.lang = next.lang === "hi" ? "hi" : "en";
  document.documentElement.classList.toggle("dark", next.theme === "dark");
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!didRead && typeof window !== "undefined") {
    didRead = true;
    const next = readStorage();
    prefs = next;
    applyDom(next);
    queueMicrotask(emit);
  }
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return prefs;
}

function getServerSnapshot() {
  return defaultPrefs;
}

function writePrefs(next: Prefs) {
  prefs = next;
  try {
    localStorage.setItem(LANG_KEY, next.lang);
    localStorage.setItem(THEME_KEY, next.theme);
    localStorage.setItem(SAVED_KEY, JSON.stringify(next.savedIds));
  } catch {
    /* ignore */
  }
  applyDom(next);
  emit();
}

const mountedSubscribe = () => () => {};

type AppContextValue = {
  lang: Lang;
  theme: Theme;
  savedIds: string[];
  hydrated: boolean;
  t: (key: keyof typeof messages.en) => string;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  toggleTheme: () => void;
  isSaved: (id: string) => boolean;
  toggleSaved: (id: string) => void;
};

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const current = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const hydrated = useSyncExternalStore(mountedSubscribe, () => true, () => false);

  const setLang = useCallback((lang: Lang) => {
    writePrefs({ ...prefs, lang });
  }, []);

  const toggleLang = useCallback(() => {
    writePrefs({ ...prefs, lang: prefs.lang === "en" ? "hi" : "en" });
  }, []);

  const toggleTheme = useCallback(() => {
    writePrefs({ ...prefs, theme: prefs.theme === "dark" ? "light" : "dark" });
  }, []);

  const isSaved = useCallback(
    (id: string) => current.savedIds.includes(id),
    [current.savedIds],
  );

  const toggleSaved = useCallback((id: string) => {
    const savedIds = prefs.savedIds.includes(id)
      ? prefs.savedIds.filter((x) => x !== id)
      : [...prefs.savedIds, id];
    writePrefs({ ...prefs, savedIds });
  }, []);

  const t = useCallback(
    (key: keyof typeof messages.en) => messages[current.lang][key],
    [current.lang],
  );

  const value = useMemo(
    () => ({
      lang: current.lang,
      theme: current.theme,
      savedIds: current.savedIds,
      hydrated,
      t,
      setLang,
      toggleLang,
      toggleTheme,
      isSaved,
      toggleSaved,
    }),
    [
      current.lang,
      current.theme,
      current.savedIds,
      hydrated,
      t,
      setLang,
      toggleLang,
      toggleTheme,
      isSaved,
      toggleSaved,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error("useApp must be used within AppProvider");
  }
  return ctx;
}
