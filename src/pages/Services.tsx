
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  BookOpen, 
  Calendar, 
  Users, 
  MapPin, 
  MessageCircle, 
  ExternalLink,
  Phone,
  Mail,
  UserCheck,
  UserPlus
} from "lucide-react";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Services = () => {
  const { t, language } = useLanguage();

  const communityResources = [
    {
      title: "Mental Health Support Groups",
      description: "Connect with others who understand your cultural background and mental health journey.",
      link: "/mental-health-support",
      icon: <Users className="h-6 w-6" />
    },
    {
      title: "Cultural Navigation Resources",
      description: "Tools and guides to help navigate healthcare systems while maintaining cultural identity.",
      link: "/cultural-navigation",
      icon: <BookOpen className="h-6 w-6" />
    },
    {
      title: "Language Interpretation Services",
      description: "Find qualified medical interpreters who understand Middle Eastern languages and cultures.",
      link: "/interpretation-services",
      icon: <MessageCircle className="h-6 w-6" />
    },
    {
      title: "Health Education Materials",
      description: "Culturally appropriate health education resources in Arabic, Farsi, and other languages.",
      link: "/health-education",
      icon: <BookOpen className="h-6 w-6" />
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <main className="flex-grow">
        {/* Hero Section - Centered */}
        <section className="bg-healthDarkBlue text-white py-12 md:py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 md:mb-6 leading-tight">
              Community Services
            </h1>
            <p className="text-lg sm:text-xl mb-6 md:mb-8 max-w-3xl mx-auto px-2 leading-relaxed">
              Supporting healthcare advancement and research for Middle Eastern communities.
            </p>
          </div>
        </section>


        {/* Physician Network CTA */}
        <section className="py-12 bg-healthTeal/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <UserPlus className="h-12 w-12 text-healthTeal mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-healthDarkBlue mb-4">
                {t("services.healthcareProvider")}
              </h2>
              <p className="text-gray-600 mb-6">
                {t("services.joinNetwork")}
              </p>
              <Link to="/physician-application">
                <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white flex items-center gap-2 mx-auto text-lg md:text-xl px-8 md:px-12 py-3 md:py-4">
                  <UserPlus className="h-6 w-6" />
                  {t("services.applyJoinNetwork")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Apply to Join Us Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <Users className="h-12 w-12 text-healthTeal mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-healthDarkBlue mb-4">
                {t("services.joinTeam")}
              </h2>
              <p className="text-gray-600 mb-6">
                {t("services.joinTeamDescription")}
              </p>
              <Link to="/join-us">
                <Button className="bg-healthDarkBlue hover:bg-healthDarkBlue/90 text-white flex items-center gap-2 mx-auto text-lg md:text-xl px-8 md:px-12 py-3 md:py-4">
                  <Users className="h-6 w-6" />
                  {t("services.applyJoinUs")}
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Educational Materials */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-center text-healthDarkBlue">
              {t("services.educationalMaterials")}
            </h2>
            <p className="text-lg sm:text-xl mb-6 md:mb-8 max-w-2xl mx-auto text-center px-2 leading-relaxed">
              {t("services.educationalDescription")}
            </p>
            <div id="educational-materials" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              {/* Alone in Canada Guide */}
              <Card className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-healthTeal/10 flex items-center justify-center p-4">
                  <img 
                    src="/public/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png" 
                    alt="Alone in Canada Guide" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-healthDarkBlue text-lg leading-tight">
                    Alone in Canada: 21 Ways to Make It Better | وحيد في كندا: ٢١ طريقة لتجعلها أفضل
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    Real advice from newcomers on adapting to life in Canada. Covers making friends, cultural norms, holidays, and mental wellness tips especially useful for newcomers.
                  </p>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    نصائح حقيقية من مهاجرين جدد حول التأقلم مع الحياة في كندا. يشمل بناء الصداقات وفهم الثقافة الكندية ونصائح الصحة النفسية.
                  </p>
                  <p className="text-xs text-gray-500 mb-4">Source: CAMH – Centre for Addiction and Mental Health</p>
                  <a 
                    href="https://www.camh.ca/-/media/files/mi-index-other-languages/english-alone-in-canada.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white flex items-center gap-2 w-full">
                      <BookOpen className="h-4 w-4" />
                      {t("services.downloadPDF")}
                    </Button>
                  </a>
                </CardContent>
              </Card>

              {/* Arabic-English Medical Terminology Guide */}
              <Card className="hover:shadow-lg transition-shadow">
                <div className="aspect-video bg-healthTeal/10 flex items-center justify-center p-4">
                  <img 
                    src="/lovable-uploads/46453847-1b06-4288-b707-464176e53351.png" 
                    alt="Arabic-English Medical Terminology Guide" 
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
                <CardHeader className="pb-3">
                  <CardTitle className="text-healthDarkBlue text-lg leading-tight">
                    Arabic-English Medical Terminology Guide | دليل المصطلحات الطبية
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    Clear translations of essential medical terms from English to Arabic, helping support communication between healthcare providers and Arabic-speaking patients.
                  </p>
                  <p className="text-gray-600 mb-4 text-sm leading-relaxed">
                    ترجمات واضحة للمصطلحات الطبية الأساسية من الإنجليزية إلى العربية، مما يساعد في تحسين التواصل بين مقدمي الرعاية الصحية والمرضى الناطقين بالعربية.
                  </p>
                  <p className="text-xs text-gray-500 mb-4">Source: Adapted with gratitude from the University of Oregon Health Center</p>
                  <a 
                    href="https://health.uoregon.edu/sites/default/files/Translation-Arabic.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white flex items-center gap-2 w-full">
                      <BookOpen className="h-4 w-4" />
                      {t("services.downloadPDF")}
                    </Button>
                  </a>
                </CardContent>
              </Card>
              
              {/* Placeholder for future materials */}
              <div className="text-center text-gray-500 col-span-full py-8">
                {t("services.materialsComingSoon")}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
