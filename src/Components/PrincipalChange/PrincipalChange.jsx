import React from 'react';
import { Navigate } from 'react-router-dom';

const PrincipalChange = ({ children, allowedRoles }) => {
  const token = localStorage.getItem('token');
  const user = token ? JSON.parse(atob(token.split('.')[1])) : null;

  if (!user) {
    return <Navigate to="/Innovabank/Principal" />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/Innovabank/PrincipalAdmin" />;
  }

  return children;
};

export default PrincipalChange;
