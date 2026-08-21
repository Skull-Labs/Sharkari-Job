"use client";

import { LanguageToggle } from "@/components/shared/LanguageToggle";
import { ThemeToggle } from "@/components/shared/ThemeToggle";
import { Logo } from "@/components/shared/Logo";
import { BookmarkIcon, CloseIcon, MenuIcon, SearchIcon, UserIcon } from "@/components/shared/Icons";
import { useApp } from "@/components/providers/AppProvider";
import { MORE_NAV, PRIMARY_NAV } from "@/lib/constants";
import { useSession } from "@/lib/session";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export function Header() {
  const { t, savedIds } = useApp();
  const { user } = useSession();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const moreActive = MORE_NAV.some(
    (item) => pathname === item.href || pathname.startsWith(`${item.href}/`),
  );

  function navClass(href: string) {
    const active =
      href !== "" && (pathname === href || (href !== "/" && pathname.startsWith(`${href}/`)));
    return `whitespace-nowrap rounded-full px-3 py-1.5 text-sm font-medium transition ${
      active
        ? "bg-navy-900 text-white dark:bg-saffron-500 dark:text-navy-950"
        : "text-navy-700 hover:bg-navy-50 dark:text-navy-100 dark:hover:bg-navy-800"
    }`;
  }

  return (
    <header className="sticky top-0 z-40 border-b border-navy-100/80 bg-cream/90 backdrop-blur-md dark:border-navy-800 dark:bg-navy-950/90">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-saffron-500 focus:px-3 focus:py-2 focus:text-navy-950"
      >
        {t("skipToContent")}
      </a>
      <div className="mx-auto flex max-w-6xl min-w-0 items-center gap-2 px-3 py-2 sm:gap-3 sm:px-4 sm:py-3">
        <div className="min-w-0 shrink">
          <Logo compact />
        </div>
        <nav className="ml-2 hidden items-center gap-0.5 lg:flex" aria-label="Primary">
          {PRIMARY_NAV.map((item) => (
            <Link key={item.href} href={item.href} className={navClass(item.href)}>
              {t(item.labelKey)}
            </Link>
          ))}
          <div className="relative group">
            <button type="button" className={navClass(moreActive ? pathname : "")}>
              {t("more")}
            </button>
            <div className="invisible absolute right-0 top-full z-20 min-w-48 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
              <div className="rounded-2xl border border-navy-100 bg-white p-2 shadow-lg dark:border-navy-700 dark:bg-navy-900">
                {MORE_NAV.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block rounded-xl px-3 py-2 text-sm text-navy-800 hover:bg-navy-50 dark:text-navy-50 dark:hover:bg-navy-800"
                  >
                    {t(item.labelKey)}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </nav>
        <div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">
          <Link
            href="/search"
            className="hidden h-10 w-10 items-center justify-center rounded-full border border-navy-200 text-navy-800 md:inline-flex dark:border-navy-600 dark:text-navy-50"
            aria-label={t("search")}
          >
            <SearchIcon size={18} />
          </Link>
          <Link
            href="/saved"
            className="relative hidden h-10 w-10 items-center justify-center rounded-full border border-navy-200 text-navy-800 md:inline-flex dark:border-navy-600 dark:text-navy-50"
            aria-label={t("saved")}
          >
            <BookmarkIcon size={18} />
            {savedIds.length > 0 ? (
              <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-saffron-500 px-1 text-[10px] font-bold text-white">
                {savedIds.length}
              </span>
            ) : null}
          </Link>
          <LanguageToggle />
          <ThemeToggle />
          {user ? (
            <Link
              href="/profile"
              className="inline-flex h-10 max-w-[7.5rem] items-center gap-1.5 rounded-full border border-navy-200 px-2 text-xs font-semibold text-navy-800 dark:border-navy-600 dark:text-navy-50"
              aria-label={t("profile")}
            >
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-navy-900 text-[10px] font-bold text-white dark:bg-saffron-500 dark:text-navy-950">
                {user.name.slice(0, 1)}
              </span>
              <span className="hidden truncate sm:inline">{user.name.split(" ")[0]}</span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex h-10 items-center gap-1.5 rounded-full bg-navy-900 px-2.5 text-sm font-semibold text-white sm:px-3 dark:bg-saffron-500 dark:text-navy-950"
            >
              <UserIcon size={16} />
              <span className="hidden sm:inline">{t("login")}</span>
            </Link>
          )}
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-navy-200 lg:hidden dark:border-navy-600"
            aria-expanded={open}
            aria-label="Menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <CloseIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>
      {open ? (
        <div className="max-h-[min(70vh,32rem)] overflow-y-auto border-t border-navy-100 px-3 py-3 lg:hidden dark:border-navy-800">
          <div className="grid grid-cols-2 gap-2">
            {[...PRIMARY_NAV, ...MORE_NAV].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-xl bg-white px-3 py-3 text-sm font-medium text-navy-800 dark:bg-navy-900 dark:text-navy-50"
                onClick={() => setOpen(false)}
              >
                {t(item.labelKey)}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </header>
  );
}
