
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, ArrowRight } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const UpcomingEventsSection = () => {
  const { t } = useLanguage();
  
  const event = {
    title: "Coming Soon",
    date: "Stay Tuned",
    description: "Exciting health events and educational opportunities are being planned. Check back soon for updates!",
    location: "Details to follow",
    registrationLink: "#"
  };

  return (
    <section className="py-16 bg-healthLightGray relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="calligraphy-frame-bg h-full w-full opacity-30"></div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue flex items-center justify-center">
            <CalendarDays className="mr-3 text-healthTeal h-8 w-8" />
            {t("events.title")}
          </h2>
          <p className="text-gray-600 mt-2">{t("events.subtitle")}</p>
        </div>
        
        <div className="flex justify-center">
          <Card className="overflow-hidden border-none shadow-lg bg-white hover:shadow-xl transition-shadow duration-300 max-w-md w-full">
            <CardContent className="p-6">
              <div className="text-sm text-healthTeal font-semibold mb-2 flex items-center">
                <CalendarDays className="mr-2 h-4 w-4" />
                {event.date}
              </div>
              <h3 className="text-xl font-bold mb-3 text-healthDarkBlue">{event.title}</h3>
              <p className="text-gray-600 mb-4">{event.description}</p>
              <div className="text-sm text-gray-500 mb-4">{event.location}</div>
              <Button disabled className="w-full bg-gray-400 text-white cursor-not-allowed">
                Coming Soon
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
