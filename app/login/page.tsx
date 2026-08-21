"use client";

import { DummyBanner } from "@/components/shared/DummyBanner";
import { useApp } from "@/components/providers/AppProvider";
import { useSession } from "@/lib/session";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";

function LoginForm() {
  const { t } = useApp();
  const { user, signIn } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/profile";
  const [email, setEmail] = useState("");

  function go(provider: "google" | "email") {
    signIn(provider, email || undefined);
    router.push(next.startsWith("/") ? next : "/profile");
  }

  if (user) {
    return (
      <div className="mx-auto max-w-md px-4 py-12 text-sm text-navy-600">
        <Link href="/profile" className="font-semibold text-saffron-600">
          {t("profile")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-md px-4 py-12">
      <h1 className="text-2xl font-bold text-navy-900 dark:text-white">{t("loginTitle")}</h1>
      <p className="mt-2 text-sm text-navy-600 dark:text-navy-200">{t("loginSubtitle")}</p>
      <div className="mt-4">
        <DummyBanner />
      </div>
      <div className="mt-8 space-y-3">
        <button
          type="button"
          onClick={() => go("google")}
          className="flex w-full items-center justify-center rounded-2xl border border-navy-200 bg-white py-3 text-sm font-bold text-navy-900 hover:border-saffron-400 dark:border-navy-700 dark:bg-navy-900 dark:text-white"
        >
          {t("continueGoogle")}
        </button>
        <form
          className="space-y-3 rounded-2xl border border-navy-100 bg-white p-4 dark:border-navy-800 dark:bg-navy-900"
          onSubmit={(e) => {
            e.preventDefault();
            if (email.trim()) go("email");
          }}
        >
          <label className="block text-sm font-medium">
            {t("email")}
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 w-full rounded-xl border border-navy-200 px-3 py-2 dark:border-navy-700 dark:bg-navy-950"
              placeholder="you@email.com"
            />
          </label>
          <p className="text-xs text-navy-500">{t("emailMagic")}</p>
          <button
            type="submit"
            className="w-full rounded-2xl bg-navy-900 py-3 text-sm font-bold text-white dark:bg-saffron-500 dark:text-navy-950"
          >
            {t("continueEmail")}
          </button>
        </form>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="mx-auto max-w-md px-4 py-16 text-sm">…</div>}>
      <LoginForm />
    </Suspense>
  );
}
