"use client";

import { UpcomingEvents } from "@/components/home/UpcomingEvents";
import { useApp } from "@/components/providers/AppProvider";
import { posts } from "@/data/posts";
import { getUpcomingEvents } from "@/lib/filters";
import Link from "next/link";

export default function EventsPage() {
  const { t } = useApp();
  const events = getUpcomingEvents(posts, new Date(), 40);
  return (
    <div className="mx-auto max-w-6xl py-6 sm:py-8">
      <div className="px-4">
        <h1 className="text-2xl font-bold text-navy-900 dark:text-white">{t("eventsPageTitle")}</h1>
        <p className="mt-1 text-sm text-navy-600 dark:text-navy-200">{t("eventsPageHint")}</p>
        <Link href="/calendar" className="mt-2 inline-block text-sm font-semibold text-saffron-600">
          {t("viewCalendar")}
        </Link>
      </div>
      <div className="mt-6">
        <UpcomingEvents events={events} showHeader={false} limit={40} />
      </div>
    </div>
  );
}
