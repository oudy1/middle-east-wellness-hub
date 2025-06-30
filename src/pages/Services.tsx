
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

  const personnel = [
    {
      name: "Dr. Layla Hassan",
      role: "Community Outreach Director",
      email: "l.hassan@shams.org",
      phone: "(480) 555-1234",
      specialization: "Community engagement and cultural health advocacy"
    },
    {
      name: "Ahmed Mahmoud, LCSW",
      role: "Mental Health Coordinator",
      email: "a.mahmoud@shams.org",
      phone: "(480) 555-2345",
      specialization: "Culturally responsive mental health services"
    },
    {
      name: "Sarah Nasser, RN",
      role: "Health Education Specialist",
      email: "s.nasser@shams.org",
      phone: "(480) 555-3456",
      specialization: "Health literacy and community education"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-healthDarkBlue text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              For the Community
            </h1>
            <p className="text-xl mb-8 max-w-3xl">
              Connecting Middle Eastern communities with culturally competent healthcare resources, 
              support networks, and advocacy services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/physician-directory">
                <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  Find Culturally Competent Physicians
                </Button>
              </Link>
              <Link to="/mentorship-booking">
                <Button className="bg-healthGold hover:bg-healthGold/90 text-healthDarkBlue flex items-center gap-2">
                  <UserCheck className="h-5 w-5" />
                  Book Mentorship Session
                </Button>
              </Link>
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
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-healthDarkBlue">
              Community Resources
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {communityResources.map((resource, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-3 text-healthDarkBlue">
                      <div className="p-2 bg-healthTeal/10 rounded-lg text-healthTeal">
                        {resource.icon}
                      </div>
                      {resource.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{resource.description}</p>
                    <Link to={resource.link}>
                      <Button variant="link" className="p-0 text-healthTeal hover:text-healthDarkBlue flex items-center gap-1">
                        Learn More <ExternalLink className="h-4 w-4" />
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Personnel Contact */}
        <section className="py-16 bg-healthLightGray">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center text-healthDarkBlue">
              Our Team - Here to Help
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {personnel.map((person, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="text-healthDarkBlue">{person.name}</CardTitle>
                    <p className="text-healthTeal font-medium">{person.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4 text-sm">{person.specialization}</p>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <Mail className="h-4 w-4 text-gray-500" />
                        <a href={`mailto:${person.email}`} className="text-sm text-healthTeal hover:underline">
                          {person.email}
                        </a>
                      </div>
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-500" />
                        <a href={`tel:${person.phone}`} className="text-sm text-healthTeal hover:underline">
                          {person.phone}
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Mentorship and Physician Directory CTA */}
        <section className="py-16 bg-healthDarkBlue text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">
              Take the Next Step in Your Health Journey
            </h2>
            <p className="text-xl mb-8 max-w-2xl mx-auto">
              Whether you need guidance navigating the healthcare system or want to find a culturally competent physician, 
              we're here to support you every step of the way.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/mentorship-booking">
                <Button className="bg-healthGold hover:bg-healthGold/90 text-healthDarkBlue flex items-center gap-2 px-8 py-3 text-lg">
                  <UserCheck className="h-5 w-5" />
                  Book Mentorship Session
                </Button>
              </Link>
              <Link to="/physician-directory">
                <Button variant="outline" className="border-white text-white hover:bg-white hover:text-healthDarkBlue flex items-center gap-2 px-8 py-3 text-lg">
                  <MapPin className="h-5 w-5" />
                  Find Physicians
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
