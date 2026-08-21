import { dummyLikeCount } from "@/lib/likes-count";
import { CATEGORIES } from "@/lib/types";
import type {
  Category,
  ExamBody,
  FilterQuery,
  IndianState,
  Post,
  PostStatus,
  Qualification,
  SortOption,
} from "@/lib/types";
import { INDIAN_STATES, QUALIFICATIONS, EXAM_BODIES, SORT_OPTIONS } from "@/lib/types";

const DAY_MS = 86_400_000;

export function parseDate(iso?: string): Date | null {
  if (!iso) return null;
  const d = new Date(`${iso}T12:00:00`);
  return Number.isNaN(d.getTime()) ? null : d;
}

export function daysUntil(iso: string | undefined, now = new Date()): number | null {
  const d = parseDate(iso);
  if (!d) return null;
  const end = new Date(d);
  end.setHours(23, 59, 59, 999);
  return Math.ceil((end.getTime() - now.getTime()) / DAY_MS);
}

export function getLiveStatus(post: Post, now = new Date()): PostStatus {
  if (post.category === "results" || post.status === "result-out") {
    return "result-out";
  }
  const left = daysUntil(post.dates.last, now);
  if (left === null) return post.status;
  if (left < 0) return "closed";
  if (left <= 7) return "closing-soon";
  return "open";
}

export function isJustPublished(post: Post, now = new Date()): boolean {
  const published = parseDate(post.publishedAt);
  if (!published) return false;
  return now.getTime() - published.getTime() <= 3 * DAY_MS;
}

const MONTHS_EN = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const MONTHS_HI = [
  "जन",
  "फर",
  "मार्च",
  "अप्रै",
  "मई",
  "जून",
  "जुल",
  "अग",
  "सित",
  "अक्टू",
  "नव",
  "दिस",
];

export const MONTHS_FULL_EN = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export const MONTHS_FULL_HI = [
  "जनवरी",
  "फरवरी",
  "मार्च",
  "अप्रैल",
  "मई",
  "जून",
  "जुलाई",
  "अगस्त",
  "सितंबर",
  "अक्टूबर",
  "नवंबर",
  "दिसंबर",
];

