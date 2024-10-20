import React, { useEffect, useState } from 'react';
import { MapPin } from 'lucide-react';

interface RickshawTrackerProps {
  currentLocation: { lat: number; lng: number };
}

const RickshawTracker: React.FC<RickshawTrackerProps> = ({ currentLocation }) => {
  const [eta, setEta] = useState(10);

  useEffect(() => {
    const interval = setInterval(() => {
      setEta((prevEta) => (prevEta > 0 ? prevEta - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Rickshaw on the way!</h2>
      <div className="flex items-center mb-4">
        <MapPin className="text-blue-500 mr-2" size={24} />
        <p>Current Location: {currentLocation.lat.toFixed(6)}, {currentLocation.lng.toFixed(6)}</p>
      </div>
      <p className="text-xl font-semibold">ETA: {eta} minutes</p>
    </div>
  );
};

export default RickshawTracker;