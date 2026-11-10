import { Link } from "react-router-dom";
import { Calendar, Clock, MapPin, ExternalLink } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { NEWCOMER_WORKSHOP, isNewcomerWorkshopUpcoming } from "@/lib/newcomerWorkshop";

/** Homepage upcoming-event card for the newcomer workshop. Hides itself after the event day. */
const NewcomerWorkshopFeature = () => {
  const { language } = useLanguage();
  if (!isNewcomerWorkshopUpcoming()) return null;

  const isAr = language === "ar";
  const isRTL = language === "ar" || language === "ku" || language === "fa";
  const w = isAr ? NEWCOMER_WORKSHOP.ar : NEWCOMER_WORKSHOP.en;

  return (
    <section
      aria-labelledby="newcomer-workshop-title"
      className="py-8 md:py-10 bg-healthTeal/5"
    >
      <div className={`container mx-auto px-4 ${isRTL ? "font-cairo" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
        <div className="max-w-3xl mx-auto rounded-2xl border border-border bg-card p-5 md:p-6 shadow-sm space-y-3">
          <Badge className="w-fit text-xs">{isAr ? "فعالية قادمة" : "Upcoming Event"}</Badge>
          <h2 id="newcomer-workshop-title" className="text-2xl md:text-3xl font-bold text-healthDarkBlue">
            {w.title}
          </h2>
          <p className="text-muted-foreground">{w.summary}</p>
          <ul className="grid sm:grid-cols-3 gap-2 text-sm">
            <li className="flex items-start gap-2"><Calendar className="h-4 w-4 mt-0.5 text-healthTeal shrink-0" aria-hidden="true" />{w.date}</li>
            <li className="flex items-start gap-2"><Clock className="h-4 w-4 mt-0.5 text-healthTeal shrink-0" aria-hidden="true" />{w.time}</li>
            <li className="flex items-start gap-2"><MapPin className="h-4 w-4 mt-0.5 text-healthTeal shrink-0" aria-hidden="true" />{w.place}</li>
          </ul>
          <div className="flex flex-wrap gap-3 pt-1">
            <Button asChild className="min-h-[44px]">
              <a href={NEWCOMER_WORKSHOP.registerUrl} target="_blank" rel="noopener noreferrer">
                {isAr ? "سجّل الآن" : "Register Now"}
                <ExternalLink className="h-4 w-4 ms-2" aria-hidden="true" />
              </a>
            </Button>
            <Button asChild variant="outline" className="min-h-[44px]">
              <Link to="/programs#newcomer-initiative">
                {isAr ? "عن مبادرة القادمين الجدد" : "About the Newcomer Initiative"}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewcomerWorkshopFeature;
