import { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const REEL_URL =
  "https://www.instagram.com/reel/DZYnmHTs4pG/?utm_source=ig_web_copy_link";

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
  const subtitle = isAr
    ? "فعالية التواصل للعرب في القطاع الصحي"
    : "Arabs in Healthcare Networking Event";
  const description = isAr
    ? "شاهدوا أبرز لحظات فعالية شمس للتواصل بين العرب في القطاع الصحي، حيث اجتمع المختصون والطلاب في المجال الصحي للتعارف ومشاركة الخبرات وبناء مجتمع متماسك."
    : "Catch highlights from our SHAMS Arabs in Healthcare networking event, where healthcare professionals and students came together to connect, share experiences, and build community.";
  const watchCta = isAr ? "شاهد على إنستغرام" : "Watch on Instagram";
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
            {subtitle}
          </p>
          <p className="text-sm md:text-base text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>

        <div
          ref={containerRef}
          className="max-w-[400px] mx-auto"
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
                maxWidth: "400px",
                minWidth: "280px",
                width: "100%",
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
              <p className="text-sm text-muted-foreground">{subtitle}</p>
              <Button
                asChild
                className="bg-healthDarkBlue hover:bg-healthDarkBlue/90 text-white"
              >
                <a href={REEL_URL} target="_blank" rel="noopener noreferrer">
                  {watchCta}
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default FeaturedEventSection;
