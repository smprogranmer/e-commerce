import React from 'react';
import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Loader from '../loader/Loader';

const ProtectedRoute = ({ children, user, isLoading = false}) => {
    if (isLoading) return <Loader/>;
    if (!user) return <Navigate to="/login" />;
  
    return children;
  };

export default ProtectedRoute;