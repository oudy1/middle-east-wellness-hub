import { useState } from "react";
import { Link } from "react-router-dom";
import { Play, Info, ExternalLink, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";
import { isEventUpcoming } from "@/components/UpcomingEventFeature";
import posterEn from "@/assets/know-your-rights-en.png.asset.json";
import posterAr from "@/assets/know-your-rights-ar.png.asset.json";

const YT_ID = "_n4qjMmzMGw";
const YT_URL = `https://youtu.be/${YT_ID}`;
const DETAILS = "/recordings#webinar-know-your-rights";

const copy = {
  en: {
    section: "In Case You Missed It: SHAMS Webinars",
    label: "Past Webinar | Watch the Recording",
    title: "Know Your Rights: Speaking Up About Your Healthcare",
    date: "October 21, 2026",
    short:
      "Missed our Know Your Rights webinar? Watch our discussion with healthcare professionals about patient rights, navigating the Canadian healthcare system, communicating with providers, and advocating for your healthcare needs.",
    watch: "Watch Recording",
    details: "View Webinar Details",
    youtube: "Watch on YouTube",
    fallback: "If the video does not load, watch it on YouTube.",
    alt: "Know Your Rights webinar poster. Opens the recording.",
  },
  ar: {
    section: "فاتتك؟ ندوات شمس",
    label: "ندوة سابقة | شاهد التسجيل",
    title: "اعرف حقوقك: كيف تعبّر عن احتياجاتك في الرعاية الصحية",
    date: "21 أكتوبر 2026",
    short:
      "شاهد تسجيل ندوة شمس حول حقوق المرضى في كندا، وكيفية التواصل بفعالية مع مقدمي الرعاية الصحية، وفهم الإحالات الطبية، وطلب رأي طبي ثانٍ، والتعامل مع التحديات والحواجز الثقافية واللغوية في نظام الرعاية الصحية.",
    watch: "شاهد التسجيل",
    details: "عرض التفاصيل",
    youtube: "شاهد على يوتيوب",
    fallback: "إذا لم يظهر الفيديو، شاهده على يوتيوب.",
    alt: "ملصق ندوة اعرف حقوقك. يفتح التسجيل.",
  },
};

const PastWebinarFeature = () => {
  const { language } = useLanguage();
  const [open, setOpen] = useState(false);
  if (isEventUpcoming()) return null;
  const isAr = language === "ar";
  const c = isAr ? copy.ar : copy.en;
  const poster = isAr ? posterAr.url : posterEn.url;

  return (
    <section
      aria-labelledby="past-webinar-heading"
      dir={isAr ? "rtl" : "ltr"}
      className={`py-8 md:py-10 ${isAr ? "font-cairo text-right" : ""}`}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 id="past-webinar-heading" className="text-2xl md:text-3xl font-bold text-healthDarkBlue mb-4">
          {c.section}
        </h2>
        <div className="bg-card rounded-xl shadow-md overflow-hidden grid md:grid-cols-[220px_1fr] gap-0">
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-label={c.alt}
            className="bg-muted flex items-center justify-center p-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-healthTeal"
          >
            <img src={poster} alt="" loading="lazy" className="max-h-64 w-auto object-contain rounded" />
          </button>
          <div className="p-5 md:p-6">
            <Badge className="bg-healthTeal text-primary-foreground mb-2">{c.label}</Badge>
            <h3 className="text-xl md:text-2xl font-bold text-healthDarkBlue mb-2">{c.title}</h3>
            <p className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              {c.date}
            </p>
            <p className="text-muted-foreground mb-4 leading-relaxed">{c.short}</p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => setOpen(true)} className="min-h-[44px] gap-2">
                <Play className="h-4 w-4" aria-hidden="true" />
                {c.watch}
              </Button>
              <Button asChild variant="outline" className="min-h-[44px] gap-2">
                <Link to={DETAILS}>
                  <Info className="h-4 w-4" aria-hidden="true" />
                  {c.details}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className={`max-w-3xl ${isAr ? "font-cairo text-right" : ""}`} dir={isAr ? "rtl" : "ltr"}>
          <DialogHeader>
            <DialogTitle className={isAr ? "text-right" : ""}>{c.title}</DialogTitle>
            <DialogDescription className={isAr ? "text-right" : ""}>{c.date}</DialogDescription>
          </DialogHeader>
          <div className="relative w-full aspect-video bg-muted rounded overflow-hidden">
            {open && (
              <iframe
                className="absolute inset-0 w-full h-full"
                src={`https://www.youtube.com/embed/${YT_ID}`}
                title={c.title}
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
          <p className="text-xs text-muted-foreground">{c.fallback}</p>
          <div className="flex flex-wrap gap-2">
            <Button asChild variant="outline" className="min-h-[44px] gap-2">
              <a href={YT_URL} target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4" aria-hidden="true" />
                {c.youtube}
              </a>
            </Button>
            <Button asChild variant="ghost" className="min-h-[44px]">
              <Link to={DETAILS} onClick={() => setOpen(false)}>{c.details}</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  );
};

export default PastWebinarFeature;
