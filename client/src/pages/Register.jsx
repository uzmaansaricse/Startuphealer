// src/pages/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { apiConnector } from '../services/apiConnector';
import { endpoints } from '../services/api';
import { toast } from 'react-hot-toast';
import bgimage from '../assets/StartupHealer.png';

const Register = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState('register');
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    contactNumber: '',
  });

  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validateForm = () => {
    const { firstName, lastName, email, password, confirmPassword, contactNumber } = formData;

    if (!firstName.trim() || !lastName.trim()) {
      toast.error('Please enter your full name');
      return false;
    }

    if (!email.trim() || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      toast.error('Please enter a valid email address');
      return false;
    }

    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return false;
    }

    if (!/^\d{10}$/.test(contactNumber)) {
      toast.error('Please enter a valid 10-digit contact number');
      return false;
    }

    return true;
  };

  const handleSendOTP = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await apiConnector('POST', endpoints.SENDOTP_API, {
        email: formData.email
      });

      if (response.data.success) {
        toast.success('OTP sent to your email!');
        setCurrentStep('otp');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to send OTP');
    } finally {
      setLoading(false);
    }
  };

  const handleOTPChange = (index, value) => {
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);

    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOTPKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOTPPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = pastedData.split('');
    while (newOtp.length < 6) newOtp.push('');
    setOtp(newOtp);

    const nextIndex = Math.min(pastedData.length, 5);
    const nextInput = document.getElementById(`otp-${nextIndex}`);
    nextInput?.focus();
  };

  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    const otpCode = otp.join('');
    if (otpCode.length !== 6) {
      toast.error('Please enter complete 6-digit OTP');
      return;
    }

    setLoading(true);
    try {
      const response = await apiConnector('POST', endpoints.SIGNUP_API, {
        ...formData,
        otp: otpCode
      });

      if (response.data.success) {
        toast.success('Registration successful!');
        navigate('/login');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Registration failed');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await apiConnector('POST', endpoints.SENDOTP_API, {
        email: formData.email
      });

      if (response.data.success) {
        toast.success('OTP resent successfully to your email!');
        setOtp(['', '', '', '', '', '']);
        const firstInput = document.getElementById('otp-0');
        firstInput?.focus();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to resend OTP');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundColor: '#E8F5F3'
      }}
    >
      <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]" />

      <motion.div
        className="absolute top-8 right-8 z-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-2xl font-bold text-teal-600 bg-white/90 px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm">
          StartupHealer
        </div>
      </motion.div>

      <motion.div
        className="relative z-10 w-full max-w-lg px-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <AnimatePresence mode="wait">
          {currentStep === 'register' ? (
            <motion.div
              key="register-form"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                  WELCOMES YOU!
                </h1>
                <div className="flex items-center justify-center gap-2 mb-8">
                  <motion.div
                    className="w-12 h-12 bg-orange-400 rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <h2 className="text-3xl md:text-4xl font-bold text-teal-600">
                    create new
                  </h2>
                </div>
                <div className="flex items-center justify-center gap-2 mb-6">
                  <h2 className="text-3xl md:text-4xl font-bold text-teal-600">
                    account
                  </h2>
                  <motion.span
                    className="text-4xl"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    ↓
                  </motion.span>
                </div>
              </motion.div>

              <form onSubmit={handleSendOTP} className="space-y-4">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Username"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 bg-teal-100/70 backdrop-blur-sm border-2 border-teal-300 rounded-2xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-md"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.35 }}
                >
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 bg-teal-100/70 backdrop-blur-sm border-2 border-teal-300 rounded-2xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-md"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-4 py-4 bg-teal-100/70 backdrop-blur-sm border-2 border-teal-300 rounded-2xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-md"
                  />
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.45 }}
                >
                  <input
                    type="tel"
                    name="contactNumber"
                    placeholder="Contact Number"
                    value={formData.contactNumber}
                    onChange={handleInputChange}
                    required
                    maxLength={10}
                    className="w-full px-4 py-4 bg-teal-100/70 backdrop-blur-sm border-2 border-teal-300 rounded-2xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-md"
                  />
                </motion.div>

                <div className="grid grid-cols-2 gap-4">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-teal-100/70 backdrop-blur-sm border-2 border-teal-300 rounded-2xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-md"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.55 }}
                  >
                    <input
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm Password"
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      required
                      className="w-full px-4 py-4 bg-teal-100/70 backdrop-blur-sm border-2 border-teal-300 rounded-2xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-md"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <motion.button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-teal-600 text-white font-semibold text-lg rounded-2xl shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Processing...
                      </span>
                    ) : (
                      'Create an account'
                    )}
                  </motion.button>
                </motion.div>
              </form>

              <motion.p
                className="mt-6 text-gray-800 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7 }}
              >
                Already have an account?{' '}
                <Link to="/login" className="text-teal-600 font-bold hover:underline">
                  Sign in
                </Link>
              </motion.p>
            </motion.div>
          ) : (
            <motion.div
              key="otp-form"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <motion.button
                onClick={() => setCurrentStep('register')}
                className="absolute -top-20 left-0 px-8 py-3 bg-white/90 backdrop-blur-sm border-2 border-teal-400 rounded-2xl text-teal-700 font-bold hover:bg-teal-50 transition-all shadow-lg"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                BACK
              </motion.button>

              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-center gap-3 mb-6">
                  <motion.div
                    className="w-14 h-14 bg-orange-400 rounded-full"
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <h1 className="text-4xl md:text-5xl font-bold text-teal-600">
                    VERIFY OTP
                  </h1>
                </div>
                <p className="text-gray-800 text-base mb-2 font-medium">
                  Enter the 6 digit code sent to
                </p>
                <p className="text-teal-600 text-lg mb-8 font-bold">
                  {formData.email}
                </p>
              </motion.div>

              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <motion.div
                  className="flex justify-center gap-3"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <motion.input
                      key={index}
                      id={`otp-${index}`}
                      type="text"
                      inputMode="numeric"
                      maxLength={1}
                      value={otp[index]}
                      onChange={(e) => handleOTPChange(index, e.target.value)}
                      onKeyDown={(e) => handleOTPKeyDown(index, e)}
                      onPaste={handleOTPPaste}
                      className="w-12 h-16 md:w-14 md:h-20 text-center text-2xl font-bold bg-teal-100/70 backdrop-blur-sm border-2 border-teal-300 rounded-2xl text-gray-800 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-teal-500 transition-all shadow-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                    />
                  ))}
                </motion.div>

                <motion.p
                  className="text-gray-800 font-medium"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  Didn't receive code?{' '}
                  <button
                    type="button"
                    onClick={handleResendOTP}
                    disabled={loading}
                    className="text-teal-600 font-bold hover:underline disabled:opacity-50"
                  >
                    Resend OTP
                  </button>
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                >
                  <motion.button
                    type="submit"
                    disabled={loading || otp.join('').length < 6}
                    className="w-full py-4 bg-teal-600 text-white font-bold text-xl rounded-2xl shadow-lg hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                  >
                    {loading ? 'VERIFYING...' : 'VERIFY OTP'}
                  </motion.button>
                </motion.div>
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};

export default Register;
