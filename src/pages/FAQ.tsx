import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import faqData from "../../content/faq.json";

const categories = ["all", "general", "healthcare", "research"] as const;

const categoryLabels: Record<string, { en: string; ar: string }> = {
  all: { en: "All", ar: "الكل" },
  general: { en: "General", ar: "عام" },
  healthcare: { en: "Healthcare", ar: "الرعاية الصحية" },
  research: { en: "Research", ar: "البحث" },
};

const FAQ = () => {
  const { language } = useLanguage();
  const isArabic = language === "ar";
  const [activeCategory, setActiveCategory] = useState<string>("all");

  const filtered = activeCategory === "all"
    ? faqData
    : faqData.filter((item) => item.category === activeCategory);

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

        {/* Category filter */}
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

        <Accordion type="single" collapsible className="space-y-3">
          {filtered.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="border rounded-lg px-4 bg-card"
            >
              <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline">
                {isArabic ? item.questionAr : item.question}
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground pb-4 space-y-3">
                <p>{isArabic ? item.answerAr : item.answer}</p>
                {/* Show other language in smaller text */}
                <p className="text-xs opacity-70 border-t pt-2 border-border">
                  {isArabic ? item.answer : item.answerAr}
                </p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
