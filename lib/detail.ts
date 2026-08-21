import { messages } from "@/data/i18n";
import { formatDate } from "@/lib/filters";
import type {
  ExamBody,
  FaqItem,
  FeeRow,
  Lang,
  Post,
  TimelineEvent,
  UsefulLink,
} from "@/lib/types";

const ORG: Record<ExamBody, { en: string; hi: string }> = {
  SSC: {
    en: "Staff Selection Commission (SSC)",
    hi: "कर्मचारी चयन आयोग (SSC)",
  },
  UPSC: {
    en: "Union Public Service Commission (UPSC)",
    hi: "संघ लोक सेवा आयोग (UPSC)",
  },
  Railway: {
    en: "Railway Recruitment Board (RRB)",
    hi: "रेलवे भर्ती बोर्ड (RRB)",
  },
  Banking: {
    en: "Institute of Banking Personnel Selection / Bank (IBPS / SBI)",
    hi: "बैंकिंग भर्ती (IBPS / SBI)",
  },
  Police: {
    en: "Police Recruitment Board",
    hi: "पुलिस भर्ती बोर्ड",
  },
  Teaching: {
    en: "Teacher Recruitment / Education Board",
    hi: "शिक्षक भर्ती / शिक्षा बोर्ड",
  },
  Defence: {
    en: "Defence Recruitment Authority",
    hi: "रक्षा भर्ती विभाग",
  },
  State: {
    en: "State Recruitment Commission",
    hi: "राज्य भर्ती आयोग",
  },
  Other: {
    en: "Official examining authority",
    hi: "आधिकारिक परीक्षा विभाग",
  },
};

const SELECTION: Record<Post["category"], { en: string; hi: string }> = {
  jobs: { en: "CBT / Written examination (as per official notice)", hi: "सीबीटी / लिखित परीक्षा (आधिकारिक नोटिस के अनुसार)" },
  results: { en: "Result / allotment as published by the authority", hi: "विभाग द्वारा जारी रिजल्ट / आवंटन" },
  "admit-card": { en: "Download e-admit card and appear at the allotted centre", hi: "ई-एडमिट कार्ड डाउनलोड कर आवंटित केंद्र पर परीक्षा दें" },
  "answer-key": { en: "Provisional / final key; objections as per notice", hi: "अनंतिम / अंतिम कुंजी; आपत्ति नोटिस के अनुसार" },
  syllabus: { en: "As per the official syllabus PDF", hi: "आधिकारिक सिलेबस पीडीएफ के अनुसार" },
  admission: { en: "Entrance test and/or online counselling", hi: "प्रवेश परीक्षा और/या ऑनलाइन काउंसलिंग" },
  scholarship: { en: "Online application and institute verification", hi: "ऑनलाइन आवेदन और संस्थान सत्यापन" },
  important: { en: "Online registration on the official portal", hi: "आधिकारिक पोर्टल पर ऑनलाइन पंजीकरण" },
};

export type DetailRow = { label: string; value: string; highlight?: boolean };

export type DetailModel = {
  organization: string;
  summary: string;
  timeline: DetailRow[];
  feeRows: { category: string; amount: string }[];
  feeNote: string;
  paymentModes: string[];
  ageMin: string;
  ageMax: string;
  ageNote: string;
  vacancies: string;
  examName: string;
  education: string;
  steps: string[];
  selectionMode: string;
  links: { label: string; href: string }[];
  faqs: { q: string; a: string }[];
};

function pick(lang: Lang, en: string, hi: string) {
  return lang === "hi" ? hi : en;
}

function splitSentences(text: string): string[] {
  return text
    .split(/(?<=\.)\s+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 8);
}

