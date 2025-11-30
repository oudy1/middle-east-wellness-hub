import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardContent } from "@/components/ui/card";
import { BookOpen, Users, FlaskConical } from "lucide-react";
import { Link } from "react-router-dom";

const WhatWeDoSection = () => {
  const { t, language } = useLanguage();
  
  const cards = [
    {
      icon: BookOpen,
      title: t("whatWeDo.healthEducation"),
      description: t("whatWeDo.healthEducationDesc"),
      link: "/services"
    },
    {
      icon: Users,
      title: t("whatWeDo.mentorship"),
      description: t("whatWeDo.mentorshipDesc"),
      link: "/services"
    },
    {
      icon: FlaskConical,
      title: t("whatWeDo.communityResearch"),
      description: t("whatWeDo.communityResearchDesc"),
      link: "/resources"
    }
  ];
  
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {cards.map((card, index) => (
            <Link key={index} to={card.link}>
              <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <card.icon className="w-12 h-12 text-healthTeal mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-healthDarkBlue mb-3">
                    {card.title}
                  </h3>
                  <p 
                    className={`text-sm text-gray-600 leading-relaxed ${language === 'ar' ? 'text-right' : ''}`}
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  >
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
