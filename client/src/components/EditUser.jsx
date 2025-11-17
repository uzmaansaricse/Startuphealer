// src/components/modals/EditUserModal.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { employeeEndpoints } from '../services/api';
import toast from 'react-hot-toast';
import { FaTimes } from 'react-icons/fa';

const EditUserModal = ({ user, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    location: '',
    contactNumber: '',
    role: '',
  });
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        location: user.employeeDetails?.location || '',
        contactNumber: user.employeeDetails?.contactNumber || '',
        role: user.employeeDetails?.role || '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName?.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName?.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.location?.trim()) {
      newErrors.location = 'Location is required';
    }
    
    if (!formData.contactNumber?.trim()) {
      newErrors.contactNumber = 'Phone number is required';
    } else if (!/^[0-9]{10}$/.test(formData.contactNumber)) {
      newErrors.contactNumber = 'Phone must be 10 digits';
    }
    
    if (!formData.role) {
      newErrors.role = 'Role is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      toast.error('Please fix the errors in the form');
      return;
    }
    
    setLoading(true);

    try {
      const token = localStorage.getItem('token');
      const url = employeeEndpoints.UPDATE_EMPLOYEE.replace(':id', user._id);
      
      await axios.put(url, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      toast.success('Employee updated successfully!');
      onSuccess();
    } catch (error) {
      console.error('Error updating employee:', error);
      toast.error(error.response?.data?.message || 'Failed to update employee');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md border-2 border-emerald-200 max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 via-green-500 to-cyan-500 p-6 rounded-t-2xl sticky top-0 z-10">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">Edit Employee</h2>
              <p className="text-emerald-50 text-sm mt-1">
                Update employee information
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/20 rounded-lg"
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {/* First Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              First Name *
            </label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.firstName
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500'
              }`}
            />
            {errors.firstName && (
              <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Last Name *
            </label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.lastName
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500'
              }`}
            />
            {errors.lastName && (
              <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
            )}
          </div>

          {/* Location */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Location *
            </label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              placeholder="e.g., Bangalore, Delhi"
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.location
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-green-200 focus:ring-green-500 focus:border-green-500'
              }`}
            />
            {errors.location && (
              <p className="text-red-500 text-sm mt-1">{errors.location}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Phone *
            </label>
            <input
              type="tel"
              name="contactNumber"
              value={formData.contactNumber}
              onChange={handleChange}
              placeholder="10-digit number"
              maxLength={10}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.contactNumber
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-cyan-200 focus:ring-cyan-500 focus:border-cyan-500'
              }`}
            />
            {errors.contactNumber && (
              <p className="text-red-500 text-sm mt-1">{errors.contactNumber}</p>
            )}
          </div>

          {/* Role */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">
              Role *
            </label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 transition-all duration-300 ${
                errors.role
                  ? 'border-red-300 focus:ring-red-500 focus:border-red-500'
                  : 'border-emerald-200 focus:ring-emerald-500 focus:border-emerald-500'
              }`}
            >
              <option value="">Select Role</option>
              <option value="Data Feeder">Data Feeder</option>
              <option value="Accountant">Accountant</option>
              <option value="Manager">Manager</option>
              <option value="Admin">Admin</option>
            </select>
            {errors.role && (
              <p className="text-red-500 text-sm mt-1">{errors.role}</p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 mt-6 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-emerald-500 via-green-500 to-cyan-500 text-white font-bold rounded-xl hover:from-emerald-600 hover:via-green-600 hover:to-cyan-600 shadow-lg hover:shadow-xl transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  Updating...
                </span>
              ) : (
                'Update Employee'
              )}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
};

export default EditUserModal;
