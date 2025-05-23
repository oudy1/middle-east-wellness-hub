
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";

// MapBox would normally be used here, but for the demo we'll create a simplified map view
type Physician = {
  id: number;
  name: string;
  specialty: string;
  languages: string[];
  address: string;
  phone: string;
  accepting: boolean;
  coordinates: [number, number]; // Explicitly typed as tuple
};

type PhysicianMapProps = {
  physicians: Physician[];
  selectedPhysicianId: number | null;
  userLocation: [number, number] | null;
};

const PhysicianMap = ({ physicians, selectedPhysicianId, userLocation }: PhysicianMapProps) => {
  const [mapApiKey, setMapApiKey] = useState<string | null>(localStorage.getItem('mapApiKey'));
  const [showKeyInput, setShowKeyInput] = useState(!mapApiKey);
  const [tempKey, setTempKey] = useState('');

  // This is a placeholder component since we don't have an actual map integration yet
  // In a real implementation, you would use a map library like Mapbox, Google Maps, or Leaflet

  const saveMapKey = () => {
    localStorage.setItem('mapApiKey', tempKey);
    setMapApiKey(tempKey);
    setShowKeyInput(false);
  };

  // Find selected physician
  const selectedPhysician = physicians.find(p => p.id === selectedPhysicianId);

  return (
    <div className="h-full flex flex-col">
      {showKeyInput ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <Map size={64} className="text-healthTeal mb-4" />
          <h3 className="text-xl font-bold mb-2">Map API Key Required</h3>
          <p className="text-gray-600 mb-4 text-center">
            To view the physician locations on a map, please enter your Mapbox public token.
          </p>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter your Mapbox public token"
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
          />
          <div className="flex gap-2">
            <Button 
              onClick={saveMapKey}
              className="bg-healthTeal hover:bg-healthTeal/90"
              disabled={!tempKey}
            >
              Save Key
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('https://account.mapbox.com', '_blank')}
            >
              Get a Key
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 bg-healthLightGray/50 flex items-center justify-center relative">
            <div className="absolute inset-0 overflow-hidden">
              {/* Map placeholder with physician markers */}
              <div className="h-full w-full bg-healthLightGray/30 relative">
                {/* User location marker */}
                {userLocation && (
                  <div className="absolute w-6 h-6 bg-blue-500 rounded-full border-2 border-white shadow-md" 
                       style={{ 
                         left: '50%', 
                         top: '50%',
                         transform: 'translate(-50%, -50%)',
                         zIndex: 20 
                       }}>
                    <div className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></div>
                  </div>
                )}
                
                {/* Physician markers */}
                {physicians.map((physician) => (
                  <div 
                    key={physician.id}
                    className={`absolute w-5 h-5 rounded-full border-2 border-white shadow-md transition-all
                      ${physician.id === selectedPhysicianId 
                        ? 'bg-healthTeal scale-125 z-10' 
                        : 'bg-healthRed'}`}
                    style={{ 
                      // This is just a visual representation - in a real app these would be placed based on geo-coordinates
                      left: `${Math.random() * 70 + 15}%`, 
                      top: `${Math.random() * 70 + 15}%`,
                    }}
                    title={physician.name}
                  >
                  </div>
                ))}
                
                <div className="absolute bottom-4 left-4 right-4 text-center p-3 bg-white/80 rounded-lg shadow-md">
                  <p className="text-sm text-gray-600">
                    This is a placeholder map. In a real application, this would display an interactive map with physician locations.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Selected physician info */}
          {selectedPhysician && (
            <Card className="mt-4">
              <CardContent className="p-4">
                <h3 className="font-bold">{selectedPhysician.name}</h3>
                <p className="text-gray-600">{selectedPhysician.specialty}</p>
                <p className="text-sm text-gray-500 mt-1">{selectedPhysician.address}</p>
              </CardContent>
            </Card>
          )}
          
          {!selectedPhysician && (
            <div className="mt-4 p-4 text-center text-gray-500">
              Select a physician from the list to see details
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PhysicianMap;
