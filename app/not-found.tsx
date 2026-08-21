"use client";

import { SearchIcon } from "@/components/shared/Icons";
import { useApp } from "@/components/providers/AppProvider";
import Link from "next/link";

export default function NotFound() {
  const { t } = useApp();
  return (
    <div className="mx-auto max-w-lg px-4 py-20 text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-saffron-600">404</p>
      <h1 className="mt-3 text-2xl font-bold text-navy-900 dark:text-white">{t("notFoundTitle")}</h1>
      <p className="mt-2 text-sm text-navy-600 dark:text-navy-200">{t("notFoundHint")}</p>
      <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
        <Link
          href="/"
          className="rounded-full bg-navy-900 px-5 py-2.5 text-sm font-semibold text-white dark:bg-saffron-500 dark:text-navy-950"
        >
          {t("backHome")}
        </Link>
        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-full border border-navy-200 px-5 py-2.5 text-sm font-semibold dark:border-navy-700"
        >
          <SearchIcon size={16} />
          {t("search")}
        </Link>
      </div>
    </div>
  );
}
