
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalligraphyBackground from "@/components/CalligraphyBackground";
import LandmarksGenerator from "@/components/LandmarksGenerator";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray relative">
      {/* These components generate the Arabic calligraphy/landmarks backgrounds */}
      <CalligraphyBackground />
      <LandmarksGenerator />
      <div className="absolute inset-0 bg-calligraphy-pattern opacity-10 pointer-events-none"></div>
      
      <Header />
      
      <main className="flex-grow relative z-10">
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-healthDarkBlue mb-8 text-center">
              {t("team.title")}
            </h1>
            <p className="text-xl text-center max-w-3xl mx-auto mb-16 text-gray-600">
              {t("team.subtitle")}
            </p>
            
            <div className="text-center py-12">
              <p className="text-xl">{t("team.comingSoon")}</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
