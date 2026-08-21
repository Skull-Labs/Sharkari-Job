"use client";

import { FilterBar } from "@/components/listing/FilterBar";
import { Pagination } from "@/components/listing/Pagination";
import { PostList } from "@/components/listing/PostList";
import { useApp } from "@/components/providers/AppProvider";
import { CATEGORY_META } from "@/lib/constants";
import type { Category, FilterQuery, Post } from "@/lib/types";
import { Suspense } from "react";

export function ListingPage({
  titleKey,
  posts,
  query,
  showCategory,
  lockedCategory,
  page,
  totalPages,
  total,
  from,
  to,
}: {
  titleKey: keyof typeof import("@/data/i18n").messages.en;
  posts: Post[];
  query: FilterQuery;
  showCategory?: boolean;
  lockedCategory?: Category;
  page: number;
  totalPages: number;
  total: number;
  from: number;
  to: number;
}) {
  const { t } = useApp();
  return (
    <div className="mx-auto max-w-6xl px-3 py-6 sm:px-4 sm:py-8">
      <h1 className="text-xl font-bold tracking-tight text-navy-900 sm:text-2xl dark:text-white">
        {t(titleKey)}
      </h1>
      <p className="mt-1 text-sm text-navy-600 dark:text-navy-200">
        {t("showing")} {total} {t("updates")}
        {lockedCategory ? ` · ${t(CATEGORY_META[lockedCategory].labelKey)}` : ""}
      </p>
      <div className="mt-6">
        <FilterBar query={query} showCategory={showCategory} lockedCategory={lockedCategory} />
      </div>
      <div className="mt-6">
        <PostList
          posts={posts}
          clearHref={lockedCategory ? CATEGORY_META[lockedCategory].href : "/search"}
        />
      </div>
      <Suspense fallback={null}>
        <Pagination page={page} totalPages={totalPages} total={total} from={from} to={to} />
      </Suspense>
    </div>
  );
}
