import { useState } from "react";
import { Calendar, MapPin, Clock, ExternalLink, ChevronRight, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useLanguage } from "@/contexts/LanguageContext";
import { useEffect } from "react";
import poster from "@/assets/mhc-poster.png.asset.json";
import panelists from "@/assets/mhc-panelists.png.asset.json";
import activities from "@/assets/mhc-activities.png.asset.json";

const SIGNUP_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfb2eS42uODV08A7GowqG-bHLzwh_17Q_4adbhoOyxJ-Ckumw/viewform";

const slides = [
  { src: poster.url, altEn: "Mental Health Convention poster", altAr: "ملصق مؤتمر الصحة النفسية" },
  { src: panelists.url, altEn: "Convention panelists", altAr: "المتحدثون في المؤتمر" },
  { src: activities.url, altEn: "Activities and programming", altAr: "الأنشطة والبرنامج" },
];

const MentalHealthConventionSection = () => {
  const { language } = useLanguage();
  const isRTL = language === "ar" || language === "ku" || language === "fa";
  const isAr = language === "ar";

  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap());
    api.on("select", () => setCurrent(api.selectedScrollSnap()));
  }, [api]);

  const t = {
    badge: isAr ? "فعالية مميزة" : "Featured Event",
    title: isAr
      ? "مؤتمر شمس للصحة النفسية: كشف الوصمة"
      : "SHAMS Mental Health Convention: Uncovering Stigma",
    description: isAr
      ? "انضموا إلى مشروع شمس في مؤتمر مجتمعي يركز على فهم وصمة الصحة النفسية، وبناء الوعي، وربط العائلات والطلاب والعاملين في الرعاية الصحية بالموارد والدعم المناسب."
      : "Join SHAMS for a community-centered Mental Health Convention focused on uncovering stigma, building understanding, and connecting families, students, healthcare professionals, and community members with meaningful resources and support.",
    date: isAr ? "١٨ يوليو ٢٠٢٦" : "July 18, 2026",
    time: isAr ? "١:٠٠ – ٥:٠٠ مساءً" : "1:00 PM – 5:00 PM",
    location: isAr ? "جامعة تورنتو ميسيساغا" : "University of Toronto Mississauga",
    chips: isAr
      ? ["جلسات حوارية", "ورش عمل", "تواصل مجتمعي", "موارد", "مجاني للحضور"]
      : ["Panels", "Workshops", "Networking", "Resources", "Free to Attend"],
    signup: isAr ? "سجّل الآن" : "Sign Up Now",
    learnMore: isAr ? "اعرف المزيد" : "Learn More",
    prev: isAr ? "السابق" : "Previous slide",
    next: isAr ? "التالي" : "Next slide",
  };

  return (
    <section
      id="mental-health-convention"
      className="py-12 md:py-16 bg-gradient-to-b from-healthDarkBlue/5 via-background to-background"
    >
      <div
        className={`container mx-auto px-4 ${isRTL ? "font-cairo" : ""}`}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center max-w-6xl mx-auto">
          {/* Carousel */}
          <div className="order-2 lg:order-1">
            <Carousel
              setApi={setApi}
              opts={{ loop: true, direction: isRTL ? "rtl" : "ltr" }}
              className="w-full max-w-md mx-auto"
            >
              <CarouselContent>
                {slides.map((s, i) => (
                  <CarouselItem key={i}>
                    <div className="bg-card rounded-2xl shadow-lg overflow-hidden border border-border/50">
                      <img
                        src={s.src}
                        alt={isAr ? s.altAr : s.altEn}
                        className="w-full h-auto object-contain"
                        loading={i === 0 ? "eager" : "lazy"}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious
                aria-label={t.prev}
                className="left-2 bg-white/90 hover:bg-white border-healthDarkBlue/20"
              >
                <ChevronLeft className="h-4 w-4" />
              </CarouselPrevious>
              <CarouselNext
                aria-label={t.next}
                className="right-2 bg-white/90 hover:bg-white border-healthDarkBlue/20"
              >
                <ChevronRight className="h-4 w-4" />
              </CarouselNext>
            </Carousel>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-4" dir="ltr">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  className={`h-2 rounded-full transition-all ${
                    current === i
                      ? "w-8 bg-healthDarkBlue"
                      : "w-2 bg-healthDarkBlue/30 hover:bg-healthDarkBlue/50"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="order-1 lg:order-2 space-y-5">
            <Badge className="bg-healthGold/20 text-healthDarkBlue hover:bg-healthGold/30 border-0">
              {t.badge}
            </Badge>

            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-healthDarkBlue leading-tight">
              {t.title}
            </h2>

            <p className="text-base md:text-lg text-muted-foreground leading-relaxed">
              {t.description}
            </p>

            {/* Event Meta */}
            <div className="grid sm:grid-cols-3 gap-3 pt-2">
              <div className="flex items-start gap-2 text-sm">
                <Calendar className="w-4 h-4 mt-0.5 text-healthTeal shrink-0" />
                <span className="font-medium text-foreground">{t.date}</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <Clock className="w-4 h-4 mt-0.5 text-healthTeal shrink-0" />
                <span className="font-medium text-foreground">{t.time}</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <MapPin className="w-4 h-4 mt-0.5 text-healthTeal shrink-0" />
                <span className="font-medium text-foreground">{t.location}</span>
              </div>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 pt-1">
              {t.chips.map((c) => (
                <span
                  key={c}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-healthTeal/10 text-healthDarkBlue border border-healthTeal/20"
                >
                  {c}
                </span>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                asChild
                size="lg"
                className="bg-healthDarkBlue hover:bg-healthDarkBlue/90 text-white shadow-md min-h-[48px]"
              >
                <a href={SIGNUP_URL} target="_blank" rel="noopener noreferrer">
                  {t.signup}
                  <ExternalLink className={`w-4 h-4 ${isRTL ? "mr-2" : "ml-2"}`} />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-healthDarkBlue text-healthDarkBlue hover:bg-healthDarkBlue/5 min-h-[48px]"
              >
                <a href="#mental-health-convention">{t.learnMore}</a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MentalHealthConventionSection;
