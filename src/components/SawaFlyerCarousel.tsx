import { useEffect, useState } from "react";
import { Expand } from "lucide-react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useLanguage } from "@/contexts/LanguageContext";

// Flyers are 1545x2000 originals; the .webp copies are 1080 wide (same proportions) for faster phones.
const FLYER_W = 1080;
const FLYER_H = 1398;

const FLYERS = {
  parentEn: { src: "/lovable-uploads/sawa-flyer-parent-en.webp", label: "Parent Flyer (English)" },
  adolescentEn: { src: "/lovable-uploads/sawa-flyer-adolescent-en.webp", label: "Adolescent Flyer (English)" },
  parentAr: { src: "/lovable-uploads/sawa-flyer-parent-ar.webp", label: "نشرة الوالدين (عربي)" },
  adolescentAr: { src: "/lovable-uploads/sawa-flyer-adolescent-ar.webp", label: "نشرة المراهقين (عربي)" },
};

const SawaFlyerCarousel = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [open, setOpen] = useState(false);

  // Arabic mode shows the Arabic flyers first.
  const flyers = isAr
    ? [FLYERS.parentAr, FLYERS.adolescentAr, FLYERS.parentEn, FLYERS.adolescentEn]
    : [FLYERS.parentEn, FLYERS.adolescentEn, FLYERS.parentAr, FLYERS.adolescentAr];

  const c = isAr
    ? { region: "نشرات دراسة سوا", prev: "النشرة السابقة", next: "النشرة التالية", open: "افتح النشرة بحجم أكبر", flyer: "النشرة", close: "تكبير النشرة" }
    : { region: "SAWA study flyers", prev: "Previous flyer", next: "Next flyer", open: "Open larger flyer", flyer: "Flyer", close: "Enlarged flyer" };

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    return () => { api.off("select", onSelect); };
  }, [api]);

  useEffect(() => { api?.scrollTo(0, true); }, [api, isAr]);

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Kept left-to-right internally so swiping and arrows behave the same in both languages */}
      <div dir="ltr">
        <Carousel setApi={setApi} opts={{ loop: true, direction: "ltr" }} aria-label={c.region}>
          <CarouselContent>
            {flyers.map((f, i) => (
              <CarouselItem key={f.src}>
                <button
                  type="button"
                  onClick={() => setOpen(true)}
                  aria-label={`${c.open}: ${f.label}`}
                  className="group relative block w-full overflow-hidden rounded-xl border border-border/60 bg-muted/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <img
                    src={f.src}
                    alt={f.label}
                    width={FLYER_W}
                    height={FLYER_H}
                    loading={i === 0 ? "eager" : "lazy"}
                    decoding="async"
                    className="w-full h-auto aspect-[1080/1398] max-h-[420px] object-contain transition-transform duration-200 motion-safe:md:group-hover:scale-[1.01]"
                  />
                  <span className="absolute bottom-2 end-2 inline-flex h-8 w-8 items-center justify-center rounded-full bg-background/85 text-foreground shadow" aria-hidden="true">
                    <Expand className="h-4 w-4" />
                  </span>
                </button>
                <p className="text-xs text-muted-foreground text-center mt-2" lang={f.label.includes("English") ? "en" : "ar"}>
                  {f.label}
                </p>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-2 top-[45%] h-11 w-11 bg-background/90 shadow" aria-label={c.prev} />
          <CarouselNext className="right-2 top-[45%] h-11 w-11 bg-background/90 shadow" aria-label={c.next} />
        </Carousel>
        <div className="flex justify-center gap-1 mt-1">
          {flyers.map((f, i) => (
            <button
              key={f.src}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`${c.flyer} ${i + 1}`}
              aria-current={current === i}
              className="h-11 w-11 flex items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              <span className={`block h-2.5 rounded-full transition-all ${current === i ? "w-6 bg-primary" : "w-2.5 bg-muted-foreground/40"}`} />
            </button>
          ))}
        </div>
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xl max-h-[92dvh] overflow-y-auto p-4" dir={isAr ? "rtl" : "ltr"}>
          <DialogTitle className="text-base pe-8">{flyers[current]?.label}</DialogTitle>
          <DialogDescription className="sr-only">{c.close}</DialogDescription>
          <img
            src={flyers[current]?.src}
            alt={flyers[current]?.label}
            width={FLYER_W}
            height={FLYER_H}
            className="w-full h-auto rounded-lg border border-border/60"
          />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default SawaFlyerCarousel;
