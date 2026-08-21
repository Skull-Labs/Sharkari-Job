import { CalendarView } from "@/components/home/CalendarView";
import { posts } from "@/data/posts";
import { getCalendarEvents } from "@/lib/filters";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Exam Calendar" };

export default function CalendarPage() {
  return <CalendarView events={getCalendarEvents(posts)} />;
}
