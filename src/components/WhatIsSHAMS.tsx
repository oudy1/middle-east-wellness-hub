import { useLanguage } from "@/contexts/LanguageContext";
import { Info } from "lucide-react";

const WhatIsSHAMS = () => {
  const { t, language } = useLanguage();
  
  return (
    <section className="py-8 bg-healthTeal/10 border-y border-healthTeal/20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Info className="w-6 h-6 text-healthTeal" />
            <h2 className="text-2xl font-bold text-healthDarkBlue">
              {t("whatIsShams.title")}
            </h2>
          </div>
          <p 
            className={`text-base md:text-lg text-gray-700 leading-relaxed ${language === 'ar' ? 'text-right' : ''}`}
            dir={language === 'ar' ? 'rtl' : 'ltr'}
          >
            {t("whatIsShams.description")}
          </p>
        </div>
      </div>
    </section>
  );
};

export default WhatIsSHAMS;