export function formatDate(iso: string | undefined, lang: "en" | "hi"): string {
  const d = parseDate(iso);
  if (!d) return "—";
  const months = lang === "hi" ? MONTHS_HI : MONTHS_EN;
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatMonthYear(year: number, month: number, lang: "en" | "hi"): string {
  const months = lang === "hi" ? MONTHS_FULL_HI : MONTHS_FULL_EN;
  return `${months[month]} ${year}`;
}

export function isCategory(v: string | undefined): v is Category {
  return !!v && (CATEGORIES as readonly string[]).includes(v);
}

export function isState(v: string | undefined): v is IndianState {
  return !!v && (INDIAN_STATES as readonly string[]).includes(v);
}

export function isQualification(v: string | undefined): v is Qualification {
  return !!v && (QUALIFICATIONS as readonly string[]).includes(v);
}

export function isExamBody(v: string | undefined): v is ExamBody {
  return !!v && (EXAM_BODIES as readonly string[]).includes(v);
}

export function isSortOption(v: string | undefined): v is SortOption {
  return !!v && (SORT_OPTIONS as readonly string[]).includes(v);
}

export function firstParam(
  v: string | string[] | undefined,
): string | undefined {
  if (Array.isArray(v)) return v[0];
  return v || undefined;
}

export function queryFromSearchParams(
  sp: Record<string, string | string[] | undefined>,
): FilterQuery {
  const q = firstParam(sp.q)?.trim();
  const category = firstParam(sp.category);
  const state = firstParam(sp.state);
  const qualification = firstParam(sp.qualification);
  const examBody = firstParam(sp.examBody);
  const sort = firstParam(sp.sort);
  const pageRaw = firstParam(sp.page);
  const page = pageRaw ? Number.parseInt(pageRaw, 10) : undefined;
  return {
    q: q || undefined,
    category: isCategory(category) ? category : undefined,
    state: isState(state) ? state : undefined,
    qualification: isQualification(qualification) ? qualification : undefined,
    examBody: isExamBody(examBody) ? examBody : undefined,
    sort: isSortOption(sort) ? sort : undefined,
    page: page && page > 0 ? page : undefined,
  };
}

function haystack(post: Post): string {
  return [
    post.titleEn,
    post.titleHi,
    post.examBody,
    post.state,
    post.slug,
    post.eligibilityEn,
    post.category,
  ]
    .join(" ")
    .toLowerCase();
}

export function filterPosts(all: Post[], query: FilterQuery): Post[] {
  const q = query.q?.toLowerCase().trim();
  return all.filter((post) => {
    if (query.category && post.category !== query.category) return false;
    if (query.state && query.state !== "All India" && post.state !== query.state && post.state !== "All India") {
      return false;
    }
    if (query.state === "All India" && post.state !== "All India") return false;
    if (query.qualification && query.qualification !== "any") {
      if (post.qualification !== query.qualification && post.qualification !== "any") {
        return false;
      }
    }
    if (query.examBody && post.examBody !== query.examBody) return false;
    if (q && !haystack(post).includes(q)) return false;
    return true;
  });
}

export function sortByPublished(a: Post, b: Post): number {
  return b.publishedAt.localeCompare(a.publishedAt);
}

export function sortPosts(list: Post[], sort: SortOption | undefined, now = new Date()): Post[] {
  const copy = [...list];
  if (sort === "liked") {
    return copy.sort((a, b) => dummyLikeCount(b.id) - dummyLikeCount(a.id));
  }
  if (sort === "closing") {
    return copy.sort((a, b) => {
      const da = daysUntil(a.dates.last, now);
      const db = daysUntil(b.dates.last, now);
      if (da === null && db === null) return sortByPublished(a, b);
      if (da === null) return 1;
      if (db === null) return -1;
      if (da < 0 && db < 0) return da - db;
      if (da < 0) return 1;
      if (db < 0) return -1;
      return da - db;
    });
  }
  if (sort === "new") {
    return copy.sort((a, b) => {
      const ja = isJustPublished(a, now) ? 0 : 1;
      const jb = isJustPublished(b, now) ? 0 : 1;
      if (ja !== jb) return ja - jb;
      return sortByPublished(a, b);
    });
  }
  return copy.sort(sortByPublished);
}

export const PAGE_SIZE = 6;

export function paginate<T>(items: T[], page = 1, size = PAGE_SIZE) {
  const total = items.length;
  const totalPages = Math.max(1, Math.ceil(total / size) || 1);
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * size;
  const slice = items.slice(start, start + size);
  return {
    items: slice,
    page: current,
    totalPages,
    total,
    from: total === 0 ? 0 : start + 1,
    to: Math.min(start + size, total),
  };
}

export function getLatestByCategory(all: Post[], category: Category, limit = 8): Post[] {
  return all.filter((p) => p.category === category).sort(sortByPublished).slice(0, limit);
}

export function getClosingSoon(all: Post[], limit = 8, now = new Date()): Post[] {
  return all
    .filter((p) => getLiveStatus(p, now) === "closing-soon")
    .sort((a, b) => {
      const da = daysUntil(a.dates.last, now) ?? 99;
      const db = daysUntil(b.dates.last, now) ?? 99;
      return da - db;
    })
    .slice(0, limit);
}

export function getUrgent(all: Post[], now = new Date()): Post[] {
  const closing = getClosingSoon(all, 6, now);
  const fresh = all.filter((p) => isJustPublished(p, now)).sort(sortByPublished);
  const seen = new Set<string>();
  const out: Post[] = [];
  for (const p of [...closing, ...fresh]) {
    if (seen.has(p.id)) continue;
    seen.add(p.id);
    out.push(p);
    if (out.length >= 10) break;
  }
  return out;
}

export function getPost(all: Post[], category: string, slug: string): Post | undefined {
  return all.find((p) => p.category === category && p.slug === slug);
}

export function getRelated(all: Post[], post: Post, limit = 3): Post[] {
  return all
    .filter(
      (p) =>
        p.id !== post.id &&
        (p.examBody === post.examBody || p.category === post.category),
    )
    .sort(sortByPublished)
    .slice(0, limit);
}

export type CalendarEventKind = "exam" | "last" | "result" | "start";

export type CalendarEvent = {
  post: Post;
  iso: string;
  kind: CalendarEventKind;
};

export function getCalendarEvents(all: Post[]): CalendarEvent[] {
  const events: CalendarEvent[] = [];
  for (const post of all) {
    if (post.dates.exam) events.push({ post, iso: post.dates.exam, kind: "exam" });
    if (post.dates.last) events.push({ post, iso: post.dates.last, kind: "last" });
    if (post.dates.result) events.push({ post, iso: post.dates.result, kind: "result" });
    if (post.dates.start) events.push({ post, iso: post.dates.start, kind: "start" });
  }
  return events;
}

export function eventsOnDay(events: CalendarEvent[], iso: string): CalendarEvent[] {
  return events.filter((e) => e.iso === iso);
}

export function toIsoDay(year: number, month: number, day: number): string {
  const m = String(month + 1).padStart(2, "0");
  const d = String(day).padStart(2, "0");
  return `${year}-${m}-${d}`;
}

export function getUpcomingEvents(all: Post[], now = new Date(), limit = 12) {
  const today = toIsoDay(now.getFullYear(), now.getMonth(), now.getDate());
  return getCalendarEvents(all)
    .filter((e) => e.iso >= today)
    .sort((a, b) => a.iso.localeCompare(b.iso) || a.kind.localeCompare(b.kind))
    .slice(0, limit);
}
