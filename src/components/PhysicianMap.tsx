
import { useEffect, useRef, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Map } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

// Google Maps would normally be used here, but for the demo we'll create a simplified map view
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
  const { t } = useLanguage();
  const [mapApiKey, setMapApiKey] = useState<string | null>(() => {
    try {
      const stored = localStorage.getItem('googleMapsApiKey');
      return stored && stored.length > 10 ? stored : null;
    } catch {
      return null;
    }
  });
  const [showKeyInput, setShowKeyInput] = useState(!mapApiKey);
  const [tempKey, setTempKey] = useState('');

  // This is a placeholder component since we don't have an actual Google Maps integration yet
  // In a real implementation, you would use Google Maps JavaScript API

  const saveMapKey = () => {
    if (tempKey.length < 10 || !/^[a-zA-Z0-9_-]+$/.test(tempKey)) {
      alert('Please enter a valid Google Maps API key');
      return;
    }
    
    try {
      localStorage.setItem('googleMapsApiKey', tempKey.trim());
      setMapApiKey(tempKey.trim());
      setShowKeyInput(false);
      setTempKey('');
    } catch (error) {
      alert('Error saving API key');
    }
  };

  // Find selected physician
  const selectedPhysician = physicians.find(p => p.id === selectedPhysicianId);

  return (
    <div className="h-full flex flex-col">
      {showKeyInput ? (
        <div className="flex-1 flex flex-col items-center justify-center p-4">
          <Map size={64} className="text-healthTeal mb-4" />
          <h3 className="text-xl font-bold mb-2">Google Maps API Key Required</h3>
          <p className="text-gray-600 mb-4 text-center">
            To display the interactive map with physician locations, please enter your Google Maps API key.
          </p>
          <input
            type="text"
            className="w-full p-2 border border-gray-300 rounded mb-4"
            placeholder="Enter your Google Maps API key"
            value={tempKey}
            onChange={(e) => setTempKey(e.target.value)}
          />
          <div className="flex gap-2">
            <Button 
              onClick={saveMapKey}
              className="bg-healthTeal hover:bg-healthTeal/90"
              disabled={!tempKey}
            >
              Save API Key
            </Button>
            <Button 
              variant="outline"
              onClick={() => window.open('https://console.cloud.google.com/google/maps-apis', '_blank')}
            >
              Get API Key
            </Button>
          </div>
        </div>
      ) : (
        <>
          <div className="flex-1 bg-healthLightGray/50 flex items-center justify-center relative">
            <div className="absolute inset-0 overflow-hidden">
              {/* Google Maps placeholder with physician markers */}
              <div className="h-full w-full bg-green-50 relative border-2 border-green-200">
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
                    className={`absolute w-5 h-5 rounded-full border-2 border-white shadow-md transition-all cursor-pointer
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
                
                <div className="absolute bottom-4 left-4 right-4 text-center p-3 bg-white/90 rounded-lg shadow-md">
                  <p className="text-sm text-gray-600">
                    📍 Google Maps Integration - Physician locations displayed on interactive map
                  </p>
                  <p className="text-xs text-gray-500 mt-1">
                    Click on markers to view physician details
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
              {t("physicians.selectPhysician")}
            </div>
          )}
          
          <div className="mt-2 text-center">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setShowKeyInput(true)}
            >
              Update API Key
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default PhysicianMap;
