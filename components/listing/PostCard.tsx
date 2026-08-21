"use client";

import { LikeButton } from "@/components/shared/LikeButton";
import { SaveButton } from "@/components/shared/SaveButton";
import { useApp } from "@/components/providers/AppProvider";
import { CATEGORY_META, QUALIFICATION_LABEL } from "@/lib/constants";
import { daysUntil, formatDate, getLiveStatus, isJustPublished } from "@/lib/filters";
import type { Post } from "@/lib/types";
import Link from "next/link";

function StatusChip({ post }: { post: Post }) {
  const { t } = useApp();
  const status = getLiveStatus(post);
  const left = daysUntil(post.dates.last);
  if (status === "closing-soon" && left !== null && left >= 0) {
    return (
      <span className="rounded-full bg-saffron-500 px-2 py-0.5 text-[11px] font-semibold text-white">
        {t("closingSoon")}
        {left > 0 ? ` · ${left} ${left === 1 ? t("dayLeft") : t("daysLeft")}` : ""}
      </span>
    );
  }
  if (status === "result-out") {
    return (
      <span className="rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-semibold text-white">
        {t("resultOut")}
      </span>
    );
  }
  if (status === "closed") {
    return (
      <span className="rounded-full bg-navy-200 px-2 py-0.5 text-[11px] font-semibold text-navy-800 dark:bg-navy-700 dark:text-navy-50">
        {t("closed")}
      </span>
    );
  }
  if (isJustPublished(post)) {
    return (
      <span className="rounded-full bg-navy-800 px-2 py-0.5 text-[11px] font-semibold text-white">
        {t("justPublished")}
      </span>
    );
  }
  return null;
}

export function PostCard({ post, compact = false }: { post: Post; compact?: boolean }) {
  const { lang, t } = useApp();
  const title = lang === "hi" ? post.titleHi : post.titleEn;
  const href = `/${post.category}/${post.slug}`;
  const meta = CATEGORY_META[post.category];

  return (
    <article className="group relative min-w-0 overflow-hidden rounded-2xl border border-navy-100 bg-white p-3.5 shadow-sm transition hover:border-saffron-300 hover:shadow-md sm:p-4 dark:border-navy-800 dark:bg-navy-900 dark:hover:border-saffron-500/50">
      <div className="flex items-start justify-between gap-2 sm:gap-3">
        <div className="flex min-w-0 flex-wrap items-center gap-2">
          <span className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${meta.accent}`}>
            {t(meta.labelKey)}
          </span>
          <StatusChip post={post} />
        </div>
        <div className="relative z-10 flex shrink-0 items-center gap-1">
          <LikeButton id={post.id} />
          <SaveButton id={post.id} compact />
        </div>
      </div>
      <h3 className={`mt-3 min-w-0 break-words font-semibold leading-snug text-navy-900 dark:text-white ${compact ? "text-sm" : "text-base"}`}>
        <Link href={href} className="after:absolute after:inset-0 after:z-0">
          {title}
        </Link>
      </h3>
      <p className="mt-2 text-xs text-navy-600 dark:text-navy-200">
        {post.examBody} · {post.state === "All India" ? t("allIndia") : post.state} ·{" "}
        {t(QUALIFICATION_LABEL[post.qualification])}
      </p>
      {!compact ? (
        <dl className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-xs text-navy-700 dark:text-navy-100">
          {post.vacancies ? (
            <div>
              <dt className="inline text-navy-500 dark:text-navy-300">{t("vacancies")}: </dt>
              <dd className="inline font-medium">{post.vacancies.toLocaleString("en-IN")}</dd>
            </div>
          ) : null}
          {post.dates.last ? (
            <div>
              <dt className="inline text-navy-500 dark:text-navy-300">{t("lastDate")}: </dt>
              <dd className="inline font-medium">{formatDate(post.dates.last, lang)}</dd>
            </div>
          ) : null}
          {post.dates.exam ? (
            <div>
              <dt className="inline text-navy-500 dark:text-navy-300">{t("examDate")}: </dt>
              <dd className="inline font-medium">{formatDate(post.dates.exam, lang)}</dd>
            </div>
          ) : null}
          {post.dates.result ? (
            <div>
              <dt className="inline text-navy-500 dark:text-navy-300">{t("resultDate")}: </dt>
              <dd className="inline font-medium">{formatDate(post.dates.result, lang)}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
    </article>
  );
}
