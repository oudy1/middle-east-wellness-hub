// Instant chatbot answers for simple, common questions, worked out in the
// browser from the approved route list. They cost nothing, work even when the
// AI service is down, and always point at verified pages. Anything longer or
// less clear goes to the AI assistant as before.
//
// Safety replies (crisis, urgent symptoms, medication doses) are always
// answered here first, whatever the length of the message.

import { matchWord, normalizeText, toWords } from "./searchText";
import { approvedRouteMap as R } from "./chatbotRoutes";
import { OFFICIAL_SOURCES } from "./approvedExternalLinks";
import { NEWCOMER_WORKSHOP, isNewcomerWorkshopUpcoming, newcomerWorkshopStatus } from "./newcomerWorkshop";

export type InstantIntent =
  | "crisis"
  | "urgent"
  | "medication"
  | "know_your_rights"
  | "patient_rights"
  | "newcomer_workshop"
  | "doctor_city"
  | "doctor_ask_city"
  | "mentorship"
  | "research_join"
  | "post_opportunity"
  | "arabic_resources"
  | "volunteer"
  | "contact"
  | "webinars";

export interface InstantAnswer {
  intent: InstantIntent;
  language: "en" | "ar";
  /** Short answer with up to two [Label](url) links. */
  text: string;
}

/** Longer messages usually carry detail the AI should read. */
const MAX_WORDS_FOR_INSTANT = 14;

// ---- matching helpers -------------------------------------------------------

const words = (list: string[]) => Array.from(new Set(list.flatMap(toWords)));
const phrases = (list: string[]) => list.map((p) => ` ${normalizeText(p)} `);

/**
 * Keyword match that stays strict on short words, so "right" never counts as
 * "rights" and "poster" never counts as "post": exact for short keywords,
 * a short ending ("doctors", "دكتوره") for 5+ letters, one typo for 7+ letters.
 */
function hasWord(msgWords: string[], keywords: string[]): boolean {
  return keywords.some((k) =>
    msgWords.some((m) => {
      if (m === k) return true;
      if (k.length >= 5 && m.startsWith(k) && m.length - k.length <= 2) return true;
      return k.length >= 7 && matchWord(k, [m]) === "typo";
    })
  );
}
function hasPhrase(padded: string, list: string[]): boolean {
  return list.some((p) => padded.includes(p));
}

/**
 * Same main rule as the AI assistant: answer in the language the visitor
 * writes. Any Arabic (also in a mixed message) means Arabic; only Latin
 * letters means English; neither (numbers, emoji) keeps the site language.
 */
export function replyLanguage(message: string, uiLanguage: "en" | "ar"): "en" | "ar" {
  if (/[\u0600-\u06FF]/.test(message)) return "ar";
  if (/[a-z]/i.test(message)) return "en";
  return uiLanguage;
}

// ---- vocabulary (formal Arabic, common dialect spellings, English) ----------

const CRISIS = phrases([
  "suicide", "suicidal", "kill myself", "killing myself", "end my life", "want to die", "wanna die",
  "hurt myself", "harm myself", "self harm", "overdose", "overdosed", "no reason to live",
  "انتحار", "انتحر", "بنتحر", "اقتل نفسي", "انهي حياتي", "انهاء حياتي", "اريد الموت", "اريد ان اموت",
  "بدي موت", "بدي اموت", "ابغى اموت", "عايز اموت", "اذي نفسي", "ايذاء نفسي", "اذيه نفسي", "جرعه زائده",
  "يضربني", "يعنفني", "تعنيف",
]);

const URGENT = phrases([
  "chest pain", "pain in my chest", "can t breathe", "cannot breathe", "cant breathe", "trouble breathing",
  "hard to breathe", "having a stroke", "stroke symptoms", "signs of a stroke", "severe bleeding",
  "bleeding a lot", "won t stop bleeding", "fainted", "passed out", "unconscious",
  "الم في الصدر", "الم في صدري", "وجع في صدري", "وجع صدر", "ضيق تنفس", "ضيق في التنفس", "لا استطيع التنفس",
  "ما اقدر اتنفس", "مش قادر اتنفس", "جلطه", "سكته", "نزيف", "اغمي", "اغماء",
]);

