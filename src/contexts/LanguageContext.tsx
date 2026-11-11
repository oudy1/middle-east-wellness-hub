import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback, useMemo } from "react";
import { I18nextProvider } from "react-i18next";
import i18n, {
  Language,
  LANGUAGES,
  isRtlLanguage,
  hasOwnTranslation,
  reportMissing,
  MISSING_TRANSLATION_AR,
} from "@/i18n";

export { MISSING_TRANSLATION_AR };
export type { Language };

/** Values for `{{name}}` placeholders, plus `count` to pick a plural form. */
export type TranslateOptions = { count?: number; lng?: Language } & Record<string, string | number | undefined>;

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  /** Translate a key. Pass `{ count }` for keys with plural forms (key_one, key_other, ...). */
  t: (key: string, options?: TranslateOptions) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const readSavedLanguage = (): Language => {
  const saved = localStorage.getItem("shams-language");
  return LANGUAGES.includes(saved as Language) ? (saved as Language) : "en";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const initial = readSavedLanguage();
    i18n.changeLanguage(initial);
    return initial;
  });

  useEffect(() => {
    if (i18n.language !== language) i18n.changeLanguage(language);
    localStorage.setItem("shams-language", language);
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", isRtlLanguage(language) ? "rtl" : "ltr");
  }, [language]);

  const t = useCallback(
    (key: string, options?: TranslateOptions): string => {
      // Pages written only in English/Arabic may pin `lng` so counts match the page text.
      const lng = (options?.lng as Language | undefined) ?? language;
      if (import.meta.env.DEV && !hasOwnTranslation(lng, key, options?.count)) {
        reportMissing(lng, key);
      }
      return i18n.t(key, { ...options, lng }) as string;
    },
    [language]
  );

  const value = useMemo(() => ({ language, setLanguage, t }), [language, t]);

  return (
    <I18nextProvider i18n={i18n}>
      <LanguageContext.Provider value={value}>
        <div dir={isRtlLanguage(language) ? "rtl" : "ltr"} className={language === "ar" ? "font-cairo" : ""}>
          {children}
        </div>
      </LanguageContext.Provider>
    </I18nextProvider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
