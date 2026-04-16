
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";

import en from "../../content/translations/en.json";
import ar from "../../content/translations/ar.json";
import ku from "../../content/translations/ku.json";
import fa from "../../content/translations/fa.json";
import tr from "../../content/translations/tr.json";

type Language = "en" | "ar" | "ku" | "fa" | "tr";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translationsByLang: Record<Language, Record<string, string>> = { en, ar, ku, fa, tr };

const rtlLanguages: Language[] = ["ar", "ku", "fa"];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const savedLanguage = localStorage.getItem("shams-language");
  const initialLanguage = (savedLanguage as Language) || "en";
  
  const [language, setLanguage] = useState<Language>(initialLanguage);

  useEffect(() => {
    localStorage.setItem("shams-language", language);
    document.documentElement.setAttribute("lang", language);
    document.documentElement.setAttribute("dir", rtlLanguages.includes(language) ? "rtl" : "ltr");
  }, [language]);

  const t = (key: string): string => {
    const value = translationsByLang[language]?.[key];
    if (!value) {
      console.warn(`Translation key not found: ${key}`);
      return key;
    }
    return value;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      <div dir={rtlLanguages.includes(language) ? "rtl" : "ltr"} className={language === "ar" ? "font-cairo" : ""}>
        {children}
      </div>
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
