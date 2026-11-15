// One source for SHAMS affiliated researchers (content/researchers.json): the
// Research page, site search and chatbot knowledge all read from here.
// Researchers are kept apart from the SHAMS team (content/team.json).
import data from "../../content/researchers.json";
import { isPublished } from "./contentStatus";

type Lang = "en" | "ar";

export type ResearcherDetail =
  | { type: "text" | "note"; en: string; ar: string }
  | { type: "list" | "chips"; en: string[]; ar: string[] }
  | { type: "facts"; items: { label_en: string; label_ar: string; value_en: string; value_ar: string }[] };

export interface Researcher {
  id: string;
  status: string;
  name_en: string;
  name_ar: string;
  role_en: string;
  role_ar: string;
  org_en: string;
  org_ar: string;
  bio_en: string;
  bio_ar: string;
  email?: string;
  location_en?: string;
  location_ar?: string;
  tags_en: string[];
  tags_ar: string[];
  links?: { label_en: string; label_ar: string; href: string }[];
  accent: "healthTeal" | "healthPurple" | "healthDarkBlue";
  icon: "graduation" | "flask" | "brain";
  details?: ResearcherDetail[];
}

export const ALL_RESEARCHERS = data as Researcher[];

/** Only published researchers reach visitors, in content file order. */
export const RESEARCHERS: Researcher[] = ALL_RESEARCHERS.filter((r) => isPublished(r.status));

export const researcherName = (r: Researcher, lang: Lang) => (lang === "ar" ? r.name_ar : r.name_en);

/** One plain sentence per researcher for search results and the chatbot. */
export function researcherDescription(r: Researcher, lang: Lang): string {
  return lang === "ar"
    ? `${r.role_ar}، ${r.org_ar}. ${r.bio_ar}`
    : `${r.role_en}, ${r.org_en}. ${r.bio_en}`;
}

/** Words a visitor might type to find this researcher (name parts, topics, institution). */
export function researcherKeywords(r: Researcher): string[] {
  const nameParts = [r.name_en, r.name_ar]
    .flatMap((n) => n.replace(/[(),.]/g, " ").split(/\s+/))
    .filter((w) => w.length > 2 && !/^(dr|phd|m\.?sc)$/i.test(w));
  return [...new Set([r.name_en, r.name_ar, ...nameParts, ...r.tags_en, ...r.tags_ar, r.org_en, r.org_ar])];
}
