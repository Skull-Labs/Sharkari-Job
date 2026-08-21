"use client";

import { SearchIcon } from "@/components/shared/Icons";
import { useApp } from "@/components/providers/AppProvider";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function HeroSearch() {
  const { t } = useApp();
  const router = useRouter();
  const [q, setQ] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const query = q.trim();
    router.push(query ? `/search?q=${encodeURIComponent(query)}` : "/search");
  }

  return (
    <section className="relative overflow-hidden bg-navy-900 text-white">
      <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-saffron-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-20 left-10 h-48 w-48 rounded-full bg-sky-500/10 blur-3xl" />
      <div className="mx-auto max-w-6xl px-4 py-8 sm:py-16">
        <p className="text-xs font-semibold uppercase tracking-[0.2em] text-saffron-400">
          {t("brand")}
        </p>
        <h1 className="mt-3 max-w-2xl text-2xl font-bold leading-tight tracking-tight sm:text-4xl">
          {t("heroTitle")}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-6 text-navy-200 sm:text-base">
          {t("heroSubtitle")}
        </p>
        <form onSubmit={submit} className="mt-6 flex max-w-xl flex-col gap-2 sm:mt-8 sm:flex-row">
          <label className="relative flex-1">
            <span className="sr-only">{t("search")}</span>
            <SearchIcon className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-navy-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder={t("searchPlaceholder")}
            className="w-full rounded-2xl border-0 bg-white py-3.5 pl-10 pr-4 text-base text-navy-900 shadow-lg outline-none ring-2 ring-transparent placeholder:text-navy-400 focus:ring-saffron-400 sm:text-sm"
            />
          </label>
          <button
            type="submit"
            className="min-h-12 rounded-2xl bg-saffron-500 px-6 py-3.5 text-sm font-bold text-white hover:bg-saffron-600"
          >
            {t("searchButton")}
          </button>
        </form>
      </div>
    </section>
  );
}
