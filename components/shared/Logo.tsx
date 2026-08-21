"use client";

import { useApp } from "@/components/providers/AppProvider";
import Image from "next/image";
import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  const { t } = useApp();
  return (
    <Link href="/" className="flex min-w-0 items-center gap-2" aria-label={`${t("brand")} home`}>
      <Image
        src="/icon.png"
        alt=""
        width={813}
        height={540}
        priority
        className={
          compact
            ? "h-8 w-auto shrink-0 object-contain sm:h-11"
            : "h-12 w-auto shrink-0 object-contain sm:h-14"
        }
      />
      <span className={compact ? "hidden min-w-0 min-[420px]:block" : "block min-w-0"}>
        <span className="block truncate text-sm font-bold leading-none tracking-tight text-navy-900 dark:text-white sm:text-lg">
          {t("brand")}
        </span>
        <span className="mt-0.5 hidden text-[10px] font-semibold uppercase tracking-[0.14em] text-saffron-600 sm:block dark:text-saffron-400">
          {t("tagline")}
        </span>
      </span>
    </Link>
  );
}
