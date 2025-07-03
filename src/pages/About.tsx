
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import CalligraphyBackground from "@/components/CalligraphyBackground";
import LandmarksGenerator from "@/components/LandmarksGenerator";
import TeamSection from "@/components/TeamSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Heart, Globe } from "lucide-react";

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
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-healthDarkBlue mb-8 text-center">
              {language === 'ar' ? 'من نحن' : 'About Us'}
            </h1>
            <div className="flex justify-center mb-8">
              <img 
                src="/lovable-uploads/c221afaa-ecb5-4dda-9bc5-99fb5191312e.png" 
                alt="SHAMS Logo" 
                className="h-24 w-24"
              />
            </div>
            <p className="text-xl text-center max-w-3xl mx-auto mb-16 text-gray-600">
              {language === 'ar' ? 
                'تعرف على فريقنا المتفاني وأهدافنا في دعم المجتمعات العربية وشرق الأوسطية' : 
                'Learn about our dedicated team and mission to support Arab and Middle Eastern communities'}
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue mb-8">
                {language === 'ar' ? 'مهمتنا' : 'Our Mission'}
              </h2>
              <div className="text-lg leading-relaxed text-gray-700 space-y-6">
                <p>
                  Our mission is to build trust, dismantle barriers, and create a shared space of understanding between Arab and Middle Eastern communities and the Canadian healthcare system.
                </p>
                <p>
                  We focus on bridging gaps in medical education, research participation, and healthcare access while advocating for culturally responsive care, accurate representation, and inclusive dialogue.
                </p>
                <p>
                  Our work brings together students, families, professionals, and researchers to build a future where community voices are at the center of health equity.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-16 bg-healthLightGray">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue mb-12 text-center">
              {language === 'ar' ? 'قيمنا' : 'Our Values'}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Users className="w-12 h-12 text-healthTeal mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-healthDarkBlue mb-3">Community-Centered</h3>
                  <p className="text-gray-600">
                    We put community voices at the heart of everything we do, ensuring authentic representation and meaningful participation.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Heart className="w-12 h-12 text-healthTeal mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-healthDarkBlue mb-3">Culturally Responsive</h3>
                  <p className="text-gray-600">
                    We advocate for healthcare that understands and respects the cultural backgrounds of Arab and Middle Eastern communities.
                  </p>
                </CardContent>
              </Card>
              <Card className="text-center p-6">
                <CardContent className="pt-6">
                  <Globe className="w-12 h-12 text-healthTeal mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-healthDarkBlue mb-3">Bridge Building</h3>
                  <p className="text-gray-600">
                    We create connections between communities, healthcare providers, researchers, and institutions to foster understanding.
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
