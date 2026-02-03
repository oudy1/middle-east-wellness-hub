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
    isMainPoster: true,
  },
  {
    id: 2,
    image: mahmoudPoster,
    alt: "Meet the Panelists - Dr. Mahmoud El-Maklizi, Postdoctoral Research Fellow",
    isMainPoster: false,
  },
  {
    id: 3,
    image: mahaPoster,
    alt: "Meet the Panelists - Maha Khawaja, PhD Student at McMaster University",
    isMainPoster: false,
  },
];

const ResearchWebinarCarousel = () => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 50;

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

  const handlePosterClick = (isMainPoster: boolean) => {
    if (isMainPoster) {
      window.open(REGISTRATION_URL, "_blank", "noopener,noreferrer");
    }
  };

  const caption = language === "ar"
    ? "انضم إلى ندوة مقدمة في البحث وتعلم كيف تبدأ رحلتك البحثية."
    : "Join our Intro to Research webinar and learn how to start your research journey.";

  const registerText = language === "ar" ? "سجّل مجاناً" : "Register Free";

  return (
    <section className="py-10 md:py-14 bg-gradient-to-b from-healthLightGray to-white">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-healthDarkBlue mb-2">
            {language === "ar" ? "ندوة مقدمة في البحث" : "Intro to Research Webinar"}
          </h2>
          <p className="text-muted-foreground">
            {language === "ar" ? "١١ فبراير ٢٠٢٦ | ٧:٠٠ مساءً" : "February 11th, 2026 | 7:00 PM"}
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative max-w-2xl mx-auto">
          {/* Slides */}
          <div
            className="relative overflow-hidden rounded-xl shadow-lg"
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
              {slides.map((slide) => (
                <div
                  key={slide.id}
                  className="min-w-full flex-shrink-0"
                  role="group"
                  aria-roledescription="slide"
                  aria-label={slide.alt}
                >
                  <img
                    src={slide.image}
                    alt={slide.alt}
                    className={`w-full h-auto object-contain ${
                      slide.isMainPoster ? "cursor-pointer" : ""
                    }`}
                    onClick={() => handlePosterClick(slide.isMainPoster)}
                    loading={slide.id === 1 ? "eager" : "lazy"}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={goToPrevious}
            className="absolute left-2 md:-left-14 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-healthDarkBlue p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-healthTeal"
            aria-label={language === "ar" ? "الشريحة السابقة" : "Previous slide"}
          >
            <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-2 md:-right-14 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-healthDarkBlue p-2 md:p-3 rounded-full shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-healthTeal"
            aria-label={language === "ar" ? "الشريحة التالية" : "Next slide"}
          >
            <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
          </button>

          {/* Dot Indicators */}
          <div className="flex justify-center gap-2 mt-4" role="tablist">
            {slides.map((slide, index) => (
              <button
                key={slide.id}
                onClick={() => goToSlide(index)}
                className={`w-3 h-3 rounded-full transition-all focus:outline-none focus:ring-2 focus:ring-healthTeal ${
                  index === currentIndex
                    ? "bg-healthTeal scale-110"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                role="tab"
                aria-selected={index === currentIndex}
                aria-label={`${language === "ar" ? "الشريحة" : "Slide"} ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Caption and CTA */}
        <div className="text-center mt-6 space-y-4">
          <p className="text-muted-foreground max-w-xl mx-auto">
            {caption}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-healthTeal hover:bg-teal-600 text-white px-8 py-3 text-base font-semibold shadow-md hover:shadow-lg transition-all"
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
