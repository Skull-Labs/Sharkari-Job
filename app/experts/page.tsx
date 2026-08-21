"use client";

import { DummyBanner } from "@/components/shared/DummyBanner";
import { useApp } from "@/components/providers/AppProvider";
import { experts } from "@/data/experts";
import Link from "next/link";
import { useState } from "react";

export default function ExpertsPage() {
  const { lang, t } = useApp();
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:py-10">
      <h1 className="text-xl font-bold text-navy-900 sm:text-2xl dark:text-white">{t("expertsTitle")}</h1>
      <p className="mt-2 max-w-2xl text-sm leading-6 text-navy-600 dark:text-navy-200">
        {t("expertsIntro")}
      </p>
      <div className="mt-4">
        <DummyBanner />
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        {experts.map((ex) => (
          <article
            key={ex.id}
            className="rounded-2xl border border-navy-100 bg-white p-5 dark:border-navy-800 dark:bg-navy-900"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="font-bold text-navy-900 dark:text-white">{ex.name}</h2>
                <p className="text-sm text-navy-600 dark:text-navy-200">
                  {lang === "hi" ? ex.titleHi : ex.titleEn}
                </p>
              </div>
              <span className="rounded-full bg-saffron-50 px-2 py-0.5 text-xs font-bold text-saffron-700 dark:bg-saffron-500/15 dark:text-saffron-300">
                {ex.rating} ★
              </span>
            </div>
            <p className="mt-3 text-sm leading-6 text-navy-700 dark:text-navy-100">
              {lang === "hi" ? ex.bioHi : ex.bioEn}
            </p>
            <p className="mt-3 text-xs text-navy-500">
              {t("expertRate")} {ex.rate} · {ex.jobsFilled} {t("expertJobs")}
            </p>
            <div className="mt-2 flex flex-wrap gap-1">
              {ex.skills.map((s) => (
                <span
                  key={s}
                  className="rounded-full bg-navy-50 px-2 py-0.5 text-[11px] font-medium dark:bg-navy-800"
                >
                  {s}
                </span>
              ))}
            </div>
            <Link
              href={`/experts/hire?expert=${ex.id}`}
              className="mt-4 inline-flex min-h-11 rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white dark:bg-saffron-500 dark:text-navy-950"
            >
              {t("requestHelp")}
            </Link>
          </article>
        ))}
      </div>

      <h2 className="mt-12 text-lg font-bold text-navy-900 dark:text-white">{t("becomeExpert")}</h2>
      {sent ? (
        <p className="mt-4 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm dark:border-emerald-800 dark:bg-emerald-950">
          {t("submittedDemo")}
        </p>
      ) : (
        <form
          className="mt-4 grid gap-3 rounded-2xl border border-navy-100 bg-white p-4 sm:grid-cols-2 dark:border-navy-800 dark:bg-navy-900"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <label className="text-sm font-medium">
            {t("name")}
            <input required className="mt-1 w-full rounded-xl border border-navy-200 px-3 py-2 dark:border-navy-700 dark:bg-navy-950" />
          </label>
          <label className="text-sm font-medium">
            {t("email")}
            <input required type="email" className="mt-1 w-full rounded-xl border border-navy-200 px-3 py-2 dark:border-navy-700 dark:bg-navy-950" />
          </label>
          <label className="text-sm font-medium sm:col-span-2">
            {t("examOrPost")}
            <input required placeholder="SSC, Railway…" className="mt-1 w-full rounded-xl border border-navy-200 px-3 py-2 dark:border-navy-700 dark:bg-navy-950" />
          </label>
          <label className="text-sm font-medium sm:col-span-2">
            {t("message")}
            <textarea rows={3} className="mt-1 w-full rounded-xl border border-navy-200 px-3 py-2 dark:border-navy-700 dark:bg-navy-950" />
          </label>
          <button
            type="submit"
            className="rounded-2xl bg-navy-900 py-3 text-sm font-bold text-white sm:col-span-2 dark:bg-saffron-500 dark:text-navy-950"
          >
            {t("send")}
          </button>
        </form>
      )}
    </div>
  );
}
