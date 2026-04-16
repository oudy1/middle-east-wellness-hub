import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import glossaryData from "../../content/glossary.json";

const categories = ["all", "healthcare-system", "mental-health", "research", "education", "conditions", "nutrition", "newcomer"] as const;

const categoryLabels: Record<string, { en: string; ar: string }> = {
  all: { en: "All", ar: "الكل" },
  "healthcare-system": { en: "Healthcare System", ar: "النظام الصحي" },
  "mental-health": { en: "Mental Health", ar: "الصحة النفسية" },
  research: { en: "Research", ar: "البحث" },
  education: { en: "Education", ar: "التعليم" },
  conditions: { en: "Conditions", ar: "الحالات الصحية" },
  nutrition: { en: "Nutrition & Diet", ar: "التغذية والنظام الغذائي" },
  newcomer: { en: "Newcomers", ar: "القادمون الجدد" },
};

const Glossary = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filtered = glossaryData.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      item.termEn.toLowerCase().includes(normalizedQuery) ||
      item.termAr.toLowerCase().includes(normalizedQuery) ||
      item.definitionEn.toLowerCase().includes(normalizedQuery) ||
      item.definitionAr.toLowerCase().includes(normalizedQuery)
    );
  });

  const glossaryJsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTermSet",
    "name": "SHAMS Health & Advocacy Glossary",
    "description": "Bilingual (English/Arabic) glossary of health, healthcare system, and advocacy terms for Middle Eastern societies in Canada.",
    "inLanguage": ["en", "ar"],
    "hasDefinedTerm": glossaryData.map((item) => ({
      "@type": "DefinedTerm",
      "name": item.termEn,
      "alternateName": item.termAr,
      "description": item.definitionEn,
      "inDefinedTermSet": "SHAMS Health & Advocacy Glossary",
      "termCode": item.id,
    })),
  };

  useEffect(() => {
    const scriptId = "glossary-jsonld";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(glossaryJsonLd);
    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, []);

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

        <div className="relative mb-6 max-w-md mx-auto">
          <Search
            className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${
              isArabic ? "right-3" : "left-3"
            }`}
          />
          <Input
            type="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={isArabic ? "ابحث عن مصطلح..." : "Search terms..."}
            className={isArabic ? "pr-9 text-right" : "pl-9"}
            dir={isArabic ? "rtl" : "ltr"}
            aria-label={isArabic ? "البحث في المصطلحات" : "Search glossary"}
          />
        </div>

        <div className="flex flex-wrap gap-2 justify-center mb-6">
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

        <p className="text-sm text-muted-foreground text-center mb-6">
          {isArabic
            ? `${filtered.length} من ${glossaryData.length} مصطلح`
            : `Showing ${filtered.length} of ${glossaryData.length} terms`}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {isArabic
              ? "لم يتم العثور على مصطلحات مطابقة. جرّب كلمة بحث أخرى."
              : "No matching terms found. Try a different search."}
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((item) => (
              <div key={item.id} className="border rounded-lg p-5 bg-card space-y-2">
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-xl font-bold text-primary">
                    {isArabic ? item.termAr : item.termEn}
                  </span>
                </div>
                <p className="text-foreground">
                  {isArabic ? item.definitionAr : item.definitionEn}
                </p>
                <p className="text-xs opacity-70 border-t pt-2 border-border">
                  {isArabic ? item.definitionEn : item.definitionAr}
                </p>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Glossary;
