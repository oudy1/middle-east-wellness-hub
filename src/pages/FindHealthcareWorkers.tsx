import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { 
  Search, 
  Phone, 
  Mail, 
  Globe, 
  MapPin, 
  UserCheck, 
  Video,
  MessageCircle,
  UserPlus
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SEOHead } from "@/components/SEOHead";

const PROVINCES = [
  { value: "ON", label_en: "Ontario", label_ar: "أونتاريو" },
  { value: "BC", label_en: "British Columbia", label_ar: "بريتيش كولومبيا" },
  { value: "AB", label_en: "Alberta", label_ar: "ألبرتا" },
  { value: "QC", label_en: "Quebec", label_ar: "كيبيك" },
  { value: "MB", label_en: "Manitoba", label_ar: "مانيتوبا" },
  { value: "SK", label_en: "Saskatchewan", label_ar: "ساسكاتشوان" },
  { value: "NS", label_en: "Nova Scotia", label_ar: "نوفا سكوشيا" },
  { value: "NB", label_en: "New Brunswick", label_ar: "نيو برونزويك" },
  { value: "NL", label_en: "Newfoundland and Labrador", label_ar: "نيوفاوندلاند ولابرادور" },
  { value: "PE", label_en: "Prince Edward Island", label_ar: "جزيرة الأمير إدوارد" },
  { value: "NT", label_en: "Northwest Territories", label_ar: "الأقاليم الشمالية الغربية" },
  { value: "YT", label_en: "Yukon", label_ar: "يوكون" },
  { value: "NU", label_en: "Nunavut", label_ar: "نونافوت" },
];

const LANGUAGES_OPTIONS = [
  { value: "Arabic", label_en: "Arabic", label_ar: "العربية" },
  { value: "English", label_en: "English", label_ar: "الإنجليزية" },
  { value: "French", label_en: "French", label_ar: "الفرنسية" },
  { value: "Farsi", label_en: "Farsi/Persian", label_ar: "الفارسية" },
  { value: "Turkish", label_en: "Turkish", label_ar: "التركية" },
  { value: "Urdu", label_en: "Urdu", label_ar: "الأردية" },
  { value: "Kurdish", label_en: "Kurdish", label_ar: "الكردية" },
  { value: "Pashto", label_en: "Pashto", label_ar: "البشتو" },
  { value: "Dari", label_en: "Dari", label_ar: "الدرية" },
];

const PROVIDER_TYPES = [
  { value: "Family Physician", label_en: "Family Physician", label_ar: "طبيب عائلة" },
  { value: "Psychologist", label_en: "Psychologist", label_ar: "أخصائي نفسي" },
  { value: "Psychiatrist", label_en: "Psychiatrist", label_ar: "طبيب نفسي" },
  { value: "Therapist", label_en: "Therapist/Counselor", label_ar: "معالج/مستشار" },
  { value: "Dentist", label_en: "Dentist", label_ar: "طبيب أسنان" },
  { value: "Pharmacist", label_en: "Pharmacist", label_ar: "صيدلي" },
  { value: "Nurse Practitioner", label_en: "Nurse Practitioner", label_ar: "ممرض ممارس" },
  { value: "Dietitian", label_en: "Dietitian", label_ar: "أخصائي تغذية" },
  { value: "Social Worker", label_en: "Social Worker", label_ar: "أخصائي اجتماعي" },
];

interface HealthcareWorker {
  id: string;
  full_name: string;
  provider_type: string;
  specialty: string | null;
  languages: string[] | null;
  city: string;
  province: string;
  clinic_name: string | null;
  phone: string | null;
  email: string | null;
  website: string | null;
  address: string | null;
  accepting_new_patients: boolean | null;
  virtual_available: boolean | null;
  notes: string | null;
}

