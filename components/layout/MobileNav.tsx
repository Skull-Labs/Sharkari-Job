"use client";

import { BookmarkIcon, BriefcaseIcon, HomeIcon, SearchIcon, TrophyIcon } from "@/components/shared/Icons";
import { useApp } from "@/components/providers/AppProvider";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ITEMS = [
  { href: "/", key: "home" as const, Icon: HomeIcon },
  { href: "/jobs", key: "navJobs" as const, Icon: BriefcaseIcon },
  { href: "/results", key: "results" as const, Icon: TrophyIcon },
  { href: "/saved", key: "saved" as const, Icon: BookmarkIcon },
  { href: "/search", key: "search" as const, Icon: SearchIcon },
];

export function MobileNav() {
  const { t } = useApp();
  const pathname = usePathname();
  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-40 border-t border-navy-100 bg-white/95 px-1 pt-1 backdrop-blur md:hidden dark:border-navy-800 dark:bg-navy-950/95"
      style={{ paddingBottom: "max(0.35rem, env(safe-area-inset-bottom))" }}
      aria-label="Mobile"
    >
      <ul className="grid grid-cols-5">
        {ITEMS.map(({ href, key, Icon }) => {
          const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
          return (
            <li key={href} className="min-w-0">
              <Link
                href={href}
                className={`flex min-h-11 flex-col items-center justify-center gap-0.5 rounded-xl px-0.5 py-1 text-[10px] font-medium leading-tight ${
                  active ? "text-saffron-600 dark:text-saffron-400" : "text-navy-500 dark:text-navy-200"
                }`}
              >
                <Icon size={20} />
                <span className="w-full truncate text-center">{t(key)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
