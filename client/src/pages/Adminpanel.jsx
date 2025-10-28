// src/pages/AdminPanel.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaUsers, 
  FaUserTie, 
  FaChartLine, 
  FaBuilding,
  FaUserShield
} from 'react-icons/fa';
import bgimage from '../assets/StartupHealer.png';

const AdminPanel = () => {
  const navigate = useNavigate();

  // Static data
  const stats = {
    totalUsers: 150,
    founders: 45,
    mentors: 32,
    investors: 28,
  };

  const users = [
    {
      id: 1,
      name: 'John Doe',
      email: 'john@example.com',
      role: 'Founder',
      startup: 'TechStart',
      city: 'Mumbai',
      joinedDate: '2025-01-15'
    },
    {
      id: 2,
      name: 'Jane Smith',
      email: 'jane@example.com',
      role: 'Mentor',
      startup: 'N/A',
      city: 'Delhi',
      joinedDate: '2025-02-20'
    },
    {
      id: 3,
      name: 'Mike Johnson',
      email: 'mike@example.com',
      role: 'Investor',
      startup: 'InvestCorp',
      city: 'Bangalore',
      joinedDate: '2025-03-10'
    },
    {
      id: 4,
      name: 'Sarah Williams',
      email: 'sarah@example.com',
      role: 'Founder',
      startup: 'StartupHub',
      city: 'Pune',
      joinedDate: '2025-01-25'
    },
    {
      id: 5,
      name: 'Robert Brown',
      email: 'robert@example.com',
      role: 'Business Analyst',
      startup: 'Analytics Pro',
      city: 'Hyderabad',
      joinedDate: '2025-02-15'
    },
  ];

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
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <FaUserShield className="text-4xl text-cyan-600" />
              <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
            </div>
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gradient-to-r from-cyan-500 to-emerald-500 text-white font-semibold rounded-full hover:from-cyan-600 hover:to-emerald-600 transition-all shadow-md"
            >
              Back to Home
            </button>
          </div>
          <p className="text-gray-600">Welcome, Admin! Here's your dashboard overview.</p>
        </motion.div>

        {/* Statistics Cards */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <StatCard
            icon={<FaUsers className="text-3xl" />}
            title="Total Users"
            value={stats.totalUsers}
            color="from-blue-500 to-blue-600"
          />
          <StatCard
            icon={<FaUserTie className="text-3xl" />}
            title="Founders"
            value={stats.founders}
            color="from-cyan-500 to-cyan-600"
          />
          <StatCard
            icon={<FaChartLine className="text-3xl" />}
            title="Mentors"
            value={stats.mentors}
            color="from-emerald-500 to-emerald-600"
          />
          <StatCard
            icon={<FaBuilding className="text-3xl" />}
            title="Investors"
            value={stats.investors}
            color="from-green-500 to-green-600"
          />
        </div>

        {/* Users Table */}
        <motion.div
          className="max-w-7xl mx-auto bg-white/95 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden border-2 border-cyan-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="bg-gradient-to-r from-cyan-100 to-emerald-100 p-6 border-b-2 border-cyan-200">
            <h2 className="text-2xl font-bold text-gray-800">Recent Users</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-cyan-50 to-emerald-50">
                <tr>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">User</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Email</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Role</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Startup</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Location</th>
                  <th className="px-6 py-4 text-left text-sm font-bold text-gray-800">Joined</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-cyan-100">
                {users.map((user) => (
                  <motion.tr
                    key={user.id}
                    className="hover:bg-gradient-to-r hover:from-cyan-50 hover:to-emerald-50 transition-colors"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 flex items-center justify-center text-white font-bold">
                          {user.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <p className="font-semibold text-gray-800">{user.name}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.email}</td>
                    <td className="px-6 py-4">
                      <span className="px-3 py-1 bg-gradient-to-r from-cyan-100 to-emerald-100 text-cyan-700 rounded-full text-xs font-semibold">
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-600">{user.startup}</td>
                    <td className="px-6 py-4 text-gray-600">{user.city}</td>
                    <td className="px-6 py-4 text-gray-600">
                      {new Date(user.joinedDate).toLocaleDateString()}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 bg-gradient-to-r from-cyan-50 to-emerald-50 border-t-2 border-cyan-200">
            <p className="text-sm text-gray-600">
              Showing <span className="font-semibold text-cyan-600">{users.length}</span> of{' '}
              <span className="font-semibold text-cyan-600">{stats.totalUsers}</span> total users
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

// Stat Card Component
const StatCard = ({ icon, title, value, color }) => (
  <motion.div
    className="bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-6 border-2 border-cyan-200"
    whileHover={{ scale: 1.05 }}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-gray-600 text-sm font-medium mb-1">{title}</p>
        <p className="text-4xl font-bold bg-gradient-to-r from-cyan-600 to-emerald-600 bg-clip-text text-transparent">
          {value}
        </p>
      </div>
      <div className={`bg-gradient-to-r ${color} p-4 rounded-xl text-white`}>
        {icon}
      </div>
    </div>
  </motion.div>
);

export default AdminPanel;