const FindHealthcareWorkers = () => {
  const { language } = useLanguage();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  
  // Search form state
  const [city, setCity] = useState(searchParams.get("city") || "");
  const [province, setProvince] = useState(searchParams.get("province") || "");
  const [providerType, setProviderType] = useState(searchParams.get("specialty") || "");
  const [languageFilter, setLanguageFilter] = useState(searchParams.get("language") || "");
  const [acceptingOnly, setAcceptingOnly] = useState(searchParams.get("accepting") === "true");
  
  // Results state
  const [workers, setWorkers] = useState<HealthcareWorker[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  
  // Suggestion form state
  const [suggestionOpen, setSuggestionOpen] = useState(false);
  const [suggestionData, setSuggestionData] = useState({
    provider_name: "",
    provider_type: "",
    city: "",
    province: "",
    contact_info: "",
    notes: "",
    submitted_by_email: "",
    submitted_by_name: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isAr = language === "ar";

  // Auto-search if params are provided
  useEffect(() => {
    const cityParam = searchParams.get("city");
    const provinceParam = searchParams.get("province");
    if (cityParam && provinceParam) {
      handleSearchWithParams(cityParam, provinceParam);
    }
  }, [searchParams]);

  const handleSearchWithParams = async (cityParam: string, provinceParam: string) => {
    setCity(cityParam);
    setProvince(provinceParam);
    setIsLoading(true);
    setHasSearched(true);
    setSearchError(null);

    try {
      let query = supabase
        .from("healthcare_workers")
        .select("*")
        .ilike("city", `%${cityParam.trim()}%`)
        .eq("province", provinceParam);

      const langParam = searchParams.get("language");
      if (langParam) {
        setLanguageFilter(langParam);
        query = query.contains("languages", [langParam]);
      }

      const specialtyParam = searchParams.get("specialty");
      if (specialtyParam) {
        setProviderType(specialtyParam);
        query = query.eq("provider_type", specialtyParam);
      }

      const { data, error } = await query.order("full_name");

      if (error) throw error;

      setWorkers(data || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchError(isAr ? "حدث خطأ في البحث" : "An error occurred while searching");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    if (!city.trim() || !province) {
      toast({
        title: isAr ? "مطلوب" : "Required",
        description: isAr 
          ? "يرجى إدخال المدينة والمقاطعة" 
          : "Please enter city and province",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setHasSearched(true);
    setSearchError(null);

    try {
      let query = supabase
        .from("healthcare_workers")
        .select("*")
        .ilike("city", `%${city.trim()}%`)
        .eq("province", province);

      if (providerType) {
        query = query.eq("provider_type", providerType);
      }

      if (languageFilter) {
        query = query.contains("languages", [languageFilter]);
      }

      if (acceptingOnly) {
        query = query.eq("accepting_new_patients", true);
      }

      const { data, error } = await query.order("full_name");

      if (error) throw error;

      setWorkers(data || []);
    } catch (error) {
      console.error("Search error:", error);
      setSearchError(isAr ? "حدث خطأ في البحث" : "An error occurred while searching");
      toast({
        title: isAr ? "خطأ" : "Error",
        description: isAr 
          ? "حدث خطأ في البحث" 
          : "An error occurred while searching",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionSubmit = async () => {
    if (!suggestionData.provider_name || !suggestionData.city || !suggestionData.province) {
      toast({
        title: language === "ar" ? "مطلوب" : "Required",
        description: language === "ar" 
          ? "يرجى ملء الحقول المطلوبة" 
          : "Please fill in required fields",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    try {
      const { error } = await supabase
        .from("provider_suggestions")
        .insert([suggestionData]);

      if (error) throw error;

      toast({
        title: language === "ar" ? "شكراً!" : "Thank you!",
        description: language === "ar" 
          ? "تم إرسال اقتراحك بنجاح" 
          : "Your suggestion has been submitted",
      });
      setSuggestionOpen(false);
      setSuggestionData({
        provider_name: "",
        provider_type: "",
        city: "",
        province: "",
        contact_info: "",
        notes: "",
        submitted_by_email: "",
        submitted_by_name: "",
      });
    } catch (error) {
      console.error("Suggestion error:", error);
      toast({
        title: language === "ar" ? "خطأ" : "Error",
        description: language === "ar" 
          ? "حدث خطأ في الإرسال" 
          : "An error occurred while submitting",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <>
      <SEOHead
        title={isAr ? "ابحث عن مقدمي الرعاية الصحية | SHAMS" : "Find Healthcare Workers | SHAMS"}
        description={isAr 
          ? "ابحث عن أطباء ومقدمي رعاية صحية يتحدثون لغتك في منطقتك"
          : "Find doctors and healthcare providers who speak your language in your area"}
      />
      <div className="flex flex-col min-h-screen bg-background" dir={isAr ? "rtl" : "ltr"}>
        <Header />
        <main className="flex-grow">
          <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
            {/* Header */}
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                {isAr ? "ابحث عن مقدمي الرعاية الصحية" : "Find Healthcare Workers"}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
                {isAr 
                  ? "ابحث عن أطباء ومقدمي رعاية صحية يتحدثون لغتك في منطقتك"
                  : "Find doctors and healthcare providers who speak your language in your area"}
              </p>
            </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* City */}
                <div className="space-y-2">
                  <Label htmlFor="city">{isAr ? "المدينة *" : "City *"}</Label>
                  <Input
                    id="city"
                    placeholder={isAr ? "مثال: ريتشموند هيل" : "e.g., Richmond Hill"}
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                {/* Province */}
                <div className="space-y-2">
                  <Label>{isAr ? "المقاطعة *" : "Province *"}</Label>
                  <Select value={province} onValueChange={setProvince}>
                    <SelectTrigger>
                      <SelectValue placeholder={isAr ? "اختر المقاطعة" : "Select province"} />
                    </SelectTrigger>
                    <SelectContent>
                      {PROVINCES.map((p) => (
                        <SelectItem key={p.value} value={p.value}>
                          {isAr ? p.label_ar : p.label_en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Provider Type */}
                <div className="space-y-2">
                  <Label>{isAr ? "نوع مقدم الخدمة" : "Provider Type"}</Label>
                  <Select value={providerType} onValueChange={setProviderType}>
                    <SelectTrigger>
                      <SelectValue placeholder={isAr ? "الكل" : "All"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">{isAr ? "الكل" : "All"}</SelectItem>
                      {PROVIDER_TYPES.map((pt) => (
                        <SelectItem key={pt.value} value={pt.value}>
                          {isAr ? pt.label_ar : pt.label_en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Language */}
                <div className="space-y-2">
                  <Label>{isAr ? "اللغة المطلوبة" : "Language Needed"}</Label>
                  <Select value={languageFilter} onValueChange={setLanguageFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder={isAr ? "الكل" : "All"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="">{isAr ? "الكل" : "All"}</SelectItem>
                      {LANGUAGES_OPTIONS.map((lang) => (
                        <SelectItem key={lang.value} value={lang.value}>
                          {isAr ? lang.label_ar : lang.label_en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Accepting New Patients */}
                <div className="flex items-center gap-3 pt-6">
                  <Switch
                    id="accepting"
                    checked={acceptingOnly}
                    onCheckedChange={setAcceptingOnly}
                  />
                  <Label htmlFor="accepting" className="cursor-pointer">
                    {isAr ? "يقبل مرضى جدد فقط" : "Accepting new patients only"}
                  </Label>
                </div>

                {/* Search Button */}
                <div className="pt-6">
                  <Button 
                    onClick={handleSearch} 
                    disabled={isLoading}
                    className="w-full bg-healthGold hover:bg-healthGold/90 text-healthDarkBlue"
                  >
                    <Search className="h-4 w-4 me-2" />
                    {isLoading 
                      ? (isAr ? "جاري البحث..." : "Searching...") 
                      : (isAr ? "بحث" : "Search")}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Results */}
          {hasSearched && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <p className="text-muted-foreground">
                  {isAr 
                    ? `تم العثور على ${workers.length} نتيجة` 
                    : `Found ${workers.length} result${workers.length !== 1 ? "s" : ""}`}
                </p>
              </div>

              {workers.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {workers.map((worker) => (
                    <Card key={worker.id} className="hover:shadow-lg transition-shadow">
                      <CardContent className="p-5">
                        <h3 className="font-bold text-lg text-foreground mb-1">
                          {worker.full_name}
                        </h3>
                        <p className="text-sm text-healthGold font-medium mb-2">
                          {worker.provider_type}
                          {worker.specialty && ` - ${worker.specialty}`}
                        </p>
                        
                        {worker.clinic_name && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {worker.clinic_name}
                          </p>
                        )}

                        <div className="space-y-2 text-sm">
                          {worker.languages && worker.languages.length > 0 && (
                            <div className="flex items-start gap-2">
                              <MessageCircle className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                              <span>{worker.languages.join(", ")}</span>
                            </div>
                          )}
                          
                          {worker.address && (
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                              <span>{worker.address}</span>
                            </div>
                          )}

                          {worker.phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
                              <a href={`tel:${worker.phone}`} className="hover:text-healthGold">
                                {worker.phone}
                              </a>
                            </div>
                          )}

                          {worker.email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
                              <a href={`mailto:${worker.email}`} className="hover:text-healthGold truncate">
                                {worker.email}
                              </a>
                            </div>
                          )}

                          {worker.website && (
                            <div className="flex items-center gap-2">
                              <Globe className="h-4 w-4 text-muted-foreground shrink-0" />
                              <a 
                                href={worker.website} 
                                target="_blank" 
                                rel="noopener noreferrer"
                                className="hover:text-healthGold truncate"
                              >
                                {isAr ? "الموقع الإلكتروني" : "Website"}
                              </a>
                            </div>
                          )}
                        </div>

                        <div className="flex flex-wrap gap-2 mt-4">
                          {worker.accepting_new_patients && (
                            <span className="inline-flex items-center gap-1 text-xs bg-green-100 text-green-800 px-2 py-1 rounded-full">
                              <UserCheck className="h-3 w-3" />
                              {isAr ? "يقبل مرضى" : "Accepting patients"}
                            </span>
                          )}
                          {worker.virtual_available && (
                            <span className="inline-flex items-center gap-1 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                              <Video className="h-3 w-3" />
                              {isAr ? "استشارة افتراضية" : "Virtual visits"}
                            </span>
                          )}
                        </div>

                        {worker.notes && (
                          <p className="text-xs text-muted-foreground mt-3 italic">
                            {worker.notes}
                          </p>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="text-center py-12">
                  <CardContent>
                    <p className="text-lg text-muted-foreground mb-4">
                      {isAr 
                        ? "لا يوجد لدينا مقدمو رعاية مسجلون في هذه المدينة حالياً."
                        : "We do not have providers listed for that city yet."}
                    </p>
                    <p className="text-sm text-muted-foreground mb-6">
                      {isAr 
                        ? "يمكنك التواصل معنا أو اقتراح مقدم رعاية تعرفه."
                        : "You can contact us or suggest a provider you know."}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-3 justify-center">
                      <Button 
                        variant="outline" 
                        onClick={() => navigate("/contact")}
                      >
                        {isAr ? "تواصل معنا" : "Contact SHAMS"} | {isAr ? "Contact SHAMS" : "تواصل معنا"}
                      </Button>
                      <Dialog open={suggestionOpen} onOpenChange={setSuggestionOpen}>
                        <DialogTrigger asChild>
                          <Button className="bg-healthGold hover:bg-healthGold/90 text-healthDarkBlue">
                            <UserPlus className="h-4 w-4 me-2" />
                            {isAr ? "اقترح مقدم رعاية" : "Suggest a Provider"} | {isAr ? "Suggest a Provider" : "اقترح مقدم رعاية"}
                          </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-md">
                          <DialogHeader>
                            <DialogTitle>
                              {isAr ? "اقترح مقدم رعاية صحية" : "Suggest a Healthcare Provider"}
                            </DialogTitle>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div className="space-y-2">
                              <Label>{isAr ? "اسم مقدم الخدمة *" : "Provider Name *"}</Label>
                              <Input
                                value={suggestionData.provider_name}
                                onChange={(e) => setSuggestionData(prev => ({ ...prev, provider_name: e.target.value }))}
                                placeholder={isAr ? "الاسم الكامل" : "Full name"}
                              />
                            </div>
                            <div className="grid grid-cols-2 gap-3">
                              <div className="space-y-2">
                                <Label>{isAr ? "المدينة *" : "City *"}</Label>
                                <Input
                                  value={suggestionData.city}
                                  onChange={(e) => setSuggestionData(prev => ({ ...prev, city: e.target.value }))}
                                />
                              </div>
                              <div className="space-y-2">
                                <Label>{isAr ? "المقاطعة *" : "Province *"}</Label>
                                <Select 
                                  value={suggestionData.province} 
                                  onValueChange={(v) => setSuggestionData(prev => ({ ...prev, province: v }))}
                                >
                                  <SelectTrigger>
                                    <SelectValue placeholder={isAr ? "اختر" : "Select"} />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {PROVINCES.map((p) => (
                                      <SelectItem key={p.value} value={p.value}>
                                        {isAr ? p.label_ar : p.label_en}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              </div>
                            </div>
                            <div className="space-y-2">
                              <Label>{isAr ? "نوع مقدم الخدمة" : "Provider Type"}</Label>
                              <Input
                                value={suggestionData.provider_type}
                                onChange={(e) => setSuggestionData(prev => ({ ...prev, provider_type: e.target.value }))}
                                placeholder={isAr ? "مثال: طبيب عائلة" : "e.g., Family Physician"}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>{isAr ? "معلومات الاتصال" : "Contact Info"}</Label>
                              <Input
                                value={suggestionData.contact_info}
                                onChange={(e) => setSuggestionData(prev => ({ ...prev, contact_info: e.target.value }))}
                                placeholder={isAr ? "رقم الهاتف أو العنوان" : "Phone or address"}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label>{isAr ? "ملاحظات" : "Notes"}</Label>
                              <Textarea
                                value={suggestionData.notes}
                                onChange={(e) => setSuggestionData(prev => ({ ...prev, notes: e.target.value }))}
                                placeholder={isAr ? "أي معلومات إضافية" : "Any additional info"}
                                rows={2}
                              />
                            </div>
                            <Button 
                              onClick={handleSuggestionSubmit}
                              disabled={isSubmitting}
                              className="w-full bg-healthGold hover:bg-healthGold/90 text-healthDarkBlue"
                            >
                              {isSubmitting 
                                ? (isAr ? "جاري الإرسال..." : "Submitting...") 
                                : (isAr ? "إرسال الاقتراح" : "Submit Suggestion")}
                            </Button>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>
          )}

          {/* Help Section */}
          {!hasSearched && (
            <Card className="bg-muted/50">
              <CardContent className="p-6 text-center">
                <h3 className="font-semibold text-lg mb-2">
                  {isAr ? "كيف يعمل البحث؟" : "How does this work?"}
                </h3>
                <p className="text-muted-foreground mb-4">
                  {isAr 
                    ? "أدخل مدينتك ومقاطعتك للبحث عن مقدمي رعاية صحية قريبين منك. يمكنك أيضاً تصفية النتائج حسب اللغة ونوع مقدم الخدمة."
                    : "Enter your city and province to search for healthcare providers near you. You can also filter results by language and provider type."}
                </p>
                <p className="text-sm text-muted-foreground">
                  {isAr 
                    ? "هذا الدليل قيد الإنشاء. إذا كنت تعرف مقدم رعاية يجب إضافته، أخبرنا!"
                    : "This directory is being built. If you know a provider who should be listed, let us know!"}
                </p>
              </CardContent>
            </Card>
          )}
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default FindHealthcareWorkers;