const MEDICATION_WORDS = words(["dose", "dosage", "dosing", "milligrams", "جرعه", "جرعات", "مليغرام"]);
const MEDICATION_PHRASES = phrases([
  "how many pills", "how much should i take", "should i take", "how many mg", "what medicine should",
  "which medication should", "diagnose me", "what do i have", "كم حبه", "كم حبة", "اي دواء اخذ", "شو اخذ دواء",
  "هل اخذ", "شخصني", "ما هو مرضي",
]);

const DOCTOR = words([
  "doctor", "doctors", "docter", "physician", "physicians", "gp", "dr", "provider", "providers",
  "طبيب", "طبيبه", "لطبيب", "اطباء", "دكتور", "دكتوره", "لدكتور", "دكاتره", "حكيم",
]);
const DOCTOR_PHRASES = phrases([
  "healthcare worker", "health care worker", "healthcare workers", "healthcare provider", "health care provider",
  "مقدم رعايه", "مقدمي الرعايه", "مقدمي رعايه", "العاملين في الرعايه", "عامل في الرعايه",
]);
const FAMILY = words(["family", "اسره", "عائله", "عيله", "عايله"]);

/** Cities with a province code the directory search understands. Arabic spellings included. */
const CITIES: { name: string; province: string; aliases: string[] }[] = [
  { name: "Toronto", province: "ON", aliases: ["toronto", "تورنتو", "تورونتو"] },
  { name: "Mississauga", province: "ON", aliases: ["mississauga", "ميسيساغا", "مسيساغا", "ميسيسوجا", "مسيسوجا", "ميسيساجا"] },
  { name: "Brampton", province: "ON", aliases: ["brampton", "برامبتون"] },
  { name: "Oakville", province: "ON", aliases: ["oakville", "اوكفيل", "أوكفيل"] },
  { name: "Kitchener", province: "ON", aliases: ["kitchener", "كيتشنر", "كتشنر", "كيتشينر"] },
  { name: "Waterloo", province: "ON", aliases: ["waterloo", "واترلو"] },
  { name: "Cambridge", province: "ON", aliases: ["cambridge", "كامبريدج"] },
  { name: "Guelph", province: "ON", aliases: ["guelph", "غويلف", "جويلف"] },
  { name: "Hamilton", province: "ON", aliases: ["hamilton", "هاملتون", "هاميلتون"] },
  { name: "Burlington", province: "ON", aliases: ["burlington", "برلينغتون", "بيرلينجتون"] },
  { name: "London", province: "ON", aliases: ["london ontario", "london on", "لندن اونتاريو"] },
  { name: "Ottawa", province: "ON", aliases: ["ottawa", "اوتاوا", "أوتاوا"] },
  { name: "Windsor", province: "ON", aliases: ["windsor", "وندسور", "ويندسور"] },
  { name: "Markham", province: "ON", aliases: ["markham", "ماركهام"] },
  { name: "Vaughan", province: "ON", aliases: ["vaughan", "فوهان"] },
  { name: "Scarborough", province: "ON", aliases: ["scarborough", "سكاربورو"] },
  { name: "North York", province: "ON", aliases: ["north york", "نورث يورك"] },
  { name: "Etobicoke", province: "ON", aliases: ["etobicoke", "اتوبيكو"] },
  { name: "Montreal", province: "QC", aliases: ["montreal", "مونتريال"] },
  { name: "Calgary", province: "AB", aliases: ["calgary", "كالغاري", "كالجاري"] },
  { name: "Edmonton", province: "AB", aliases: ["edmonton", "ادمونتون", "إدمونتون"] },
  { name: "Vancouver", province: "BC", aliases: ["vancouver", "فانكوفر"] },
  { name: "Winnipeg", province: "MB", aliases: ["winnipeg", "وينيبيغ"] },
  { name: "Halifax", province: "NS", aliases: ["halifax", "هاليفاكس"] },
].map((c) => ({ ...c, aliases: phrases(c.aliases) }));

