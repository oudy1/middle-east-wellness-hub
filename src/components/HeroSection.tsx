
import { Button } from "@/components/ui/button";

const HeroSection = () => {
  return (
    <section className="relative bg-healthDarkBlue py-16 md:py-24">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-healthDarkBlue via-healthDarkBlue/90 to-healthDarkBlue/70"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in">
            Advancing Middle Eastern Healthcare
          </h1>
          <p className="text-xl text-gray-200 mb-8 animate-fade-in">
            Our mission is to improve healthcare access, research, and outcomes for communities across the Middle East through innovative solutions and education.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 animate-fade-in">
            <Button className="bg-healthTeal hover:bg-teal-600 text-white px-8 py-6 text-lg">
              Learn About Our Mission
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-healthDarkBlue px-8 py-6 text-lg">
              Support Our Work
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
