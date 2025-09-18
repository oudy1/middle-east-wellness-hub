import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  MapPin, 
  Stethoscope, 
  Phone, 
  Mail, 
  Clock, 
  Search, 
  Filter,
  Globe,
  GraduationCap,
  Building2,
  Video,
  ExternalLink,
  Heart,
  Users
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Enhanced Physician type with comprehensive information
type Physician = {
  id: number;
  title: string;
  firstName: string;
  lastName: string;
  gender: "Male" | "Female" | "Other";
  languages: string[];
  specialty: string;
  subspecialty?: string;
  yearsInPractice: number;
  affiliatedHospitals: string[];
  academicTitles?: string[];
  clinicName: string;
  address: string;
  coordinates: [number, number];
  phone: string;
  email?: string;
  officeHours: string;
  telehealthAvailable: boolean;
  accepting: boolean;
  credentials: string[];
};

// Healthcare Worker type for non-physician professionals
type HealthcareWorker = {
  id: number;
  firstName: string;
  lastName: string;
  role: string;
  specialty: string;
  languages: string[];
  location?: string;
  contact: {
    email?: string;
    website?: string;
    phone?: string;
  };
  profilePhoto?: string;
  credentials: string[];
  experience: number;
  description?: string;
};

// Sample comprehensive physician data
const SAMPLE_PHYSICIANS: Physician[] = [
  {
    id: 6,
    title: "Professor",
    firstName: "Raed",
    lastName: "Hawa",
    gender: "Male",
    languages: ["English", "Arabic"],
    specialty: "Psychiatry",
    subspecialty: "Consultation/Liaison Psychiatry",
    yearsInPractice: 0,
    affiliatedHospitals: ["UHN - Toronto Western Hospital"],
    academicTitles: ["Professor"],
    clinicName: "Toronto Western Hospital",
    address: "Toronto, Ontario Canada",
    coordinates: [-79.4013, 43.6568] as [number, number],
    phone: "",
    email: "raed.hawa@uhn.ca",
    officeHours: "By Appointment",
    telehealthAvailable: false,
    accepting: true,
    credentials: ["MSc", "MD", "FRCPC", "DABSM", "DABPN", "DFAPA", "DFCPA", "Diplomate American Board of Psychiatry and Neurology", "Diplomate American Board of Sleep Medicine"]
  }
];

// Sample healthcare workers data
const SAMPLE_HEALTHCARE_WORKERS: HealthcareWorker[] = [
  {
    id: 1,
    firstName: "Hiba",
    lastName: "Al-Masri",
    role: "Registered Dietitian",
    specialty: "Nutritional Counseling",
    languages: ["Arabic", "English"],
    location: "Ottawa, ON",
    contact: {
      email: "almasrihiba@outlook.com"
    },
    credentials: ["RD"],
    experience: 5,
    description: "Registered Dietitian at NutraHealth specializing in comprehensive nutritional counseling and meal planning."
  },
  {
    id: 2,
    firstName: "Dahlia",
    lastName: "Abou El Hassan",
    role: "Registered Dietitian",
    specialty: "Fertility Nutrition and Women's Health",
    languages: ["Arabic", "English"],
    contact: {
      email: "dahlia.abouelh@gmail.com"
    },
    credentials: ["MScFN", "RD"],
    experience: 7,
    description: "Dahlia Abou El Hassan, MScFN, RD is a Registered Dietitian specializing in fertility, hormones, and women's health nutrition. She helps individuals and couples navigate nutrition for conception, IVF, and pregnancy with evidence-based strategies and compassionate support. Dahlia is fluent in English and Arabic, and she works with clients to incorporate cultural foods and traditions into their nutrition plans. She provides simple, practical nutrition tips that make healthy eating more approachable and sustainable, helping to enhance overall health while reducing stress around meals."
  },
  {
    id: 3,
    firstName: "Noor",
    lastName: "Al Assadi",
    role: "Registered Psychotherapist",
    specialty: "Mental Health Counseling",
    languages: ["Arabic", "English"],
    location: "North York, ON",
    contact: {
      email: "noorassadi@live.com"
    },
    credentials: ["RP"],
    experience: 6,
    description: "Registered Psychotherapist providing culturally sensitive mental health support and therapeutic interventions."
  },
  {
    id: 4,
    firstName: "Menna",
    lastName: "Komeiha",
    role: "Researcher",
    specialty: "Health Equity Research",
    languages: ["Arabic", "English"],
    contact: {
      email: "komeiham@mcmaster.ca"
    },
    credentials: ["BDS", "GDip", "MSc"],
    experience: 4,
    description: "Menna Komeiha is a health equity researcher with a background in dentistry, applied health science, and global health. Her research focuses on digital health, patient-centered care, and advancing health equity through tackling the social determinants of health. She applies both qualitative and quantitative methods to generate evidence that informs policy and practice."
  },
  {
    id: 5,
    firstName: "Nayla",
    lastName: "Salameh",
    role: "Registered Dietitian",
    specialty: "Diabetes Education",
    languages: ["Arabic", "English"],
    contact: {
      email: "naylasalameh@hotmail.com"
    },
    credentials: ["MSc", "RD", "CDE"],
    experience: 8,
    description: "Nayla Salameh is a Registered Dietitian and Certified Diabetes Educator specializing in diabetes management and nutritional counseling. She provides comprehensive diabetes education and personalized nutrition plans to help patients manage their condition effectively."
  }
];

