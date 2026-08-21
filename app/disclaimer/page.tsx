"use client";

import { useApp } from "@/components/providers/AppProvider";

export default function DisclaimerPage() {
  const { t } = useApp();
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl dark:text-white">{t("disclaimer")}</h1>
      <p className="mt-4 text-sm leading-7 text-navy-700 dark:text-navy-200">{t("disclaimerBody")}</p>
      <p className="mt-4 text-sm leading-7 text-navy-700 dark:text-navy-200">{t("verifyOfficial")}</p>
      <p className="mt-6 rounded-2xl border border-navy-100 bg-white p-4 text-sm text-navy-700 dark:border-navy-800 dark:bg-navy-900 dark:text-navy-100">
        {t("weDontConduct")}
      </p>
    </div>
  );
}
