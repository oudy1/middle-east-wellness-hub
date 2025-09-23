
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
      name: "Mississauga Registered Community Group",
      logo: "/lovable-uploads/mississauga-community-group.jpg",
      description: "Supporting diverse communities in Mississauga",
      link: "#"
    },
  ];

  const clubs = [
    {
      name: "ESA",
      logo: "/lovable-uploads/39e9c9bb-c2c1-4501-ade8-cb84677e5f05.png",
      description: "Egyptian Students Association",
      link: "#"
    },
    {
      name: "North African Student Association of UW and Laurier",
      logo: "/lovable-uploads/9bcba8eb-2b6e-41ec-8425-6962c2273f5d.png",
      description: "Student association serving North African communities at University of Waterloo and Wilfrid Laurier University",
      link: "#"
    },
    {
      name: "MYOM",
      logo: "/lovable-uploads/myom-logo.png",
      description: "Moroccan Youth of Montreal",
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
          <div className="mb-4">
            <img 
              src={item.logo} 
              alt={item.name}
              className="h-24 w-24 object-contain mx-auto" 
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
