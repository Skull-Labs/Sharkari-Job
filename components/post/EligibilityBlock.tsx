"use client";

import { DetailSection } from "@/components/post/DateTable";
import type { DetailModel } from "@/lib/detail";

export function EligibilityBlock({
  examLabel,
  educationLabel,
  model,
}: {
  examLabel: string;
  educationLabel: string;
  model: DetailModel;
}) {
  return (
    <DetailSection title={educationLabel}>
      <div className="space-y-3 p-3 sm:hidden">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">{examLabel}</p>
          <p className="mt-1 break-words font-medium text-navy-900 dark:text-white">{model.examName}</p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-navy-500">
            {educationLabel}
          </p>
          <p className="mt-1 break-words leading-6 text-navy-700 dark:text-navy-100">
            {model.education}
          </p>
        </div>
      </div>
      <div className="hidden overflow-x-auto sm:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-navy-100 bg-navy-50 text-left dark:border-navy-800 dark:bg-navy-800">
              <th className="px-4 py-2.5 font-semibold text-navy-800 dark:text-navy-50">{examLabel}</th>
              <th className="px-4 py-2.5 font-semibold text-navy-800 dark:text-navy-50">
                {educationLabel}
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-4 py-3 font-medium text-navy-900 dark:text-white">{model.examName}</td>
              <td className="px-4 py-3 leading-6 text-navy-700 dark:text-navy-100">{model.education}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </DetailSection>
  );
}

export function HowToSteps({ title, steps }: { title: string; steps: string[] }) {
  if (steps.length === 0) return null;
  return (
    <DetailSection title={title}>
      <ol className="space-y-2 px-4 py-4 text-sm leading-6 text-navy-800 dark:text-navy-100">
        {steps.map((step, i) => (
          <li key={i} className="flex gap-3">
            <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-saffron-500 text-xs font-bold text-white">
              {i + 1}
            </span>
            <span>{step}</span>
          </li>
        ))}
      </ol>
    </DetailSection>
  );
}

export function SelectionMode({ title, value }: { title: string; value: string }) {
  return (
    <DetailSection title={title}>
      <p className="px-4 py-3 text-sm font-semibold text-navy-900 dark:text-white">{value}</p>
    </DetailSection>
  );
}
