// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
// import { useAppSelector } from '../store/hooks';

const ProtectedRoute = ({ children, requiredRole }) => {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    // Redirect based on user role
    if (user?.role === 'admin') {
      return <Navigate to="/admin-panel" replace />;
    } else {
      return <Navigate to="/user-panel" replace />;
    }
  }

  return <>{children}</>;
};

export default ProtectedRoute;
