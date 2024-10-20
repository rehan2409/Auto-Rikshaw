import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';

interface AuthProps {
  onLogin: (type: 'customer' | 'driver') => void;
}

const Auth: React.FC<AuthProps> = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [userType, setUserType] = useState<'customer' | 'driver'>('customer');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would validate credentials here
    console.log('Login attempt:', { username, password, userType });
    onLogin(userType);
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="userType">
            I am a:
          </label>
          <div className="flex justify-between">
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded ${userType === 'customer' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setUserType('customer')}
            >
              Customer
            </button>
            <button
              type="button"
              className={`flex-1 py-2 px-4 rounded ml-2 ${userType === 'driver' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              onClick={() => setUserType('driver')}
            >
              Driver
            </button>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <div className="flex items-center border rounded">
            <User className="ml-2 text-gray-400" size={20} />
            <input
              className="appearance-none border-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <div className="flex items-center border rounded">
            <Lock className="ml-2 text-gray-400" size={20} />
            <input
              className="appearance-none border-none w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign In
          </button>
          {userType === 'driver' && (
            <Link to="/driver/signup" className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800">
              Sign Up as Driver
            </Link>
          )}
        </div>
      </form>
    </div>
  );
};

export default Auth;