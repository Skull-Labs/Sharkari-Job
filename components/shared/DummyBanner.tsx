"use client";

import { isDummyApi } from "@/lib/api";
import { useApp } from "@/components/providers/AppProvider";

export function DummyBanner() {
  const { t } = useApp();
  if (!isDummyApi()) return null;
  return (
    <p className="rounded-xl border border-dashed border-saffron-300 bg-saffron-50 px-3 py-2 text-xs leading-5 text-navy-800 dark:border-saffron-500/40 dark:bg-saffron-500/10 dark:text-navy-50">
      {t("backendNote")}
    </p>
  );
}
