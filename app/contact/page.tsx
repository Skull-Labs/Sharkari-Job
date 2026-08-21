"use client";

import { useApp } from "@/components/providers/AppProvider";
import { useState } from "react";

export default function ContactPage() {
  const { t } = useApp();
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-lg px-4 py-8 sm:py-12">
      <h1 className="text-2xl font-bold text-navy-900 sm:text-3xl dark:text-white">{t("contact")}</h1>
      <p className="mt-3 text-sm leading-7 text-navy-700 dark:text-navy-200">{t("contactIntro")}</p>
      {sent ? (
        <p className="mt-8 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100">
          {t("contactNote")}
        </p>
      ) : (
        <form
          className="mt-8 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label className="block text-sm font-medium">
            {t("name")}
            <input
              required
              name="name"
              className="mt-1 min-h-11 w-full rounded-xl border border-navy-200 bg-white px-3 py-2.5 dark:border-navy-700 dark:bg-navy-900"
            />
          </label>
          <label className="block text-sm font-medium">
            {t("email")}
            <input
              required
              type="email"
              name="email"
              className="mt-1 min-h-11 w-full rounded-xl border border-navy-200 bg-white px-3 py-2.5 dark:border-navy-700 dark:bg-navy-900"
            />
          </label>
          <label className="block text-sm font-medium">
            {t("message")}
            <textarea
              required
              name="message"
              rows={5}
              className="mt-1 min-h-11 w-full rounded-xl border border-navy-200 bg-white px-3 py-2.5 dark:border-navy-700 dark:bg-navy-900"
            />
          </label>
          <button
            type="submit"
            className="w-full rounded-2xl bg-navy-900 py-3 text-sm font-bold text-white dark:bg-saffron-500 dark:text-navy-950"
          >
            {t("send")}
          </button>
          <p className="text-xs text-navy-500">{t("contactNote")}</p>
        </form>
      )}
    </div>
  );
}
