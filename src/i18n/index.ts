// Standard i18next setup for SHAMS. Translations stay in content/translations/*.json
// as flat keys ("nav.home"), so keySeparator is off. Plural forms use i18next's
// suffixes: "search.resultCount_one", "_other", and for Arabic also
// "_zero", "_two", "_few", "_many" (chosen by Intl.PluralRules).
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "../../content/translations/en.json";
import ar from "../../content/translations/ar.json";
import ku from "../../content/translations/ku.json";
import fa from "../../content/translations/fa.json";
import tr from "../../content/translations/tr.json";

export type Language = "en" | "ar" | "ku" | "fa" | "tr";
export const LANGUAGES: Language[] = ["en", "ar", "ku", "fa", "tr"];
export const RTL_LANGUAGES: Language[] = ["ar", "ku", "fa"];
export const isRtlLanguage = (lang: string) => RTL_LANGUAGES.includes(lang as Language);

/** Localized notice shown when an Arabic/RTL translation is missing, per project rules. */
export const MISSING_TRANSLATION_AR = "المحتوى قيد الترجمة";

export const dictionaries: Record<Language, Record<string, string>> = { en, ar, ku, fa, tr };

/** Dev-only record of missing keys, readable in the browser console as `window.__missingI18n`. */
export function reportMissing(lang: string, key: string) {
  if (!import.meta.env.DEV) return;
  // eslint-disable-next-line no-console
  console.warn(`[i18n] Missing "${lang}" translation for key: ${key}`);
  if (typeof window !== "undefined") {
    const w = window as unknown as { __missingI18n?: Set<string> };
    (w.__missingI18n ||= new Set()).add(`${lang}:${key}`);
  }
}

if (!i18n.isInitialized) {
  i18n.use(initReactI18next).init({
    resources: Object.fromEntries(
      LANGUAGES.map((l) => [l, { translation: dictionaries[l] }])
    ),
    lng: "en",
    // RTL languages never fall back to English text inside an RTL layout;
    // they show the "content in translation" notice instead.
    fallbackLng: (code: string) => (code === "en" || isRtlLanguage(code) ? [] : ["en"]),
    supportedLngs: LANGUAGES,
    keySeparator: false,
    nsSeparator: false,
    returnNull: false,
    returnEmptyString: false,
    interpolation: { escapeValue: false }, // React already escapes
    react: { useSuspense: false },
    // Called only when no language (after fallbacks) has the key.
    parseMissingKeyHandler: (key: string) =>
      isRtlLanguage(i18n.language) ? MISSING_TRANSLATION_AR : key,
    initImmediate: false,
  });
}

/** True when `lang` itself (no fallback) has the key or any of its plural forms. */
export function hasOwnTranslation(lang: Language, key: string, count?: number): boolean {
  const dict = dictionaries[lang];
  if (!dict) return false;
  if (count === undefined) return Boolean(dict[key]);
  const form = new Intl.PluralRules(lang).select(count);
  return Boolean(dict[`${key}_${form}`] || dict[`${key}_other`]);
}

export default i18n;
