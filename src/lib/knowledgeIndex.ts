// Unified searchable knowledge index for SHAMS chatbot + smart search.
// Aggregates from content/*.json plus curated static entries.
// Everything the chatbot links to must resolve to an approved route.

import studies from "../../content/studies.json";
import webinars from "../../content/webinars.json";
import faq from "../../content/faq.json";
import routes from "../../content/chatbot-routes.json";

export type KnowledgeCategory =
  | "resources"
  | "programs"
  | "studies"
  | "webinars"
  | "healthcare_workers"
  | "researchers"
  | "community_services"
  | "patient_rights"
  | "faq"
  | "pages";

export interface KnowledgeItem {
  id: string;
  title_en: string;
  title_ar: string;
  description_en: string;
  description_ar: string;
  category: KnowledgeCategory;
  tags: string[];
  keywords: string[];
  language: "en" | "ar" | "both";
  url: string;
  source?: string;
  type?: string;
}

export const approvedRoutes: Record<string, string> = routes as Record<string, string>;

// Synonyms for typo-tolerant / natural language matching
export const synonyms: Record<string, string[]> = {
  doctor: ["physician", "gp", "family doctor", "clinician", "طبيب", "دكتور"],
  therapist: ["counselor", "counsellor", "psychologist", "psychiatrist", "معالج"],
  diabetes: ["blood sugar", "glucose", "insulin", "a1c", "سكري", "سكر"],
  cancer: ["oncology", "tumor", "chemo", "chemotherapy", "سرطان"],
  heart: ["cardio", "cardiac", "cardiovascular", "ekg", "ecg", "قلب"],
  mental: ["mental health", "anxiety", "depression", "stress", "psychiatry", "نفسية", "قلق", "اكتئاب"],
  webinar: ["recording", "video", "watch", "seminar", "workshop", "ندوة", "تسجيل"],
  research: ["study", "trial", "survey", "بحث", "دراسة"],
  opportunity: ["volunteer", "role", "position", "opportunities", "فرصة", "فرص"],
  refugee: ["newcomer", "immigrant", "ifhp", "asylum", "لاجئ", "قادم جديد"],
  rights: ["ohip", "insurance", "coverage", "advocacy", "حقوق"],
  contact: ["email", "reach", "message", "تواصل"],
  arabic: ["ar", "عربي", "بالعربية"],
};

