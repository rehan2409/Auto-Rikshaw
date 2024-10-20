import React, { useState } from 'react';
import { MapPin, Navigation } from 'lucide-react';
import Map from './Map';

const CustomerDashboard: React.FC = () => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [fare, setFare] = useState(0);
  const [eta, setEta] = useState(0);
  const [bookingStatus, setBookingStatus] = useState<'idle' | 'estimating' | 'confirmed'>('idle');

  const handleEstimate = async () => {
    setBookingStatus('estimating');
    // In a real app, we would call an API to get the fare estimate and ETA
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulating API call
    setFare(Math.floor(Math.random() * (200 - 50 + 1) + 50));
    setEta(Math.floor(Math.random() * (30 - 5 + 1) + 5));
    setBookingStatus('idle');
  };

  const handleBooking = () => {
    setBookingStatus('confirmed');
    // In a real app, we would send the booking details to the server
    console.log('Booking confirmed:', { pickup, dropoff, fare, eta });
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/2 pr-4">
        <h2 className="text-2xl font-bold mb-4">Book a Rickshaw</h2>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pickup">
            Pickup Location
          </label>
          <div className="flex items-center border rounded">
            <MapPin className="ml-2 text-gray-400" size={20} />
            <input
              className="appearance-none border-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="pickup"
              type="text"
              placeholder="Enter pickup location"
              value={pickup}
              onChange={(e) => setPickup(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="dropoff">
            Drop-off Location
          </label>
          <div className="flex items-center border rounded">
            <Navigation className="ml-2 text-gray-400" size={20} />
            <input
              className="appearance-none border-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="dropoff"
              type="text"
              placeholder="Enter drop-off location"
              value={dropoff}
              onChange={(e) => setDropoff(e.target.value)}
              required
            />
          </div>
        </div>
        {bookingStatus === 'idle' && (
          <button
            onClick={handleEstimate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            disabled={!pickup || !dropoff}
          >
            Get Estimate
          </button>
        )}
        {bookingStatus === 'estimating' && (
          <p className="text-blue-500 font-bold">Calculating estimate...</p>
        )}
        {fare > 0 && eta > 0 && (
          <div className="mt-4">
            <p className="text-lg font-bold">Estimated Fare: ₹{fare}</p>
            <p className="text-lg font-bold">Estimated Time of Arrival: {eta} minutes</p>
            <button
              onClick={handleBooking}
              className="mt-2 bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Confirm Booking
            </button>
          </div>
        )}
        {bookingStatus === 'confirmed' && (
          <p className="mt-4 text-green-500 font-bold">Booking confirmed! Your rickshaw is on the way.</p>
        )}
      </div>
      <div className="md:w-1/2 mt-4 md:mt-0">
        <Map pickup={pickup} dropoff={dropoff} />
      </div>
    </div>
  );
};

export default CustomerDashboard;