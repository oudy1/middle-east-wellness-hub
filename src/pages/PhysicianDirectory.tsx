
import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import PhysicianMap from "@/components/PhysicianMap";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MapPin } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Sample physician data for demonstration
const SAMPLE_PHYSICIANS = [
  {
    id: 1,
    name: "Dr. Layla Hassan",
    specialty: "Family Medicine",
    languages: ["English", "Arabic"],
    address: "123 Health Ave, Phoenix, AZ",
    phone: "(480) 555-1234",
    accepting: true,
    coordinates: [-112.0740, 33.4484]
  },
  {
    id: 2,
    name: "Dr. Ahmed Mahmoud",
    specialty: "Family Medicine",
    languages: ["English", "Arabic", "French"],
    address: "456 Wellness Blvd, Phoenix, AZ",
    phone: "(480) 555-2345",
    accepting: true,
    coordinates: [-112.0840, 33.4684]
  },
  {
    id: 3,
    name: "Dr. Sarah Nasser",
    specialty: "Family Medicine",
    languages: ["English", "Farsi"],
    address: "789 Care Street, Tempe, AZ",
    phone: "(480) 555-3456",
    accepting: false,
    coordinates: [-111.9400, 33.4255]
  },
  {
    id: 4,
    name: "Dr. Mohammad Al-Saeed",
    specialty: "Family Medicine",
    languages: ["English", "Arabic", "Urdu"],
    address: "321 Medical Drive, Scottsdale, AZ",
    phone: "(480) 555-4567",
    accepting: true,
    coordinates: [-111.9260, 33.4941]
  },
  {
    id: 5,
    name: "Dr. Nadia Patel",
    specialty: "Family Practice",
    languages: ["English", "Hindi", "Urdu"],
    address: "654 Healing Road, Mesa, AZ",
    phone: "(480) 555-5678",
    accepting: true,
    coordinates: [-111.8313, 33.4152]
  }
];

const PhysicianDirectory = () => {
  const { t } = useLanguage();
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
    <div className="flex flex-col min-h-screen bg-healthLightGray">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-healthDarkBlue">
            Family Physician Directory
          </h1>
          
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="lg:w-1/3">
              <div className="bg-white p-4 rounded-lg shadow-md mb-6">
                <div className="flex gap-2 mb-4">
                  <Input
                    placeholder="Search by name, specialty, or language..."
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
                      Near Me
                    </Button>
                  )}
                </div>
                
                {locationPermission === "granted" && (
                  <p className="text-sm text-green-600 mb-2">
                    <MapPin className="h-4 w-4 inline mr-1" /> Using your location to find nearby physicians
                  </p>
                )}
                
                <p className="text-sm text-gray-500">
                  Found {filteredPhysicians.length} physicians
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
                        <p>Languages: {physician.languages.join(", ")}</p>
                        <p>{physician.address}</p>
                        <p>{physician.phone}</p>
                      </div>
                      <div className="mt-2">
                        {physician.accepting ? (
                          <span className="text-green-600 text-sm font-medium">
                            ✓ Accepting new patients
                          </span>
                        ) : (
                          <span className="text-red-600 text-sm font-medium">
                            ✗ Not accepting new patients
                          </span>
                        )}
                      </div>
                      {userLocation && (
                        <div className="mt-2 text-sm">
                          <span className="font-medium">Distance: </span>
                          {calculateDistance(
                            userLocation[1],
                            userLocation[0],
                            physician.coordinates[1],
                            physician.coordinates[0]
                          ).toFixed(1)} km away
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
                {filteredPhysicians.length === 0 && (
                  <div className="text-center py-8 bg-white rounded-lg shadow-md">
                    <p className="text-gray-500">No physicians match your search criteria.</p>
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
