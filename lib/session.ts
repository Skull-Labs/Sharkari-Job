"use client";

import type { AuthProviderId, AuthUser, NotificationPrefs } from "@/lib/types";
import { useCallback, useMemo, useSyncExternalStore } from "react";

const USER_KEY = "sharkari-user";
const NOTIFY_KEY = "sharkari-notify";

const defaultNotify: NotificationPrefs = {
  emailEnabled: true,
  whatsappEnabled: false,
  phone: "",
  topics: {
    jobs: true,
    results: true,
    admitCard: true,
    exams: true,
    closingSoon: true,
  },
};

type SessionState = {
  user: AuthUser | null;
  notify: NotificationPrefs;
};

const defaultState: SessionState = { user: null, notify: defaultNotify };

let state: SessionState = defaultState;
let didRead = false;
const listeners = new Set<() => void>();

function emit() {
  listeners.forEach((l) => l());
}

function readState(): SessionState {
  try {
    const u = localStorage.getItem(USER_KEY);
    const n = localStorage.getItem(NOTIFY_KEY);
    let user: AuthUser | null = null;
    let notify = defaultNotify;
    if (u) {
      const parsed = JSON.parse(u) as Partial<AuthUser>;
      if (parsed && typeof parsed.email === "string" && typeof parsed.id === "string") {
        user = {
          id: parsed.id,
          name: typeof parsed.name === "string" ? parsed.name : parsed.email,
          email: parsed.email,
          provider: parsed.provider === "google" ? "google" : "email",
        };
      }
    }
    if (n) {
      const parsed = JSON.parse(n) as Partial<NotificationPrefs>;
      notify = {
        emailEnabled: parsed.emailEnabled !== false,
        whatsappEnabled: Boolean(parsed.whatsappEnabled),
        phone: typeof parsed.phone === "string" ? parsed.phone : "",
        topics: { ...defaultNotify.topics, ...parsed.topics },
      };
    }
    return { user, notify };
  } catch {
    return defaultState;
  }
}

function persist(next: SessionState) {
  state = next;
  try {
    if (next.user) localStorage.setItem(USER_KEY, JSON.stringify(next.user));
    else localStorage.removeItem(USER_KEY);
    localStorage.setItem(NOTIFY_KEY, JSON.stringify(next.notify));
  } catch {
    /* ignore */
  }
  emit();
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  if (!didRead && typeof window !== "undefined") {
    didRead = true;
    state = readState();
    queueMicrotask(emit);
  }
  return () => listeners.delete(listener);
}

function nameFromEmail(email: string) {
  const local = email.split("@")[0] ?? "Student";
  return local.replace(/[._-]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

/** Dummy sign-in. Production: Auth.js Google / email magic link. */
export function dummySignIn(provider: AuthProviderId, email?: string): AuthUser {
  const user: AuthUser =
    provider === "google"
      ? {
          id: "google-demo",
          name: "Asha Sharma",
          email: "asha.sharma@gmail.com",
          provider: "google",
        }
      : {
          id: `email-${(email ?? "student@example.com").toLowerCase()}`,
          name: nameFromEmail(email ?? "student@example.com"),
          email: (email ?? "student@example.com").toLowerCase(),
          provider: "email",
        };
  persist({ ...state, user });
  return user;
}

export function dummySignOut() {
  persist({ ...state, user: null });
}

export function dummySaveNotify(notify: NotificationPrefs) {
  persist({ ...state, notify });
}

export function useSession() {
  const current = useSyncExternalStore(subscribe, () => state, () => defaultState);

  const signIn = useCallback((provider: AuthProviderId, email?: string) => dummySignIn(provider, email), []);
  const signOut = useCallback(() => dummySignOut(), []);
  const saveNotify = useCallback((notify: NotificationPrefs) => dummySaveNotify(notify), []);

  return useMemo(
    () => ({
      user: current.user,
      notify: current.notify,
      signIn,
      signOut,
      saveNotify,
    }),
    [current.user, current.notify, signIn, signOut, saveNotify],
  );
}
