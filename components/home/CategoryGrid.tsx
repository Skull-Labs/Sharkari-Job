"use client";

import { CATEGORY_ICONS } from "@/components/shared/Icons";
import { useApp } from "@/components/providers/AppProvider";
import { CATEGORY_META } from "@/lib/constants";
import { CATEGORIES } from "@/lib/types";
import Link from "next/link";

export function CategoryGrid() {
  const { t } = useApp();
  return (
    <section className="mx-auto max-w-6xl px-4">
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {CATEGORIES.map((c) => {
          const meta = CATEGORY_META[c];
          const Icon = CATEGORY_ICONS[c];
          return (
            <Link
              key={c}
              href={meta.href}
              className="flex min-w-0 items-center gap-2 rounded-2xl border border-navy-100 bg-white p-3 shadow-sm transition hover:border-saffron-300 hover:shadow-md sm:gap-3 sm:p-4 dark:border-navy-800 dark:bg-navy-900"
            >
              <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-10 sm:w-10 ${meta.accent}`}>
                <Icon size={18} />
              </span>
              <span className="min-w-0 text-xs font-semibold leading-snug text-navy-900 sm:text-sm dark:text-white">
                {t(meta.labelKey)}
              </span>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
