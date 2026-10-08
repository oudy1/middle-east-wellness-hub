import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
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
  Search,
  Phone,
  Mail,
  Globe,
  MapPin,
  MessageCircle,
  UserCheck,
  Video,
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { supabase } from "@/integrations/supabase/client";
import { SEOHead } from "@/components/SEOHead";

// Fix Leaflet's default marker icons (broken by bundlers)
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

delete (L.Icon.Default.prototype as unknown as Record<string, unknown>)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

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

// Approximate coordinates for common Canadian cities (city center).
const CITY_COORDS: Record<string, [number, number]> = {
  "kitchener|on": [43.4516, -80.4925],
  "waterloo|on": [43.4643, -80.5204],
  "toronto|on": [43.6532, -79.3832],
  "ottawa|on": [45.4215, -75.6972],
  "mississauga|on": [43.589, -79.6441],
  "brampton|on": [43.7315, -79.7624],
  "richmond hill|on": [43.8828, -79.4403],
  "markham|on": [43.8561, -79.337],
  "london|on": [42.9849, -81.2453],
  "hamilton|on": [43.2557, -79.8711],
  "windsor|on": [42.3149, -83.0364],
  "vancouver|bc": [49.2827, -123.1207],
  "surrey|bc": [49.1063, -122.8251],
  "burnaby|bc": [49.2488, -122.9805],
  "victoria|bc": [48.4284, -123.3656],
  "calgary|ab": [51.0447, -114.0719],
  "edmonton|ab": [53.5461, -113.4938],
  "montreal|qc": [45.5019, -73.5674],
  "quebec city|qc": [46.8139, -71.208],
  "laval|qc": [45.6066, -73.7124],
  "winnipeg|mb": [49.8951, -97.1384],
  "saskatoon|sk": [52.1332, -106.67],
  "regina|sk": [50.4452, -104.6189],
  "halifax|ns": [44.6488, -63.5752],
  "fredericton|nb": [45.9636, -66.6431],
  "moncton|nb": [46.0878, -64.7782],
  "st. john's|nl": [47.5615, -52.7126],
  "charlottetown|pe": [46.2382, -63.1311],
};

const PROVINCE_COORDS: Record<string, [number, number]> = {
  ON: [44.0, -79.5],
  BC: [53.7, -127.6],
  AB: [53.9, -116.6],
  QC: [52.0, -71.0],
  MB: [53.8, -98.8],
  SK: [52.9, -106.4],
  NS: [44.7, -63.6],
  NB: [46.5, -66.3],
  NL: [53.1, -57.7],
  PE: [46.3, -63.2],
  NT: [62.5, -114.4],
  YT: [63.0, -135.0],
  NU: [70.3, -83.1],
};

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
  verified: boolean | null;
}

type CoordMap = Record<string, [number, number]>;

const cityKey = (city: string, province: string) =>
  `${city.trim().toLowerCase()}|${province.trim().toLowerCase()}`;

