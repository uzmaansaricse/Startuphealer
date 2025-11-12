// src/pages/Profile.jsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaUser, FaEdit, FaCamera } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { profileEndpoints } from '../services/api';
import bgimage from '../assets/StartupHealer.png';
import { useSelector } from 'react-redux';


const INDIAN_STATES = [
  'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
  'Delhi', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand',
  'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
  'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan',
  'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh',
  'Uttarakhand', 'West Bengal'
];


// Role mapping - display text to database value
const ROLE_MAPPING = {
  'Are you a Founder?': 'Founder',
  'Are you a Mentor?': 'Mentor',
  'Are you an Investor?': 'Investor',
  'Are you a Business Analyst?': 'Business Analyst',
  'Are you a Job seeker?': 'Job Seeker',
  'Are you a Job Provider?': 'Job Provider',
  'Are you looking for Website?': 'Website Seeker',
  'Are you looking for Marketing Strategy?': 'Marketing Strategy Seeker'
};


const ROLES = [
  'Are you a Founder?',
  'Are you a Mentor?',
  'Are you an Investor?',
  'Are you a Business Analyst?',
  'Are you a Job seeker?',
  'Are you a Job Provider?',
  'Are you looking for Website?',
  'Are you looking for Marketing Strategy?'
];


const Profile = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [currentStep, setCurrentStep] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [profileExists, setProfileExists] = useState(false);


  const token = useSelector(state => state.auth.token);


  const [userData, setUserData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    image: '',
  });


  const [profileData, setProfileData] = useState({
    role: '',
    coFounderExist: false,
    coFoundersFirstName: '',
    coFoundersLastName: '',
    startUpName: '',
    state: '',
    city: '',
    address: '',
    industry: '',
    sector: '',
    businessDescription: '',
    contactNumber: '',
  });


  // Fetch user data on component mount
  useEffect(() => {
    fetchUserData();
  }, []);


  const fetchUserData = async () => {
    try {
      setLoading(true);
      const response = await apiConnector('GET', profileEndpoints.GET_USER_DETAILS_API, null, {
        Authorization: `Bearer ${token}`
      });


      console.log(response);


      if (response.data.success) {
        const user = response.data.data;
        setUserData({
          firstName: user.firstName || '',
          lastName: user.lastName || '',
          email: user.email || '',
          image: user.image || '',
        });


        if (user.additionalDetails) {
          const profile = user.additionalDetails;
          setProfileData({
            role: profile.role || '',
            coFounderExist: profile.coFounderExist || false,
            coFoundersFirstName: profile.coFoundersFirstName || '',
            coFoundersLastName: profile.coFoundersLastName || '',
            startUpName: profile.startUpName || '',
            state: profile.state || '',
            city: profile.city || '',
            address: profile.address || '',
            industry: profile.industry || '',
            sector: profile.sector || '',
            businessDescription: profile.businessDescription || '',
            contactNumber: profile.contactNumber || '',
          });


          // Check if profile exists (even minimal data)
          if (profile.role || profile.startUpName || profile.industry) {
            setProfileExists(true);
            setCurrentStep(5); // Go to profile view
          }
        }
      }
    } catch (error) {
      toast.error('Failed to fetch profile data');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const handleUpdateProfile = async () => {
    try {
      setLoading(true);
      const response = await apiConnector('PUT', profileEndpoints.UPDATE_PROFILE, {
        ...userData,
        ...profileData,
        // Set default role if none selected
        role: profileData.role || 'Not Specified'
      }, {
        Authorization: `Bearer ${token}`
      });


      if (response.data.success) {
        toast.success('Profile updated successfully!');
        setProfileExists(true);
        setIsEditing(false);
        setCurrentStep(5);
        fetchUserData();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };


  // Handle skip all - saves minimal data and goes to profile view
  const handleSkipAll = async () => {
    try {
      setLoading(true);


      console.log("userdata => ",userData)
      console.log("profiledata => ",profileData)


      // Save whatever data is available (even if minimal)
      const response = await apiConnector('PUT', profileEndpoints.UPDATE_PROFILE, {
        ...userData,
        ...profileData,
        // Set default role if none selected
        role: profileData.role || 'Not Specified'
      }, {
        Authorization: `Bearer ${token}`
      });


      if (response.data.success) {
        toast.success('Profile saved! You can complete it later.');
        setProfileExists(true);
        setCurrentStep(5);
        fetchUserData();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to save profile');
    } finally {
      setLoading(false);
    }
  };


  const handleNext = () => {
    // No strict validation - user can proceed
    if (currentStep === 4) {
      handleUpdateProfile();
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };


  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };


  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-emerald-50">
        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
          Loading...
        </div>
      </div>
    );
  }


  return (
    <div
      className="min-h-screen relative overflow-hidden  bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-cyan-50/40 to-emerald-50/50" />


      {/* Logo - Hidden on large screens when profile exists */}
      {!(profileExists && currentStep === 5) && (
        <div className="absolute top-8 right-8 z-20 hidden lg:block">
          <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent bg-white/90 px-4 py-2 rounded-lg shadow-lg">
            StartupHealer
          </div>
        </div>
      )}


      {/* Main Container */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-3 sm:px-4 md:px-6 lg:px-8 py-6 md:py-10 lg:py-20">
        <div className="w-full lg:w-[80vw] flex justify-center">
          <AnimatePresence mode="wait">
            {currentStep === 0 && <Step1RoleSelection key="step1" profileData={profileData} setProfileData={setProfileData} handleNext={handleNext} handleBack={handleBack} handleSkipAll={handleSkipAll} />}
            {currentStep === 1 && <Step2CoFounder key="step2" profileData={profileData} setProfileData={setProfileData} handleNext={handleNext} handleBack={handleBack} handleSkipAll={handleSkipAll} />}
            {currentStep === 2 && <Step3BusinessInfo key="step3" profileData={profileData} setProfileData={setProfileData} handleNext={handleNext} handleBack={handleBack} handleSkipAll={handleSkipAll} />}
            {currentStep === 3 && <Step4Location key="step4" profileData={profileData} setProfileData={setProfileData} handleNext={handleNext} handleBack={handleBack} INDIAN_STATES={INDIAN_STATES} handleSkipAll={handleSkipAll} />}
            {currentStep === 4 && <Step5ProfilePicture key="step5" userData={userData} setUserData={setUserData} handleNext={handleNext} handleBack={handleBack} />}
            {currentStep === 5 && <ProfileView key="profile" userData={userData} profileData={profileData} setCurrentStep={setCurrentStep} setIsEditing={setIsEditing} />}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};


// Step 1: Role Selection (WITH skip button)
const Step1RoleSelection = ({ profileData, setProfileData, handleNext, handleBack, handleSkipAll }) => {
  const handleRoleSelect = (displayRole) => {
    const roleValue = ROLE_MAPPING[displayRole];
    setProfileData({ ...profileData, role: roleValue });
  };


  return (
    <motion.div
      className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 border-cyan-200"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <div className="flex items-center gap-3 mb-6 md:mb-8">
        <FaUser className="text-2xl md:text-3xl text-cyan-600" />
        <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
          Create Your Profile
        </h2>
      </div>


      <div className="space-y-2 md:space-y-3 max-h-[50vh] md:max-h-none overflow-y-auto md:overflow-visible">
        {ROLES.map((displayRole) => {
          const roleValue = ROLE_MAPPING[displayRole];
          const isSelected = profileData.role === roleValue;


          return (
            <motion.button
              key={displayRole}
              onClick={() => handleRoleSelect(displayRole)}
              className={`w-full text-left px-4 md:px-6 py-3 md:py-4 rounded-xl md:rounded-2xl border-2 transition-all ${
                isSelected
                  ? 'bg-gradient-to-r from-cyan-100 to-emerald-100 border-cyan-400 shadow-lg'
                  : 'bg-white/50 border-cyan-200 hover:border-cyan-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 md:w-6 md:h-6 rounded-full border-2 flex-shrink-0 flex items-center justify-center ${
                  isSelected ? 'border-cyan-600' : 'border-gray-400'
                }`}>
                  {isSelected && (
                    <div className="w-2 md:w-3 h-2 md:h-3 rounded-full bg-cyan-600" />
                  )}
                </div>
                <span className="font-semibold text-sm md:text-base text-gray-800">{displayRole}</span>
              </div>
            </motion.button>
          );
        })}
      </div>


      {/* Buttons with Skip option */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 md:mt-8">
        <motion.button
          onClick={handleSkipAll}
          className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-white border-2 border-gray-300 text-gray-600 font-semibold text-sm md:text-base rounded-full hover:bg-gray-50 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          Skip for now
        </motion.button>


        <motion.button
          onClick={handleNext}
          className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold text-sm md:text-base rounded-full shadow-lg hover:from-cyan-600 hover:to-emerald-600 transition-all"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Next →
        </motion.button>
      </div>
    </motion.div>
  );
};


// Step 2: Co-Founder (WITH skip button)
const Step2CoFounder = ({ profileData, setProfileData, handleNext, handleBack, handleSkipAll }) => (
  <motion.div
    className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 border-cyan-200"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
  >
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Do you have co-founder?</h2>


    <div className="flex gap-3 md:gap-4 mb-6 md:mb-8">
      <motion.button
        onClick={() => setProfileData({ ...profileData, coFounderExist: false })}
        className={`flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl border-2 font-bold text-sm md:text-base transition-all ${
          !profileData.coFounderExist
            ? 'bg-gradient-to-r from-cyan-100 to-emerald-100 border-cyan-400'
            : 'bg-white/50 border-gray-300'
        }`}
        whileHover={{ scale: 1.02 }}
      >
        No
      </motion.button>
      <motion.button
        onClick={() => setProfileData({ ...profileData, coFounderExist: true })}
        className={`flex-1 py-3 md:py-4 rounded-xl md:rounded-2xl border-2 font-bold text-sm md:text-base transition-all ${
          profileData.coFounderExist
            ? 'bg-gradient-to-r from-cyan-100 to-emerald-100 border-cyan-400'
            : 'bg-white/50 border-gray-300'
        }`}
        whileHover={{ scale: 1.02 }}
      >
        Yes
      </motion.button>
    </div>


    {profileData.coFounderExist && (
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 mb-6 md:mb-8">
        <input
          type="text"
          placeholder="First Name"
          value={profileData.coFoundersFirstName}
          onChange={(e) => setProfileData({ ...profileData, coFoundersFirstName: e.target.value })}
          className="px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
        />
        <input
          type="text"
          placeholder="Last Name"
          value={profileData.coFoundersLastName}
          onChange={(e) => setProfileData({ ...profileData, coFoundersLastName: e.target.value })}
          className="px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
        />
      </div>
    )}


    <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
      <motion.button
        onClick={handleBack}
        className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 bg-white border-2 border-cyan-500 text-cyan-600 font-bold text-sm md:text-base rounded-full hover:bg-cyan-50 transition-all"
        whileHover={{ scale: 1.05 }}
      >
        ← Back
      </motion.button>


      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
        <motion.button
          onClick={handleSkipAll}
          className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-white border-2 border-gray-300 text-gray-600 font-semibold text-sm md:text-base rounded-full hover:bg-gray-50 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          Skip for now
        </motion.button>


        <motion.button
          onClick={handleNext}
          className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold text-sm md:text-base rounded-full hover:from-cyan-600 hover:to-emerald-600 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          Next →
        </motion.button>
      </div>
    </div>
  </motion.div>
);


// Step 3: Business Info (WITH skip button)
const Step3BusinessInfo = ({ profileData, setProfileData, handleNext, handleBack, handleSkipAll }) => (
  <motion.div
    className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 border-cyan-200"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
  >
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Startup Information</h2>


    <div className="space-y-3 md:space-y-4">
      <div>
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">INDUSTRY</label>
        <input
          type="text"
          placeholder="e.g., IT Services"
          value={profileData.industry}
          onChange={(e) => setProfileData({ ...profileData, industry: e.target.value })}
          className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
        />
      </div>


      <div>
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">SECTOR</label>
        <input
          type="text"
          placeholder="e.g., Web, Meta Ads, SEO"
          value={profileData.sector}
          onChange={(e) => setProfileData({ ...profileData, sector: e.target.value })}
          className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
        />
      </div>


      <div>
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">BUSINESS DESCRIPTION:</label>
        <textarea
          placeholder="Type your message here"
          value={profileData.businessDescription}
          onChange={(e) => setProfileData({ ...profileData, businessDescription: e.target.value })}
          rows={6}
          className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none transition-all text-sm md:text-base"
        />
      </div>
    </div>


    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 md:mt-8">
      <motion.button
        onClick={handleBack}
        className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 bg-white border-2 border-cyan-500 text-cyan-600 font-bold text-sm md:text-base rounded-full hover:bg-cyan-50 transition-all"
        whileHover={{ scale: 1.05 }}
      >
        ← Back
      </motion.button>


      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
        <motion.button
          onClick={handleSkipAll}
          className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-white border-2 border-gray-300 text-gray-600 font-semibold text-sm md:text-base rounded-full hover:bg-gray-50 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          Skip for now
        </motion.button>


        <motion.button
          onClick={handleNext}
          className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold text-sm md:text-base rounded-full hover:from-cyan-600 hover:to-emerald-600 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          Next →
        </motion.button>
      </div>
    </div>
  </motion.div>
);


// Step 4: Location (WITH skip button)
const Step4Location = ({ profileData, setProfileData, handleNext, handleBack, INDIAN_STATES, handleSkipAll }) => (
  <motion.div
    className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 border-cyan-200"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
  >
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Your Profile</h2>


    <div className="space-y-3 md:space-y-4">
      <div>
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">Startup's name?</label>
        <input
          type="text"
          value={profileData.startUpName}
          onChange={(e) => setProfileData({ ...profileData, startUpName: e.target.value })}
          className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
        />
      </div>


      <div>
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">State & UT</label>
        <select
          value={profileData.state}
          onChange={(e) => setProfileData({ ...profileData, state: e.target.value })}
          className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
        >
          <option value="">Select State</option>
          {INDIAN_STATES.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>


      <div>
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">City</label>
        <input
          type="text"
          value={profileData.city}
          onChange={(e) => setProfileData({ ...profileData, city: e.target.value })}
          className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
        />
      </div>


      <div>
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">Full address</label>
        <textarea
          value={profileData.address}
          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
          rows={4}
          className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none transition-all text-sm md:text-base"
        />
      </div>
    </div>


    <div className="flex flex-col sm:flex-row justify-between items-center gap-3 mt-6 md:mt-8">
      <motion.button
        onClick={handleBack}
        className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 bg-white border-2 border-cyan-500 text-cyan-600 font-bold text-sm md:text-base rounded-full hover:bg-cyan-50 transition-all"
        whileHover={{ scale: 1.05 }}
      >
        ← Back
      </motion.button>


      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 w-full sm:w-auto">
        <motion.button
          onClick={handleSkipAll}
          className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-white border-2 border-gray-300 text-gray-600 font-semibold text-sm md:text-base rounded-full hover:bg-gray-50 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          Skip for now
        </motion.button>


        <motion.button
          onClick={handleNext}
          className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold text-sm md:text-base rounded-full hover:from-cyan-600 hover:to-emerald-600 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          Next →
        </motion.button>
      </div>
    </div>
  </motion.div>
);


// Step 5: Profile Picture
const Step5ProfilePicture = ({ userData, setUserData, handleNext, handleBack }) => {
  const [uploading, setUploading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);


  const token = useSelector(state => state.auth.token);


  // Image compression function
  const compressImage = (file, maxSizeMB = 2) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);


      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;


        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;


          // Calculate new dimensions (max 1920x1920)
          const maxDimension = 1920;
          if (width > height && width > maxDimension) {
            height = (height * maxDimension) / width;
            width = maxDimension;
          } else if (height > maxDimension) {
            width = (width * maxDimension) / height;
            height = maxDimension;
          }


          canvas.width = width;
          canvas.height = height;


          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);


          // Compress with quality adjustment
          canvas.toBlob(
            (blob) => {
              if (blob) {
                resolve(new File([blob], file.name, {
                  type: 'image/jpeg',
                  lastModified: Date.now(),
                }));
              } else {
                reject(new Error('Failed to compress image'));
              }
            },
            'image/jpeg',
            0.8 // 80% quality
          );
        };


        img.onerror = () => reject(new Error('Failed to load image'));
      };


      reader.onerror = () => reject(new Error('Failed to read file'));
    });
  };


  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }


      // Validate original file size (max 50MB)
      if (file.size > 50 * 1024 * 1024) {
        toast.error('Image size should be less than 50MB');
        return;
      }


      try {
        let processedFile = file;


        // Compress image if larger than 50KB
        if (file.size > 50 * 1024) {
          toast.success('Compressing image for faster upload...');
          processedFile = await compressImage(file, 2);


          // Show compression success
          const originalSizeMB = (file.size / (1024 * 1024)).toFixed(2);
          const compressedSizeMB = (processedFile.size / (1024 * 1024)).toFixed(2);
          toast.success(`Image compressed from ${originalSizeMB}MB to ${compressedSizeMB}MB`);
        }


        // Final validation of compressed file size
        if (processedFile.size > 5 * 1024 * 1024) {
          toast.error('Image is too large even after compression. Please use a smaller image.');
          return;
        }


        setSelectedFile(processedFile);


        // Show preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setUserData({ ...userData, image: reader.result });
        };
        reader.readAsDataURL(processedFile);


      } catch (error) {
        toast.error('Failed to process image. Please try another image.');
        console.error('Image compression error:', error);
      }
    }
  };


  const handleUploadImage = async () => {
    if (!selectedFile) {
      toast.error('Please select an image first');
      return;
    }


    try {
      setUploading(true);


      // Create FormData to send the file
      const formData = new FormData();
      formData.append('displayPicture', selectedFile);


      const response = await apiConnector(
        'PUT',
        profileEndpoints.UPDATE_PROFILE_PICTURE,
        formData,
        {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        }
      );


      console.log(response);


      if (response.data.success) {
        toast.success('Profile picture uploaded successfully!');
        setUserData({ ...userData, image: response.data.data.image });
        handleNext();
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || 'Failed to upload image');
      console.error(error);
    } finally {
      setUploading(false);
    }
  };


  const handleSkip = () => {
    handleNext();
  };


  return (
    <motion.div
      className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-6 sm:p-8 md:p-12 border-2 border-cyan-200 text-center"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent mb-2 md:mb-4">
        StartupHealer Welcomes You!
      </h2>
      <p className="text-xl md:text-2xl font-bold text-gray-800 mb-6 md:mb-8">Add a profile picture?</p>


      <div className="flex justify-center mb-6 md:mb-8">
        <label className="cursor-pointer group">
          <input
            type="file"
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
          />
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-cyan-100 to-emerald-100 flex items-center justify-center border-4 border-cyan-300 hover:border-cyan-400 transition-all group-hover:scale-105 overflow-hidden">
            {userData.image ? (
              <img
                src={userData.image}
                alt="Profile Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="text-center">
                <FaCamera className="text-4xl md:text-6xl text-cyan-600 mx-auto mb-2" />
                <p className="text-cyan-600 font-semibold text-sm md:text-base">Click to Upload</p>
              </div>
            )}
          </div>
        </label>
      </div>


      {/* File Info */}
      {selectedFile && (
        <motion.div
          className="mb-4 text-xs md:text-sm text-gray-600"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="font-semibold">
            Selected: {selectedFile.name}
          </p>
          <p>
            Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
          </p>
        </motion.div>
      )}


      {/* Upload and Skip Buttons */}
      <div className="space-y-3 md:space-y-4">
        {selectedFile && (
          <motion.button
            onClick={handleUploadImage}
            disabled={uploading}
            className="w-full py-3 md:py-4 bg-gradient-to-r from-cyan-500 via-emerald-500 to-green-500 text-white font-bold text-base md:text-xl rounded-xl md:rounded-2xl shadow-lg hover:from-cyan-600 hover:via-emerald-600 hover:to-green-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            whileHover={{ scale: uploading ? 1 : 1.05 }}
            whileTap={{ scale: uploading ? 1 : 0.95 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {uploading ? (
              <span className="flex items-center justify-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Uploading...
              </span>
            ) : (
              'Upload Photo'
            )}
          </motion.button>
        )}


        <motion.button
          onClick={() => document.querySelector('input[type="file"]').click()}
          disabled={uploading}
          className="text-base md:text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600 underline hover:scale-105 transition-transform disabled:opacity-50"
          whileHover={{ scale: 1.05 }}
        >
          {userData.image ? 'Change Photo' : 'Upload from Device'}
        </motion.button>


        <div>
          <motion.button
            onClick={handleSkip}
            disabled={uploading}
            className="text-base md:text-xl font-bold text-gray-600 hover:text-cyan-600 underline transition-colors disabled:opacity-50"
            whileHover={{ scale: 1.05 }}
          >
            Skip for now
          </motion.button>
        </div>
      </div>


      {/* Info Text */}
      <p className="mt-4 md:mt-6 text-xs text-gray-500">
        Images larger than 50KB will be automatically compressed
      </p>
    </motion.div>
  );
};


// Profile View
const ProfileView = ({ userData, profileData, setCurrentStep, setIsEditing }) => (
  <motion.div
    className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border-2 border-cyan-200"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
  >
    {/* Header */}
    <div className="bg-gradient-to-r from-cyan-100 to-emerald-100 p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-6 border-b-2 border-cyan-200">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Profile of {profileData.role || 'User'}</h2>
      <motion.button
        onClick={() => {
          setIsEditing(true);
          setCurrentStep(0);
        }}
        className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold text-sm md:text-base rounded-full shadow-lg hover:from-emerald-600 hover:to-green-600 transition-all"
        whileHover={{ scale: 1.05 }}
      >
        Edit profile
      </motion.button>
    </div>


    {/* Profile Content */}
    <div className="p-4 sm:p-6 md:p-8">
      {/* Profile Header */}
      <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mb-6 md:mb-8 pb-6 md:pb-8 border-b-2 border-cyan-100">
        <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gradient-to-br from-cyan-100 to-emerald-100 flex-shrink-0 flex items-center justify-center border-4 border-cyan-300 overflow-hidden">
          {userData.image ? (
            <img src={userData.image} alt="Profile" className="w-full h-full object-cover" />
          ) : (
            <FaUser className="text-3xl md:text-5xl text-cyan-600" />
          )}
        </div>
        <div className="text-center sm:text-left flex-1">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{userData.firstName} {userData.lastName}</h3>
          <p className="text-base md:text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600 font-semibold mb-1">
            {profileData.role || 'Not Specified'}
          </p>
          <p className="text-sm md:text-lg text-gray-600 break-all">{userData.email}</p>
          {profileData.contactNumber && <p className="text-sm md:text-lg text-gray-600">{profileData.contactNumber}</p>}
          {profileData.city && profileData.state && <p className="text-sm md:text-lg text-gray-600">{profileData.city}, {profileData.state}</p>}
        </div>
      </div>


      {/* Profile Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        <div>
          <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Startup name</h4>
          <p className="text-sm md:text-base text-gray-600 mb-4">{profileData.startUpName || 'Not provided'}</p>


          <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Co-founder Name</h4>
          <p className="text-sm md:text-base text-gray-600 mb-4">
            {profileData.coFounderExist
              ? `${profileData.coFoundersFirstName} ${profileData.coFoundersLastName}`
              : 'No co-founder'}
          </p>


          <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Industry</h4>
          <p className="text-sm md:text-base text-gray-600 mb-4">{profileData.industry || 'Not provided'}</p>


          <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Sector</h4>
          <p className="text-sm md:text-base text-gray-600">{profileData.sector || 'Not provided'}</p>
        </div>


        <div>
          <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Full address</h4>
          <p className="text-sm md:text-base text-gray-600 mb-4">{profileData.address || 'Not provided'}</p>


          <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-2">Business Description</h4>
          <p className="text-sm md:text-base text-gray-600">{profileData.businessDescription || 'Not provided'}</p>
        </div>
      </div>
    </div>
  </motion.div>
);


export default Profile;
