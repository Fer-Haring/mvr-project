import { useUserStore } from '@webapp/store/auth/session';
import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

import { isPublicRoute } from './utils';

interface AuthGuardProps {
  children?: React.ReactNode;
}

const SIGN_IN_PATH = '/sign-in';

const AuthGuard: React.FunctionComponent<AuthGuardProps> = ({ children }) => {
  const isLoggedIn = useUserStore((state) => state.isLoggedIn);
  const location = useLocation();

  if (isLoggedIn && location.pathname.includes(SIGN_IN_PATH)) {
    return <Navigate to={'/home'} replace />;
  }

  if (!isLoggedIn && !isPublicRoute(location.pathname)) {
    return <Navigate to={SIGN_IN_PATH} replace />;
  }

  return children ? children : <Outlet />;
};

export default AuthGuard;
