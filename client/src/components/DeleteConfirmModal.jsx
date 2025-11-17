// src/components/modals/DeleteConfirmModal.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { FaExclamationTriangle, FaTimes } from 'react-icons/fa';

const DeleteConfirmModal = ({ user, onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <motion.div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md border-2 border-red-200"
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-6 rounded-t-2xl">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <FaExclamationTriangle className="text-3xl text-white" />
              <h2 className="text-2xl font-bold text-white">Confirm Delete</h2>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:text-gray-200 transition-colors p-2 hover:bg-white/20 rounded-lg"
            >
              <FaTimes size={24} />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-700 text-lg mb-4">
            Are you sure you want to delete this employee?
          </p>
          
          <div className="bg-red-50 border-2 border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center gap-3 mb-2">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-red-500 to-red-600 flex items-center justify-center text-white font-bold text-lg">
                {user.firstName?.[0]}{user.lastName?.[0]}
              </div>
              <div>
                <p className="font-bold text-gray-800">
                  {user.firstName} {user.lastName}
                </p>
                <p className="text-sm text-gray-600">{user.email}</p>
              </div>
            </div>
            <div className="text-sm text-gray-600 mt-2">
              <p><span className="font-semibold">Role:</span> {user.employeeDetails?.role}</p>
              <p><span className="font-semibold">Location:</span> {user.employeeDetails?.location}</p>
            </div>
          </div>

          <p className="text-red-600 font-semibold text-sm mb-6">
            ⚠️ This action cannot be undone. All employee data will be permanently deleted.
          </p>

          {/* Buttons */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-xl hover:bg-gray-50 transition-all duration-300"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold rounded-xl hover:from-red-600 hover:to-red-700 shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Delete Employee
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DeleteConfirmModal;
