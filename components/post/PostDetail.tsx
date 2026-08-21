"use client";

import { PostCard } from "@/components/listing/PostCard";
import { ShortDetails } from "@/components/post/DateTable";
import { EligibilityBlock, HowToSteps, SelectionMode } from "@/components/post/EligibilityBlock";
import { FaqList, ImportantLinks } from "@/components/post/ImportantLinks";
import { useApp } from "@/components/providers/AppProvider";
import { SaveButton } from "@/components/shared/SaveButton";
import { ShareButtons } from "@/components/shared/ShareButtons";
import { ExternalIcon } from "@/components/shared/Icons";
import { CATEGORY_META } from "@/lib/constants";
import { getDetailModel } from "@/lib/detail";
import { daysUntil, formatDate, getLiveStatus } from "@/lib/filters";
import type { Post } from "@/lib/types";
import Link from "next/link";

export function PostDetail({ post, related }: { post: Post; related: Post[] }) {
  const { lang, t } = useApp();
  const title = lang === "hi" ? post.titleHi : post.titleEn;
  const meta = CATEGORY_META[post.category];
  const status = getLiveStatus(post);
  const left = daysUntil(post.dates.last);
  const path = `/${post.category}/${post.slug}`;
  const d = getDetailModel(post, lang);

  return (
    <article className="mx-auto max-w-3xl overflow-x-clip px-3 py-6 sm:px-4 sm:py-8">
      <nav className="text-sm text-navy-600 dark:text-navy-200">
        <Link href="/" className="hover:text-saffron-600">
          {t("home")}
        </Link>
        <span className="mx-2">/</span>
        <Link href={meta.href} className="hover:text-saffron-600">
          {t(meta.labelKey)}
        </Link>
      </nav>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.accent}`}>
          {t(meta.labelKey)}
        </span>
        {status === "closing-soon" ? (
          <span className="rounded-full bg-saffron-500 px-2.5 py-0.5 text-xs font-semibold text-white">
            {t("closingSoon")}
            {left !== null && left >= 0
              ? ` · ${left} ${left === 1 ? t("dayLeft") : t("daysLeft")}`
              : ""}
          </span>
        ) : null}
        {status === "result-out" ? (
          <span className="rounded-full bg-emerald-600 px-2.5 py-0.5 text-xs font-semibold text-white">
            {t("resultOut")}
          </span>
        ) : null}
        {status === "closed" ? (
          <span className="rounded-full bg-navy-200 px-2.5 py-0.5 text-xs font-semibold text-navy-800">
            {t("closed")}
          </span>
        ) : null}
      </div>

      <h1 className="mt-3 text-xl font-bold leading-snug tracking-tight text-navy-900 break-words dark:text-white sm:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-sm text-navy-600 dark:text-navy-200">
        {t("postDate")}: {formatDate(post.publishedAt, lang)} ·{" "}
        {post.state === "All India" ? t("allIndia") : post.state} · {d.organization}
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <SaveButton id={post.id} />
        <ShareButtons title={title} path={path} />
      </div>

      <p className="mt-6 text-sm leading-7 text-navy-800 dark:text-navy-100">{d.summary}</p>

      <div className="mt-8">
        <ShortDetails
          title={`${d.organization} : ${t("shortDetails")}`}
          model={d}
          labels={{
            dates: t("importantDates"),
            fee: t("applicationFee"),
            feeNote: t("feeNoteGst"),
            payment: t("paymentMode"),
            ageTitle: t("ageLimit"),
            ageMin: t("ageMin"),
            ageMax: t("ageMax"),
            total: t("totalPost"),
          }}
        />
      </div>

      <div className="mt-5 space-y-5">
        <EligibilityBlock
          examLabel={t("examName")}
          educationLabel={t("educationQualification")}
          model={d}
        />
        <HowToSteps title={t("howToHeading")} steps={d.steps} />
        <SelectionMode title={t("modeOfSelection")} value={d.selectionMode} />
        <ImportantLinks title={t("importantLinks")} clickLabel={t("clickHere")} links={d.links} />
        <FaqList title={t("faq")} faqs={d.faqs} />
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <a
          href={post.officialUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-12 flex-1 items-center justify-center gap-2 rounded-2xl bg-saffron-500 px-5 py-3.5 text-center text-sm font-bold text-white shadow-sm hover:bg-saffron-600 sm:flex-none"
        >
          {t(meta.ctaKey)}
          <ExternalIcon size={16} />
        </a>
        <Link
          href={`/experts/hire?post=${encodeURIComponent(post.slug)}&category=${post.category}`}
          className="inline-flex min-h-12 flex-1 items-center justify-center rounded-2xl border-2 border-navy-800 px-5 py-3.5 text-center text-sm font-bold text-navy-900 hover:bg-navy-50 dark:border-saffron-400 dark:text-white dark:hover:bg-navy-800 sm:flex-none"
        >
          {t("hireExpert")}
        </Link>
      </div>
      <p className="mt-3 text-xs leading-5 text-navy-500 dark:text-navy-300">{t("hireExpertHint")}</p>
      <p className="mt-3 text-xs leading-5 text-navy-500 dark:text-navy-300">{t("verifyOfficial")}</p>
      <p className="mt-2 rounded-xl bg-navy-50 p-3 text-xs leading-5 text-navy-700 dark:bg-navy-800 dark:text-navy-100">
        {t("weDontConduct")}
      </p>

      {related.length > 0 ? (
        <section className="mt-12">
          <h2 className="text-lg font-semibold text-navy-900 dark:text-white">{t("related")}</h2>
          <div className="mt-4 grid gap-3">
            {related.map((p) => (
              <PostCard key={p.id} post={p} compact />
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}
