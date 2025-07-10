
import { Card, CardContent } from "@/components/ui/card";
import { Handshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PartnersSection = () => {
  const { t } = useLanguage();

  const partners = [
    {
      name: "Canadian Arab Institute",
      logo: "/lovable-uploads/ca74b069-e656-4ce3-944e-98915200f6b6.png",
      description: "Institut Canado-Arabe"
    }
  ];

  return (
    <section className="py-16 bg-white relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="calligraphy-frame-bg h-full w-full opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title flex items-center justify-center">
          <Handshake className="mr-3 text-healthTeal h-8 w-8" />
          {t("partners.title")}
        </h2>
        <p className="section-description">
          {t("partners.subtitle")}
        </p>
        
        <div className="flex justify-center">
          <div className="max-w-md">
          {partners.map((partner, index) => (
            <Card key={index} className="overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
              <CardContent className="p-6 flex flex-col items-center text-center">
                <div className="bg-healthLightGray rounded-full p-4 mb-4">
                  <img 
                    src={partner.logo} 
                    alt={partner.name}
                    className="h-16 w-16 object-contain" 
                  />
                </div>
                <h3 className="text-lg font-semibold mb-2">{partner.name}</h3>
                <p className="text-sm text-gray-500">{partner.description}</p>
              </CardContent>
            </Card>
          ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