const Directory = () => {
  const { language } = useLanguage();
  const isAr = language === "ar";

  const [workers, setWorkers] = useState<HealthcareWorker[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  const [query, setQuery] = useState("");
  const [province, setProvince] = useState("");
  const [providerType, setProviderType] = useState("");
  const [acceptingOnly, setAcceptingOnly] = useState(false);

  const [coords, setCoords] = useState<CoordMap>({});
  const geocodeCache = useRef<CoordMap>({});

  useEffect(() => {
    const load = async () => {
      setIsLoading(true);
      setLoadError(null);
      try {
        const { data, error } = await supabase
          .from("healthcare_workers")
          .select("*")
          .order("province")
          .order("city")
          .order("full_name");
        if (error) throw error;
        setWorkers(data || []);
      } catch (e) {
        console.error("Directory load error:", e);
        setLoadError(isAr ? "حدث خطأ في تحميل الدليل" : "Could not load the directory");
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [isAr]);

  // Resolve coordinates for every city present in the data: built-in table
  // first, then a cached OpenStreetMap (Nominatim) lookup for unknown cities.
  useEffect(() => {
    const resolve = async () => {
      const next: CoordMap = {};
      const toFetch: { key: string; city: string; province: string }[] = [];

      for (const w of workers) {
        const key = cityKey(w.city, w.province);
        if (next[key]) continue;
        const known = CITY_COORDS[key] || geocodeCache.current[key];
        if (known) {
          next[key] = known;
        } else {
          toFetch.push({ key, city: w.city, province: w.province });
        }
      }

      for (const item of toFetch) {
        try {
          const res = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&limit=1&country=Canada&city=${encodeURIComponent(item.city)}&state=${encodeURIComponent(item.province)}`,
            { headers: { Accept: "application/json" } }
          );
          const results = (await res.json()) as Array<{ lat: string; lon: string }>;
          if (results[0]) {
            const c: [number, number] = [parseFloat(results[0].lat), parseFloat(results[0].lon)];
            next[item.key] = c;
            geocodeCache.current[item.key] = c;
          } else if (PROVINCE_COORDS[item.province]) {
            next[item.key] = PROVINCE_COORDS[item.province];
          }
        } catch {
          if (PROVINCE_COORDS[item.province]) next[item.key] = PROVINCE_COORDS[item.province];
        }
        // Nominatim usage policy: max 1 request/second
        await new Promise((r) => setTimeout(r, 1100));
      }

      setCoords(next);
    };
    if (workers.length > 0) resolve();
  }, [workers]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return workers.filter((w) => {
      if (province && w.province !== province) return false;
      if (providerType && w.provider_type !== providerType) return false;
      if (acceptingOnly && !w.accepting_new_patients) return false;
      if (q) {
        const haystack = [
          w.full_name,
          w.clinic_name,
          w.city,
          w.specialty,
          w.provider_type,
          ...(w.languages || []),
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        if (!haystack.includes(q)) return false;
      }
      return true;
    });
  }, [workers, query, province, providerType, acceptingOnly]);

  // Group filtered listings by city for map markers
  const markers = useMemo(() => {
    const groups = new Map<string, { coord: [number, number]; city: string; province: string; items: HealthcareWorker[] }>();
    for (const w of filtered) {
      const key = cityKey(w.city, w.province);
      const coord = coords[key];
      if (!coord) continue;
      const existing = groups.get(key);
      if (existing) {
        existing.items.push(w);
      } else {
        groups.set(key, { coord, city: w.city, province: w.province, items: [w] });
      }
    }
    return Array.from(groups.values());
  }, [filtered, coords]);

  const mapCenter: [number, number] = markers.length > 0 ? markers[0].coord : [56.1304, -106.3468];
  const mapZoom = markers.length === 1 ? 10 : 4;

  return (
    <>
      <SEOHead
        lang={isAr ? "ar" : "en"}
        path="/directory"
        title="Healthcare Directory Map | SHAMS"
        description="Browse all healthcare providers serving Middle Eastern and Arab communities in Canada on an interactive map and searchable list."
        titleAr="خريطة دليل مقدمي الرعاية الصحية | شمس"
        descriptionAr="تصفح جميع مقدمي الرعاية الصحية الذين يخدمون المجتمعات الشرق أوسطية والعربية في كندا على خريطة تفاعلية وقائمة قابلة للبحث."
      />
      <div className="flex flex-col min-h-screen bg-background" dir={isAr ? "rtl" : "ltr"}>
        <Header />
        <main id="main-content" className="flex-grow">
          <div className="container mx-auto px-4 py-6 sm:py-8 md:py-12">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground mb-3 sm:mb-4">
                {isAr ? "دليل مقدمي الرعاية الصحية" : "Healthcare Provider Directory"}
              </h1>
              <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
                {isAr
                  ? "تصفح جميع مقدمي الرعاية الصحية على الخريطة أو في القائمة أدناه"
                  : "Browse every listed healthcare provider on the map or in the list below"}
              </p>
            </div>

            {/* Filters */}
            <Card className="mb-6">
              <CardContent className="p-4 sm:p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="directory-search">{isAr ? "بحث" : "Search"}</Label>
                    <Input
                      id="directory-search"
                      placeholder={isAr ? "اسم، مدينة، لغة..." : "Name, city, language..."}
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>{isAr ? "المقاطعة" : "Province"}</Label>
                    <Select
                      value={province || "all"}
                      onValueChange={(v) => setProvince(v === "all" ? "" : v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isAr ? "الكل" : "All"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{isAr ? "الكل" : "All"}</SelectItem>
                        {PROVINCES.map((p) => (
                          <SelectItem key={p.value} value={p.value}>
                            {isAr ? p.label_ar : p.label_en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>{isAr ? "نوع مقدم الخدمة" : "Provider Type"}</Label>
                    <Select
                      value={providerType || "all"}
                      onValueChange={(v) => setProviderType(v === "all" ? "" : v)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={isAr ? "الكل" : "All"} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">{isAr ? "الكل" : "All"}</SelectItem>
                        {PROVIDER_TYPES.map((pt) => (
                          <SelectItem key={pt.value} value={pt.value}>
                            {isAr ? pt.label_ar : pt.label_en}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex items-center gap-3 pt-6">
                    <Switch
                      id="directory-accepting"
                      checked={acceptingOnly}
                      onCheckedChange={setAcceptingOnly}
                    />
                    <Label htmlFor="directory-accepting" className="cursor-pointer">
                      {isAr ? "يقبل مرضى جدد فقط" : "Accepting new patients only"}
                    </Label>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Map */}
            <Card className="mb-8 overflow-hidden">
              <div className="h-[320px] sm:h-[420px] w-full" dir="ltr">
                <DirectoryMap
                  markers={markers}
                  mapCenter={mapCenter}
                  mapZoom={mapZoom}
                  isAr={isAr}
                />
              </div>
            </Card>

            {/* List */}
            {isLoading ? (
              <p className="text-center text-muted-foreground py-8">
                {isAr ? "جاري التحميل..." : "Loading..."}
              </p>
            ) : loadError ? (
              <p className="text-center text-destructive py-8">{loadError}</p>
            ) : (
              <>
                <p className="text-muted-foreground mb-4">
                  {isAr
                    ? `${filtered.length} مقدم خدمة`
                    : `${filtered.length} provider${filtered.length !== 1 ? "s" : ""}`}
                </p>
                {filtered.length === 0 ? (
                  <Card>
                    <CardContent className="p-8 text-center text-muted-foreground">
                      {isAr
                        ? "لا توجد نتائج مطابقة. جرب تعديل عوامل التصفية."
                        : "No matching listings. Try adjusting the filters."}
                    </CardContent>
                  </Card>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filtered.map((worker) => (
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
                            <p className="text-sm text-muted-foreground mb-2">{worker.clinic_name}</p>
                          )}
                          <div className="space-y-2 text-sm">
                            <div className="flex items-start gap-2">
                              <MapPin className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                              <span>
                                {worker.address ? `${worker.address}, ` : ""}
                                {worker.city}, {worker.province}
                              </span>
                            </div>
                            {worker.languages && worker.languages.length > 0 && (
                              <div className="flex items-start gap-2">
                                <MessageCircle className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
                                <span>{worker.languages.join(", ")}</span>
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
                                <a
                                  href={`mailto:${worker.email}`}
                                  className="hover:text-healthGold truncate"
                                >
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
                            {worker.verified ? (
                              <span className="inline-flex items-center gap-1 text-xs bg-healthTeal/10 text-healthTeal px-2 py-1 rounded-full">
                                <UserCheck className="h-3 w-3" />
                                {isAr ? "موثق من شمس" : "Verified by SHAMS"}
                              </span>
                            ) : (
                              <span className="inline-flex items-center gap-1 text-xs bg-amber-500/10 text-amber-700 dark:text-amber-400 px-2 py-1 rounded-full">
                                {isAr ? "مسجل ذاتياً، غير موثق بعد" : "Self-listed, not yet verified"}
                              </span>
                            )}
                            {worker.accepting_new_patients && (
                              <span className="text-xs bg-healthGold/10 text-healthDarkBlue dark:text-healthGold px-2 py-1 rounded-full">
                                {isAr ? "يقبل مرضى جدد" : "Accepting new patients"}
                              </span>
                            )}
                            {worker.virtual_available && (
                              <span className="inline-flex items-center gap-1 text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">
                                <Video className="h-3 w-3" />
                                {isAr ? "استشارات عن بعد" : "Virtual visits"}
                              </span>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </>
            )}

            <div className="mt-8 text-center">
              <Button
                variant="outline"
                onClick={() => (window.location.href = "/find-healthcare-workers")}
                className="min-h-[44px]"
              >
                <Search className="h-4 w-4 me-2" />
                {isAr ? "بحث متقدم بالمدينة" : "Advanced city search"}
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
};

export default Directory;
