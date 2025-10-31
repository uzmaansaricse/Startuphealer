// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { NAV_ITEMS, SIDEBAR_ITEMS } from '../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaSignInAlt, FaCog, FaQuestionCircle, FaPhoneAlt, FaChevronDown } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { setSignupData, setToken } from '../slices/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { apiConnector } from '../services/apiConnector';
import { profileEndpoints } from '../services/api';


const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: '',
  });
  const [loadingUserData, setLoadingUserData] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const token = useSelector(state => state.auth.token);
  const role = useSelector(state => state.auth.role);
  const dispatch = useDispatch();


  const userMenuItems = [
    { name: 'My Profile', href: '/user/profile', icon: <FaUser /> },
    { name: 'Services', href: '/user/services', icon: <FaCog /> },
    { name: 'Help', href: '/user/help', icon: <FaQuestionCircle /> },
    { name: 'Contact', href: '/user/contact', icon: <FaPhoneAlt /> },
  ];


  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoadingUserData(true);
        const response = await apiConnector(
          'GET',
          profileEndpoints.GET_USER_DETAILS_API,
          null,
          {
            Authorization: `Bearer ${token}`
          }
        );

        if (response.data.success) {
          const user = response.data.data;
          setUserData({
            firstName: user.firstName || '',
            lastName: user.lastName || '',
            email: user.email || '',
            image: user.image || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoadingUserData(false);
      }
    };

    if (token && isLoggedIn) {
      fetchUserData();
    }
  }, [token, isLoggedIn]);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };


  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };


  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };


  const handleLogout = () => {
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
    navigate('/');
    closeSidebar();
    closeDropdown();
  };


  const handleLogin = () => {
    navigate('/login');
    closeSidebar();
    closeDropdown();
  };


  const handleProfile = () => {
    navigate('/user/profile');
    closeSidebar();
    closeDropdown();
  };


  const handleMenuItemClick = (href) => {
    navigate(href);
    closeDropdown();
  };


  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);


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
            {
              (role !== 'User') && (<button
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
            </button>)
            }


            {/* Logo */}
            <Link to="/" className="flex items-center">
              <img
                src="/st_logo.jpeg"
                alt="StartupHealer Logo"
                className="h-12 w-auto mr-3 ml-[50px] lg:ml-0"
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


            {/* Desktop Auth Section */}
            {isLoggedIn && role === 'User' ? (
              // User Dropdown Menu
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleDropdown}
                  className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg"
                >
                  <FaUser className="text-sm" />
                  <span>{userData?.firstName || 'User'}</span>
                  <FaChevronDown className={`text-xs transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>


                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isDropdownOpen && (
                    <motion.div
                      ref={dropdownRef}
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-2xl border-2 border-cyan-200 overflow-hidden z-50"
                    >
                      {/* User Info Header */}
                      <div className="px-4 py-4 bg-gradient-to-r from-cyan-50 to-emerald-50 border-b-2 border-cyan-100">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-300 to-emerald-300 flex items-center justify-center border-2 border-cyan-400 overflow-hidden flex-shrink-0">
                            {userData.image ? (
                              <img
                                src={userData.image}
                                alt={userData.firstName}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <FaUser className="text-white" />
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <p className="font-semibold text-gray-800 text-sm truncate">
                              {userData?.firstName} {userData?.lastName}
                            </p>
                            <p className="text-xs text-gray-600 truncate">{userData?.email}</p>
                          </div>
                        </div>
                      </div>


                      {/* Menu Items */}
                      <div className="py-2">
                        {userMenuItems.map((item, index) => (
                          <motion.button
                            key={item.name}
                            onClick={() => handleMenuItemClick(item.href)}
                            className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-emerald-50 hover:text-cyan-700 transition-all"
                            whileHover={{ x: 5 }}
                          >
                            <span className="text-lg text-cyan-600">{item.icon}</span>
                            <span className="font-medium text-sm">{item.name}</span>
                          </motion.button>
                        ))}
                      </div>


                      {/* Divider */}
                      <div className="border-t-2 border-cyan-100" />


                      {/* Logout Button */}
                      <motion.button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-50 to-orange-50 text-red-600 hover:from-red-100 hover:to-orange-100 font-semibold text-sm transition-all"
                        whileHover={{ backgroundColor: '#fecaca' }}
                      >
                        <FaSignOutAlt />
                        Logout
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : isLoggedIn ? (
              // Non-user roles - Show profile and logout buttons
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
              // Not logged in
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
                className="w-6 h-6"
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


          {/* Sidebar Auth Section */}
          <div className="pt-4 border-t border-cyan-200 mt-4 space-y-2">
            {isLoggedIn && role === 'User' ? (
              <>
                {/* User Menu Items in Mobile Sidebar */}
                <div className="space-y-2 mb-4">
                  {userMenuItems.map((item) => (
                    <button
                      key={item.name}
                      onClick={() => handleMenuItemClick(item.href)}
                      className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-emerald-50 hover:text-cyan-700 font-medium rounded-lg transition-all"
                    >
                      <span className="text-lg">{item.icon}</span>
                      <span>{item.name}</span>
                    </button>
                  ))}
                </div>


                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-lg hover:from-red-600 hover:to-orange-600 transition-all"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : isLoggedIn ? (
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
