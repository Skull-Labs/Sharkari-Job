import { SkeletonCard } from "@/components/shared/EmptyState";

export default function Loading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <div className="h-8 w-56 animate-pulse rounded-lg bg-navy-100 dark:bg-navy-800" />
      <div className="mt-6 grid gap-3 sm:grid-cols-2">
        {Array.from({ length: 6 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
    </div>
  );
}
