"use client";

import { useApp } from "@/components/providers/AppProvider";
import { daysUntil, getLiveStatus } from "@/lib/filters";
import type { Post } from "@/lib/types";
import Link from "next/link";

export function UrgentTicker({ posts }: { posts: Post[] }) {
  const { lang, t } = useApp();
  if (posts.length === 0) return null;
  const items = [...posts, ...posts];
  return (
    <div className="border-y border-saffron-100 bg-saffron-50 dark:border-saffron-500/20 dark:bg-saffron-500/10">
      <div className="mx-auto flex max-w-6xl min-w-0 items-center gap-2 px-3 py-2 sm:gap-4 sm:px-4 sm:py-2.5">
        <span className="shrink-0 rounded-full bg-saffron-500 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white sm:px-2.5 sm:text-[11px]">
          {t("urgentUpdates")}
        </span>
        <div className="min-w-0 flex-1 overflow-hidden">
          <div className="animate-marquee flex w-max gap-8">
            {items.map((post, i) => {
              const title = lang === "hi" ? post.titleHi : post.titleEn;
              const left = daysUntil(post.dates.last);
              const closing = getLiveStatus(post) === "closing-soon";
              return (
                <Link
                  key={`${post.id}-${i}`}
                  href={`/${post.category}/${post.slug}`}
                  className="shrink-0 text-sm font-medium text-navy-800 hover:text-saffron-700 dark:text-navy-50"
                >
                  {title}
                  {closing && left !== null && left >= 0
                    ? ` · ${left} ${left === 1 ? t("dayLeft") : t("daysLeft")}`
                    : ""}
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
