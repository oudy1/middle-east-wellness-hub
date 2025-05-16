
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Monitor, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useLanguage } from "@/contexts/LanguageContext";

const ResourcesSection = () => {
  const { t } = useLanguage();
  
  const resources = [
    {
      title: t("resources.researchPlatform"),
      description: t("resources.researchPlatformDesc"),
      icon: <FileText className="h-10 w-10 text-white" />,
      color: "bg-healthTeal",
      link: "/research-resources"
    },
    {
      title: t("resources.educationalMaterials"),
      description: t("resources.educationalMaterialsDesc"),
      icon: <BookOpen className="h-10 w-10 text-white" />,
      color: "bg-healthRed",
      link: "/educational-materials"
    },
    {
      title: t("resources.newsletterArchive"),
      description: t("resources.newsletterArchiveDesc"),
      icon: <Monitor className="h-10 w-10 text-white" />,
      color: "bg-gray-400",
      link: "/newsletter-archive"
    },
    {
      title: t("resources.webinarLibrary"),
      description: t("resources.webinarLibraryDesc"),
      icon: <Phone className="h-10 w-10 text-white" />,
      color: "bg-healthDarkBlue",
      link: "/webinar-library"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-healthLightGray">
      <div className="container mx-auto px-4">
        <h2 className="section-title">{t("resources.title")}</h2>
        <p className="section-description">
          {t("resources.subtitle")}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resources.map((resource, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-md">
              <div className={`${resource.color} p-6`}>
                <div className="flex justify-center">
                  {resource.icon}
                </div>
              </div>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-3">{resource.title}</h3>
                <p className="text-gray-600 mb-4">{resource.description}</p>
                <Button variant="link" className="p-0 text-healthTeal hover:text-healthDarkBlue">
                  {t("resources.accessResource")}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ResourcesSection;
