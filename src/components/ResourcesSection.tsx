
import { Button } from "@/components/ui/button";
import { FileText, BookOpen, Monitor, Phone } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const resources = [
  {
    title: "Research Platform",
    description: "Access our platform supporting high-quality research in healthcare across the Middle East.",
    icon: <FileText className="h-10 w-10 text-white" />,
    color: "bg-healthTeal",
    link: "/research-resources"
  },
  {
    title: "Educational Materials",
    description: "Explore educational resources about health innovations and treatments specific to Middle Eastern populations.",
    icon: <BookOpen className="h-10 w-10 text-white" />,
    color: "bg-healthRed",
    link: "/educational-materials"
  },
  {
    title: "Newsletter Archive",
    description: "Browse our newsletter archive to stay informed of the latest news and events from our health community.",
    icon: <Monitor className="h-10 w-10 text-white" />,
    color: "bg-gray-400",
    link: "/newsletter-archive"
  },
  {
    title: "Webinar Library",
    description: "Access our library of past webinars on important health topics relevant to Middle Eastern communities.",
    icon: <Phone className="h-10 w-10 text-white" />,
    color: "bg-healthDarkBlue",
    link: "/webinar-library"
  }
];

const ResourcesSection = () => {
  return (
    <section className="py-16 md:py-24 bg-healthLightGray">
      <div className="container mx-auto px-4">
        <h2 className="section-title">Community Resources</h2>
        <p className="section-description">
          Explore our collection of resources to support healthcare advancement and research in Middle Eastern communities.
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
                  Access Resource
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
