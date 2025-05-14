
import { Card, CardContent } from "@/components/ui/card";
import { Handshake } from "lucide-react";

const partners = [
  {
    name: "Regional Health Foundation",
    logo: "/placeholder.svg",
    description: "Supporting healthcare initiatives across the Middle East"
  },
  {
    name: "Global Medical Research",
    logo: "/placeholder.svg", 
    description: "Advancing medical research in underserved populations"
  },
  {
    name: "Health Access Network",
    logo: "/placeholder.svg",
    description: "Improving healthcare access for communities in need"
  },
  {
    name: "Cultural Health Alliance",
    logo: "/placeholder.svg",
    description: "Promoting culturally responsive healthcare practices"
  },
  {
    name: "Middle Eastern Medical Society",
    logo: "/placeholder.svg",
    description: "Professional association for healthcare providers"
  }
];

const PartnersSection = () => {
  return (
    <section className="py-16 bg-white relative">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="calligraphy-frame-bg h-full w-full opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="section-title flex items-center justify-center">
          <Handshake className="mr-3 text-healthTeal h-8 w-8" />
          Our Partners
        </h2>
        <p className="section-description">
          We collaborate with leading organizations to advance healthcare in Middle Eastern communities
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
    </section>
  );
};

export default PartnersSection;
