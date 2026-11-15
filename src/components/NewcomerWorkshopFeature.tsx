import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Calendar, CalendarPlus, Clock, Download, ExternalLink, Info, MapPin, Navigation, Ticket } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  NEWCOMER_WORKSHOP,
  NEWCOMER_WORKSHOP_GOOGLE_CALENDAR_URL,
  NEWCOMER_WORKSHOP_ICS_PATH,
  isNewcomerWorkshopUpcoming,
} from "@/lib/newcomerWorkshop";
import posterEn from "@/assets/newcomer-workshop-poster-en.webp.asset.json";
import posterAr from "@/assets/newcomer-workshop-poster-ar.webp.asset.json";

const ui = {
  en: {
    section: "Upcoming SHAMS Workshop",
    upcoming: "Upcoming",
    free: "Free admission",
    dateL: "Date",
    timeL: "Time",
    placeL: "Location",
    costL: "Cost",
    formatL: "Format",
    register: "Register Now",
    learnMore: "Learn More",
    details: "Event details",
    addToGoogle: "Add to Google Calendar",
    downloadIcs: "Add to Calendar (.ics)",
    directions: "Get Directions",
    newTab: "(opens in a new tab)",
    openPoster: "Open larger poster and event details",
    prev: "Previous poster",
    next: "Next poster",
    poster: "Poster",
    topicsL: "The workshop will explore:",
    audienceL: "Who it is for",
    note: "This is a general education workshop. It does not give individual eligibility decisions or medical advice.",
    altEn:
      "English poster for Healthcare Coverage and Access: A Newcomer's Guide, by Project SHAMS and Scadding Court Community Centre, funded by Immigration, Refugees and Citizenship Canada. Thursday, November 19, 2026, 3:00 to 5:00 PM, Scadding Court Community Centre, 707 Dundas St. West, Toronto. Includes a sign-up QR code.",
    altAr:
      "Arabic poster for the same workshop, Healthcare in Canada: A Guide for Newcomers. Thursday, November 19, 2026, 3:00 to 5:00 PM, Scadding Court Community Centre, 707 Dundas St. West, Toronto. Includes a sign-up QR code.",
  },
  ar: {
    section: "ورشة شمس القادمة",
    upcoming: "قادمة",
    free: "الدخول مجاني",
    dateL: "التاريخ",
    timeL: "الوقت",
    placeL: "المكان",
    costL: "التكلفة",
    formatL: "الصيغة",
    register: "سجّل الآن",
    learnMore: "اعرف المزيد",
    details: "تفاصيل الفعالية",
    addToGoogle: "أضف إلى تقويم Google",
    downloadIcs: "أضف إلى التقويم (.ics)",
    directions: "احصل على الاتجاهات",
    newTab: "(يفتح في علامة تبويب جديدة)",
    openPoster: "افتح الملصق بحجم أكبر مع تفاصيل الفعالية",
    prev: "الملصق السابق",
    next: "الملصق التالي",
    poster: "الملصق",
    topicsL: "تتناول الورشة:",
    audienceL: "لمن هذه الورشة",
    note: "هذه ورشة تثقيفية عامة، ولا تقدّم قرارات فردية بشأن الأهلية أو استشارات طبية.",
    altEn:
      "الملصق الإنجليزي لورشة الرعاية الصحية في كندا: دليل للوافدين الجدد، من مشروع شمس ومركز سكادينغ كورت المجتمعي، بتمويل من وزارة الهجرة واللاجئين والمواطنة الكندية. الخميس 19 نوفمبر 2026، من 3:00 إلى 5:00 مساءً، 707 شارع دونداس الغربي، تورونتو. يتضمن رمز QR للتسجيل.",
    altAr:
      "الملصق العربي لورشة الرعاية الصحية في كندا: دليل للوافدين الجدد، من مشروع شمس ومركز سكادينغ كورت المجتمعي، بتمويل من وزارة الهجرة واللاجئين والمواطنة الكندية. الخميس 19 نوفمبر 2026، من 3:00 إلى 5:00 مساءً، 707 شارع دونداس الغربي، تورونتو. يتضمن رمز QR للتسجيل.",
  },
};

