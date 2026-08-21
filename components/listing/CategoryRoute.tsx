import { ListingPage } from "@/components/listing/ListingPage";
import { posts } from "@/data/posts";
import { CATEGORY_META } from "@/lib/constants";
import { filterPosts, paginate, queryFromSearchParams, sortPosts } from "@/lib/filters";
import type { Category } from "@/lib/types";
import { Suspense } from "react";
import { SkeletonCard } from "@/components/shared/EmptyState";

export type SearchParamsPromise = Promise<
  Record<string, string | string[] | undefined>
>;

function ListingFallback() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="h-8 w-48 animate-pulse rounded bg-navy-100 dark:bg-navy-800" />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}

async function CategoryListing({
  category,
  searchParams,
}: {
  category: Category;
  searchParams: SearchParamsPromise;
}) {
  const query = queryFromSearchParams(await searchParams);
  const filtered = sortPosts(filterPosts(posts, { ...query, category }), query.sort);
  const paged = paginate(filtered, query.page ?? 1);
  return (
    <ListingPage
      titleKey={CATEGORY_META[category].listingKey}
      posts={paged.items}
      query={{ ...query, category }}
      lockedCategory={category}
      page={paged.page}
      totalPages={paged.totalPages}
      total={paged.total}
      from={paged.from}
      to={paged.to}
    />
  );
}

export function CategoryRoute({
  category,
  searchParams,
}: {
  category: Category;
  searchParams: SearchParamsPromise;
}) {
  return (
    <Suspense fallback={<ListingFallback />}>
      <CategoryListing category={category} searchParams={searchParams} />
    </Suspense>
  );
}
