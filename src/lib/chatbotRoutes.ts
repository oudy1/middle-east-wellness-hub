// Single source of truth for every destination the chatbot, smart search,
// quick replies and recommended links may point to.
//
// content/chatbot-routes.json is the approved route map. Nothing else may
// invent a SHAMS URL. Anything not resolvable here is rejected before
// navigation happens.

import routes from "../../content/chatbot-routes.json";

export const approvedRouteMap: Record<string, string> = routes as Record<string, string>;

/** Every approved internal URL, e.g. "/services#resources" */
export const approvedUrls: ReadonlySet<string> = new Set(Object.values(approvedRouteMap));

/** Base paths (no hash / query), e.g. "/services" */
export const approvedPaths: ReadonlySet<string> = new Set(
  Object.values(approvedRouteMap).map((u) => u.split("#")[0].split("?")[0])
);

/** Approved hashes per base path, so invented anchors are blocked. */
export const approvedHashes: Record<string, Set<string>> = Object.values(approvedRouteMap).reduce(
  (acc, url) => {
    const [pathPart, hash] = url.split("#");
    const path = pathPart.split("?")[0];
    if (!acc[path]) acc[path] = new Set<string>();
    if (hash) acc[path].add(hash);
    return acc;
  },
  {} as Record<string, Set<string>>
);

export const SHAMS_EMAIL = "infoprojectshams@gmail.com";

/**
 * Contact actions route to the on-site contact form (which emails the SHAMS
 * inbox through the same sender) instead of opening the visitor's mail app.
 */
export const contactActions = {
  general: "/contact?topic=general#contact-form",
  opportunity: "/contact?topic=opportunity#contact-form",
  healthcare_listing: "/contact?topic=healthcare-listing#contact-form",
} as const;

/** Contact topics the form can prefill. */
export type ContactTopic = keyof typeof contactActions;

/** Nearest verified parent page for a given internal URL. */
export function parentRoute(url: string): string {
  const path = url.split("#")[0].split("?")[0];
  if (!path || path === "/") return "/";
  if (approvedPaths.has(path)) {
    // /programs/mentorship -> /programs when the deeper page is unreachable
    const segments = path.split("/").filter(Boolean);
    if (segments.length > 1) {
      const parent = `/${segments.slice(0, -1).join("/")}`;
      if (approvedPaths.has(parent)) return parent;
    }
    return path;
  }
  return "/";
}

/**
 * Is this a chatbot-generated internal link we are willing to navigate to?
 * Accepts approved base paths, approved hashes on those paths, and query
 * strings (used by the healthcare directory city/province search).
 */
export function isApprovedInternalUrl(url: string): boolean {
  if (!url.startsWith("/")) return false;
  const [beforeHash, hash] = url.split("#");
  const path = beforeHash.split("?")[0];
  if (!approvedPaths.has(path)) return false;
  if (hash && !approvedHashes[path]?.has(hash)) return false;
  return true;
}

export function isMailtoOrTel(url: string): boolean {
  const trimmed = url.trim().toLowerCase();
  return trimmed.startsWith("mailto:") || trimmed.startsWith("tel:");
}

export function isSafeExternalUrl(url: string): boolean {
  const trimmed = url.trim().toLowerCase();
  return trimmed.startsWith("https://") || trimmed.startsWith("http://");
}

// Page names shown under chatbot answers as "Sources", keyed by base path.
const SOURCE_NAMES: Record<string, { en: string; ar: string }> = {
  "/": { en: "SHAMS home", ar: "الصفحة الرئيسية لشمس" },
  "/about": { en: "About SHAMS", ar: "عن شمس" },
  "/services": { en: "SHAMS Services", ar: "خدمات شمس" },
  "/programs": { en: "SHAMS Programs", ar: "برامج شمس" },
  "/programs/mentorship": { en: "Mentorship Program", ar: "برنامج الإرشاد" },
  "/research": { en: "SHAMS Research", ar: "أبحاث شمس" },
  "/recordings": { en: "Webinar recordings", ar: "تسجيلات الندوات" },
  "/find-healthcare-workers": { en: "Healthcare worker directory", ar: "دليل العاملين في الرعاية الصحية" },
  "/directory": { en: "Directory with map", ar: "الدليل مع الخريطة" },
  "/contact": { en: "Contact SHAMS", ar: "تواصل مع شمس" },
  "/volunteer": { en: "Volunteer", ar: "التطوع" },
  "/faq": { en: "FAQ", ar: "الأسئلة الشائعة" },
  "/glossary": { en: "Glossary", ar: "المسرد" },
  "/physicians/apply": { en: "Directory application", ar: "طلب الانضمام إلى الدليل" },
  "/post-opportunity": { en: "Submit an opportunity", ar: "إرسال فرصة" },
};

/** Short, human name of where a chatbot link comes from ("SHAMS Services", "ontario.ca"). */
export function sourceLabel(url: string, language: "en" | "ar"): string {
  if (url.startsWith("/")) {
    const path = url.split("#")[0].split("?")[0];
    const name = SOURCE_NAMES[path] ?? SOURCE_NAMES[parentRoute(url)] ?? SOURCE_NAMES["/"];
    return name[language];
  }
  try {
    const host = new URL(url).hostname.replace(/^www\./, "");
    if (host === "forms.gle" || host === "docs.google.com") return "Google Forms";
    return host;
  } catch {
    return url;
  }
}