/** Homepage featured card for the newcomer workshop. Hides itself after the event day in Toronto. */
const NewcomerWorkshopFeature = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const isRTL = isAr || language === "ku" || language === "fa";
  const c = isAr ? ui.ar : ui.en;
  const w = isAr ? NEWCOMER_WORKSHOP.ar : NEWCOMER_WORKSHOP.en;
  const [open, setOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  // Arabic mode shows the Arabic poster first.
  const posters = isAr
    ? [{ src: posterAr.url, alt: c.altAr }, { src: posterEn.url, alt: c.altEn }]
    : [{ src: posterEn.url, alt: c.altEn }, { src: posterAr.url, alt: c.altAr }];

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  useEffect(() => { api?.scrollTo(0, true); }, [api, isAr]);

  if (!isNewcomerWorkshopUpcoming()) return null;

  const RegisterButton = ({ className = "" }: { className?: string }) => (
    <Button asChild size="lg" className={`min-h-[44px] ${className}`}>
      <a href={NEWCOMER_WORKSHOP.registerUrl} target="_blank" rel="noopener noreferrer">
        {c.register}
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">{c.newTab}</span>
      </a>
    </Button>
  );

  const ExtraLinks = () => (
    <div className="flex flex-wrap gap-2">
      <Button asChild variant="outline" size="sm" className="min-h-[44px]">
        <a href={NEWCOMER_WORKSHOP_GOOGLE_CALENDAR_URL} target="_blank" rel="noopener noreferrer">
          <CalendarPlus className="h-4 w-4" aria-hidden="true" />
          {c.addToGoogle}
          <span className="sr-only">{c.newTab}</span>
        </a>
      </Button>
      <Button asChild variant="outline" size="sm" className="min-h-[44px]">
        <a href={NEWCOMER_WORKSHOP_ICS_PATH} download="shams-newcomer-workshop.ics">
          <Download className="h-4 w-4" aria-hidden="true" />
          {c.downloadIcs}
        </a>
      </Button>
      <Button asChild variant="outline" size="sm" className="min-h-[44px]">
        <a href={NEWCOMER_WORKSHOP.directionsUrl} target="_blank" rel="noopener noreferrer">
          <Navigation className="h-4 w-4" aria-hidden="true" />
          {c.directions}
          <span className="sr-only">{c.newTab}</span>
        </a>
      </Button>
    </div>
  );

  const Facts = () => (
    <dl className="grid gap-2 text-sm">
      <div className="flex items-start gap-2">
        <Calendar className="h-4 w-4 mt-0.5 text-primary shrink-0" aria-hidden="true" />
        <dt className="font-semibold shrink-0">{c.dateL}:</dt><dd>{w.date}</dd>
      </div>
      <div className="flex items-start gap-2">
        <Clock className="h-4 w-4 mt-0.5 text-primary shrink-0" aria-hidden="true" />
        <dt className="font-semibold shrink-0">{c.timeL}:</dt><dd>{w.time}</dd>
      </div>
      <div className="flex items-start gap-2">
        <MapPin className="h-4 w-4 mt-0.5 text-primary shrink-0" aria-hidden="true" />
        <dt className="font-semibold shrink-0">{c.placeL}:</dt><dd>{w.venue}، {w.address}</dd>
      </div>
      <div className="flex items-start gap-2">
        <Ticket className="h-4 w-4 mt-0.5 text-primary shrink-0" aria-hidden="true" />
        <dt className="font-semibold shrink-0">{c.costL}:</dt><dd>{w.cost}</dd>
      </div>
    </dl>
  );

  return (
    <section aria-labelledby="newcomer-workshop-heading" className="py-8 md:py-10 bg-healthTeal/5">
      <div className={`container mx-auto px-4 ${isRTL ? "font-cairo" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
        <h2 id="newcomer-workshop-heading" className="text-xl md:text-2xl font-bold text-foreground text-center mb-5">
          {c.section}
        </h2>

        <div className="max-w-4xl mx-auto rounded-2xl border border-border/60 bg-card shadow-md grid md:grid-cols-[minmax(0,300px)_1fr] gap-5 p-4 md:p-6">
          {/* Posters (kept left-to-right internally so swiping and arrows behave the same in both languages) */}
          <div className="relative mx-auto w-full max-w-[300px]" dir="ltr">
            <Carousel setApi={setApi} opts={{ loop: true, direction: "ltr" }} aria-label={isAr ? "ملصقات الورشة" : "Workshop posters"}>
              <CarouselContent>
                {posters.map((p, i) => (
                  <CarouselItem key={p.src}>
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      aria-label={c.openPoster}
                      className="block w-full rounded-xl overflow-hidden border border-border/60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-transform md:hover:scale-[1.01]"
                    >
                      <img
                        src={p.src}
                        alt={p.alt}
                        loading={i === 0 ? "eager" : "lazy"}
                        decoding="async"
                        className="w-full h-auto object-contain"
                        width={1080}
                        height={1350}
                      />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 h-11 w-11" aria-label={c.prev} />
              <CarouselNext className="right-2 h-11 w-11" aria-label={c.next} />
            </Carousel>
            <div className="flex justify-center gap-1 mt-2">
              {posters.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`${c.poster} ${i + 1}`}
                  aria-current={current === i}
                  className="h-11 w-11 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  <span className={`block h-2.5 rounded-full transition-all ${current === i ? "w-6 bg-primary" : "w-2.5 bg-muted-foreground/40"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Details (same information as the posters, readable by screen readers) */}
          <div className="flex flex-col gap-3 text-start">
            <div className="flex flex-wrap gap-2">
              <Badge className="text-xs">{c.upcoming}</Badge>
              <Badge variant="secondary" className="text-xs">{c.free}</Badge>
            </div>
            <h3 className="text-lg md:text-2xl font-bold text-foreground leading-snug">{w.title}</h3>
            <p className="text-xs md:text-sm text-muted-foreground">{w.organizer}</p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{w.summary}</p>
            <Facts />
            <div className="flex flex-col sm:flex-row gap-2 pt-1">
              <RegisterButton className="w-full sm:w-auto" />
              <Button asChild variant="outline" size="lg" className="min-h-[44px] w-full sm:w-auto">
                <Link to={NEWCOMER_WORKSHOP.learnMorePath}>
                  <Info className="h-4 w-4" aria-hidden="true" />
                  {c.learnMore}
                </Link>
              </Button>
            </div>
            <ExtraLinks />
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={`max-w-3xl max-h-[90dvh] overflow-y-auto ${isRTL ? "font-cairo" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
          <DialogHeader className="text-start sm:text-start">
            <DialogTitle className="text-xl leading-snug pe-6">{w.title}</DialogTitle>
            <DialogDescription>{w.organizer}</DialogDescription>
          </DialogHeader>
          <div className="grid md:grid-cols-[minmax(0,340px)_1fr] gap-5 text-start">
            <img
              src={posters[current]?.src}
              alt={posters[current]?.alt}
              className="w-full max-w-[340px] mx-auto h-auto object-contain rounded-xl border border-border/60"
              width={1080}
              height={1350}
            />
            <div className="space-y-4 text-sm">
              <RegisterButton className="w-full" />
              <Facts />
              <p className="text-muted-foreground leading-relaxed">{w.description}</p>
              <div>
                <p className="font-semibold">{c.topicsL}</p>
                <ul className="list-disc ps-5 mt-1 space-y-0.5 text-muted-foreground">
                  {w.topics.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </div>
              <p><span className="font-semibold">{c.audienceL}: </span><span className="text-muted-foreground">{w.audience}</span></p>
              <p className="text-xs text-muted-foreground">{c.note}</p>
              <ExtraLinks />
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default NewcomerWorkshopFeature;
