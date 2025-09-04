import React from 'react';
import { NAV_ITEMS } from '../utils/constants';
import { Link } from 'react-router-dom';

const Navbar: React.FC = () => {
  return (
    <nav className="w-full fixed top-0 left-0 bg-gray-900 shadow z-50">
      <div className="max-w-7xl mx-auto px-4 flex justify-between items-center h-16">
        <div className="flex items-center">
          {/* Logo thoda bada */}
          <img
            src="/st_logo.jpeg"
            alt="Startup Healer Logo"
            className="h-12 w-auto mr-3"
          />
          {/* Brand name ka size thoda bada */}
          <span className="font-bold text-2xl text-white">
            Startup Healer
          </span>
        </div>
        <div className="space-x-6 hidden md:flex">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-gray-200 hover:text-blue-400 font-medium transition-colors"
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
