import type { Category, ExamBody, Qualification } from "@/lib/types";
import type { MessageKey } from "@/data/i18n";

export const CATEGORY_META: Record<
  Category,
  {
    href: string;
    labelKey: MessageKey;
    listingKey: MessageKey;
    ctaKey: MessageKey;
    accent: string;
  }
> = {
  jobs: {
    href: "/jobs",
    labelKey: "jobs",
    listingKey: "listingJobs",
    ctaKey: "applyNow",
    accent: "bg-navy-800 text-white",
  },
  results: {
    href: "/results",
    labelKey: "results",
    listingKey: "listingResults",
    ctaKey: "checkResult",
    accent: "bg-emerald-700 text-white",
  },
  "admit-card": {
    href: "/admit-card",
    labelKey: "admitCard",
    listingKey: "listingAdmit",
    ctaKey: "downloadNow",
    accent: "bg-sky-700 text-white",
  },
  "answer-key": {
    href: "/answer-key",
    labelKey: "answerKey",
    listingKey: "listingAnswer",
    ctaKey: "viewSyllabus",
    accent: "bg-violet-700 text-white",
  },
  syllabus: {
    href: "/syllabus",
    labelKey: "syllabus",
    listingKey: "listingSyllabus",
    ctaKey: "viewSyllabus",
    accent: "bg-teal-700 text-white",
  },
  admission: {
    href: "/admission",
    labelKey: "admission",
    listingKey: "listingAdmission",
    ctaKey: "applyNow",
    accent: "bg-indigo-700 text-white",
  },
  scholarship: {
    href: "/scholarship",
    labelKey: "scholarship",
    listingKey: "listingScholarship",
    ctaKey: "applyNow",
    accent: "bg-saffron-500 text-white",
  },
  important: {
    href: "/important",
    labelKey: "important",
    listingKey: "listingImportant",
    ctaKey: "viewSyllabus",
    accent: "bg-rose-700 text-white",
  },
};

export const QUALIFICATION_LABEL: Record<Qualification, MessageKey> = {
  "10th": "q10",
  "12th": "q12",
  graduate: "qGrad",
  postgraduate: "qPg",
  any: "qAny",
};

export const PRIMARY_NAV: { href: string; labelKey: MessageKey }[] = [
  { href: "/jobs", labelKey: "jobs" },
  { href: "/results", labelKey: "results" },
  { href: "/admit-card", labelKey: "admitCard" },
  { href: "/answer-key", labelKey: "answerKey" },
];

export const MORE_NAV: { href: string; labelKey: MessageKey }[] = [
  { href: "/syllabus", labelKey: "syllabus" },
  { href: "/admission", labelKey: "admission" },
  { href: "/scholarship", labelKey: "scholarship" },
  { href: "/important", labelKey: "important" },
  { href: "/calendar", labelKey: "calendar" },
  { href: "/events", labelKey: "upcomingEvents" },
  { href: "/experts", labelKey: "expertsTitle" },
];

export const EXAM_BODY_HREF: Record<ExamBody, string> = {
  SSC: "/search?examBody=SSC",
  UPSC: "/search?examBody=UPSC",
  Railway: "/search?examBody=Railway",
  Banking: "/search?examBody=Banking",
  Police: "/search?examBody=Police",
  Teaching: "/search?examBody=Teaching",
  Defence: "/search?examBody=Defence",
  State: "/search?examBody=State",
  Other: "/search?examBody=Other",
};

export const FEATURED_BODIES: ExamBody[] = [
  "SSC",
  "UPSC",
  "Railway",
  "Banking",
  "Police",
  "Teaching",
];
