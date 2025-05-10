
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import MissionSection from "@/components/MissionSection";
import StatsSection from "@/components/StatsSection";
import NewsletterSection from "@/components/NewsletterSection";
import CalligraphyBackground from "@/components/CalligraphyBackground";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray relative">
      {/* This component generates the Arabic calligraphy background and stores it in localStorage */}
      <CalligraphyBackground />
      <div className="absolute inset-0 bg-calligraphy-pattern opacity-10 pointer-events-none"></div>
      <Header />
      <main className="flex-grow relative z-10">
        <HeroSection />
        <MissionSection />
        <ServicesSection />
        <StatsSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
