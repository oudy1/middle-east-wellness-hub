import { useEffect, useState } from "react";
import { Calendar, CalendarPlus, Clock, Download, Video, ExternalLink, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
import posterEn from "@/assets/know-your-rights-en.png.asset.json";
import posterAr from "@/assets/know-your-rights-ar.png.asset.json";

export const REGISTER_URL = "https://forms.gle/XgzS5fjHRYmHN2k16";
// End of Oct 21, 2026 in Toronto (EDT, UTC-4)
export const EVENT_END = new Date("2026-10-22T04:00:00Z");

export const isEventUpcoming = (now: Date = new Date()) => now < EVENT_END;

// 6:00-7:30 PM ET on Oct 21, 2026 (EDT, UTC-4)
const EVENT_START_UTC = "20261021T220000Z";
const EVENT_END_UTC = "20261021T233000Z";
export const ICS_URL = "/know-your-rights-webinar.ics";
export const GOOGLE_CALENDAR_URL =
  "https://calendar.google.com/calendar/render?action=TEMPLATE" +
  "&text=" + encodeURIComponent("Know Your Rights: Speaking Up About Your Healthcare (SHAMS Webinar)") +
  `&dates=${EVENT_START_UTC}/${EVENT_END_UTC}` +
  "&details=" + encodeURIComponent("Interactive SHAMS community webinar on patient rights, communicating with healthcare providers, referrals, second opinions, and navigating the healthcare system. Register: " + REGISTER_URL) +
  "&location=" + encodeURIComponent("Online via Zoom");

const copy = {
  en: {
    section: "Upcoming SHAMS Event",
    title: "Know Your Rights: Speaking Up About Your Healthcare",
    meta: "October 21, 2026 · 6:00 PM ET · Online via Zoom",
    date: "Wednesday, October 21, 2026",
    time: "6:00 PM ET",
    format: "Online via Zoom",
    dateL: "Date", timeL: "Time", formatL: "Format",
    short:
      "Join SHAMS for an interactive community webinar focused on helping patients and families better understand their healthcare rights, communicate confidently with healthcare providers, and navigate referrals, second opinions, advocacy, and the healthcare system.",
    tags: ["Patient Rights", "Healthcare Navigation", "Advocacy", "Referrals", "Second Opinions", "Communication"],
    register: "Register Now",
    details: "Event Details",
    about: "About the Event",
    aboutText:
      "This SHAMS webinar is designed to help patients and families better understand their rights within the healthcare system and feel more confident speaking up about their care.",
    explore: "The discussion will explore:",
    topics: [
      "The patient and family physician relationship",
      "Shared decision-making",
      "Communicating multiple concerns during appointments",
      "What to do when you feel dismissed or misunderstood",
      "Healthcare referrals",
      "Specialist and hospital wait times",
      "Requesting second opinions",
      "Moving between primary care and hospital care",
      "Navigating cultural and language barriers",
      "Preparing for difficult healthcare conversations",
      "Finding additional support and advocacy resources",
    ],
    formatText: "The webinar will use an interactive moderated discussion followed by audience questions.",
    speakersL: "Speakers",
    speakers: [
      { name: "Dr. Ritika Goel", role: "Family Physician", topics: "Patient and physician relationships, shared decision-making, communication with providers, patient rights" },
      { name: "Dr. Tarek Abdelhalim", role: "Internal Medicine Physician", topics: "Referrals, specialist and hospital wait times, second opinions, transitions between primary and hospital care" },
      { name: "Haifa Staiti, MSW, RSW", role: "Social Worker", topics: "Patient advocacy, feeling unheard, cultural and language barriers, preparing for difficult conversations, accessing supports" },
    ],
    alt: "SHAMS Know Your Rights: Speaking Up About Your Healthcare webinar poster, October 21, 2026.",
    altAr: "Arabic version of the SHAMS Know Your Rights webinar poster, October 21, 2026.",
    openDetails: "Open event details",
    newTab: "(opens in a new tab)",
  },
  ar: {
    section: "فعالية شمس القادمة",
    title: "اعرف حقوقك: كيف تعبّر عن احتياجاتك في الرعاية الصحية",
    meta: "الأربعاء 21 أكتوبر 2026 · 6:00 مساءً بتوقيت شرق كندا · عبر Zoom",
    date: "الأربعاء 21 أكتوبر 2026",
    time: "6:00 مساءً بتوقيت شرق كندا",
    format: "عبر الإنترنت باستخدام Zoom",
    dateL: "التاريخ", timeL: "الوقت", formatL: "الصيغة",
    short:
      "انضموا إلى شمس في ندوة مجتمعية تفاعلية تهدف إلى مساعدة المرضى والعائلات على فهم حقوقهم في نظام الرعاية الصحية، والتواصل بثقة مع مقدمي الرعاية، وفهم الإحالات والآراء الطبية الثانية وطرق الدفاع عن احتياجاتهم الصحية.",
    tags: ["حقوق المرضى", "التنقل في النظام الصحي", "المناصرة", "الإحالات", "الرأي الطبي الثاني", "التواصل"],
    register: "سجّل الآن",
    details: "تفاصيل الفعالية",
    about: "عن الفعالية",
    aboutText:
      "صُممت هذه الندوة لمساعدة المرضى والعائلات على فهم حقوقهم داخل نظام الرعاية الصحية والشعور بثقة أكبر عند التعبير عن احتياجاتهم.",
    explore: "سيتناول النقاش:",
    topics: [
      "العلاقة بين المريض وطبيب الأسرة",
      "اتخاذ القرار المشترك",
      "طرح أكثر من مشكلة صحية خلال الموعد",
      "ماذا تفعل إذا شعرت بالتجاهل أو بعدم الفهم",
      "الإحالات الطبية",
      "أوقات انتظار الأخصائيين والمستشفيات",
      "طلب رأي طبي ثانٍ",
      "الانتقال بين الرعاية الأولية ورعاية المستشفى",
      "التعامل مع الحواجز الثقافية واللغوية",
      "الاستعداد للمحادثات الصحية الصعبة",
      "إيجاد موارد الدعم والمناصرة",
    ],
    formatText: "تعتمد الندوة على نقاش تفاعلي يديره منسق، تليه أسئلة الجمهور.",
    speakersL: "المتحدثون",
    speakers: [
      { name: "د. ريتيكا غويل", role: "طبيبة أسرة", topics: "العلاقة بين المريض والطبيب، اتخاذ القرار المشترك، التواصل مع مقدمي الرعاية، حقوق المرضى" },
      { name: "د. طارق عبد الحليم", role: "اختصاصي الطب الباطني", topics: "الإحالات، أوقات الانتظار، الرأي الطبي الثاني، الانتقال بين الرعاية الأولية والمستشفى" },
      { name: "حيفا ستيتي، ماجستير خدمة اجتماعية", role: "أخصائية اجتماعية", topics: "المناصرة، الشعور بعدم الاستماع، الحواجز الثقافية واللغوية، الاستعداد للمحادثات الصعبة، الوصول إلى الدعم" },
    ],
    alt: "ملصق ندوة شمس: اعرف حقوقك، 21 أكتوبر 2026.",
    altAr: "النسخة العربية من ملصق ندوة شمس: اعرف حقوقك، 21 أكتوبر 2026.",
    openDetails: "افتح تفاصيل الفعالية",
    newTab: "(يفتح في علامة تبويب جديدة)",
  },
};

const UpcomingEventFeature = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const isRTL = isAr || language === "ku" || language === "fa";
  const c = isAr ? copy.ar : copy.en;
  const [open, setOpen] = useState(false);
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  const posters = isAr
    ? [{ src: posterAr.url, alt: c.altAr }, { src: posterEn.url, alt: c.alt }]
    : [{ src: posterEn.url, alt: c.alt }, { src: posterAr.url, alt: c.altAr }];

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  if (!isEventUpcoming()) return null;

  const RegisterButton = ({ full = false }: { full?: boolean }) => (
    <Button asChild size="lg" className={`min-h-[44px] bg-primary text-primary-foreground hover:bg-primary/90 ${full ? "w-full sm:w-auto" : ""}`}>
      <a href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
        {c.register}
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">{c.newTab}</span>
      </a>
    </Button>
  );

  return (
    <section aria-labelledby="upcoming-event-heading" className="py-8 md:py-12">
      <div className={`container mx-auto px-4 ${isRTL ? "font-cairo" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
        <h2 id="upcoming-event-heading" className="text-xl md:text-2xl font-bold text-foreground text-center mb-5">
          {c.section}
        </h2>

        <div className="max-w-4xl mx-auto rounded-2xl border border-border/60 bg-card shadow-md overflow-hidden grid md:grid-cols-[minmax(0,320px)_1fr] gap-5 p-4 md:p-6">
          {/* Posters */}
          <div className="relative mx-auto w-full max-w-[320px]" dir="ltr">
            <Carousel setApi={setApi} opts={{ loop: true, direction: "ltr" }}>
              <CarouselContent>
                {posters.map((p, i) => (
                  <CarouselItem key={p.src}>
                    <button
                      type="button"
                      onClick={() => setOpen(true)}
                      aria-label={`${c.openDetails}: ${p.alt}`}
                      className="block w-full rounded-xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 transition-transform md:hover:scale-[1.01]"
                    >
                      <img
                        src={p.src}
                        alt={p.alt}
                        loading={i === 0 ? "eager" : "lazy"}
                        className="w-full h-auto object-contain rounded-xl"
                        width={1102}
                        height={1427}
                      />
                    </button>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2 h-11 w-11" aria-label={isAr ? "الملصق السابق" : "Previous poster"} />
              <CarouselNext className="right-2 h-11 w-11" aria-label={isAr ? "الملصق التالي" : "Next poster"} />
            </Carousel>
            <div className="flex justify-center gap-1 mt-2">
              {posters.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => api?.scrollTo(i)}
                  aria-label={`${isAr ? "الملصق" : "Poster"} ${i + 1}`}
                  aria-current={current === i}
                  className="h-11 w-11 flex items-center justify-center focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-full"
                >
                  <span className={`block h-2.5 rounded-full transition-all ${current === i ? "w-6 bg-primary" : "w-2.5 bg-muted-foreground/40"}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Details */}
          <div className="flex flex-col gap-3 text-start">
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="text-start rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring group"
            >
              <h3 className="text-lg md:text-2xl font-bold text-foreground group-hover:text-primary transition-colors leading-snug">
                {c.title}
              </h3>
            </button>
            <p className="text-sm md:text-base font-semibold text-primary">{c.meta}</p>
            <p className="text-sm md:text-base text-muted-foreground leading-relaxed">{c.short}</p>
            <ul className="flex flex-wrap gap-1.5" aria-label={isAr ? "المواضيع" : "Topics"}>
              {c.tags.map((t) => (
                <li key={t}><Badge variant="secondary" className="text-xs">{t}</Badge></li>
              ))}
            </ul>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{c.speakersL}: </span>
              {c.speakers.map((s) => s.name).join(isAr ? "، " : ", ")}
            </p>
            <div className="flex flex-col sm:flex-row gap-2 mt-auto pt-2">
              <RegisterButton full />
              <Button variant="outline" size="lg" className="min-h-[44px] w-full sm:w-auto" onClick={() => setOpen(true)}>
                <Info className="h-4 w-4" aria-hidden="true" />
                {c.details}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={`max-w-2xl max-h-[90dvh] overflow-y-auto ${isRTL ? "font-cairo" : ""}`} dir={isRTL ? "rtl" : "ltr"}>
          <DialogHeader className="text-start sm:text-start">
            <DialogTitle className="text-xl leading-snug pe-6">{c.title}</DialogTitle>
            <DialogDescription className="sr-only">{c.short}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 text-sm text-start">
            <dl className="grid gap-2">
              <div className="flex items-center gap-2"><Calendar className="h-4 w-4 text-primary" aria-hidden="true" /><dt className="font-semibold">{c.dateL}:</dt><dd>{c.date}</dd></div>
              <div className="flex items-center gap-2"><Clock className="h-4 w-4 text-primary" aria-hidden="true" /><dt className="font-semibold">{c.timeL}:</dt><dd>{c.time}</dd></div>
              <div className="flex items-center gap-2"><Video className="h-4 w-4 text-primary" aria-hidden="true" /><dt className="font-semibold">{c.formatL}:</dt><dd>{c.format}</dd></div>
            </dl>
            <div>
              <h4 className="font-bold text-base mb-1">{c.about}</h4>
              <p className="text-muted-foreground leading-relaxed">{c.aboutText}</p>
              <p className="mt-2 font-medium">{c.explore}</p>
              <ul className="list-disc ps-5 mt-1 space-y-0.5 text-muted-foreground">
                {c.topics.map((t) => <li key={t}>{t}</li>)}
              </ul>
              <p className="mt-2 text-muted-foreground">{c.formatText}</p>
            </div>
            <div>
              <h4 className="font-bold text-base mb-2">{c.speakersL}</h4>
              <ul className="space-y-2">
                {c.speakers.map((s) => (
                  <li key={s.name} className="rounded-lg bg-muted/50 p-3">
                    <p className="font-semibold">{s.name} <span className="font-normal text-muted-foreground">· {s.role}</span></p>
                    <p className="text-xs text-muted-foreground mt-0.5">{s.topics}</p>
                  </li>
                ))}
              </ul>
            </div>
            <RegisterButton full />
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default UpcomingEventFeature;
