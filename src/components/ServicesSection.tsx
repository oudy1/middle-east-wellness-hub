
import { Button } from "@/components/ui/button";
import { User, BookOpen, Monitor, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const ServicesSection = () => {
  const { t } = useLanguage();
  
  const services = [
    {
      title: t("services.researchPlatform"),
      description: t("services.researchPlatformDesc"),
      icon: <User className="h-10 w-10 text-white" />,
      color: "bg-healthTeal",
      link: "/research-services"
    },
    {
      title: t("services.ourResearch"),
      description: t("services.ourResearchDesc"),
      icon: <BookOpen className="h-10 w-10 text-white" />,
      color: "bg-healthRed",
      link: "/our-research"
    },
    {
      title: t("services.newsletter"),
      description: t("services.newsletterDesc"),
      icon: <Monitor className="h-10 w-10 text-white" />,
      color: "bg-gray-400",
      link: "/newsletter"
    },
    {
      title: t("services.webinars"),
      description: t("services.webinarsDesc"),
      icon: <Phone className="h-10 w-10 text-white" />,
      color: "bg-healthDarkBlue",
      link: "/webinars"
    },
    {
      title: t("services.physicianDirectory"),
      description: t("services.physicianDirectoryDesc"),
      icon: <MapPin className="h-10 w-10 text-white" />,
      color: "bg-healthPurple",
      link: "/physician-directory"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-healthLightGray">
      <div className="container mx-auto px-4">
        <h2 className="section-title">{t("services.title")}</h2>
        <p className="section-description">
          {t("services.subtitle")}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-md">
              <div className={`${service.color} p-6`}>
                <div className="flex justify-center">
                  {service.icon}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                <Link to={service.link}>
                  <Button variant="link" className="p-0 text-healthTeal hover:text-healthDarkBlue">
                    {t("services.learnMore")}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
