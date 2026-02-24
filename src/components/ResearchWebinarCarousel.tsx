import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const RECORDING_URL = "https://youtu.be/3q-R60RmeLI";

const ResearchWebinarCarousel = () => {
  const { language } = useLanguage();
  const isRTL = language === "ar";

  return (
    <section className="py-6 md:py-8">
      <div className="container mx-auto px-4">
        <div
          className={`max-w-2xl mx-auto bg-muted/30 border border-border/50 rounded-xl px-5 py-4 md:px-6 md:py-5 flex flex-col sm:flex-row items-center gap-3 sm:gap-5 ${isRTL ? "text-right" : "text-left"}`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="flex-1 text-center sm:text-start">
            <h3 className={`text-base md:text-lg font-bold text-foreground mb-1 ${isRTL ? "font-cairo" : ""}`}>
              {isRTL ? "فاتتك ندوة البحث؟" : "Missed Our Research Webinar?"}
            </h3>
            <p className={`text-sm text-muted-foreground leading-relaxed ${isRTL ? "font-cairo" : ""}`}>
              {isRTL
                ? "شاهد تسجيل ندوة \"مقدمة في البحث: كيف تحصل على أول فرصة + أخطاء يجب تجنبها\"."
                : "Watch the recording of our Intro to Research: How to Get Your First Role + Mistakes to Avoid session."}
            </p>
          </div>
          <a href={RECORDING_URL} target="_blank" rel="noopener noreferrer" className="shrink-0 w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground">
              <Play className="h-4 w-4" />
              {isRTL ? "شاهد التسجيل" : "Watch Recording"}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ResearchWebinarCarousel;
