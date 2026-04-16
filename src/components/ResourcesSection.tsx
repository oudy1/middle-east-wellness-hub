
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";

const ResourcesSection = () => {
  const { t, language } = useLanguage();
  const isAr = language === 'ar';
  
  const resources = [
    {
      title: t("resources.researchPlatform"),
      description: t("resources.researchPlatformDesc"),
      icon: <FileText className="h-10 w-10 text-white" />,
      color: "bg-healthTeal",
      link: "/research",
      comingSoon: false
    },
    {
      title: t("resources.educationalMaterials"),
      description: t("resources.educationalMaterialsDesc"),
      icon: <BookOpen className="h-10 w-10 text-white" />,
      color: "bg-healthRed",
      link: "/services#educational-materials",
      comingSoon: false
    },
    {
      title: t("resources.webinarLibrary"),
      description: t("resources.webinarLibraryDesc"),
      icon: <Phone className="h-10 w-10 text-white" />,
      color: "bg-healthDarkBlue",
      link: "/recordings",
      comingSoon: false
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4" dir={isAr ? 'rtl' : 'ltr'}>
        <h2 className={`section-title ${isAr ? 'font-cairo' : ''}`}>
          {t("resources.title")}
        </h2>
        <p className={`section-description ${isAr ? 'font-cairo' : ''}`}>
          {t("resources.subtitle")}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12 justify-items-center max-w-4xl mx-auto">
          {resources.map((resource, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-md relative">
              <div className={`${resource.color} p-6`}>
                <div className="flex justify-center">
                  {resource.icon}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className={`text-xl font-bold mb-3 ${isAr ? 'font-cairo' : ''}`}>{resource.title}</h3>
                <p className={`text-muted-foreground mb-4 ${isAr ? 'font-cairo' : ''}`}>{resource.description}</p>
                <Link to={resource.link}>
                  <Button variant="link" className="p-0 text-healthTeal hover:text-healthTeal/80">
                    {t("resources.accessResource")}
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

export default ResourcesSection;
