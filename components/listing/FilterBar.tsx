"use client";

import { useApp } from "@/components/providers/AppProvider";
import { CATEGORY_META, QUALIFICATION_LABEL } from "@/lib/constants";
import { CATEGORIES, EXAM_BODIES, INDIAN_STATES, QUALIFICATIONS, SORT_OPTIONS } from "@/lib/types";
import type { Category, FilterQuery, SortOption } from "@/lib/types";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Select({
  id,
  label,
  value,
  onChange,
  children,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <label className="block text-xs font-medium text-navy-600 dark:text-navy-200">
      {label}
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 min-h-11 w-full rounded-xl border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-900 dark:border-navy-700 dark:bg-navy-900 dark:text-white"
      >
        {children}
      </select>
    </label>
  );
}

export function FilterBar({
  query,
  showCategory = false,
  lockedCategory,
}: {
  query: FilterQuery;
  showCategory?: boolean;
  lockedCategory?: Category;
}) {
  const { t } = useApp();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function update(key: string, value: string) {
    const next = new URLSearchParams(searchParams.toString());
    if (!value) next.delete(key);
    else next.set(key, value);
    if (key !== "page") next.delete("page");
    const qs = next.toString();
    router.push(qs ? `${pathname}?${qs}` : pathname);
  }

  const sort = query.sort ?? "recent";
  const sortLabels: Record<SortOption, "sortRecent" | "sortLiked" | "sortClosing" | "sortNew"> = {
    recent: "sortRecent",
    liked: "sortLiked",
    closing: "sortClosing",
    new: "sortNew",
  };

  const hasFilters = Boolean(
    query.q ||
      query.state ||
      query.qualification ||
      query.examBody ||
      (showCategory && query.category) ||
      (query.sort && query.sort !== "recent"),
  );

  return (
    <form
      className="grid min-w-0 gap-3 rounded-2xl border border-navy-100 bg-white p-3 sm:grid-cols-2 sm:p-4 lg:grid-cols-4 dark:border-navy-800 dark:bg-navy-900"
      onSubmit={(e) => e.preventDefault()}
    >
      <label className="block text-xs font-medium text-navy-600 sm:col-span-2 lg:col-span-4 dark:text-navy-200">
        {t("search")}
        <input
          type="search"
          defaultValue={query.q ?? ""}
          placeholder={t("searchPlaceholder")}
          className="mt-1 min-h-11 w-full rounded-xl border border-navy-200 bg-white px-3 py-2.5 text-sm text-navy-900 dark:border-navy-700 dark:bg-navy-950 dark:text-white"
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              update("q", (e.target as HTMLInputElement).value.trim());
            }
          }}
          onBlur={(e) => update("q", e.target.value.trim())}
        />
      </label>
      {showCategory && !lockedCategory ? (
        <Select
          id="category"
          label={t("category")}
          value={query.category ?? ""}
          onChange={(v) => update("category", v)}
        >
          <option value="">{t("all")}</option>
          {CATEGORIES.map((c) => (
            <option key={c} value={c}>
              {t(CATEGORY_META[c].labelKey)}
            </option>
          ))}
        </Select>
      ) : null}
      <Select
        id="state"
        label={t("state")}
        value={query.state ?? ""}
        onChange={(v) => update("state", v)}
      >
        <option value="">{t("all")}</option>
        {INDIAN_STATES.map((s) => (
          <option key={s} value={s}>
            {s === "All India" ? t("allIndia") : s}
          </option>
        ))}
      </Select>
      <Select
        id="qualification"
        label={t("qualification")}
        value={query.qualification ?? ""}
        onChange={(v) => update("qualification", v)}
      >
        <option value="">{t("all")}</option>
        {QUALIFICATIONS.map((q) => (
          <option key={q} value={q}>
            {t(QUALIFICATION_LABEL[q])}
          </option>
        ))}
      </Select>
      <Select
        id="examBody"
        label={t("examBody")}
        value={query.examBody ?? ""}
        onChange={(v) => update("examBody", v)}
      >
        <option value="">{t("all")}</option>
        {EXAM_BODIES.map((b) => (
          <option key={b} value={b}>
            {b}
          </option>
        ))}
      </Select>
      <div className="sm:col-span-2 lg:col-span-4">
        <p className="text-xs font-medium text-navy-600 dark:text-navy-200">{t("sortBy")}</p>
        <div className="-mx-1 mt-2 flex gap-2 overflow-x-auto px-1 pb-1 scrollbar-thin">
          {SORT_OPTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => update("sort", s === "recent" ? "" : s)}
              className={`shrink-0 rounded-full px-3 py-2 text-sm font-semibold ${
                sort === s
                  ? "bg-navy-900 text-white dark:bg-saffron-500 dark:text-navy-950"
                  : "border border-navy-200 text-navy-700 dark:border-navy-600 dark:text-navy-100"
              }`}
            >
              {t(sortLabels[s])}
            </button>
          ))}
        </div>
      </div>
      {hasFilters ? (
        <div className="flex items-end sm:col-span-2 lg:col-span-4">
          <button
            type="button"
            onClick={() => router.push(pathname)}
            className="text-sm font-semibold text-saffron-600 hover:underline"
          >
            {t("clearFilters")}
          </button>
        </div>
      ) : null}
    </form>
  );
}
