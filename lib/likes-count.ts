/** Deterministic dummy likes — safe on server. Production: read from DB. */
export function dummyLikeCount(id: string): number {
  let h = 0;
  for (let i = 0; i < id.length; i++) h = (h * 33 + id.charCodeAt(i)) >>> 0;
  return 48 + (h % 920);
}
