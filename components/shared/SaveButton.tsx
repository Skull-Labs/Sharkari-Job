"use client";

import { useApp } from "@/components/providers/AppProvider";
import { BookmarkFilledIcon, BookmarkIcon } from "@/components/shared/Icons";

export function SaveButton({
  id,
  compact = false,
}: {
  id: string;
  compact?: boolean;
}) {
  const { isSaved, toggleSaved, t } = useApp();
  const saved = isSaved(id);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleSaved(id);
      }}
      aria-pressed={saved}
      aria-label={saved ? t("unsave") : t("save")}
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 text-sm font-medium transition ${
        saved
          ? "border-saffron-400 bg-saffron-50 text-saffron-700 dark:bg-saffron-500/15 dark:text-saffron-400"
          : "border-navy-200 text-navy-700 hover:border-saffron-400 dark:border-navy-600 dark:text-navy-100"
      }`}
    >
      {saved ? <BookmarkFilledIcon size={16} /> : <BookmarkIcon size={16} />}
      {compact ? null : saved ? t("unsave") : t("save")}
    </button>
  );
}
