
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Award } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ImpactSection = () => {
  const { t } = useLanguage();

  const initiatives = [
    {
      title: "Upcoming Initiative",
      content: "Regional health assessment program launching in collaboration with local communities",
      date: "Starting July 2025"
    },
    {
      title: "What's New",
      content: "New research grant secured to study healthcare access disparities in rural areas",
      date: "May 2025"
    }
  ];

  const achievements = [
    {
      metric: "12,000+",
      description: "Community members reached through health initiatives"
    },
    {
      metric: "45+",
      description: "Partner organizations across the Middle East and Canada"
    },
    {
      metric: "28",
      description: "Research studies published on Middle Eastern healthcare"
    }
  ];

  return (
    <section className="py-16 bg-healthDarkBlue text-white relative">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="landmarks-pattern bg-repeat h-full w-full"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center flex items-center justify-center">
          <Award className="mr-3 text-healthGold h-8 w-8" />
          {t("impact.title")}
        </h2>
        <p className="text-lg text-center max-w-3xl mx-auto mb-12 text-healthLightGray opacity-80">
          {t("impact.subtitle")}
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {achievements.map((achievement, index) => (
            <div key={index} className="text-center p-6 rounded-lg bg-healthDarkBlue bg-opacity-50 border border-healthGold/20">
              <div className="text-4xl md:text-5xl font-bold text-healthGold mb-2">{achievement.metric}</div>
              <div className="text-healthLightGray">{achievement.description}</div>
            </div>
          ))}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {initiatives.map((initiative, index) => (
            <Card key={index} className="bg-white/10 border-none overflow-hidden backdrop-blur-sm">
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2 text-healthGold">{initiative.title}</h3>
                <p className="mb-4 text-healthLightGray">{initiative.content}</p>
                <div className="text-sm text-healthGold/80">{initiative.date}</div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <Button className="bg-healthGold hover:bg-healthGold/80 text-healthDarkBlue font-medium px-8 py-2">
            Learn More About Our Impact
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ImpactSection;
