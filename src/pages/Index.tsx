
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ServicesSection from "@/components/ServicesSection";
import MissionSection from "@/components/MissionSection";
import StatsSection from "@/components/StatsSection";
import NewsletterSection from "@/components/NewsletterSection";

// Create a separate public/images folder and add actual landmark image
// For now, we'll use our programmatic generator component in development
// but would replace with a static image in production
const Index = () => {
  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray">
      <Header />
      <main className="flex-grow">
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
