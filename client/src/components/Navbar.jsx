// src/components/Navbar.jsx
import React from 'react';
import { NAV_ITEMS } from '../utils/constants';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="w-full fixed top-0 left-0 bg-white/95 backdrop-blur-md shadow-md z-50 border-b border-emerald-100">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          {/* Logo */}
          <img
            src="/st_logo.jpeg"
            alt="Startup Healer Logo"
            className="h-12 w-auto mr-3"
          />
          {/* Brand name */}
          <span className="font-bold text-2xl text-emerald-700">
            Startup Healer
          </span>
        </div>
        <div className="space-x-6 hidden md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-700 hover:text-emerald-600 font-medium transition-colors"
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
