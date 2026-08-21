"use client";

import { PostCard } from "@/components/listing/PostCard";
import { useApp } from "@/components/providers/AppProvider";
import { EXAM_BODY_HREF, FEATURED_BODIES } from "@/lib/constants";
import type { CalendarEvent } from "@/lib/filters";
import type { Post } from "@/lib/types";
import Link from "next/link";
import { CategoryGrid } from "./CategoryGrid";
import { HeroSearch } from "./HeroSearch";
import { PostColumn } from "./PostColumn";
import { UpcomingEvents } from "./UpcomingEvents";
import { UrgentTicker } from "./UrgentTicker";

export function HomeView({
  jobs,
  results,
  closingSoon,
  urgent,
  upcoming,
}: {
  jobs: Post[];
  results: Post[];
  closingSoon: Post[];
  urgent: Post[];
  upcoming: CalendarEvent[];
}) {
  const { t } = useApp();
  return (
    <>
      <HeroSearch />
      <UrgentTicker posts={urgent} />
      <div className="mx-auto max-w-6xl space-y-10 px-0 py-8 sm:space-y-12 sm:py-10">
        <CategoryGrid />

        <div className="grid min-w-0 gap-4 px-4 lg:grid-cols-2">
          <PostColumn titleKey="latestJobs" href="/jobs" posts={jobs} />
          <PostColumn titleKey="latestResults" href="/results" posts={results} />
        </div>

        {closingSoon.length > 0 ? (
          <section className="px-4">
            <div className="flex items-end justify-between gap-3">
              <h2 className="text-lg font-bold text-navy-900 dark:text-white">{t("closingSoon")}</h2>
              <Link href="/jobs" className="text-sm font-semibold text-saffron-600">
                {t("viewAll")}
              </Link>
            </div>
            <div className="scrollbar-thin mt-4 flex snap-x snap-mandatory gap-3 overflow-x-auto pb-2">
              {closingSoon.map((post) => (
                <div key={post.id} className="w-[min(85vw,20rem)] shrink-0 snap-start">
                  <PostCard post={post} compact />
                </div>
              ))}
            </div>
          </section>
        ) : null}

        <UpcomingEvents events={upcoming} />

        <section className="px-4">
          <h2 className="text-lg font-bold text-navy-900 dark:text-white">{t("popularBodies")}</h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {FEATURED_BODIES.map((b) => (
              <Link
                key={b}
                href={EXAM_BODY_HREF[b]}
                className="rounded-full border border-navy-200 bg-white px-4 py-2 text-sm font-semibold text-navy-800 hover:border-saffron-400 dark:border-navy-700 dark:bg-navy-900 dark:text-navy-50"
              >
                {b}
              </Link>
            ))}
          </div>
        </section>

        <section className="px-4">
          <h2 className="text-lg font-bold text-navy-900 dark:text-white">{t("howItWorks")}</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {[
              { n: "1", title: t("step1Title"), body: t("step1Body") },
              { n: "2", title: t("step2Title"), body: t("step2Body") },
              { n: "3", title: t("step3Title"), body: t("step3Body") },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-2xl border border-navy-100 bg-white p-5 dark:border-navy-800 dark:bg-navy-900"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-saffron-500 text-sm font-bold text-white">
                  {s.n}
                </span>
                <h3 className="mt-3 font-semibold text-navy-900 dark:text-white">{s.title}</h3>
                <p className="mt-1 text-sm leading-6 text-navy-600 dark:text-navy-200">{s.body}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
}
