
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturedNewsSection = () => {
  const { t } = useLanguage();
  
  const newsItems = [
    {
      id: 1,
      title: "SHAMS Community Health Initiative Reaches 5,000 Families",
      excerpt: "Our recent health screening program has successfully provided preventive care services to over 5,000 Middle Eastern families across major metropolitan areas.",
      date: "December 15, 2024",
      category: "Community Impact",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=250&fit=crop",
      featured: true
    },
    {
      id: 2,
      title: "New Mental Health Resources Launch in Arabic and Kurdish",
      excerpt: "Expanding accessibility with culturally sensitive mental health materials now available in multiple languages for our community members.",
      date: "December 10, 2024",
      category: "Resources",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Partnership with Regional Medical Centers Announced",
      excerpt: "SHAMS announces strategic partnerships with 12 medical centers to improve healthcare access for Middle Eastern communities.",
      date: "December 5, 2024",
      category: "Partnerships",
      image: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=400&h=250&fit=crop"
    }
  ];

  const featuredNews = newsItems.find(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="calligraphy-frame-bg h-full w-full opacity-20"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-healthDarkBlue flex items-center justify-center mb-4">
            <Newspaper className="mr-3 text-healthTeal h-8 w-8" />
            Featured Health News
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Stay updated with our latest community achievements, health initiatives, and impact stories from Middle Eastern communities.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Featured News - Large Card */}
          {featuredNews && (
            <div className="lg:col-span-2">
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full">
                <div className="relative">
                  <img 
                    src={featuredNews.image} 
                    alt={featuredNews.title}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="bg-healthTeal text-white px-3 py-1 rounded-full text-sm font-medium">
                      Featured
                    </span>
                  </div>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center text-sm text-gray-500 mb-3">
                    <Calendar className="mr-2 h-4 w-4" />
                    {featuredNews.date}
                    <span className="mx-2">•</span>
                    <span className="text-healthTeal font-medium">{featuredNews.category}</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-3 text-healthDarkBlue">{featuredNews.title}</h3>
                  <p className="text-gray-600 mb-4 leading-relaxed">{featuredNews.excerpt}</p>
                  <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white">
                    Read Full Story
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Regular News - Smaller Cards */}
          <div className="space-y-6">
            {regularNews.map((item) => (
              <Card key={item.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300">
                <div className="flex">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-24 h-24 object-cover flex-shrink-0"
                  />
                  <CardContent className="p-4 flex-1">
                    <div className="flex items-center text-xs text-gray-500 mb-2">
                      <Calendar className="mr-1 h-3 w-3" />
                      {item.date}
                    </div>
                    <h4 className="font-bold text-healthDarkBlue mb-2 text-sm leading-tight">{item.title}</h4>
                    <p className="text-gray-600 text-xs leading-relaxed line-clamp-2">{item.excerpt}</p>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button variant="outline" className="border-healthTeal text-healthTeal hover:bg-healthTeal hover:text-white">
            View All News & Updates
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNewsSection;
