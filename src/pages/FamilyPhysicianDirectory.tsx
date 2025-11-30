import { useState, useEffect, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { SEOHead } from "@/components/SEOHead";
import { PhysicianDetailDrawer } from "@/components/PhysicianDetailDrawer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  MapPin, 
  Phone, 
  Mail, 
  Search, 
  X,
  Building2,
  Globe,
  ExternalLink
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { 
  getFamilyPhysicians, 
  getCitiesWithCounts, 
  getPhysiciansByCity,
  Physician 
} from "@/lib/physicianData";

const ITEMS_PER_PAGE = 20;

const FamilyPhysicianDirectory = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const { citySlug } = useParams<{ citySlug?: string }>();
  const isRTL = language === 'ar';

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedPhysician, setSelectedPhysician] = useState<Physician | null>(null);
  const [currentPage, setCurrentPage] = useState(1);

  const allPhysicians = getFamilyPhysicians();
  const citiesWithCounts = getCitiesWithCounts();
  
  // Extract unique languages
  const allLanguages = useMemo(() => {
    const langs = new Set<string>();
    allPhysicians.forEach(p => p.languages.forEach(l => langs.add(l)));
    return Array.from(langs).sort();
  }, [allPhysicians]);

  // Handle city slug from URL
  useEffect(() => {
    if (citySlug) {
      const decodedCity = decodeURIComponent(citySlug);
      const cityExists = citiesWithCounts.find(c => 
        c.city.toLowerCase().replace(/\s+/g, '-') === citySlug
      );
      if (cityExists && !selectedCities.includes(cityExists.city)) {
        setSelectedCities([cityExists.city]);
      }
    }
  }, [citySlug, citiesWithCounts]);

  // Filter physicians
  const filteredPhysicians = useMemo(() => {
    let filtered = allPhysicians;

    // City filter
    if (selectedCities.length > 0) {
      filtered = filtered.filter(p => selectedCities.includes(p.city));
    }

    // Language filter
    if (selectedLanguages.length > 0) {
      filtered = filtered.filter(p => 
        p.languages.some(lang => selectedLanguages.includes(lang))
      );
    }

    // Search filter
    if (searchTerm.trim()) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(p =>
        `${p.firstName} ${p.lastName}`.toLowerCase().includes(term) ||
        p.clinicName.toLowerCase().includes(term) ||
        p.languages.some(l => l.toLowerCase().includes(term)) ||
        p.city.toLowerCase().includes(term)
      );
    }

    return filtered;
  }, [allPhysicians, selectedCities, selectedLanguages, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredPhysicians.length / ITEMS_PER_PAGE);
  const paginatedPhysicians = filteredPhysicians.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

  const handleCityClick = (city: string) => {
    const citySlug = city.toLowerCase().replace(/\s+/g, '-');
    navigate(`/physicians/family/${citySlug}`);
    setSelectedCities([city]);
    setCurrentPage(1);
  };

  const handleCityFilterToggle = (city: string) => {
    setSelectedCities(prev => 
      prev.includes(city) ? prev.filter(c => c !== city) : [...prev, city]
    );
    setCurrentPage(1);
  };

  const handleLanguageToggle = (language: string) => {
    setSelectedLanguages(prev =>
      prev.includes(language) ? prev.filter(l => l !== language) : [...prev, language]
    );
    setCurrentPage(1);
  };

  const clearAllFilters = () => {
    setSelectedCities([]);
    setSelectedLanguages([]);
    setSearchTerm("");
    setCurrentPage(1);
    navigate('/physicians/family');
  };

  const hasActiveFilters = selectedCities.length > 0 || selectedLanguages.length > 0 || searchTerm.trim();

  // SEO
  const cityName = citySlug ? decodeURIComponent(citySlug).replace(/-/g, ' ') : '';
  const pageTitle = cityName 
    ? (isRTL ? `أطباء طب الأسرة في ${cityName} | شمس` : `Family Physicians in ${cityName} | SHAMS`)
    : (isRTL ? 'دليل أطباء طب الأسرة | شمس' : 'Family Physician Directory | SHAMS');
  const pageDescription = isRTL
    ? `اعثر على أطباء طب الأسرة المتخصصين في ${cityName || 'كندا'}. ابحث حسب المدينة واللغة والعيادة.`
    : `Find family physicians in ${cityName || 'Canada'}. Search by city, language, and clinic.`;

  return (
    <div className="flex flex-col min-h-screen bg-background" dir={isRTL ? "rtl" : "ltr"}>
      <SEOHead 
        title={pageTitle}
        description={pageDescription}
        keywords="family physician, family medicine, CCFP, healthcare, Middle Eastern, Arabic speaking doctors"
        canonicalUrl={`https://www.projectshams.com/physicians/family${citySlug ? `/${citySlug}` : ''}`}
      />
      <Header />
      
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          {/* Header */}
          <div className={`mb-8 ${isRTL ? 'text-right' : 'text-left'}`}>
            <h1 className="text-4xl font-bold mb-2 text-primary">
              {isRTL ? 'دليل أطباء طب الأسرة' : 'Family Physician Directory'}
            </h1>
            <p className="text-muted-foreground">
              {isRTL 
                ? 'ابحث عن أطباء طب الأسرة حسب المدينة واللغة'
                : 'Find family physicians by city and language'}
            </p>
          </div>

          {/* City Browser Chips */}
          {!citySlug && (
            <div className="mb-8 bg-card p-6 rounded-lg shadow-sm">
              <h2 className={`text-xl font-semibold mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL ? 'تصفح حسب المدينة' : 'Browse by City'}
              </h2>
              <div className="flex flex-wrap gap-3">
                {citiesWithCounts.map(({ city, count }) => (
                  <Button
                    key={city}
                    variant="outline"
                    className="h-auto py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors"
                    onClick={() => handleCityClick(city)}
                  >
                    <span className="font-medium">{city}</span>
                    <Badge variant="secondary" className={isRTL ? 'mr-2' : 'ml-2'}>
                      {count}
                    </Badge>
                  </Button>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col lg:flex-row gap-6">
            {/* Filters Sidebar */}
            <aside className="lg:w-64 space-y-4">
              <Card>
                <CardContent className="p-4">
                  <h3 className={`font-semibold mb-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    {isRTL ? 'الفلاتر' : 'Filters'}
                  </h3>

                  {/* Search */}
                  <div className="mb-4">
                    <Label className={isRTL ? 'text-right block' : ''}>
                      {isRTL ? 'بحث' : 'Search'}
                    </Label>
                    <div className="relative mt-1">
                      <Search className={`absolute top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground ${isRTL ? 'right-3' : 'left-3'}`} />
                      <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder={isRTL ? 'ابحث...' : 'Search...'}
                        className={isRTL ? 'pr-10' : 'pl-10'}
                      />
                    </div>
                  </div>

                  {/* City Filter */}
                  <div className="mb-4">
                    <Label className={`mb-2 block ${isRTL ? 'text-right' : ''}`}>
                      {isRTL ? 'المدينة' : 'City'}
                    </Label>
                    <ScrollArea className="h-40">
                      <div className="space-y-2">
                        {citiesWithCounts.map(({ city, count }) => (
                          <div key={city} className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <Checkbox
                              id={`city-${city}`}
                              checked={selectedCities.includes(city)}
                              onCheckedChange={() => handleCityFilterToggle(city)}
                            />
                            <Label 
                              htmlFor={`city-${city}`} 
                              className="text-sm cursor-pointer flex-1"
                            >
                              {city} ({count})
                            </Label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Language Filter */}
                  <div className="mb-4">
                    <Label className={`mb-2 block ${isRTL ? 'text-right' : ''}`}>
                      {isRTL ? 'اللغات' : 'Languages'}
                    </Label>
                    <ScrollArea className="h-32">
                      <div className="space-y-2">
                        {allLanguages.map((lang) => (
                          <div key={lang} className={`flex items-center space-x-2 ${isRTL ? 'flex-row-reverse space-x-reverse' : ''}`}>
                            <Checkbox
                              id={`lang-${lang}`}
                              checked={selectedLanguages.includes(lang)}
                              onCheckedChange={() => handleLanguageToggle(lang)}
                            />
                            <Label 
                              htmlFor={`lang-${lang}`} 
                              className="text-sm cursor-pointer"
                            >
                              {isRTL && lang === 'Arabic' ? 'العربية' : 
                               isRTL && lang === 'English' ? 'الإنجليزية' : lang}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  {/* Clear Filters */}
                  {hasActiveFilters && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={clearAllFilters}
                      className="w-full"
                    >
                      <X className={`h-4 w-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                      {isRTL ? 'مسح الكل' : 'Clear All'}
                    </Button>
                  )}
                </CardContent>
              </Card>
            </aside>

            {/* Results */}
            <div className="flex-1">
              {/* Active Filters */}
              {hasActiveFilters && (
                <div className={`mb-4 flex flex-wrap gap-2 items-center ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <span className="text-sm text-muted-foreground">
                    {isRTL ? 'الفلاتر النشطة:' : 'Active filters:'}
                  </span>
                  {selectedCities.map(city => (
                    <Badge key={city} variant="secondary" className="gap-1">
                      {city}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => handleCityFilterToggle(city)}
                      />
                    </Badge>
                  ))}
                  {selectedLanguages.map(lang => (
                    <Badge key={lang} variant="secondary" className="gap-1">
                      {lang}
                      <X 
                        className="h-3 w-3 cursor-pointer" 
                        onClick={() => handleLanguageToggle(lang)}
                      />
                    </Badge>
                  ))}
                </div>
              )}

              {/* Results Count */}
              <p className={`text-sm text-muted-foreground mb-4 ${isRTL ? 'text-right' : 'text-left'}`}>
                {isRTL 
                  ? `${filteredPhysicians.length} نتيجة`
                  : `${filteredPhysicians.length} results`}
              </p>

              {/* Physician Cards */}
              {paginatedPhysicians.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                  {paginatedPhysicians.map((physician) => {
                    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(physician.address)}`;
                    
                    return (
                      <Card 
                        key={physician.id} 
                        className="hover:shadow-lg transition-shadow cursor-pointer"
                        onClick={() => setSelectedPhysician(physician)}
                      >
                        <CardContent className="p-4">
                          <h3 className={`font-bold text-lg mb-1 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {physician.title} {physician.firstName} {physician.lastName}
                          </h3>
                          <p className={`text-sm text-muted-foreground mb-2 ${isRTL ? 'text-right' : 'text-left'}`}>
                            {isRTL && physician.specialty.includes('Family Medicine') 
                              ? 'طب الأسرة' 
                              : physician.specialty}
                            {physician.subspecialty && ` • ${physician.subspecialty}`}
                          </p>

                          <div className="space-y-2 text-sm mb-3">
                            <div className={`flex items-center gap-2 text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <Building2 className="h-4 w-4 flex-shrink-0" />
                              <span className="truncate">{physician.clinicName}</span>
                            </div>
                            <div className={`flex items-center gap-2 text-muted-foreground ${isRTL ? 'flex-row-reverse' : ''}`}>
                              <MapPin className="h-4 w-4 flex-shrink-0" />
                              <span>{physician.city}</span>
                            </div>
                            {physician.phone && (
                              <a 
                                href={`tel:${physician.phone}`}
                                className={`flex items-center gap-2 text-primary hover:underline ${isRTL ? 'flex-row-reverse' : ''}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Phone className="h-4 w-4 flex-shrink-0" />
                                <span>{physician.phone}</span>
                              </a>
                            )}
                            {physician.email && (
                              <a 
                                href={`mailto:${physician.email}`}
                                className={`flex items-center gap-2 text-primary hover:underline ${isRTL ? 'flex-row-reverse' : ''}`}
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Mail className="h-4 w-4 flex-shrink-0" />
                                <span className="truncate">{physician.email}</span>
                              </a>
                            )}
                          </div>

                          <div className={`flex flex-wrap gap-1 mb-3 ${isRTL ? 'flex-row-reverse' : ''}`}>
                            {physician.languages.map((lang, idx) => (
                              <Badge key={idx} variant="outline" className="text-xs">
                                <Globe className={`h-3 w-3 ${isRTL ? 'ml-1' : 'mr-1'}`} />
                                {isRTL && lang === 'Arabic' ? 'العربية' : 
                                 isRTL && lang === 'English' ? 'الإنجليزية' : lang}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex gap-2">
                            <Button 
                              variant="outline" 
                              size="sm" 
                              className="flex-1"
                              onClick={(e) => {
                                e.stopPropagation();
                                setSelectedPhysician(physician);
                              }}
                            >
                              {isRTL ? 'عرض التفاصيل' : 'View Details'}
                            </Button>
                            {physician.address && (
                              <Button
                                variant="ghost"
                                size="sm"
                                asChild
                                onClick={(e) => e.stopPropagation()}
                              >
                                <a href={googleMapsUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-4 w-4" />
                                </a>
                              </Button>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <Card className="p-12">
                  <div className="text-center">
                    <p className="text-muted-foreground">
                      {isRTL 
                        ? 'لا توجد نتائج مطابقة لخياراتك.' 
                        : 'No family physicians match your filters.'}
                    </p>
                    {hasActiveFilters && (
                      <Button 
                        variant="link" 
                        onClick={clearAllFilters}
                        className="mt-2"
                      >
                        {isRTL ? 'مسح الفلاتر' : 'Clear filters'}
                      </Button>
                    )}
                  </div>
                </Card>
              )}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className={`flex justify-center gap-2 mt-6 ${isRTL ? 'flex-row-reverse' : ''}`}>
                  <Button
                    variant="outline"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(p => p - 1)}
                  >
                    {isRTL ? 'التالي' : 'Previous'}
                  </Button>
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">
                      {isRTL ? `صفحة ${currentPage} من ${totalPages}` : `Page ${currentPage} of ${totalPages}`}
                    </span>
                  </div>
                  <Button
                    variant="outline"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(p => p + 1)}
                  >
                    {isRTL ? 'السابق' : 'Next'}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />

      {/* Detail Drawer */}
      <PhysicianDetailDrawer
        physician={selectedPhysician}
        open={!!selectedPhysician}
        onClose={() => setSelectedPhysician(null)}
      />
    </div>
  );
};

export default FamilyPhysicianDirectory;
