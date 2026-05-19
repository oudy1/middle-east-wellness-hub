
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import ResearchWebinarCarousel from "@/components/ResearchWebinarCarousel";
import WhatIsSHAMS from "@/components/WhatIsSHAMS";
import FeaturedWebinarBanner from "@/components/FeaturedWebinarBanner";
import WhatWeDoSection from "@/components/WhatWeDoSection";
import MissionSection from "@/components/MissionSection";
import ResourcesSection from "@/components/ResourcesSection";
import StatsSection from "@/components/StatsSection";
import NewsletterSection from "@/components/NewsletterSection";
import CalligraphyBackground from "@/components/CalligraphyBackground";
import LandmarksGenerator from "@/components/LandmarksGenerator";
import UpcomingEventsSection from "@/components/UpcomingEventsSection";
import FeaturedEventSection from "@/components/FeaturedEventSection";
import PartnersSection from "@/components/PartnersSection";
import MeetTeamButton from "@/components/MeetTeamButton";
import FeaturedNewsSection from "@/components/FeaturedNewsSection";
import TopicOfTheWeekSection from "@/components/TopicOfTheWeekSection";
import ResearchTeaserSection from "@/components/ResearchTeaserSection";
import { ResourceFinderSection } from "@/components/ResourceFinder";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";


const Index = () => {
  const { language } = useLanguage();
  return (
    <div className="flex flex-col min-h-screen w-full bg-healthLightGray relative">
      <SEOHead
        lang={language === "ar" ? "ar" : "en"}
        title="SHAMS | Health Advocacy for MENA Societies in Canada"
        description="Youth-led Canadian non-profit supporting MENA societies through health education, research, mentorship, healthcare navigation, and community resources."
        titleAr="شمس | المناصرة الصحية للمجتمعات الشرق أوسطية في كندا"
        descriptionAr="شمس مبادرة شبابية كندية تدعم المجتمعات الشرق أوسطية وشمال أفريقيا من خلال التثقيف الصحي، البحث، الإرشاد، والموارد المجتمعية."
        path="/"
        keywords="SHAMS, Middle Eastern health Canada, Arab healthcare Canada, MENA health advocacy, Arabic health education, Project SHAMS"
        jsonLd={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: "SHAMS",
            alternateName: "Project SHAMS",
            url: "https://www.projectshams.com",
            logo: "https://www.projectshams.com/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png",
            email: "infoprojectshams@gmail.com",
            sameAs: ["https://www.instagram.com/projectshams/"],
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "SHAMS",
            url: "https://www.projectshams.com",
            inLanguage: ["en", "ar"],
            description:
              "Youth-led Canadian non-profit supporting MENA societies through health education, research, mentorship, and healthcare navigation.",
          },
        ]}
      />
      {/* These components generate the Arabic calligraphy/landmarks backgrounds */}
      <CalligraphyBackground />
      <LandmarksGenerator />
      <div className="absolute inset-0 bg-calligraphy-pattern opacity-10 pointer-events-none"></div>
      <Header />
      <main className="flex-grow relative z-10">
        <HeroSection />
        <FeaturedEventSection />
        <FeaturedWebinarBanner />
        <ResearchWebinarCarousel />
        <ResourceFinderSection />
        <WhatIsSHAMS />
        <WhatWeDoSection />
        <UpcomingEventsSection />
        <MissionSection />
        <TopicOfTheWeekSection />
        <ResearchTeaserSection />
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
