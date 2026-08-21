"use client";

import { useApp } from "@/components/providers/AppProvider";

export function EmptyState({
  title,
  hint,
  action,
}: {
  title?: string;
  hint?: string;
  action?: React.ReactNode;
}) {
  const { t } = useApp();
  return (
    <div className="rounded-2xl border border-dashed border-navy-200 bg-white px-6 py-14 text-center dark:border-navy-700 dark:bg-navy-900">
      <p className="text-lg font-semibold text-navy-900 dark:text-white">
        {title ?? t("emptyTitle")}
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm text-navy-600 dark:text-navy-200">
        {hint ?? t("emptyHint")}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-2xl border border-navy-100 bg-white p-4 dark:border-navy-800 dark:bg-navy-900">
      <div className="h-4 w-20 rounded bg-navy-100 dark:bg-navy-800" />
      <div className="mt-3 h-5 w-4/5 rounded bg-navy-100 dark:bg-navy-800" />
      <div className="mt-2 h-4 w-2/5 rounded bg-navy-100 dark:bg-navy-800" />
    </div>
  );
}
