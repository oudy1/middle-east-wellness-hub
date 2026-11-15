// "How Can We Help You?" guided navigator on the Services page.
//
// Internal links are route keys from content/chatbot-routes.json (the same
// approved address list the chatbot and site search use), so the navigator
// can never point at an invented page. External links are limited to
// official government sources.

import { approvedRouteMap } from "./chatbotRoutes";

export type HelpLink = {
  id: string;
  /** Key in content/chatbot-routes.json, for links inside the site. */
  routeKey?: string;
  /** Official outside page (government only). */
  externalUrl?: string;
  en: string;
  ar: string;
  descEn: string;
  descAr: string;
};

export type HelpTopic = {
  id: string;
  en: string;
  ar: string;
  links: HelpLink[];
};

export const OFFICIAL_EXTERNAL_HOSTS = ["www.ontario.ca", "www.canada.ca"];

export const HELP_TOPICS: HelpTopic[] = [
  {
    id: "health-info",
    en: "I need healthcare information",
    ar: "أحتاج إلى معلومات صحية",
    links: [
      { id: "materials", routeKey: "educational_materials", en: "Health guides in Arabic and English", ar: "أدلة صحية بالعربية والإنجليزية", descEn: "Reviewed handouts and MedlinePlus Arabic topics.", descAr: "مواد مراجعة وموضوعات MedlinePlus باللغة العربية." },
      { id: "mental-health", routeKey: "mental_health", en: "Mental health support", ar: "دعم الصحة النفسية", descEn: "Arabic resources and where to get help.", descAr: "موارد بالعربية وأماكن الحصول على المساعدة." },
      { id: "diabetes", routeKey: "diabetes", en: "Diabetes education", ar: "التثقيف حول السكري", descEn: "Living well with diabetes.", descAr: "التعايش الصحي مع السكري." },
      { id: "glossary", routeKey: "glossary", en: "Arabic-English medical glossary", ar: "مسرد المصطلحات الطبية عربي-إنجليزي", descEn: "Common health words explained simply.", descAr: "شرح مبسط لمصطلحات صحية شائعة." },
      { id: "urgent", routeKey: "emergency_help", en: "Need help quickly?", ar: "هل تحتاج مساعدة سريعة؟", descEn: "Emergency 911 and crisis line 988.", descAr: "الطوارئ 911 وخط الأزمات 988." },
    ],
  },
  {
    id: "newcomer",
    en: "I am new to Canada",
    ar: "أنا جديد في كندا",
    links: [
      { id: "ohip", externalUrl: "https://www.ontario.ca/page/apply-ohip-and-get-health-card", en: "Understanding OHIP (Ontario health card)", ar: "فهم تأمين OHIP (البطاقة الصحية في أونتاريو)", descEn: "Official Ontario page: who qualifies and how to apply.", descAr: "صفحة حكومة أونتاريو الرسمية: من يحق له التقديم وكيف." },
      { id: "ifhp", externalUrl: "https://www.canada.ca/en/immigration-refugees-citizenship/services/refugees/help-within-canada/health-care/interim-federal-health-program.html", en: "Understanding IFHP (refugee health coverage)", ar: "فهم برنامج IFHP (التغطية الصحية للاجئين)", descEn: "Official Government of Canada page.", descAr: "صفحة حكومة كندا الرسمية." },
      { id: "family-doctor", externalUrl: "https://www.ontario.ca/page/find-family-doctor-or-nurse-practitioner", en: "Finding a family doctor", ar: "البحث عن طبيب أسرة", descEn: "Official Ontario page about Health Care Connect.", descAr: "صفحة حكومة أونتاريو الرسمية حول برنامج Health Care Connect." },
      { id: "rights", routeKey: "patient_rights", en: "Your patient rights", ar: "حقوقك كمريض", descEn: "Your rights when receiving care in Ontario.", descAr: "حقوقك عند تلقي الرعاية في أونتاريو." },
      { id: "newcomer-education", routeKey: "newcomer_initiative", en: "Newcomer health education workshops", ar: "ورش التثقيف الصحي للقادمين الجدد", descEn: "SHAMS Newcomer and Refugee Health Education Initiative.", descAr: "مبادرة شمس للتثقيف الصحي للقادمين الجدد واللاجئين." },
    ],
  },
  {
    id: "healthcare-worker",
    en: "I am looking for a healthcare worker",
    ar: "أبحث عن مقدم رعاية صحية",
    links: [
      { id: "find", routeKey: "healthcare_workers", en: "Find healthcare workers", ar: "ابحث عن مقدمي الرعاية الصحية", descEn: "Search by city, language and type of care.", descAr: "ابحث حسب المدينة واللغة ونوع الرعاية." },
      { id: "family-physicians", routeKey: "family_physicians", en: "Family physicians", ar: "أطباء الأسرة", descEn: "Listings reviewed by SHAMS.", descAr: "قوائم راجعتها شمس." },
      { id: "by-city", routeKey: "browse_by_city", en: "Browse by city", ar: "تصفح حسب المدينة", descEn: "See which cities have listings.", descAr: "اعرف المدن التي تتوفر فيها قوائم." },
      { id: "map", routeKey: "directory_map", en: "Directory map", ar: "خريطة الدليل", descEn: "See providers on a map.", descAr: "شاهد مقدمي الرعاية على الخريطة." },
    ],
  },
  {
    id: "program",
    en: "I want to join a program",
    ar: "أريد الانضمام إلى برنامج",
    links: [
      { id: "programs", routeKey: "programs", en: "All SHAMS programs", ar: "جميع برامج شمس", descEn: "What is running now.", descAr: "البرامج الجارية حالياً." },
      { id: "mentorship", routeKey: "mentorship", en: "Mentorship program", ar: "برنامج الإرشاد", descEn: "Students connect with health professionals.", descAr: "تواصل الطلاب مع المهنيين الصحيين." },
      { id: "newcomer", routeKey: "newcomer_initiative", en: "Newcomer health education", ar: "التثقيف الصحي للقادمين الجدد", descEn: "Workshops for newcomers and refugees.", descAr: "ورش للقادمين الجدد واللاجئين." },
      { id: "volunteer", routeKey: "volunteer", en: "Volunteer with SHAMS", ar: "تطوع مع شمس", descEn: "Sign up through our volunteer form.", descAr: "سجّل عبر نموذج التطوع." },
    ],
  },
  {
    id: "research",
    en: "I am interested in research",
    ar: "أنا مهتم بالبحث العلمي",
    links: [
      { id: "studies", routeKey: "research_studies", en: "Research studies", ar: "الدراسات البحثية", descEn: "Studies SHAMS supports.", descAr: "دراسات تدعمها شمس." },
      { id: "opportunities", routeKey: "research_opportunities", en: "Research opportunities", ar: "الفرص البحثية", descEn: "Open positions reviewed by SHAMS.", descAr: "فرص متاحة راجعتها شمس." },
      { id: "researchers", routeKey: "researchers", en: "Affiliated researchers", ar: "الباحثون المتعاونون", descEn: "Researchers who work with SHAMS.", descAr: "باحثون يعملون مع شمس." },
      { id: "publications", routeKey: "publications", en: "Publications and abstracts", ar: "المنشورات والملخصات", descEn: "SHAMS research output.", descAr: "الإنتاج البحثي لشمس." },
    ],
  },
  {
    id: "webinars",
    en: "I want to watch educational webinars",
    ar: "أريد مشاهدة ندوات تثقيفية",
    links: [
      { id: "all", routeKey: "recordings", en: "All webinar recordings", ar: "جميع تسجيلات الندوات", descEn: "Watch past SHAMS webinars.", descAr: "شاهد ندوات شمس السابقة." },
      { id: "rights", routeKey: "webinar_know_your_rights", en: "Know Your Rights", ar: "اعرف حقوقك", descEn: "Patient rights in Ontario.", descAr: "حقوق المرضى في أونتاريو." },
      { id: "womens", routeKey: "webinar_womens_health", en: "Women's health", ar: "صحة المرأة", descEn: "Webinar recording.", descAr: "تسجيل الندوة." },
      { id: "nutrition", routeKey: "webinar_nutrition_diabetes", en: "Nutrition and diabetes", ar: "التغذية والسكري", descEn: "Webinar recording.", descAr: "تسجيل الندوة." },
      { id: "suggest", routeKey: "weekly_topics", en: "Suggest a topic", ar: "اقترح موضوعاً", descEn: "Tell us what to cover next.", descAr: "أخبرنا بما تود أن نتناوله." },
    ],
  },
];

/** Resolved address for a link: approved internal URL or official outside URL. */
export function helpLinkHref(link: HelpLink): string | null {
  if (link.routeKey) return approvedRouteMap[link.routeKey] ?? null;
  if (link.externalUrl) {
    try {
      const u = new URL(link.externalUrl);
      return u.protocol === "https:" && OFFICIAL_EXTERNAL_HOSTS.includes(u.host) ? link.externalUrl : null;
    } catch {
      return null;
    }
  }
  return null;
}
