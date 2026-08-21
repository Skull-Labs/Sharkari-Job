"use client";

import { DetailSection } from "@/components/post/DateTable";
import { ExternalIcon } from "@/components/shared/Icons";

export function ImportantLinks({
  title,
  clickLabel,
  links,
}: {
  title: string;
  clickLabel: string;
  links: { label: string; href: string }[];
}) {
  return (
    <DetailSection title={title}>
      <table className="w-full text-sm">
        <tbody>
          {links.map((link) => (
            <tr
              key={`${link.label}-${link.href}`}
              className="flex flex-col border-b border-navy-100 last:border-0 sm:table-row dark:border-navy-800"
            >
              <th className="w-full break-words bg-navy-50 px-3 py-2 text-left font-medium text-navy-800 sm:w-[55%] sm:px-4 sm:py-2.5 dark:bg-navy-800 dark:text-navy-50">
                {link.label}
              </th>
              <td className="px-3 py-2 sm:px-4 sm:py-2.5">
                <a
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-bold text-saffron-600 hover:underline dark:text-saffron-400"
                >
                  {clickLabel}
                  <ExternalIcon size={14} />
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </DetailSection>
  );
}

export function FaqList({
  title,
  faqs,
}: {
  title: string;
  faqs: { q: string; a: string }[];
}) {
  return (
    <DetailSection title={title}>
      <div className="divide-y divide-navy-100 dark:divide-navy-800">
        {faqs.map((faq) => (
          <details key={faq.q} className="group px-4 py-3">
            <summary className="cursor-pointer list-none text-sm font-semibold text-navy-900 dark:text-white">
              <span className="mr-2 text-saffron-600">Q.</span>
              {faq.q}
            </summary>
            <p className="mt-2 text-sm leading-6 text-navy-700 dark:text-navy-100">
              <span className="font-semibold text-navy-500">A. </span>
              {faq.a}
            </p>
          </details>
        ))}
      </div>
    </DetailSection>
  );
}
