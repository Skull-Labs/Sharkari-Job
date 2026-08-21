"use client";

import { PostCard } from "@/components/listing/PostCard";
import { useApp } from "@/components/providers/AppProvider";
import { ChevronIcon } from "@/components/shared/Icons";
import {
  eventsOnDay,
  formatMonthYear,
  toIsoDay,
  type CalendarEvent,
} from "@/lib/filters";
import { useMemo, useState } from "react";

const WEEK_EN = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const WEEK_HI = ["रवि", "सोम", "मंगल", "बुध", "गुरु", "शुक्र", "शनि"];

const KIND_DOT: Record<CalendarEvent["kind"], string> = {
  exam: "bg-saffron-500",
  last: "bg-rose-500",
  result: "bg-emerald-500",
  start: "bg-sky-500",
};

export function CalendarView({ events }: { events: CalendarEvent[] }) {
  const { lang, t } = useApp();
  const now = new Date();
  const [year, setYear] = useState(now.getFullYear());
  const [month, setMonth] = useState(now.getMonth());
  const todayIso = toIsoDay(now.getFullYear(), now.getMonth(), now.getDate());
  const [selected, setSelected] = useState(todayIso);

  const weeks = useMemo(() => {
    const first = new Date(year, month, 1);
    const startPad = first.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const cells: (number | null)[] = [
      ...Array.from({ length: startPad }, () => null),
      ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
    ];
    while (cells.length % 7 !== 0) cells.push(null);
    const rows: (number | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }, [year, month]);

  const eventIsos = useMemo(() => {
    const set = new Set<string>();
    for (const e of events) {
      if (e.iso.startsWith(`${year}-${String(month + 1).padStart(2, "0")}`)) {
        set.add(e.iso);
      }
    }
    return set;
  }, [events, year, month]);

  const dayEvents = eventsOnDay(events, selected);
  const week = lang === "hi" ? WEEK_HI : WEEK_EN;

  function shift(delta: number) {
    const d = new Date(year, month + delta, 1);
    setYear(d.getFullYear());
    setMonth(d.getMonth());
  }

  const monthCount = eventIsos.size;

  return (
    <div className="mx-auto max-w-6xl px-3 py-6 sm:px-4 sm:py-8">
      <h1 className="text-xl font-bold text-navy-900 sm:text-2xl dark:text-white">{t("calendar")}</h1>
      <p className="mt-1 text-sm text-navy-600 dark:text-navy-200">
        {t("calendarHint")} · {monthCount} {t("postsThisMonth")}
      </p>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="min-w-0 overflow-x-auto rounded-2xl border border-navy-100 bg-white p-3 sm:p-4 dark:border-navy-800 dark:bg-navy-900">
          <div className="mb-4 flex items-center justify-between gap-2">
            <button
              type="button"
              onClick={() => shift(-1)}
              aria-label={t("prevMonth")}
              className="rounded-full border border-navy-200 p-2.5 dark:border-navy-700"
            >
              <ChevronIcon size={16} className="rotate-180" />
            </button>
            <p className="min-w-0 truncate text-center text-sm font-semibold text-navy-900 sm:text-base dark:text-white">
              {formatMonthYear(year, month, lang)}
            </p>
            <button
              type="button"
              onClick={() => shift(1)}
              aria-label={t("nextMonth")}
              className="rounded-full border border-navy-200 p-2.5 dark:border-navy-700"
            >
              <ChevronIcon size={16} />
            </button>
          </div>
          <div className="grid grid-cols-7 gap-0.5 text-center text-[10px] font-medium text-navy-500 sm:gap-1 sm:text-xs">
            {week.map((d) => (
              <div key={d} className="py-1.5 sm:py-2">
                <span className="sm:hidden">{d.slice(0, 1)}</span>
                <span className="hidden sm:inline">{d}</span>
              </div>
            ))}
          </div>
          <div className="grid grid-cols-7 gap-0.5 sm:gap-1">
            {weeks.flat().map((day, i) => {
              if (!day) return <div key={`e-${i}`} className="aspect-square min-h-9" />;
              const iso = toIsoDay(year, month, day);
              const has = eventIsos.has(iso);
              const isToday = iso === todayIso;
              const isSel = iso === selected;
              return (
                <button
                  key={iso}
                  type="button"
                  onClick={() => setSelected(iso)}
                  className={`aspect-square min-h-9 rounded-lg text-xs font-medium sm:rounded-xl sm:text-sm ${
                    isSel
                      ? "bg-navy-900 text-white dark:bg-saffron-500 dark:text-navy-950"
                      : isToday
                        ? "bg-saffron-50 text-saffron-700 dark:bg-saffron-500/20 dark:text-saffron-300"
                        : "text-navy-800 hover:bg-navy-50 dark:text-navy-50 dark:hover:bg-navy-800"
                  }`}
                >
                  {day}
                  {has ? (
                    <span className="mx-auto mt-0.5 block h-1 w-1 rounded-full bg-current opacity-80" />
                  ) : (
                    <span className="mx-auto mt-0.5 block h-1 w-1" />
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-4 flex flex-wrap gap-3 text-[11px] text-navy-600 dark:text-navy-200">
            <span className="flex items-center gap-1">
              <span className={`h-2 w-2 rounded-full ${KIND_DOT.exam}`} /> {t("examDate")}
            </span>
            <span className="flex items-center gap-1">
              <span className={`h-2 w-2 rounded-full ${KIND_DOT.last}`} /> {t("lastDate")}
            </span>
            <span className="flex items-center gap-1">
              <span className={`h-2 w-2 rounded-full ${KIND_DOT.result}`} /> {t("resultDate")}
            </span>
            <span className="flex items-center gap-1">
              <span className={`h-2 w-2 rounded-full ${KIND_DOT.start}`} /> {t("startDate")}
            </span>
          </div>
        </div>

        <div>
          <h2 className="font-semibold text-navy-900 dark:text-white">
            {selected} · {dayEvents.length} {t("updates")}
          </h2>
          <div className="mt-3 grid gap-3">
            {dayEvents.length === 0 ? (
              <p className="rounded-2xl border border-dashed border-navy-200 p-6 text-sm text-navy-600 dark:border-navy-700 dark:text-navy-200">
                {t("noEvents")}
              </p>
            ) : (
              dayEvents.map((e) => (
                <div key={`${e.post.id}-${e.kind}`}>
                  <p className="mb-1 text-[11px] font-semibold uppercase tracking-wide text-navy-500">
                    {e.kind === "exam"
                      ? t("examDate")
                      : e.kind === "last"
                        ? t("lastDate")
                        : e.kind === "result"
                          ? t("resultDate")
                          : t("startDate")}
                  </p>
                  <PostCard post={e.post} compact />
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
