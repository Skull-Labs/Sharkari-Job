"use client";

import { DummyBanner } from "@/components/shared/DummyBanner";
import { useApp } from "@/components/providers/AppProvider";
import { useSession } from "@/lib/session";
import type { NotificationPrefs } from "@/lib/types";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const { t, savedIds } = useApp();
  const { user, notify, signOut, saveNotify } = useSession();
  const router = useRouter();
  const [local, setLocal] = useState<NotificationPrefs | null>(null);
  const [saved, setSaved] = useState(false);
  const prefs = local ?? notify;

  useEffect(() => {
    if (!user) router.replace("/login?next=/profile");
  }, [user, router]);

  if (!user) return null;

  function updateTopic(key: keyof NotificationPrefs["topics"], value: boolean) {
    setLocal({ ...prefs, topics: { ...prefs.topics, [key]: value } });
  }

  return (
    <div className="mx-auto max-w-lg px-4 py-10">
      <h1 className="text-2xl font-bold text-navy-900 dark:text-white">{t("profile")}</h1>
      <div className="mt-3">
        <DummyBanner />
      </div>
      <div className="mt-6 flex min-w-0 items-center gap-4 rounded-2xl border border-navy-100 bg-white p-4 dark:border-navy-800 dark:bg-navy-900">
        <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-navy-900 text-xl font-bold text-white dark:bg-saffron-500 dark:text-navy-950">
          {user.name.slice(0, 1)}
        </span>
        <div className="min-w-0">
          <p className="font-semibold text-navy-900 dark:text-white">{user.name}</p>
          <p className="break-all text-sm text-navy-600 dark:text-navy-200">{user.email}</p>
          <p className="mt-1 text-xs text-navy-500">
            {t("signedInAs")} {user.provider} · {t("dummyAccount")}
          </p>
        </div>
      </div>
      <p className="mt-4 text-sm text-navy-600">
        {t("saved")}: {savedIds.length} ·{" "}
        <Link href="/saved" className="font-semibold text-saffron-600">
          {t("viewAll")}
        </Link>
      </p>

      <h2 className="mt-10 text-lg font-bold text-navy-900 dark:text-white">{t("notifyTitle")}</h2>
      <p className="mt-1 text-sm text-navy-600 dark:text-navy-200">{t("notifyIntro")}</p>
      <form
        className="mt-4 space-y-4 rounded-2xl border border-navy-100 bg-white p-4 dark:border-navy-800 dark:bg-navy-900"
        onSubmit={(e) => {
          e.preventDefault();
          saveNotify(prefs);
          setSaved(true);
          setTimeout(() => setSaved(false), 2000);
        }}
      >
        <label className="flex items-center justify-between gap-3 text-sm font-medium">
          {t("notifyEmail")}
          <input
            type="checkbox"
            checked={prefs.emailEnabled}
            onChange={(e) => setLocal({ ...prefs, emailEnabled: e.target.checked })}
          />
        </label>
        <label className="flex items-center justify-between gap-3 text-sm font-medium">
          {t("notifyWhatsapp")}
          <input
            type="checkbox"
            checked={prefs.whatsappEnabled}
            onChange={(e) => setLocal({ ...prefs, whatsappEnabled: e.target.checked })}
          />
        </label>
        {prefs.whatsappEnabled ? (
          <label className="block text-sm font-medium">
            {t("phone")}
            <input
              value={prefs.phone}
              onChange={(e) => setLocal({ ...prefs, phone: e.target.value })}
              className="mt-1 w-full rounded-xl border border-navy-200 px-3 py-2 dark:border-navy-700 dark:bg-navy-950"
              placeholder="+91 …"
            />
          </label>
        ) : null}
        <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">{t("category")}</p>
        {(
          [
            ["jobs", "notifyJobs"],
            ["results", "notifyResults"],
            ["admitCard", "notifyAdmit"],
            ["exams", "notifyExams"],
            ["closingSoon", "notifyClosing"],
          ] as const
        ).map(([key, label]) => (
          <label key={key} className="flex items-center justify-between gap-3 text-sm">
            {t(label)}
            <input
              type="checkbox"
              checked={prefs.topics[key]}
              onChange={(e) => updateTopic(key, e.target.checked)}
            />
          </label>
        ))}
        <button
          type="submit"
          className="w-full rounded-2xl bg-navy-900 py-3 text-sm font-bold text-white dark:bg-saffron-500 dark:text-navy-950"
        >
          {t("savePrefs")}
        </button>
        {saved ? <p className="text-center text-sm text-emerald-700">{t("prefsSaved")}</p> : null}
      </form>
      <button
        type="button"
        onClick={() => {
          signOut();
          router.push("/");
        }}
        className="mt-6 w-full rounded-2xl border border-navy-200 py-2.5 text-sm font-semibold dark:border-navy-700"
      >
        {t("logout")}
      </button>
    </div>
  );
}
