// src/components/AdminSidebar.jsx
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  UserCog,
  FileText,
  Award,
  BarChart3,
  Settings,
  ChevronLeft,
  ChevronRight,
  LogOut,
} from 'lucide-react';

const AdminSidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      path: '/admin/dashboard',
    },
    {
      icon: Users,
      label: 'User Management',
      path: '/admin/employees',
    },
    {
      icon: UserCog,
      label: 'Employee Management',
      path: '/admin/employee-management',
    },
    {
      icon: FileText,
      label: 'Pitch Deck Requests',
      path: '/admin/pitch-deck-requests',
    },
    {
      icon: Award,
      label: 'Certifications',
      path: '/admin/certifications',
    },
    {
      icon: BarChart3,
      label: 'Analytics',
      path: '/admin/analytics',
    },
    {
      icon: Settings,
      label: 'Settings',
      path: '/admin/settings',
    },
  ];

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const handleLogout = () => {
    // Add logout logic here
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div
      className={`${
        isCollapsed ? 'w-20' : 'w-64'
      } bg-gradient-to-b from-cyan-600 via-emerald-600 to-green-600 text-white transition-all duration-300 flex flex-col shadow-2xl`}
    >
      {/* Logo & Toggle */}
      <div className="p-4 flex items-center justify-between border-b-2 border-white/20">
        {!isCollapsed && (
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600 font-bold text-xl">
                SH
              </span>
            </div>
            <span className="font-bold text-lg">Startup Healer</span>
          </div>
        )}
        {isCollapsed && (
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-lg mx-auto">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 to-emerald-600 font-bold text-xl">
              SH
            </span>
          </div>
        )}
        {!isCollapsed && (
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-2 rounded-lg hover:bg-white/20 transition-colors"
          >
            <ChevronLeft size={20} />
          </button>
        )}
      </div>

      {/* Expand Button when Collapsed */}
      {isCollapsed && (
        <div className="p-2 border-b-2 border-white/20">
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="w-full p-2 rounded-lg hover:bg-white/20 transition-colors flex items-center justify-center"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            const active = isActive(item.path);

            return (
              <li key={index}>
                <Link
                  to={item.path}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 group ${
                    active
                      ? 'bg-white text-cyan-700 shadow-xl scale-105'
                      : 'text-white hover:bg-white/20 hover:scale-105'
                  }`}
                  title={isCollapsed ? item.label : ''}
                >
                  <Icon
                    size={20}
                    className={`flex-shrink-0 transition-transform duration-200 ${
                      active ? 'text-cyan-600 scale-110' : 'text-white/90 group-hover:scale-110'
                    }`}
                  />
                  {!isCollapsed && (
                    <span className={`font-semibold ${active ? 'text-cyan-700' : 'text-white'}`}>
                      {item.label}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Logout Button */}
      <div className="p-4 border-t-2 border-white/20">
        <button
          onClick={handleLogout}
          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 w-full bg-red-500 hover:bg-red-600 shadow-lg hover:shadow-xl hover:scale-105 ${
            isCollapsed ? 'justify-center' : ''
          }`}
          title={isCollapsed ? 'Logout' : ''}
        >
          <LogOut size={20} className="flex-shrink-0" />
          {!isCollapsed && <span className="font-semibold">Logout</span>}
        </button>
      </div>

      {/* Admin Profile */}
      {!isCollapsed && (
        <div className="p-4 border-t-2 border-white/20">
          <div className="flex items-center space-x-3 p-3 rounded-xl bg-white/20 backdrop-blur-sm cursor-pointer hover:bg-white/30 transition-all duration-300 hover:scale-105 shadow-lg">
            <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 via-emerald-400 to-green-400 rounded-full flex items-center justify-center text-white font-bold shadow-lg">
              AD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-white truncate">Admin User</p>
              <p className="text-xs text-white/80 truncate">admin@startuphealer.com</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;
