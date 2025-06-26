import { Navigate, useLocation } from 'react-router-dom';
import { useSelector } from '../../services/store';
import React from 'react';

export const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const location = useLocation();
  const from =
    (location.state && location.state.from && location.state.from.pathname) ||
    '/';

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  return children;
};
