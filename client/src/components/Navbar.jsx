// src/components/Navbar.jsx
import React, { useState } from 'react';
import { NAV_ITEMS } from '../utils/constants';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      <nav className="w-full fixed top-0 left-0 bg-white/95 backdrop-blur-md shadow-md z-50 border-b border-cyan-100">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
          <div className="flex items-center">
            {/* Hamburger Menu Button - Now on LEFT */}
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
            <img
              src="/st_logo.jpeg"
              alt="Startup Healer Logo"
              className="h-12 w-auto mr-3"
            />
            {/* Brand name */}
            <span className="font-bold text-2xl bg-gradient-to-r from-cyan-600 via-emerald-600 to-green-600 bg-clip-text text-transparent">
              Startup Healer
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="space-x-6 hidden md:flex">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className="text-gray-700 hover:text-cyan-600 font-medium transition-colors"
              >
                {item.name}
              </Link>
            ))}
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

      {/* Sidebar - Full opacity, slides from LEFT */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-in-out md:hidden ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b border-cyan-200 bg-gradient-to-r from-cyan-50 to-emerald-50">
          <span className="font-bold text-xl bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
            Menu
          </span>
          <button
            onClick={closeSidebar}
            className="text-gray-700 hover:text-cyan-600 focus:outline-none"
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

        {/* Sidebar Navigation */}
        <nav className="flex flex-col p-4 space-y-2">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              onClick={closeSidebar}
              className="text-gray-700 hover:text-cyan-600 hover:bg-gradient-to-r hover:from-cyan-50 hover:to-emerald-50 font-medium py-3 px-4 rounded-lg transition-all border border-transparent hover:border-cyan-200"
            >
              {item.name}
            </Link>
          ))}
        </nav>
      </div>
    </>
  );
};

export default Navbar;
