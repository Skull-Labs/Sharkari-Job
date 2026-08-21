/**
 * Dummy API window — swap these for real HTTP calls later.
 *
 * Production sketch:
 * - Auth: Auth.js / NextAuth with Google OAuth + email magic link
 * - Posts: CMS or DB, not `data/posts.ts`
 * - Likes / saved: user tables
 * - Notifications: email provider + WhatsApp Business API, filtered by NotificationPrefs
 * - Experts: paid marketplace, KYC, escrow
 *
 * Keep `API_MODE === "dummy"` until those services exist. UI should call only
 * functions in this file (or the session/likes helpers) so the swap is one layer.
 */
export const API_MODE = "dummy" as const;

export function isDummyApi(): boolean {
  return API_MODE === "dummy";
}
