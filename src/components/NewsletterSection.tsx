import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// SHAMS has no mailing list yet, so this section points people to Instagram
// instead of pretending to subscribe them.
const INSTAGRAM_URL = "https://www.instagram.com/projectshams/";

const NewsletterSection = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const isRTL = language === "ar" || language === "ku" || language === "fa";

  return (
    <section className="py-12 md:py-16 bg-healthPurple relative">
      <div className="absolute inset-0 bg-landmarks-pattern opacity-10"></div>
      <div
        className={`container mx-auto px-4 relative z-10 ${isRTL ? "font-cairo" : ""}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="max-w-xl mx-auto text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 text-white">
            {isAr ? "ابقَ على تواصل مع شمس" : "Stay Connected with SHAMS"}
          </h2>
          <p className="text-base md:text-lg mb-6 text-healthLightGray">
            {isAr
              ? "تابعنا على إنستغرام لتصلك أخبار الفعاليات الجديدة وتسجيلات الندوات والنصائح الصحية."
              : "Follow us on Instagram for new events, webinar recordings and health tips."}
          </p>
          <Button asChild className="bg-healthRed hover:bg-red-700 text-white min-h-[48px] px-6">
            <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
              <Instagram className="w-5 h-5 me-2" aria-hidden="true" />
              {isAr ? "تابع @projectshams" : "Follow @projectshams"}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default NewsletterSection;
