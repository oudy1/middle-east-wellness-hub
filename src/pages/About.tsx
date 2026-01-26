
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalligraphyBackground from "@/components/CalligraphyBackground";
import LandmarksGenerator from "@/components/LandmarksGenerator";
import TeamSection from "@/components/TeamSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Globe, MapPin } from "lucide-react";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown } from "lucide-react";
// SHAMS_LOGO_PRIMARY - Do not change this logo path
const SHAMS_LOGO_PRIMARY = "/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png";

const About = () => {
  const { language, t } = useLanguage();
  
  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray relative">
      {/* These components generate the Arabic calligraphy/landmarks backgrounds */}
      <CalligraphyBackground />
      <LandmarksGenerator />
      <div className="absolute inset-0 bg-calligraphy-pattern opacity-10 pointer-events-none"></div>
      
      <Header />
      
      <main className="flex-grow relative z-10">
        {/* Hero Section */}
        <section className="py-12 md:py-16 lg:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-healthDarkBlue mb-6 md:mb-8 text-center leading-tight">
              {language === 'ar' ? 'من نحن' : 'About Us'}
            </h1>
            <div className="flex justify-center mb-6 md:mb-8">
              <img 
                src={SHAMS_LOGO_PRIMARY} 
                alt="SHAMS Logo" 
                className="h-28 w-28 sm:h-32 sm:w-32 md:h-40 md:w-40 object-contain"
              />
            </div>
            <p className="text-lg sm:text-xl text-center max-w-3xl mx-auto mb-12 md:mb-16 text-gray-600 px-2">
              {language === 'ar' ? 
                'تعرف على فريقنا المتفاني وأهدافنا في دعم المجتمعات العربية وشرق الأوسطية' : 
                'Learn about our dedicated team and mission to support Arab and Middle Eastern societies'}
            </p>
          </div>
        </section>

        {/* Canada Focus Banner */}
        <section className="py-4 bg-healthTeal/20 border-y border-healthTeal/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-center gap-3">
              <MapPin className="w-5 h-5 text-healthTeal" />
              <p className="text-lg font-semibold text-healthDarkBlue">
                {t("about.canadaFocus")}
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section id="mission" className="py-12 md:py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-healthDarkBlue mb-6 md:mb-8 text-center">
                {language === 'ar' ? 'مهمتنا' : 'Our Mission'}
              </h2>
              <div className="text-base sm:text-lg leading-relaxed text-gray-700 mb-8 px-2">
                <p className={language === 'ar' ? 'text-right' : ''} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  {t("about.mission")}
                </p>
              </div>
              
              {/* Why Societies FAQ */}
              <div className="mt-8">
                <Collapsible>
                  <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-healthLightGray rounded-lg hover:bg-gray-200 transition-colors">
                    <span className="font-semibold text-healthDarkBlue text-left">
                      {t("about.whySocietiesTitle")}
                    </span>
                    <ChevronDown className="w-5 h-5 text-healthTeal" />
                  </CollapsibleTrigger>
                  <CollapsibleContent className="p-4 text-gray-700">
                    <p className={language === 'ar' ? 'text-right' : ''} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                      {t("about.whySocietiesDesc")}
                    </p>
                  </CollapsibleContent>
                </Collapsible>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-12 md:py-16 bg-healthLightGray">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-healthDarkBlue mb-8 md:mb-12 text-center">
              {language === 'ar' ? 'قيمنا' : 'Our Values'}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              <Card className="text-center p-4 md:p-6">
                <CardContent className="pt-4 md:pt-6">
                  <Users className="w-10 h-10 md:w-12 md:h-12 text-healthTeal mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold text-healthDarkBlue mb-2 md:mb-3">
                    {language === 'ar' ? 'محوره المجتمع' : 'Community-Centered'}
                  </h3>
                  <p className={`text-sm md:text-base text-gray-600 leading-relaxed ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 
                      'نضع أصوات المجتمع في قلب كل ما نقوم به، مما يضمن التمثيل الأصيل والمشاركة الهادفة.' : 
                      'We put community voices at the heart of everything we do, ensuring authentic representation and meaningful participation.'
                    }
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center p-4 md:p-6">
                <CardContent className="pt-4 md:pt-6">
                  <Heart className="w-10 h-10 md:w-12 md:h-12 text-healthTeal mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold text-healthDarkBlue mb-2 md:mb-3">
                    {language === 'ar' ? 'متجاوب ثقافياً' : 'Culturally Responsive'}
                  </h3>
                  <p className={`text-sm md:text-base text-gray-600 leading-relaxed ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 
                      'ندافع عن الرعاية الصحية التي تفهم وتحترم الخلفيات الثقافية للمجتمعات العربية وشرق الأوسطية.' : 
                      'We advocate for healthcare that understands and respects the cultural backgrounds of Arab and Middle Eastern communities.'
                    }
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center p-4 md:p-6">
                <CardContent className="pt-4 md:pt-6">
                  <Globe className="w-10 h-10 md:w-12 md:h-12 text-healthTeal mx-auto mb-3 md:mb-4" />
                  <h3 className="text-lg md:text-xl font-semibold text-healthDarkBlue mb-2 md:mb-3">
                    {language === 'ar' ? 'بناء الجسور' : 'Bridge Building'}
                  </h3>
                  <p className={`text-sm md:text-base text-gray-600 leading-relaxed ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 
                      'نخلق روابط بين المجتمعات ومقدمي الرعاية الصحية والباحثين والمؤسسات لتعزيز التفاهم.' : 
                      'We create connections between communities, healthcare providers, researchers, and institutions to foster understanding.'
                    }
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Team Section - Now using the TeamSection component */}
        <TeamSection />
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
