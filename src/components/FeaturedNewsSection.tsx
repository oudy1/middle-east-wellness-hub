
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const FeaturedNewsSection = () => {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar' || language === 'ku' || language === 'fa';

  const newsItems = [
    {
      id: 1,
      title: "Middle East Emerges as Global Hub for Digital Health Innovation",
      excerpt: "The UAE's digital health market is projected to reach $2.6bn by 2030, growing at 23.5% annually. Dubai leads the charge with massive AI investments and innovation platforms.",
      date: "July 8, 2025",
      category: "Digital Health",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=400&fit=crop&crop=center",
      url: "https://gulfbusiness.com/middle-east-the-emerging-global-hub-for-digital-health-innovation/",
      featured: true
    },
    {
      id: 2,
      title: "Climate Change Linked to Rising Women's Cancer Rates in MENA",
      excerpt: "New research reveals that rising temperatures in Middle East and North Africa correlate with increased rates of breast, ovarian, uterine and cervical cancers.",
      date: "May 27, 2025",
      category: "Public Health",
      image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=250&fit=crop",
      url: "https://www.frontiersin.org/news/2025/05/27/global-warming-could-be-driving-womens-cancer-risk-frontiers-public-health"
    },
    {
      id: 3,
      title: "Health Canada Introduces New Nutrition Warning Labels",
      excerpt: "Black-and-white labels now alert consumers to foods high in sugar, sodium, and saturated fat, supporting healthier dietary choices across Canadian communities.",
      date: "July 1, 2025",
      category: "Nutrition Policy",
      image: "https://images.unsplash.com/photo-1505576399279-565b52d4ac71?w=400&h=250&fit=crop",
      url: "https://www.cbc.ca/news/canada/nova-scotia/health-canada-front-of-package-nutrition-warning-labels-1.7563212"
    }
  ];

  const featuredNews = newsItems.find(item => item.featured);
  const regularNews = newsItems.filter(item => !item.featured);

  return (
    <section className="py-16 bg-white relative overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="calligraphy-frame-bg h-full w-full opacity-20"></div>
      </div>
      
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 relative z-10" dir={isRTL ? 'rtl' : 'ltr'}>
        <div className="text-center mb-12">
          <h2 className={`text-3xl md:text-4xl font-bold text-foreground flex items-center justify-center mb-4 ${isRTL ? 'font-cairo' : ''}`}>
            <Newspaper className={`${isRTL ? 'ml-3' : 'mr-3'} text-healthTeal h-8 w-8`} />
            {t("news.title")}
          </h2>
          <p className={`text-muted-foreground max-w-2xl mx-auto ${isRTL ? 'font-cairo' : ''}`}>
            {t("news.subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {featuredNews && (
            <div className="lg:col-span-2">
              <Card className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 h-full cursor-pointer">
                <a href={featuredNews.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="relative">
                    <img 
                      src={featuredNews.image} 
                      alt={featuredNews.title}
                      className="w-full h-64 object-cover"
                      loading="lazy"
                    />
                    <div className={`absolute top-4 ${isRTL ? 'right-4' : 'left-4'}`}>
                      <span className="bg-healthTeal text-white px-3 py-1 rounded-full text-sm font-medium">
                        {t("news.featured")}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-6">
                    <div className={`flex items-center text-sm text-muted-foreground mb-3`}>
                      <Calendar className={`${isRTL ? 'ml-2' : 'mr-2'} h-4 w-4`} />
                      {featuredNews.date}
                      <span className="mx-2">•</span>
                      <span className="text-healthTeal font-medium">{featuredNews.category}</span>
                    </div>
                    <h3 className="text-2xl font-bold mb-3 text-foreground">{featuredNews.title}</h3>
                    <p className="text-muted-foreground mb-4 leading-relaxed">{featuredNews.excerpt}</p>
                    <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white">
                      {t("news.readFullStory")}
                      <ArrowRight className={`${isRTL ? 'mr-2 rotate-180' : 'ml-2'} h-4 w-4`} />
                    </Button>
                  </CardContent>
                </a>
              </Card>
            </div>
          )}

          <div className="space-y-6">
            {regularNews.map((item) => (
              <Card key={item.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="block">
                  <div className="flex">
                    <img 
                      src={item.image} 
                      alt={item.title}
                      className="w-24 h-24 object-cover flex-shrink-0"
                      loading="lazy"
                    />
                    <CardContent className="p-4 flex-1">
                      <div className={`flex items-center text-xs text-muted-foreground mb-2`}>
                        <Calendar className={`${isRTL ? 'ml-1' : 'mr-1'} h-3 w-3`} />
                        {item.date}
                      </div>
                      <h4 className="font-bold text-foreground mb-2 text-sm leading-tight">{item.title}</h4>
                      <p className="text-muted-foreground text-xs leading-relaxed line-clamp-2">{item.excerpt}</p>
                    </CardContent>
                  </div>
                </a>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="border-healthTeal text-healthTeal hover:bg-healthTeal hover:text-white">
            <a href="https://www.canada.ca/en/health-canada.html" target="_blank" rel="noopener noreferrer">
              {t("news.viewAll")}
              <ArrowRight className={`${isRTL ? 'mr-2 rotate-180' : 'ml-2'} h-4 w-4`} />
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedNewsSection;
