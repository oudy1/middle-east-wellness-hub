// Unified Physician Data Store - Single Source of Truth

export type Physician = {
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
  city: string; // Extracted or manual
  coordinates: [number, number];
  phone: string;
  email?: string;
  officeHours: string;
  telehealthAvailable: boolean;
  accepting: boolean;
  credentials: string[];
  tags?: string[]; // For categorization
};

// Helper function to extract city from address
export const extractCityFromAddress = (address: string): string => {
  const parts = address.split(',');
  if (parts.length >= 2) {
    return parts[parts.length - 2].trim();
  }
  return "Unknown";
};

// Helper function to check if physician is family medicine
export const isFamilyPhysician = (physician: Physician): boolean => {
  const familyKeywords = ['Family Medicine', 'Family Physician', 'CCFP'];
  const specialtyMatch = familyKeywords.some(keyword => 
    physician.specialty.includes(keyword)
  );
  const subspecialtyMatch = physician.subspecialty ? 
    familyKeywords.some(keyword => physician.subspecialty?.includes(keyword)) : false;
  const tagsMatch = physician.tags ? 
    physician.tags.some(tag => familyKeywords.some(keyword => tag.includes(keyword))) : false;
  
  return specialtyMatch || subspecialtyMatch || tagsMatch;
};

