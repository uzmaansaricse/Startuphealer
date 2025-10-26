// src/pages/NotFound.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaExclamationTriangle } from 'react-icons/fa';
import bgimage from '../assets/StartupHealer.png';


const NotFound = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center mt-20 lg:mt-16"
      style={{
        backgroundImage: `url(${bgimage})`,
      }}
    >
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-cyan-50/40 to-emerald-50/50 backdrop-blur-sm" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        {/* Animated 404 Number */}
        <motion.div
          className="mb-8"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
        >
          <div className="relative">
            {/* Floating circles decoration */}
            <motion.div
              className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-full opacity-20"
              animate={{
                y: [0, -20, 0],
                scale: [1, 1.1, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-br from-emerald-400 to-green-400 rounded-full opacity-20"
              animate={{
                y: [0, 20, 0],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />

            {/* 404 Text */}
            <h1 className="text-[12rem] md:text-[16rem] font-extrabold leading-none">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-emerald-600 to-green-600 drop-shadow-2xl">
                404
              </span>
            </h1>
          </div>
        </motion.div>

        {/* Warning Icon */}
        <motion.div
          className="flex justify-center mb-6"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div
            className="w-20 h-20 bg-gradient-to-br from-cyan-100 via-emerald-100 to-green-100 rounded-full flex items-center justify-center shadow-xl"
            animate={{
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <FaExclamationTriangle className="text-4xl text-yellow-500" />
          </motion.div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mb-8"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Oops! <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600">Page Not Found</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
            The page you're looking for seems to have taken a detour. Don't worry, 
            we'll help you get back on track!
          </p>
        </motion.div>

        {/* Animated Search Icon */}
        <motion.div
          className="flex justify-center mb-8"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.7, duration: 0.5 }}
        >
          <motion.div
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <FaSearch className="text-6xl text-cyan-300" />
          </motion.div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.6 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/"
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 text-white font-bold rounded-full shadow-lg hover:from-cyan-600 hover:via-emerald-600 hover:to-green-600 transition-all duration-300"
            >
              <FaHome className="text-xl" />
              Back to Home
            </Link>
          </motion.div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              to="/services"
              className="inline-flex items-center gap-3 px-8 py-4 bg-white text-cyan-600 border-2 border-cyan-500 font-bold rounded-full shadow-lg hover:bg-cyan-50 transition-all duration-300"
            >
              Explore Services
            </Link>
          </motion.div>
        </motion.div>

        {/* Helpful Links */}
        <motion.div
          className="mt-12 pt-8 border-t-2 border-cyan-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
        >
          <p className="text-gray-600 mb-4 font-medium">Looking for something specific?</p>
          <div className="flex flex-wrap justify-center gap-4">
            {[
              { name: 'About Us', path: '/about' },
              { name: 'Services', path: '/services' },
              { name: 'Contact', path: '/contact' },
              { name: 'FAQ', path: '/faq' },
            ].map((link, index) => (
              <motion.div
                key={link.name}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1, duration: 0.4 }}
              >
                <Link
                  to={link.path}
                  className="px-6 py-2 bg-gradient-to-r from-cyan-100 to-emerald-100 text-cyan-700 font-semibold rounded-full hover:from-cyan-200 hover:to-emerald-200 transition-all duration-300 border border-cyan-300"
                >
                  {link.name}
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Floating Elements Animation */}
        <motion.div
          className="absolute top-20 left-10 w-16 h-16 bg-gradient-to-br from-cyan-300 to-teal-300 rounded-full opacity-30"
          animate={{
            y: [0, -30, 0],
            x: [0, 20, 0],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-20 h-20 bg-gradient-to-br from-emerald-300 to-green-300 rounded-full opacity-30"
          animate={{
            y: [0, 30, 0],
            x: [0, -20, 0],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 right-20 w-12 h-12 bg-gradient-to-br from-teal-300 to-emerald-300 rounded-full opacity-30"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="w-full h-full" style={{
          backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #10b981 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>
    </div>
  );
};

export default NotFound;
