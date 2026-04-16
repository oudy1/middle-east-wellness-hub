import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqData from "../../content/faq.json";
import { HighlightText } from "@/components/HighlightText";

const categories = ["all", "general", "healthcare", "mental-health", "research", "newcomer"] as const;

const categoryLabels: Record<string, { en: string; ar: string }> = {
  all: { en: "All", ar: "الكل" },
  general: { en: "General", ar: "عام" },
  healthcare: { en: "Healthcare", ar: "الرعاية الصحية" },
  "mental-health": { en: "Mental Health", ar: "الصحة النفسية" },
  research: { en: "Research", ar: "البحث" },
  newcomer: { en: "Newcomers", ar: "القادمون الجدد" },
};

const FAQ = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const normalizedQuery = searchQuery.trim().toLowerCase();
  const filtered = faqData.filter((item) => {
    const matchesCategory = activeCategory === "all" || item.category === activeCategory;
    if (!matchesCategory) return false;
    if (!normalizedQuery) return true;
    return (
      item.questionEn.toLowerCase().includes(normalizedQuery) ||
      item.questionAr.toLowerCase().includes(normalizedQuery) ||
      item.answerEn.toLowerCase().includes(normalizedQuery) ||
      item.answerAr.toLowerCase().includes(normalizedQuery)
    );
  });

  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map((item) => ({
      "@type": "Question",
      "name": item.questionEn,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answerEn,
      },
    })),
  };

  useEffect(() => {
    const scriptId = "faq-jsonld";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(faqJsonLd);
    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="FAQ - SHAMS"
        description="Frequently asked questions about SHAMS, health resources, and community services for Middle Eastern societies in Canada."
      />
      <Header />

      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto w-full">
        <h1 className="text-3xl font-bold text-foreground mb-2 text-center">
          {isArabic ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
        </h1>
        <p className="text-muted-foreground text-center mb-8">
          {isArabic
            ? "إجابات على الأسئلة الأكثر شيوعا حول شمس وخدماتنا"
            : "Answers to common questions about SHAMS and our services"}
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
            placeholder={isArabic ? "ابحث في الأسئلة..." : "Search questions..."}
            className={isArabic ? "pr-9 text-right" : "pl-9"}
            dir={isArabic ? "rtl" : "ltr"}
            aria-label={isArabic ? "البحث في الأسئلة الشائعة" : "Search FAQ"}
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
            ? `${filtered.length} من ${faqData.length} سؤال`
            : `Showing ${filtered.length} of ${faqData.length} questions`}
        </p>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {isArabic
              ? "لم يتم العثور على أسئلة مطابقة. جرّب كلمة بحث أخرى."
              : "No matching questions found. Try a different search."}
          </div>
        ) : (
          <Accordion type="single" collapsible className="space-y-3">
            {filtered.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border rounded-lg px-4 bg-card"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                  <HighlightText
                    text={isArabic ? item.questionAr : item.questionEn}
                    query={searchQuery}
                  />
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4 space-y-3">
                  <p>
                    <HighlightText
                      text={isArabic ? item.answerAr : item.answerEn}
                      query={searchQuery}
                    />
                  </p>
                  <p className="text-xs opacity-70 border-t pt-2 border-border">
                    <HighlightText
                      text={isArabic ? item.answerEn : item.answerAr}
                      query={searchQuery}
                    />
                  </p>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
