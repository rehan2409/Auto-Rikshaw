import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import CustomerDashboard from './components/CustomerDashboard';
import DriverDashboard from './components/DriverDashboard';
import Auth from './components/Auth';
import DriverSignup from './components/DriverSignup';

function App() {
  const [userType, setUserType] = useState<'customer' | 'driver' | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (type: 'customer' | 'driver') => {
    setUserType(type);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setUserType(null);
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header isLoggedIn={isLoggedIn} userType={userType} onLogout={handleLogout} />
        <main className="flex-grow container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={
              isLoggedIn ? (
                userType === 'customer' ? <Navigate to="/customer" /> : <Navigate to="/driver" />
              ) : (
                <Auth onLogin={handleLogin} />
              )
            } />
            <Route path="/customer" element={
              isLoggedIn && userType === 'customer' ? <CustomerDashboard /> : <Navigate to="/" />
            } />
            <Route path="/driver" element={
              isLoggedIn && userType === 'driver' ? <DriverDashboard /> : <Navigate to="/" />
            } />
            <Route path="/driver/signup" element={<DriverSignup />} />
          </Routes>
        </main>
        <footer className="bg-blue-600 text-white py-4 text-center">
          <p>&copy; 2024 Ratnagiri Rickshaw App. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;