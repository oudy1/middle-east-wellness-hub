
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { CalendarDays, ArrowRight } from "lucide-react";

const events = [
  {
    title: "Healthcare Symposium",
    date: "June 15, 2025",
    description: "Join leading healthcare professionals to discuss innovations in Middle Eastern healthcare practices.",
    location: "Virtual Event",
    registrationLink: "/register/healthcare-symposium"
  },
  {
    title: "Community Health Workshop",
    date: "July 2, 2025",
    description: "Learn about cultural competency in healthcare delivery for Middle Eastern communities.",
    location: "Toronto, Canada",
    registrationLink: "/register/community-health-workshop"
  },
  {
    title: "Research Presentation Day",
    date: "August 10, 2025",
    description: "Showcase of ongoing research projects focused on healthcare challenges in the Middle East.",
    location: "Ottawa Convention Center",
    registrationLink: "/register/research-day"
  }
];

const UpcomingEventsSection = () => {
  return (
    <section className="py-16 bg-healthLightGray relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="calligraphy-frame-bg h-full w-full opacity-30"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between mb-10">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue flex items-center">
              <CalendarDays className="mr-3 text-healthTeal h-8 w-8" />
              Upcoming Events
            </h2>
            <p className="text-gray-600 mt-2">Join us at our upcoming events and be part of our community</p>
          </div>
          <Button className="mt-4 md:mt-0 bg-healthTeal hover:bg-teal-600">
            View All Events <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event, index) => (
            <Card key={index} className="overflow-hidden border-none shadow-lg bg-white hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="text-sm text-healthTeal font-semibold mb-2 flex items-center">
                  <CalendarDays className="mr-2 h-4 w-4" />
                  {event.date}
                </div>
                <h3 className="text-xl font-bold mb-3 text-healthDarkBlue">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.description}</p>
                <div className="text-sm text-gray-500 mb-4">{event.location}</div>
                <Button asChild variant="outline" className="w-full border-healthTeal text-healthTeal hover:bg-healthTeal hover:text-white">
                  <a href={event.registrationLink}>Register Now</a>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UpcomingEventsSection;
