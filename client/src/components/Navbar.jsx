// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { NAV_ITEMS, SIDEBAR_ITEMS } from '../utils/constants';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaUser, FaSignOutAlt, FaSignInAlt, FaCog, FaQuestionCircle, FaPhoneAlt, FaChevronDown, FaBars, FaTimes } from 'react-icons/fa';
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
  const [scrolled, setScrolled] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: '',
  });
  const [loadingUserData, setLoadingUserData] = useState(false);
  
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();
  const token = useSelector(state => state.auth.token);
  const role = useSelector(state => state.auth.role);
  const dispatch = useDispatch();

  const userMenuItems = [
    { name: 'My Profile', href: '/user/profile', icon: <FaUser /> },
    { name: 'Services', href: '/user/services', icon: <FaCog /> },
    { name: 'Help', href: '/user/help', icon: <FaQuestionCircle /> },
    { name: 'Contact', href: '/user/contact', icon: <FaPhoneAlt /> },
  ];

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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

  // Close sidebar on route change
  useEffect(() => {
    closeSidebar();
  }, [location]);

  // Prevent body scroll when sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isSidebarOpen]);

  const isActiveLink = (href) => location.pathname === href;

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`w-full fixed top-0 left-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg border-b border-cyan-200'
            : 'bg-white shadow-md border-b border-cyan-100'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Left Section: Logo */}
            <div className="flex items-center gap-4">
              {/* Hamburger Menu - Only for non-User roles */}
              {role !== 'User' && (
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={toggleSidebar}
                  className="md:hidden relative w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gradient-to-r hover:from-cyan-50 hover:to-emerald-50 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all"
                  aria-label="Toggle menu"
                  aria-expanded={isSidebarOpen}
                >
                  <div className="w-6 h-5 flex flex-col justify-between">
                    <motion.span
                      animate={isSidebarOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="block w-full h-0.5 bg-gradient-to-r from-cyan-600 to-emerald-600 rounded-full"
                    />
                    <motion.span
                      animate={isSidebarOpen ? { opacity: 0, x: -10 } : { opacity: 1, x: 0 }}
                      transition={{ duration: 0.3 }}
                      className="block w-full h-0.5 bg-gradient-to-r from-emerald-600 to-green-600 rounded-full"
                    />
                    <motion.span
                      animate={isSidebarOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="block w-full h-0.5 bg-gradient-to-r from-green-600 to-cyan-600 rounded-full"
                    />
                  </div>
                </motion.button>
              )}

              {/* Logo */}
              <Link to="/" className="flex items-center gap-3 group">
                <motion.img
                  
                  src="/st_logo1.png"
                  alt="StartupHealer Logo"
                  className="h-10 ml-12 lg:ml-0 lg:h-12 rounded-3xl   "
                />
                
              </Link>
            </div>

            {/* Center Section: Desktop Navigation */}
            <div className="hidden md:flex items-center gap-1 lg:gap-2">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`relative px-3 lg:px-4 py-2 text-sm lg:text-base font-medium rounded-lg transition-all group ${
                    isActiveLink(item.href)
                      ? 'text-cyan-600'
                      : 'text-gray-700 hover:text-cyan-600'
                  }`}
                >
                  {item.name}
                  <motion.span
                    className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-cyan-500 to-emerald-500 rounded-full ${
                      isActiveLink(item.href) ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                    }`}
                    layoutId={isActiveLink(item.href) ? 'activeNav' : undefined}
                    transition={{ duration: 0.3 }}
                  />
                </Link>
              ))}
            </div>

            {/* Right Section: Auth Buttons */}
            <div className="flex items-center gap-3">
              {isLoggedIn && role === 'User' ? (
                // User Dropdown Menu
                <div className="relative" ref={dropdownRef}>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={toggleDropdown}
                    className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 focus:ring-offset-2"
                  >
                    <div className="w-7 h-7 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                      {userData.image ? (
                        <img
                          src={userData.image}
                          alt={userData.firstName}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <FaUser className="text-sm" />
                      )}
                    </div>
                    <span className="hidden sm:inline text-sm lg:text-base">
                      {userData?.firstName || 'User'}
                    </span>
                    <motion.div
                      animate={{ rotate: isDropdownOpen ? 180 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaChevronDown className="text-xs" />
                    </motion.div>
                  </motion.button>

                  {/* Dropdown Menu */}
                  <AnimatePresence>
                    {isDropdownOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -10, scale: 0.95 }}
                        transition={{ duration: 0.2, ease: 'easeOut' }}
                        className="absolute right-0 mt-3 w-64 bg-white rounded-2xl shadow-2xl border-2 border-cyan-200 overflow-hidden"
                      >
                        {/* User Info Header */}
                        <div className="px-4 py-4 bg-gradient-to-r from-cyan-50 to-emerald-50 border-b-2 border-cyan-100">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center border-2 border-white shadow-md overflow-hidden flex-shrink-0">
                              {userData.image ? (
                                <img
                                  src={userData.image}
                                  alt={userData.firstName}
                                  className="w-full h-full object-cover"
                                />
                              ) : (
                                <FaUser className="text-white text-lg" />
                              )}
                            </div>
                            <div className="min-w-0 flex-1">
                              <p className="font-bold text-gray-800 text-base truncate">
                                {userData?.firstName} {userData?.lastName}
                              </p>
                              <p className="text-xs text-gray-600 truncate mt-0.5">
                                {userData?.email}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Menu Items */}
                        <div className="py-2">
                          {userMenuItems.map((item) => (
                            <motion.button
                              key={item.name}
                              onClick={() => handleMenuItemClick(item.href)}
                              className="w-full flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-emerald-50 hover:text-cyan-700 transition-all text-left"
                              whileHover={{ x: 5 }}
                              transition={{ duration: 0.2 }}
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
                          whileHover={{ backgroundColor: '#fee2e2' }}
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
                <div className="flex items-center gap-2 lg:gap-3">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleProfile}
                    className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-md hover:shadow-lg text-sm lg:text-base"
                  >
                    <FaUser className="text-sm" />
                    <span className="hidden sm:inline">Profile</span>
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogout}
                    className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-white border-2 border-cyan-500 text-cyan-600 font-semibold rounded-full hover:bg-cyan-50 transition-all shadow-md text-sm lg:text-base"
                  >
                    <FaSignOutAlt className="text-sm" />
                    <span className="hidden sm:inline">Logout</span>
                  </motion.button>
                </div>
              ) : (
                // Not logged in
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleLogin}
                  className="flex items-center gap-2 px-4 lg:px-6 py-2 bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:via-emerald-600 hover:to-green-600 transition-all shadow-md hover:shadow-lg text-sm lg:text-base"
                >
                  <FaSignInAlt className="text-sm" />
                  <span>Login</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            onClick={closeSidebar}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed top-0 left-0 h-full w-80 bg-white shadow-2xl z-50 md:hidden overflow-y-auto"
          >
            {/* Sidebar Header */}
            <div className="sticky top-0 bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 p-4 flex justify-between items-center shadow-md">
              <Link to="/" onClick={closeSidebar} className="flex items-center gap-3">
               
                <span className="font-bold text-2xl text-white absolute left-1/2 -translate-x-1/2 ">
                  StartupHealer
                </span>
              </Link>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={closeSidebar}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 text-white transition-all"
                aria-label="Close menu"
              >
                <FaTimes className="text-xl" />
              </motion.button>
            </div>

            {/* Sidebar Navigation */}
            <nav className="flex flex-col p-4 space-y-1">
              {SIDEBAR_ITEMS.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    to={item.href}
                    onClick={closeSidebar}
                    className={`flex items-center text-gray-700 hover:text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-emerald-50 font-medium py-3 px-4 rounded-xl transition-all border-2 ${
                      isActiveLink(item.href)
                        ? 'border-cyan-300 bg-gradient-to-r from-cyan-50 to-emerald-50 text-cyan-600'
                        : 'border-transparent'
                    }`}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}

              {/* Sidebar Auth Section */}
              <div className="pt-4 border-t-2 border-cyan-200 mt-4 space-y-2">
                {isLoggedIn && role === 'User' ? (
                  <>
                    {/* User Info in Sidebar */}
                    <div className="px-4 py-3 bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-xl mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-cyan-400 to-emerald-400 flex items-center justify-center border-2 border-white shadow-md overflow-hidden flex-shrink-0">
                          {userData.image ? (
                            <img
                              src={userData.image}
                              alt={userData.firstName}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FaUser className="text-white text-lg" />
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-bold text-gray-800 text-sm truncate">
                            {userData?.firstName} {userData?.lastName}
                          </p>
                          <p className="text-xs text-gray-600 truncate">
                            {userData?.email}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* User Menu Items in Mobile Sidebar */}
                    <div className="space-y-1 mb-3">
                      {userMenuItems.map((item) => (
                        <motion.button
                          key={item.name}
                          onClick={() => handleMenuItemClick(item.href)}
                          className="flex items-center gap-3 w-full px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-emerald-50 hover:text-cyan-700 font-medium rounded-xl transition-all"
                          whileHover={{ x: 5 }}
                        >
                          <span className="text-lg text-cyan-600">{item.icon}</span>
                          <span>{item.name}</span>
                        </motion.button>
                      ))}
                    </div>

                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold rounded-xl hover:from-red-600 hover:to-orange-600 transition-all shadow-md"
                    >
                      <FaSignOutAlt />
                      Logout
                    </motion.button>
                  </>
                ) : isLoggedIn ? (
                  <>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleProfile}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-md"
                    >
                      <FaUser />
                      View Profile
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.95 }}
                      onClick={handleLogout}
                      className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-white border-2 border-cyan-500 text-cyan-600 font-semibold rounded-xl hover:bg-cyan-50 transition-all"
                    >
                      <FaSignOutAlt />
                      Logout
                    </motion.button>
                  </>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={handleLogin}
                    className="flex items-center justify-center gap-2 w-full px-4 py-3 bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:via-emerald-600 hover:to-green-600 transition-all shadow-md"
                  >
                    <FaSignInAlt />
                    Login
                  </motion.button>
                )}
              </div>

              {/* Bottom Logo Section */}
              <div className="mt-5">
                <div className="px-6 py-  from-cyan-50 to-emerald-50 rounded-xl flex justify-center">
                  <img
                    src="/st_logo1.png"
                    alt="StartupHealer Logo"
                    className="w-36 h-auto rounded-lg "
                  />
                </div>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 lg:h-20" />
    </>
  );
};

export default Navbar;