function parseFeeRows(post: Post, lang: Lang): { category: string; amount: string }[] {
  if (post.feeRows?.length) {
    return post.feeRows.map((r: FeeRow) => ({
      category: pick(lang, r.categoryEn, r.categoryHi),
      amount: r.amount,
    }));
  }
  const fee = post.fee.trim();
  if (!fee || fee === "—" || fee === "-") {
    return [{ category: messages[lang].allCategories, amount: messages[lang].na }];
  }
  const parts = fee.split("·").map((s) => s.trim()).filter(Boolean);
  return parts.map((part) => {
    const m = part.match(/^(.*?)\s*[:–-]?\s*(₹[\d,]+\/?-?|Rs\.?\s*[\d,]+\/?-?|Nil|Free|—)\s*(.*)$/i);
    if (m) {
      return { category: m[1].replace(/:$/, "").trim() || messages[lang].allCategories, amount: m[2] };
    }
    return { category: messages[lang].allCategories, amount: part };
  });
}

function parseAge(post: Post, lang: Lang): { min: string; max: string; note: string } {
  if (post.ageMin || post.ageMax) {
    return {
      min: post.ageMin ?? messages[lang].na,
      max: post.ageMax ?? messages[lang].na,
      note: pick(lang, post.ageNoteEn ?? "", post.ageNoteHi ?? post.ageNoteEn ?? ""),
    };
  }
  const raw = post.ageLimit;
  if (!raw || raw === "—") {
    return { min: messages[lang].na, max: messages[lang].na, note: "" };
  }
  const range = raw.match(/(\d+)\s*[–-]\s*(\d+)/);
  if (range) {
    return { min: `${range[1]} ${lang === "hi" ? "वर्ष" : "Years"}`, max: `${range[2]} ${lang === "hi" ? "वर्ष" : "Years"}`, note: raw };
  }
  const minOnly = raw.match(/(\d+)\s*(years|वर्ष)/i);
  if (minOnly && /minimum|min|न्यूनतम/i.test(raw)) {
    return { min: `${minOnly[1]} ${lang === "hi" ? "वर्ष" : "Years"}`, max: messages[lang].na, note: raw };
  }
  return { min: raw, max: messages[lang].na, note: raw };
}

function defaultTimeline(post: Post, lang: Lang): DetailRow[] {
  if (post.timeline?.length) {
    return post.timeline.map((e: TimelineEvent) => ({
      label: pick(lang, e.labelEn, e.labelHi),
      value: pick(lang, e.valueEn, e.valueHi ?? e.valueEn),
      highlight: e.highlight,
    }));
  }
  const t = messages[lang];
  const rows: DetailRow[] = [];
  if (post.dates.start) {
    rows.push({ label: t.applyStart, value: formatDate(post.dates.start, lang) });
  }
  if (post.dates.last) {
    rows.push({ label: t.applyLast, value: formatDate(post.dates.last, lang) });
    rows.push({ label: t.payLast, value: formatDate(post.dates.last, lang) });
  }
  if (post.dates.exam) {
    rows.push({ label: t.admitCardDate, value: t.asPerNotice });
    rows.push({ label: t.examDate, value: formatDate(post.dates.exam, lang) });
  }
  if (post.dates.result) {
    rows.push({
      label: t.resultDate,
      value: formatDate(post.dates.result, lang),
      highlight: post.status === "result-out",
    });
  }
  if (rows.length === 0) {
    rows.push({ label: t.latestUpdate, value: formatDate(post.publishedAt, lang) });
  }
  return rows;
}

function defaultLinks(post: Post, lang: Lang): { label: string; href: string }[] {
  if (post.links?.length) {
    return post.links.map((l: UsefulLink) => ({
      label: pick(lang, l.labelEn, l.labelHi),
      href: l.href,
    }));
  }
  const t = messages[lang];
  const primary =
    post.category === "results"
      ? t.checkResultLink
      : post.category === "admit-card"
        ? t.downloadAdmitLink
        : post.category === "jobs" || post.category === "admission" || post.category === "scholarship"
          ? t.applyOnlineLink
          : t.officialNotification;
  return [
    { label: primary, href: post.officialUrl },
    { label: t.officialNotification, href: post.officialUrl },
    { label: t.officialLink, href: post.officialUrl },
  ];
}

