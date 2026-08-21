"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import { PostCard } from "@/components/listing/PostCard";
import { useApp } from "@/components/providers/AppProvider";
import type { Post } from "@/lib/types";
import Link from "next/link";

export function PostList({
  posts,
  clearHref = "/",
}: {
  posts: Post[];
  clearHref?: string;
}) {
  const { t } = useApp();
  if (posts.length === 0) {
    return (
      <EmptyState
        action={
          <Link
            href={clearHref}
            className="inline-flex rounded-full bg-navy-900 px-4 py-2 text-sm font-semibold text-white dark:bg-saffron-500 dark:text-navy-950"
          >
            {t("clearFilters")}
          </Link>
        }
      />
    );
  }
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {posts.map((post) => (
        <div key={post.id} className="min-w-0">
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}
