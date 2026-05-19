import { lazy, Suspense, useRef } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import CalligraphyBackground from "@/components/CalligraphyBackground";
import { SEOHead } from "@/components/SEOHead";
import { useLanguage } from "@/contexts/LanguageContext";

// Below-the-fold sections — code-split so they don't block the hero paint.
const FeaturedEventSection = lazy(() => import("@/components/FeaturedEventSection"));
const FeaturedWebinarBanner = lazy(() => import("@/components/FeaturedWebinarBanner"));
const ResearchWebinarCarousel = lazy(() => import("@/components/ResearchWebinarCarousel"));
const ResourceFinderSection = lazy(() =>
  import("@/components/ResourceFinder").then((m) => ({ default: m.ResourceFinderSection }))
);
const WhatIsSHAMS = lazy(() => import("@/components/WhatIsSHAMS"));
const WhatWeDoSection = lazy(() => import("@/components/WhatWeDoSection"));
const UpcomingEventsSection = lazy(() => import("@/components/UpcomingEventsSection"));
const MissionSection = lazy(() => import("@/components/MissionSection"));
const TopicOfTheWeekSection = lazy(() => import("@/components/TopicOfTheWeekSection"));
const ResearchTeaserSection = lazy(() => import("@/components/ResearchTeaserSection"));
const FeaturedNewsSection = lazy(() => import("@/components/FeaturedNewsSection"));
const MeetTeamButton = lazy(() => import("@/components/MeetTeamButton"));
const ResourcesSection = lazy(() => import("@/components/ResourcesSection"));
const PartnersSection = lazy(() => import("@/components/PartnersSection"));
const NewsletterSection = lazy(() => import("@/components/NewsletterSection"));
const LandmarksGenerator = lazy(() => import("@/components/LandmarksGenerator"));

const SectionFallback = () => <div className="min-h-[200px]" aria-hidden="true" />;

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
      {/* Calligraphy backdrop runs in requestIdleCallback after first paint */}
      <CalligraphyBackground />
      <div className="absolute inset-0 bg-calligraphy-pattern opacity-10 pointer-events-none"></div>
      <Header />
      <main className="flex-grow relative z-10">
        {/* Hero stays eager — it contains LCP */}
        <HeroSection />

        <Suspense fallback={<SectionFallback />}>
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
          <LandmarksGenerator />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
