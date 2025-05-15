import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
      const token = localStorage.getItem('token');
      const expireAt = localStorage.getItem('token_expire_at');

      const isExpired = !expireAt || Date.now() > parseInt(expireAt);

      if (!token || isExpired) {
            localStorage.removeItem('token');
            localStorage.removeItem('token_expire_at');
            return <Navigate to="/login" replace />;
      }

      return children;
};

export default ProtectedRoute;
