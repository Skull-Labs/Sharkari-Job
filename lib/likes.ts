"use client";

import { dummyLikeCount } from "@/lib/likes-count";
import { useCallback, useMemo, useSyncExternalStore } from "react";

const KEY = "sharkari-liked-ids";
const listeners = new Set<() => void>();
let ids: string[] = [];
let didRead = false;

function emit() {
  listeners.forEach((l) => l());
}

function read(): string[] {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!didRead && typeof window !== "undefined") {
    didRead = true;
    ids = read();
    queueMicrotask(emit);
  }
  return () => listeners.delete(listener);
}

function snapshot() {
  return ids;
}

function write(next: string[]) {
  ids = next;
  try {
    localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* ignore */
  }
  emit();
}

export function useLikes() {
  const likedIds = useSyncExternalStore(subscribe, snapshot, () => [] as string[]);

  const isLiked = useCallback((id: string) => likedIds.includes(id), [likedIds]);

  const countFor = useCallback(
    (id: string) => dummyLikeCount(id) + (likedIds.includes(id) ? 1 : 0),
    [likedIds],
  );

  const toggle = useCallback((id: string) => {
    write(ids.includes(id) ? ids.filter((x) => x !== id) : [...ids, id]);
  }, []);

  return useMemo(
    () => ({ likedIds, isLiked, countFor, toggle }),
    [likedIds, isLiked, countFor, toggle],
  );
}
