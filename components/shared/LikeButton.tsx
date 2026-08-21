"use client";

import { HeartIcon } from "@/components/shared/Icons";
import { useApp } from "@/components/providers/AppProvider";
import { useLikes } from "@/lib/likes";

export function LikeButton({ id }: { id: string }) {
  const { t } = useApp();
  const { isLiked, countFor, toggle } = useLikes();
  const liked = isLiked(id);
  return (
    <button
      type="button"
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggle(id);
      }}
      aria-pressed={liked}
      aria-label={t("like")}
      className={`relative z-10 inline-flex items-center gap-1 rounded-full border px-2 py-1 text-[11px] font-semibold ${
        liked
          ? "border-rose-400 bg-rose-50 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300"
          : "border-navy-200 text-navy-600 dark:border-navy-600 dark:text-navy-200"
      }`}
    >
      <HeartIcon size={14} />
      {countFor(id)}
    </button>
  );
}
