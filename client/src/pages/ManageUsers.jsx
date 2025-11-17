// src/pages/ManageUsers.jsx
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { 
  FaUsers, 
  FaEdit, 
  FaTrash, 
  FaPlus,
  FaSearch,
  FaFilter
} from 'react-icons/fa';
import { employeeEndpoints } from '../services/api';
import AddUserModal from '../components/AddUser';
import EditUserModal from '../components/EditUser';
import DeleteConfirmModal from '../components/DeleteConfirmModal';
import toast from 'react-hot-toast';
import bgimage from '../assets/StartupHealer.png';

const ManageUsers = () => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('');
  
  // Modal states
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Fetch employees
  const fetchEmployees = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await axios.get(
        employeeEndpoints.GET_ALL_EMPLOYEES,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      setEmployees(response.data.employees || []);
    } catch (error) {
      console.error('Error fetching employees:', error);
      toast.error('Failed to fetch employees');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  // Handle edit
  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  // Handle delete
  const handleDelete = (user) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  // Confirm delete
  const confirmDelete = async () => {
    try {
      const token = localStorage.getItem('token');
      const url = employeeEndpoints.DELETE_EMPLOYEE.replace(':id', selectedUser._id);
      
      await axios.delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      
      toast.success('Employee deleted successfully');
      fetchEmployees();
      setShowDeleteModal(false);
      setSelectedUser(null);
    } catch (error) {
      console.error('Error deleting employee:', error);
      toast.error(error.response?.data?.message || 'Failed to delete employee');
    }
  };

  // Filter employees
  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      emp.employeeDetails?.location?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = !filterRole || emp.employeeDetails?.role === filterRole;
    
    return matchesSearch && matchesRole;
  });

  return (
    <div
      className="min-h-screen relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${bgimage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-white/50 via-cyan-50/40 to-emerald-50/50" />

      <div className="relative z-10 min-h-screen px-6 py-24">
        {/* Header */}
        <motion.div
          className="max-w-7xl mx-auto mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <FaUsers className="text-4xl text-cyan-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Manage Employees
              </h1>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-lg hover:shadow-xl"
            >
              <FaPlus /> Add Employee
            </button>
          </div>

          {/* Filters */}
          <div className="flex gap-4 mb-6">
            {/* Search */}
            <div className="flex-1 relative">
              <FaSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by name, email, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border-2 border-cyan-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent transition-all"
              />
            </div>

            {/* Role Filter */}
            <div className="relative">
              <FaFilter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <select
                value={filterRole}
                onChange={(e) => setFilterRole(e.target.value)}
                className="pl-12 pr-8 py-3 border-2 border-emerald-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all appearance-none cursor-pointer"
              >
                <option value="">All Roles</option>
                <option value="Data Feeder">Data Feeder</option>
                <option value="Accountant">Accountant</option>
                <option value="Manager">Manager</option>
                <option value="Admin">Admin</option>
              </select>
            </div>
          </div>
        </motion.div>

        {/* Statistics */}
        <motion.div
          className="max-w-7xl mx-auto mb-8 grid grid-cols-1 md:grid-cols-4 gap-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <StatCard
            title="Total Employees"
            value={employees.length}
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            title="Data Feeders"
            value={employees.filter(e => e.employeeDetails?.role === 'Data Feeder').length}
            color="from-cyan-500 to-cyan-600"
          />
          <StatCard
            title="Accountants"
            value={employees.filter(e => e.employeeDetails?.role === 'Accountant').length}
            color="from-emerald-500 to-emerald-600"
          />
          <StatCard
            title="Managers"
            value={employees.filter(e => e.employeeDetails?.role === 'Manager').length}
            color="from-green-500 to-green-600"
          />
        </motion.div>

        {/* Employees Table */}
        <motion.div
          className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border-2 border-cyan-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-gradient-to-r from-cyan-100 to-emerald-100 p-6 border-b-2 border-cyan-200">
            <h2 className="text-2xl font-bold text-gray-800">Employee Directory</h2>
            <p className="text-gray-600 mt-1">
              Showing {filteredEmployees.length} of {employees.length} employees
            </p>
          </div>

          {loading ? (
            <div className="p-12 text-center">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-cyan-500 border-t-transparent"></div>
              <p className="mt-4 text-gray-600">Loading employees...</p>
            </div>
          ) : filteredEmployees.length === 0 ? (
            <div className="p-12 text-center">
              <FaUsers className="text-6xl text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">No employees found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-cyan-50 to-emerald-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Employee</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Role</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Location</th>
                    <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Phone</th>
                    <th className="px-6 py-4 text-center text-sm font-bold text-gray-800">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-cyan-100">
                  {filteredEmployees.map((employee) => (
                    <motion.tr
                      key={employee._id}
                      className="hover:bg-gradient-to-r hover:from-cyan-50 hover:to-emerald-50 transition-colors"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                            {employee.firstName?.[0]}{employee.lastName?.[0]}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {employee.firstName} {employee.lastName}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-gray-600">{employee.email}</td>
                      <td className="px-6 py-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-cyan-100 to-emerald-100 text-cyan-700 rounded-full text-xs font-semibold">
                          {employee.employeeDetails?.role || 'N/A'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {employee.employeeDetails?.location || 'N/A'}
                      </td>
                      <td className="px-6 py-4 text-gray-600">
                        {employee.employeeDetails?.contactNumber || 'N/A'}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-center gap-2">
                          <button
                            onClick={() => handleEdit(employee)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="Edit Employee"
                          >
                            <FaEdit size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(employee)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Employee"
                          >
                            <FaTrash size={18} />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>

      {/* Modals */}
      {showAddModal && (
        <AddUserModal
          onClose={() => setShowAddModal(false)}
          onSuccess={() => {
            fetchEmployees();
            setShowAddModal(false);
          }}
        />
      )}

      {showEditModal && selectedUser && (
        <EditUserModal
          user={selectedUser}
          onClose={() => {
            setShowEditModal(false);
            setSelectedUser(null);
          }}
          onSuccess={() => {
            fetchEmployees();
            setShowEditModal(false);
            setSelectedUser(null);
          }}
        />
      )}

      {showDeleteModal && selectedUser && (
        <DeleteConfirmModal
          user={selectedUser}
          onClose={() => {
            setShowDeleteModal(false);
            setSelectedUser(null);
          }}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

// Stat Card Component
const StatCard = ({ title, value, color }) => (
  <motion.div
    className="bg-white/95 backdrop-blur-md rounded-2xl shadow-lg p-6 border-2 border-cyan-200"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
    <p className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
      {value}
    </p>
  </motion.div>
);

export default ManageUsers;
