import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  BookOpen,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  FileText,
  FlaskConical,
  GraduationCap,
  Lightbulb,
  Presentation,
  Users,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  Dialog,
  DialogContent,
  DialogTitle,
} from "@/components/ui/dialog";

const SHAMSResearchPortfolio = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [showAbstract, setShowAbstract] = useState(false);
  const [posterOpen, setPosterOpen] = useState(false);

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

      {/* ── Abstracts & Publications ── */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-center gap-2 mb-6">
            <FileText className="h-7 w-7 text-primary" />
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {isAr ? "الملخصات والمنشورات" : "Abstracts & Publications"}
            </h2>
          </div>

          {/* Abstract card */}
          <Card className="border border-border/50 shadow-md max-w-4xl mx-auto">
            <CardHeader className="pb-2">
              <div className="flex flex-wrap gap-1.5 mb-2">
                {[
                  { en: "Health Equity", ar: "المساواة الصحية", color: "bg-primary/10 text-primary" },
                  { en: "MENA Communities", ar: "مجتمعات MENA", color: "bg-secondary/20 text-secondary-foreground" },
                  { en: "Mental Health", ar: "الصحة النفسية", color: "bg-purple-100 text-purple-800" },
                  { en: "Access to Care", ar: "الوصول للرعاية", color: "bg-green-100 text-green-800" },
                ].map((tag, i) => (
                  <Badge key={i} className={`${tag.color} text-[10px] px-1.5 py-0.5 border-0 font-medium`}>
                    {isAr ? tag.ar : tag.en}
                  </Badge>
                ))}
              </div>
              <CardTitle className="text-base leading-snug text-foreground">
                {isAr
                  ? "سد الفجوات في استخدام خدمات الرعاية الصحية: منظمة شعبية غير ربحية لسكان MENA في كندا"
                  : "Bridging Gaps in Health Care Service Utilization: A Grassroots Non-Profit Organization for MENA Populations in Canada"}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <p className="text-xs text-muted-foreground">
                <span className="font-semibold">{isAr ? "المؤلفون:" : "Authors:"}</span>{" "}
                Mousa El-Sururi<sup>1</sup>, Mahmoud Noweir<sup>2</sup>, Abdullah Al Azzawi<sup>3</sup>
              </p>
              <p className="text-[10px] text-muted-foreground italic">
                <sup>1</sup> University of Toronto &nbsp;|&nbsp; <sup>2</sup> University of Waterloo &nbsp;|&nbsp; <sup>3</sup> McMaster University
              </p>

              {/* Condensed abstract */}
              <div className={`text-sm text-muted-foreground leading-relaxed ${showAbstract ? "" : "line-clamp-3"}`}>
                {isAr ? (
                  <p>
                    تواجه مجتمعات الشرق الأوسط وشمال أفريقيا في كندا عوائق متعددة أمام الرعاية الصحية، بما في ذلك الحواجز اللغوية والوصمة الأسرية وقلة مقدمي الرعاية المؤهلين ثقافياً. يعالج مشروع شمس هذه الفجوات من خلال التثقيف الصحي المتاح بعدة لغات، وورش العمل المجتمعية، والأبحاث المبنية على احتياجات المجتمع، والحلول التعاونية مع مؤسسات صحية وأكاديمية، بهدف تحسين الوصول إلى الخدمات الصحية والوعي والنتائج الصحية.
                  </p>
                ) : (
                  <p>
                    MENA communities in Canada face significant barriers to healthcare, including linguistic challenges, family-related stigma, and limited access to culturally and religiously competent providers. SHAMS addresses these gaps through multilingual health education, community workshops, community-based research to understand needs, and co-developed solutions with healthcare and academic partners, all aimed at improving healthcare access, awareness, and outcomes.
                  </p>
                )}
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
            </CardContent>
          </Card>

          {/* Placeholder for future publications */}
          <p className="text-center text-xs text-muted-foreground mt-6 italic">
            {isAr
              ? "المزيد من المنشورات والمخرجات البحثية قريباً."
              : "More publications and research outputs coming soon."}
          </p>
        </div>
      </section>

      {/* ── Conferences & Presentations ── */}
      <section className="py-12 bg-muted/20">
        <div className="container mx-auto px-4 max-w-5xl">
          <div className="flex items-center justify-center gap-2 mb-6">
            <Presentation className="h-7 w-7 text-primary" />
            <h2 className="text-xl md:text-2xl font-bold text-foreground">
              {isAr ? "المؤتمرات والعروض التقديمية" : "Conferences & Presentations"}
            </h2>
          </div>

          <Card className="border border-border/50 shadow-md max-w-4xl mx-auto">
            <CardContent className="p-5">
              <div className="flex flex-col md:flex-row gap-5">
                {/* Images */}
                <div className="flex flex-row md:flex-col gap-3 flex-shrink-0 justify-center">
                  <button
                    onClick={() => setPosterOpen(true)}
                    className="block rounded-lg overflow-hidden shadow hover:shadow-lg transition-shadow max-w-[160px]"
                  >
                    <img
                      src="/lovable-uploads/shams-metropolis-poster.jpg"
                      alt={isAr ? "ملصق بحث شمس" : "SHAMS Research Poster"}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                    <p className="text-[10px] text-muted-foreground text-center py-1 bg-muted/50">
                      {isAr ? "ملصق البحث" : "Research Poster"}
                    </p>
                  </button>
                  <div className="rounded-lg overflow-hidden shadow max-w-[160px]">
                    <img
                      src="/lovable-uploads/shams-metropolis-presenting.jpg"
                      alt={isAr ? "فريق شمس في المؤتمر" : "SHAMS presenting at conference"}
                      className="w-full h-auto object-cover"
                      loading="lazy"
                    />
                    <p className="text-[10px] text-muted-foreground text-center py-1 bg-muted/50">
                      {isAr ? "فريق شمس يقدم البحث" : "Presented by SHAMS team"}
                    </p>
                  </div>
                </div>

                {/* Details */}
                <div className={`flex-grow space-y-3 ${isAr ? "text-right" : "text-left"}`} dir={isAr ? "rtl" : "ltr"}>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                      {isAr ? "المؤتمر" : "Conference"}
                    </p>
                    <h3 className="text-base font-bold text-foreground">
                      {isAr ? "مؤتمر متروبوليس (كندا)" : "Metropolis Conference (Canada)"}
                    </h3>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wider mb-1">
                      {isAr ? "العرض التقديمي" : "Presentation"}
                    </p>
                    <p className="text-sm text-foreground font-medium">
                      {isAr
                        ? '"سد الفجوات في استخدام خدمات الرعاية الصحية لسكان MENA"'
                        : '"Bridging Gaps in Health Care Service Utilization for MENA Populations"'}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {isAr
                      ? "قدّم فريق شمس أبحاثه حول عوائق الوصول إلى الرعاية الصحية والحلول المجتمعية لسكان الشرق الأوسط وشمال أفريقيا في كندا."
                      : "SHAMS presented its research on healthcare access barriers and community-driven solutions for MENA populations in Canada."}
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      { en: "Poster Presentation", ar: "عرض ملصق" },
                      { en: "Metropolis Institute", ar: "معهد متروبوليس" },
                    ].map((tag, i) => (
                      <Badge key={i} variant="secondary" className="text-[10px] px-1.5 py-0.5">
                        {isAr ? tag.ar : tag.en}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Poster lightbox dialog */}
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
      <section className="py-12 bg-white">
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
