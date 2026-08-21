"use client";

import { DummyBanner } from "@/components/shared/DummyBanner";
import { useApp } from "@/components/providers/AppProvider";
import { experts } from "@/data/experts";
import { posts } from "@/data/posts";
import { useSession } from "@/lib/session";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useMemo, useState } from "react";

function HireForm() {
  const { lang, t } = useApp();
  const { user } = useSession();
  const sp = useSearchParams();
  const expertId = sp.get("expert");
  const slug = sp.get("post");
  const expert = experts.find((e) => e.id === expertId) ?? experts[0];
  const post = posts.find((p) => p.slug === slug);
  const defaultExam = post ? (lang === "hi" ? post.titleHi : post.titleEn) : "";
  const [sent, setSent] = useState(false);

  const examDefault = useMemo(() => defaultExam, [defaultExam]);

  if (sent) {
    return (
      <div className="mx-auto max-w-lg px-4 py-12">
        <p className="rounded-2xl border border-emerald-200 bg-emerald-50 p-5 text-sm dark:border-emerald-800 dark:bg-emerald-950">
          {t("submittedDemo")}
        </p>
        <Link href="/experts" className="mt-6 inline-block text-sm font-semibold text-saffron-600">
          {t("expertsTitle")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-bold text-navy-900 dark:text-white">{t("hireFormTitle")}</h1>
      <p className="mt-2 text-sm text-navy-600 dark:text-navy-200">{t("hireExpertHint")}</p>
      <div className="mt-4">
        <DummyBanner />
      </div>
      {expert ? (
        <p className="mt-4 text-sm font-medium text-navy-800 dark:text-navy-100">
          {expert.name} · {lang === "hi" ? expert.titleHi : expert.titleEn} · {expert.rate}
        </p>
      ) : null}
      <form
        className="mt-6 space-y-3 rounded-2xl border border-navy-100 bg-white p-4 dark:border-navy-800 dark:bg-navy-900"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <label className="block text-sm font-medium">
          {t("name")}
          <input
            required
            defaultValue={user?.name ?? ""}
            className="mt-1 w-full rounded-xl border border-navy-200 px-3 py-2 dark:border-navy-700 dark:bg-navy-950"
          />
        </label>
        <label className="block text-sm font-medium">
          {t("email")}
          <input
            required
            type="email"
            defaultValue={user?.email ?? ""}
            className="mt-1 w-full rounded-xl border border-navy-200 px-3 py-2 dark:border-navy-700 dark:bg-navy-950"
          />
        </label>
        <label className="block text-sm font-medium">
          {t("phone")}
          <input
            required
            className="mt-1 w-full rounded-xl border border-navy-200 px-3 py-2 dark:border-navy-700 dark:bg-navy-950"
          />
        </label>
        <label className="block text-sm font-medium">
          {t("examOrPost")}
          <input
            required
            defaultValue={examDefault}
            className="mt-1 w-full rounded-xl border border-navy-200 px-3 py-2 dark:border-navy-700 dark:bg-navy-950"
          />
        </label>
        <label className="block text-sm font-medium">
          {t("message")}
          <textarea
            rows={4}
            className="mt-1 w-full rounded-xl border border-navy-200 px-3 py-2 dark:border-navy-700 dark:bg-navy-950"
          />
        </label>
        <button
          type="submit"
          className="w-full rounded-2xl bg-saffron-500 py-3 text-sm font-bold text-white"
        >
          {t("requestHelp")}
        </button>
        {!user ? (
          <p className="text-center text-xs text-navy-500">
            <Link href="/login?next=/experts/hire" className="font-semibold text-saffron-600">
              {t("login")}
            </Link>
          </p>
        ) : null}
      </form>
    </div>
  );
}

export default function HirePage() {
  return (
    <Suspense fallback={<div className="px-4 py-16 text-sm">…</div>}>
      <HireForm />
    </Suspense>
  );
}
