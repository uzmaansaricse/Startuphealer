// src/pages/CreatePitchDeck.jsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FaUpload, FaUser, FaEdit, FaCamera, FaBuilding, FaFileAlt, FaTimes } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { apiConnector } from '../services/apiConnector';
import { pitchDeckEndpoints } from '../services/api';
import bgimage from '../assets/StartupHealer.png';
import { useSelector } from 'react-redux';

const INDUSTRY_OPTIONS = [
  'Technology',
  'Healthcare',
  'Finance',
  'Education',
  'E-Commerce',
  'SaaS',
  'AI/ML',
  'Blockchain',
  'IoT',
  'Green Energy',
  'Manufacturing',
  'Logistics',
  'Real Estate',
  'Entertainment',
  'Food & Beverage',
  'Other'
];

const CreatePitchDeck = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [logoFile, setLogoFile] = useState(null);
  const [logoPreview, setLogoPreview] = useState(null);

  const token = useSelector(state => state.auth.token);

  const [formData, setFormData] = useState({
    startUpName: '',
    Tagline: '',
    sector: '',
    business: '',
    location: '',
    state: '',
    website: '',
    linkedIn: '',
    instagram: '',
    name: '',
    designation: '',
    teamName: '',
    teamDesignation: '',
  });

  const handleNext = () => {
    if (currentStep === 5) {
      // Just go to review page, save happens from review page
      setCurrentStep(6);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleSkipAll = () => {
    setCurrentStep(6); // Go to review page
  };

  if (loading && currentStep !== 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-cyan-50 to-emerald-50 mt-16">
        <div className="text-2xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
          Creating Pitch Deck...
        </div>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden mt-16 bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-cyan-50/40 to-emerald-50/50" />

      {/* Logo */}
      {currentStep !== 6 && (
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
            {currentStep === 0 && (
              <Step1BasicInfo
                key="step1"
                formData={formData}
                setFormData={setFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                handleSkipAll={handleSkipAll}
              />
            )}
            {currentStep === 1 && (
              <Step2IndustryInfo
                key="step2"
                formData={formData}
                setFormData={setFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                handleSkipAll={handleSkipAll}
              />
            )}
            {currentStep === 2 && (
              <Step3BusinessDesc
                key="step3"
                formData={formData}
                setFormData={setFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                handleSkipAll={handleSkipAll}
              />
            )}
            {currentStep === 3 && (
              <Step4Location
                key="step4"
                formData={formData}
                setFormData={setFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                handleSkipAll={handleSkipAll}
              />
            )}
            {currentStep === 4 && (
              <Step5SocialMedia
                key="step5"
                formData={formData}
                setFormData={setFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                handleSkipAll={handleSkipAll}
              />
            )}
            {currentStep === 5 && (
              <Step6TeamInfo
                key="step6"
                formData={formData}
                setFormData={setFormData}
                handleNext={handleNext}
                handleBack={handleBack}
                logoFile={logoFile}
                setLogoFile={setLogoFile}
                logoPreview={logoPreview}
                setLogoPreview={setLogoPreview}
              />
            )}
            {currentStep === 6 && (
              <PitchDeckReview
                key="review"
                formData={formData}
                logoPreview={logoPreview}
                logoFile={logoFile}
                setCurrentStep={setCurrentStep}
                setLoading={setLoading}
                token={token}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

// ============================================
// STEP 1: BASIC INFO
// ============================================
const Step1BasicInfo = ({ formData, setFormData, handleNext, handleBack, handleSkipAll }) => (
  <motion.div
    className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 border-cyan-200"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
  >
    <div className="flex items-center gap-3 mb-6 md:mb-8">
      <FaBuilding className="text-2xl md:text-3xl text-cyan-600" />
      <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
        Create Pitch Deck
      </h2>
    </div>

    <div className="space-y-4 md:space-y-6">
      <div>
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">STARTUP NAME *</label>
        <input
          type="text"
          placeholder="Enter your startup name"
          value={formData.startUpName}
          onChange={(e) => setFormData({ ...formData, startUpName: e.target.value })}
          className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
        />
      </div>

      <div>
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">TAGLINE / SLOGAN *</label>
        <input
          type="text"
          placeholder="Your company's tagline"
          value={formData.Tagline}
          onChange={(e) => setFormData({ ...formData, Tagline: e.target.value })}
          className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
        />
      </div>
    </div>

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

// ============================================
// STEP 2: INDUSTRY INFO
// ============================================
const Step2IndustryInfo = ({ formData, setFormData, handleNext, handleBack, handleSkipAll }) => (
  <motion.div
    className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 border-cyan-200"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
  >
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Industry & Sector</h2>

    <div className="space-y-4 md:space-y-6">
      <div>
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">SELECT INDUSTRY</label>
        <select
          value={formData.sector}
          onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
          className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
        >
          <option value="">Select Industry</option>
          {INDUSTRY_OPTIONS.map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">BUSINESS TYPE</label>
        <input
          type="text"
          placeholder="e.g., B2B, B2C, D2C"
          value={formData.business}
          onChange={(e) => setFormData({ ...formData, business: e.target.value })}
          className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
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

// ============================================
// STEP 3: BUSINESS DESCRIPTION
// ============================================
const Step3BusinessDesc = ({ formData, setFormData, handleNext, handleBack, handleSkipAll }) => (
  <motion.div
    className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 border-cyan-200"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
  >
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Business Description</h2>

    <div>
      <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">DESCRIBE YOUR BUSINESS</label>
      <textarea
        placeholder="Provide a brief overview of your business, what problems it solves, and why it matters..."
        value={formData.business}
        onChange={(e) => setFormData({ ...formData, business: e.target.value })}
        rows={8}
        className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 resize-none transition-all text-sm md:text-base"
      />
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

// ============================================
// STEP 4: LOCATION
// ============================================
const Step4Location = ({ formData, setFormData, handleNext, handleBack, handleSkipAll }) => (
  <motion.div
    className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 border-cyan-200"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
  >
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Location</h2>

    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
      <div>
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">STATE</label>
        <input
          type="text"
          placeholder="Your state"
          value={formData.state}
          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
          className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
        />
      </div>

      <div>
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">CITY</label>
        <input
          type="text"
          placeholder="Your city"
          value={formData.location}
          onChange={(e) => setFormData({ ...formData, location: e.target.value })}
          className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
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

// ============================================
// STEP 5: SOCIAL MEDIA
// ============================================
const Step5SocialMedia = ({ formData, setFormData, handleNext, handleBack, handleSkipAll }) => (
  <motion.div
    className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 border-cyan-200"
    initial={{ opacity: 0, x: 100 }}
    animate={{ opacity: 1, x: 0 }}
    exit={{ opacity: 0, x: -100 }}
  >
    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Social Media & Website</h2>

    <div className="space-y-4 md:space-y-6">
      <div>
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">WEBSITE</label>
        <input
          type="url"
          placeholder="https://www.yourwebsite.com"
          value={formData.website}
          onChange={(e) => setFormData({ ...formData, website: e.target.value })}
          className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
        />
      </div>

      <div>
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">LINKEDIN</label>
        <input
          type="url"
          placeholder="https://www.linkedin.com/company/yourcompany"
          value={formData.linkedIn}
          onChange={(e) => setFormData({ ...formData, linkedIn: e.target.value })}
          className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
        />
      </div>

      <div>
        <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">INSTAGRAM</label>
        <input
          type="url"
          placeholder="https://www.instagram.com/yourcompany"
          value={formData.instagram}
          onChange={(e) => setFormData({ ...formData, instagram: e.target.value })}
          className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
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

// ============================================
// STEP 6: TEAM INFO & LOGO
// ============================================
const Step6TeamInfo = ({ formData, setFormData, handleNext, handleBack, logoFile, setLogoFile, logoPreview, setLogoPreview }) => {
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
            0.8
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
      if (!file.type.startsWith('image/')) {
        toast.error('Please select a valid image file');
        return;
      }

      if (file.size > 50 * 1024 * 1024) {
        toast.error('Image size should be less than 50MB');
        return;
      }

      try {
        let processedFile = file;

        if (file.size > 50 * 1024) {
          processedFile = await compressImage(file, 2);
          const originalSizeMB = (file.size / (1024 * 1024)).toFixed(2);
          const compressedSizeMB = (processedFile.size / (1024 * 1024)).toFixed(2);
          toast.success(`Compressed from ${originalSizeMB}MB to ${compressedSizeMB}MB`);
        }

        if (processedFile.size > 5 * 1024 * 1024) {
          toast.error('Image is too large even after compression');
          return;
        }

        setLogoFile(processedFile);

        const reader = new FileReader();
        reader.onloadend = () => {
          setLogoPreview(reader.result);
        };
        reader.readAsDataURL(processedFile);
      } catch (error) {
        toast.error('Failed to process image');
        console.error(error);
      }
    }
  };

  const handleNextWithValidation = () => {
    if (!formData.name.trim()) {
      toast.error('Please enter founder name');
      return;
    }

    if (!logoFile) {
      toast.error('Please upload a logo');
      return;
    }

    handleNext();
  };

  return (
    <motion.div
      className="w-full max-w-2xl bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl p-4 sm:p-6 md:p-8 border-2 border-cyan-200"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
    >
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6 md:mb-8">Team & Logo</h2>

      <div className="space-y-4 md:space-y-6 mb-6 md:mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">FOUNDER NAME *</label>
            <input
              type="text"
              placeholder="Your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">DESIGNATION</label>
            <input
              type="text"
              placeholder="e.g., CEO, Founder, Co-Founder"
              value={formData.designation}
              onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
              className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div>
            <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">TEAM NAME (OPTIONAL)</label>
            <input
              type="text"
              placeholder="Team member name"
              value={formData.teamName}
              onChange={(e) => setFormData({ ...formData, teamName: e.target.value })}
              className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
            />
          </div>

          <div>
            <label className="block text-xs md:text-sm font-bold text-gray-700 mb-2">TEAM DESIGNATION (OPTIONAL)</label>
            <input
              type="text"
              placeholder="e.g., CTO, CFO"
              value={formData.teamDesignation}
              onChange={(e) => setFormData({ ...formData, teamDesignation: e.target.value })}
              className="w-full px-4 py-3 md:py-4 bg-cyan-50/70 border-2 border-cyan-300 rounded-xl md:rounded-2xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all text-sm md:text-base"
            />
          </div>
        </div>

        {/* Logo Upload */}
        <div>
          <label className="block text-xs md:text-sm font-bold text-gray-700 mb-3">COMPANY LOGO *</label>
          <label className="cursor-pointer group">
            <input
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
            <div className="w-full p-6 md:p-8 border-2 border-dashed border-cyan-300 rounded-xl md:rounded-2xl bg-cyan-50/70 hover:bg-cyan-100/70 transition-all flex items-center justify-center group-hover:scale-105">
              {logoPreview ? (
                <div className="relative w-32 h-32">
                  <img
                    src={logoPreview}
                    alt="Logo Preview"
                    className="w-full h-full object-contain rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={(e) => {
                      e.preventDefault();
                      setLogoPreview(null);
                      setLogoFile(null);
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                  >
                    <FaTimes className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="text-center">
                  <FaUpload className="text-4xl md:text-5xl text-cyan-600 mx-auto mb-2" />
                  <p className="text-cyan-600 font-semibold text-sm md:text-base">Click to upload logo</p>
                  <p className="text-xs text-gray-500 mt-1">PNG, JPG, GIF (Max 50MB)</p>
                </div>
              )}
            </div>
          </label>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-3">
        <motion.button
          onClick={handleBack}
          className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 bg-white border-2 border-cyan-500 text-cyan-600 font-bold text-sm md:text-base rounded-full hover:bg-cyan-50 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          ← Back
        </motion.button>

        <motion.button
          onClick={handleNextWithValidation}
          className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold text-sm md:text-base rounded-full hover:from-cyan-600 hover:to-emerald-600 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          Review & Submit →
        </motion.button>
      </div>
    </motion.div>
  );
};

// ============================================
// REVIEW PAGE
// ============================================
const PitchDeckReview = ({ formData, logoPreview, logoFile, setCurrentStep, setLoading, token }) => {
  const navigate = useNavigate();
  const [reviewLoading, setReviewLoading] = useState(false);

  const handleSaveAndContinue = async () => {
    try {
      setReviewLoading(true);

      if (!logoFile) {
        toast.error('Logo file is missing');
        setReviewLoading(false);
        return;
      }

      // Create FormData for multipart/form-data
      const submitData = new FormData();

      // Add all text fields
      submitData.append('startUpName', formData.startUpName);
      submitData.append('Tagline', formData.Tagline);
      submitData.append('sector', formData.sector);
      submitData.append('business', formData.business);
      submitData.append('location', formData.location);
      submitData.append('state', formData.state);
      submitData.append('website', formData.website);
      submitData.append('linkedIn', formData.linkedIn);
      submitData.append('instagram', formData.instagram);
      submitData.append('name', formData.name);
      submitData.append('designation', formData.designation);
      submitData.append('teamName', formData.teamName);
      submitData.append('teamDesignation', formData.teamDesignation);

      // Add logo file
      submitData.append('logo', logoFile);

      console.log('Submitting FormData...');
      for (let pair of submitData.entries()) {
        if (pair[0] !== 'logo') {
          console.log(pair[0] + ': ' + pair[1]);
        }
      }
      console.log('logo file:', logoFile.name);

      const result = await apiConnector(
        'POST',
        pitchDeckEndpoints.CREATE_PITCH,
        submitData,
        {
          Authorization: `Bearer ${token}`,
        }
      );

      console.log(result)

      if (result.data.success) {
        toast.success('Pitch deck created successfully!');
        navigate('/user/dashboard');
      } else {
        toast.error(result.message || 'Failed to create pitch deck');
      }
    } catch (error) {
      console.error('Error saving pitch deck:', error);
      toast.error(error.response?.data?.message || 'An error occurred');
    } finally {
      setReviewLoading(false);
    }
  };

  return (
    <motion.div
      className="w-full max-w-4xl bg-white/95 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-2xl overflow-hidden border-2 border-cyan-200"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-cyan-100 to-emerald-100 p-4 md:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-6 border-b-2 border-cyan-200">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">Review Your Pitch Deck</h2>
        <motion.button
          onClick={() => setCurrentStep(0)}
          className="w-full sm:w-auto px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-emerald-500 to-green-500 text-white font-bold text-sm md:text-base rounded-full shadow-lg hover:from-emerald-600 hover:to-green-600 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          <FaEdit className="inline mr-2" /> Edit
        </motion.button>
      </div>

      {/* Content */}
      <div className="p-4 sm:p-6 md:p-8 space-y-6 md:space-y-8">
        {/* Logo & Basic Info */}
        <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 pb-6 md:pb-8 border-b-2 border-cyan-100">
          <div className="w-28 h-28 md:w-32 md:h-32 rounded-lg bg-gradient-to-br from-cyan-100 to-emerald-100 flex-shrink-0 flex items-center justify-center border-4 border-cyan-300 overflow-hidden">
            {logoPreview && (
              <img src={logoPreview} alt="Logo" className="w-full h-full object-cover" />
            )}
          </div>
          <div className="text-center sm:text-left flex-1">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800">{formData.startUpName}</h3>
            <p className="text-base md:text-lg text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600 font-semibold mb-1">
              {formData.Tagline}
            </p>
            <div className="text-sm md:text-base text-gray-600 space-y-1">
              {formData.sector && <p>Industry: <span className="font-semibold">{formData.sector}</span></p>}
              {formData.location && formData.state && <p>Location: <span className="font-semibold">{formData.location}, {formData.state}</span></p>}
            </div>
          </div>
        </div>

        {/* Business Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          <div>
            <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-3">Business Overview</h4>
            <p className="text-sm md:text-base text-gray-600 leading-relaxed max-h-32 overflow-y-auto">
              {formData.business || 'Not provided'}
            </p>
          </div>

          <div>
            <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-3">Founder</h4>
            <div className="text-sm md:text-base text-gray-600 space-y-2">
              <p><span className="font-semibold">Name:</span> {formData.name}</p>
              <p><span className="font-semibold">Designation:</span> {formData.designation}</p>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-3">Online Presence</h4>
          <div className="space-y-2 text-sm md:text-base">
            {formData.website && (
              <p><span className="font-semibold">Website:</span> <a href={formData.website} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">{formData.website}</a></p>
            )}
            {formData.linkedIn && (
              <p><span className="font-semibold">LinkedIn:</span> <a href={formData.linkedIn} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">Visit Profile</a></p>
            )}
            {formData.instagram && (
              <p><span className="font-semibold">Instagram:</span> <a href={formData.instagram} target="_blank" rel="noopener noreferrer" className="text-cyan-600 hover:underline">Visit Profile</a></p>
            )}
          </div>
        </div>

        {/* Team Info */}
        {(formData.teamName || formData.teamDesignation) && (
          <div>
            <h4 className="text-lg md:text-xl font-bold text-gray-800 mb-3">Team Member</h4>
            <div className="text-sm md:text-base text-gray-600 space-y-2">
              <p><span className="font-semibold">Name:</span> {formData.teamName}</p>
              <p><span className="font-semibold">Designation:</span> {formData.teamDesignation}</p>
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="bg-gray-50 border-t-2 border-cyan-200 px-4 sm:px-6 md:px-8 py-4 flex flex-col sm:flex-row justify-between items-center gap-3">
        <motion.button
          onClick={() => setCurrentStep(5)}
          className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 border-2 border-cyan-500 text-cyan-600 font-bold text-sm md:text-base rounded-full hover:bg-cyan-50 transition-all"
          whileHover={{ scale: 1.05 }}
        >
          ← Back
        </motion.button>

        <motion.button
          onClick={handleSaveAndContinue}
          disabled={reviewLoading}
          className="w-full sm:w-auto px-6 md:px-8 py-2 md:py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-bold text-sm md:text-base rounded-full shadow-lg hover:from-cyan-600 hover:to-emerald-600 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          whileHover={{ scale: 1.05 }}
        >
          {reviewLoading ? 'Saving...' : 'Save & Continue'}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CreatePitchDeck;
