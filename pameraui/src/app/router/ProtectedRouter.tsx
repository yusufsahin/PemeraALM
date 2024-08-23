import React, { ReactNode } from 'react';
import { useAppSelector } from '../store/hooks';
import { Navigate } from 'react-router-dom';


type Props = {
  children: ReactNode;
};

const ProtectedRoute: React.FC<Props> = ({ children }) => {
  // Extract authentication state from Redux
  const isAuthenticated = useAppSelector(state=> state.security.isAuthenticated);

  // If the user is not authenticated, redirect them to the signin page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
    
  }

  // If the user is authenticated, render the children components
  return <>{children}</>;
};

export default ProtectedRoute;