function defaultFaqs(post: Post, lang: Lang, organization: string): { q: string; a: string }[] {
  if (post.faqs?.length) {
    return post.faqs.map((f: FaqItem) => ({
      q: pick(lang, f.qEn, f.qHi),
      a: pick(lang, f.aEn, f.aHi),
    }));
  }
  const title = pick(lang, post.titleEn, post.titleHi);
  const last = post.dates.last ? formatDate(post.dates.last, lang) : messages[lang].asPerNotice;
  if (lang === "hi") {
    return [
      {
        q: `${title} कौन जारी करता है?`,
        a: `${organization} यह सूचना अपनी आधिकारिक वेबसाइट पर जारी करता है। शरकारी गुरु केवल जानकारी दिखाता है।`,
      },
      {
        q: "आवेदन या डाउनलोड की अंतिम तिथि क्या है?",
        a: `नोटिस के अनुसार अंतिम तिथि ${last} है। हमेशा आधिकारिक पोर्टल पर जाँचें।`,
      },
      {
        q: "आगे क्या करना है?",
        a: pick("hi", post.howToEn, post.howToHi),
      },
      {
        q: "आधिकारिक वेबसाइट कौन सी है?",
        a: `आधिकारिक लिंक: ${post.officialUrl}`,
      },
    ];
  }
  return [
    {
      q: `Who publishes ${title}?`,
      a: `${organization} publishes this notice on its official website. Sharkari Guru only summarises public information.`,
    },
    {
      q: "What is the last date?",
      a: `As on this page, the last date is ${last}. Always confirm on the official portal before you pay or apply.`,
    },
    {
      q: "How do I apply or download?",
      a: post.howToEn,
    },
    {
      q: "What is the official website?",
      a: `Use ${post.officialUrl} — do not apply through Sharkari Guru.`,
    },
  ];
}

export function getDetailModel(post: Post, lang: Lang): DetailModel {
  const organization =
    pick(lang, post.organizationEn ?? "", post.organizationHi ?? "") ||
    pick(lang, ORG[post.examBody].en, ORG[post.examBody].hi);
  const title = pick(lang, post.titleEn, post.titleHi);
  const summary =
    pick(lang, post.summaryEn ?? "", post.summaryHi ?? "") ||
    (lang === "hi"
      ? `${organization} ने «${title}» जारी किया है। नीचे तिथियाँ, शुल्क, पात्रता और आधिकारिक लिंक एक जगह हैं। आवेदन या डाउनलोड केवल सरकारी साइट पर करें।`
      : `${organization} has published “${title}”. Dates, fees, eligibility, and official links are below. Apply or download only on the government website.`);

  const age = parseAge(post, lang);
  const t = messages[lang];

  return {
    organization,
    summary,
    timeline: defaultTimeline(post, lang),
    feeRows: parseFeeRows(post, lang),
    feeNote:
      pick(lang, post.feeNoteEn ?? "", post.feeNoteHi ?? "") || t.feeNoteGst,
    paymentModes:
      (lang === "hi" ? post.paymentModesHi : post.paymentModesEn) ??
      post.paymentModesEn ??
      (lang === "hi"
        ? ["डेबिट कार्ड", "क्रेडिट कार्ड", "नेट बैंकिंग", "यूपीआई"]
        : ["Debit Card", "Credit Card", "Internet Banking", "UPI"]),
    ageMin: age.min,
    ageMax: age.max,
    ageNote: age.note,
    vacancies: post.vacancies ? post.vacancies.toLocaleString("en-IN") : t.na,
    examName: title,
    education: pick(lang, post.eligibilityEn, post.eligibilityHi),
    steps:
      (lang === "hi" ? post.howToStepsHi : post.howToStepsEn) ??
      splitSentences(pick(lang, post.howToEn, post.howToHi)),
    selectionMode:
      pick(lang, post.selectionModeEn ?? "", post.selectionModeHi ?? "") ||
      pick(lang, SELECTION[post.category].en, SELECTION[post.category].hi),
    links: defaultLinks(post, lang),
    faqs: defaultFaqs(post, lang, organization),
  };
}