// Static curated entries for high-level pages, patient rights, community services.
const curated: KnowledgeItem[] = [
  {
    id: "patient-rights",
    title_en: "Patient Rights",
    title_ar: "حقوق المريض",
    description_en: "Your rights when receiving care in Ontario, including OHIP, Ontario Health atHome, and language access.",
    description_ar: "حقوقك عند تلقي الرعاية في أونتاريو، بما في ذلك OHIP وخدمات الصحة المنزلية والوصول اللغوي.",
    category: "patient_rights",
    tags: ["rights", "ohip", "ontario"],
    keywords: ["rights", "ohip", "insurance", "advocacy", "حقوق", "المريض"],
    language: "both",
    url: approvedRoutes.patient_rights,
  },
  {
    id: "community-services",
    title_en: "Community Services",
    title_ar: "خدمات المجتمع",
    description_en: "Local community services, refugee support, and settlement resources for MENA societies.",
    description_ar: "خدمات المجتمع المحلية ودعم اللاجئين وموارد الاستقرار لمجتمعات الشرق الأوسط وشمال أفريقيا.",
    category: "community_services",
    tags: ["community", "refugee", "newcomer", "settlement"],
    keywords: ["community", "refugee", "newcomer", "settlement", "لاجئ", "مجتمع"],
    language: "both",
    url: approvedRoutes.community_services,
  },
  {
    id: "arabic-resources",
    title_en: "Arabic Health Resources",
    title_ar: "الموارد الصحية بالعربية",
    description_en: "Curated Arabic health resources including MedlinePlus on diabetes, heart, mental health, vaccines, and safety.",
    description_ar: "موارد صحية عربية مختارة تشمل MedlinePlus عن السكري والقلب والصحة النفسية واللقاحات والسلامة.",
    category: "resources",
    tags: ["arabic", "medlineplus", "resources"],
    keywords: ["arabic", "medlineplus", "diabetes", "heart", "mental", "vaccines", "عربي", "موارد"],
    language: "ar",
    url: approvedRoutes.resources,
    source: "MedlinePlus",
  },
  {
    id: "family-physicians",
    title_en: "Family Physicians by City",
    title_ar: "أطباء العائلة حسب المدينة",
    description_en: "Browse family physicians across Ontario cities including Toronto, Mississauga, Ottawa, Kitchener, and London.",
    description_ar: "تصفح أطباء العائلة في مدن أونتاريو بما في ذلك تورونتو وميسيسوغا وأوتاوا وكيتشنر ولندن.",
    category: "healthcare_workers",
    tags: ["family doctor", "gp", "primary care", "city"],
    keywords: ["family", "doctor", "gp", "city", "kitchener", "toronto", "ottawa", "طبيب عائلة"],
    language: "both",
    url: approvedRoutes.family_physicians,
  },
  {
    id: "browse-by-city",
    title_en: "Browse Healthcare Workers by City",
    title_ar: "تصفح مقدمي الرعاية حسب المدينة",
    description_en: "Find healthcare workers in your Canadian city.",
    description_ar: "ابحث عن مقدمي الرعاية الصحية في مدينتك الكندية.",
    category: "healthcare_workers",
    tags: ["city", "directory"],
    keywords: ["city", "browse", "kitchener", "toronto", "ottawa", "mississauga", "london", "مدينة"],
    language: "both",
    url: approvedRoutes.browse_by_city,
  },
  {
    id: "research-opportunities",
    title_en: "Research Opportunities",
    title_ar: "الفرص البحثية",
    description_en: "Submit or explore research opportunities with SHAMS.",
    description_ar: "قدم أو استكشف الفرص البحثية مع شمس.",
    category: "programs",
    tags: ["research", "opportunity", "volunteer"],
    keywords: ["research", "opportunity", "opportunities", "volunteer", "submit", "فرصة", "بحث"],
    language: "both",
    url: approvedRoutes.research_opportunities,
  },
  {
    id: "researchers",
    title_en: "Affiliated Researchers",
    title_ar: "الباحثون المنتسبون",
    description_en: "Meet SHAMS affiliated researchers and their work.",
    description_ar: "تعرف على الباحثين المنتسبين لشمس وأعمالهم.",
    category: "researchers",
    tags: ["researchers", "team"],
    keywords: ["researcher", "researchers", "team", "affiliated", "باحث", "باحثون"],
    language: "both",
    url: approvedRoutes.researchers,
  },
  {
    id: "mentorship",
    title_en: "Mentorship Program",
    title_ar: "برنامج الإرشاد",
    description_en: "Connect with healthcare mentors through the SHAMS mentorship program.",
    description_ar: "تواصل مع مرشدين في الرعاية الصحية عبر برنامج شمس للإرشاد.",
    category: "programs",
    tags: ["mentorship", "students"],
    keywords: ["mentor", "mentorship", "student", "إرشاد"],
    language: "both",
    url: approvedRoutes.mentorship,
  },
  {
    id: "contact",
    title_en: "Contact SHAMS",
    title_ar: "تواصل مع شمس",
    description_en: "Reach the SHAMS team at infoprojectshams@gmail.com.",
    description_ar: "تواصل مع فريق شمس عبر infoprojectshams@gmail.com.",
    category: "pages",
    tags: ["contact", "email"],
    keywords: ["contact", "email", "reach", "تواصل", "بريد"],
    language: "both",
    url: approvedRoutes.contact,
  },
  {
    id: "about",
    title_en: "About SHAMS",
    title_ar: "عن شمس",
    description_en: "Learn about SHAMS mission, team, and impact.",
    description_ar: "تعرف على رسالة شمس وفريقها وأثرها.",
    category: "pages",
    tags: ["about", "mission"],
    keywords: ["about", "mission", "team", "عن"],
    language: "both",
    url: approvedRoutes.about,
  },
];

interface StudyRaw {
  id: string;
  titleEn: string;
  titleAr: string;
  summaryEn: string;
  summaryAr: string;
  linkUrl?: string;
  tags?: { labelEn: string; labelAr: string }[];
}

