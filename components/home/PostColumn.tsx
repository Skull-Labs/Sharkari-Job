"use client";

import { useApp } from "@/components/providers/AppProvider";
import { daysUntil, formatDate } from "@/lib/filters";
import type { MessageKey } from "@/data/i18n";
import type { Post } from "@/lib/types";
import Link from "next/link";

export function PostColumn({
  titleKey,
  href,
  posts,
}: {
  titleKey: MessageKey;
  href: string;
  posts: Post[];
}) {
  const { lang, t } = useApp();
  return (
    <section className="rounded-2xl border border-navy-100 bg-white p-4 sm:p-5 dark:border-navy-800 dark:bg-navy-900">
      <div className="flex min-w-0 items-center justify-between gap-3">
        <h2 className="min-w-0 text-base font-bold text-navy-900 sm:text-lg dark:text-white">{t(titleKey)}</h2>
        <Link href={href} className="text-sm font-semibold text-saffron-600 hover:underline">
          {t("viewAll")}
        </Link>
      </div>
      <ul className="mt-4 divide-y divide-navy-100 dark:divide-navy-800">
        {posts.map((post) => {
          const title = lang === "hi" ? post.titleHi : post.titleEn;
          const left = daysUntil(post.dates.last);
          return (
            <li key={post.id} className="py-3 first:pt-0 last:pb-0">
              <Link href={`/${post.category}/${post.slug}`} className="block hover:text-saffron-600">
                <p className="break-words text-sm font-medium leading-snug text-navy-900 dark:text-white">
                  {title}
                </p>
                <p className="mt-1 text-xs text-navy-500 dark:text-navy-300">
                  {post.dates.last
                    ? `${t("lastDate")} ${formatDate(post.dates.last, lang)}`
                    : post.dates.result
                      ? `${t("resultDate")} ${formatDate(post.dates.result, lang)}`
                      : post.examBody}
                  {left !== null && left >= 0 && left <= 7
                    ? ` · ${left} ${left === 1 ? t("dayLeft") : t("daysLeft")}`
                    : ""}
                </p>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
