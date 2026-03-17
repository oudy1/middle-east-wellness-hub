import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ChevronDown,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  FlaskConical,
  BookOpen,
  GraduationCap,
  Lightbulb,
  Presentation,
  Users,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

const SHAMSResearchPortfolio = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [showAbstract, setShowAbstract] = useState(false);
  const [posterOpen, setPosterOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const images = [
    {
      src: "/lovable-uploads/shams-metropolis-poster.jpg",
      caption: isAr ? "ملصق البحث" : "Research Poster",
      clickable: true,
    },
    {
      src: "/lovable-uploads/shams-metropolis-presenting.jpg",
      caption: isAr ? "العرض في مؤتمر متروبوليس" : "Presented at Metropolis Conference",
      clickable: false,
    },
  ];

  const tags = [
    { en: "Health Equity", ar: "المساواة الصحية", color: "bg-primary/10 text-primary" },
    { en: "MENA Populations", ar: "مجتمعات MENA", color: "bg-secondary/20 text-secondary-foreground" },
    { en: "Poster Presentation", ar: "عرض ملصق", color: "bg-purple-100 text-purple-800" },
    { en: "Community-Led Research", ar: "بحث مجتمعي", color: "bg-green-100 text-green-800" },
    { en: "Access to Care", ar: "الوصول للرعاية", color: "bg-amber-100 text-amber-800" },
  ];

  return (
    <>
      {/* ── Our Research Overview ── */}
      <section className="py-14 bg-gradient-to-br from-primary/5 to-secondary/5">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-center gap-2 mb-3">
            <FlaskConical className="h-7 w-7 text-primary" />
            <h2 className="text-2xl md:text-3xl font-bold text-foreground">
              {isAr ? "أبحاثنا" : "Our Research"}
            </h2>
          </div>
          <p className="text-center text-muted-foreground max-w-3xl mx-auto text-sm leading-relaxed">
            {isAr
              ? "يجري مشروع شمس أبحاثاً مجتمعية تركّز على تحسين الوصول إلى الرعاية الصحية والكفاءة الثقافية والنتائج الصحية لمجتمعات الشرق الأوسط وشمال أفريقيا (MENA) في كندا."
              : "SHAMS conducts community-based research focused on improving healthcare access, cultural competence, and health outcomes for Middle Eastern and North African (MENA) communities in Canada."}
          </p>
        </div>
      </section>

      {/* ── Research Presentations ── */}
      <section className="py-12 bg-background">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Presentation className="h-7 w-7 text-primary" />
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {isAr ? "العروض البحثية" : "Research Presentations"}
            </h2>
          </div>

          <Card className="border border-border/50 shadow-md max-w-4xl mx-auto overflow-hidden">
            <CardContent className="p-0">
              <div className="flex flex-col md:flex-row">
                {/* Image carousel - left column */}
                <div className="md:w-[220px] flex-shrink-0 bg-muted/30 p-4 flex flex-col items-center justify-start gap-2">
                  <div className="relative w-full max-w-[200px]">
                    <button
                      onClick={() => {
                        if (images[activeImage].clickable) setPosterOpen(true);
                      }}
                      className={`block w-full rounded-lg overflow-hidden shadow ${images[activeImage].clickable ? "hover:shadow-lg cursor-pointer" : "cursor-default"} transition-shadow`}
                    >
                      <img
                        src={images[activeImage].src}
                        alt={images[activeImage].caption}
                        className="w-full h-auto object-cover aspect-[3/4]"
                        loading="lazy"
                      />
                    </button>
                    {/* Navigation arrows */}
                    <div className="flex items-center justify-between mt-2">
                      <button
                        onClick={() => setActiveImage((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                        className="p-1 rounded-full bg-muted hover:bg-muted-foreground/10 transition-colors"
                        aria-label="Previous image"
                      >
                        <ChevronLeft className="h-4 w-4 text-muted-foreground" />
                      </button>
                      <p className="text-[10px] text-muted-foreground text-center flex-1 px-1">
                        {images[activeImage].caption}
                      </p>
                      <button
                        onClick={() => setActiveImage((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                        className="p-1 rounded-full bg-muted hover:bg-muted-foreground/10 transition-colors"
                        aria-label="Next image"
                      >
                        <ChevronRight className="h-4 w-4 text-muted-foreground" />
                      </button>
                    </div>
                    {/* Dots */}
                    <div className="flex justify-center gap-1.5 mt-1">
                      {images.map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setActiveImage(i)}
                          className={`w-1.5 h-1.5 rounded-full transition-colors ${i === activeImage ? "bg-primary" : "bg-muted-foreground/30"}`}
                          aria-label={`Image ${i + 1}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Details - right column */}
                <div className={`flex-1 p-5 space-y-3 ${isAr ? "text-right" : "text-left"}`} dir={isAr ? "rtl" : "ltr"}>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag, i) => (
                      <Badge key={i} className={`${tag.color} text-[10px] px-1.5 py-0.5 border-0 font-medium`}>
                        {isAr ? tag.ar : tag.en}
                      </Badge>
                    ))}
                  </div>

                  {/* Title */}
                  <h3 className="text-base font-bold text-foreground leading-snug">
                    {isAr
                      ? "سد الفجوات في استخدام خدمات الرعاية الصحية: مبادرة مجتمعية لسكان MENA في كندا"
                      : "Bridging Gaps in Health Care Service Utilization: A Community-Led Initiative for MENA Populations in Canada"}
                  </h3>

                  {/* Conference info */}
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
                    <span className="font-semibold">
                      {isAr ? "المؤتمر:" : "Conference:"}{" "}
                      <span className="font-normal">Metropolis Canada Conference, Halifax 2026</span>
                    </span>
                    <span className="font-semibold">
                      {isAr ? "الشكل:" : "Format:"}{" "}
                      <span className="font-normal">{isAr ? "عرض ملصق" : "Poster Presentation"}</span>
                    </span>
                  </div>

                  {/* Authors */}
                  <p className="text-xs text-muted-foreground">
                    <span className="font-semibold">{isAr ? "المؤلفون:" : "Authors:"}</span>{" "}
                    Mahmoud Noweir, Mousa El-Sururi
                  </p>
                  <p className="text-[10px] text-muted-foreground/70 italic -mt-2">
                    University of Waterloo &nbsp;·&nbsp; University of Toronto
                  </p>

                  {/* Abstract */}
                  <div className={`text-sm text-muted-foreground leading-relaxed ${showAbstract ? "" : "line-clamp-3"}`}>
                    <p>
                      {isAr
                        ? "تواجه مجتمعات الشرق الأوسط وشمال أفريقيا المهاجرة في كندا احتياجات صحية كبيرة مع انخفاض مستمر في استخدام خدمات الرعاية الصحية، بسبب الحواجز اللغوية والتمييز وغياب الرعاية المتوافقة ثقافياً. شمس مبادرة مجتمعية تبحث هذه العوائق وتطوّر حلولاً بالتعاون مع شباب وعائلات وأطباء من مجتمعات MENA، بهدف تقليل الوصمة وتحسين الثقافة الصحية وتعزيز خدمات أكثر عدالة وأماناً ثقافياً."
                        : "Middle Eastern/North African (MENA) immigrant communities in Canada experience significant health needs yet persistently low utilization of healthcare services, driven by linguistic barriers, discrimination, and lack of culturally responsive care. SHAMS is a community-led initiative that investigates these barriers and co-develops interventions with MENA youth, families, and clinicians. Through culturally grounded education, barrier-identification research, and advocacy, SHAMS aims to reduce stigma, improve health literacy, and inform more equitable, culturally safe health services for MENA populations across Canada."}
                    </p>
                  </div>

                  <button
                    onClick={() => setShowAbstract(!showAbstract)}
                    className="flex items-center gap-1 text-xs text-primary hover:text-primary/80 font-medium transition-colors"
                  >
                    {showAbstract
                      ? isAr ? "إخفاء" : "Show Less"
                      : isAr ? "عرض الملخص الكامل" : "View Full Abstract"}
                    {showAbstract ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                  </button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Future publications note */}
          <p className="text-center text-xs text-muted-foreground mt-6 italic">
            {isAr
              ? "المزيد من ملخصات وعروض ومنشورات شمس قريباً."
              : "More SHAMS abstracts, presentations, and publications coming soon."}
          </p>
        </div>
      </section>

      {/* Poster lightbox */}
      <Dialog open={posterOpen} onOpenChange={setPosterOpen}>
        <DialogContent className="max-w-3xl p-2">
          <DialogTitle className="sr-only">
            {isAr ? "ملصق بحث شمس" : "SHAMS Research Poster"}
          </DialogTitle>
          <img
            src="/lovable-uploads/shams-metropolis-poster.jpg"
            alt={isAr ? "ملصق بحث شمس" : "SHAMS Research Poster"}
            className="w-full h-auto rounded"
          />
        </DialogContent>
      </Dialog>

      {/* ── What We're Working On ── */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Lightbulb className="h-7 w-7 text-primary" />
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {isAr ? "ما نعمل عليه حالياً" : "What We're Working On"}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[
              {
                en: "Expanding research on healthcare access in MENA communities",
                ar: "توسيع الأبحاث حول الوصول إلى الرعاية الصحية في مجتمعات MENA",
                icon: <FlaskConical className="h-5 w-5 text-primary" />,
              },
              {
                en: "Developing culturally informed health education programs",
                ar: "تطوير برامج تثقيف صحي مراعية للثقافة",
                icon: <BookOpen className="h-5 w-5 text-primary" />,
              },
              {
                en: "Building partnerships with researchers and institutions",
                ar: "بناء شراكات مع باحثين ومؤسسات",
                icon: <Users className="h-5 w-5 text-primary" />,
              },
              {
                en: "Conducting community-based surveys and needs assessments",
                ar: "إجراء استطلاعات مجتمعية وتقييمات للاحتياجات",
                icon: <GraduationCap className="h-5 w-5 text-primary" />,
              },
            ].map((item, i) => (
              <Card key={i} className="border border-border/30 shadow-sm p-4 flex items-start gap-3">
                <div className="mt-0.5 flex-shrink-0">{item.icon}</div>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {isAr ? item.ar : item.en}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default SHAMSResearchPortfolio;
