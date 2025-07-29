
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhysicianMap from "@/components/PhysicianMap";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin, Stethoscope, Phone, Mail, Clock } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Define the Physician type
type Physician = {
  id: number;
  name: string;
  specialty: string;
  languages: string[];
  address: string;
  phone: string;
  accepting: boolean;
  coordinates: [number, number]; // Explicitly define as a tuple with exactly 2 numbers
};

// Empty sample data - keeping structure but no physicians listed
const SAMPLE_PHYSICIANS: Physician[] = [];

const PhysicianDirectory = () => {
  const { t, language } = useLanguage();
  const [physicians, setPhysicians] = useState(SAMPLE_PHYSICIANS);
  const [filteredPhysicians, setFilteredPhysicians] = useState(SAMPLE_PHYSICIANS);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedPhysician, setSelectedPhysician] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [locationPermission, setLocationPermission] = useState("prompt");

  // Handle search functionality
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredPhysicians(physicians);
    } else {
      const filtered = physicians.filter(
        (physician) =>
          physician.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          physician.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
          physician.languages.some(lang => 
            lang.toLowerCase().includes(searchTerm.toLowerCase())
          )
      );
      setFilteredPhysicians(filtered);
    }
  }, [searchTerm, physicians]);

  // Request user location
  const requestLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation([position.coords.longitude, position.coords.latitude]);
          setLocationPermission("granted");
          
          // Sort physicians by distance when we get user location
          if (physicians.length > 0) {
            const sortedPhysicians = [...physicians].sort((a, b) => {
              const distA = calculateDistance(
                position.coords.latitude,
                position.coords.longitude,
                a.coordinates[1],
                a.coordinates[0]
              );
              const distB = calculateDistance(
                position.coords.latitude,
                position.coords.longitude,
                b.coordinates[1],
                b.coordinates[0]
              );
              return distA - distB;
            });
            setPhysicians(sortedPhysicians);
            setFilteredPhysicians(sortedPhysicians);
          }
        },
        (error) => {
          console.error("Error getting location:", error);
          setLocationPermission("denied");
        }
      );
    }
  };

  // Calculate distance between two points using Haversine formula
  const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the Earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in km
    return distance;
  };

  return (
    <div className="flex flex-col min-h-screen bg-healthLightGray" dir={language === "ar" ? "rtl" : "ltr"}>
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-healthDarkBlue">
            {t("physicians.directoryTitle")}
          </h1>
          
          {/* Physician Information Section - Editable by admin */}
          <section className="mb-12 bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center mb-6">
              <Stethoscope className="h-8 w-8 text-healthTeal mr-3" />
              <h2 className="text-2xl font-bold text-healthDarkBlue">Featured Physician Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold text-healthDarkBlue mb-4">Dr. Layla Hassan, MD</h3>
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Stethoscope className="h-5 w-5 text-healthTeal" />
                    <span className="font-medium">Specialty:</span>
                    <span>Internal Medicine & Endocrinology</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-healthTeal" />
                    <span className="font-medium">Phone:</span>
                    <a href="tel:(480) 555-1234" className="text-healthTeal hover:underline">(480) 555-1234</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-healthTeal" />
                    <span className="font-medium">Email:</span>
                    <a href="mailto:l.hassan@phoenixhealth.org" className="text-healthTeal hover:underline">l.hassan@phoenixhealth.org</a>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-healthTeal" />
                    <span className="font-medium">Location:</span>
                    <span>Phoenix Health Center, 123 Health Ave, Phoenix, AZ 85001</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-healthTeal" />
                    <span className="font-medium">Hours:</span>
                    <span>Mon-Fri 8:00 AM - 5:00 PM</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-lg font-semibold text-healthDarkBlue mb-3">About Dr. Hassan</h4>
                <p className="text-gray-600 mb-4">
                  Dr. Hassan specializes in culturally competent care for Middle Eastern communities, 
                  with expertise in diabetes management and women's health. She is fluent in Arabic 
                  and English, and has been serving the Phoenix community for over 10 years.
                </p>
                <div className="bg-healthTeal/10 p-4 rounded-lg">
                  <h5 className="font-semibold text-healthDarkBlue mb-2">Languages Spoken:</h5>
                  <div className="flex flex-wrap gap-2">
                    <span className="bg-healthTeal text-white px-3 py-1 rounded-full text-sm">Arabic</span>
                    <span className="bg-healthTeal text-white px-3 py-1 rounded-full text-sm">English</span>
                  </div>
                </div>
              </div>
            </div>
          </section>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3">
              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder={t("physicians.searchPlaceholder")}
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="flex-1"
                  />
                  {locationPermission !== "granted" && (
                    <Button 
                      onClick={requestLocation} 
                      className="bg-healthTeal hover:bg-healthTeal/90 flex items-center"
                    >
                      <MapPin className="mr-2 h-4 w-4" />
                      {t("physicians.nearMe")}
                    </Button>
                  )}
                </div>
                
                {locationPermission === "granted" && (
                  <p className="text-sm text-green-600 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" /> {t("physicians.usingLocation")}
                  </p>
                )}
                
                <p className="text-sm text-gray-500">
                  {t("physicians.found")} {filteredPhysicians.length} {t("physicians.physicians")}
                </p>
              </div>
              
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {filteredPhysicians.map((physician) => (
                  <Card 
                    key={physician.id}
                    className={`cursor-pointer hover:shadow-lg transition-shadow ${
                      selectedPhysician === physician.id ? "ring-2 ring-healthTeal" : ""
                    }`}
                    onClick={() => setSelectedPhysician(physician.id)}
                  >
                    <CardContent className="p-4">
                      <h3 className="font-bold text-lg text-healthDarkBlue">{physician.name}</h3>
                      <p className="text-gray-600">{physician.specialty}</p>
                      <div className="text-sm text-gray-500 mt-2">
                        <p>{t("physicians.languages")}: {physician.languages.join(", ")}</p>
                        <p>{physician.address}</p>
                        <p>{physician.phone}</p>
                      </div>
                      <div className="mt-2">
                        {physician.accepting ? (
                          <span className="text-green-600 text-sm font-medium">
                            ✓ {t("physicians.accepting")}
                          </span>
                        ) : (
                          <span className="text-red-600 text-sm font-medium">
                            ✗ {t("physicians.notAccepting")}
                          </span>
                        )}
                      </div>
                      {userLocation && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">{t("physicians.distance")}: </span>
                          {calculateDistance(
                            userLocation[1],
                            userLocation[0],
                            physician.coordinates[1],
                            physician.coordinates[0]
                          ).toFixed(1)} {t("physicians.km")}
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {filteredPhysicians.length === 0 && (
                  <div className="text-center py-8 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500">{t("physicians.noResults")}</p>
                  </div>
                )}
              </div>
            </div>
            
            <div className="lg:w-2/3">
              <div className="bg-white p-4 rounded-lg shadow-md h-[650px]">
                <PhysicianMap 
                  physicians={filteredPhysicians} 
                  selectedPhysicianId={selectedPhysician}
                  userLocation={userLocation}
                />
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PhysicianDirectory;
