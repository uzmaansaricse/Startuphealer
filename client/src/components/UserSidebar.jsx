// src/components/UserSidebar.jsx
import React, { useState, useEffect } from 'react';
import { FaUser, FaCog, FaQuestionCircle, FaPhoneAlt, FaBars, FaTimes, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { apiConnector } from '../services/apiConnector';
import { profileEndpoints } from '../services/api';
import { setRole, setSignupData, setToken } from '../slices/authSlice';
import { toast } from 'react-hot-toast';


const UserSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    image: '',
  });
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);


  const sidebar_items = [
    { name: 'My Profile', href: '/user/profile', icon: <FaUser /> },
    { name: 'Services', href: '/user/services', icon: <FaCog /> },
    { name: 'Help', href: '/user/help', icon: <FaQuestionCircle /> },
    { name: 'Contact', href: '/user/contact', icon: <FaPhoneAlt /> },
  ];


  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        setLoading(true);
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
            image: user.image || '',
          });
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      } finally {
        setLoading(false);
      }
    };


    if (token) {
      fetchUserData();
      setIsLoggedIn(true);
    }
  }, [token]);


  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };


  const closeSidebar = () => {
    setIsOpen(false);
  };


  const handleLogout = () => {
    dispatch(setToken(null));
    dispatch(setSignupData(null));
    dispatch(setRole(null))
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.clear();
    setIsLoggedIn(false);
    toast.success('Logged out successfully!');
    navigate('/');
    closeSidebar();
  };


  const SidebarContent = () => (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <div className="p-6 border-b-2 border-cyan-100 flex-shrink-0">
        {/* Logo/Brand */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl lg:text-2xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
            StartupHealer
          </h2>
          {/* Close button for mobile */}
          <button
            onClick={toggleSidebar}
            className="lg:hidden text-gray-500 hover:text-cyan-600 transition-colors"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>


        {/* User Info Section */}
        {loading ? (
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-xl">
            <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-full bg-gradient-to-br from-cyan-200 to-emerald-200 flex-shrink-0 flex items-center justify-center border-2 border-cyan-300 animate-pulse">
              <FaUser className="text-lg lg:text-xl text-cyan-700" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs lg:text-sm text-gray-500">Loading...</p>
              <p className="font-bold text-gray-800 text-sm lg:text-base truncate">User</p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-3 p-4 bg-gradient-to-r from-cyan-50 to-emerald-50 rounded-xl">
            <div className="w-10 lg:w-12 h-10 lg:h-12 rounded-full bg-gradient-to-br from-cyan-200 to-emerald-200 flex-shrink-0 flex items-center justify-center border-2 border-cyan-300 overflow-hidden">
              {userData.image ? (
                <img
                  src={userData.image}
                  alt={userData.firstName}
                  className="w-full h-full object-cover"
                />
              ) : (
                <FaUser className="text-lg lg:text-xl text-cyan-700" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs lg:text-sm text-gray-500">Hello,</p>
              <p className="font-bold text-gray-800 text-sm lg:text-base truncate">
                {userData.firstName} {userData.lastName}
              </p>
            </div>
          </div>
        )}
      </div>


      {/* Navigation Menu */}
      <nav className="p-3 lg:p-4 flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {sidebar_items.map((item, index) => {
            const isActive = location.pathname === item.href;


            return (
              <motion.li
                key={item.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 lg:gap-4 px-3 lg:px-4 py-2 lg:py-3 rounded-lg
                    transition-all duration-200
                    ${
                      isActive
                        ? 'bg-gradient-to-r from-cyan-50 to-emerald-50 text-cyan-700 font-semibold border-l-4 border-cyan-600 shadow-sm'
                        : 'text-gray-700 hover:bg-gray-50 hover:translate-x-1'
                    }
                  `}
                >
                  <span className="text-lg lg:text-xl flex-shrink-0">{item.icon}</span>
                  <span className="text-sm lg:text-base truncate">{item.name}</span>
                </Link>
              </motion.li>
            );
          })}
        </ul>
      </nav>


      {/* Logout Button */}
      <div className="p-3 lg:p-4 border-t-2 border-cyan-100 flex-shrink-0">
        <motion.button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 px-3 lg:px-4 py-2 lg:py-3 bg-gradient-to-r from-red-500 to-orange-500 text-white font-semibold text-sm lg:text-base rounded-lg hover:from-red-600 hover:to-orange-600 transition-all shadow-md hover:shadow-lg"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <FaSignOutAlt className="text-lg" />
          <span>Logout</span>
        </motion.button>
      </div>


      {/* Footer Section */}
      <div className="p-4 lg:p-6 border-t-2 border-cyan-100 bg-gradient-to-r from-cyan-50/50 to-emerald-50/50 flex-shrink-0">
        <p className="text-xs text-gray-500 text-center">
          © 2025 StartupHealer
        </p>
      </div>
    </div>
  );


  return (
    <>
      {/* Hamburger Button - Only visible on mobile/tablet */}
      <button
        onClick={toggleSidebar}
        className="lg:hidden fixed top-1 left-2 z-50 p-3 bg-white rounded-lg shadow-lg border-2 border-cyan-300 hover:bg-cyan-50 transition-all"
        aria-label="Toggle Menu"
      >
        <motion.div
          animate={{ rotate: isOpen ? 90 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? (
            <FaTimes className="text-2xl text-cyan-600" />
          ) : (
            <FaBars className="text-2xl text-cyan-600" />
          )}
        </motion.div>
      </button>


      {/* Overlay - Only on mobile when sidebar is open */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden fixed inset-0 bg-black/50 z-40"
            onClick={toggleSidebar}
          />
        )}
      </AnimatePresence>


      {/* Mobile Sidebar - Animated slide-in (only on small screens) */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{
              type: 'spring',
              stiffness: 300,
              damping: 30,
            }}
            className="lg:hidden fixed top-0 left-0 h-screen w-[80vw] sm:w-[60vw] bg-white shadow-2xl z-40 overflow-y-auto"
          >
            <SidebarContent />
          </motion.aside>
        )}
      </AnimatePresence>


      {/* Desktop Sidebar - Always visible (only on large screens, no animation) */}
      <aside className="hidden lg:flex lg:flex-col lg:flex-shrink-0 w-[20vw] h-screen bg-white shadow-lg border-r-2 border-cyan-100 overflow-y-auto">
        <SidebarContent />
      </aside>
    </>
  );
};


export default UserSidebar;
