// One search list for the header search and the homepage finder: the curated
// destinations in resourceFinderData first, then matching chatbot knowledge
// (webinars, studies, FAQ, programs, events) that the curated list lacks.
import { searchResources, SearchableResource } from "./resourceFinderData";
import { searchKnowledge, KnowledgeCategory, queryWords } from "./knowledgeIndex";
import { isApprovedUrl } from "./knowledgeIndex";

const KNOWLEDGE_GROUP: Record<KnowledgeCategory, SearchableResource["category"]> = {
  resources: "topics",
  patient_rights: "topics",
  faq: "topics",
  community_services: "services",
  pages: "services",
  programs: "programs",
  studies: "research",
  researchers: "research",
  healthcare_workers: "healthcare",
  webinars: "events",
};

/** Knowledge hits below this score are usually a single loose word and add noise. */
const MIN_KNOWLEDGE_SCORE = 3;
const MAX_PER_KNOWLEDGE_CATEGORY = 3;
const MAX_RESULTS = 12;

const urlKey = (url: string) => url.replace(/\/+(?=#|\?|$)/, "").toLowerCase();

export function searchSite(query: string, language: "en" | "ar"): SearchableResource[] {
  const curated = searchResources(query, language);
  const seenUrls = new Set(curated.map((r) => urlKey(r.url)));
  const seenTitles = new Set(curated.map((r) => r.title_en.toLowerCase()));
  const perCategory: Partial<Record<KnowledgeCategory, number>> = {};

  const extra: SearchableResource[] = [];
  for (const { item, score } of searchKnowledge(query, language, 20)) {
    if (score < MIN_KNOWLEDGE_SCORE || !isApprovedUrl(item.url)) continue;
    const titleKey = item.title_en.toLowerCase();
    if (seenTitles.has(titleKey)) continue;
    // Several FAQ answers or studies may share one page; keep them, but never
    // repeat a page the curated list already offers.
    const sharedPage = item.category === "faq" || item.category === "studies";
    if (!sharedPage && seenUrls.has(urlKey(item.url))) continue;
    const count = perCategory[item.category] ?? 0;
    if (count >= MAX_PER_KNOWLEDGE_CATEGORY) continue;
    perCategory[item.category] = count + 1;
    seenTitles.add(titleKey);
    seenUrls.add(urlKey(item.url));
    extra.push({
      id: `k-${item.id}`,
      title_en: item.title_en,
      title_ar: item.title_ar,
      description_en: item.description_en,
      description_ar: item.description_ar,
      keywords_en: [],
      keywords_ar: [],
      url: item.url,
      category: KNOWLEDGE_GROUP[item.category],
    });
  }

  return [...curated, ...extra].slice(0, MAX_RESULTS);
}

export interface ResultGroup {
  category: SearchableResource["category"];
  items: SearchableResource[];
}

/** Groups keep the order of their best result, so the strongest group shows first. */
export function groupResults(results: SearchableResource[]): ResultGroup[] {
  const groups: ResultGroup[] = [];
  for (const r of results) {
    let g = groups.find((x) => x.category === r.category);
    if (!g) {
      g = { category: r.category, items: [] };
      groups.push(g);
    }
    g.items.push(r);
  }
  return groups;
}

/** Results in the exact order they are displayed (needed for arrow-key navigation). */
export function flattenGroups(groups: ResultGroup[]): SearchableResource[] {
  return groups.flatMap((g) => g.items);
}

export { queryWords };
