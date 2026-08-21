import { SavedView } from "@/components/home/SavedView";
import type { Metadata } from "next";

export const metadata: Metadata = { title: "Saved" };

export default function SavedPage() {
  return <SavedView />;
}
