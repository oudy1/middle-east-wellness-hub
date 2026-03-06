import { useState, useCallback, useEffect } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

const SawaFlyerCarousel = () => {
  const { language } = useLanguage();
  const isAr = language === 'ar';

  // Order flyers based on language
  const flyers = isAr
    ? [
        { src: "/lovable-uploads/sawa-flyer-parent-ar.png", label: "نشرة الوالدين (عربي)" },
        { src: "/lovable-uploads/sawa-flyer-adolescent-ar.png", label: "نشرة المراهقين (عربي)" },
        { src: "/lovable-uploads/sawa-flyer-parent-en.png", label: "Parent Flyer (English)" },
        { src: "/lovable-uploads/sawa-flyer-adolescent-en.png", label: "Adolescent Flyer (English)" },
      ]
    : [
        { src: "/lovable-uploads/sawa-flyer-parent-en.png", label: "Parent Flyer (English)" },
        { src: "/lovable-uploads/sawa-flyer-adolescent-en.png", label: "Adolescent Flyer (English)" },
        { src: "/lovable-uploads/sawa-flyer-parent-ar.png", label: "نشرة الوالدين (عربي)" },
        { src: "/lovable-uploads/sawa-flyer-adolescent-ar.png", label: "نشرة المراهقين (عربي)" },
      ];

  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true, align: "center" });
  const [selectedIndex, setSelectedIndex] = useState(0);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    return () => { emblaApi.off("select", onSelect); };
  }, [emblaApi, onSelect]);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Carousel */}
      <div className="relative">
        <div ref={emblaRef} className="overflow-hidden rounded-lg">
          <div className="flex">
            {flyers.map((f, i) => (
              <div key={i} className="flex-[0_0_100%] min-w-0 px-1">
                <img
                  src={f.src}
                  alt={f.label}
                  className="w-full rounded-lg shadow-md object-contain max-h-[400px] mx-auto"
                  loading="lazy"
                />
                <p className="text-xs text-muted-foreground text-center mt-2">{f.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Arrows */}
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 -translate-y-1/2 -left-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow"
          onClick={scrollPrev}
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          className="absolute top-1/2 -translate-y-1/2 -right-3 h-8 w-8 rounded-full bg-background/80 backdrop-blur-sm shadow"
          onClick={scrollNext}
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Dots */}
      <div className="flex justify-center gap-1.5 mt-3">
        {flyers.map((_, i) => (
          <button
            key={i}
            onClick={() => scrollTo(i)}
            className={`h-2 w-2 rounded-full transition-colors ${
              i === selectedIndex ? 'bg-primary' : 'bg-muted-foreground/30'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default SawaFlyerCarousel;
