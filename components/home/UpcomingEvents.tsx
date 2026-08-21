"use client";

import { useApp } from "@/components/providers/AppProvider";
import { formatDate, type CalendarEvent } from "@/lib/filters";
import Link from "next/link";

const KIND_KEY = {
  exam: "eventExam",
  last: "eventLast",
  result: "eventResult",
  start: "eventStart",
} as const;

export function UpcomingEvents({
  events,
  showHeader = true,
  limit = 6,
}: {
  events: CalendarEvent[];
  showHeader?: boolean;
  limit?: number;
}) {
  const { lang, t } = useApp();
  if (events.length === 0) return null;
  const list = events.slice(0, limit);
  return (
    <section className="px-4">
      {showHeader ? (
        <div className="flex items-end justify-between gap-3">
          <h2 className="text-lg font-bold text-navy-900 dark:text-white">{t("upcomingEvents")}</h2>
          <Link href="/events" className="text-sm font-semibold text-saffron-600">
            {t("viewAll")}
          </Link>
        </div>
      ) : null}
      <ul className={`${showHeader ? "mt-4" : ""} grid gap-2 sm:grid-cols-2`}>
        {list.map((e) => {
          const title = lang === "hi" ? e.post.titleHi : e.post.titleEn;
          return (
            <li key={`${e.post.id}-${e.kind}-${e.iso}`}>
              <Link
                href={`/${e.post.category}/${e.post.slug}`}
                className="flex items-start gap-3 rounded-2xl border border-navy-100 bg-white p-3 hover:border-saffron-300 dark:border-navy-800 dark:bg-navy-900"
              >
                <span className="w-16 shrink-0 text-center">
                  <span className="block text-lg font-bold text-navy-900 dark:text-white">
                    {e.iso.slice(8)}
                  </span>
                  <span className="text-[10px] font-semibold uppercase text-saffron-600">
                    {formatDate(e.iso, lang).split(" ")[1]}
                  </span>
                </span>
                <span className="min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wide text-navy-500">
                    {t(KIND_KEY[e.kind])}
                  </span>
                  <span className="mt-0.5 block min-w-0 break-words text-sm font-medium leading-snug text-navy-900 dark:text-white">
                    {title}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
