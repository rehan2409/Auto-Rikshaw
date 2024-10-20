import React, { useState, useEffect } from 'react';
import { DollarSign, Clock, MapPin } from 'lucide-react';

const DriverDashboard: React.FC = () => {
  const [earnings, setEarnings] = useState(0);
  const [rides, setRides] = useState(0);
  const [isOnline, setIsOnline] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('');

  useEffect(() => {
    // Simulate fetching driver data
    setEarnings(Math.floor(Math.random() * 1000));
    setRides(Math.floor(Math.random() * 10));
    setCurrentLocation('Ratnagiri City Center');
  }, []);

  const handleToggleOnline = () => {
    setIsOnline(!isOnline);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Driver Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center mb-2">
            <DollarSign className="text-green-500 mr-2" size={24} />
            <h3 className="text-lg font-semibold">Today's Earnings</h3>
          </div>
          <p className="text-2xl font-bold">₹{earnings}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center mb-2">
            <Clock className="text-blue-500 mr-2" size={24} />
            <h3 className="text-lg font-semibold">Rides Completed</h3>
          </div>
          <p className="text-2xl font-bold">{rides}</p>
        </div>
        <div className="bg-white p-4 rounded shadow">
          <div className="flex items-center mb-2">
            <MapPin className="text-red-500 mr-2" size={24} />
            <h3 className="text-lg font-semibold">Current Location</h3>
          </div>
          <p className="text-lg">{currentLocation}</p>
        </div>
      </div>
      <div className="bg-white p-6 rounded shadow">
        <h3 className="text-xl font-semibold mb-4">Go Online</h3>
        <p className="mb-4">
          {isOnline
            ? "You're currently online and available for rides."
            : "You're offline. Go online to start receiving ride requests."}
        </p>
        <button
          onClick={handleToggleOnline}
          className={`py-2 px-4 rounded font-bold ${
            isOnline
              ? 'bg-red-500 hover:bg-red-700 text-white'
              : 'bg-green-500 hover:bg-green-700 text-white'
          }`}
        >
          {isOnline ? 'Go Offline' : 'Go Online'}
        </button>
      </div>
    </div>
  );
};

export default DriverDashboard;