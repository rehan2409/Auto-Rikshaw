import React, { useState } from 'react';
import { Star } from 'lucide-react';

interface DriverRatingProps {
  onRatingComplete: () => void;
}

const DriverRating: React.FC<DriverRatingProps> = ({ onRatingComplete }) => {
  const [rating, setRating] = useState(0);

  const handleRating = (value: number) => {
    setRating(value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Driver rating:', rating);
    onRatingComplete();
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h2 className="text-2xl font-bold mb-4">Rate your driver</h2>
      <div className="flex mb-4">
        {[1, 2, 3, 4, 5].map((value) => (
          <button
            key={value}
            type="button"
            onClick={() => handleRating(value)}
            className="mr-2 focus:outline-none"
          >
            <Star
              size={32}
              className={value <= rating ? 'text-yellow-400' : 'text-gray-300'}
              fill={value <= rating ? 'currentColor' : 'none'}
            />
          </button>
        ))}
      </div>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Submit Rating
      </button>
    </form>
  );
};

export default DriverRating;