export function findCity(message: string) {
  const normalized = normalizeText(message);
  // Arabic often joins "in/to/and" to the city: بتورنتو, لميسيساغا, وكيتشنر.
  const unjoined = normalized
    .split(" ")
    .map((w) => (/^[\u0628\u0644\u0648\u0641]/.test(w) && w.length >= 5 ? w.slice(1) : w))
    .join(" ");
  const padded = ` ${normalized} ${unjoined} `;
  return CITIES.find((c) => hasPhrase(padded, c.aliases)) ?? null;
}

const KYR_PHRASES = phrases(["know your rights", "اعرف حقوقك", "إعرف حقوقك"]);
const WEBINAR = words(["webinar", "webinars", "recording", "recordings", "video", "watch", "ندوه", "ندوات", "تسجيل", "تسجيلات", "فيديو", "شاهد", "اشوف"]);
const RIGHTS = words(["rights", "حقوق", "حقوقي", "حقوقك", "complaint", "complain", "شكوى", "تجاهلني"]);
const RIGHTS_PHRASES = phrases([
  "ignored me", "dismissed me", "didn t listen", "doesn t listen", "won t listen", "second opinion",
  "رأي ثاني", "رأي طبي ثاني", "راي ثاني", "راي طبي ثاني", "رأي طبي آخر", "ما سمعني", "ما بيسمعني", "لم يستمع",
]);
/** Requests about private data or the assistant's rules: the AI answers (and declines). */
const PRIVATE = words(["admin", "admins", "logs", "password", "prompt", "instructions", "مشرف", "سجلات", "كلمه"]);
/** Words that show the visitor wants to find a doctor (not talk about one). */
const FIND = words([
  "find", "need", "looking", "search", "recommend", "list", "where", "nearby", "near",
  "ابحث", "الاقي", "القى", "بدي", "اريد", "محتاج", "محتاجه", "عايز", "ابغى", "ابي", "وين", "فين", "اين", "قريب",
]);
const WORKSHOP = words(["workshop", "ورشه", "ورش", "scadding", "سكادينغ", "سكادنغ"]);
const WORKSHOP_PHRASES = phrases(["november 19", "nov 19", "19 november", "19 نوفمبر", "١٩ نوفمبر", "newcomer event", "newcomer workshop"]);
const MENTOR = words(["mentor", "mentors", "mentorship", "mentee", "ارشاد", "مرشد", "مرشده", "منتور", "منتورشب"]);
const RESEARCH = words(["research", "study", "studies", "trial", "trials", "survey", "بحث", "ابحاث", "دراسه", "دراسات", "استبيان"]);
const JOIN = words(["join", "participate", "participant", "enroll", "enrol", "sign", "part", "مشاركه", "اشارك", "شارك", "انضم", "انضمام", "اسجل", "التسجيل"]);
const POST = words(["post", "submit", "recruit", "recruiting", "advertise", "انشر", "نشر", "اعلن", "ارسل"]);
const RESOURCES = words(["resources", "resource", "materials", "pdf", "pdfs", "guides", "موارد", "مصادر", "مواد", "ادله"]);
const ARABIC = words(["arabic", "عربي", "بالعربي", "بالعربيه", "العربيه"]);
const VOLUNTEER = words(["volunteer", "volunteering", "تطوع", "متطوع", "اتطوع", "تطوعي"]);
const CONTACT = words(["contact", "email", "reach", "تواصل", "اتواصل", "راسل", "اراسل", "ايميل"]);
/** Specific health topics: let the AI pick the matching section instead of a general page. */
const TOPICS = words([
  "diabetes", "cancer", "heart", "mental", "anxiety", "depression", "vaccine", "vaccines", "smoking", "nutrition", "women",
  "سكري", "سكر", "سرطان", "قلب", "نفسيه", "قلق", "اكتئاب", "لقاح", "لقاحات", "تدخين", "تغذيه", "نساء", "المراه",
]);

// ---- answers ------------------------------------------------------------------

const link = (label: string, url: string) => `[${label}](${url})`;

function directoryUrl(city: { name: string; province: string }, family: boolean) {
  const q = new URLSearchParams({ city: city.name, province: city.province });
  if (family) q.set("specialty", "Family Physician");
  return `/find-healthcare-workers?${q.toString().replace(/\+/g, "%20")}`;
}

