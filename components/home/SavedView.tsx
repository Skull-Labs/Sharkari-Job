"use client";

import { PostList } from "@/components/listing/PostList";
import { useApp } from "@/components/providers/AppProvider";
import { EmptyState } from "@/components/shared/EmptyState";
import { posts } from "@/data/posts";
import Link from "next/link";

export function SavedView() {
  const { savedIds, t, hydrated } = useApp();
  const saved = posts.filter((p) => savedIds.includes(p.id));

  if (!hydrated) {
    return <div className="mx-auto max-w-6xl px-4 py-16 text-sm text-navy-500">…</div>;
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-2xl font-bold text-navy-900 dark:text-white">{t("saved")}</h1>
      <p className="mt-1 text-sm text-navy-600 dark:text-navy-200">
        {t("showing")} {saved.length} {t("updates")}
      </p>
      <div className="mt-6">
        {saved.length === 0 ? (
          <EmptyState
            title={t("noSaved")}
            hint={t("noSavedHint")}
            action={
              <Link
                href="/jobs"
                className="inline-flex rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white dark:bg-saffron-500 dark:text-navy-950"
              >
                {t("browseJobs")}
              </Link>
            }
          />
        ) : (
          <PostList posts={saved} />
        )}
      </div>
    </div>
  );
}
