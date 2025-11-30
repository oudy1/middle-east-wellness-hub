import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getCitiesWithCounts } from "@/lib/physicianData";

const FamilyPhysicianCities = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const isRTL = language === 'ar';
  
  const citiesWithCounts = getCitiesWithCounts();

  // Group cities alphabetically
  const groupedCities = citiesWithCounts.reduce((acc, { city, count }) => {
    const firstLetter = city[0].toUpperCase();
    if (!acc[firstLetter]) {
      acc[firstLetter] = [];
    }
    acc[firstLetter].push({ city, count });
    return acc;
  }, {} as Record<string, { city: string; count: number }[]>);

  const handleCityClick = (city: string) => {
    const citySlug = city.toLowerCase().replace(/\s+/g, '-');
    navigate(`/physicians/family/${citySlug}`);
  };

  const pageTitle = isRTL ? 'المدن - دليل أطباء طب الأسرة | شمس' : 'Cities - Family Physician Directory | SHAMS';
  const pageDescription = isRTL 
    ? 'تصفح أطباء طب الأسرة حسب المدينة في كندا. دليل شامل للأطباء الناطقين بالعربية والإنجليزية.'
    : 'Browse family physicians by city in Canada. Comprehensive directory of Arabic and English speaking physicians.';

  return (
    <div className="flex flex-col min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <SEOHead 
        title={pageTitle}
        description={pageDescription}
        keywords="family physician cities, family medicine directory, healthcare by city, Middle Eastern doctors"
        canonicalUrl="https://www.projectshams.com/physicians/family/cities"
      />
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h1 className="text-4xl font-bold mb-2 text-primary">
              {isRTL ? 'المدن - دليل أطباء طب الأسرة' : 'Cities - Family Physician Directory'}
            </h1>
            <p className="text-muted-foreground">
              {isRTL 
                ? 'تصفح أطباء طب الأسرة حسب المدينة' 
                : 'Browse family physicians by city'}
            </p>
          </div>

          {/* City Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {citiesWithCounts.length}
                </div>
                <div className="text-sm text-muted-foreground">
                  {isRTL ? 'مدن' : 'Cities'}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {citiesWithCounts.reduce((sum, c) => sum + c.count, 0)}
                </div>
                <div className="text-sm text-muted-foreground">
                  {isRTL ? 'أطباء' : 'Physicians'}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {citiesWithCounts[0]?.city || 'N/A'}
                </div>
                <div className="text-sm text-muted-foreground">
                  {isRTL ? 'المدينة الأكثر تمثيلاً' : 'Most represented'}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Alphabetical Index */}
          <div className="space-y-8">
            {Object.keys(groupedCities).sort().map((letter) => (
              <div key={letter}>
                <h2 className={`text-2xl font-bold mb-4 text-primary ${isRTL ? 'text-right' : 'text-left'}`}>
                  {letter}
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {groupedCities[letter].map(({ city, count }) => (
                    <Card 
                      key={city}
                      className="hover:shadow-lg transition-shadow cursor-pointer"
                      onClick={() => handleCityClick(city)}
                    >
                      <CardContent className="p-4">
                        <div className={`flex items-center justify-between ${isRTL ? 'flex-row-reverse' : ''}`}>
                          <div className={`flex items-center gap-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            <MapPin className="h-5 w-5 text-primary" />
                            <div>
                              <h3 className={`font-semibold text-lg ${isRTL ? 'text-right' : 'text-left'}`}>
                                {city}
                              </h3>
                              <p className={`text-sm text-muted-foreground ${isRTL ? 'text-right' : 'text-left'}`}>
                                {isRTL 
                                  ? `${count} ${count === 1 ? 'طبيب' : 'أطباء'}`
                                  : `${count} ${count === 1 ? 'physician' : 'physicians'}`}
                              </p>
                            </div>
                          </div>
                          <Badge variant="secondary">
                            {count}
                          </Badge>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default FamilyPhysicianCities;