function answer(intent: InstantIntent, lang: "en" | "ar", en: string, ar: string): InstantAnswer {
  return { intent, language: lang, text: lang === "ar" ? ar : en };
}

/**
 * An instant answer, or null when the AI assistant should answer.
 * `previousIntent` is the intent of the last instant answer, so a reply like
 * "Mississauga" after "Which city are you in?" opens that city's directory.
 */
export function instantAnswer(
  message: string,
  uiLanguage: "en" | "ar",
  previousIntent: InstantIntent | null = null,
  now: Date = new Date()
): InstantAnswer | null {
  const lang = replyLanguage(message, uiLanguage);
  const padded = ` ${normalizeText(message)} `;
  const w = toWords(message);
  if (w.length === 0) return null;

  // 1. Safety first, at any length.
  if (hasPhrase(padded, CRISIS)) {
    return answer(
      "crisis",
      lang,
      `I'm really sorry you're going through this. If you are in immediate danger, call 911. For mental health crisis support anywhere in Canada, call or text 988, any time.\n${link("988 Suicide Crisis Helpline", OFFICIAL_SOURCES.crisis_988)}`,
      `أنا آسف جداً لما تمر به. إذا كنت في خطر فوري، اتصل بـ 911. للدعم في الأزمات النفسية في أي مكان في كندا، اتصل أو أرسل رسالة إلى 988 في أي وقت.\n${link("خط 988 للأزمات", OFFICIAL_SOURCES.crisis_988)}`
    );
  }
  if (hasPhrase(padded, URGENT)) {
    return answer(
      "urgent",
      lang,
      `This could be an emergency. Please call 911 now or go to the nearest emergency department.\n${link("Need help now", R.emergency_help)}`,
      `قد تكون هذه حالة طارئة. يرجى الاتصال بـ 911 الآن أو التوجه إلى أقرب قسم طوارئ.\n${link("تحتاج مساعدة الآن", R.emergency_help)}`
    );
  }
  if (hasWord(w, MEDICATION_WORDS) || hasPhrase(padded, MEDICATION_PHRASES)) {
    return answer(
      "medication",
      lang,
      `I can't advise on doses or diagnoses. Please ask your pharmacist or doctor. In Ontario you can also call Health811 at 811 for free advice from a nurse, any time.\n${link("Health811", OFFICIAL_SOURCES.health811)}`,
      `لا يمكنني تقديم نصيحة حول الجرعات أو التشخيص. يرجى سؤال الصيدلي أو الطبيب. في أونتاريو يمكنك أيضاً الاتصال بـ Health811 على الرقم 811 للحصول على نصيحة مجانية من ممرضة في أي وقت.\n${link("Health811", OFFICIAL_SOURCES.health811)}`
    );
  }

  // Follow-up: the visitor answers "Which city?" with just a city.
  const city = findCity(message);
  if (previousIntent === "doctor_ask_city" && city && w.length <= 5) {
    return doctorInCity(lang, city, false);
  }

  // 2. Everything else only for short, clear questions about public pages.
  if (w.length > MAX_WORDS_FOR_INSTANT) return null;
  if (hasWord(w, PRIVATE)) return null;

  if (hasPhrase(padded, KYR_PHRASES) || (hasWord(w, RIGHTS) && hasWord(w, WEBINAR))) {
    return answer(
      "know_your_rights",
      lang,
      `You can watch the full Know Your Rights webinar recording, where doctors and a social worker explain patient rights, referrals and second opinions.\n${link("Watch the recording", R.webinar_know_your_rights)}\n${link("Patient rights", R.patient_rights)}`,
      `يمكنك مشاهدة تسجيل ندوة "اعرف حقوقك" كاملاً، حيث يشرح أطباء وأخصائية اجتماعية حقوق المرضى والإحالات والرأي الطبي الثاني.\n${link("شاهد التسجيل", R.webinar_know_your_rights)}\n${link("حقوق المريض", R.patient_rights)}`
    );
  }

  if (hasWord(w, RIGHTS) || hasPhrase(padded, RIGHTS_PHRASES)) {
    return answer(
      "patient_rights",
      lang,
      `In Ontario you have the right to respectful care, privacy, clear information and an interpreter. Our patient rights guide explains how to speak up.\n${link("Patient rights", R.patient_rights)}\n${link("Know Your Rights recording", R.webinar_know_your_rights)}`,
      `في أونتاريو لك الحق في رعاية محترمة وخصوصية ومعلومات واضحة ومترجم. يشرح دليل حقوق المريض كيف تعبّر عن احتياجاتك.\n${link("حقوق المريض", R.patient_rights)}\n${link("تسجيل اعرف حقوقك", R.webinar_know_your_rights)}`
    );
  }

  if (hasWord(w, WORKSHOP) || hasPhrase(padded, WORKSHOP_PHRASES)) {
    const e = NEWCOMER_WORKSHOP;
    if (isNewcomerWorkshopUpcoming(now)) {
      return answer(
        "newcomer_workshop",
        lang,
        `"${e.en.title}" is a free workshop on ${e.en.date}, ${e.en.time}, at ${e.en.place}.\n${link("Register", e.registerUrl)}\n${link("Workshop details", e.learnMorePath)}`,
        `"${e.ar.title}" ورشة مجانية يوم ${e.ar.date}، ${e.ar.time}، في ${e.ar.place}.\n${link("سجّل الآن", e.registerUrl)}\n${link("تفاصيل الورشة", e.learnMorePath)}`
      );
    }
    // Say it "took place" only once SHAMS has confirmed it; a passed date alone means registration is closed.
    if (newcomerWorkshopStatus(now) === "ended") {
      return answer(
        "newcomer_workshop",
        lang,
        `The date for the "${e.en.title}" workshop (${e.en.date}) has passed, so registration is closed. The Newcomer Initiative page has related resources.\n${link("Newcomer initiative", R.newcomer_initiative)}`,
        `مضى موعد ورشة "${e.ar.title}" (${e.ar.date})، والتسجيل مغلق الآن. تجد موارد ذات صلة في صفحة مبادرة الوافدين الجدد.\n${link("مبادرة الوافدين الجدد", R.newcomer_initiative)}`
      );
    }
    return answer(
      "newcomer_workshop",
      lang,
      `The "${e.en.title}" workshop took place on ${e.en.date}, so registration is closed. The Newcomer Initiative page has the resources it covered.\n${link("Newcomer initiative", R.newcomer_initiative)}`,
      `أُقيمت ورشة "${e.ar.title}" يوم ${e.ar.date}، والتسجيل مغلق الآن. تجد الموارد التي غطّتها في صفحة مبادرة الوافدين الجدد.\n${link("مبادرة الوافدين الجدد", R.newcomer_initiative)}`
    );
  }

  if ((hasWord(w, DOCTOR) || hasPhrase(padded, DOCTOR_PHRASES)) && !hasWord(w, RESEARCH)) {
    if (city) return doctorInCity(lang, city, hasWord(w, FAMILY));
    if (!hasWord(w, FIND) && w.length > 4) return null;
    return answer(
      "doctor_ask_city",
      lang,
      `Which city are you in? I can open the SHAMS directory for it.\n${link("Browse by city", R.browse_by_city)}`,
      `في أي مدينة أنت؟ يمكنني فتح دليل شمس لمدينتك.\n${link("تصفح حسب المدينة", R.browse_by_city)}`
    );
  }

  if (hasWord(w, MENTOR)) {
    return answer(
      "mentorship",
      lang,
      `The SHAMS Mentorship Program connects students with healthcare professionals for guidance and career advice.\n${link("Mentorship program", R.mentorship)}`,
      `يربط برنامج الإرشاد في شمس الطلاب بمهنيين في الرعاية الصحية للتوجيه والنصائح المهنية.\n${link("برنامج الإرشاد", R.mentorship)}`
    );
  }

  if (hasWord(w, RESEARCH) && hasWord(w, POST)) {
    return answer(
      "post_opportunity",
      lang,
      `Researchers can submit a study or opportunity. SHAMS reviews each one before it is published.\n${link("Submit an opportunity", R.post_opportunity)}`,
      `يمكن للباحثين إرسال دراسة أو فرصة. تراجع شمس كل طلب قبل نشره.\n${link("إرسال فرصة", R.post_opportunity)}`
    );
  }

  if (hasWord(w, RESEARCH) && (hasWord(w, JOIN) || hasWord(w, VOLUNTEER))) {
    return answer(
      "research_join",
      lang,
      `Here are the research studies and opportunities SHAMS has reviewed. Each one explains who can take part.\n${link("Research opportunities", R.research_opportunities)}\n${link("Research studies", R.research_studies)}`,
      `هذه الدراسات والفرص البحثية التي راجعتها شمس. توضّح كل واحدة من يمكنه المشاركة.\n${link("الفرص البحثية", R.research_opportunities)}\n${link("الدراسات البحثية", R.research_studies)}`
    );
  }

  const topical = hasWord(w, TOPICS);

  if (!topical && hasWord(w, RESOURCES) && (hasWord(w, ARABIC) || lang === "ar")) {
    return answer(
      "arabic_resources",
      lang,
      `SHAMS has free health guides in Arabic and English on many topics.\n${link("Health resources", R.resources)}\n${link("Educational materials", R.educational_materials)}`,
      `لدى شمس أدلة صحية مجانية بالعربية والإنجليزية في مواضيع كثيرة.\n${link("الموارد الصحية", R.resources)}\n${link("المواد التثقيفية", R.educational_materials)}`
    );
  }

  if (hasWord(w, VOLUNTEER)) {
    return answer(
      "volunteer",
      lang,
      `Thank you for wanting to help! The volunteer page explains the roles and how to apply.\n${link("Volunteer with SHAMS", R.volunteer)}`,
      `شكراً لرغبتك في المساعدة! تشرح صفحة التطوع الأدوار وطريقة التقديم.\n${link("تطوع مع شمس", R.volunteer)}`
    );
  }

  if (hasWord(w, CONTACT) && w.length <= 8) {
    return answer(
      "contact",
      lang,
      `You can send SHAMS a message through the contact form. It goes straight to the team.\n${link("Contact SHAMS", R.contact_general)}`,
      `يمكنك إرسال رسالة إلى شمس من خلال نموذج التواصل، وتصل مباشرة إلى الفريق.\n${link("تواصل مع شمس", R.contact_general)}`
    );
  }

  if (!topical && hasWord(w, WEBINAR)) {
    return answer(
      "webinars",
      lang,
      `All SHAMS webinar recordings are free to watch, in English and Arabic.\n${link("Webinar recordings", R.recordings)}`,
      `جميع تسجيلات ندوات شمس متاحة للمشاهدة مجاناً بالعربية والإنجليزية.\n${link("تسجيلات الندوات", R.recordings)}`
    );
  }

  return null;
}

