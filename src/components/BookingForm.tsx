import React, { useState } from 'react';
import { MapPin, Navigation, DollarSign } from 'lucide-react';

interface BookingFormProps {
  onBooking: () => void;
}

const BookingForm: React.FC<BookingFormProps> = ({ onBooking }) => {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [fare, setFare] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would calculate the fare based on the distance
    const estimatedFare = Math.floor(Math.random() * (200 - 50 + 1) + 50);
    setFare(estimatedFare);
  };

  const confirmBooking = () => {
    console.log('Booking confirmed:', { pickup, dropoff, fare });
    onBooking();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
      <div className="mb-6">
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
      {fare > 0 ? (
        <div className="mb-6">
          <p className="text-lg font-bold">Estimated Fare: ₹{fare}</p>
          <button
            onClick={confirmBooking}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4"
            type="button"
          >
            Confirm Booking
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Get Fare Estimate
          </button>
        </div>
      )}
    </form>
  );
};

export default BookingForm;