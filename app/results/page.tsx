import { CategoryRoute, type SearchParamsPromise } from "@/components/listing/CategoryRoute";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Results" };

export default function Page({ searchParams }: { searchParams: SearchParamsPromise }) {
  return <CategoryRoute category="results" searchParams={searchParams} />;
}
