import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import glossaryData from "../../content/glossary.json";

const categories = ["all", "insurance", "mental-health", "crisis", "research", "education"] as const;

const categoryLabels: Record<string, { en: string; ar: string }> = {
  all: { en: "All", ar: "الكل" },
  insurance: { en: "Insurance", ar: "التأمين" },
  "mental-health": { en: "Mental Health", ar: "الصحة النفسية" },
  crisis: { en: "Crisis", ar: "الأزمات" },
  research: { en: "Research", ar: "البحث" },
  education: { en: "Education", ar: "التعليم" },
};

const Glossary = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = activeCategory === "all"
    ? glossaryData
    : glossaryData.filter((item) => item.category === activeCategory);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Glossary - SHAMS"
        description="Health and advocacy glossary with bilingual definitions for Middle Eastern societies in Canada."
      />
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
          {isArabic ? "المصطلحات" : "Glossary"}
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          {isArabic
            ? "مصطلحات صحية ومجتمعية مهمة مع تعريفات ثنائية اللغة"
            : "Key health and community terms with bilingual definitions"}
        </p>

        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-muted-foreground hover:bg-muted/80"
              }`}
            >
              {isArabic ? categoryLabels[cat].ar : categoryLabels[cat].en}
            </button>
          ))}
        </div>

        <div className="space-y-4">
          {filtered.map((item, index) => (
            <div key={index} className="border rounded-lg p-5 bg-card space-y-2">
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-xl font-bold text-primary">{item.term}</span>
                <span className="text-sm text-muted-foreground">
                  {isArabic ? item.fullFormAr : item.fullForm}
                </span>
              </div>
              <p className="text-foreground">
                {isArabic ? item.definitionAr : item.definition}
              </p>
              <p className="text-xs opacity-70 border-t pt-2 border-border">
                {isArabic ? item.definition : item.definitionAr}
              </p>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Glossary;
