export const CATEGORIES = [
  "jobs",
  "results",
  "admit-card",
  "answer-key",
  "syllabus",
  "admission",
  "scholarship",
  "important",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const QUALIFICATIONS = [
  "10th",
  "12th",
  "graduate",
  "postgraduate",
  "any",
] as const;

export type Qualification = (typeof QUALIFICATIONS)[number];

export const EXAM_BODIES = [
  "SSC",
  "UPSC",
  "Railway",
  "Banking",
  "Police",
  "Teaching",
  "Defence",
  "State",
  "Other",
] as const;

export type ExamBody = (typeof EXAM_BODIES)[number];

export const INDIAN_STATES = [
  "All India",
  "UP",
  "Bihar",
  "MP",
  "Rajasthan",
  "Delhi",
  "Haryana",
  "Jharkhand",
] as const;

export type IndianState = (typeof INDIAN_STATES)[number];

export const POST_STATUSES = [
  "open",
  "closing-soon",
  "closed",
  "result-out",
] as const;

export type PostStatus = (typeof POST_STATUSES)[number];

export type Lang = "en" | "hi";
export type Theme = "light" | "dark";

export type PostDates = {
  start?: string;
  last?: string;
  exam?: string;
  result?: string;
};

export type TimelineEvent = {
  labelEn: string;
  labelHi: string;
  valueEn: string;
  valueHi?: string;
  highlight?: boolean;
};

export type FeeRow = {
  categoryEn: string;
  categoryHi: string;
  amount: string;
};

export type UsefulLink = {
  labelEn: string;
  labelHi: string;
  href: string;
};

export type FaqItem = {
  qEn: string;
  qHi: string;
  aEn: string;
  aHi: string;
};

export type Post = {
  id: string;
  slug: string;
  category: Category;
  titleEn: string;
  titleHi: string;
  examBody: ExamBody;
  state: IndianState;
  qualification: Qualification;
  vacancies: number | null;
  dates: PostDates;
  fee: string;
  ageLimit: string;
  eligibilityEn: string;
  eligibilityHi: string;
  howToEn: string;
  howToHi: string;
  officialUrl: string;
  publishedAt: string;
  status: PostStatus;
  organizationEn?: string;
  organizationHi?: string;
  summaryEn?: string;
  summaryHi?: string;
  timeline?: TimelineEvent[];
  feeRows?: FeeRow[];
  feeNoteEn?: string;
  feeNoteHi?: string;
  paymentModesEn?: string[];
  paymentModesHi?: string[];
  ageMin?: string;
  ageMax?: string;
  ageNoteEn?: string;
  ageNoteHi?: string;
  selectionModeEn?: string;
  selectionModeHi?: string;
  howToStepsEn?: string[];
  howToStepsHi?: string[];
  links?: UsefulLink[];
  faqs?: FaqItem[];
};

export const SORT_OPTIONS = ["recent", "liked", "closing", "new"] as const;
export type SortOption = (typeof SORT_OPTIONS)[number];

export type FilterQuery = {
  q?: string;
  category?: Category;
  state?: IndianState;
  qualification?: Qualification;
  examBody?: ExamBody;
  sort?: SortOption;
  page?: number;
};

export type AuthProviderId = "google" | "email";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  provider: AuthProviderId;
};

export type NotificationTopics = {
  jobs: boolean;
  results: boolean;
  admitCard: boolean;
  exams: boolean;
  closingSoon: boolean;
};

export type NotificationPrefs = {
  emailEnabled: boolean;
  whatsappEnabled: boolean;
  phone: string;
  topics: NotificationTopics;
};

export type Expert = {
  id: string;
  name: string;
  titleEn: string;
  titleHi: string;
  bioEn: string;
  bioHi: string;
  rate: string;
  rating: number;
  jobsFilled: number;
  skills: string[];
};
