// src/components/AdminHeader.jsx
import React from 'react';
import { Bell, Search, LogOut } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const AdminHeader = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Add logout logic here
     dispatch(setToken(null));
        dispatch(setSignupData(null));
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.clear();
        setIsLoggedIn(false);
        setUserData({
          firstName: '',
          lastName: '',
          email: '',
          image: '',
        });
        toast.success('Logged out successfully!');
    navigate('/login');
  };

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        {/* Search Bar */}
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              size={20}
            />
            <input
              type="text"
              placeholder="Search users, requests, analytics..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Right Side Actions */}
        <div className="flex items-center space-x-4 ml-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell size={20} />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
          </button>

          {/* Logout */}
          <button
            onClick={handleLogout}
            className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <LogOut size={20} />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
