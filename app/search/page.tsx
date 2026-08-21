import { ListingPage } from "@/components/listing/ListingPage";
import { SkeletonCard } from "@/components/shared/EmptyState";
import { posts } from "@/data/posts";
import { filterPosts, paginate, queryFromSearchParams, sortPosts } from "@/lib/filters";
import type { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = { title: "Search" };

async function SearchResults({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const query = queryFromSearchParams(await searchParams);
  const filtered = sortPosts(filterPosts(posts, query), query.sort);
  const paged = paginate(filtered, query.page ?? 1);
  return (
    <ListingPage
      titleKey="searchResultsFor"
      posts={paged.items}
      query={query}
      showCategory
      page={paged.page}
      totalPages={paged.totalPages}
      total={paged.total}
      from={paged.from}
      to={paged.to}
    />
  );
}

export default function SearchPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-6xl px-4 py-8">
          <div className="grid gap-3 sm:grid-cols-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        </div>
      }
    >
      <SearchResults searchParams={searchParams} />
    </Suspense>
  );
}
