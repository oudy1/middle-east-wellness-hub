
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
              For the Community
            </h1>
            <p className="text-lg sm:text-xl mb-6 md:mb-8 max-w-3xl mx-auto px-2 leading-relaxed">
              Connecting Middle Eastern communities with culturally competent healthcare resources, 
              support networks, and advocacy services.
            </p>
            <div className="flex justify-center px-4">
              <Link to="/physician-directory">
                <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white flex items-center gap-2 px-4 py-2 md:px-6 md:py-3 text-sm md:text-base">
                  <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                  <span className="hidden sm:inline">Find Culturally Competent Physicians</span>
                  <span className="sm:hidden">Find Physicians</span>
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Physician Directory Highlight */}
        <section className="py-12 md:py-16 bg-healthTeal/5">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <MapPin className="h-12 w-12 md:h-16 md:w-16 text-healthTeal mx-auto mb-4 md:mb-6" />
              <h2 className="text-2xl sm:text-3xl font-bold text-healthDarkBlue mb-3 md:mb-4">
                Find Physicians Near You
              </h2>
              <p className="text-gray-600 mb-6 md:mb-8 text-base sm:text-lg px-2 leading-relaxed">
                Search our directory of culturally competent physicians who understand your background 
                and speak your language. Get the care you deserve with providers who truly understand you.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center px-4">
                <Link to="/physician-directory" className="w-full sm:w-auto">
                  <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white flex items-center justify-center gap-2 px-6 md:px-8 py-2 md:py-3 text-base md:text-lg w-full sm:w-auto">
                    <MapPin className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="hidden sm:inline">Browse Physician Directory</span>
                    <span className="sm:hidden">Browse Directory</span>
                  </Button>
                </Link>
                <Link to="/physician-application" className="w-full sm:w-auto">
                  <Button variant="outline" className="border-healthTeal text-healthTeal hover:bg-healthTeal hover:text-white flex items-center justify-center gap-2 px-6 md:px-8 py-2 md:py-3 text-base md:text-lg w-full sm:w-auto">
                    <UserPlus className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="hidden sm:inline">Join Our Network</span>
                    <span className="sm:hidden">Join Network</span>
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Physician Network CTA */}
        <section className="py-12 bg-healthTeal/10">
          <div className="container mx-auto px-4 text-center">
            <div className="max-w-2xl mx-auto">
              <UserPlus className="h-12 w-12 text-healthTeal mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-healthDarkBlue mb-4">
                Are you a healthcare provider?
              </h2>
              <p className="text-gray-600 mb-6">
                Join our network of culturally competent physicians committed to serving Middle Eastern communities.
              </p>
              <Link to="/physician-application">
                <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white flex items-center gap-2 mx-auto">
                  <UserPlus className="h-5 w-5" />
                  Apply to Join Our Network
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Community Resources */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 md:mb-8 text-center text-healthDarkBlue">
              Community Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
              {communityResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader className="pb-3 md:pb-4">
                    <CardTitle className="flex items-center gap-2 md:gap-3 text-healthDarkBlue text-base md:text-lg">
                      <div className="p-1.5 md:p-2 bg-healthTeal/10 rounded-lg text-healthTeal flex-shrink-0">
                        {resource.icon}
                      </div>
                      <span className="leading-tight">{resource.title}</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <p className="text-gray-600 mb-3 md:mb-4 text-sm md:text-base leading-relaxed">{resource.description}</p>
                    <Link to={resource.link}>
                      <Button variant="link" className="p-0 text-healthTeal hover:text-healthDarkBlue flex items-center gap-1 text-sm md:text-base">
                        Learn More <ExternalLink className="h-3 w-3 md:h-4 md:w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Educational Materials Section */}
        <section className="py-12 md:py-16 bg-healthDarkBlue text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 md:mb-6 text-center">
              Educational Materials
            </h2>
            <p className="text-lg sm:text-xl mb-6 md:mb-8 max-w-2xl mx-auto text-center px-2 leading-relaxed">
              Download our curated educational resources to learn more about health topics relevant to Middle Eastern communities.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 max-w-5xl mx-auto">
              {/* Educational materials will be added here once files are provided */}
              <div className="text-center text-gray-300 col-span-full py-8">
                Educational materials coming soon...
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
