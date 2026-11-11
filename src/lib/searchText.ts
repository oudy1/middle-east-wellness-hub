// Shared text matching for the site search and the chatbot's knowledge lookup.
// Patterns borrowed from Meilisearch/Typesense (no server needed):
// - Arabic normalization (hamza/alef forms, taa marbuta, alef maqsura, diacritics)
// - Arabic article stripping so "الصحة" matches "صحة"
// - typo budget that grows with word length (0 typos < 5 letters, 1 typo < 9, else 2)
// - prefix matching so results appear while a word is still being typed

/** Lowercase, drop accents/diacritics/tatweel, unify Arabic letter variants, strip punctuation. */
export function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "") // Latin accents
    .replace(/[\u0610-\u061a\u064b-\u065f\u0670\u06d6-\u06ed\u0640]/g, "") // Arabic marks + tatweel
    .replace(/[\u0622\u0623\u0625\u0671]/g, "\u0627") // any remaining alef forms -> ا
    .replace(/\u0629/g, "\u0647") // ة -> ه
    .replace(/\u0649/g, "\u064a") // ى -> ي
    .replace(/[^\p{L}\p{N}\s]+/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

const AR_PREFIXES_3 = ["وال", "بال", "فال", "كال"];

/** Strip the Arabic definite article (and common joined prepositions) from one normalized word. */
export function stemArabic(word: string): string {
  if (word.length >= 6 && AR_PREFIXES_3.some((p) => word.startsWith(p))) return word.slice(3);
  if (word.length >= 5 && (word.startsWith("ال") || word.startsWith("لل"))) return word.slice(2);
  return word;
}

/** Normalized, stemmed words of a text. */
export function toWords(text: string): string[] {
  const n = normalizeText(text);
  if (!n) return [];
  return n.split(" ").map(stemArabic).filter(Boolean);
}

/** Typos allowed for a query word of this length. */
export function typoBudget(length: number): number {
  if (length < 5) return 0;
  if (length < 9) return 1;
  return 2;
}

export function editDistance(a: string, b: string, max = 2): number {
  if (Math.abs(a.length - b.length) > max) return max + 1;
  const dp: number[] = Array.from({ length: b.length + 1 }, (_, i) => i);
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

export type MatchKind = "exact" | "prefix" | "typo" | null;

/** Best way a single query word matches any of the document words. */
export function matchWord(queryWord: string, docWords: readonly string[]): MatchKind {
  if (!queryWord) return null;
  let best: MatchKind = null;
  const budget = typoBudget(queryWord.length);
  for (const w of docWords) {
    if (w === queryWord) return "exact";
    if (queryWord.length >= 3 && w.startsWith(queryWord)) {
      best = "prefix";
      continue;
    }
    if (best === null && budget > 0 && w.length >= 4 && editDistance(queryWord, w, budget) <= budget) {
      best = "typo";
    }
  }
  return best;
}

export const MATCH_POINTS: Record<Exclude<MatchKind, null>, number> = {
  exact: 3,
  prefix: 2,
  typo: 1.5,
};