// Master Physicians Database
export const PHYSICIANS_MASTER: Physician[] = [
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
    city: "Toronto",
    coordinates: [-79.4013, 43.6568],
    phone: "",
    email: "raed.hawa@uhn.ca",
    officeHours: "By Appointment",
    telehealthAvailable: false,
    accepting: true,
    credentials: ["MSc", "MD", "FRCPC", "DABSM", "DABPN", "DFAPA", "DFCPA"]
  },
  {
    id: 7,
    title: "Dr.",
    firstName: "Albiruni",
    lastName: "Abdul Razak",
    gender: "Male",
    languages: ["English", "Malay"],
    specialty: "Internal Medicine",
    subspecialty: "Hematology Oncology",
    yearsInPractice: 0,
    affiliatedHospitals: ["Princess Margaret Cancer Centre", "Sinai Health"],
    academicTitles: ["Assistant Professor"],
    clinicName: "Princess Margaret Cancer Centre",
    address: "Toronto, Ontario Canada",
    city: "Toronto",
    coordinates: [-79.3902, 43.6596],
    phone: "",
    email: "albiruni.razak@uhn.ca",
    officeHours: "By Appointment",
    telehealthAvailable: false,
    accepting: true,
    credentials: ["MD", "Assistant Professor at University of Toronto"]
  },
  {
    id: 9,
    title: "Dr.",
    firstName: "Noha",
    lastName: "Abdel Gawad",
    gender: "Female",
    languages: ["English", "Arabic"],
    specialty: "Psychiatry",
    subspecialty: "Consultation/Liaison Psychiatry",
    yearsInPractice: 0,
    affiliatedHospitals: ["UHN - Toronto General Hospital"],
    academicTitles: ["Assistant Professor"],
    clinicName: "Toronto General Hospital",
    address: "200 Elizabeth St., Toronto, Ontario, Canada M5G 2C4",
    city: "Toronto",
    coordinates: [-79.3874, 43.6596],
    phone: "",
    email: "",
    officeHours: "By Appointment",
    telehealthAvailable: false,
    accepting: true,
    credentials: ["MD", "ABPN", "FRCPC", "Assistant Professor of Psychiatry"]
  },
  {
    id: 8,
    title: "Dr.",
    firstName: "Muhammad Z.",
    lastName: "Shrayyef",
    gender: "Male",
    languages: ["English", "Arabic"],
    specialty: "Endocrinology",
    subspecialty: "Thyroid | Diabetes & Metabolism | Obesity Medicine",
    yearsInPractice: 0,
    affiliatedHospitals: ["Thyroid & Hormones Endocrinology Center"],
    academicTitles: ["Assistant Professor (Clinical Medicine), University of Toronto"],
    clinicName: "Thyroid & Hormones Endocrinology Center",
    address: "Toronto, Ontario Canada",
    city: "Toronto",
    coordinates: [-79.3832, 43.6532],
    phone: "",
    email: "thyroidandhormones@gmail.com",
    officeHours: "By Appointment",
    telehealthAvailable: false,
    accepting: true,
    credentials: ["MD", "Assistant Professor (Clinical Medicine)"]
  },
  {
    id: 10,
    title: "Dr.",
    firstName: "Mariam",
    lastName: "Zakhary",
    gender: "Female",
    languages: ["English", "Arabic"],
    specialty: "Family Medicine",
    subspecialty: "",
    yearsInPractice: 0,
    affiliatedHospitals: ["Oakville Doctors"],
    academicTitles: [],
    clinicName: "Oakville Doctors",
    address: "Oakville, Ontario, Canada",
    city: "Oakville",
    coordinates: [-79.6876, 43.4675],
    phone: "",
    email: "Drs@oakvilledr.com",
    officeHours: "By Appointment",
    telehealthAvailable: false,
    accepting: true,
    credentials: ["MD"],
    tags: ["Family Medicine"]
  },
  {
    id: 11,
    title: "Dr.",
    firstName: "Nihal",
    lastName: "Elkhouly",
    gender: "Female",
    languages: ["English", "Arabic"],
    specialty: "Family Medicine",
    subspecialty: "",
    yearsInPractice: 0,
    affiliatedHospitals: ["Brampton Civic Hospital"],
    academicTitles: [],
    clinicName: "Brampton Civic Hospital",
    address: "Brampton, Ontario, Canada",
    city: "Brampton",
    coordinates: [-79.7624, 43.6845],
    phone: "905-857-3474",
    email: "",
    officeHours: "By Appointment",
    telehealthAvailable: false,
    accepting: true,
    credentials: ["MD"],
    tags: ["Family Medicine"]
  },
  {
    id: 12,
    title: "Dr.",
    firstName: "Salah-Eddin",
    lastName: "Ali",
    gender: "Male",
    languages: ["English", "Arabic"],
    specialty: "Family Medicine",
    subspecialty: "CCFP Specialist",
    yearsInPractice: 0,
    affiliatedHospitals: ["miClinic"],
    academicTitles: [],
    clinicName: "miClinic",
    address: "Mississauga, Ontario, Canada",
    city: "Mississauga",
    coordinates: [-79.6441, 43.5890],
    phone: "",
    email: "",
    officeHours: "By Appointment",
    telehealthAvailable: false,
    accepting: true,
    credentials: ["MD", "MBA", "CCFP"],
    tags: ["Family Medicine", "CCFP"]
  },
  {
    id: 13,
    title: "Dr.",
    firstName: "Othman",
    lastName: "Farahneh",
    gender: "Male",
    languages: ["English", "Arabic"],
    specialty: "Family Medicine",
    subspecialty: "CCFP Specialist",
    yearsInPractice: 0,
    affiliatedHospitals: ["miClinic"],
    academicTitles: [],
    clinicName: "miClinic",
    address: "Mississauga, Ontario, Canada",
    city: "Mississauga",
    coordinates: [-79.6441, 43.5890],
    phone: "",
    email: "",
    officeHours: "By Appointment",
    telehealthAvailable: false,
    accepting: true,
    credentials: ["MD", "CCFP"],
    tags: ["Family Medicine", "CCFP"]
  },
  {
    id: 14,
    title: "Dr.",
    firstName: "Adel",
    lastName: "Mohamed",
    gender: "Male",
    languages: ["English", "Arabic"],
    specialty: "Pediatrics",
    subspecialty: "",
    yearsInPractice: 0,
    affiliatedHospitals: ["Mount Sinai Health"],
    academicTitles: [],
    clinicName: "Mount Sinai Health",
    address: "Toronto, Ontario, Canada",
    city: "Toronto",
    coordinates: [-79.3874, 43.6596],
    phone: "(416) 586-4800 ext. 7396",
    email: "adel.mohamed@sinaihealthsystem.ca",
    officeHours: "By Appointment",
    telehealthAvailable: false,
    accepting: true,
    credentials: ["MD"]
  }
];

// Get all family physicians
export const getFamilyPhysicians = (): Physician[] => {
  return PHYSICIANS_MASTER.filter(isFamilyPhysician);
};

// Get cities with physician counts
export const getCitiesWithCounts = (): { city: string; count: number }[] => {
  const familyPhysicians = getFamilyPhysicians();
  const cityMap = new Map<string, number>();
  
  familyPhysicians.forEach(physician => {
    const city = physician.city || extractCityFromAddress(physician.address);
    cityMap.set(city, (cityMap.get(city) || 0) + 1);
  });
  
  return Array.from(cityMap.entries())
    .map(([city, count]) => ({ city, count }))
    .sort((a, b) => b.count - a.count);
};

// Get physicians by city
export const getPhysiciansByCity = (city: string): Physician[] => {
  return getFamilyPhysicians().filter(p => p.city === city);
};

// De-duplicate physicians by email or phone
export const deduplicatePhysicians = (physicians: Physician[]): Physician[] => {
  const seen = new Set<string>();
  return physicians.filter(p => {
    const key = p.email || p.phone || `${p.firstName}-${p.lastName}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
};
