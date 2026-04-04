import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, ExternalLink, AlertCircle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import womensHealthPoster from "@/assets/womens-health-webinar-poster.png";

const EMBED_URL = "https://docs.google.com/presentation/d/e/2PACX-1vQYHJsMEg2j8F9sAcu8cOI4cMJBYPIeWPDLZ9lJiISM1B0HGzpYynMwWio6iXLBPdaFr-ixDcDbKJJG/pubembed?start=false&loop=false&delayms=3000";
const VIEW_URL = "https://docs.google.com/presentation/d/e/2PACX-1vQYHJsMEg2j8F9sAcu8cOI4cMJBYPIeWPDLZ9lJiISM1B0HGzpYynMwWio6iXLBPdaFr-ixDcDbKJJG/pub?start=false&loop=false&delayms=3000";
const PDF_URL = "https://docs.google.com/presentation/d/e/2PACX-1vQYHJsMEg2j8F9sAcu8cOI4cMJBYPIeWPDLZ9lJiISM1B0HGzpYynMwWio6iXLBPdaFr-ixDcDbKJJG/pub?start=false&loop=false&delayms=3000&output=pdf";

const WebinarSlidesViewer = () => {
  const { language, t } = useLanguage();
  const isRTL = language === "ar" || language === "ku" || language === "fa";
  const [embedError, setEmbedError] = useState(false);

  return (
    <div className="max-w-5xl mx-auto mb-16">
      <Card className="overflow-hidden border-none shadow-lg">
        <CardContent className="p-0">
          {/* Poster Thumbnail */}
          <div className="relative w-full bg-muted">
            <img
              src={womensHealthPoster}
              alt={t("slides.posterAlt")}
              className="w-full h-auto max-h-[360px] object-cover object-center"
              loading="lazy"
            />
          </div>

          {/* Content */}
          <div className={`p-6 md:p-8 ${isRTL ? "text-right font-cairo" : "text-left"}`} dir={isRTL ? "rtl" : "ltr"}>
            <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
              {t("slides.title")}
            </h2>
            <p className="text-muted-foreground mb-6">
              {t("slides.subtitle")}
            </p>

            {/* Action Buttons */}
            <div className={`flex flex-wrap gap-2 mb-6 ${isRTL ? "flex-row-reverse" : ""}`}>
              <a href={VIEW_URL} target="_blank" rel="noopener noreferrer">
                <Button className="gap-1.5 bg-primary hover:bg-primary/90 text-primary-foreground">
                  <FileText className="h-4 w-4" />
                  {t("common.viewSlides")}
                </Button>
              </a>
              <a href={`https://docs.google.com/presentation/d/${SLIDES_ID}/export/pdf`} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="gap-1.5">
                  <ExternalLink className="h-4 w-4" />
                  {t("slides.downloadDeck")}
                </Button>
              </a>
            </div>

            {/* Embedded Slides Viewer */}
            {!embedError ? (
              <div className="rounded-lg overflow-hidden border border-border/50">
                <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={EMBED_URL}
                    title={t("slides.title")}
                    allowFullScreen
                    onError={() => setEmbedError(true)}
                  />
                </div>
              </div>
            ) : (
              <div className="rounded-lg border border-border/50 bg-muted/30 p-6 text-center">
                <AlertCircle className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
                <p className="text-muted-foreground text-sm mb-3">{t("slides.embedFallback")}</p>
                <a href={VIEW_URL} target="_blank" rel="noopener noreferrer">
                  <Button size="sm" className="gap-1.5">
                    <ExternalLink className="h-4 w-4" />
                    {t("slides.openInNewTab")}
                  </Button>
                </a>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebinarSlidesViewer;
