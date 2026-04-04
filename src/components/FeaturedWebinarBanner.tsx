import { Button } from "@/components/ui/button";
import { FileText, ExternalLink, Play } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const SLIDES_URL = "/lovable-uploads/womens-health-webinar-poster.pdf";
const RESOURCES_URL = "/lovable-uploads/womens-health-webinar-poster.pdf";
const RECORDING_URL = ""; // Add recording URL when available

const FeaturedWebinarBanner = () => {
  const { language, t } = useLanguage();
  const isRTL = language === "ar" || language === "ku" || language === "fa";
  const hasRecording = RECORDING_URL.length > 0;

  return (
    <section className="py-8 md:py-10">
      <div className="container mx-auto px-4">
        <div
          className={`max-w-2xl mx-auto bg-card border border-border/50 rounded-xl p-5 md:p-6 ${isRTL ? "text-right" : "text-left"}`}
          dir={isRTL ? "rtl" : "ltr"}
        >
          <h3 className={`text-lg md:text-xl font-bold text-foreground mb-1 ${isRTL ? "font-cairo" : ""}`}>
            {t("webinar.missedTitle")}
          </h3>

          <p className={`text-sm text-muted-foreground mb-4 leading-relaxed ${isRTL ? "font-cairo" : ""}`}>
            {t("webinar.missedSubtitle")}
          </p>

          <div className={`flex flex-wrap gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>
            <a href={SLIDES_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-1.5">
                <FileText className="h-4 w-4" />
                {t("common.viewSlides")}
              </Button>
            </a>
            <a href={RESOURCES_URL} target="_blank" rel="noopener noreferrer">
              <Button variant="outline" size="sm" className="gap-1.5">
                <ExternalLink className="h-4 w-4" />
                {t("common.viewResources")}
              </Button>
            </a>
            {hasRecording && (
              <a href={RECORDING_URL} target="_blank" rel="noopener noreferrer">
                <Button size="sm" className="gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <Play className="h-4 w-4" />
                  {t("common.watchRecording")}
                </Button>
              </a>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedWebinarBanner;
