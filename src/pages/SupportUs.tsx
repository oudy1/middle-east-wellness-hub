import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalligraphyBackground from "@/components/CalligraphyBackground";
import LandmarksGenerator from "@/components/LandmarksGenerator";
import InquiryForm from "@/components/InquiryForm";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Calendar,
  DollarSign,
  Handshake,
  Users,
  Heart
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

import { SEOHead } from "@/components/SEOHead";
const SupportUs = () => {
  const { language, t } = useLanguage();

  const supportOptions = [
    {
      title: t("supportUs.sponsor.title"),
      description: t("supportUs.sponsor.description"),
      icon: <Calendar className="h-12 w-12 text-healthTeal" />,
      color: "bg-healthTeal/10"
    },
    {
      title: t("supportUs.fund.title"),
      description: t("supportUs.fund.description"),
      icon: <DollarSign className="h-12 w-12 text-healthRed" />,
      color: "bg-healthRed/10"
    },
    {
      title: t("supportUs.collaborate.title"),
      description: t("supportUs.collaborate.description"),
      icon: <Handshake className="h-12 w-12 text-healthGold" />,
      color: "bg-healthGold/10"
    },
    {
      title: t("supportUs.volunteer.title"),
      description: t("supportUs.volunteer.description"),
      icon: <Users className="h-12 w-12 text-healthPurple" />,
      color: "bg-healthPurple/10"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray relative">
      <CalligraphyBackground />
      <LandmarksGenerator />
      <div className="absolute inset-0 bg-calligraphy-pattern opacity-10 pointer-events-none"></div>
      
      <Header />
      <SEOHead
        lang={language === "ar" ? "ar" : "en"}
        path="/support-us"
        title="Support SHAMS | SHAMS"
        description="Ways to support SHAMS, a Toronto non-profit improving health advocacy and access for Middle Eastern and North African societies in Canada."
        titleAr="ادعم شمس | شمس"
        descriptionAr="طرق دعم شمس، المنظمة غير الربحية في تورنتو التي تعمل على تحسين المناصرة الصحية والوصول إلى الرعاية لمجتمعات الشرق الأوسط وشمال أفريقيا في كندا."
      />
      
      <main id="main-content" className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <Heart className="h-16 w-16 text-healthTeal" />
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-healthDarkBlue mb-8">
              {t("supportUs.title")}
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-12 text-gray-600">
              {t("supportUs.intro")}
            </p>
          </div>
        </section>

        {/* Support Options */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue mb-4 text-center">
              {t("supportUs.waysTitle")}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto text-center mb-12">
              {t("supportUs.waysIntro")}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
              {supportOptions.map((option, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow duration-300">
                  <CardHeader className="text-center">
                    <div className={`${option.color} rounded-full p-6 w-fit mx-auto mb-4`}>
                      {option.icon}
                    </div>
                    <CardTitle className="text-xl text-healthDarkBlue">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 text-center">{option.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="py-16 bg-healthLightGray">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue mb-6">
                {t("supportUs.workTogetherTitle")}
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                {t("supportUs.workTogetherBody")}
              </p>
            </div>
            
            <div className="max-w-2xl mx-auto">
              <InquiryForm />
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default SupportUs;