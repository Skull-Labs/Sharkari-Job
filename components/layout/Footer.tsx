"use client";

import { Logo } from "@/components/shared/Logo";
import { useApp } from "@/components/providers/AppProvider";
import { CATEGORY_META, FEATURED_BODIES, EXAM_BODY_HREF } from "@/lib/constants";
import { CATEGORIES } from "@/lib/types";
import Link from "next/link";

export function Footer() {
  const { t } = useApp();
  return (
    <footer className="mt-10 border-t border-navy-100 bg-navy-900 text-navy-100 sm:mt-16 dark:border-navy-800">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:gap-10 sm:py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <div className="inline-block rounded-2xl bg-white/95 p-2">
            <Logo />
          </div>
          <p className="mt-4 text-sm leading-6 text-navy-200">{t("footerTrust")}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-saffron-400">
            {t("category")}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {CATEGORIES.map((c) => (
              <li key={c}>
                <Link href={CATEGORY_META[c].href} className="hover:text-white">
                  {t(CATEGORY_META[c].labelKey)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-saffron-400">
            {t("popularBodies")}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {FEATURED_BODIES.map((b) => (
              <li key={b}>
                <Link href={EXAM_BODY_HREF[b]} className="hover:text-white">
                  {b}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-saffron-400">
            {t("brand")}
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/about" className="hover:text-white">
                {t("about")}
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">
                {t("contact")}
              </Link>
            </li>
            <li>
              <Link href="/disclaimer" className="hover:text-white">
                {t("disclaimer")}
              </Link>
            </li>
            <li>
              <Link href="/calendar" className="hover:text-white">
                {t("calendar")}
              </Link>
            </li>
            <li>
              <Link href="/events" className="hover:text-white">
                {t("upcomingEvents")}
              </Link>
            </li>
            <li>
              <Link href="/experts" className="hover:text-white">
                {t("expertsTitle")}
              </Link>
            </li>
            <li>
              <Link href="/login" className="hover:text-white">
                {t("login")}
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-4 text-center text-xs leading-5 text-navy-300">
        © {new Date().getFullYear()} Sharkari Guru · {t("weDontConduct")}
      </div>
    </footer>
  );
}
