import { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const REEL_URL =
  "https://www.instagram.com/reel/DbCMtfkuVQK/?utm_source=ig_web_copy_link";
const REEL_LINK = "https://www.instagram.com/reel/DbCMtfkuVQK/";

declare global {
  interface Window {
    instgrm?: { Embeds: { process: () => void } };
  }
}

const FeaturedEventSection = () => {
  const { language } = useLanguage();
  const isRTL = language === "ar" || language === "ku" || language === "fa";
  const isAr = language === "ar";
  const [embedFailed, setEmbedFailed] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const sectionTitle = isAr
    ? "من أبرز الفعاليات السابقة"
    : "Past Event Highlight";
  const recapTitle = isAr
    ? "ملخص مؤتمر الصحة النفسية"
    : "Mental Health Convention Recap";
  const description = isAr
    ? "شكراً لكل من شارك في مؤتمر شمس للصحة النفسية. جمع هذا الحدث أفراد المجتمع، والعاملين في الرعاية الصحية، والطلاب، والمنظمات في جلسات حوارية وورش عمل وتواصل مجتمعي ونقاشات حول وصمة الصحة النفسية والدعم المتاح."
    : "Thank you to everyone who joined SHAMS for our Mental Health Convention. This event brought together community members, healthcare professionals, students, and organizations for panels, workshops, networking, and conversations around mental health stigma and support.";
  const watchCta = isAr ? "شاهد على إنستغرام" : "Watch on Instagram";
  const watchRecapCta = isAr ? "شاهد الملخص على إنستغرام" : "Watch Recap on Instagram";
  const badge = isAr ? "فعالية سابقة" : "Past Event";

  useEffect(() => {
    const SCRIPT_SRC = "https://www.instagram.com/embed.js";
    const existing = document.querySelector<HTMLScriptElement>(
      `script[src="${SCRIPT_SRC}"]`,
    );
    if (!existing) {
      const s = document.createElement("script");
      s.src = SCRIPT_SRC;
      s.async = true;
      s.onerror = () => setEmbedFailed(true);
      document.body.appendChild(s);
    } else if (window.instgrm) {
      window.instgrm.Embeds.process();
    }

    const timeout = window.setTimeout(() => {
      const iframe = containerRef.current?.querySelector("iframe");
      if (!iframe) setEmbedFailed(true);
    }, 4000);
    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-background to-muted/30">
      <div
        className={`container mx-auto px-4 ${isRTL ? "font-cairo" : ""}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="max-w-2xl mx-auto text-center space-y-3 mb-6">
          <span className="inline-block px-3 py-1 text-xs font-semibold bg-healthGold/20 text-healthDarkBlue rounded-full">
            {badge}
          </span>
          <h2 className="text-xl md:text-2xl font-bold text-foreground">
            {sectionTitle}
          </h2>
          <p className="text-base md:text-lg font-semibold text-primary">
            {recapTitle}
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div
          ref={containerRef}
          className="w-full max-w-[400px] mx-auto overflow-hidden ig-reel-embed"
          dir="ltr"
        >
          {!embedFailed ? (
            <blockquote
              className="instagram-media"
              data-instgrm-permalink={REEL_URL}
              data-instgrm-version="14"
              style={{
                background: "#FFF",
                border: 0,
                borderRadius: "12px",
                boxShadow:
                  "0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)",
                margin: "0 auto",
                maxWidth: "100%",
                width: "100%",
                minWidth: 0,
                padding: 0,
              }}
            >
              <a href={REEL_URL} target="_blank" rel="noopener noreferrer">
                {watchCta}
              </a>
            </blockquote>
          ) : (
            <div className="rounded-2xl border border-border/50 bg-card shadow-md p-6 text-center space-y-4">
              <div className="mx-auto w-14 h-14 rounded-full bg-gradient-to-br from-pink-500 via-red-500 to-yellow-500 flex items-center justify-center">
                <Instagram className="h-7 w-7 text-white" />
              </div>
              <p className="text-sm text-muted-foreground">{recapTitle}</p>
              <Button
                asChild
                className="bg-healthDarkBlue hover:bg-healthDarkBlue/90 text-white"
              >
                <a href={REEL_LINK} target="_blank" rel="noopener noreferrer">
                  {watchRecapCta}
                </a>
              </Button>
            </div>
          )}
        </div>

        <div className="flex justify-center mt-5">
          <Button
            asChild
            variant="outline"
            className="border-healthDarkBlue text-healthDarkBlue hover:bg-healthDarkBlue/5"
          >
            <a href={REEL_LINK} target="_blank" rel="noopener noreferrer">
              <Instagram className={`h-4 w-4 ${isRTL ? "ml-2" : "mr-2"}`} />
              {watchCta}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventSection;
