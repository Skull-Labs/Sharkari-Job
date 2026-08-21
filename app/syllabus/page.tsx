import { CategoryRoute, type SearchParamsPromise } from "@/components/listing/CategoryRoute";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Syllabus" };

export default function Page({ searchParams }: { searchParams: SearchParamsPromise }) {
  return <CategoryRoute category="syllabus" searchParams={searchParams} />;
}