function doctorInCity(lang: "en" | "ar", city: { name: string; province: string }, family: boolean): InstantAnswer {
  const url = directoryUrl(city, family);
  return answer(
    "doctor_city",
    lang,
    `Here is the SHAMS directory for ${city.name}. Please call the office to check if they are accepting new patients.\n${link(`Search ${city.name}`, url)}\n${link("Directory with map", R.directory_map)}`,
    `هذا دليل شمس لمدينة ${city.name}. يرجى الاتصال بالعيادة للتأكد من قبولها مرضى جدداً.\n${link(`ابحث في ${city.name}`, url)}\n${link("الدليل مع الخريطة", R.directory_map)}`
  );
}

/** Fallback when the AI service cannot be reached: the best matching approved pages. */
export function offlineFallback(lang: "en" | "ar", links: { label: string; url: string }[]): string {
  const chosen = links.slice(0, 2);
  const contact = lang === "ar" ? link("تواصل مع شمس", R.contact_general) : link("Contact SHAMS", R.contact_general);
  const body = chosen.length
    ? chosen.map((l) => link(l.label, l.url)).join("\n")
    : contact;
  return lang === "ar"
    ? `لم أتمكن من الوصول إلى المساعد الآن. قد تساعدك هذه الصفحات:\n${body}`
    : `I couldn't reach the assistant right now. These pages may help:\n${body}`;
}
