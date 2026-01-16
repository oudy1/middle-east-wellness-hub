
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
// SHAMS_LOGO_PRIMARY - Do not change this logo path
const SHAMS_LOGO_PRIMARY = "/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png";

const HeroSection = () => {
  const { t, language } = useLanguage();
  
  return (
    <section className="relative bg-healthDarkBlue py-20 md:py-28 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-calligraphy-pattern opacity-15"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-healthDarkBlue/95 via-healthDarkBlue to-healthDarkBlue/95"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Logo - Large and prominent */}
          <div className="flex justify-center pt-4 pb-10 md:pb-12">
            <img 
              src={SHAMS_LOGO_PRIMARY} 
              alt="SHAMS Logo" 
              className="h-40 w-40 sm:h-52 sm:w-52 md:h-64 md:w-64 lg:h-72 lg:w-72 object-contain"
            />
          </div>
          
          <div className="mb-3 text-healthGold">
            <span className="font-arabic text-2xl md:text-3xl tracking-wide">{language === 'ar' ? "شمس" : "SHAMS"}</span>
            <span className="mx-3">•</span>
            <span className="text-lg md:text-xl">{t("hero.tagline")}</span>
          </div>
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 animate-fade-in leading-tight">
            {t("hero.title")}
          </h1>
          <p className="text-lg md:text-xl text-healthLightGray mb-8 animate-fade-in">
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in">
            <Link to="/about">
              <Button className="bg-healthTeal hover:bg-teal-600 text-white px-8 py-3 text-base">
                {t("hero.learnMore")}
              </Button>
            </Link>
            <Link to="/services">
              <Button className="bg-white text-healthDarkBlue hover:bg-healthLightGray border-2 border-white px-8 py-3 text-base">
                {t("hero.servicesButton")}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
