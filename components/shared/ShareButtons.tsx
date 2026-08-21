"use client";

import { useApp } from "@/components/providers/AppProvider";
import { ShareIcon } from "@/components/shared/Icons";
import { useState } from "react";

export function ShareButtons({ title, path }: { title: string; path: string }) {
  const { t } = useApp();
  const [copied, setCopied] = useState(false);

  function fullUrl() {
    if (typeof window === "undefined") return path;
    return `${window.location.origin}${path}`;
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(fullUrl());
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      /* ignore */
    }
  }

  const wa = `https://wa.me/?text=${encodeURIComponent(`${title} ${fullUrl()}`)}`;

  return (
    <div className="flex flex-wrap gap-2">
      <a
        href={wa}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 px-3 py-1.5 text-sm font-medium text-navy-800 hover:border-saffron-400 dark:border-navy-600 dark:text-navy-50"
      >
        <ShareIcon size={16} />
        {t("whatsapp")}
      </a>
      <button
        type="button"
        onClick={copy}
        className="inline-flex items-center gap-1.5 rounded-full border border-navy-200 px-3 py-1.5 text-sm font-medium text-navy-800 hover:border-saffron-400 dark:border-navy-600 dark:text-navy-50"
      >
        {copied ? t("copied") : t("copyLink")}
      </button>
    </div>
  );
}
