// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaGoogle } from 'react-icons/fa';
import { FaLinkedin } from 'react-icons/fa';
import { apiConnector } from '../services/apiConnector';
import { endpoints } from '../services/api';
import { toast } from 'react-hot-toast';
import bgimage from '../assets/StartupHealer.png';
import { useDispatch } from 'react-redux';
import { setToken } from '../slices/authSlice';


const Login = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const dispatch = useDispatch();
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();


    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }


    setLoading(true);
    try {
      const response = await apiConnector('POST', endpoints.LOGIN_API, formData);
      console.log(response)


      if (response.data.success) {
        toast.success('Login successful!');
        if (rememberMe) {
          dispatch(setToken(response.data.token))
        }
        navigate('/');
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };


  const handleGoogleLogin = () => {
    toast.error('Google login coming soon!');
  };


  const handleLinkedInLogin = () => {
    toast.error('LinkedIn login coming soon!');
  };


  return (
    <div 
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url(${bgimage})`,
        backgroundColor: '#E8F5F3'
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/40 via-cyan-50/30 to-emerald-50/40 backdrop-blur-[2px]" />


      <motion.div
        className="absolute top-8 right-8 z-20"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent bg-white/90 px-4 py-2 rounded-lg shadow-lg backdrop-blur-sm">
          StartupHealer
        </div>
      </motion.div>


      <div className="relative z-10 w-full max-w-6xl px-6 flex items-center justify-between gap-8">
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="mb-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Hi Welcome Back!
            </h1>
            <div className="flex items-center gap-2 mb-6">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-emerald-400 rounded-full"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Sign in to
              </h2>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent flex items-center gap-2">
              account
              <motion.span
                className="text-4xl text-cyan-600"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                ↓
              </motion.span>
            </h2>
          </motion.div>


          <form onSubmit={handleSubmit} className="space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <input
                type="text"
                name="email"
                placeholder="Username or Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-cyan-50/70 backdrop-blur-sm border-2 border-cyan-300 rounded-2xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all shadow-md"
              />
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full px-4 py-4 bg-cyan-50/70 backdrop-blur-sm border-2 border-cyan-300 rounded-2xl text-gray-800 placeholder-gray-600 focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all shadow-md"
              />
            </motion.div>


            <motion.div
              className="flex items-center justify-between"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <label className="flex items-center gap-2 cursor-pointer group">
                <div className="relative">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-5 h-5 rounded border-2 border-cyan-400 bg-white/70 checked:bg-cyan-500 focus:ring-2 focus:ring-cyan-400 transition-all cursor-pointer"
                  />
                </div>
                <span className="text-gray-700 font-medium group-hover:text-cyan-600 transition-colors">
                  Remember me
                </span>
              </label>


              <Link
                to="/forgot-password"
                className="text-cyan-600 font-semibold hover:text-cyan-700 hover:underline transition-colors"
              >
                Forgot Password?
              </Link>
            </motion.div>


            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <motion.button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-gradient-to-r from-cyan-600 via-emerald-600 to-green-600 text-white font-semibold text-lg rounded-2xl shadow-lg hover:from-cyan-700 hover:via-emerald-700 hover:to-green-700 focus:outline-none focus:ring-4 focus:ring-cyan-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  'Log in'
                )}
              </motion.button>
            </motion.div>
          </form>


          <motion.p
            className="mt-6 text-gray-800 font-medium text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            Don't have an account?{' '}
            <Link to="/register" className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600 font-bold hover:underline">
              Create an account
            </Link>
          </motion.p>
        </motion.div>


        <motion.div
          className="hidden lg:flex flex-col items-center justify-center space-y-6"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="relative flex flex-col items-center">
            <div className="h-32 w-0.5 bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
            <motion.div
              className="my-4 px-6 py-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg border-2 border-cyan-200"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <span className="text-gray-700 font-bold text-lg">OR</span>
            </motion.div>
            <div className="h-32 w-0.5 bg-gradient-to-b from-transparent via-emerald-400 to-transparent"></div>
          </div>


          <div className="flex flex-col gap-4 w-80">
            <motion.button
              onClick={handleGoogleLogin}
              className="flex items-center gap-4 px-6 py-4 bg-white hover:bg-cyan-50 rounded-2xl shadow-lg border-2 border-cyan-100 hover:border-cyan-300 transition-all group"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <FaGoogle className="text-2xl text-red-500" />
              </div>
              <span className="text-gray-700 font-semibold text-lg group-hover:text-cyan-600 transition-colors">
                Continue with Google
              </span>
            </motion.button>


            <motion.button
              onClick={handleLinkedInLogin}
              className="flex items-center gap-4 px-6 py-4 bg-white hover:bg-emerald-50 rounded-2xl shadow-lg border-2 border-emerald-100 hover:border-emerald-400 transition-all group"
              whileHover={{ scale: 1.02, x: 5 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="w-12 h-12 bg-[#0077B5] rounded-full flex items-center justify-center shadow-md group-hover:shadow-lg transition-shadow">
                <FaLinkedin className="text-2xl text-white" />
              </div>
              <span className="text-gray-700 font-semibold text-lg group-hover:text-[#0077B5] transition-colors">
                Continue with LinkedIn
              </span>
            </motion.button>
          </div>
        </motion.div>


        <motion.div
          className="lg:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t-2 border-cyan-200 p-4 space-y-3"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="text-center mb-2">
            <span className="text-gray-600 font-semibold">OR</span>
          </div>
          
          <button
            onClick={handleGoogleLogin}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white hover:bg-cyan-50 rounded-xl shadow-md border-2 border-cyan-100 transition-all"
          >
            <FaGoogle className="text-xl text-red-500" />
            <span className="text-gray-700 font-semibold">Continue with Google</span>
          </button>


          <button
            onClick={handleLinkedInLogin}
            className="flex items-center justify-center gap-3 w-full px-4 py-3 bg-white hover:bg-emerald-50 rounded-xl shadow-md border-2 border-emerald-100 transition-all"
          >
            <FaLinkedin className="text-xl text-[#0077B5]" />
            <span className="text-gray-700 font-semibold">Continue with LinkedIn</span>
          </button>
        </motion.div>
      </div>
    </div>
  );
};


export default Login;
