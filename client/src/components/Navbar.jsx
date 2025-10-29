// src/components/Navbar.jsx
import React, { useState, useEffect } from 'react';
import { NAV_ITEMS, SIDEBAR_ITEMS } from '../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setSignupData, setToken } from '../slices/authSlice';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const dispatch = useDispatch();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setSignupData(null));
    localStorage.removeItem('token');
    localStorage.clear();
    setIsLoggedIn(false);
    toast.success('Logged out successfully!');
    navigate('/');
    closeSidebar();
  };

  const handleLogin = () => {
    navigate('/login');
    closeSidebar();
  };

  const handleProfile = () => {
    navigate('/profile');
    closeSidebar();
  };

  useEffect(() => {
    setIsLoggedIn(!!token);
  }, [token]);

  return (
    <>
      {/* Main Navbar */}
      <nav className="w-full fixed top-0 left-0 bg-white shadow-md z-50 border-b border-cyan-100">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Hamburger Menu */}
            <button
              onClick={toggleSidebar}
              className="md:hidden flex flex-col justify-center items-center w-10 h-10 space-y-1.5 focus:outline-none mr-3"
              aria-label="Toggle menu"
            >
              <span
                className={`block w-6 h-0.5 bg-cyan-600 transition-all duration-300 ${
                  isSidebarOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-emerald-600 transition-all duration-300 ${
                  isSidebarOpen ? 'opacity-0' : ''
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-green-600 transition-all duration-300 ${
                  isSidebarOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              ></span>
            </button>

            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/st_logo.jpeg"
                alt="StartupHealer Logo"
                className="h-12 w-auto mr-3"
              />
              <span className="font-bold text-2xl bg-gradient-to-r from-cyan-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">
                StartupHealer
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="space-x-6 hidden md:flex items-center">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-cyan-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}

            {/* Desktop Auth Buttons */}
            {isLoggedIn ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={handleProfile}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg"
                >
                  <FaUser className="text-sm" />
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-white border-2 border-cyan-500 text-cyan-600 font-semibold rounded-full hover:bg-cyan-50 transition-all shadow-md"
                >
                  <FaSignOutAlt className="text-sm" />
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center gap-2 px-6 py-2 bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:via-emerald-600 hover:to-green-600 transition-all shadow-md hover:shadow-lg"
              >
                <FaSignInAlt className="text-sm" />
                Login
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden transition-opacity duration-300"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="p-4 border-b-2 border-cyan-200 bg-gradient-to-r from-cyan-50 to-emerald-50">
          <div className="flex items-center justify-between mb-3">
            <Link to="/" onClick={closeSidebar} className="flex items-center">
              <img
                src="/st_logo.jpeg"
                alt="StartupHealer Logo"
                className="h-10 w-auto mr-2"
              />
              <span className="font-bold text-lg bg-gradient-to-r from-cyan-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">
                StartupHealer
              </span>
            </Link>
            <button
              onClick={closeSidebar}
              className="text-gray-700 hover:text-cyan-600 focus:outline-none transition-colors"
              aria-label="Close menu"
            >
              <svg
                className="w-6 h-6 "
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div className="text-xs text-gray-600 font-medium">
            Empowering Startups
          </div>
        </div>

        {/* Sidebar Navigation */}
        <nav className="flex flex-col p-4 space-y-2">
          {SIDEBAR_ITEMS.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={closeSidebar}
              className="text-gray-700 hover:text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-emerald-50 font-medium py-3 px-4 rounded-lg transition-all border border-transparent hover:border-cyan-200"
            >
              {item.name}
            </Link>
          ))}

          {/* Sidebar Auth Buttons */}
          <div className="pt-4 border-t border-cyan-200 mt-4 space-y-2">
            {isLoggedIn ? (
              <>
                <button
                  onClick={handleProfile}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-md"
                >
                  <FaUser />
                  View Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border-2 border-cyan-500 text-cyan-600 font-semibold rounded-lg hover:bg-cyan-50 transition-all"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 text-white font-semibold rounded-lg hover:from-cyan-600 hover:via-emerald-600 hover:to-green-600 transition-all shadow-md"
              >
                <FaSignInAlt />
                Login
              </button>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Navbar;
