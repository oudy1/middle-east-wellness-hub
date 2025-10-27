
import { Card, CardContent } from "@/components/ui/card";
import { Handshake, ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import useEmblaCarousel from "embla-carousel-react";
import { useCallback } from "react";

const PartnersSection = () => {
  const { t, language } = useLanguage();
  const [emblaRef, emblaApi] = useEmblaCarousel({ 
    loop: true,
    align: 'start',
    slidesToScroll: 1,
  });

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

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
    },
    {
      name: "CASA",
      logo: "/lovable-uploads/casa-logo.png",
      description: "Christian Arab Student Association - University of Alberta",
      link: "#"
    },
    {
      name: "PCC",
      logo: "/lovable-uploads/pcc-logo.png",
      description: "Palestinian Cultural Club - University of Alberta",
      link: "#"
    },
    {
      name: "APS UTM",
      logo: "/lovable-uploads/aps-utm-logo.png",
      description: "Association of Palestinian Students - UofT Mississauga",
      link: "#"
    },
    {
      name: "McMaster Muslims in Healthcare Club",
      logo: "/lovable-uploads/mcmaster-muslims-healthcare.jpg",
      description: "McMaster University student club supporting Muslim healthcare professionals",
      link: "#"
    },
    {
      name: "LESA",
      logo: "/lovable-uploads/lesa-western-logo.jpg",
      description: "The Levant Students' Association - Western University",
      link: "#"
    }
  ];

  const renderPartnerCard = (item: any, index: number) => (
    <Card key={index} className="overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
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
        <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
      </CardContent>
    </Card>
  );

  const renderClubCard = (item: any, index: number) => (
    <div key={index} className="embla__slide flex-[0_0_100%] min-w-0 sm:flex-[0_0_50%] md:flex-[0_0_33.333%] lg:flex-[0_0_25%] px-3">
      <Card className="overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
        <CardContent className="p-6 flex flex-col items-center text-center h-full">
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
          <h3 className="text-lg font-bold mb-2">{item.name}</h3>
          <p className="text-sm text-gray-500 line-clamp-1">{item.description}</p>
        </CardContent>
      </Card>
    </div>
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
            <Link 
              to="/contact" 
              className="inline-block text-healthTeal hover:text-healthTeal/80 text-sm font-medium underline"
            >
              Become a partner
            </Link>
          </div>
        </div>

        {/* Clubs Section with Carousel */}
        <div>
          <h2 className="section-title flex items-center justify-center">
            <Handshake className="mr-3 text-healthTeal h-8 w-8" />
            {language === 'ar' ? 'النوادي والجمعيات الطلابية المتعاونة معنا' : 'Student Clubs & Associations We Collaborate With'}
          </h2>
          <p className="section-description">
            {language === 'ar' ? 'منظمات طلابية ونوادي مجتمعية تدعم مهمتنا' : 'Student organizations and community clubs supporting our mission'}
          </p>
          
          <div className="relative max-w-6xl mx-auto">
            {/* Navigation Arrows */}
            <button
              onClick={scrollPrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
              aria-label="Previous clubs"
            >
              <ChevronLeft className="h-6 w-6 text-healthTeal" />
            </button>
            
            <button
              onClick={scrollNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 bg-white rounded-full p-2 shadow-lg hover:bg-gray-50 transition-colors border border-gray-200"
              aria-label="Next clubs"
            >
              <ChevronRight className="h-6 w-6 text-healthTeal" />
            </button>

            {/* Carousel */}
            <div className="embla overflow-hidden" ref={emblaRef}>
              <div className="embla__container flex -mx-3">
                {clubs.map(renderClubCard)}
              </div>
            </div>
          </div>
          
          <div className="text-center mt-6">
            <Link 
              to="/contact" 
              className="inline-block text-healthTeal hover:text-healthTeal/80 text-sm font-medium underline"
            >
              {language === 'ar' ? 'أضف ناديك' : 'Add your club'}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
