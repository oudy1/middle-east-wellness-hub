
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturedNewsSection = () => {
  const { t } = useLanguage();
  
  const newsItems = [
    {
      id: 1,
      title: "Middle East Emerges as Global Hub for Digital Health Innovation",
      excerpt: "The UAE's digital health market is projected to reach $2.6bn by 2030, growing at 23.5% annually. Dubai leads the charge with massive AI investments and innovation platforms.",
      date: "July 8, 2025",
      category: "Digital Health",
      image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=400&fit=crop&crop=center",
      featured: true
    },
    {
      id: 2,
      title: "Climate Change Linked to Rising Women's Cancer Rates in MENA",
      excerpt: "New research reveals that rising temperatures in Middle East and North Africa correlate with increased rates of breast, ovarian, uterine and cervical cancers.",
      date: "May 27, 2025",
      category: "Public Health",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Health Canada Introduces New Nutrition Warning Labels",
      excerpt: "Black-and-white labels now alert consumers to foods high in sugar, sodium, and saturated fat, supporting healthier dietary choices across Canadian communities.",
      date: "July 1, 2025",
      category: "Nutrition Policy",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=250&fit=crop"
    }
  ];

  const featuredNews = newsItems.find(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="calligraphy-frame-bg h-full w-full opacity-20"></div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
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
          <Button asChild variant="outline" className="border-healthTeal text-healthTeal hover:bg-healthTeal hover:text-white">
            <a href="https://www.canada.ca/en/health-canada.html" target="_blank" rel="noopener noreferrer">
              View All News & Updates
              <ArrowRight className="ml-2 h-4 w-4" />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNewsSection;
