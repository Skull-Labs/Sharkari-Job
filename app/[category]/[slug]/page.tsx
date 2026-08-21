import { PostDetail } from "@/components/post/PostDetail";
import { posts } from "@/data/posts";
import { getPost, getRelated, isCategory } from "@/lib/filters";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

type Params = Promise<{ category: string; slug: string }>;

export function generateStaticParams() {
  return posts.map((p) => ({ category: p.category, slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Params;
}): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPost(posts, category, slug);
  if (!post) return { title: "Not found" };
  return {
    title: post.titleEn,
    description: post.eligibilityEn,
  };
}

export default async function PostPage({ params }: { params: Params }) {
  const { category, slug } = await params;
  if (!isCategory(category)) notFound();
  const post = getPost(posts, category, slug);
  if (!post) notFound();
  return <PostDetail post={post} related={getRelated(posts, post)} />;
}
