import { CategoryRoute, type SearchParamsPromise } from "@/components/listing/CategoryRoute";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Latest Jobs" };

export default function Page({ searchParams }: { searchParams: SearchParamsPromise }) {
  return <CategoryRoute category="jobs" searchParams={searchParams} />;
}
