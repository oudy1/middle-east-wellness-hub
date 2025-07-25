
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import MissionSection from "@/components/MissionSection";
import ResourcesSection from "@/components/ResourcesSection";
import StatsSection from "@/components/StatsSection";
import NewsletterSection from "@/components/NewsletterSection";
import CalligraphyBackground from "@/components/CalligraphyBackground";
import LandmarksGenerator from "@/components/LandmarksGenerator";
import UpcomingEventsSection from "@/components/UpcomingEventsSection";
import PartnersSection from "@/components/PartnersSection";
import MeetTeamButton from "@/components/MeetTeamButton";
import FeaturedNewsSection from "@/components/FeaturedNewsSection";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen w-full bg-healthLightGray relative">
      {/* These components generate the Arabic calligraphy/landmarks backgrounds */}
      <CalligraphyBackground />
      <LandmarksGenerator />
      <div className="absolute inset-0 bg-calligraphy-pattern opacity-10 pointer-events-none"></div>
      <Header />
      <main className="flex-grow relative z-10">
        <HeroSection />
        <UpcomingEventsSection />
        <MissionSection />
        <FeaturedNewsSection />
        <MeetTeamButton />
        <ResourcesSection />
        <PartnersSection />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