const SPECIALTIES = [
  "All Specialties",
  "Internal Medicine",
  "Cardiology", 
  "Pediatrics",
  "Orthopedic Surgery",
  "Family Medicine",
  "Dermatology",
  "Neurology",
  "Psychiatry",
  "Obstetrics & Gynecology"
];

const HEALTHCARE_ROLES = [
  "All Roles",
  "Registered Dietitian",
  "Registered Psychotherapist", 
  "Researcher",
  "Registered Nurse",
  "Pharmacist",
  "Social Worker",
  "Physical Therapist",
  "Psychologist",
  "Occupational Therapist"
];

const HEALTHCARE_SPECIALTIES = [
  "All Specialties",
  "Nutritional Counseling",
  "Fertility Nutrition and Women's Health",
  "Mental Health Counseling",
  "Health Equity Research",
  "Diabetes Education",
  "Emergency Medicine",
  "Clinical Pharmacy",
  "Mental Health",
  "Orthopedic Rehabilitation",
  "Clinical Psychology"
];

const LANGUAGES = [
  "All Languages",
  "English",
  "Arabic",
  "Farsi",
  "Kurdish",
  "Turkish",
  "Urdu",
  "Hindi",
  "French",
  "Spanish"
];

const HealthcareWorkersDirectory = () => {
  const { t, language } = useLanguage();
  const [physicians, setPhysicians] = useState(SAMPLE_PHYSICIANS);
  const [healthcareWorkers, setHealthcareWorkers] = useState(SAMPLE_HEALTHCARE_WORKERS);
  const [filteredPhysicians, setFilteredPhysicians] = useState(SAMPLE_PHYSICIANS);
  const [filteredHealthcareWorkers, setFilteredHealthcareWorkers] = useState(SAMPLE_HEALTHCARE_WORKERS);
  const [activeTab, setActiveTab] = useState("physicians");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedRole, setSelectedRole] = useState("All Roles");
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages");
  const [selectedPhysician, setSelectedPhysician] = useState<number | null>(null);
  const [selectedWorker, setSelectedWorker] = useState<number | null>(null);

  // Enhanced search and filter functionality for physicians
  useEffect(() => {
    let filtered = physicians;

    // Apply search term filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((physician) =>
        `${physician.firstName} ${physician.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        physician.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        physician.subspecialty?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        physician.clinicName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        physician.affiliatedHospitals.some(hospital => 
          hospital.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }

    // Apply specialty filter
    if (selectedSpecialty !== "All Specialties") {
      filtered = filtered.filter(physician => physician.specialty === selectedSpecialty);
    }

    // Apply language filter
    if (selectedLanguage !== "All Languages") {
      filtered = filtered.filter(physician => 
        physician.languages.includes(selectedLanguage)
      );
    }

    setFilteredPhysicians(filtered);
  }, [searchTerm, selectedSpecialty, selectedLanguage, physicians]);

  // Enhanced search and filter functionality for healthcare workers
  useEffect(() => {
    let filtered = healthcareWorkers;

    // Apply search term filter
    if (searchTerm.trim() !== "") {
      filtered = filtered.filter((worker) =>
        `${worker.firstName} ${worker.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.location?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply role filter
    if (selectedRole !== "All Roles") {
      filtered = filtered.filter(worker => worker.role === selectedRole);
    }

    // Apply language filter
    if (selectedLanguage !== "All Languages") {
      filtered = filtered.filter(worker => 
        worker.languages.includes(selectedLanguage)
      );
    }

    setFilteredHealthcareWorkers(filtered);
  }, [searchTerm, selectedRole, selectedLanguage, healthcareWorkers]);

  const getTranslatedSpecialty = (specialty: string) => {
    if (language !== 'ar') return specialty;
    
    const specialtyTranslations: { [key: string]: string } = {
      'All Specialties': 'جميع التخصصات',
      'Psychiatry': 'الطب النفسي',
      'Consultation/Liaison Psychiatry': 'الطب النفسي الاستشاري',
      'Internal Medicine': 'الطب الباطني',
      'Cardiology': 'أمراض القلب',
      'Pediatrics': 'طب الأطفال',
      'Family Medicine': 'طب الأسرة',
      'Dermatology': 'الأمراض الجلدية',
      'Neurology': 'طب الأعصاب',
      'Orthopedic Surgery': 'جراحة العظام',
      'Obstetrics & Gynecology': 'النساء والتوليد'
    };
    
    return specialtyTranslations[specialty] || specialty;
  };

  const getTranslatedRole = (role: string) => {
    if (language !== 'ar') return role;
    
    const roleTranslations: { [key: string]: string } = {
      'All Roles': 'جميع الأدوار',
      'Registered Dietitian': 'اختصاصي تغذية معتمد',
      'Registered Psychotherapist': 'معالج نفسي معتمد',
      'Researcher': 'باحث',
      'Registered Nurse': 'ممرض معتمد',
      'Pharmacist': 'صيدلي',
      'Social Worker': 'أخصائي اجتماعي',
      'Physical Therapist': 'أخصائي علاج طبيعي',
      'Psychologist': 'عالم نفس',
      'Occupational Therapist': 'أخصائي علاج وظيفي'
    };
    
    return roleTranslations[role] || role;
  };

  const getTranslatedSpecialtyDetail = (specialty: string) => {
    if (language !== 'ar') return specialty;
    
    const specialtyDetailTranslations: { [key: string]: string } = {
      'All Specialties': 'جميع التخصصات',
      'Nutritional Counseling': 'الاستشارة الغذائية',
      'Fertility Nutrition and Women\'s Health': 'تغذية الخصوبة وصحة المرأة',
      'Mental Health Counseling': 'الاستشارة النفسية',
      'Health Equity Research': 'بحوث العدالة الصحية',
      'Diabetes Education': 'تعليم مرض السكري',
      'Emergency Medicine': 'طب الطوارئ',
      'Clinical Pharmacy': 'الصيدلة السريرية',
      'Mental Health': 'الصحة النفسية',
      'Orthopedic Rehabilitation': 'إعادة التأهيل العظمي',
      'Clinical Psychology': 'علم النفس السريري'
    };
    
    return specialtyDetailTranslations[specialty] || specialty;
  };

  const PhysicianCard = ({ physician }: { physician: Physician }) => (
    <Card 
      className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${
        selectedPhysician === physician.id ? "ring-2 ring-healthTeal shadow-lg" : ""
      }`}
      onClick={() => setSelectedPhysician(selectedPhysician === physician.id ? null : physician.id)}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className={`text-xl font-bold text-healthDarkBlue ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {physician.title} {physician.firstName} {physician.lastName}
            </h3>
            <p className={`text-healthTeal font-medium ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {getTranslatedSpecialty(physician.specialty)}
            </p>
            {physician.subspecialty && (
              <p className={`text-sm text-gray-600 ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {getTranslatedSpecialty(physician.subspecialty)}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Building2 className="h-4 w-4 text-healthTeal mr-2" />
              <span className="font-medium">{physician.clinicName}</span>
            </div>
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 text-healthTeal mr-2" />
              <span>{physician.address}</span>
            </div>
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 text-healthTeal mr-2" />
              <a href={`tel:${physician.phone}`} className="text-healthTeal hover:underline">
                {physician.phone}
              </a>
            </div>
            {physician.email && (
              <div className="flex items-center text-sm">
                <Mail className="h-4 w-4 text-healthTeal mr-2" />
                <a href={`mailto:${physician.email}`} className="text-healthTeal hover:underline">
                  {physician.email}
                </a>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <div className="flex items-center text-sm">
              <Clock className="h-4 w-4 text-healthTeal mr-2" />
              <span>{physician.officeHours}</span>
            </div>
            {physician.yearsInPractice > 0 && (
              <div className="flex items-center text-sm">
                <Stethoscope className="h-4 w-4 text-healthTeal mr-2" />
                <span>{language === 'ar' ? `${physician.yearsInPractice} سنوات خبرة` : `${physician.yearsInPractice} years experience`}</span>
              </div>
            )}
            {physician.academicTitles && physician.academicTitles.length > 0 && (
              <div className="flex items-center text-sm">
                <GraduationCap className="h-4 w-4 text-healthTeal mr-2" />
                <span>{physician.academicTitles.join(", ")}</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div>
            <h5 className={`font-semibold text-sm text-healthDarkBlue mb-2 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {language === 'ar' ? 'اللغات:' : 'Languages:'}
            </h5>
            <div className="flex flex-wrap gap-1">
              {physician.languages.map((lang) => (
                <Badge key={lang} variant="outline" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h5 className={`font-semibold text-sm text-healthDarkBlue mb-2 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {language === 'ar' ? 'المستشفيات المنتسبة:' : 'Affiliated Hospitals:'}
            </h5>
            <div className="flex flex-wrap gap-1">
              {physician.affiliatedHospitals.map((hospital) => (
                <Badge key={hospital} variant="secondary" className="text-xs">
                  {hospital}
                </Badge>
              ))}
            </div>
          </div>

          {selectedPhysician === physician.id && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="space-y-3">
                <div>
                  <h5 className={`font-semibold text-sm text-healthDarkBlue mb-2 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 'المؤهلات:' : 'Credentials:'}
                  </h5>
                  <div className="flex flex-wrap gap-1">
                    {physician.credentials.map((credential) => (
                      <Badge key={credential} className="text-xs bg-healthTeal">
                        {credential}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  const HealthcareWorkerCard = ({ worker }: { worker: HealthcareWorker }) => (
    <Card 
      className={`cursor-pointer hover:shadow-lg transition-all duration-200 ${
        selectedWorker === worker.id ? "ring-2 ring-healthTeal shadow-lg" : ""
      }`}
      onClick={() => setSelectedWorker(selectedWorker === worker.id ? null : worker.id)}
    >
      <CardContent className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h3 className={`text-xl font-bold text-healthDarkBlue ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {worker.firstName} {worker.lastName}
            </h3>
            <p className={`text-healthTeal font-medium ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {getTranslatedRole(worker.role)}
            </p>
            <p className={`text-sm text-gray-600 ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {getTranslatedSpecialtyDetail(worker.specialty)}
            </p>
          </div>
          {worker.profilePhoto && (
            <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center ml-4">
              <Users className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>

        <div className="space-y-3">
          {worker.location && (
            <div className="flex items-center text-sm">
              <MapPin className="h-4 w-4 text-healthTeal mr-2" />
              <span>{worker.location}</span>
            </div>
          )}
          
          {worker.contact.phone && (
            <div className="flex items-center text-sm">
              <Phone className="h-4 w-4 text-healthTeal mr-2" />
              <a href={`tel:${worker.contact.phone}`} className="text-healthTeal hover:underline">
                {worker.contact.phone}
              </a>
            </div>
          )}
          
          {worker.contact.email && (
            <div className="flex items-center text-sm">
              <Mail className="h-4 w-4 text-healthTeal mr-2" />
              <a href={`mailto:${worker.contact.email}`} className="text-healthTeal hover:underline">
                {worker.contact.email}
              </a>
            </div>
          )}
          
          {worker.contact.website && (
            <div className="flex items-center text-sm">
              <ExternalLink className="h-4 w-4 text-healthTeal mr-2" />
              <a href={worker.contact.website} target="_blank" rel="noopener noreferrer" className="text-healthTeal hover:underline">
                {language === 'ar' ? 'الموقع الإلكتروني' : 'Website'}
              </a>
            </div>
          )}

          <div className="flex items-center text-sm">
            <Heart className="h-4 w-4 text-healthTeal mr-2" />
            <span>{language === 'ar' ? `${worker.experience} سنوات خبرة` : `${worker.experience} years experience`}</span>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <div>
            <h5 className={`font-semibold text-sm text-healthDarkBlue mb-2 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {language === 'ar' ? 'اللغات:' : 'Languages:'}
            </h5>
            <div className="flex flex-wrap gap-1">
              {worker.languages.map((lang) => (
                <Badge key={lang} variant="outline" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h5 className={`font-semibold text-sm text-healthDarkBlue mb-2 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {language === 'ar' ? 'المؤهلات:' : 'Credentials:'}
            </h5>
            <div className="flex flex-wrap gap-1">
              {worker.credentials.map((credential) => (
                <Badge key={credential} className="text-xs bg-healthTeal">
                  {credential}
                </Badge>
              ))}
            </div>
          </div>

          {selectedWorker === worker.id && worker.description && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <h5 className={`font-semibold text-sm text-healthDarkBlue mb-2 ${language === 'ar' ? 'text-right font-cairo' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                {language === 'ar' ? 'نبذة عن:' : 'About:'}
              </h5>
              <p className="text-sm text-gray-600">{worker.description}</p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className={`text-4xl md:text-5xl font-bold mb-4 text-healthDarkBlue ${language === 'ar' ? 'font-cairo' : ''}`}>
              {language === 'ar' ? 'العثور على العاملين في الرعاية الصحية' : 'Find Healthcare Workers'}
            </h1>
            <p className={`text-lg text-gray-600 max-w-3xl mx-auto ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
              {language === 'ar' ? 
                'العثور على مقدمي الرعاية الصحية المؤهلين الذين يفهمون خلفيتك الثقافية ويتحدثون لغتك. يشمل دليلنا الشامل الأطباء وغيرهم من المهنيين الصحيين مع معلومات تفصيلية حول خبراتهم ومؤهلاتهم وتوفرهم.' : 
                'Find qualified healthcare providers who understand your cultural background and speak your language. Our comprehensive directory includes physicians and other healthcare professionals with detailed information about their expertise, credentials, and availability.'
              }
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="physicians" className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                {language === 'ar' ? 'الأطباء' : 'Physicians'}
              </TabsTrigger>
              <TabsTrigger value="healthcare-workers" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                {language === 'ar' ? 'العاملين الصحيين المحترفين' : 'Professional Health Workers'}
              </TabsTrigger>
            </TabsList>

            {/* Search and Filter Controls */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder={language === 'ar' ? 'البحث بالاسم أو التخصص أو اللغة...' : 'Search by name, specialty, or language...'}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                    dir={language === 'ar' ? 'rtl' : 'ltr'}
                  />
                </div>
                
                {activeTab === "physicians" ? (
                  <Select value={selectedSpecialty} onValueChange={setSelectedSpecialty}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {SPECIALTIES.map(specialty => (
                        <SelectItem key={specialty} value={specialty}>
                          {getTranslatedSpecialty(specialty)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                ) : (
                  <Select value={selectedRole} onValueChange={setSelectedRole}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {HEALTHCARE_ROLES.map(role => (
                        <SelectItem key={role} value={role}>
                          {getTranslatedRole(role)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
                
                <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {LANGUAGES.map(lang => (
                      <SelectItem key={lang} value={lang}>
                        {lang === 'All Languages' && language === 'ar' ? 'جميع اللغات' :
                         lang === 'Arabic' && language === 'ar' ? 'العربية' :
                         lang === 'English' && language === 'ar' ? 'الإنجليزية' :
                         lang}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className={`text-sm text-gray-600 ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                  {activeTab === "physicians" 
                    ? (language === 'ar' ? `عرض ${filteredPhysicians.length} طبيب` : `Showing ${filteredPhysicians.length} physician(s)`)
                    : (language === 'ar' ? `عرض ${filteredHealthcareWorkers.length} عامل رعاية صحية` : `Showing ${filteredHealthcareWorkers.length} healthcare worker(s)`)
                  }
                </p>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <span className={`text-sm text-gray-600 ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 'تصفية النتائج' : 'Filter results'}
                  </span>
                </div>
              </div>
            </div>

            <TabsContent value="physicians">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPhysicians.map((physician) => (
                  <PhysicianCard key={physician.id} physician={physician} />
                ))}
              </div>

              {filteredPhysicians.length === 0 && (
                <div className="text-center py-12">
                  <Stethoscope className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className={`text-xl font-semibold text-gray-500 mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {language === 'ar' ? 'لم يتم العثور على أطباء' : 'No physicians found'}
                  </h3>
                  <p className={`text-gray-400 ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 'حاول تعديل معايير البحث أو المرشحات.' : 'Try adjusting your search criteria or filters.'}
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="healthcare-workers">
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredHealthcareWorkers.map((worker) => (
                  <HealthcareWorkerCard key={worker.id} worker={worker} />
                ))}
              </div>

              {filteredHealthcareWorkers.length === 0 && (
                <div className="text-center py-12">
                  <Heart className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                  <h3 className={`text-xl font-semibold text-gray-500 mb-2 ${language === 'ar' ? 'font-cairo' : ''}`}>
                    {language === 'ar' ? 'لم يتم العثور على عاملي رعاية صحية' : 'No healthcare workers found'}
                  </h3>
                  <p className={`text-gray-400 ${language === 'ar' ? 'text-right' : ''}`} dir={language === 'ar' ? 'rtl' : 'ltr'}>
                    {language === 'ar' ? 'حاول تعديل معايير البحث أو المرشحات.' : 'Try adjusting your search criteria or filters.'}
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default HealthcareWorkersDirectory;