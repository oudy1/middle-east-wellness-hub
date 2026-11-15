import { Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { getEvent } from "@/lib/events";

// Recap link comes from the convention's record in content/events.json.
const REEL_LINK = getEvent("mental-health-convention-2026-07-18").recapUrl ?? "https://www.instagram.com/projectshams/";

/** Past event: one compact card with a single Instagram button (smaller than upcoming events). */
const FeaturedEventSection = () => {
  const { language } = useLanguage();
  const isRTL = language === "ar" || language === "ku" || language === "fa";
  const isAr = language === "ar";

  const sectionTitle = isAr ? "من أبرز الفعاليات السابقة" : "Past Event Highlight";
  const recapTitle = isAr ? "ملخص مؤتمر الصحة النفسية" : "Mental Health Convention Recap";
  const description = isAr
    ? "شكراً لكل من شارك في مؤتمر شمس للصحة النفسية. جمع هذا الحدث أفراد المجتمع، والعاملين في الرعاية الصحية، والطلاب، والمنظمات في جلسات حوارية وورش عمل وتواصل مجتمعي ونقاشات حول وصمة الصحة النفسية والدعم المتاح."
    : "Thank you to everyone who joined SHAMS for our Mental Health Convention. This event brought together community members, healthcare professionals, students, and organizations for panels, workshops, networking, and conversations around mental health stigma and support.";
  const watchRecapCta = isAr ? "شاهد الملخص على إنستغرام" : "Watch Recap on Instagram";
  const badge = isAr ? "فعالية سابقة" : "Past Event";

  return (
    <section aria-labelledby="past-event-heading" className="py-6 md:py-8">
      <div className={`container mx-auto px-4 max-w-5xl ${isRTL ? "font-cairo" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
        <h2 id="past-event-heading" className="text-xl md:text-2xl font-bold text-healthDarkBlue mb-3">
          {sectionTitle}
        </h2>
        <article className="flex flex-col sm:flex-row sm:items-center gap-4 rounded-xl border border-border/60 bg-card p-4 md:p-5 shadow-sm">
          <span className="hidden sm:inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-healthGold/20 text-healthDarkBlue" aria-hidden="true">
            <Instagram className="h-6 w-6" />
          </span>
          <div className="min-w-0 flex-1">
            <span className="inline-block px-2.5 py-0.5 mb-1.5 text-xs font-semibold bg-healthGold/20 text-healthDarkBlue rounded-full">
              {badge}
            </span>
            <h3 className="text-base md:text-lg font-semibold text-primary">{recapTitle}</h3>
            <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{description}</p>
          </div>
          <Button asChild className="min-h-[44px] shrink-0 gap-2 bg-healthDarkBlue hover:bg-healthDarkBlue/90 text-primary-foreground">
            <a href={REEL_LINK} target="_blank" rel="noopener noreferrer">
              <Instagram className="h-4 w-4" aria-hidden="true" />
              {watchRecapCta}
            </a>
          </Button>
        </article>
      </div>
    </section>
  );
};

export default FeaturedEventSection;
