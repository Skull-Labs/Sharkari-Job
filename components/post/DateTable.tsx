"use client";

import type { DetailModel } from "@/lib/detail";

export function DetailSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="overflow-hidden rounded-2xl border border-navy-100 dark:border-navy-800">
      <h2 className="bg-navy-900 px-3 py-2.5 text-sm font-bold tracking-wide text-white sm:px-4 dark:bg-navy-800">
        {title}
      </h2>
      <div className="bg-white dark:bg-navy-900">{children}</div>
    </section>
  );
}

export function DetailTable({
  rows,
}: {
  rows: { label: string; value: React.ReactNode; highlight?: boolean }[];
}) {
  return (
    <table className="w-full text-sm">
      <tbody>
        {rows.map((row) => (
          <tr
            key={row.label}
            className="flex flex-col border-b border-navy-100 last:border-0 sm:table-row dark:border-navy-800"
          >
            <th className="w-full break-words bg-navy-50 px-3 py-2 text-left font-medium text-navy-700 sm:w-[42%] sm:px-4 sm:py-2.5 dark:bg-navy-800 dark:text-navy-100">
              {row.label}
            </th>
            <td
              className={`w-full break-words px-3 py-2 font-semibold sm:px-4 sm:py-2.5 ${
                row.highlight
                  ? "text-saffron-600 dark:text-saffron-400"
                  : "text-navy-900 dark:text-white"
              }`}
            >
              {row.value}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export function ShortDetails({
  title,
  model,
  labels,
}: {
  title: string;
  model: DetailModel;
  labels: {
    dates: string;
    fee: string;
    feeNote: string;
    payment: string;
    ageTitle: string;
    ageMin: string;
    ageMax: string;
    total: string;
  };
}) {
  return (
    <div className="space-y-5">
      <h2 className="break-words text-center text-sm font-bold text-navy-900 sm:text-base dark:text-white">
        {title}
      </h2>
      <DetailSection title={labels.dates}>
        <DetailTable rows={model.timeline} />
      </DetailSection>
      <DetailSection title={labels.fee}>
        <DetailTable
          rows={model.feeRows.map((r) => ({ label: r.category, value: r.amount }))}
        />
        <p className="border-t border-navy-100 px-4 py-2 text-xs leading-5 text-navy-600 dark:border-navy-800 dark:text-navy-200">
          {model.feeNote || labels.feeNote}
        </p>
        <p className="px-4 pb-3 text-xs text-navy-600 dark:text-navy-200">
          {labels.payment}: {model.paymentModes.join(" · ")}
        </p>
      </DetailSection>
      <DetailSection title={labels.ageTitle}>
        <DetailTable
          rows={[
            { label: labels.ageMin, value: model.ageMin },
            { label: labels.ageMax, value: model.ageMax },
          ]}
        />
        {model.ageNote ? (
          <p className="border-t border-navy-100 px-4 py-2 text-xs text-navy-600 dark:border-navy-800 dark:text-navy-200">
            {model.ageNote}
          </p>
        ) : null}
      </DetailSection>
      <DetailSection title={labels.total}>
        <DetailTable rows={[{ label: labels.total, value: model.vacancies }]} />
      </DetailSection>
    </div>
  );
}
