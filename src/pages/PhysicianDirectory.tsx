import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
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
  ExternalLink
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

// Sample comprehensive physician data
const SAMPLE_PHYSICIANS: Physician[] = [
  {
    id: 6,
    title: "Professor",
    firstName: "Raed Jad",
    lastName: "Hawa",
    gender: "Male",
    languages: ["English", "Arabic"],
    specialty: "Psychiatry",
    subspecialty: "Consultation/Liaison Psychiatry",
    yearsInPractice: 25,
    affiliatedHospitals: ["UHN - Toronto Western Hospital"],
    academicTitles: ["Professor", "Deputy Psychiatrist in Chief", "Director, Division of Consultation/Liaison Psychiatry"],
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

const PhysicianDirectory = () => {
  const { t, language } = useLanguage();
  const [physicians, setPhysicians] = useState(SAMPLE_PHYSICIANS);
  const [filteredPhysicians, setFilteredPhysicians] = useState(SAMPLE_PHYSICIANS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialty, setSelectedSpecialty] = useState("All Specialties");
  const [selectedLanguage, setSelectedLanguage] = useState("All Languages");
  const [selectedPhysician, setSelectedPhysician] = useState<number | null>(null);

  // Enhanced search and filter functionality
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
          <div className="text-right">
            <Badge variant={physician.accepting ? "default" : "secondary"} className="mb-2">
              {physician.accepting ? "Accepting Patients" : "Not Accepting"}
            </Badge>
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
            <div className="flex items-center text-sm">
              <Stethoscope className="h-4 w-4 text-healthTeal mr-2" />
              <span>{physician.yearsInPractice} years experience</span>
            </div>
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

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-healthDarkBlue">
              Physician Directory
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Find qualified healthcare providers who understand your cultural background and speak your language. 
              Our comprehensive directory includes detailed information about each physician's expertise, credentials, and availability.
            </p>
          </div>

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
                Showing {filteredPhysicians.length} physician(s)
              </p>
              <div className="flex items-center gap-2">
                <Filter className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-600">Filter results</span>
              </div>
            </div>
          </div>

          {/* Physician Results */}
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PhysicianDirectory;