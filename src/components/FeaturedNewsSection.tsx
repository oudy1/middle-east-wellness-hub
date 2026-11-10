
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Newspaper, ArrowRight, Calendar } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Link } from "react-router-dom";
import kyrEn from "@/assets/know-your-rights-en.png.asset.json";
import kyrAr from "@/assets/know-your-rights-ar.png.asset.json";
import mhcPoster from "@/assets/mhc-poster.png.asset.json";
import mhcPanelists from "@/assets/mhc-panelists.png.asset.json";

const FeaturedNewsSection = () => {
  const { language, t } = useLanguage();
  const isRTL = language === 'ar' || language === 'ku' || language === 'fa';

  const isAr = language === 'ar';

  // SHAMS updates (newest first). Internal links start with "/".
  const newsItems = [
    {
      id: 1,
      title: "Know Your Rights Webinar Recording Now Available",
      titleAr: "تسجيل ندوة اعرف حقوقك متاح الآن",
      excerpt: "Missed our October webinar on speaking up in healthcare? Watch the full recording with Dr. Ritika Goel, Dr. Tarek Abdelhalim and Haifa Staiti on patient rights, referrals and second opinions.",
      excerptAr: "فاتتك ندوتنا في أكتوبر حول التعبير عن احتياجاتك في الرعاية الصحية؟ شاهد التسجيل الكامل مع د. ريتيكا غويل ود. طارق عبد الحليم وهيفاء ستيتي حول حقوق المرضى والإحالات والرأي الطبي الثاني.",
      date: "October 21, 2026",
      dateAr: "21 أكتوبر 2026",
      category: "Webinar",
      categoryAr: "ندوة",
      image: kyrEn.url,
      imageAr: kyrAr.url,
      url: "/recordings#webinar-know-your-rights",
      featured: true
    },
    {
      id: 2,
      title: "Mental Health Convention: Uncovering Stigma",
      titleAr: "مؤتمر الصحة النفسية: كشف الوصمة",
      excerpt: "Families, students and healthcare professionals joined SHAMS at the University of Toronto Mississauga to talk openly about mental health stigma. Watch the recap.",
      excerptAr: "انضمت العائلات والطلاب والعاملون في الرعاية الصحية إلى شمس في جامعة تورنتو ميسيساغا للحديث بصراحة عن وصمة الصحة النفسية. شاهد الملخص.",
      date: "July 18, 2026",
      dateAr: "18 يوليو 2026",
      category: "Event Recap",
      categoryAr: "ملخص فعالية",
      image: mhcPoster.url,
      imageAr: mhcPoster.url,
      url: "https://www.instagram.com/reel/DbCMtfkuVQK/"
    },
    {
      id: 3,
      title: "New: Healthcare Directory with Map",
      titleAr: "جديد: دليل مقدمي الرعاية الصحية مع الخريطة",
      excerpt: "Find doctors and healthcare workers serving Middle Eastern societies across Canada, filter by city, province and provider type, and see them on a map.",
      excerptAr: "اعثر على أطباء وعاملين في الرعاية الصحية يخدمون المجتمعات الشرق أوسطية في كندا، وابحث حسب المدينة والمقاطعة ونوع مقدم الرعاية، وشاهدهم على الخريطة.",
      date: "November 2026",
      dateAr: "نوفمبر 2026",
      category: "SHAMS Update",
      categoryAr: "تحديث من شمس",
      image: mhcPanelists.url,
      imageAr: mhcPanelists.url,
      url: "/directory"
    }
  ];

  const NewsLink = ({ url, className, children }: { url: string; className?: string; children: React.ReactNode }) =>
    url.startsWith("/") ? (
      <Link to={url} className={className}>{children}</Link>
    ) : (
      <a href={url} target="_blank" rel="noopener noreferrer" className={className}>{children}</a>
    );

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
                <NewsLink url={featuredNews.url} className="block">
                  <div className="relative">
                    <img 
                      src={isAr ? featuredNews.imageAr : featuredNews.image} 
                      alt={isAr ? featuredNews.titleAr : featuredNews.title}
                      className="w-full h-64 object-contain bg-muted"
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
                      {isAr ? featuredNews.dateAr : featuredNews.date}
                      <span className="mx-2">•</span>
                      <span className="text-healthTeal font-medium">{isAr ? featuredNews.categoryAr : featuredNews.category}</span>
                    </div>
                    <h3 className={`text-2xl font-bold mb-3 text-foreground ${isAr ? 'font-cairo' : ''}`}>{isAr ? featuredNews.titleAr : featuredNews.title}</h3>
                    <p className={`text-muted-foreground mb-4 leading-relaxed ${isAr ? 'font-cairo' : ''}`}>{isAr ? featuredNews.excerptAr : featuredNews.excerpt}</p>
                    <Button className="bg-healthTeal hover:bg-healthTeal/90 text-white">
                      {t("news.readFullStory")}
                      <ArrowRight className={`${isRTL ? 'mr-2 rotate-180' : 'ml-2'} h-4 w-4`} />
                    </Button>
                  </CardContent>
                </NewsLink>
              </Card>
            </div>
          )}

          <div className="space-y-6">
            {regularNews.map((item) => (
              <Card key={item.id} className="overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer">
                <NewsLink url={item.url} className="block">
                  <div className="flex">
                    <img 
                      src={isAr ? item.imageAr : item.image} 
                      alt={isAr ? item.titleAr : item.title}
                      className="w-24 h-24 object-cover flex-shrink-0"
                      loading="lazy"
                    />
                    <CardContent className="p-4 flex-1">
                      <div className={`flex items-center text-xs text-muted-foreground mb-2`}>
                        <Calendar className={`${isRTL ? 'ml-1' : 'mr-1'} h-3 w-3`} />
                        {isAr ? item.dateAr : item.date}
                      </div>
                      <h4 className={`font-bold text-foreground mb-2 text-sm leading-tight ${isAr ? 'font-cairo' : ''}`}>{isAr ? item.titleAr : item.title}</h4>
                      <p className={`text-muted-foreground text-xs leading-relaxed line-clamp-2 ${isAr ? 'font-cairo' : ''}`}>{isAr ? item.excerptAr : item.excerpt}</p>
                    </CardContent>
                  </div>
                </NewsLink>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center">
          <Button asChild variant="outline" className="border-healthTeal text-healthTeal hover:bg-healthTeal hover:text-white">
            <a href="https://www.instagram.com/projectshams/" target="_blank" rel="noopener noreferrer">
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
