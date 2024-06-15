import React, { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

const ProtectedRoute = () => {
  const { user } = useContext(AuthContext);

  return user ? <Outlet /> : <Navigate to="/signin" />;
};

export default ProtectedRoute;
