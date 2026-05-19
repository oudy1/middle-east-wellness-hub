import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Copy, Check, Mail, FileDown } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { toast } from "@/hooks/use-toast";
import glossaryData from "../../content/glossary.json";
import { HighlightText } from "@/components/HighlightText";

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
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopy = async (item: typeof glossaryData[number]) => {
    const term = isArabic ? item.termAr : item.termEn;
    const definition = isArabic ? item.definitionAr : item.definitionEn;
    const text = `${term}: ${definition}`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(item.id);
      toast({
        title: isArabic ? "تم النسخ" : "Copied",
        description: isArabic ? "تم نسخ المصطلح والتعريف" : "Term and definition copied to clipboard",
      });
      setTimeout(() => setCopiedId((prev) => (prev === item.id ? null : prev)), 2000);
    } catch {
      toast({
        title: isArabic ? "فشل النسخ" : "Copy failed",
        variant: "destructive",
      });
    }
  };

  const handleEmail = (item: typeof glossaryData[number]) => {
    const term = isArabic ? item.termAr : item.termEn;
    const definition = isArabic ? item.definitionAr : item.definitionEn;
    const subject = isArabic
      ? `مصطلح من مسرد SHAMS: ${term}`
      : `SHAMS Glossary term: ${term}`;
    const body = isArabic
      ? `${term}\n\n${definition}\n\nمن مسرد SHAMS: ${window.location.href}`
      : `${term}\n\n${definition}\n\nFrom the SHAMS Glossary: ${window.location.href}`;
    window.location.href = `mailto:?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const buildPdfHtml = (items: typeof glossaryData) => {
    const dir = isArabic ? "rtl" : "ltr";
    const lang = isArabic ? "ar" : "en";
    const fontFamily = isArabic
      ? "'Cairo', 'Segoe UI', Tahoma, sans-serif"
      : "'Segoe UI', Helvetica, Arial, sans-serif";
    const title = isArabic ? "مسرد SHAMS" : "SHAMS Glossary";
    const subtitle = isArabic
      ? `${items.length} مصطلح`
      : `${items.length} term${items.length === 1 ? "" : "s"}`;
    const footer = isArabic
      ? "مشروع SHAMS - projectshams.com"
      : "SHAMS Project - projectshams.com";
    const altLabel = isArabic ? "English" : "العربية";

    const escapeHtml = (s: string) =>
      s.replace(/[&<>"']/g, (c) =>
        ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string)
      );

    const cards = items
      .map((item) => {
        const term = isArabic ? item.termAr : item.termEn;
        const definition = isArabic ? item.definitionAr : item.definitionEn;
        const altTerm = isArabic ? item.termEn : item.termAr;
        const altDef = isArabic ? item.definitionEn : item.definitionAr;
        const altDir = isArabic ? "ltr" : "rtl";
        return `
          <article class="card">
            <h2>${escapeHtml(term)}</h2>
            <p class="def">${escapeHtml(definition)}</p>
            <div class="alt" dir="${altDir}">
              <span class="alt-label">${altLabel}:</span>
              <strong>${escapeHtml(altTerm)}</strong> - ${escapeHtml(altDef)}
            </div>
          </article>`;
      })
      .join("");

    return `<!doctype html>
<html lang="${lang}" dir="${dir}">
<head>
<meta charset="utf-8" />
<title>${title}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cairo:wght@400;600;700&display=swap" rel="stylesheet">
<style>
  @page { size: A4; margin: 18mm; }
  * { box-sizing: border-box; }
  body { font-family: ${fontFamily}; color: #1a1a1a; margin: 0; line-height: 1.55; }
  header { border-bottom: 2px solid #0f6b6b; padding-bottom: 10px; margin-bottom: 18px; }
  header h1 { margin: 0; font-size: 22px; color: #0f6b6b; }
  header p { margin: 4px 0 0; color: #555; font-size: 12px; }
  .card { border: 1px solid #ddd; border-radius: 6px; padding: 12px 14px; margin-bottom: 12px; page-break-inside: avoid; }
  .card h2 { margin: 0 0 6px; font-size: 15px; color: #0f6b6b; }
  .def { margin: 0 0 8px; font-size: 12.5px; }
  .alt { font-size: 11px; color: #555; border-top: 1px dashed #ddd; padding-top: 6px; }
  .alt-label { font-weight: 600; margin-${isArabic ? "left" : "right"}: 4px; }
  footer { margin-top: 18px; padding-top: 8px; border-top: 1px solid #ddd; font-size: 10px; color: #777; text-align: center; }
  @media print { .no-print { display: none !important; } }
  .toolbar { position: fixed; top: 10px; ${isArabic ? "left" : "right"}: 10px; background: #0f6b6b; color: #fff; padding: 8px 14px; border-radius: 4px; font-size: 13px; cursor: pointer; border: 0; }
</style>
</head>
<body>
  <button class="toolbar no-print" onclick="window.print()">${isArabic ? "طباعة / حفظ PDF" : "Print / Save PDF"}</button>
  <header>
    <h1>${title}</h1>
    <p>${subtitle}</p>
  </header>
  <main>${cards}</main>
  <footer>${footer}</footer>
  <script>
    window.addEventListener('load', () => { setTimeout(() => window.print(), 600); });
  <\/script>
</body>
</html>`;
  };

  const openPdf = (items: typeof glossaryData) => {
    if (!items.length) {
      toast({
        title: isArabic ? "لا توجد نتائج" : "No results",
        variant: "destructive",
      });
      return;
    }
    const w = window.open("", "_blank");
    if (!w) {
      toast({
        title: isArabic ? "تم حظر النافذة" : "Popup blocked",
        description: isArabic
          ? "يرجى السماح بالنوافذ المنبثقة لتنزيل PDF"
          : "Please allow popups to download the PDF",
        variant: "destructive",
      });
      return;
    }
    w.document.open();
    w.document.write(buildPdfHtml(items));
    w.document.close();
  };


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

  // Alphabet jump bar setup
  const englishAlphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
  const arabicAlphabet = "ابتثجحخدذرزسشصضطظعغفقكلمنهوي".split("");
  const alphabet = isArabic ? arabicAlphabet : englishAlphabet;

  const getFirstLetter = (item: typeof glossaryData[number]) => {
    const term = isArabic ? item.termAr : item.termEn;
    return (term?.trim().charAt(0) || "#").toUpperCase();
  };

  // Sort filtered terms alphabetically for the active language
  const sortedFiltered = [...filtered].sort((a, b) => {
    const aTerm = isArabic ? a.termAr : a.termEn;
    const bTerm = isArabic ? b.termAr : b.termEn;
    return aTerm.localeCompare(bTerm, isArabic ? "ar" : "en");
  });

  // Group by first letter
  const groupedByLetter = sortedFiltered.reduce<Record<string, typeof glossaryData>>((acc, item) => {
    const letter = getFirstLetter(item);
    if (!acc[letter]) acc[letter] = [];
    acc[letter].push(item);
    return acc;
  }, {});

  const availableLetters = new Set(Object.keys(groupedByLetter));

  const scrollToLetter = (letter: string) => {
    const el = document.getElementById(`letter-${letter}`);
    if (el) {
      const yOffset = -80;
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

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

        <div className="flex items-center justify-center gap-3 flex-wrap mb-4">
          <p className="text-sm text-muted-foreground">
            {isArabic
              ? `${filtered.length} من ${glossaryData.length} مصطلح`
              : `Showing ${filtered.length} of ${glossaryData.length} terms`}
          </p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => openPdf(sortedFiltered)}
            disabled={sortedFiltered.length === 0}
            className="h-8 text-xs"
          >
            <FileDown className={`h-3.5 w-3.5 ${isArabic ? "ml-1" : "mr-1"}`} />
            {isArabic ? "تنزيل PDF" : "Download PDF"}
          </Button>
        </div>

        {/* A-Z Jump Bar */}
        <div
          className="sticky top-16 z-10 bg-background/95 backdrop-blur-sm py-3 mb-4 border-b border-border"
          dir={isArabic ? "rtl" : "ltr"}
        >
          <div className="flex flex-wrap gap-1 justify-center">
            {alphabet.map((letter) => {
              const enabled = availableLetters.has(letter);
              return (
                <button
                  key={letter}
                  onClick={() => enabled && scrollToLetter(letter)}
                  disabled={!enabled}
                  className={`min-w-[28px] h-7 px-1.5 rounded text-xs font-semibold transition-colors ${
                    enabled
                      ? "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground cursor-pointer"
                      : "text-muted-foreground/40 cursor-not-allowed"
                  }`}
                  aria-label={
                    isArabic ? `الانتقال إلى ${letter}` : `Jump to ${letter}`
                  }
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            {isArabic
              ? "لم يتم العثور على مصطلحات مطابقة. جرّب كلمة بحث أخرى."
              : "No matching terms found. Try a different search."}
          </div>
        ) : (
          <div className="space-y-8">
            {Object.entries(groupedByLetter).map(([letter, items]) => (
              <section key={letter} id={`letter-${letter}`} className="scroll-mt-24">
                <h2 className="text-2xl font-bold text-primary border-b-2 border-primary/30 pb-2 mb-4">
                  {letter}
                </h2>
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="border rounded-lg p-5 bg-card space-y-2">
                      <div className="flex items-baseline gap-3 flex-wrap justify-between">
                        <span className="text-xl font-bold text-primary">
                          <HighlightText
                            text={isArabic ? item.termAr : item.termEn}
                            query={searchQuery}
                          />
                        </span>
                        <div className="flex items-center gap-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCopy(item)}
                            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                            aria-label={isArabic ? "نسخ المصطلح والتعريف" : "Copy term and definition"}
                          >
                            {copiedId === item.id ? (
                              <Check className="h-3.5 w-3.5" />
                            ) : (
                              <Copy className="h-3.5 w-3.5" />
                            )}
                            <span className={isArabic ? "mr-1" : "ml-1"}>
                              {copiedId === item.id
                                ? isArabic ? "تم النسخ" : "Copied"
                                : isArabic ? "نسخ" : "Copy"}
                            </span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEmail(item)}
                            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                            aria-label={isArabic ? "إرسال التعريف بالبريد الإلكتروني" : "Email definition"}
                          >
                            <Mail className="h-3.5 w-3.5" />
                            <span className={isArabic ? "mr-1" : "ml-1"}>
                              {isArabic ? "إرسال" : "Email"}
                            </span>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => openPdf([item])}
                            className="h-8 px-2 text-xs text-muted-foreground hover:text-foreground"
                            aria-label={isArabic ? "تنزيل التعريف PDF" : "Download definition as PDF"}
                          >
                            <FileDown className="h-3.5 w-3.5" />
                            <span className={isArabic ? "mr-1" : "ml-1"}>
                              {isArabic ? "PDF" : "PDF"}
                            </span>
                          </Button>
                        </div>
                      </div>
                      <p className="text-foreground">
                        <HighlightText
                          text={isArabic ? item.definitionAr : item.definitionEn}
                          query={searchQuery}
                        />
                      </p>
                      <p className="text-xs opacity-70 border-t pt-2 border-border">
                        <HighlightText
                          text={isArabic ? item.definitionEn : item.definitionAr}
                          query={searchQuery}
                        />
                      </p>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Glossary;