const studyItems: KnowledgeItem[] = (studies as StudyRaw[]).map((s) => ({
  id: `study-${s.id}`,
  title_en: s.titleEn,
  title_ar: s.titleAr,
  description_en: s.summaryEn,
  description_ar: s.summaryAr,
  category: "studies",
  tags: (s.tags ?? []).map((t) => t.labelEn),
  keywords: [
    s.titleEn.toLowerCase(),
    ...(s.tags ?? []).flatMap((t) => [t.labelEn.toLowerCase(), t.labelAr]),
    "study",
    "research",
    "دراسة",
  ],
  language: "both",
  url: approvedRoutes.research_studies,
}));

interface WebinarRaw {
  id: string;
  en: { title: string; description: string };
  ar: { title: string; description: string };
  tags?: string[];
}

const webinarItems: KnowledgeItem[] = (webinars as WebinarRaw[]).map((w) => ({
  id: `webinar-${w.id}`,
  title_en: w.en.title,
  title_ar: w.ar.title,
  description_en: w.en.description.slice(0, 240),
  description_ar: w.ar.description.slice(0, 240),
  category: "webinars",
  tags: w.tags ?? [],
  keywords: [
    ...(w.tags ?? []).map((t) => t.toLowerCase()),
    "webinar",
    "recording",
    "ندوة",
    w.en.title.toLowerCase(),
  ],
  language: "both",
  url: approvedRoutes.recordings,
}));

interface FaqRaw {
  id: string;
  questionEn: string;
  questionAr: string;
  answerEn: string;
  answerAr: string;
  category: string;
}

const faqItems: KnowledgeItem[] = (faq as FaqRaw[]).map((f) => ({
  id: `faq-${f.id}`,
  title_en: f.questionEn,
  title_ar: f.questionAr,
  description_en: f.answerEn.slice(0, 240),
  description_ar: f.answerAr.slice(0, 240),
  category: "faq",
  tags: [f.category],
  keywords: [f.category, f.questionEn.toLowerCase(), "faq"],
  language: "both",
  url: approvedRoutes.faq,
}));

export const knowledgeIndex: KnowledgeItem[] = [
  ...curated,
  ...studyItems,
  ...webinarItems,
  ...faqItems,
];

// Very small Levenshtein for typo tolerance on short tokens
function editDistance(a: string, b: string): number {
  if (Math.abs(a.length - b.length) > 2) return 3;
  const dp: number[] = Array(b.length + 1)
    .fill(0)
    .map((_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    let prev = i - 1;
    dp[0] = i;
    for (let j = 1; j <= b.length; j++) {
      const tmp = dp[j];
      dp[j] = a[i - 1] === b[j - 1] ? prev : Math.min(prev, dp[j], dp[j - 1]) + 1;
      prev = tmp;
    }
  }
  return dp[b.length];
}

function expandTokens(tokens: string[]): string[] {
  const out = new Set(tokens);
  for (const t of tokens) {
    for (const [key, syns] of Object.entries(synonyms)) {
      if (t === key || syns.includes(t)) {
        out.add(key);
        syns.forEach((s) => out.add(s));
      }
    }
  }
  return Array.from(out);
}

function tokenize(q: string): string[] {
  return q
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

export interface SearchResult {
  item: KnowledgeItem;
  score: number;
}

export function searchKnowledge(query: string, language: "en" | "ar" = "en", limit = 8): SearchResult[] {
  if (!query.trim()) return [];
  const rawTokens = tokenize(query);
  const tokens = expandTokens(rawTokens);

  const results: SearchResult[] = knowledgeIndex.map((item) => {
    const haystack = [
      item.title_en,
      item.title_ar,
      item.description_en,
      item.description_ar,
      ...(item.tags ?? []),
      ...(item.keywords ?? []),
    ]
      .join(" ")
      .toLowerCase();

    let score = 0;
    for (const t of tokens) {
      if (!t) continue;
      if (haystack.includes(t)) {
        score += 3;
      } else {
        // fuzzy token match
        for (const kw of item.keywords) {
          if (kw.length > 3 && editDistance(t, kw) <= 1) {
            score += 1.5;
            break;
          }
        }
      }
    }
    // small boost for language-matching content
    if (item.language === language || item.language === "both") score += 0.5;
    return { item, score };
  });

  return results
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

export function isApprovedUrl(url: string): boolean {
  if (!url) return false;
  if (url.startsWith("http")) return true; // external links from content are allowed
  return Object.values(approvedRoutes).some((r) => r === url || url.startsWith(r + "?") || url === r);
}
