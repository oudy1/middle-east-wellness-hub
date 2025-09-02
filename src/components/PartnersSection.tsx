
import { Card, CardContent } from "@/components/ui/card";
import { Handshake } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const PartnersSection = () => {
  const { t } = useLanguage();

  const partners = [
    {
      name: "Canadian Arab Institute",
      logo: "/lovable-uploads/ca74b069-e656-4ce3-944e-98915200f6b6.png",
      description: "Institut Canado-Arabe",
      link: "https://www.canadianarabinstitute.org"
    },
    {
      name: "Together Project",
      logo: "/lovable-uploads/c96ab6e9-e7cb-4ed6-a0db-a332b5d2c2f8.png",
      description: "A project of MakeWay",
      link: "https://www.togetherproject.ca"
    }
  ];

  const clubs = [
    {
      name: "ESA",
      logo: "/lovable-uploads/3dfd7382-c840-41cb-bbc1-e4505d4fd0b0.png",
      description: "Egyptian Students Association",
      link: "#"
    }
  ];

  const renderPartnerCard = (item: any, index: number) => (
    <Card key={index} className="overflow-hidden border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <CardContent className="p-6 flex flex-col items-center text-center">
        <a 
          href={item.link} 
          target="_blank" 
          rel="noopener noreferrer"
          className="block hover:scale-105 transition-transform duration-200"
        >
          <div className="bg-healthLightGray rounded-full p-4 mb-4">
            <img 
              src={item.logo} 
              alt={item.name}
              className="h-16 w-16 object-contain" 
            />
          </div>
        </a>
        <h3 className="text-lg font-semibold mb-2">{item.name}</h3>
        <p className="text-sm text-gray-500">{item.description}</p>
      </CardContent>
    </Card>
  );

  return (
    <section className="py-16 bg-white relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="calligraphy-frame-bg h-full w-full opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 space-y-12">
        {/* Partners Section */}
        <div>
          <h2 className="section-title flex items-center justify-center">
            <Handshake className="mr-3 text-healthTeal h-8 w-8" />
            Our Partners
          </h2>
          <p className="section-description">
            Working together to improve health outcomes in Arab communities
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-4">
            {partners.map(renderPartnerCard)}
          </div>
          
          <div className="text-center">
            <a 
              href="mailto:contact@projectshams.org?subject=Partnership Inquiry" 
              className="inline-block text-healthTeal hover:text-healthTeal/80 text-sm font-medium underline"
            >
              Become a partner
            </a>
          </div>
        </div>

        {/* Clubs Section */}
        <div>
          <h2 className="section-title flex items-center justify-center">
            <Handshake className="mr-3 text-healthTeal h-8 w-8" />
            Clubs We Work With
          </h2>
          <p className="section-description">
            Student organizations and community clubs supporting our mission
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-4xl mx-auto mb-4">
            {clubs.map(renderPartnerCard)}
          </div>
          
          <div className="text-center">
            <a 
              href="mailto:contact@projectshams.org?subject=Club Partnership" 
              className="inline-block text-healthTeal hover:text-healthTeal/80 text-sm font-medium underline"
            >
              Add your club
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
