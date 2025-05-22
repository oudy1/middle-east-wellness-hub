
import { Button } from "@/components/ui/button";
import { User, BookOpen, Monitor, Phone, MapPin } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const services = [
  {
    title: "Research Services Platform",
    description: "A platform to support the development of high-quality research in healthcare across the Middle East.",
    icon: <User className="h-10 w-10 text-white" />,
    color: "bg-healthTeal",
    link: "/research-services"
  },
  {
    title: "Our Research",
    description: "Learn about our research surrounding health innovations and treatments specific to Middle Eastern populations.",
    icon: <BookOpen className="h-10 w-10 text-white" />,
    color: "bg-healthRed",
    link: "/our-research"
  },
  {
    title: "Newsletter",
    description: "Stay informed of the latest news and events from our health community and research initiatives.",
    icon: <Monitor className="h-10 w-10 text-white" />,
    color: "bg-gray-400",
    link: "/newsletter"
  },
  {
    title: "Webinars",
    description: "Access past webinars and register for upcoming presentations on important health topics.",
    icon: <Phone className="h-10 w-10 text-white" />,
    color: "bg-healthDarkBlue",
    link: "/webinars"
  },
  {
    title: "Physician Directory",
    description: "Find family physicians in your area with our interactive map directory showing providers by location.",
    icon: <MapPin className="h-10 w-10 text-white" />,
    color: "bg-healthPurple",
    link: "/physician-directory"
  }
];

const ServicesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-healthLightGray">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Our Services</h2>
        <p className="section-description">
          We offer a range of services to support healthcare advancement and research in the Middle East.
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
                    Learn More
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
