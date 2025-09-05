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
    firstName: "Fatima",
    lastName: "Al-Rashid",
    role: "Registered Nurse",
    specialty: "Emergency Medicine",
    languages: ["Arabic", "English"],
    location: "Toronto, ON",
    contact: {
      email: "fatima.alrashid@hospital.ca",
      phone: "(416) 555-0123"
    },
    credentials: ["RN", "BScN"],
    experience: 8,
    description: "Specialized emergency nurse with extensive experience in trauma care and patient advocacy."
  },
  {
    id: 2,
    firstName: "Ahmed",
    lastName: "Hassan",
    role: "Pharmacist",
    specialty: "Clinical Pharmacy",
    languages: ["Arabic", "English", "French"],
    location: "Ottawa, ON",
    contact: {
      email: "ahmed.hassan@pharmacy.ca",
      website: "www.ahmedpharmacy.ca"
    },
    credentials: ["PharmD", "RPh"],
    experience: 12,
    description: "Clinical pharmacist specializing in medication therapy management and patient counseling."
  },
  {
    id: 3,
    firstName: "Layla",
    lastName: "Mahmoud",
    role: "Social Worker",
    specialty: "Mental Health",
    languages: ["Arabic", "English"],
    location: "Vancouver, BC",
    contact: {
      email: "layla.mahmoud@socialservices.bc.ca",
      phone: "(604) 555-0456"
    },
    credentials: ["MSW", "RSW"],
    experience: 6,
    description: "Mental health social worker focusing on cultural competency and family therapy."
  },
  {
    id: 4,
    firstName: "Omar",
    lastName: "Khalil",
    role: "Physical Therapist",
    specialty: "Orthopedic Rehabilitation",
    languages: ["Arabic", "English"],
    location: "Calgary, AB",
    contact: {
      email: "omar.khalil@physio.ca",
      website: "www.khalilphysio.com"
    },
    credentials: ["BPT", "MPT"],
    experience: 10,
    description: "Orthopedic physical therapist specializing in sports injuries and post-surgical rehabilitation."
  },
  {
    id: 5,
    firstName: "Nour",
    lastName: "Abdel-Rahman",
    role: "Psychologist",
    specialty: "Clinical Psychology",
    languages: ["Arabic", "English"],
    location: "Montreal, QC",
    contact: {
      email: "nour.abdelrahman@psychology.ca",
      phone: "(514) 555-0789"
    },
    credentials: ["PhD", "C.Psych"],
    experience: 7,
    description: "Clinical psychologist specializing in anxiety, depression, and cultural adaptation therapy."
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
  "Registered Nurse",
  "Pharmacist",
  "Social Worker",
  "Physical Therapist",
  "Psychologist",
  "Occupational Therapist",
  "Dietitian",
  "Speech Therapist",
  "Respiratory Therapist"
];

const HEALTHCARE_SPECIALTIES = [
  "All Specialties",
  "Emergency Medicine",
  "Clinical Pharmacy",
  "Mental Health",
  "Orthopedic Rehabilitation",
  "Clinical Psychology",
  "Pediatric Care",
  "Geriatric Care",
  "Community Health",
  "Rehabilitation Services"
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
            <h3 className="text-xl font-bold text-healthDarkBlue">
              {physician.title} {physician.firstName} {physician.lastName}
            </h3>
            <p className="text-healthTeal font-medium">{physician.specialty}</p>
            {physician.subspecialty && (
              <p className="text-sm text-gray-600">{physician.subspecialty}</p>
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
                <span>{physician.yearsInPractice} years experience</span>
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
            <h5 className="font-semibold text-sm text-healthDarkBlue mb-2">Languages:</h5>
            <div className="flex flex-wrap gap-1">
              {physician.languages.map((lang) => (
                <Badge key={lang} variant="outline" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-sm text-healthDarkBlue mb-2">Affiliated Hospitals:</h5>
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
                  <h5 className="font-semibold text-sm text-healthDarkBlue mb-2">Credentials:</h5>
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
            <h3 className="text-xl font-bold text-healthDarkBlue">
              {worker.firstName} {worker.lastName}
            </h3>
            <p className="text-healthTeal font-medium">{worker.role}</p>
            <p className="text-sm text-gray-600">{worker.specialty}</p>
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
                Website
              </a>
            </div>
          )}

          <div className="flex items-center text-sm">
            <Heart className="h-4 w-4 text-healthTeal mr-2" />
            <span>{worker.experience} years experience</span>
          </div>
        </div>

        <div className="space-y-3 mt-4">
          <div>
            <h5 className="font-semibold text-sm text-healthDarkBlue mb-2">Languages:</h5>
            <div className="flex flex-wrap gap-1">
              {worker.languages.map((lang) => (
                <Badge key={lang} variant="outline" className="text-xs">
                  {lang}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h5 className="font-semibold text-sm text-healthDarkBlue mb-2">Credentials:</h5>
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
              <h5 className="font-semibold text-sm text-healthDarkBlue mb-2">About:</h5>
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
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-healthDarkBlue">
              Find Healthcare Workers
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find qualified healthcare providers who understand your cultural background and speak your language. 
              Our comprehensive directory includes physicians and other healthcare professionals with detailed information about their expertise, credentials, and availability.
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-8">
              <TabsTrigger value="physicians" className="flex items-center gap-2">
                <Stethoscope className="h-4 w-4" />
                Physicians
              </TabsTrigger>
              <TabsTrigger value="healthcare-workers" className="flex items-center gap-2">
                <Heart className="h-4 w-4" />
                Professional Health Workers
              </TabsTrigger>
            </TabsList>

            {/* Search and Filter Controls */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search by name, specialty, or language..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
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
                          {specialty}
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
                          {role}
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
                    {LANGUAGES.map(language => (
                      <SelectItem key={language} value={language}>
                        {language}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  {activeTab === "physicians" 
                    ? `Showing ${filteredPhysicians.length} physician(s)`
                    : `Showing ${filteredHealthcareWorkers.length} healthcare worker(s)`
                  }
                </p>
                <div className="flex items-center gap-2">
                  <Filter className="h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-600">Filter results</span>
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
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">No physicians found</h3>
                  <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
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
                  <h3 className="text-xl font-semibold text-gray-500 mb-2">No healthcare workers found</h3>
                  <p className="text-gray-400">Try adjusting your search criteria or filters.</p>
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