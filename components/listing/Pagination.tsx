"use client";

import { useApp } from "@/components/providers/AppProvider";
import { ChevronIcon } from "@/components/shared/Icons";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function pageList(current: number, total: number): (number | "gap")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const set = new Set([1, total, current, current - 1, current + 1, 2, total - 1]);
  const nums = [...set].filter((n) => n >= 1 && n <= total).sort((a, b) => a - b);
  const out: (number | "gap")[] = [];
  for (let i = 0; i < nums.length; i++) {
    if (i > 0 && nums[i]! - nums[i - 1]! > 1) out.push("gap");
    out.push(nums[i]!);
  }
  return out;
}

export function Pagination({
  page,
  totalPages,
  total,
  from,
  to,
}: {
  page: number;
  totalPages: number;
  total: number;
  from: number;
  to: number;
}) {
  const { t } = useApp();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  function href(p: number) {
    const next = new URLSearchParams(searchParams.toString());
    if (p <= 1) next.delete("page");
    else next.set("page", String(p));
    const qs = next.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  }

  if (total === 0) return null;

  const prev = Math.max(1, page - 1);
  const nxt = Math.min(totalPages, page + 1);

  return (
    <nav className="mt-8 flex flex-col items-center gap-3" aria-label={t("page")}>
      <p className="text-center text-xs text-navy-600 sm:text-sm dark:text-navy-200">
        {t("showing")} {from}–{to} {t("of")} {total} · {t("page")} {page} {t("of")} {totalPages}
      </p>
      <div className="flex flex-wrap items-center justify-center gap-1">
        <Link
          href={href(prev)}
          aria-disabled={page <= 1}
          className={`inline-flex min-h-10 items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium ${
            page <= 1
              ? "pointer-events-none border-navy-100 text-navy-300 dark:border-navy-800"
              : "border-navy-200 text-navy-800 hover:border-saffron-400 dark:border-navy-600 dark:text-navy-50"
          }`}
        >
          <ChevronIcon size={14} className="rotate-180" />
          <span className="hidden sm:inline">{t("previous")}</span>
        </Link>
        {pageList(page, totalPages).map((item, i) =>
          item === "gap" ? (
            <span key={`g-${i}`} className="hidden px-1 text-navy-400 sm:inline">
              …
            </span>
          ) : (
            <Link
              key={item}
              href={href(item)}
              aria-current={item === page ? "page" : undefined}
              className={`inline-flex h-10 min-w-10 items-center justify-center rounded-full px-2 text-sm font-semibold ${
                item === page
                  ? "bg-navy-900 text-white dark:bg-saffron-500 dark:text-navy-950"
                  : "hidden border border-navy-200 text-navy-800 hover:border-saffron-400 sm:inline-flex dark:border-navy-600 dark:text-navy-50"
              }`}
            >
              {item}
            </Link>
          ),
        )}
        <Link
          href={href(nxt)}
          aria-disabled={page >= totalPages}
          className={`inline-flex min-h-10 items-center gap-1 rounded-full border px-3 py-1.5 text-sm font-medium ${
            page >= totalPages
              ? "pointer-events-none border-navy-100 text-navy-300 dark:border-navy-800"
              : "border-navy-200 text-navy-800 hover:border-saffron-400 dark:border-navy-600 dark:text-navy-50"
          }`}
        >
          <span className="hidden sm:inline">{t("next")}</span>
          <ChevronIcon size={14} />
        </Link>
      </div>
    </nav>
  );
}
