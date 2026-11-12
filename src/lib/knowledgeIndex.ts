// Unified searchable knowledge index for SHAMS chatbot + smart search.
// Aggregates from content/*.json plus curated static entries.
// Everything the chatbot links to must resolve to an approved route.

import studies from "../../content/studies.json";
import webinars from "../../content/webinars.json";
import faq from "../../content/faq.json";
import routes from "../../content/chatbot-routes.json";
import { isApprovedInternalUrl, isMailtoOrTel, isSafeExternalUrl } from "./chatbotRoutes";
import { NEWCOMER_WORKSHOP } from "./newcomerWorkshop";
import { MATCH_POINTS, matchWord, toWords } from "./searchText";

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
  /** Last day (YYYY-MM-DD, Toronto) this item may be recommended, for time-limited events. */
  activeUntil?: string;
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
  opportunity: ["role", "position", "opportunities", "فرصة", "فرص"],
  volunteer: ["volunteering", "volunteers", "get involved", "تطوع", "متطوع"],
  event: ["events", "upcoming", "next", "happening", "workshop", "فعالية", "فعاليات", "ورشة"],
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
    description_en: "Send the SHAMS team a message with the contact form.",
    description_ar: "أرسل رسالة إلى فريق شمس عبر نموذج التواصل.",
    category: "pages",
    tags: ["contact", "email", "form"],
    keywords: ["contact", "email", "reach", "form", "message", "تواصل", "بريد", "نموذج", "رسالة"],
    language: "both",
    url: approvedRoutes.contact_general,
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
  {
    id: "newcomer-workshop",
    title_en: `${NEWCOMER_WORKSHOP.en.title} (${NEWCOMER_WORKSHOP.en.date}, ${NEWCOMER_WORKSHOP.en.time})`,
    title_ar: `${NEWCOMER_WORKSHOP.ar.title} (${NEWCOMER_WORKSHOP.ar.date}، ${NEWCOMER_WORKSHOP.ar.time})`,
    description_en: `Upcoming SHAMS event at ${NEWCOMER_WORKSHOP.en.place}. ${NEWCOMER_WORKSHOP.en.summary} Free registration: ${NEWCOMER_WORKSHOP.registerUrl}`,
    description_ar: `فعالية قادمة من شمس في ${NEWCOMER_WORKSHOP.ar.place}. ${NEWCOMER_WORKSHOP.ar.summary} التسجيل مجاني: ${NEWCOMER_WORKSHOP.registerUrl}`,
    category: "programs",
    tags: ["event", "upcoming", "workshop", "newcomer", "refugee"],
    keywords: ["event", "upcoming", "next", "happening", "workshop", "newcomer", "refugee", "scadding", "ohip", "ifhp", "register", "فعالية", "ورشة", "لاجئ", "قادم"],
    language: "both",
    url: approvedRoutes.newcomer_initiative,
    activeUntil: NEWCOMER_WORKSHOP.dateIso,
  },
  {
    id: "newcomer-initiative",
    title_en: "Newcomer and Refugee Health Education Initiative",
    title_ar: "مبادرة التثقيف الصحي للقادمين الجدد واللاجئين",
    description_en: "A SHAMS initiative that helps newcomers and refugees understand OHIP and IFHP coverage, find a family doctor or clinic, and get help in their language.",
    description_ar: "مبادرة من شمس تساعد القادمين الجدد واللاجئين على فهم تغطية OHIP وIFHP وإيجاد طبيب أسرة أو عيادة والحصول على المساعدة بلغتهم.",
    category: "programs",
    tags: ["newcomer", "refugee", "initiative"],
    keywords: ["newcomer", "refugee", "immigrant", "initiative", "ohip", "ifhp", "settlement", "لاجئ", "قادم", "مبادرة"],
    language: "both",
    url: approvedRoutes.newcomer_initiative,
  },
  {
    id: "directory-map",
    title_en: "Healthcare Directory with Map",
    title_ar: "دليل مقدمي الرعاية مع الخريطة",
    description_en: "See every SHAMS directory listing on a map and filter by city, province, provider type, and accepting new patients.",
    description_ar: "اعرض جميع قوائم دليل شمس على الخريطة وصفِّ حسب المدينة والمقاطعة ونوع مقدم الرعاية وقبول مرضى جدد.",
    category: "healthcare_workers",
    tags: ["directory", "map"],
    keywords: ["directory", "map", "listing", "provider", "دليل", "خريطة"],
    language: "both",
    url: approvedRoutes.directory_map,
  },
  {
    id: "physician-apply",
    title_en: "Join the SHAMS Healthcare Directory (for providers)",
    title_ar: "انضم إلى دليل شمس (لمقدمي الرعاية)",
    description_en: "Healthcare providers can apply to be listed in the SHAMS directory. New listings appear only after SHAMS reviews and approves them.",
    description_ar: "يمكن لمقدمي الرعاية التقدم لإدراجهم في دليل شمس. لا تظهر القوائم الجديدة إلا بعد أن تراجعها شمس وتوافق عليها.",
    category: "healthcare_workers",
    tags: ["provider", "listing", "apply"],
    keywords: ["listed", "listing", "apply", "join directory", "provider", "physician", "doctor", "إدراج", "انضم"],
    language: "both",
    url: approvedRoutes.physician_apply,
  },
  {
    id: "post-opportunity",
    title_en: "Submit a Research Opportunity (for researchers)",
    title_ar: "أرسل فرصة بحثية (للباحثين)",
    description_en: "Researchers can submit a study or opportunity. SHAMS reviews each one before it appears on the Research Opportunities list.",
    description_ar: "يمكن للباحثين إرسال دراسة أو فرصة. تراجع شمس كل طلب قبل نشره في قائمة الفرص البحثية.",
    category: "programs",
    tags: ["researcher", "submit", "post"],
    keywords: ["submit", "post", "researcher", "recruit", "participants", "study", "listing", "أرسل", "باحث"],
    language: "both",
    url: approvedRoutes.post_opportunity,
  },
  {
    id: "mental-health-convention-recap",
    title_en: "SHAMS Mental Health Convention (past event, July 18, 2026)",
    title_ar: "مؤتمر شمس للصحة النفسية (فعالية سابقة، 18 يوليو 2026)",
    description_en: "This event has already taken place at the University of Toronto Mississauga. Registration is closed. Visitors can watch the recap on the Programs page.",
    description_ar: "أُقيمت هذه الفعالية بالفعل في جامعة تورنتو ميسيساغا. التسجيل مغلق. يمكن مشاهدة ملخص المؤتمر في صفحة البرامج.",
    category: "programs",
    tags: ["event", "past", "convention", "recap"],
    keywords: ["convention", "mental health convention", "stigma", "recap", "register", "sign up", "registration", "مؤتمر", "وصمة", "ملخص"],
    language: "both",
    url: approvedRoutes.mental_health_convention,
  },
  {
    id: "volunteer",
    title_en: "Volunteer with SHAMS",
    title_ar: "تطوّع مع شمس",
    description_en: "Apply to volunteer with SHAMS through the volunteer application form.",
    description_ar: "قدّم طلب التطوع مع شمس عبر نموذج التطوع.",
    category: "pages",
    tags: ["volunteer"],
    keywords: ["volunteer", "volunteering", "help", "join", "تطوع", "متطوع"],
    language: "both",
    url: approvedRoutes.volunteer,
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
  url: approvedRoutes[`webinar_${w.id.replace(/-/g, "_")}`] ?? approvedRoutes.recordings,
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

// Common words that match almost every entry and drown out the real topic.
const STOPWORDS = new Set(
  [
    "a", "an", "and", "are", "at", "be", "can", "do", "does", "for", "from", "get", "how", "i", "if", "in",
    "is", "it", "me", "my", "need", "of", "on", "or", "please", "the", "there", "to", "want", "what", "where",
    "which", "who", "with", "you", "your", "shams", "any", "some", "about", "find", "looking", "s",
    "في", "من", "على", "إلى", "الى", "عن", "أن", "ان", "هل", "ما", "ماذا", "أين", "كيف", "أريد", "اريد",
    "أحتاج", "احتاج", "لي", "مع", "شمس",
  ].flatMap(toWords)
);

/** Query words without stopwords (normalized + Arabic article stripped). */
export function queryWords(query: string): string[] {
  return toWords(query).filter((w) => w.length > 1 && !STOPWORDS.has(w));
}

// Synonym groups as normalized single words, so "نفسية" and "نفسيه" hit the same group.
// Multi-word synonyms ("mental health") are left out: splitting them would turn
// generic words like "health" into synonyms of everything.
const synonymGroups: string[][] = Object.entries(synonyms).map(([key, syns]) =>
  Array.from(
    new Set(
      [key, ...syns]
        .map(toWords)
        .filter((w) => w.length === 1)
        .map((w) => w[0])
    )
  )
);

/** Extra words implied by synonyms (excluding the words already typed). */
export function synonymWords(words: string[]): string[] {
  const typed = new Set(words);
  const out = new Set<string>();
  for (const group of synonymGroups) {
    if (group.some((g) => typed.has(g))) group.forEach((g) => !typed.has(g) && out.add(g));
  }
  return Array.from(out);
}

interface IndexedItem {
  item: KnowledgeItem;
  primary: string[];
  secondary: string[];
}

let indexed: IndexedItem[] | null = null;
function getIndexed(): IndexedItem[] {
  if (!indexed) {
    indexed = knowledgeIndex.map((item) => ({
      item,
      primary: Array.from(
        new Set(toWords([item.title_en, item.title_ar, ...(item.tags ?? []), ...(item.keywords ?? [])].join(" ")))
      ),
      secondary: Array.from(new Set(toWords(`${item.description_en} ${item.description_ar}`))),
    }));
  }
  return indexed;
}

function wordScore(word: string, entry: IndexedItem): number {
  const p = matchWord(word, entry.primary);
  if (p) return MATCH_POINTS[p];
  const s = matchWord(word, entry.secondary);
  return s ? MATCH_POINTS[s] * 0.6 : 0;
}

export interface SearchResult {
  item: KnowledgeItem;
  score: number;
}

export function searchKnowledge(query: string, language: "en" | "ar" = "en", limit = 8): SearchResult[] {
  if (!query.trim()) return [];
  const words = queryWords(query);
  if (words.length === 0) return [];
  const extra = synonymWords(words);

  const torontoToday = new Date().toLocaleDateString("en-CA", { timeZone: "America/Toronto" });
  return getIndexed()
    .filter(({ item }) => !item.activeUntil || torontoToday <= item.activeUntil)
    .map((entry) => {
      let score = 0;
      for (const w of words) score += wordScore(w, entry);
      for (const w of extra) score += wordScore(w, entry) * 0.75;
      // small boost for language-matching content, only for real matches
      if (score > 0 && (entry.item.language === language || entry.item.language === "both")) score += 0.5;
      return { item: entry.item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);
}

// Single validator shared with the chatbot so search results, quick replies and
// recommended links can never diverge from the approved route map.
export function isApprovedUrl(url: string): boolean {
  if (!url) return false;
  if (isSafeExternalUrl(url) || isMailtoOrTel(url)) return true;
  return isApprovedInternalUrl(url);
}
