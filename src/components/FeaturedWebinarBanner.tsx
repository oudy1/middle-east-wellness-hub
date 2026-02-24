import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Toggle this to switch from registration to recording mode
const EVENT_STATUS: "upcoming" | "completed" = "upcoming";
const REGISTRATION_URL = "https://forms.gle/MuxC2jfxYsTgZEbr6";
const RECORDING_URL = ""; // Add recording URL when available

const FeaturedWebinarBanner = () => {
  const { language } = useLanguage();
  const isRTL = language === "ar";
  const isCompleted = (EVENT_STATUS as string) === "completed";

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-healthLightGray to-white">
      <div className="container mx-auto px-4">
        <div
          className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-healthTeal/20 max-w-5xl mx-auto ${isRTL ? "text-right" : "text-left"}`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <div className="grid md:grid-cols-2 gap-0">
            {/* Poster */}
            <a
              href="/lovable-uploads/womens-health-webinar-poster.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="block"
            >
              <img
                src="/lovable-uploads/womens-health-webinar-poster.jpg"
                alt={isRTL ? "ملصق ندوة صحة المرأة" : "Women's Health Webinar Poster"}
                className="w-full h-full object-cover cursor-pointer hover:opacity-95 transition-opacity"
              />
            </a>

            {/* Content */}
            <div className="p-6 md:p-8 flex flex-col justify-center">
              <Badge className="bg-healthTeal/15 text-healthTeal border-healthTeal/30 w-fit mb-4 text-xs">
                {isRTL ? "ندوة مجانية" : "Free Webinar"}
              </Badge>

              <h2 className={`text-2xl md:text-3xl font-bold text-healthDarkBlue mb-2 leading-tight ${isRTL ? "font-cairo" : ""}`}>
                {isRTL ? "صحة المرأة عبر مراحل الحياة" : "Women's Health Across Life Stages"}
              </h2>

              <p className="text-sm text-healthTeal font-semibold mb-3">
                {isRTL ? "الخميس، ٢٦ مارس • ٧:٠٠ مساءً" : "Thursday, March 26 • 7:00 PM"}
              </p>

              <p className={`text-gray-600 mb-5 leading-relaxed text-sm md:text-base ${isRTL ? "font-cairo" : ""}`}>
                {isRTL
                  ? "مساحة للحديث عن الهرمونات، التعافي، والدعم. انضموا لنا في ندوة تعليمية حول مواضيع صحة المرأة ذات الصلة بمجتمعاتنا."
                  : "A space to talk about hormones, healing, and support. Join Project SHAMS for an educational webinar focused on women's health topics relevant to Middle Eastern communities."}
              </p>

              <p className={`text-xs text-gray-500 mb-6 ${isRTL ? "font-cairo" : ""}`}>
                {isRTL ? "مقدّمة من مشروع شمس" : "Hosted by Project SHAMS"}
              </p>

              <a
                href={isCompleted ? RECORDING_URL : REGISTRATION_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Button className="w-full md:w-auto bg-healthTeal hover:bg-healthTeal/90 text-white text-base px-8 py-3 h-auto">
                  {isCompleted ? (
                    <>
                      <Play className="h-5 w-5" />
                      {isRTL ? "شاهد التسجيل" : "Watch Recording"}
                    </>
                  ) : (
                    <>
                      <ExternalLink className="h-5 w-5" />
                      {isRTL ? "سجّل الآن" : "Register Here"}
                    </>
                  )}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWebinarBanner;
