import { useState, useCallback, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import mainPoster from "@/assets/intro-research-webinar-main.png";
import mahmoudPoster from "@/assets/intro-research-panelist-mahmoud.png";
import mahaPoster from "@/assets/intro-research-panelist-maha.png";

const REGISTRATION_URL = "https://forms.gle/RqvEmVeiVTCvzQkZ9";

const slides = [
  {
    id: 1,
    image: mainPoster,
    alt: "Intro to Research Webinar - February 11th, 2026 at 7:00PM",
  },
  {
    id: 2,
    image: mahmoudPoster,
    alt: "Meet the Panelists - Dr. Mahmoud El-Maklizi",
  },
  {
    id: 3,
    image: mahaPoster,
    alt: "Meet the Panelists - Maha Khawaja",
  },
];

const ResearchWebinarCarousel = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<boolean[]>([false, false, false]);

  const minSwipeDistance = 50;

  // Preload all images on mount
  useEffect(() => {
    slides.forEach((slide, index) => {
      const img = new Image();
      img.src = slide.image;
      img.onload = () => {
        setImagesLoaded(prev => {
          const next = [...prev];
          next[index] = true;
          return next;
        });
      };
    });
  }, []);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, []);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, []);

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        goToPrevious();
      } else if (e.key === "ArrowRight") {
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToPrevious, goToNext]);

  // Touch handlers for mobile swipe
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    } else if (isRightSwipe) {
      goToPrevious();
    }
  };

  const title = language === "ar" ? "ندوة مقدمة في البحث" : "Intro to Research Webinar";
  const subtitle = language === "ar" ? "اسحب للتعرف على المتحدثين" : "Swipe to meet the panelists";
  const registerText = language === "ar" ? "سجّل هنا" : "Register here";

  return (
    <section className="py-8 md:py-12 bg-gradient-to-b from-muted/50 to-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-1">
            {title}
          </h2>
          <p className="text-muted-foreground text-sm md:text-base">
            {subtitle}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative w-full max-w-4xl mx-auto">
          {/* Slides */}
          <div
            className="relative overflow-hidden rounded-xl shadow-lg bg-muted/30"
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            role="region"
            aria-roledescription="carousel"
            aria-label="Research Webinar Posters"
          >
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {slides.map((slide, index) => (
                <div
                  key={slide.id}
                  className="min-w-full flex-shrink-0 flex items-center justify-center"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${slides.length}: ${slide.alt}`}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className="w-[94%] md:w-[90%] h-auto max-h-[70vh] object-contain mx-auto rounded-lg"
                    loading={index === 0 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-1 md:left-3 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background text-foreground p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary z-10"
            aria-label={language === "ar" ? "الشريحة السابقة" : "Previous slide"}
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-1 md:right-3 top-1/2 -translate-y-1/2 bg-background/90 hover:bg-background text-foreground p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary z-10"
            aria-label={language === "ar" ? "الشريحة التالية" : "Next slide"}
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Counter */}
          <div className="absolute bottom-3 right-3 bg-background/80 text-foreground text-xs md:text-sm px-2 py-1 rounded-md font-medium z-10">
            {currentIndex + 1} / {slides.length}
          </div>
        </div>

        {/* Dot Indicators */}
        <div className="flex justify-center gap-2 mt-4" role="tablist">
          {slides.map((slide, index) => (
            <button
              key={slide.id}
              onClick={() => goToSlide(index)}
              className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-primary ${
                index === currentIndex
                  ? "bg-primary scale-110"
                  : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
              role="tab"
              aria-selected={index === currentIndex}
              aria-label={`${language === "ar" ? "الشريحة" : "Slide"} ${index + 1}`}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-6">
          <Button
            asChild
            size="lg"
            className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all"
          >
            <a
              href={REGISTRATION_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              {registerText}
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ResearchWebinarCarousel;
