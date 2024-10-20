import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, LogOut } from 'lucide-react';

interface HeaderProps {
  isLoggedIn: boolean;
  userType: 'customer' | 'driver' | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, userType, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <img src="/rickshaw-logo.svg" alt="Ratnagiri Rickshaw" className="h-8 w-8 mr-2" />
          <h1 className="text-xl font-bold">Ratnagiri Rickshaw</h1>
        </div>
        <nav className="hidden md:block">
          <ul className="flex space-x-4">
            <li><Link to="/" className="hover:text-blue-200">Home</Link></li>
            {isLoggedIn && userType === 'customer' && (
              <li><Link to="/customer" className="hover:text-blue-200">Dashboard</Link></li>
            )}
            {isLoggedIn && userType === 'driver' && (
              <li><Link to="/driver" className="hover:text-blue-200">Dashboard</Link></li>
            )}
            <li><a href="#" className="hover:text-blue-200">About</a></li>
            <li><a href="#" className="hover:text-blue-200">Contact</a></li>
            {isLoggedIn && (
              <li>
                <button onClick={onLogout} className="flex items-center hover:text-blue-200">
                  <LogOut size={18} className="mr-1" /> Logout
                </button>
              </li>
            )}
          </ul>
        </nav>
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden mt-4">
          <ul className="flex flex-col space-y-2">
            <li><Link to="/" className="block py-2 hover:bg-blue-700">Home</Link></li>
            {isLoggedIn && userType === 'customer' && (
              <li><Link to="/customer" className="block py-2 hover:bg-blue-700">Dashboard</Link></li>
            )}
            {isLoggedIn && userType === 'driver' && (
              <li><Link to="/driver" className="block py-2 hover:bg-blue-700">Dashboard</Link></li>
            )}
            <li><a href="#" className="block py-2 hover:bg-blue-700">About</a></li>
            <li><a href="#" className="block py-2 hover:bg-blue-700">Contact</a></li>
            {isLoggedIn && (
              <li>
                <button onClick={onLogout} className="w-full text-left flex items-center py-2 hover:bg-blue-700">
                  <LogOut size={18} className="mr-1" /> Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;